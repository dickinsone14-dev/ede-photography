import type { Metadata } from "next";
import GalleryCard from "@/components/GalleryCard";
import ScrollReveal from "@/components/ScrollReveal";

import { getGalleriesByCategory, getImageCount } from "@/lib/galleries";

export const metadata: Metadata = {
  title: "Other Work",
  description:
    "Events, street photography, and other projects by E.D.E Photography.",
};

export default function OtherWorkIndex() {
  const galleries = getGalleriesByCategory("other-work");

  return (
    <div className="container-wide py-16">
      <ScrollReveal>
        <div className="mb-12">
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-4 text-brand-text">
            Other Work
          </h1>
          <p className="text-brand-text-light max-w-2xl">
            Beyond the landscapes — events, street photography, and other projects.
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
                coverPosition={gallery.coverPosition}
                imageCount={getImageCount(gallery)}
                category="other-work"
              />
            </div>
          ))}
        </div>
      </ScrollReveal>
    </div>
  );
}
