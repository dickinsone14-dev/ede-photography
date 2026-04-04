"use client";

import Image from "next/image";
import Link from "next/link";
import { useFavourites } from "@/lib/favourites";
import { useState } from "react";

export default function FavouritesPage() {
  const { favourites, clear, toggle } = useFavourites();
  const [lightboxSrc, setLightboxSrc] = useState<string | null>(null);

  if (favourites.length === 0) {
    return (
      <div className="container-narrow py-24 text-center">
        <h1 className="text-3xl md:text-4xl font-semibold tracking-tight text-brand-text mb-4">
          Favourites
        </h1>
        <p className="text-brand-text-light mb-8">
          You haven&apos;t saved any images yet. Browse the galleries and tap the
          heart icon to save images here.
        </p>
        <Link
          href="/portfolio"
          className="inline-block bg-brand-accent text-white font-medium py-3 px-8 rounded-lg hover:bg-brand-accent-hover transition-colors"
        >
          Browse Portfolio
        </Link>
      </div>
    );
  }

  return (
    <div className="container-wide py-16">
      <div className="flex items-center justify-between mb-10">
        <div>
          <h1 className="text-3xl md:text-4xl font-semibold tracking-tight text-brand-text">
            Favourites
          </h1>
          <p className="text-sm text-brand-text-faint mt-1">
            {favourites.length} saved image{favourites.length !== 1 ? "s" : ""}
          </p>
        </div>
        <button
          onClick={clear}
          className="text-xs text-brand-text-faint hover:text-red-400 transition-colors tracking-wide uppercase"
        >
          Clear all
        </button>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2 sm:gap-4">
        {favourites.map((src) => (
          <div key={src} className="group relative aspect-[16/10] overflow-hidden rounded-lg bg-brand-surface">
            <Image
              src={src}
              alt=""
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-[1.02]"
              sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
              onClick={() => setLightboxSrc(src)}
            />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />

            {/* Remove button */}
            <button
              onClick={() => toggle(src)}
              className="absolute top-2 right-2 z-10 p-1.5 rounded-full bg-black/50 text-red-400 opacity-0 group-hover:opacity-100 max-sm:opacity-70 transition-opacity duration-200"
              aria-label="Remove from favourites"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-4 h-4"
              >
                <path d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z" />
              </svg>
            </button>
          </div>
        ))}
      </div>

      <div className="mt-12 text-center">
        <p className="text-sm text-brand-text-faint mb-4">
          Interested in purchasing prints?
        </p>
        <Link
          href="/store"
          className="inline-block bg-brand-accent text-white font-medium py-3 px-8 rounded-lg hover:bg-brand-accent-hover transition-colors"
        >
          Visit the Store
        </Link>
      </div>
    </div>
  );
}
