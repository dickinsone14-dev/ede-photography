"use client";

import Image from "next/image";
import { useState, useCallback } from "react";
import Lightbox from "./Lightbox";

export interface GalleryImage {
  src: string;
  alt: string;
  location?: string;
  date?: string;
  picfairUrl?: string;
}

export interface GallerySection {
  title: string;
  date: string;
  images: GalleryImage[];
}

interface GalleryGridProps {
  sections?: GallerySection[];
  images?: GalleryImage[];
}

function BlurImage({
  image,
  onClick,
}: {
  image: GalleryImage;
  onClick: () => void;
}) {
  const handleLoad = useCallback(
    (e: React.SyntheticEvent<HTMLImageElement>) => {
      e.currentTarget.classList.remove("img-blur-placeholder");
      e.currentTarget.classList.add("loaded");
    },
    []
  );

  return (
    <div
      className="group cursor-pointer"
      onClick={onClick}
    >
      <div className="relative aspect-square overflow-hidden transition-all duration-300 hover:-translate-y-1 flex items-center justify-center">
        <Image
          src={image.src}
          alt={image.alt}
          fill
          className="img-blur-placeholder object-contain transition-transform duration-500 group-hover:scale-[1.02]"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          onLoad={handleLoad}
        />
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
      </div>
    </div>
  );
}

export default function GalleryGrid({ sections, images }: GalleryGridProps) {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  // Flatten all images for lightbox navigation
  const allImages = sections
    ? sections.flatMap((s) => s.images)
    : images || [];

  // Track running index offset for sectioned galleries
  let runningIndex = 0;

  if (sections) {
    return (
      <>
        <div className="space-y-16">
          {sections.map((section, sectionIdx) => {
            const sectionStartIndex = runningIndex;
            runningIndex += section.images.length;

            const sectionId = section.title
              .toLowerCase()
              .replace(/[^a-z0-9]+/g, "-")
              .replace(/(^-|-$)/g, "");

            return (
              <div key={sectionIdx} id={sectionId} className="scroll-mt-24">
                {/* Section header */}
                <div className="mb-6">
                  <h2 className="text-xl md:text-2xl font-semibold tracking-tight text-brand-text">
                    {section.title}
                  </h2>
                  <p className="text-sm text-brand-text-faint mt-1">{section.date}</p>
                </div>

                {/* Section images */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {section.images.map((image, imgIdx) => (
                    <BlurImage
                      key={imgIdx}
                      image={image}
                      onClick={() =>
                        setLightboxIndex(sectionStartIndex + imgIdx)
                      }
                    />
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {lightboxIndex !== null && (
          <Lightbox
            images={allImages}
            currentIndex={lightboxIndex}
            onClose={() => setLightboxIndex(null)}
            onNavigate={setLightboxIndex}
          />
        )}
      </>
    );
  }

  // Flat gallery (no sections)
  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {allImages.map((image, index) => (
          <BlurImage
            key={index}
            image={image}
            onClick={() => setLightboxIndex(index)}
          />
        ))}
      </div>

      {lightboxIndex !== null && (
        <Lightbox
          images={allImages}
          currentIndex={lightboxIndex}
          onClose={() => setLightboxIndex(null)}
          onNavigate={setLightboxIndex}
        />
      )}
    </>
  );
}
