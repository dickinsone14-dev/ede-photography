"use client";

import Image from "next/image";
import { useState } from "react";
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
                  <h2 className="text-xl md:text-2xl font-semibold tracking-tight">
                    {section.title}
                  </h2>
                  <p className="text-sm text-gray-500 mt-1">{section.date}</p>
                </div>

                {/* Section images */}
                <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 space-y-4">
                  {section.images.map((image, imgIdx) => (
                    <div
                      key={imgIdx}
                      className="break-inside-avoid group cursor-pointer"
                      onClick={() =>
                        setLightboxIndex(sectionStartIndex + imgIdx)
                      }
                    >
                      <div className="relative overflow-hidden rounded-lg bg-charcoal-800">
                        <Image
                          src={image.src}
                          alt={image.alt}
                          width={800}
                          height={600}
                          className="w-full h-auto transition-transform duration-500 group-hover:scale-[1.02]"
                          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        />
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
                      </div>
                    </div>
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
      <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 space-y-4">
        {allImages.map((image, index) => (
          <div
            key={index}
            className="break-inside-avoid group cursor-pointer"
            onClick={() => setLightboxIndex(index)}
          >
            <div className="relative overflow-hidden rounded-lg bg-charcoal-800">
              <Image
                src={image.src}
                alt={image.alt}
                width={800}
                height={600}
                className="w-full h-auto transition-transform duration-500 group-hover:scale-[1.02]"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
            </div>
          </div>
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
