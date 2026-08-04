export default function Home() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-gradient-to-b from-white to-gray-50 px-6">
      <div className="text-center">
        <h1 className="text-5xl sm:text-7xl font-bold tracking-tight text-brand-dark">
          Crystic
        </h1>

        <div className="mt-6 flex items-center justify-center gap-3">
          <span className="h-px w-10 bg-gray-300" />
          <p className="text-sm sm:text-base font-medium uppercase tracking-[0.25em] text-gray-500">
            Coming Soon
          </p>
          <span className="h-px w-10 bg-gray-300" />
        </div>

        <p className="mt-8 text-lg text-gray-600 max-w-md mx-auto">
          Our new website is on its way. We can&rsquo;t wait to share it with you.
        </p>

        <p className="mt-12 text-sm text-gray-400">
          &copy; {new Date().getFullYear()} Crystic
        </p>
      </div>
    </main>
  );
}
