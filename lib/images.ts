/**
 * Base URL for product photos and media, served from Backblaze B2 through
 * Cloudflare at https://img.crystic.ca. Override with NEXT_PUBLIC_IMAGE_BASE_URL
 * (e.g. to point at the raw B2 friendly URL before the custom domain is live).
 */
export const IMAGE_BASE_URL = (
  process.env.NEXT_PUBLIC_IMAGE_BASE_URL || "https://img.crystic.ca"
).replace(/\/+$/, "");

/** Build a full media URL from a bucket object key. */
export function imageUrl(key: string): string {
  const clean = key.replace(/^\/+/, "");
  return `${IMAGE_BASE_URL}/${clean}`;
}
