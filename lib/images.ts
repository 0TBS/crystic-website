// Helper for building image URLs that point at your shared Backblaze bucket.
//
// Usage in a component:
//   import { b2 } from "@/lib/images";
//   <img src={b2("hero/banner.jpg")} alt="Banner" />
//
// Because NEXT_PUBLIC_B2_BUCKET_URL is the SAME on the live and staging sites,
// this function returns the same URL in both — so both sites pull from one
// shared image folder and you never store an image twice.
export function b2(path: string): string {
  const base = process.env.NEXT_PUBLIC_B2_BUCKET_URL ?? "";
  const cleanBase = base.replace(/\/+$/, "");
  const cleanPath = path.replace(/^\/+/, "");
  return `${cleanBase}/${cleanPath}`;
}
