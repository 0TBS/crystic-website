# Crystic — infrastructure setup

This document records how the crystic.ca stack is wired and the remaining
manual steps for image hosting.

## Overview

| Piece      | Service                    | Notes                                             |
| ---------- | -------------------------- | ------------------------------------------------- |
| Framework  | Next.js 14 (App Router)    | This repo.                                         |
| Database   | Supabase (`crystic`)       | Project `hpkfqrcigdwntwcksuve`, region ca-central-1. |
| Images     | Backblaze B2 + Cloudflare  | Bucket `crystic-media1` (us-east-005), public. Photos uploaded; `img.crystic.ca` DNS pending. |
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

## Images — Backblaze B2 (done) + Cloudflare (pending)

The site serves photos from a configurable base URL
(`NEXT_PUBLIC_IMAGE_BASE_URL`). Each product row lists `image_keys` like
`products/amethyst-serenity-01.jpg`. If an image is ever missing, a tasteful
gradient placeholder is shown automatically — nothing breaks.

**Current state:** the bucket `crystic-media1` exists, is **public**, and holds
10 product photos (concept images matched to each stone's colour). The code
default base URL is the raw B2 friendly URL, so images work today:

- Bucket: `crystic-media1`, region `us-east-005`
- S3 endpoint: `https://s3.us-east-005.backblazeb2.com`
- Public download host: `https://f005.backblazeb2.com/file/crystic-media1`
- Example: https://f005.backblazeb2.com/file/crystic-media1/products/amethyst-serenity-01.jpg

> The current photos are royalty-free concept images from Unsplash (free for
> commercial use, no attribution required) — stand-ins until real product
> photography is shot. Replace them any time via the upload step below.

### Uploading / replacing photos

Put images under a local `media/` folder mirroring the keys, e.g.
`media/products/amethyst-serenity-01.jpg`, then:

```bash
export B2_ENDPOINT=https://s3.us-east-005.backblazeb2.com
export B2_REGION=us-east-005
export B2_BUCKET=crystic-media1
export B2_KEY_ID=...        # scoped application key id
export B2_APP_KEY=...       # scoped application key secret
node scripts/upload-media.mjs ./media
```

The script preserves relative paths as object keys and sets a long cache
header. Re-uploading the same key replaces the photo. To swap the placeholder
concept photos for real product shots, drop your images in with the same
filenames and re-run.

### Switch to the clean img.crystic.ca domain (Cloudflare)

B2's friendly URL host differs from the bucket domain, so the clean way to get
`img.crystic.ca` is a CNAME to the B2 host with the bucket path rewritten:

1. In Cloudflare DNS for `crystic.ca`, add a **CNAME**: `img` →
   `f005.backblazeb2.com`, **proxied** (orange cloud).
2. Add a **Transform Rule → Rewrite URL** on `img.crystic.ca` that prefixes the
   path with `/file/crystic-media1`, so
   `img.crystic.ca/products/x.jpg` → `/file/crystic-media1/products/x.jpg`
   at the origin.
3. Alternatively, front the bucket with a small Cloudflare Worker that maps the
   hostname to the B2 file path — this also lets you cache aggressively.
4. Then set `NEXT_PUBLIC_IMAGE_BASE_URL=https://img.crystic.ca` in each Railway
   service. No code change needed.

## Deploy (Railway)

- `staging` branch → **staging.crystic.ca** (set `NEXT_PUBLIC_SITE_ENV=staging`).
- `main` branch → **crystic.ca** (set `NEXT_PUBLIC_SITE_ENV=production`).
- Set the four `NEXT_PUBLIC_*` variables in each service's **Variables** tab.
  Do **not** put `B2_*` upload keys there — those are only for local uploads.
