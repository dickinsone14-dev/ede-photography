import type { Metadata } from "next";
import GalleryCard from "@/components/GalleryCard";
import { getGalleriesByCategory } from "@/lib/galleries";

export const metadata: Metadata = {
  title: "Other Work",
  description:
    "Events, street photography, and other projects by E.D.E Photography.",
};

export default function OtherWorkIndex() {
  const galleries = getGalleriesByCategory("other-work");

  return (
    <div className="container-wide py-16">
      <div className="mb-12">
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
          Other Work
        </h1>
        <p className="text-gray-400 max-w-2xl">
          Beyond the landscapes — events, street photography, and other projects.
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
            category="other-work"
          />
        ))}
      </div>
    </div>
  );
}
