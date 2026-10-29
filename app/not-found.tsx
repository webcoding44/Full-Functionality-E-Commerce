
import Link from "next/link";


export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col bg-slate-50 text-slate-900">

      <main className="relative flex flex-1 items-center justify-center overflow-hidden px-4 py-16">
        {/* Decorative background */}
        <div
          aria-hidden="true"
          className="absolute -right-32 -top-20 h-72 w-72 rounded-full bg-indigo-100/70 blur-3xl"
        />
        <div
          aria-hidden="true"
          className="absolute -bottom-20 -left-24 h-72 w-72 rounded-full bg-orange-100/70 blur-3xl"
        />

        <section className="relative z-10 mx-auto w-full max-w-xl text-center">
          {/* Shopping bag icon */}
          <div className="mx-auto mb-6 flex h-24 w-24 items-center justify-center rounded-3xl bg-indigo-100 text-indigo-600 ring-8 ring-white shadow-sm">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="46"
              height="46"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M5 8h14l1 13H4L5 8Z" />
              <path d="M9 9V6a3 3 0 0 1 6 0v3" />
              <path d="m9 14 6 4" />
              <path d="m15 14-6 4" />
            </svg>
          </div>

          <p className="mb-2 text-sm font-bold tracking-widest text-indigo-600">
            ERROR 404
          </p>

          <h1 className="text-5xl font-black tracking-tight text-slate-900 sm:text-7xl">
            Oops! <span className="text-indigo-600">404</span>
          </h1>

          <h2 className="mt-5 text-2xl font-bold sm:text-3xl">
            Page Not Found
          </h2>

          <p className="mx-auto mt-4 max-w-md text-base leading-8 text-slate-500">
            Sorry, the page you're looking for doesn't exist.
            It may have been moved, deleted, or the URL might be incorrect.
            Let's help you find what you need.
          </p>

          {/* Action buttons */}
          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">

            <Link
              href="/"
              className="inline-flex min-h-12 items-center justify-center rounded-xl border border-slate-200 bg-white px-6 py-3 font-semibold text-slate-700 transition hover:border-indigo-200 hover:bg-indigo-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-600 focus-visible:ring-offset-2"
            >
              Back to Home
            </Link>
          </div>
        </section>
      </main>

    </div>
  );
}
