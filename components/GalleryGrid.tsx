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

interface GalleryGridProps {
  images: GalleryImage[];
}

export default function GalleryGrid({ images }: GalleryGridProps) {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  return (
    <>
      <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 space-y-4">
        {images.map((image, index) => (
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
          images={images}
          currentIndex={lightboxIndex}
          onClose={() => setLightboxIndex(null)}
          onNavigate={setLightboxIndex}
        />
      )}
    </>
  );
}
