# Crystic Website

The website for **crystic.ca**, built with Next.js.

- **Live site:** https://crystic.ca — deploys automatically from the `main` branch.
- **Staging site:** https://staging.crystic.ca — deploys automatically from the `staging` branch.

## How the workflow works

1. Every change is made on the `staging` branch first.
2. Railway automatically deploys `staging` to **staging.crystic.ca** so it can be tested.
3. Once the change looks good on staging, `staging` is merged into `main`.
4. Railway automatically deploys `main` to **crystic.ca** (the live site).

You never edit the live site directly — you test on staging, then promote.

## Running locally

```bash
npm install
cp .env.example .env.local   # then fill in your real values
npm run dev                  # opens http://localhost:3000
```

## Environment variables

See `.env.example`. On Railway these are set in each service's **Variables**
tab. The only variable is `NEXT_PUBLIC_SITE_ENV` (`production` on the live
service, `staging` on the staging service — the latter shows an orange
"STAGING" banner).
