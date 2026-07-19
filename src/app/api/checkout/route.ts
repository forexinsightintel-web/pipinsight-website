// Stripe Checkout: journal subscription (£9.99/mo) and one-off ebook
// purchases from the course catalog. Uses inline price_data so no Stripe
// dashboard products are required. Requires STRIPE_SECRET_KEY (server env).
import Stripe from "stripe";
import catalog from "../../../../content/catalog.json";

type Course = {
  course_no: number; slug: string; title: string;
  ebook_price_gbp: number; pitch: string;
};

export async function POST(request: Request) {
  const key = process.env.STRIPE_SECRET_KEY;
  if (!key) {
    return Response.json(
      { error: "Payments are not configured yet (missing Stripe key)." },
      { status: 503 },
    );
  }
  const stripe = new Stripe(key);
  const { kind, slug } = await request.json();
  const origin = request.headers.get("origin") ?? "https://pip-insight.co.uk";

  if (kind === "journal" || kind === "full-access") {
    const session = await stripe.checkout.sessions.create({
      mode: "subscription",
      line_items: [{
        quantity: 1,
        price_data: {
          currency: "gbp",
          unit_amount: 999,
          recurring: { interval: "month" },
          product_data: {
            name: "PIP:Insight Full Access",
            description: "Every instrument's daily Trading Desk analysis, " +
              "Journal Pro with AI insights, full economic calendar.",
          },
        },
      }],
      success_url: `${origin}/journal?upgraded=1&session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/journal`,
    });
    return Response.json({ url: session.url });
  }

  if (kind === "full-access-annual") {
    // £79/year — "2 months free" vs monthly; founding-member rate
    const session = await stripe.checkout.sessions.create({
      mode: "subscription",
      line_items: [{
        quantity: 1,
        price_data: {
          currency: "gbp",
          unit_amount: 7900,
          recurring: { interval: "year" },
          product_data: {
            name: "PIP:Insight Full Access — Annual (Founding Rate)",
            description: "12 months for the price of 10. Every instrument's " +
              "daily Trading Desk analysis, Journal Pro with AI insights, " +
              "full economic calendar. Founding-member rate, locked in while " +
              "you stay subscribed.",
          },
        },
      }],
      success_url: `${origin}/journal?upgraded=1&session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/#pricing`,
    });
    return Response.json({ url: session.url });
  }

  if (kind === "ebook") {
    const course = (catalog as Course[]).find((c) => c.slug === slug);
    if (!course) return Response.json({ error: "Unknown course." }, { status: 404 });
    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      metadata: { slug: course.slug },
      line_items: [{
        quantity: 1,
        price_data: {
          currency: "gbp",
          unit_amount: Math.round(course.ebook_price_gbp * 100),
          product_data: {
            name: `${course.title} — Complete Course Ebook`,
            description: course.pitch.slice(0, 200),
          },
        },
      }],
      success_url: `${origin}/courses?purchased=${course.slug}&session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/courses`,
    });
    return Response.json({ url: session.url });
  }

  return Response.json({ error: "Unknown checkout kind." }, { status: 400 });
}
