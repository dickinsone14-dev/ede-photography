"use client";

import Image from "next/image";
import { useState, useCallback, useMemo } from "react";
import Lightbox from "./Lightbox";
import type { GalleryImage, GallerySection } from "@/lib/galleries";
import { useFavourites } from "@/lib/favourites";

interface GalleryGridProps {
  sections?: GallerySection[];
  images?: GalleryImage[];
}

function FavouriteButton({ src }: { src: string }) {
  const { toggle, isFavourited } = useFavourites();
  const active = isFavourited(src);

  return (
    <button
      onClick={(e) => {
        e.stopPropagation();
        toggle(src);
      }}
      className={`absolute top-2 right-2 z-10 p-1.5 rounded-full transition-all duration-200 ${
        active
          ? "text-red-400 bg-black/50 opacity-100"
          : "text-white/80 bg-black/30 opacity-0 group-hover:opacity-100 max-sm:opacity-60"
      }`}
      aria-label={active ? "Remove from favourites" : "Add to favourites"}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill={active ? "currentColor" : "none"}
        stroke="currentColor"
        strokeWidth={active ? 0 : 1.5}
        className="w-4 h-4"
      >
        <path d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z" />
      </svg>
    </button>
  );
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
      role="button"
      tabIndex={0}
      className="group cursor-pointer text-left w-full"
      onClick={onClick}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onClick();
        }
      }}
      aria-label={`View ${image.alt} in lightbox`}
    >
      <div className={`relative overflow-hidden transition-all duration-300 hover:-translate-y-1 ${
        isPortrait ? "aspect-[2/3]" : "aspect-[16/10]"
      }`}>
        <Image
          src={image.src}
          alt={image.alt}
          fill
          placeholder={image.blurDataURL ? "blur" : "empty"}
          blurDataURL={image.blurDataURL}
          className="img-blur-placeholder object-cover transition-transform duration-500 group-hover:scale-[1.02]"
          sizes={isPortrait
            ? "(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
            : "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          }
          onLoad={handleLoad}
        />
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
        <FavouriteButton src={image.src} />
        {image.picfairUrl && (
          <a
            href={image.picfairUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            className="absolute inset-x-0 bottom-0 z-10 flex items-center justify-center gap-2 py-3 bg-gradient-to-t from-black/70 via-black/40 to-transparent opacity-0 group-hover:opacity-100 max-sm:opacity-70 transition-opacity duration-300"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-4 h-4 text-white drop-shadow-md"
            >
              <path
                fillRule="evenodd"
                d="M7.5 6v.75H5.513c-.96 0-1.764.724-1.865 1.679l-1.263 12A1.875 1.875 0 004.25 22.5h15.5a1.875 1.875 0 001.865-2.071l-1.263-12a1.875 1.875 0 00-1.865-1.679H16.5V6a4.5 4.5 0 10-9 0zM12 3a3 3 0 00-3 3v.75h6V6a3 3 0 00-3-3zm-3 8.25a3 3 0 106 0v.75a.75.75 0 01-1.5 0v-.75a1.5 1.5 0 00-3 0v.75a.75.75 0 01-1.5 0v-.75z"
                clipRule="evenodd"
              />
            </svg>
            <span className="text-sm font-medium text-white drop-shadow-md tracking-wide">
              Buy this print
            </span>
          </a>
        )}
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

  // Precompute section start offsets (safe in Strict Mode — no mutation during render)
  const sectionOffsets = useMemo(() => {
    if (!sections) return [];
    const offsets: number[] = [];
    let running = 0;
    for (const section of sections) {
      offsets.push(running);
      running += section.images.length;
    }
    return offsets;
  }, [sections]);

  if (sections) {
    return (
      <>
        <div className="space-y-16">
          {sections.map((section, sectionIdx) => {
            const sectionStartIndex = sectionOffsets[sectionIdx];

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

                  {/* Section images — grouped by orientation */}
                  <ImageGrid
                    images={section.images}
                    portraitFirst={section.portraitFirst}
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
