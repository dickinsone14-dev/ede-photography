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
  orientation?: "landscape" | "portrait";
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

  const isPortrait = image.orientation === "portrait";

  return (
    <div
      className="group cursor-pointer"
      onClick={onClick}
    >
      <div className={`relative overflow-hidden transition-all duration-300 hover:-translate-y-1 ${
        isPortrait ? "aspect-[2/3]" : "aspect-[16/10]"
      }`}>
        <Image
          src={image.src}
          alt={image.alt}
          fill
          className="img-blur-placeholder object-cover transition-transform duration-500 group-hover:scale-[1.02]"
          sizes={isPortrait
            ? "(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
            : "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          }
          onLoad={handleLoad}
        />
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
      </div>
    </div>
  );
}

/** Split images by orientation, preserving relative order within each group */
function splitByOrientation(images: GalleryImage[]) {
  const landscapeIndices: number[] = [];
  const portraitIndices: number[] = [];
  const landscape: GalleryImage[] = [];
  const portrait: GalleryImage[] = [];

  images.forEach((img, i) => {
    if (img.orientation === "portrait") {
      portrait.push(img);
      portraitIndices.push(i);
    } else {
      landscape.push(img);
      landscapeIndices.push(i);
    }
  });

  return { landscape, portrait, landscapeIndices, portraitIndices };
}

function ImageGrid({
  images,
  onClickImage,
  portraitFirst = false,
}: {
  images: GalleryImage[];
  onClickImage: (originalIndex: number) => void;
  portraitFirst?: boolean;
}) {
  const { landscape, portrait, landscapeIndices, portraitIndices } = splitByOrientation(images);

  const landscapeGrid = landscape.length > 0 && (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 sm:gap-4">
      {landscape.map((image, i) => (
        <BlurImage
          key={landscapeIndices[i]}
          image={image}
          onClick={() => onClickImage(landscapeIndices[i])}
        />
      ))}
    </div>
  );

  const portraitGrid = portrait.length > 0 && (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2 sm:gap-4">
      {portrait.map((image, i) => (
        <BlurImage
          key={portraitIndices[i]}
          image={image}
          onClick={() => onClickImage(portraitIndices[i])}
        />
      ))}
    </div>
  );

  return (
    <div className="space-y-4">
      {portraitFirst ? (
        <>{portraitGrid}{landscapeGrid}</>
      ) : (
        <>{landscapeGrid}{portraitGrid}</>
      )}
    </div>
  );
}

export default function GalleryGrid({ sections, images }: GalleryGridProps) {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  // Flatten all images for lightbox navigation (original order)
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

            const portraitFirstSections = [
              "back-tor-peak-district",
              "helvellyn-lake-district",
              "pen-y-fan-brecon-beacons",
            ];

            return (
              <div key={sectionIdx} id={sectionId} className="scroll-mt-24">
                  {/* Section header */}
                  <div className="mb-6">
                    <h2 className="text-xl md:text-2xl font-semibold tracking-tight text-brand-text">
                      {section.title}
                    </h2>
                    <p className="text-sm text-brand-text-faint mt-1">{section.date}</p>
                  </div>

                  {/* Section images — grouped by orientation */}
                  <ImageGrid
                    images={section.images}
                    portraitFirst={portraitFirstSections.includes(sectionId)}
                    onClickImage={(imgIdx) =>
                      setLightboxIndex(sectionStartIndex + imgIdx)
                    }
                  />
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
      <ImageGrid
        images={allImages}
        onClickImage={(index) => setLightboxIndex(index)}
      />

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
