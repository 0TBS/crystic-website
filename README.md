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

## Images (Backblaze)

Images live in a single Backblaze B2 bucket that BOTH the live and staging
sites share, so no image is ever stored twice. Reference an image like this:

```tsx
import { b2 } from "@/lib/images";

<img src={b2("hero/banner.jpg")} alt="Banner" />
```

The bucket's public base URL is set once via the `NEXT_PUBLIC_B2_BUCKET_URL`
environment variable (identical on both sites).

## Environment variables

See `.env.example`. On Railway these are set in each service's **Variables**
tab. The only variable that differs between the two sites is
`NEXT_PUBLIC_SITE_ENV` (`production` vs `staging`).
