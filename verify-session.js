// api/verify-session.js
//
// After a learner completes Stripe Checkout, the browser is redirected
// back to LearnHub with a session_id in the URL. This endpoint asks
// Stripe directly whether that subscription is really active — the
// frontend never trusts the URL parameters alone, since those could be
// faked by anyone typing a URL by hand.
//
// Requires environment variable: STRIPE_SECRET_KEY

const Stripe = require("stripe");

module.exports = async function handler(req, res) {
  if (req.method !== "GET") {
    res.status(405).json({ error: "Method not allowed. Use GET." });
    return;
  }

  const secretKey = process.env.STRIPE_SECRET_KEY;
  if (!secretKey) {
    res.status(500).json({ error: "Stripe is not configured yet." });
    return;
  }

  const stripe = Stripe(secretKey);

  try {
    const sessionId = req.query && req.query.session_id;
    if (!sessionId) {
      res.status(400).json({ error: "Missing session_id." });
      return;
    }

    const session = await stripe.checkout.sessions.retrieve(sessionId, {
      expand: ["subscription"],
    });

    const sub = session.subscription;
    const active =
      session.status === "complete" &&
      sub &&
      (sub.status === "active" || sub.status === "trialing");

    res.status(200).json({
      active: Boolean(active),
      courseId: (session.metadata && session.metadata.courseId) || null,
      customerEmail: (session.customer_details && session.customer_details.email) || null,
    });
  } catch (err) {
    console.error("Stripe verify-session error:", err);
    res.status(500).json({ error: "Could not verify subscription." });
  }
};
