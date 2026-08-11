import type { Metadata } from "next";
import ProductCard from "@/components/ProductCard";
import { getAllProducts } from "@/lib/products";

export const revalidate = 300;

export const metadata: Metadata = {
  title: "All Bracelets",
  description:
    "Browse the full Crystic collection of handcrafted crystal bracelets.",
};

export default async function ProductsPage() {
  const products = await getAllProducts();

  return (
    <main className="mx-auto max-w-6xl px-6 py-16">
      <header className="max-w-2xl">
        <h1 className="text-4xl font-bold tracking-tight text-brand-dark">
          The collection
        </h1>
        <p className="mt-3 text-gray-600">
          {products.length} handcrafted crystal bracelets, each made with genuine
          gemstones. Choose a stone for the energy you want to carry.
        </p>
      </header>

      <div className="mt-12 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
        {products.map((product, i) => (
          <ProductCard key={product.slug} product={product} priority={i < 3} />
        ))}
      </div>
    </main>
  );
}
