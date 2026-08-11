export type Product = {
  slug: string;
  name: string;
  tagline: string;
  description: string;
  price_cents: number;
  currency: string;
  materials: string[];
  stones: string[];
  /** Hex accent colour used for the gradient placeholder before real photos exist. */
  accent: string;
  /** Object keys in the Backblaze bucket, e.g. "products/amethyst-serenity-01.jpg". */
  image_keys: string[];
  featured: boolean;
  in_stock: boolean;
  sort_order: number;
};

export function formatPrice(cents: number, currency = "CAD"): string {
  return new Intl.NumberFormat("en-CA", {
    style: "currency",
    currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  }).format(cents / 100);
}
