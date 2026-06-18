// api/stripe-webhook.js
//
// Listens for subscription lifecycle events sent directly by Stripe —
// this is the reliable source of truth for renewals, cancellations, and
// failed payments (more trustworthy than only watching the browser
// redirect, since users can close the tab, lose connection, etc.).
//
// SETUP:
// 1. In your Stripe Dashboard → Developers → Webhooks → Add endpoint
//    URL: https://yourdomain.com/api/stripe-webhook
//    Events to send:
//      - checkout.session.completed
//      - customer.subscription.updated
//      - customer.subscription.deleted
//      - invoice.payment_failed
// 2. Stripe will show you a "Signing secret" (starts with whsec_...).
// 3. Add it to Vercel as STRIPE_WEBHOOK_SECRET, then redeploy.
//
// IMPORTANT — this handler currently only logs events to the console.
// To actually track who has access to which course long-term (so it
// survives page reloads, new devices, etc.), connect a real database
// here — e.g. Vercel Postgres, Supabase, or Vercel KV — and write/update
// a row keyed by customer ID or email with the subscribed courseId at
// each TODO marked below. Without that, LearnHub only "remembers" an
// active subscription for the current browser tab right after checkout.

const Stripe = require("stripe");

function buffer(readable) {
  return new Promise((resolve, reject) => {
    const chunks = [];
    readable.on("data", (chunk) => chunks.push(chunk));
    readable.on("end", () => resolve(Buffer.concat(chunks)));
    readable.on("error", reject);
  });
}

async function handler(req, res) {
  if (req.method !== "POST") {
    res.status(405).end();
    return;
  }

  const secretKey = process.env.STRIPE_SECRET_KEY;
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

  if (!secretKey || !webhookSecret) {
    res.status(500).send("Stripe webhook is not configured yet.");
    return;
  }

  const stripe = Stripe(secretKey);
  const sig = req.headers["stripe-signature"];
  const rawBody = await buffer(req);

  let event;
  try {
    event = stripe.webhooks.constructEvent(rawBody, sig, webhookSecret);
  } catch (err) {
    console.error("Webhook signature verification failed:", err.message);
    res.status(400).send(`Webhook Error: ${err.message}`);
    return;
  }

  switch (event.type) {
    case "checkout.session.completed": {
      const session = event.data.object;
      const courseId = session.metadata && session.metadata.courseId;
      console.log("New subscription started — course:", courseId, "customer:", session.customer);
      // TODO: persist (customer/email -> courseId) to your database here.
      break;
    }
    case "customer.subscription.updated": {
      const sub = event.data.object;
      console.log("Subscription updated — status:", sub.status, "course:", sub.metadata && sub.metadata.courseId);
      // TODO: if sub.status is no longer "active"/"trialing", revoke access.
      break;
    }
    case "customer.subscription.deleted": {
      const sub = event.data.object;
      console.log("Subscription canceled — course:", sub.metadata && sub.metadata.courseId, "customer:", sub.customer);
      // TODO: remove access in your database here.
      break;
    }
    case "invoice.payment_failed": {
      const invoice = event.data.object;
      console.log("Payment failed for subscription:", invoice.subscription);
      // TODO: consider notifying the customer / revoking access after retries fail.
      break;
    }
    default:
      break;
  }

  res.status(200).json({ received: true });
}

// Stripe requires the RAW, unparsed request body to verify the webhook
// signature — this disables Vercel's automatic JSON body parsing for
// this route only.
handler.config = { api: { bodyParser: false } };

module.exports = handler;
