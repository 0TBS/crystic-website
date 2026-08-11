import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "About",
  description:
    "The story behind Crystic — handcrafted crystal bracelets made in small batches in Ontario.",
};

export default function AboutPage() {
  return (
    <main className="mx-auto max-w-3xl px-6 py-16">
      <h1 className="text-4xl font-bold tracking-tight text-brand-dark">
        Our story
      </h1>

      <div className="mt-8 space-y-6 leading-relaxed text-gray-600">
        <p>
          Crystic began with a simple idea: that the things we wear every day
          should mean something. What started as bracelets made for friends and
          family grew into a small studio dedicated to genuine crystal jewellery.
        </p>
        <p>
          Every Crystic bracelet is hand-knotted in small batches in Ontario,
          Canada. We use only natural gemstones — never dyed glass or plastic —
          and hand-select each strand for colour and clarity. Because they&rsquo;re
          made by hand, no two bracelets are ever exactly alike.
        </p>
        <p>
          Crystals have been worn for their beauty and meaning for thousands of
          years. We don&rsquo;t make medical claims — we simply believe there&rsquo;s
          something grounding about choosing a stone that reflects how you want to
          feel, and carrying it with you through your day.
        </p>
        <p>
          Thank you for being here. We&rsquo;re a small team, and every order
          genuinely means a lot.
        </p>
      </div>

      <div className="mt-10">
        <Link
          href="/products"
          className="rounded-full bg-brand px-7 py-3 text-sm font-semibold text-white transition-colors hover:bg-brand-dark"
        >
          Browse the collection
        </Link>
      </div>
    </main>
  );
}
