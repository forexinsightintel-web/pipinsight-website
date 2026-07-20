// Leaderboard submissions — PRO-ONLY, OPT-IN, AGGREGATE STATS ONLY.
// The client sends counts (trades/wins/net R), never raw trades. The
// server verifies an active subscription, reads the trader's public
// screen name from their checkout's custom field (never their real
// name/email), and dispatches to the data repo which publishes
// content/leaderboard.json. No personal data leaves this route.
import Stripe from "stripe";

const verified = new Map<string, { ok: boolean; exp: number; screen?: string }>();

async function proScreen(sessionId: string, key: string):
    Promise<string | null> {
  const hit = verified.get(sessionId);
  if (hit && hit.exp > Date.now()) return hit.ok ? (hit.screen || null) : null;
  let ok = false; let screen: string | undefined;
  try {
    const stripe = new Stripe(key);
    const s = await stripe.checkout.sessions.retrieve(sessionId, {
      expand: ["subscription"],
    });
    const sub = s.subscription as Stripe.Subscription | null;
    ok = !!sub && ["active", "trialing"].includes(sub.status);
    const f = (s.custom_fields || []).find(c => c.key === "screen_name");
    screen = f?.text?.value || undefined;
  } catch { ok = false; }
  verified.set(sessionId, { ok, exp: Date.now() + 6 * 3600_000, screen });
  return ok ? (screen || null) : null;
}

export async function POST(request: Request) {
  const stripeKey = process.env.STRIPE_SECRET_KEY;
  const ghToken = process.env.LEADS_GH_TOKEN;
  if (!stripeKey || !ghToken)
    return Response.json({ error: "not configured" }, { status: 503 });
  let body: { session_id?: string; screen?: string;
    stats?: { trades?: number; wins?: number; netR?: number } };
  try { body = await request.json(); }
  catch { return Response.json({ error: "bad request" }, { status: 400 }); }
  const sid = String(body.session_id || "");
  if (!sid) return Response.json({ error: "Pro required" }, { status: 401 });
  const screenFromStripe = await proScreen(sid, stripeKey);
  // screen name: checkout field wins; older subs (pre-field) may send one
  const screen = (screenFromStripe || String(body.screen || ""))
    .replace(/[^a-zA-Z0-9_\- ]/g, "").trim().slice(0, 20);
  if (!screenFromStripe && !verified.get(sid)?.ok)
    return Response.json({ error: "Pro required" }, { status: 403 });
  if (!screen || screen.length < 3)
    return Response.json({ error: "screen name needed" }, { status: 400 });
  const t = Math.max(0, Math.min(50000, Math.round(Number(body.stats?.trades) || 0)));
  const w = Math.max(0, Math.min(t, Math.round(Number(body.stats?.wins) || 0)));
  const netR = Math.max(-9999, Math.min(9999,
    Math.round((Number(body.stats?.netR) || 0) * 10) / 10));
  if (t < 10)
    return Response.json({ error: "log 10 trades first" }, { status: 400 });
  const r = await fetch(
    "https://api.github.com/repos/forexinsightintel-web/pipinsight-daily/dispatches",
    { method: "POST",
      headers: { Authorization: `Bearer ${ghToken}`,
        Accept: "application/vnd.github+json" },
      body: JSON.stringify({ event_type: "leaderboard",
        client_payload: { screen, trades: t, wins: w, netR,
          at: new Date().toISOString() } }) });
  if (!r.ok) return Response.json({ error: "try again" }, { status: 502 });
  return Response.json({ ok: true, screen });
}
