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

  if (kind === "journal") {
    const session = await stripe.checkout.sessions.create({
      mode: "subscription",
      line_items: [{
        quantity: 1,
        price_data: {
          currency: "gbp",
          unit_amount: 999,
          recurring: { interval: "month" },
          product_data: {
            name: "PIP:Insight Journal Pro",
            description: "AI trade analysis, cloud sync, unlimited history.",
          },
        },
      }],
      success_url: `${origin}/journal?upgraded=1`,
      cancel_url: `${origin}/journal`,
    });
    return Response.json({ url: session.url });
  }

  if (kind === "ebook") {
    const course = (catalog as Course[]).find((c) => c.slug === slug);
    if (!course) return Response.json({ error: "Unknown course." }, { status: 404 });
    const session = await stripe.checkout.sessions.create({
      mode: "payment",
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
      success_url: `${origin}/courses?purchased=${course.slug}`,
      cancel_url: `${origin}/courses`,
    });
    return Response.json({ url: session.url });
  }

  return Response.json({ error: "Unknown checkout kind." }, { status: 400 });
}
