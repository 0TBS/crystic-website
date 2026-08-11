# Crystic — infrastructure setup

This document records how the crystic.ca stack is wired and the remaining
manual steps for image hosting.

## Overview

| Piece      | Service                    | Notes                                             |
| ---------- | -------------------------- | ------------------------------------------------- |
| Framework  | Next.js 14 (App Router)    | This repo.                                         |
| Database   | Supabase (`crystic`)       | Project `hpkfqrcigdwntwcksuve`, region ca-central-1. |
| Images     | Backblaze B2 + Cloudflare  | Served at `img.crystic.ca`. **Setup pending.**    |
| Hosting    | Railway                    | `main` → crystic.ca, `staging` → staging.crystic.ca. |

## Supabase (done)

- Project: **crystic** (`hpkfqrcigdwntwcksuve`), org BrandingCentres.com.
- Table `public.products` holds the catalog. Row-level security is on with a
  public **read-only** policy — the browser can list products but cannot write.
- The catalog was seeded from `lib/catalog.ts` (8 bracelets). That file also
  serves as an offline fallback so the site renders even if Supabase is
  unreachable.
- Client config (safe to expose, read-only):
  - `NEXT_PUBLIC_SUPABASE_URL=https://hpkfqrcigdwntwcksuve.supabase.co`
  - `NEXT_PUBLIC_SUPABASE_ANON_KEY=` publishable key (Dashboard → Project
    Settings → API).

### Editing the catalog

Edit rows directly in the Supabase Table Editor, or add a migration. The site
revalidates every 5 minutes (`export const revalidate = 300`), so changes
appear shortly after. Keep `lib/catalog.ts` roughly in sync if you want the
offline fallback to match.

## Images — Backblaze B2 + Cloudflare (pending valid credentials)

The site already serves photos from a configurable base URL
(`NEXT_PUBLIC_IMAGE_BASE_URL`, default `https://img.crystic.ca`). Each product
row lists `image_keys` like `products/amethyst-serenity-01.jpg`, which resolve
to `https://img.crystic.ca/products/amethyst-serenity-01.jpg`. Until the photos
exist, a tasteful gradient placeholder is shown automatically — nothing breaks.

To finish image hosting:

### 1. Create the B2 bucket

1. In Backblaze B2, create a **public** bucket named `crystic-media1`.
2. Create an **application key** scoped to that bucket (read & write).
3. Note the S3 endpoint (e.g. `https://s3.us-west-004.backblazeb2.com`), the
   region (e.g. `us-west-004`), the key ID and the key secret.

### 2. Upload photos

Put images under a local `media/` folder mirroring the keys, e.g.
`media/products/amethyst-serenity-01.jpg`, then:

```bash
export B2_ENDPOINT=https://s3.us-west-004.backblazeb2.com
export B2_REGION=us-west-004
export B2_BUCKET=crystic-media1
export B2_KEY_ID=...        # scoped application key id
export B2_APP_KEY=...       # scoped application key secret
node scripts/upload-media.mjs ./media
```

The script preserves relative paths as object keys and sets a long cache
header.

### 3. Point img.crystic.ca at the bucket (Cloudflare)

Because B2's friendly URL host differs from the bucket domain, the clean way to
get `img.crystic.ca` is a Cloudflare Worker or a CNAME to the B2 host with the
bucket path rewritten. Simplest reliable option:

1. In Cloudflare DNS for `crystic.ca`, add a **CNAME**: `img` →
   `f004.backblazeb2.com` (use the `fNNN` host from your bucket's friendly
   URL), **proxied** (orange cloud).
2. Add a **Transform Rule → Rewrite URL** on `img.crystic.ca` that prefixes the
   path with `/file/crystic-media1`, so
   `img.crystic.ca/products/x.jpg` → `/file/crystic-media1/products/x.jpg`
   at the origin.
3. Alternatively, front the bucket with a small Cloudflare Worker that maps the
   hostname to the B2 file path — this also lets you cache aggressively.

Once DNS resolves, the placeholders are replaced by real photos with no code
change (the URLs already point at `img.crystic.ca`).

> Note: the B2 credentials that were present in the build environment were
> scoped to a different site's bucket (`theteslawrapshop-media`) and returned
> `InvalidAccessKeyId`, so the bucket/keys above must be created fresh for
> crystic.

## Deploy (Railway)

- `staging` branch → **staging.crystic.ca** (set `NEXT_PUBLIC_SITE_ENV=staging`).
- `main` branch → **crystic.ca** (set `NEXT_PUBLIC_SITE_ENV=production`).
- Set the four `NEXT_PUBLIC_*` variables in each service's **Variables** tab.
  Do **not** put `B2_*` upload keys there — those are only for local uploads.
