import Link from "next/link";

export default function Footer() {
  return (
    <footer className="mt-24 border-t border-gray-100 bg-gray-50">
      <div className="mx-auto grid max-w-6xl gap-8 px-6 py-12 sm:grid-cols-3">
        <div>
          <p className="text-lg font-semibold text-brand-dark">Crystic</p>
          <p className="mt-2 max-w-xs text-sm text-gray-500">
            Handcrafted crystal bracelets, made in small batches with genuine
            gemstones.
          </p>
        </div>

        <div>
          <p className="text-sm font-semibold uppercase tracking-wide text-gray-400">
            Explore
          </p>
          <ul className="mt-3 space-y-2 text-sm text-gray-600">
            <li>
              <Link href="/products" className="hover:text-brand">
                All bracelets
              </Link>
            </li>
            <li>
              <Link href="/about" className="hover:text-brand">
                Our story
              </Link>
            </li>
            <li>
              <Link href="/contact" className="hover:text-brand">
                Contact
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <p className="text-sm font-semibold uppercase tracking-wide text-gray-400">
            Get in touch
          </p>
          <ul className="mt-3 space-y-2 text-sm text-gray-600">
            <li>
              <a href="mailto:info@crystic.ca" className="hover:text-brand">
                info@crystic.ca
              </a>
            </li>
            <li>
              <a href="tel:+14160000000" className="hover:text-brand">
                416-000-0000
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-gray-100 py-6">
        <p className="text-center text-xs text-gray-400">
          &copy; {new Date().getFullYear()} Crystic. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
