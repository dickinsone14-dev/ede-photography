import type { Metadata } from "next";
import GalleryCard from "@/components/GalleryCard";
import ScrollReveal from "@/components/ScrollReveal";
import { getGalleriesByCategory, getImageCount } from "@/lib/galleries";

export const metadata: Metadata = {
  title: "Portfolio",
  description:
    "Landscape photography galleries — hiking, mountains, coastal, and winter alpine photography across the UK and Europe.",
};

export default function PortfolioIndex() {
  const galleries = getGalleriesByCategory("portfolio");

  return (
    <div className="container-wide py-16">
      <ScrollReveal>
        <div className="mb-12">
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-4 text-brand-text">
            Portfolio
          </h1>
          <p className="text-brand-text-light max-w-2xl">
            Landscape and adventure photography from the mountains, coastlines,
            and wild places of the UK and Europe.
          </p>
        </div>
      </ScrollReveal>

      <ScrollReveal stagger={150}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {galleries.map((gallery) => (
            <div key={gallery.slug} data-stagger-item className="scroll-reveal">
              <GalleryCard
                title={gallery.title}
                slug={gallery.slug}
                coverImage={gallery.coverImage}
                imageCount={getImageCount(gallery)}
                category="portfolio"
              />
            </div>
          ))}
        </div>
      </ScrollReveal>
    </div>
  );
}
