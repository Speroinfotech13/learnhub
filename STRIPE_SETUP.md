# Setting Up Real Stripe Subscriptions

LearnHub now redirects to **real Stripe Checkout** for every $5/month
course subscription. This guide gets that working on your live site.

---

## What you're adding

```
your-project/
├── api/
│   ├── tutor.js                     ← (from the earlier AI Tutor setup)
│   ├── create-checkout-session.js   ← NEW — starts a subscription
│   ├── verify-session.js            ← NEW — confirms it's really active
│   └── stripe-webhook.js            ← NEW — listens for renewals/cancellations
├── src/
│   └── App.jsx
├── .env.example                      ← updated with Stripe variables
├── package.json
└── vite.config.js
```

All three new files go inside the `api/` folder at your project **root**
(same level as `package.json`).

---

## 1. Install the Stripe package

```bash
npm install stripe
```

## 2. Get your Stripe API keys

1. Create a free account at [stripe.com](https://stripe.com)
2. Go to [dashboard.stripe.com/apikeys](https://dashboard.stripe.com/apikeys)
3. Copy your **Secret key** — while testing, use the one that starts
   with `sk_test_` (Stripe gives you a separate test/live toggle)

## 3. Add the secret key to Vercel

In your Vercel project: **Settings → Environment Variables**
- Name: `STRIPE_SECRET_KEY`
- Value: your `sk_test_...` key

## 4. Set up the webhook (for renewals & cancellations)

1. In Stripe Dashboard → **Developers → Webhooks → Add endpoint**
2. Endpoint URL: `https://yourdomain.com/api/stripe-webhook`
3. Select these events to send:
   - `checkout.session.completed`
   - `customer.subscription.updated`
   - `customer.subscription.deleted`
   - `invoice.payment_failed`
4. After creating it, Stripe shows a **Signing secret** (`whsec_...`) —
   copy it
5. Add it to Vercel as `STRIPE_WEBHOOK_SECRET`

## 5. Redeploy
Environment variables only take effect after a fresh deploy.

## 6. Test it
Use Stripe's official test card while in test mode:
- Card number: `4242 4242 4242 4242`
- Any future expiry date, any 3-digit CVC, any ZIP

Click **Subscribe & Start** on any course → you should land on a real
Stripe Checkout page → complete payment with the test card → you're
redirected back to LearnHub with the course unlocked.

---

## How the flow works

1. Learner clicks **Subscribe & Start** → frontend calls
   `/api/create-checkout-session` → Stripe returns a checkout URL →
   browser redirects there.
2. Learner enters card details on Stripe's own page (LearnHub never
   sees or stores them — this keeps you out of PCI compliance scope).
3. Stripe redirects back to your site with a `session_id` in the URL.
4. The frontend calls `/api/verify-session` to confirm with Stripe that
   the subscription is genuinely active before unlocking the course —
   it never trusts the URL by itself.
5. In the background, `stripe-webhook.js` receives events for the full
   subscription lifecycle (renewals, cancellations, failed payments),
   which is the reliable long-term source of truth.

---

## ⚠️ Important limitation: no database yet

Right now, "who is subscribed to what" is only remembered for the
**current browser tab**, right after returning from checkout. If the
learner closes the tab and comes back tomorrow, LearnHub has no way to
know they're still subscribed — there's no database backing this yet.

The `stripe-webhook.js` file has `TODO` comments marking exactly where
to add persistent storage. For a real production launch, connect one
of these and write the subscription status there on each webhook event:

- [Vercel Postgres](https://vercel.com/docs/storage/vercel-postgres)
- [Supabase](https://supabase.com) (free tier available)
- [Vercel KV](https://vercel.com/docs/storage/vercel-kv) (simplest, key-value)

This also means you'll eventually want basic user accounts (so a
returning learner can "log in" and see their active subscriptions)
rather than relying purely on the checkout redirect.

---

## Going live for real

When you're ready to charge real money:
1. Complete Stripe's account activation (business details, bank account)
2. Switch your dashboard from **Test mode** to **Live mode**
3. Replace `STRIPE_SECRET_KEY` with your live secret key (`sk_live_...`)
4. Create a new live-mode webhook endpoint and update
   `STRIPE_WEBHOOK_SECRET` to match
5. Redeploy

---

## Troubleshooting

| Symptom | Likely cause |
|---|---|
| "Stripe is not configured yet" | `STRIPE_SECRET_KEY` not set, or you forgot to redeploy |
| Checkout works but course never unlocks | Check `verify-session.js` is deployed and reachable at `/api/verify-session` |
| Webhook shows failed delivery in Stripe dashboard | `STRIPE_WEBHOOK_SECRET` missing or doesn't match the endpoint you created |
| "Checkout isn't available in this preview" | Expected — this only works once deployed with the `api/` folder, not inside the Claude.ai chat preview |
