// Gated ebook delivery: a paid Stripe checkout session unlocks the PDF.
// The session's metadata.slug (set at checkout) names the book; we verify
// PAID status with Stripe before a byte leaves the server. Ebook PDFs live
// in content/ (not public/) so this route is the only door.
import fs from "fs";
import path from "path";
import Stripe from "stripe";

const FILES: Record<string, string> = {
  "support-resistance-mastery":
    "content/ebooks/course1_support_resistance_mastery.pdf",
};

export async function GET(request: Request) {
  const key = process.env.STRIPE_SECRET_KEY;
  if (!key) return new Response("Downloads not configured.", { status: 503 });
  const url = new URL(request.url);
  const sid = url.searchParams.get("session_id") || "";
  if (!sid) return new Response("Missing session.", { status: 400 });
  let slug = "";
  try {
    const stripe = new Stripe(key);
    const s = await stripe.checkout.sessions.retrieve(sid);
    if (s.payment_status !== "paid")
      return new Response("Payment not completed.", { status: 402 });
    slug = String(s.metadata?.slug || "");
  } catch {
    return new Response("Could not verify purchase.", { status: 402 });
  }
  const rel = FILES[slug];
  if (!rel) return new Response("Unknown ebook.", { status: 404 });
  const p = path.join(process.cwd(), rel);
  if (!fs.existsSync(p)) return new Response("File missing.", { status: 500 });
  return new Response(fs.readFileSync(p), {
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition":
        `attachment; filename="PIP-Insight-${slug}.pdf"`,
    },
  });
}
