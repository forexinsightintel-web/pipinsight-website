// Gated ebook delivery: a paid Stripe checkout session unlocks the PDF.
// The session's metadata.slug (set at checkout) names the book; we verify
// PAID status with Stripe before a byte leaves the server. Ebook PDFs live
// in content/ (not public/) so this route is the only door.
//
// CHARGEBACK EVIDENCE: every successful download is stamped onto the
// PaymentIntent's metadata (first/last download time, count, IP, UA, file).
// When a dispute opens, the proof of delivery is already attached to the
// exact payment being disputed — visible in the dashboard dispute view.
import fs from "fs";
import path from "path";
import Stripe from "stripe";
import { cookies } from "next/headers";
import { COOKIE, verify, canRead } from "../../../../lib/access";
import academy from "../../../../../content/academy/index.json";

const FILES: Record<string, string> = {
  "breakout-retest-trading":
    "content/ebooks/course5_breakout-retest-trading.pdf",
  "candlestick-price-action":
    "content/ebooks/course3_candlestick-price-action.pdf",
  "chart-patterns-decoded":
    "content/ebooks/course6_chart-patterns-decoded.pdf",
  "day-trading-the-sessions":
    "content/ebooks/course11_day-trading-the-sessions.pdf",
  "fibonacci-retracement-trading":
    "content/ebooks/course8_fibonacci-retracement-trading.pdf",
  "moving-average-systems":
    "content/ebooks/course4_moving-average-systems.pdf",
  "news-fundamentals-trading":
    "content/ebooks/course13_news-fundamentals-trading.pdf",
  "risk-management-position-sizing":
    "content/ebooks/course15_risk-management-position-sizing.pdf",
  "rsi-divergence-trading":
    "content/ebooks/course7_rsi-divergence-trading.pdf",
  "scalping-precision":
    "content/ebooks/course12_scalping-precision.pdf",
  "smart-money-concepts":
    "content/ebooks/course14_smart-money-concepts.pdf",
  "supply-demand-zones":
    "content/ebooks/course9_supply-demand-zones.pdf",
  "support-resistance-mastery":
    "content/ebooks/course1_support_resistance_mastery.pdf",
  "swing-trading-blueprint":
    "content/ebooks/course10_swing-trading-blueprint.pdf",
  "trend-following-market-structure":
    "content/ebooks/course2_trend-following-market-structure.pdf",
  "smc-1-market-structure": "content/ebooks/smc/smc-1-market-structure.pdf",
  "smc-2-liquidity": "content/ebooks/smc/smc-2-liquidity.pdf",
  "smc-3-fair-value-gaps": "content/ebooks/smc/smc-3-fair-value-gaps.pdf",
  "smc-4-order-blocks": "content/ebooks/smc/smc-4-order-blocks.pdf",
  "smc-5-top-down": "content/ebooks/smc/smc-5-top-down.pdf",
  "smc-6-complete-strategy": "content/ebooks/smc/smc-6-complete-strategy.pdf",
};

// Course buyers (signed access cookie) get the ebooks their course includes; pass holders get all.
async function cookieDownload(book: string): Promise<Response> {
  const access = verify((await cookies()).get(COOKIE)?.value);
  const courses = (academy as { courses: { slug: string; ebooks?: string[] }[] }).courses;
  const ok = access.s.includes("all") || courses.some((c) => (c.ebooks || []).includes(book) && canRead(access, c.slug));
  if (!ok || !FILES[book]) return new Response("Buy the course or the ebook to download this.", { status: 402 });
  const p = path.join(process.cwd(), FILES[book]);
  if (!fs.existsSync(p)) return new Response("File missing.", { status: 500 });
  return new Response(fs.readFileSync(p), { headers: { "Content-Type": "application/pdf",
    "Content-Disposition": `attachment; filename="Trading-Foundry-${book}.pdf"` } });
}

// Bonus stack: any paid ebook session unlocks the bonuses too.
const BONUSES: Record<string, string> = {
  glossary: "content/ebooks/bonuses/pip-insight-glossary.pdf",
  cheatsheet: "content/ebooks/bonuses/pip-insight-levels-cheatsheet.pdf",
  quickstart: "content/ebooks/bonuses/pip-insight-journal-quickstart.pdf",
};

export async function GET(request: Request) {
  const url = new URL(request.url);
  if (!url.searchParams.get("session_id") && url.searchParams.get("book")) return cookieDownload(url.searchParams.get("book") || "");
  const key = process.env.STRIPE_SECRET_KEY;
  if (!key) return new Response("Downloads not configured.", { status: 503 });
  const sid = url.searchParams.get("session_id") || "";
  if (!sid && url.searchParams.get("book")) return cookieDownload(url.searchParams.get("book") || "");
  if (!sid) return new Response("Missing session.", { status: 400 });
  let slug = "";
  let piId = "";
  let piMeta: Record<string, string> = {};
  let stripe: Stripe | null = null;
  try {
    stripe = new Stripe(key);
    const s = await stripe.checkout.sessions.retrieve(sid, {
      expand: ["payment_intent"],
    });
    if (s.payment_status !== "paid")
      return new Response("Payment not completed.", { status: 402 });
    slug = String(s.metadata?.slug || "");
    // The All-Access Pass unlocks every playbook: the book is chosen with ?book=<slug>.
    if (s.metadata?.kind === "pass") slug = url.searchParams.get("book") || "";
    const pi = s.payment_intent;
    if (pi && typeof pi !== "string") {
      piId = pi.id;
      piMeta = (pi.metadata as Record<string, string>) || {};
    } else if (typeof pi === "string") {
      piId = pi;
    }
  } catch {
    return new Response("Could not verify purchase.", { status: 402 });
  }
  const bonus = url.searchParams.get("bonus") || "";
  const rel = bonus ? BONUSES[bonus] : FILES[slug];
  if (!rel || (!bonus && !FILES[slug]))
    return new Response("Unknown ebook.", { status: 404 });
  const p = path.join(process.cwd(), rel);
  if (!fs.existsSync(p)) return new Response("File missing.", { status: 500 });
  // ---- delivery evidence stamp (fire-and-forget; never blocks the file) --
  if (stripe && piId) {
    const now = new Date().toISOString();
    const ip = (request.headers.get("x-forwarded-for") || "")
      .split(",")[0].trim().slice(0, 45) || "unknown";
    const ua = (request.headers.get("user-agent") || "unknown").slice(0, 180);
    const count = (parseInt(piMeta.download_count || "0", 10) || 0) + 1;
    const files = ((piMeta.files_delivered || "") + "," + (bonus || slug))
      .split(",").filter(Boolean);
    stripe.paymentIntents.update(piId, { metadata: {
      ...(piMeta.first_download_at ? {} : { first_download_at: now,
        first_download_ip: ip }),
      last_download_at: now,
      last_download_ip: ip,
      last_download_ua: ua,
      download_count: String(count),
      files_delivered: [...new Set(files)].join(",").slice(0, 480),
      delivery_terms: "digital-immediate-consent-at-checkout;30d-no-quibble",
    } }).catch(() => {});
  }
  const fname = bonus
    ? path.basename(rel)
    : `Trading-Foundry-${slug}.pdf`;
  return new Response(fs.readFileSync(p), {
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": `attachment; filename="${fname}"`,
    },
  });
}
