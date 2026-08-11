import Link from "next/link";
import ProductImage from "./ProductImage";
import { formatPrice, type Product } from "@/lib/types";

export default function ProductCard({
  product,
  priority = false,
}: {
  product: Product;
  priority?: boolean;
}) {
  return (
    <Link href={`/products/${product.slug}`} className="group block">
      <ProductImage
        imageKey={product.image_keys[0]}
        alt={product.name}
        accent={product.accent}
        priority={priority}
        className="aspect-square rounded-2xl transition-transform duration-300 group-hover:scale-[1.02]"
      />
      <div className="mt-4 flex items-start justify-between gap-3">
        <div>
          <h3 className="font-medium text-brand-dark">{product.name}</h3>
          <p className="mt-0.5 text-sm text-gray-500">{product.tagline}</p>
        </div>
        <p className="shrink-0 font-medium text-gray-900">
          {formatPrice(product.price_cents, product.currency)}
        </p>
      </div>
      {!product.in_stock && (
        <p className="mt-1 text-xs font-medium uppercase tracking-wide text-gray-400">
          Sold out
        </p>
      )}
    </Link>
  );
}
