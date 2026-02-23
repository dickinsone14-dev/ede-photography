import type { Metadata } from "next";
import GalleryCard from "@/components/GalleryCard";
import { getGalleriesByCategory } from "@/lib/galleries";

export const metadata: Metadata = {
  title: "Portfolio",
  description:
    "Landscape photography galleries — hiking, mountains, coastal, and winter alpine photography across the UK and Europe.",
};

export default function PortfolioIndex() {
  const galleries = getGalleriesByCategory("portfolio");

  return (
    <div className="container-wide py-16">
      <div className="mb-12">
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
          Portfolio
        </h1>
        <p className="text-gray-400 max-w-2xl">
          Landscape and adventure photography from the mountains, coastlines,
          and wild places of the UK and Europe.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {galleries.map((gallery) => (
          <GalleryCard
            key={gallery.slug}
            title={gallery.title}
            slug={gallery.slug}
            coverImage={gallery.coverImage}
            imageCount={gallery.images.length}
            category="portfolio"
          />
        ))}
      </div>
    </div>
  );
}
