import Link from "next/link";

export default function NotFound() {
  return (
    <div className="container-wide py-32 text-center">
      <h1 className="text-6xl font-bold tracking-tight mb-4 text-brand-text">404</h1>
      <p className="text-brand-text-light mb-8">
        This page doesn&apos;t exist. It may have been moved or removed.
      </p>
      <Link
        href="/"
        className="inline-flex items-center justify-center bg-brand-accent text-white font-medium py-3 px-8 rounded-lg hover:bg-brand-accent-hover hover:scale-[1.02] active:scale-[0.98] transition-all"
      >
        Back to Home
      </Link>
    </div>
  );
}
