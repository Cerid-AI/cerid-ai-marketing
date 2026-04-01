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

Sentry org: `cerid-ai`, project: `cerid-ai-marketing`.

## Stack

- **Framework:** Next.js 16 (App Router, Turbopack)
- **Styling:** Tailwind CSS v4, shadcn/ui
- **Icons:** Lucide React
- **Error Monitoring:** Sentry (`@sentry/nextjs`)
- **Hosting:** Vercel

## Repository

This site will become its own repository at `Cerid-AI/cerid-ai-marketing`. It was originally part of the `cerid-ai` monorepo at `packages/marketing/`.
