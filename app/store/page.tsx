import type { Metadata } from "next";
import Image from "next/image";
import storeData from "@/content/store.json";

export const metadata: Metadata = {
  title: "Store",
  description:
    "Buy fine art landscape photography prints and digital downloads. Premium giclée prints fulfilled by Picfair with worldwide shipping.",
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
      <div className="mb-12">
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
          Buy Prints & Digital Downloads
        </h1>
        <p className="text-gray-400 max-w-3xl leading-relaxed">
          All prints are produced on premium giclée photo paper with archival
          inks, ensuring rich colour and lasting quality. Prints are fulfilled
          and shipped worldwide by{" "}
          <a
            href={storeData.picfairUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-white underline underline-offset-4 hover:text-gray-300 transition-colors"
          >
            Picfair
          </a>{" "}
          — simply choose your image, pick a size, and they handle the rest.
        </p>
      </div>

      {/* Top 10 Photos of 2025 */}
      <section className="mb-20">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl font-semibold mb-2">
              Top 10 Photos of 2025
            </h2>
            <p className="text-gray-400 text-sm">
              A curated selection of the year&apos;s best work — available as
              prints and digital downloads from {top10.images[0]?.price || "£15.99"}.
            </p>
          </div>
          <a
            href={storeData.top10AlbumUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:inline-flex items-center gap-2 bg-white text-charcoal-900 font-medium py-2.5 px-6 rounded-lg hover:bg-gray-200 transition-colors text-sm shrink-0"
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

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
          {top10.images.map((img) => (
            <a
              key={img.imageId}
              href={img.picfairUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative aspect-[3/4] overflow-hidden rounded-lg bg-charcoal-800"
            >
              <Image
                src={img.thumbnailUrl}
                alt={img.title}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
                sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="absolute bottom-0 left-0 right-0 p-3 translate-y-2 opacity-0 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
                <p className="text-xs font-medium">{img.title}</p>
                <p className="text-xs text-gray-300 mt-0.5">
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
          className="sm:hidden inline-flex items-center gap-2 mt-6 bg-white text-charcoal-900 font-medium py-3 px-6 rounded-lg hover:bg-gray-200 transition-colors text-sm w-full justify-center"
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

      {/* Albums */}
      {otherAlbums.map((album) => (
        <section key={album.name} className="mb-16">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-xl font-semibold">{album.name}</h2>
              <p className="text-sm text-gray-500 mt-1">
                {album.images.length} prints available
              </p>
            </div>
            <a
              href={album.albumUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-gray-500 hover:text-white transition-colors underline underline-offset-4"
            >
              View on Picfair
            </a>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
            {album.images.map((img) => (
              <a
                key={img.imageId}
                href={img.picfairUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative aspect-[3/4] overflow-hidden rounded-lg bg-charcoal-800"
              >
                <Image
                  src={img.thumbnailUrl}
                  alt={img.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, (max-width: 1024px) 25vw, 20vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute bottom-0 left-0 right-0 p-3 translate-y-2 opacity-0 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
                  <p className="text-xs font-medium">{img.title}</p>
                  <p className="text-xs text-gray-300 mt-0.5">
                    From {img.price}
                  </p>
                </div>
              </a>
            ))}
          </div>
        </section>
      ))}

      {/* Full store CTA */}
      <section className="text-center py-12 border-t border-b border-white/5 mb-20">
        <h2 className="text-xl font-semibold mb-3">
          Looking for something specific?
        </h2>
        <p className="text-gray-400 text-sm mb-6 max-w-lg mx-auto">
          Browse the complete collection on Picfair, where you can choose your
          size, material, and framing options.
        </p>
        <a
          href={storeData.picfairUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 bg-white text-charcoal-900 font-medium py-3 px-8 rounded-lg hover:bg-gray-200 transition-colors"
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

      {/* Info section */}
      <section>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          <div>
            <h3 className="text-sm font-medium mb-3">Print Quality</h3>
            <p className="text-sm text-gray-400 leading-relaxed">
              Every print uses premium giclée photo paper with a lustre finish.
              Canvas, framed, and acrylic options are also available. All prints
              are made to order.
            </p>
          </div>
          <div>
            <h3 className="text-sm font-medium mb-3">Fulfilment</h3>
            <p className="text-sm text-gray-400 leading-relaxed">
              Prints are produced and shipped by Picfair, a trusted print
              partner. Your order is carefully packaged to arrive in perfect
              condition.
            </p>
          </div>
          <div>
            <h3 className="text-sm font-medium mb-3">Shipping</h3>
            <p className="text-sm text-gray-400 leading-relaxed">
              UK delivery: 3-5 working days. International shipping available
              worldwide, typically 7-14 working days. All prints arrive in
              protective packaging.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
