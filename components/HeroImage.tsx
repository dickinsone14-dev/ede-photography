"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

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
  const [scrolled, setScrolled] = useState(false);

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
      // Fade out scroll indicator after 80px
      setScrolled(scrollY > 80);
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
              <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-4 text-white">
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

      {/* Scroll down indicator */}
      <div
        className={`absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 transition-opacity duration-500 ${
          scrolled ? "opacity-0 pointer-events-none" : "opacity-100"
        }`}
      >
        <span className="text-xs tracking-widest uppercase text-white/70">
          Scroll
        </span>
        <svg
          className="w-5 h-5 text-white/70 animate-bounce"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </div>
    </section>
  );
}
