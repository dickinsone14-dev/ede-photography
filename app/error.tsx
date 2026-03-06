"use client";

import Link from "next/link";

export default function Error({ reset }: { error: Error; reset: () => void }) {
  return (
    <div className="container-wide py-32 text-center">
      <h1 className="text-6xl font-bold tracking-tight mb-4 text-brand-text">500</h1>
      <p className="text-brand-text-light mb-8">
        Something went wrong. Please try again.
      </p>
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <button
          onClick={reset}
          className="inline-flex items-center justify-center bg-brand-accent text-white font-medium py-3 px-8 rounded-lg hover:bg-brand-accent-hover hover:scale-[1.02] active:scale-[0.98] transition-all"
        >
          Try Again
        </button>
        <Link
          href="/"
          className="inline-flex items-center justify-center border border-brand-border text-brand-text font-medium py-3 px-8 rounded-lg hover:border-brand-text-faint hover:text-brand-teal hover:scale-[1.02] active:scale-[0.98] transition-all"
        >
          Back to Home
        </Link>
      </div>
    </div>
  );
}
