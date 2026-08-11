import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact",
  description: "Get in touch with Crystic about orders, custom pieces and more.",
};

export default function ContactPage() {
  return (
    <main className="mx-auto max-w-3xl px-6 py-16">
      <h1 className="text-4xl font-bold tracking-tight text-brand-dark">
        Get in touch
      </h1>
      <p className="mt-3 text-gray-600">
        Questions about an order, a custom piece, or a stone you&rsquo;re after?
        We&rsquo;d love to hear from you.
      </p>

      <div className="mt-10 grid gap-6 sm:grid-cols-2">
        <a
          href="mailto:info@crystic.ca"
          className="rounded-2xl border border-gray-200 p-6 transition-colors hover:border-brand"
        >
          <p className="text-sm font-semibold uppercase tracking-wide text-gray-400">
            Email
          </p>
          <p className="mt-2 text-lg font-medium text-brand-dark">
            info@crystic.ca
          </p>
          <p className="mt-1 text-sm text-gray-500">We reply within 1–2 days.</p>
        </a>

        <a
          href="tel:+14160000000"
          className="rounded-2xl border border-gray-200 p-6 transition-colors hover:border-brand"
        >
          <p className="text-sm font-semibold uppercase tracking-wide text-gray-400">
            Phone
          </p>
          <p className="mt-2 text-lg font-medium text-brand-dark">
            416-000-0000
          </p>
          <p className="mt-1 text-sm text-gray-500">Mon–Fri, 10am–5pm ET.</p>
        </a>
      </div>

      <div className="mt-10 rounded-2xl bg-gray-50 p-6">
        <h2 className="text-lg font-semibold text-brand-dark">Custom orders</h2>
        <p className="mt-2 text-sm leading-relaxed text-gray-600">
          Looking for a specific stone, size, or a matching set? Email us with
          what you have in mind and we&rsquo;ll put together something just for
          you.
        </p>
      </div>
    </main>
  );
}
