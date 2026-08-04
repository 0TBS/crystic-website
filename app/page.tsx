export default function Home() {
  return (
    <main className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="w-full border-b border-gray-100">
        <div className="max-w-5xl mx-auto px-6 py-5 flex items-center justify-between">
          <span className="text-xl font-bold tracking-tight text-brand-dark">
            Crystic
          </span>
          <nav className="hidden sm:flex gap-8 text-sm text-gray-600">
            <a href="#about" className="hover:text-brand">
              About
            </a>
            <a href="#services" className="hover:text-brand">
              Services
            </a>
            <a href="#contact" className="hover:text-brand">
              Contact
            </a>
          </nav>
        </div>
      </header>

      {/* Hero */}
      <section className="flex-1 flex items-center">
        <div className="max-w-5xl mx-auto px-6 py-24 text-center">
          <h1 className="text-4xl sm:text-6xl font-bold tracking-tight text-gray-900">
            Welcome to <span className="text-brand">Crystic</span>
          </h1>
          <p className="mt-6 text-lg text-gray-600 max-w-2xl mx-auto">
            Your new website is live and ready. This is a starter homepage — we
            can shape it into anything you like from here.
          </p>
          <div className="mt-10 flex gap-4 justify-center">
            <a
              href="#contact"
              className="rounded-full bg-brand px-6 py-3 text-white font-medium hover:bg-brand-dark transition-colors"
            >
              Get in touch
            </a>
            <a
              href="#about"
              className="rounded-full border border-gray-300 px-6 py-3 text-gray-700 font-medium hover:border-brand hover:text-brand transition-colors"
            >
              Learn more
            </a>
          </div>
        </div>
      </section>

      {/* Simple content sections so the page has real structure to build on */}
      <section id="about" className="border-t border-gray-100">
        <div className="max-w-5xl mx-auto px-6 py-20">
          <h2 className="text-2xl font-bold text-gray-900">About</h2>
          <p className="mt-4 text-gray-600 max-w-2xl">
            Replace this text with a short description of Crystic. This section
            is a placeholder so you can see how content blocks look.
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer id="contact" className="border-t border-gray-100 bg-gray-50">
        <div className="max-w-5xl mx-auto px-6 py-12 text-center text-sm text-gray-500">
          <p>&copy; {new Date().getFullYear()} Crystic. All rights reserved.</p>
        </div>
      </footer>
    </main>
  );
}
