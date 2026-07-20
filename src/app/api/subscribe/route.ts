// Email capture -> DUAL-WRITE: (1) beehiiv (The London Open list — the
// sender of record) and (2) the leads database (private repo, our own copy,
// first-capture-wins). Either leg succeeding = subscriber saved; both legs
// are env-gated so the route degrades gracefully while keys are pending.
// Emails travel in the POST body only, never a URL.
// Env: BEEHIIV_API_KEY + BEEHIIV_PUB_ID, LEADS_GH_TOKEN.

const RE = /^[^@\s]+@[^@\s]+\.[^@\s]{2,}$/;

async function beehiivAdd(email: string, source: string): Promise<boolean> {
  const key = process.env.BEEHIIV_API_KEY;
  const pub = process.env.BEEHIIV_PUB_ID;
  if (!key || !pub) return false;
  try {
    const r = await fetch(
      `https://api.beehiiv.com/v2/publications/${pub}/subscriptions`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${key}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          reactivate_existing: true,
          send_welcome_email: true,
          utm_source: "pip-insight.co.uk",
          utm_medium: source,
        }),
      },
    );
    return r.ok;
  } catch {
    return false;
  }
}

async function leadsAdd(email: string, source: string): Promise<boolean> {
  const token = process.env.LEADS_GH_TOKEN;
  if (!token) return false;
  try {
    const r = await fetch(
      "https://api.github.com/repos/forexinsightintel-web/pipinsight-daily/dispatches",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/vnd.github+json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          event_type: "new_lead",
          client_payload: {
            email,
            source,
            consent: "free-tools signup; agreed to receive PIP:Insight emails",
          },
        }),
      },
    );
    return r.ok;
  } catch {
    return false;
  }
}

export async function POST(request: Request) {
  if (!process.env.LEADS_GH_TOKEN && !process.env.BEEHIIV_API_KEY) {
    return Response.json(
      { error: "Sign-up is not live just yet — please try again later." },
      { status: 503 },
    );
  }
  let body: { email?: string; source?: string; website?: string };
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "Bad request." }, { status: 400 });
  }
  // Honeypot: real people never fill the hidden "website" field.
  if (body.website) return Response.json({ ok: true });

  const email = String(body.email || "").trim().toLowerCase();
  const source = String(body.source || "site").slice(0, 40);
  if (!RE.test(email) || email.length > 254) {
    return Response.json(
      { error: "That doesn't look like an email address." },
      { status: 400 },
    );
  }
  const [bee, gh] = await Promise.all([
    beehiivAdd(email, source),
    leadsAdd(email, source),
  ]);
  if (!bee && !gh) {
    return Response.json(
      { error: "Couldn't save that just now — please try again." },
      { status: 502 },
    );
  }
  return Response.json({ ok: true });
}
