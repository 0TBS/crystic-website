import { createClient, type SupabaseClient } from "@supabase/supabase-js";

/**
 * Returns a read-only Supabase client, or null when the public env vars
 * are not configured. Callers fall back to the built-in catalog when this
 * returns null, so the site always renders.
 */
export function getSupabase(): SupabaseClient | null {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!url || !key) {
    return null;
  }

  return createClient(url, key, {
    auth: { persistSession: false },
  });
}
