import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import ProductImage from "@/components/ProductImage";
import { getAllProducts, getProductBySlug } from "@/lib/products";
import { formatPrice } from "@/lib/types";

export const revalidate = 300;

export async function generateStaticParams() {
  const products = await getAllProducts();
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const product = await getProductBySlug(params.slug);
  if (!product) return { title: "Not found" };
  return {
    title: product.name,
    description: product.tagline,
  };
}

export default async function ProductPage({
  params,
}: {
  params: { slug: string };
}) {
  const product = await getProductBySlug(params.slug);
  if (!product) notFound();

  return (
    <main className="mx-auto max-w-6xl px-6 py-12">
      <Link
        href="/products"
        className="text-sm font-medium text-gray-500 hover:text-brand"
      >
        &larr; Back to all bracelets
      </Link>

      <div className="mt-6 grid gap-10 lg:grid-cols-2">
        {/* Gallery */}
        <div className="space-y-4">
          <ProductImage
            imageKey={product.image_keys[0]}
            alt={product.name}
            accent={product.accent}
            priority
            className="aspect-square rounded-3xl"
          />
          {product.image_keys.length > 1 && (
            <div className="grid grid-cols-3 gap-4">
              {product.image_keys.slice(1).map((key) => (
                <ProductImage
                  key={key}
                  imageKey={key}
                  alt={product.name}
                  accent={product.accent}
                  className="aspect-square rounded-xl"
                />
              ))}
            </div>
          )}
        </div>

        {/* Details */}
        <div className="lg:pt-4">
          <p className="text-sm font-medium uppercase tracking-[0.2em] text-brand">
            {product.stones.join(" · ")}
          </p>
          <h1 className="mt-3 text-4xl font-bold tracking-tight text-brand-dark">
            {product.name}
          </h1>
          <p className="mt-2 text-lg text-gray-500">{product.tagline}</p>

          <p className="mt-6 text-2xl font-semibold text-gray-900">
            {formatPrice(product.price_cents, product.currency)}
          </p>

          <p className="mt-6 leading-relaxed text-gray-600">
            {product.description}
          </p>

          <div className="mt-8">
            <h2 className="text-sm font-semibold uppercase tracking-wide text-gray-400">
              Materials
            </h2>
            <ul className="mt-3 space-y-1.5 text-sm text-gray-600">
              {product.materials.map((m) => (
                <li key={m} className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-brand" />
                  {m}
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-10">
            {product.in_stock ? (
              <a
                href={`mailto:info@crystic.ca?subject=${encodeURIComponent(
                  `Order enquiry: ${product.name}`,
                )}`}
                className="inline-block rounded-full bg-brand px-8 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-brand-dark"
              >
                Enquire to order
              </a>
            ) : (
              <span className="inline-block rounded-full bg-gray-200 px-8 py-3.5 text-sm font-semibold text-gray-500">
                Sold out
              </span>
            )}
            <p className="mt-3 text-xs text-gray-400">
              Each piece is hand-knotted to order. Allow 3–5 business days.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
