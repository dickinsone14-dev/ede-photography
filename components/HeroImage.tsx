"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";

interface HeroImageProps {
  src: string;
  alt: string;
  title?: string;
  subtitle?: string;
  overlay?: boolean;
  height?: "full" | "large" | "medium";
}

export default function HeroImage({
  src,
  alt,
  title,
  subtitle,
  overlay = true,
  height = "large",
}: HeroImageProps) {
  const imgRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = imgRef.current;
    if (!el) return;

    function handleScroll() {
      const scrollY = window.scrollY;
      // Parallax
      const rate = scrollY * 0.3;
      if (el) {
        el.style.transform = `translateY(${rate}px)`;
      }
    }

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const heightClasses = {
    full: "h-screen",
    large: "h-[80vh]",
    medium: "h-[60vh]",
  };

  return (
    <section className={`relative ${heightClasses[height]} w-full overflow-hidden`}>
      <div ref={imgRef} className="absolute inset-0 will-change-transform">
        <Image
          src={src}
          alt={alt}
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
      </div>
      {overlay && (
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent" />
      )}
      {(title || subtitle) && (
        <div className="absolute inset-0 flex items-end">
          <div className="container-wide pb-16 md:pb-24">
            {title && (
              <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold tracking-tight mb-4 text-white">
                {title}
              </h1>
            )}
            {subtitle && (
              <p className="text-lg md:text-xl text-white/80 max-w-2xl">
                {subtitle}
              </p>
            )}
          </div>
        </div>
      )}

    </section>
  );
}
