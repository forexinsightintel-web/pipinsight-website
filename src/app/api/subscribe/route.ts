// Email capture -> the leads database (private repo, leads/leads.csv).
// Fires a repository_dispatch; the lead_capture workflow validates again,
// dedupes and commits. Emails travel in the POST body only, never a URL.
// Needs LEADS_GH_TOKEN (a GitHub PAT with repo scope) in the host env.

const RE = /^[^@\s]+@[^@\s]+\.[^@\s]{2,}$/;

export async function POST(request: Request) {
  const token = process.env.LEADS_GH_TOKEN;
  if (!token) {
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
  if (!r.ok) {
    return Response.json(
      { error: "Couldn't save that just now — please try again." },
      { status: 502 },
    );
  }
  return Response.json({ ok: true });
}
