import { CATALOG } from "./catalog";
import { getSupabase } from "./supabase";
import type { Product } from "./types";

const SELECT =
  "slug,name,tagline,description,price_cents,currency,materials,stones,accent,image_keys,featured,in_stock,sort_order";

function fromCatalog(): Product[] {
  return [...CATALOG].sort((a, b) => a.sort_order - b.sort_order);
}

/** All products, ordered by sort_order. Falls back to the built-in catalog. */
export async function getAllProducts(): Promise<Product[]> {
  const supabase = getSupabase();
  if (!supabase) return fromCatalog();

  const { data, error } = await supabase
    .from("products")
    .select(SELECT)
    .order("sort_order", { ascending: true });

  if (error || !data || data.length === 0) {
    return fromCatalog();
  }
  return data as Product[];
}

/** Featured products for the homepage. */
export async function getFeaturedProducts(): Promise<Product[]> {
  const all = await getAllProducts();
  return all.filter((p) => p.featured);
}

/** A single product by slug, or null if not found. */
export async function getProductBySlug(slug: string): Promise<Product | null> {
  const supabase = getSupabase();
  if (!supabase) {
    return fromCatalog().find((p) => p.slug === slug) ?? null;
  }

  const { data, error } = await supabase
    .from("products")
    .select(SELECT)
    .eq("slug", slug)
    .maybeSingle();

  if (error || !data) {
    return fromCatalog().find((p) => p.slug === slug) ?? null;
  }
  return data as Product;
}
