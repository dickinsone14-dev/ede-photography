import type { Metadata } from "next";
import Image from "next/image";
import ScrollReveal from "@/components/ScrollReveal";

import storeData from "@/content/store.json";

export const metadata: Metadata = {
  title: "Store",
  description:
    "Buy fine art photography prints and digital downloads. Premium giclée prints fulfilled by Picfair with worldwide shipping.",
};

interface StoreImage {
  imageId: string;
  picfairUrl: string;
  title: string;
  thumbnailUrl: string;
  price: string;
}

interface Album {
  name: string;
  albumUrl: string;
  images: StoreImage[];
}

export default function StorePage() {
  const { top10, hiking, winterAlps, jersey } = storeData.albums as {
    top10: Album;
    hiking: Album;
    winterAlps: Album;
    jersey: Album;
  };

  const otherAlbums = [hiking, winterAlps, jersey];

  return (
    <div className="container-wide py-16">
      {/* Header */}
      <ScrollReveal>
        <div className="mb-12">
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-4 text-brand-text">
            Buy Prints & Digital Downloads
          </h1>
          <p className="text-brand-text-light max-w-3xl leading-relaxed">
            All prints are produced on premium giclée photo paper with archival
            inks, ensuring rich colour and lasting quality. Prints are fulfilled
            and shipped worldwide by{" "}
            <a
              href={storeData.picfairUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-brand-teal underline underline-offset-4 hover:text-brand-teal-hover transition-colors"
            >
              Picfair
            </a>{" "}
            — simply choose your image, pick a size, and they handle the rest.
          </p>
        </div>
      </ScrollReveal>

      {/* Top 10 Photos of 2025 */}
      <ScrollReveal>
        <section className="mb-20">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-2xl font-semibold mb-2 text-brand-text">
                Top 10 Photos of 2025
              </h2>
              <p className="text-brand-text-light text-sm">
                A curated selection of the year&apos;s best work — available as
                prints and digital downloads from {top10.images[0]?.price || "£15.99"}.
              </p>
            </div>
            <a
              href={storeData.top10AlbumUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:inline-flex items-center gap-2 bg-brand-accent text-white font-medium py-2.5 px-6 rounded-lg hover:bg-brand-accent-hover hover:scale-[1.02] active:scale-[0.98] transition-all text-sm shrink-0"
            >
              View Album on Picfair
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                />
              </svg>
            </a>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2 sm:gap-3">
            {top10.images.map((img) => (
              <a
                key={img.imageId}
                href={img.picfairUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative aspect-[3/4] overflow-hidden rounded-lg bg-brand-surface transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
              >
                <Image
                  src={img.thumbnailUrl}
                  alt={img.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-3">
                  <p className="text-xs font-medium text-white">{img.title}</p>
                  <p className="text-xs text-white/80 mt-0.5">
                    From {img.price}
                  </p>
                </div>
              </a>
            ))}
          </div>

          {/* Mobile CTA */}
          <a
            href={storeData.top10AlbumUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="sm:hidden inline-flex items-center gap-2 mt-6 bg-brand-accent text-white font-medium py-3 px-6 rounded-lg hover:bg-brand-accent-hover hover:scale-[1.02] active:scale-[0.98] transition-all text-sm w-full justify-center"
          >
            View Album on Picfair
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
              />
            </svg>
          </a>
        </section>
      </ScrollReveal>

      {/* Albums */}
      {otherAlbums.map((album) => (
        <ScrollReveal key={album.name}>
          <section className="mb-16">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-xl font-semibold text-brand-text">{album.name}</h2>
                <p className="text-sm text-brand-text-faint mt-1">
                  {album.images.length} prints available
                </p>
              </div>
              <a
                href={album.albumUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-brand-teal hover:text-brand-teal-hover transition-colors underline underline-offset-4"
              >
                View on Picfair
              </a>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2 sm:gap-3">
              {album.images.map((img) => (
                <a
                  key={img.imageId}
                  href={img.picfairUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative aspect-[3/4] overflow-hidden rounded-lg bg-brand-surface transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
                >
                  <Image
                    src={img.thumbnailUrl}
                    alt={img.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, (max-width: 1024px) 25vw, 20vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-3">
                    <p className="text-xs font-medium text-white">{img.title}</p>
                    <p className="text-xs text-white/80 mt-0.5">
                      From {img.price}
                    </p>
                  </div>
                </a>
              ))}
            </div>
          </section>
        </ScrollReveal>
      ))}

      {/* Full store CTA */}
      <ScrollReveal>
        <section className="text-center py-12 border-t border-b border-brand-border mb-20">
          <h2 className="text-xl font-semibold mb-3 text-brand-text">
            Looking for something specific?
          </h2>
          <p className="text-brand-text-light text-sm mb-6 max-w-lg mx-auto">
            Browse the complete collection on Picfair, where you can choose your
            size, material, and framing options.
          </p>
          <a
            href={storeData.picfairUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-brand-accent text-white font-medium py-3 px-8 rounded-lg hover:bg-brand-accent-hover hover:scale-[1.02] active:scale-[0.98] transition-all"
          >
            Visit Picfair Store
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
              />
            </svg>
          </a>
        </section>
      </ScrollReveal>

      {/* Info section */}
      <ScrollReveal>
        <section>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div>
              <h3 className="text-sm font-medium text-brand-text mb-3">Print Quality</h3>
              <p className="text-sm text-brand-text-light leading-relaxed">
                Every print uses premium giclée photo paper with a lustre finish.
                Canvas, framed, and acrylic options are also available. All prints
                are made to order.
              </p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-brand-text mb-3">Fulfilment</h3>
              <p className="text-sm text-brand-text-light leading-relaxed">
                Prints are produced and shipped by Picfair, a trusted print
                partner. Your order is carefully packaged to arrive in perfect
                condition.
              </p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-brand-text mb-3">Shipping</h3>
              <p className="text-sm text-brand-text-light leading-relaxed">
                UK delivery: 3-5 working days. International shipping available
                worldwide, typically 7-14 working days. All prints arrive in
                protective packaging.
              </p>
            </div>
          </div>
        </section>
      </ScrollReveal>
    </div>
  );
}
