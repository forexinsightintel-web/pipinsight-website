// AI analysis endpoint: trades in -> structured coaching insights out.
// Uses ANTHROPIC_API_KEY (server env). Descriptive analysis only — the
// system prompt forbids directive trade advice (FCA-safe framing).

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
  if (!key) {
    return Response.json(
      { error: "AI analysis is not configured yet (missing server key)." },
      { status: 503 },
    );
  }
  const { trades } = await request.json();
  if (!Array.isArray(trades) || trades.length === 0) {
    return Response.json({ error: "No trades provided." }, { status: 400 });
  }
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
