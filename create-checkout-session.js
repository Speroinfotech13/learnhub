// api/create-checkout-session.js
//
// Creates a REAL Stripe Checkout Session for a $5/month subscription to a
// single LearnHub course. The browser is redirected to Stripe's hosted,
// PCI-compliant checkout page — LearnHub never touches raw card details.
//
// SETUP: see STRIPE_SETUP.md for full step-by-step instructions.
//
// Requires environment variable: STRIPE_SECRET_KEY

const Stripe = require("stripe");

module.exports = async function handler(req, res) {
  if (req.method !== "POST") {
    res.status(405).json({ error: "Method not allowed. Use POST." });
    return;
  }

  const secretKey = process.env.STRIPE_SECRET_KEY;
  if (!secretKey) {
    res.status(500).json({
      error:
        "Stripe is not configured yet. Add STRIPE_SECRET_KEY under your Vercel project's Settings → Environment Variables, then redeploy.",
    });
    return;
  }

  const stripe = Stripe(secretKey);

  try {
    const { courseId, courseTitle } = req.body || {};

    if (!courseId || !courseTitle) {
      res.status(400).json({ error: "Missing courseId or courseTitle in request body." });
      return;
    }

    const origin = req.headers.origin || `https://${req.headers.host}`;

    const session = await stripe.checkout.sessions.create({
      mode: "subscription",
      payment_method_types: ["card"],
      line_items: [
        {
          // Price is created inline so we don't need to pre-make 1,200+
          // separate Price objects in the Stripe dashboard — every course
          // shares the same $5/month rate, distinguished by name/metadata.
          price_data: {
            currency: "usd",
            product_data: {
              name: `LearnHub — ${courseTitle}`,
              metadata: { courseId: String(courseId) },
            },
            unit_amount: 500, // $5.00 in cents
            recurring: { interval: "month" },
          },
          quantity: 1,
        },
      ],
      metadata: { courseId: String(courseId) },
      subscription_data: {
        metadata: { courseId: String(courseId) },
      },
      success_url: `${origin}/?subscribed=${encodeURIComponent(courseId)}&session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/?checkout_canceled=${encodeURIComponent(courseId)}`,
    });

    res.status(200).json({ url: session.url });
  } catch (err) {
    console.error("Stripe checkout session error:", err);
    res.status(500).json({ error: "Could not start checkout. Please try again." });
  }
};
