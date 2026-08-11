import type { Product } from "./types";

/**
 * The crystal-bracelet catalog.
 *
 * This is the canonical product list. It is used two ways:
 *   1. As the source data that seeds the Supabase `products` table
 *      (see supabase/seed reflected in the applied migration).
 *   2. As a built-in fallback so the site still renders if Supabase
 *      is unreachable or its env vars are not configured yet.
 *
 * Image keys point at objects in the Backblaze B2 bucket served from
 * https://img.crystic.ca. Until the photos are uploaded the site shows a
 * tasteful gradient placeholder derived from each product's `accent` colour.
 */
export const CATALOG: Product[] = [
  {
    slug: "amethyst-serenity",
    name: "Amethyst Serenity",
    tagline: "Calm the mind, ease into stillness",
    description:
      "Hand-knotted 8mm amethyst rounds on a stretch cord. Amethyst is prized as a stone of calm and intuition — a quiet companion for busy days and restless nights.",
    price_cents: 5800,
    currency: "CAD",
    materials: ["Natural amethyst", "Sterling silver accent bead", "Elastic cord"],
    stones: ["Amethyst"],
    accent: "#9b6bd1",
    image_keys: ["products/amethyst-serenity-01.jpg", "products/amethyst-serenity-02.jpg"],
    featured: true,
    in_stock: true,
    sort_order: 10,
  },
  {
    slug: "rose-quartz-love",
    name: "Rose Quartz Love",
    tagline: "The gentle stone of the heart",
    description:
      "Soft blush rose quartz beads, polished to a satin glow. Long associated with compassion and self-love, this piece is a daily reminder to be tender with yourself.",
    price_cents: 5200,
    currency: "CAD",
    materials: ["Natural rose quartz", "Gold-filled accent bead", "Elastic cord"],
    stones: ["Rose Quartz"],
    accent: "#e8a0b8",
    image_keys: ["products/rose-quartz-love-01.jpg", "products/rose-quartz-love-02.jpg"],
    featured: true,
    in_stock: true,
    sort_order: 20,
  },
  {
    slug: "clear-quartz-clarity",
    name: "Clear Quartz Clarity",
    tagline: "The master stone, amplified",
    description:
      "Crystal-clear quartz that catches the light from every angle. Known as the master healer, clear quartz is believed to amplify intention and bring clarity of thought.",
    price_cents: 4800,
    currency: "CAD",
    materials: ["Natural clear quartz", "Sterling silver accent bead", "Elastic cord"],
    stones: ["Clear Quartz"],
    accent: "#cfd8e3",
    image_keys: ["products/clear-quartz-clarity-01.jpg"],
    featured: false,
    in_stock: true,
    sort_order: 30,
  },
  {
    slug: "black-tourmaline-guardian",
    name: "Black Tourmaline Guardian",
    tagline: "Grounding protection, everyday",
    description:
      "Deep, glassy black tourmaline with subtle striations. A grounding stone traditionally worn for protection and to shield against negative energy.",
    price_cents: 6200,
    currency: "CAD",
    materials: ["Natural black tourmaline", "Matte hematite spacers", "Elastic cord"],
    stones: ["Black Tourmaline", "Hematite"],
    accent: "#3a3a44",
    image_keys: ["products/black-tourmaline-guardian-01.jpg"],
    featured: true,
    in_stock: true,
    sort_order: 40,
  },
  {
    slug: "citrine-abundance",
    name: "Citrine Abundance",
    tagline: "Sunlight you can wear",
    description:
      "Warm, honey-toned citrine that glows like captured sunlight. Called the merchant's stone, citrine is associated with abundance, optimism and fresh energy.",
    price_cents: 5600,
    currency: "CAD",
    materials: ["Natural citrine", "Gold-filled accent bead", "Elastic cord"],
    stones: ["Citrine"],
    accent: "#e0a94b",
    image_keys: ["products/citrine-abundance-01.jpg"],
    featured: false,
    in_stock: true,
    sort_order: 50,
  },
  {
    slug: "tigers-eye-courage",
    name: "Tiger's Eye Courage",
    tagline: "Bold bands of golden brown",
    description:
      "Silky tiger's eye with shifting chatoyant bands. A stone of courage and confidence, worn to stay steady and focused when it matters most.",
    price_cents: 5000,
    currency: "CAD",
    materials: ["Natural tiger's eye", "Bronze accent bead", "Elastic cord"],
    stones: ["Tiger's Eye"],
    accent: "#b07b3e",
    image_keys: ["products/tigers-eye-courage-01.jpg"],
    featured: false,
    in_stock: true,
    sort_order: 60,
  },
  {
    slug: "lapis-lazuli-wisdom",
    name: "Lapis Lazuli Wisdom",
    tagline: "Deep blue flecked with gold",
    description:
      "Rich lapis lazuli scattered with natural pyrite flecks. An ancient stone of wisdom and truth, treasured by royalty for thousands of years.",
    price_cents: 6800,
    currency: "CAD",
    materials: ["Natural lapis lazuli", "Gold-filled accent bead", "Elastic cord"],
    stones: ["Lapis Lazuli", "Pyrite"],
    accent: "#2f5aa8",
    image_keys: ["products/lapis-lazuli-wisdom-01.jpg"],
    featured: false,
    in_stock: true,
    sort_order: 70,
  },
  {
    slug: "green-aventurine-fortune",
    name: "Green Aventurine Fortune",
    tagline: "The stone of opportunity",
    description:
      "Soft green aventurine with a gentle shimmer. Known as the luckiest of crystals, it's worn to welcome opportunity, growth and good fortune.",
    price_cents: 4900,
    currency: "CAD",
    materials: ["Natural green aventurine", "Sterling silver accent bead", "Elastic cord"],
    stones: ["Green Aventurine"],
    accent: "#6bb08a",
    image_keys: ["products/green-aventurine-fortune-01.jpg"],
    featured: true,
    in_stock: true,
    sort_order: 80,
  },
];
