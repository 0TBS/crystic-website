"use client";

import { useState } from "react";
import { imageUrl } from "@/lib/images";

type Props = {
  imageKey?: string;
  alt: string;
  accent: string;
  /** Extra classes for the wrapper (control aspect ratio / rounding here). */
  className?: string;
  priority?: boolean;
};

/**
 * Renders a product photo from img.crystic.ca. If the image is missing or
 * fails to load — which is the case until the Backblaze bucket is populated —
 * it shows a soft gradient placeholder derived from the product's accent
 * colour, so the layout never breaks.
 */
export default function ProductImage({
  imageKey,
  alt,
  accent,
  className = "",
  priority = false,
}: Props) {
  const [failed, setFailed] = useState(false);
  const src = imageKey ? imageUrl(imageKey) : undefined;
  const showPlaceholder = !src || failed;

  return (
    <div
      className={`relative overflow-hidden bg-gray-100 ${className}`}
      style={
        showPlaceholder
          ? {
              backgroundImage: `radial-gradient(circle at 30% 25%, ${accent}, ${accent}00 60%), linear-gradient(135deg, ${accent}33, ${accent}0d)`,
            }
          : undefined
      }
    >
      {showPlaceholder ? (
        <div className="absolute inset-0 flex items-center justify-center">
          <span
            className="rounded-full px-4 py-1.5 text-xs font-medium uppercase tracking-[0.2em] text-white/90 backdrop-blur-sm"
            style={{ backgroundColor: `${accent}cc` }}
          >
            {alt}
          </span>
        </div>
      ) : (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={src}
          alt={alt}
          loading={priority ? "eager" : "lazy"}
          onError={() => setFailed(true)}
          className="h-full w-full object-cover"
        />
      )}
    </div>
  );
}
