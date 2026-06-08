# Cerid AI Marketing Site

Marketing website for [cerid.ai](https://cerid.ai) — the self-hosted, privacy-first Personal AI Knowledge Companion.

Built with Next.js 16, deployed on Vercel.

## Development

```bash
npm install
npm run dev
```

Opens at [http://localhost:3001](http://localhost:3001).

## Build

```bash
npm run build
npm run start
```

## Deployment

Deployed automatically via Vercel on push to `main`. The Vercel project is linked directly to this repository.

## Environment Variables

| Variable | Required | Where | Purpose |
|----------|----------|-------|---------|
| `NEXT_PUBLIC_SENTRY_DSN` | Yes | Vercel env | Client-side Sentry error reporting |
| `SENTRY_DSN` | Yes | Vercel env | Server-side Sentry error reporting |
| `SENTRY_AUTH_TOKEN` | Yes | GitHub secret + Vercel env | Source map uploads during build |
| `SENTRY_ENVIRONMENT` | No | Vercel env | Defaults to `production` |
| `NEXT_PUBLIC_SENTRY_ENVIRONMENT` | No | Vercel env | Client-side environment label |
| `STRIPE_SECRET_KEY` | Yes (billing) | Vercel env | Stripe live secret key (`sk_live_…`) |
| `STRIPE_WEBHOOK_SECRET` | Yes (billing) | Vercel env | Signing secret for `/api/stripe/webhook` (`whsec_…`) |
| `STRIPE_PRICE_ID_PRO_MONTHLY` | Yes (billing) | Vercel env | Live $15/mo Pro price ID |
| `STRIPE_PRICE_ID_PRO_ANNUAL` | Yes (billing) | Vercel env | Live $144/yr Pro price ID |
| `CERID_LICENSE_PRIVATE_KEY` | Yes (billing) | Vercel env | Ed25519 signing key (raw32 b64) — mints license keys. Never commit. |
| `STRIPE_PORTAL_URL` | No | Vercel env | Stripe-hosted Customer Portal login link; `/billing` redirects here |
| `NEXT_PUBLIC_SITE_URL` | No | Vercel env | Canonical base for Stripe redirect URLs (defaults to `https://cerid.ai`) |

Sentry org: `cerid-ai`, project: `cerid-ai-marketing`.

## Billing

This site is the **billing host** for Cerid Pro (centralized, single-user GA model):

- **`/pricing`** → `/api/checkout` creates a Stripe Checkout Session (monthly/annual, 14-day trial).
- **`/api/stripe/webhook`** verifies the signature and, on `checkout.session.completed`, mints an
  **Ed25519 license key** (signed with `CERID_LICENSE_PRIVATE_KEY`).
- **`/success`** verifies the completed Pro session and shows the key to paste into the self-hosted
  Cerid app (Settings → Pro). The app validates it offline with its embedded public key.
- **`/billing`** redirects to the Stripe-hosted Customer Portal login (`STRIPE_PORTAL_URL`) for
  self-service subscription management — no secret key or customer lookup runs in this app. Enable
  the login page in the Stripe Dashboard (Settings → Billing → Customer portal) and set the URL.

The Stripe secret key never leaves Vercel; the self-hosted app never holds it.

## Stack

- **Framework:** Next.js 16 (App Router, Turbopack)
- **Styling:** Tailwind CSS v4, shadcn/ui
- **Icons:** Lucide React
- **Error Monitoring:** Sentry (`@sentry/nextjs`)
- **Hosting:** Vercel

## Repository

This site was extracted from the `cerid-ai` monorepo (`packages/marketing/`) into its own repository at `Cerid-AI/cerid-ai-marketing`.
