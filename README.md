# Crystic Website

The website for **crystic.ca** — handcrafted crystal bracelets — built with
Next.js, Supabase and Backblaze B2.

- **Live site:** https://crystic.ca — deploys automatically from the `main` branch.
- **Staging site:** https://staging.crystic.ca — deploys automatically from the `staging` branch.

## What's here

- A full catalog site: home, product grid, individual product pages, about and
  contact.
- Products are read from a **Supabase** database (`crystic` project) with a
  read-only public policy. `lib/catalog.ts` mirrors the data as an offline
  fallback so the site always renders.
- Product photos are served from **Backblaze B2** via Cloudflare at
  `img.crystic.ca`. Until photos are uploaded, a gradient placeholder is shown.

See [`docs/SETUP.md`](docs/SETUP.md) for the full infrastructure notes and the
remaining image-hosting steps.

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

See `.env.example`. Set these in each Railway service's **Variables** tab:

| Variable                        | Purpose                                             |
| ------------------------------- | --------------------------------------------------- |
| `NEXT_PUBLIC_SITE_ENV`          | `production` or `staging` (staging shows a banner).  |
| `NEXT_PUBLIC_SUPABASE_URL`      | Supabase project URL.                               |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase publishable key (read-only, safe to expose).|
| `NEXT_PUBLIC_IMAGE_BASE_URL`    | Media base URL, e.g. `https://img.crystic.ca`.      |

## Uploading product photos

```bash
node scripts/upload-media.mjs ./media
```

Requires `B2_*` credentials in your shell — see `.env.example` and
`docs/SETUP.md`. These upload keys are **not** web env vars; keep them local.
