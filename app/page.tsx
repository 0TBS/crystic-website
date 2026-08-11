import Link from "next/link";
import ProductCard from "@/components/ProductCard";
import { getFeaturedProducts } from "@/lib/products";

export const revalidate = 300;

const values = [
  {
    title: "Genuine gemstones",
    body: "Every bead is a natural crystal — no dyed glass, no plastic. Sourced with care and hand-selected.",
  },
  {
    title: "Made in small batches",
    body: "Each bracelet is hand-knotted to order in Ontario, so no two are ever exactly alike.",
  },
  {
    title: "Worn with intention",
    body: "Choose a stone for how you want to feel — calm, grounded, confident, open.",
  },
];

export default async function Home() {
  const featured = await getFeaturedProducts();

  return (
    <main>
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-b from-brand/5 via-white to-white">
        <div className="mx-auto max-w-6xl px-6 py-24 sm:py-32">
          <div className="max-w-2xl">
            <p className="text-sm font-medium uppercase tracking-[0.25em] text-brand">
              Handcrafted · Made in Canada
            </p>
            <h1 className="mt-4 text-5xl font-bold tracking-tight text-brand-dark sm:text-6xl">
              Crystal bracelets, worn with intention
            </h1>
            <p className="mt-6 text-lg text-gray-600">
              Genuine gemstone bracelets, hand-knotted in small batches. Choose a
              stone for the energy you want to carry with you.
            </p>
            <div className="mt-10 flex flex-wrap gap-4">
              <Link
                href="/products"
                className="rounded-full bg-brand px-7 py-3 text-sm font-semibold text-white transition-colors hover:bg-brand-dark"
              >
                Shop the collection
              </Link>
              <Link
                href="/about"
                className="rounded-full border border-gray-300 px-7 py-3 text-sm font-semibold text-gray-700 transition-colors hover:border-brand hover:text-brand"
              >
                Our story
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Featured products */}
      <section className="mx-auto max-w-6xl px-6 py-20">
        <div className="flex items-end justify-between">
          <div>
            <h2 className="text-3xl font-bold tracking-tight text-brand-dark">
              Featured bracelets
            </h2>
            <p className="mt-2 text-gray-600">A few favourites from the collection.</p>
          </div>
          <Link
            href="/products"
            className="hidden text-sm font-semibold text-brand hover:text-brand-dark sm:block"
          >
            View all &rarr;
          </Link>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
          {featured.map((product, i) => (
            <ProductCard key={product.slug} product={product} priority={i < 4} />
          ))}
        </div>

        <div className="mt-10 sm:hidden">
          <Link
            href="/products"
            className="text-sm font-semibold text-brand hover:text-brand-dark"
          >
            View all &rarr;
          </Link>
        </div>
      </section>

      {/* Values */}
      <section className="bg-gray-50">
        <div className="mx-auto grid max-w-6xl gap-10 px-6 py-20 sm:grid-cols-3">
          {values.map((v) => (
            <div key={v.title}>
              <h3 className="text-lg font-semibold text-brand-dark">{v.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-gray-600">{v.body}</p>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
