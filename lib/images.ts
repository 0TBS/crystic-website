/**
 * Base URL for product photos and media, served from Backblaze B2.
 *
 * The default is the raw B2 friendly URL for the `crystic-media1` bucket, so
 * images work before the custom domain exists. Once the Cloudflare record for
 * img.crystic.ca is in place, set NEXT_PUBLIC_IMAGE_BASE_URL=https://img.crystic.ca
 * (in each Railway service) to serve them from the clean domain.
 */
export const IMAGE_BASE_URL = (
  process.env.NEXT_PUBLIC_IMAGE_BASE_URL ||
  "https://f005.backblazeb2.com/file/crystic-media1"
).replace(/\/+$/, "");

/** Build a full media URL from a bucket object key. */
export function imageUrl(key: string): string {
  const clean = key.replace(/^\/+/, "");
  return `${IMAGE_BASE_URL}/${clean}`;
}
