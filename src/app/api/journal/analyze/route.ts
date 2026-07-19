// AI analysis endpoint: trades in -> structured coaching insights out.
// PRO-GATED: every call costs real Claude tokens, so the server verifies an
// active Stripe subscription before spending a penny — the client never
// decides. A daily cap bounds spend even for Pro. Uses ANTHROPIC_API_KEY +
// STRIPE_SECRET_KEY (server env). Descriptive analysis only — the system
// prompt forbids directive trade advice (FCA-safe framing).
import Stripe from "stripe";

const DAILY_CAP = 10;

// Best-effort in-memory caches (serverless instances reset; Stripe
// re-verification on a cache miss is the real gate).
const verified = new Map<string, { ok: boolean; exp: number }>();
const usage = new Map<string, { day: string; count: number }>();

async function isPro(sessionId: string, stripeKey: string): Promise<boolean> {
  const hit = verified.get(sessionId);
  if (hit && hit.exp > Date.now()) return hit.ok;
  let ok = false;
  try {
    const stripe = new Stripe(stripeKey);
    const s = await stripe.checkout.sessions.retrieve(sessionId, {
      expand: ["subscription"],
    });
    const sub = s.subscription as Stripe.Subscription | null;
    ok = !!sub && ["active", "trialing"].includes(sub.status);
  } catch {
    ok = false;
  }
  verified.set(sessionId, { ok, exp: Date.now() + 6 * 3600_000 });
  return ok;
}

const SYSTEM = `You are the AI performance analyst inside PIP:Insight's trading journal. You are given a trader's logged trades (R-multiples, setups, sessions, emotions, plan adherence).

Return ONLY valid JSON: {"insights": [{"title": "...", "severity": "info"|"warning"|"critical", "body": "..."}], "headline": "one-sentence overall read"}

Rules:
- 3 to 5 insights, each grounded in the actual numbers (quote them).
- DESCRIPTIVE ONLY: describe patterns in what the trader DID ("your revenge-tagged trades lost 3.2R across 4 trades"). NEVER instruct future trades (no "you should buy/sell/enter/avoid the London open"). Frame improvement areas as observations ("historically, your unplanned trades have a 22% win rate").
- Psychology matters: emotions vs outcomes, plan adherence vs results, streak behaviour.
- British English. Plain, direct, kind. No hype, no promises.
- End the final insight noting analysis is educational, trading involves substantial risk.`;

export async function POST(request: Request) {
  const key = process.env.ANTHROPIC_API_KEY;
  const stripeKey = process.env.STRIPE_SECRET_KEY;
  if (!key || !stripeKey) {
    return Response.json(
      { error: "AI analysis is not configured yet (missing server key)." },
      { status: 503 },
    );
  }
  const { trades, proSession } = await request.json();
  if (!proSession || typeof proSession !== "string") {
    return Response.json(
      { error: "The AI analyst is a Pro feature. The journal stays free forever — the analyst is £9.99/mo." },
      { status: 402 },
    );
  }
  if (!(await isPro(proSession, stripeKey))) {
    return Response.json(
      { error: "We couldn't verify an active Pro subscription. Just subscribed? Give it a minute and try again." },
      { status: 402 },
    );
  }
  if (!Array.isArray(trades) || trades.length === 0) {
    return Response.json({ error: "No trades provided." }, { status: 400 });
  }
  // Daily cap — bounds token spend per subscriber, stops the constant-clicker.
  const today = new Date().toISOString().slice(0, 10);
  const u = usage.get(proSession);
  const count = u && u.day === today ? u.count : 0;
  if (count >= DAILY_CAP) {
    return Response.json(
      { error: `That's ${DAILY_CAP} analyses today — the daily limit. Your data isn't going anywhere; run it again tomorrow.` },
      { status: 429 },
    );
  }
  usage.set(proSession, { day: today, count: count + 1 });
  const slim = trades.slice(-200).map((t) => ({
    date: t.date, pair: t.pair, dir: t.direction, session: t.session,
    setup: t.setup, resultR: t.resultR, emotion: t.emotion,
    planned: t.planned, notes: String(t.notes || "").slice(0, 140),
  }));
  const r = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: {
      "x-api-key": key,
      "anthropic-version": "2023-06-01",
      "content-type": "application/json",
    },
    body: JSON.stringify({
      model: "claude-sonnet-4-6",
      max_tokens: 1500,
      temperature: 0.4,
      system: SYSTEM,
      messages: [{ role: "user", content: JSON.stringify(slim) }],
    }),
  });
  if (!r.ok) {
    return Response.json({ error: "AI service error." }, { status: 502 });
  }
  const data = await r.json();
  const text: string = data.content?.[0]?.text ?? "";
  const m = text.match(/\{[\s\S]*\}/);
  if (!m) return Response.json({ error: "Bad AI response." }, { status: 502 });
  return Response.json(JSON.parse(m[0]));
}
