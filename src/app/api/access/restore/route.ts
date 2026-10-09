// Restore access on a new device: find paid Trading Foundry course/pass checkouts for an
// email address and rebuild the signed access cookie from them.
import Stripe from "stripe";
import { NextResponse } from "next/server";
import { COOKIE, sign } from "../../../../lib/access";

export async function POST(request: Request) {
  const key = process.env.STRIPE_SECRET_KEY;
  if (!key) return NextResponse.json({ error: "Payments are not configured yet." }, { status: 503 });
  const { email } = await request.json().catch(() => ({ email: "" }));
  const e = String(email || "").trim().toLowerCase();
  if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(e)) return NextResponse.json({ error: "Enter the email you used at checkout." }, { status: 400 });
  const stripe = new Stripe(key);
  const found = new Set<string>();
  let pass = "";
  try {
    const list = await stripe.checkout.sessions.list({ customer_details: { email: e }, limit: 100 });
    for (const s of list.data) {
      if (s.payment_status !== "paid") continue;
      if (s.metadata?.kind === "pass") { found.add("all"); pass = s.id; }
      if (s.metadata?.kind === "course" && s.metadata.slug) found.add(s.metadata.slug);
    }
  } catch {
    return NextResponse.json({ error: "Could not reach the payment system. Try again in a minute." }, { status: 502 });
  }
  if (!found.size) return NextResponse.json({ error: "No course purchases found for that email. Playbook downloads are restored from the link in your receipt email." }, { status: 404 });
  const res = NextResponse.json({ ok: true, unlocked: Array.from(found) });
  res.cookies.set(COOKIE, sign({ s: Array.from(found), e, p: pass || undefined }), { httpOnly: true, secure: true, sameSite: "lax", path: "/", maxAge: 60 * 60 * 24 * 365 * 5 });
  return res;
}
