// After Stripe Checkout: verify the session is paid, add its course (or "all") to the
// signed access cookie, then send the buyer straight into what they bought.
import Stripe from "stripe";
import { NextResponse } from "next/server";
import { COOKIE, verify, sign, merge } from "../../../../lib/access";

export async function GET(request: Request) {
  const url = new URL(request.url);
  const sid = url.searchParams.get("session_id") || "";
  const key = process.env.STRIPE_SECRET_KEY;
  if (!key || !sid) return NextResponse.redirect(new URL("/courses?unlock=failed", url));
  try {
    const s = await new Stripe(key).checkout.sessions.retrieve(sid);
    if (s.payment_status !== "paid") return NextResponse.redirect(new URL("/courses?unlock=unpaid", url));
    const kind = s.metadata?.kind; const slug = String(s.metadata?.slug || "");
    if (kind !== "course" && kind !== "pass") return NextResponse.redirect(new URL("/courses", url));
    const add = kind === "pass" ? ["all"] : [slug];
    const cur = verify(request.headers.get("cookie")?.match(new RegExp(`${COOKIE}=([^;]+)`))?.[1]);
    const next = merge(cur, add, s.customer_details?.email || undefined, kind === "pass" ? sid : undefined);
    const dest = kind === "pass" ? "/courses?unlocked=all" : `/courses/${slug}?unlocked=1`;
    const res = NextResponse.redirect(new URL(dest, url));
    res.cookies.set(COOKIE, sign(next), { httpOnly: true, secure: true, sameSite: "lax", path: "/", maxAge: 60 * 60 * 24 * 365 * 5 });
    return res;
  } catch {
    return NextResponse.redirect(new URL("/courses?unlock=failed", url));
  }
}
