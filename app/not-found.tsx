import Link from "next/link";

export default function NotFound() {
  return (
    <div className="container-wide py-32 text-center">
      <h1 className="text-6xl font-bold tracking-tight mb-4">404</h1>
      <p className="text-gray-400 mb-8">
        This page doesn&apos;t exist. It may have been moved or removed.
      </p>
      <Link
        href="/"
        className="inline-flex items-center justify-center bg-white text-charcoal-900 font-medium py-3 px-8 rounded-lg hover:bg-gray-200 transition-colors"
      >
        Back to Home
      </Link>
    </div>
  );
}
