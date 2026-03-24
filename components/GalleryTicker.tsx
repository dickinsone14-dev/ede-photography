"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect, useRef, useCallback } from "react";

function shuffle<T>(array: T[]): T[] {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

interface TickerItem {
  src: string;
  title: string;
  href: string;
}

const items: TickerItem[] = [
  // Hiking UK
  { src: "/images/hiking/sharp-edge/DSCF4801.jpg", title: "Sharp Edge, Lake District", href: "/portfolio/hiking-uk#sharp-edge-lake-district" },
  { src: "/images/hiking/langdale-pikes/DSCF4558.jpg", title: "Langdale Pikes, Lake District", href: "/portfolio/hiking-uk#langdale-pikes-lake-district" },
  { src: "/images/hiking/dinorwic-quarry-rd2/DSCF2034-3.jpg", title: "Dinorwic Quarry (Rd. 2), Snowdonia", href: "/portfolio/hiking-uk#dinorwic-quarry-rd-2-snowdonia" },
  { src: "/images/hiking/llyn-y-fan-fach/DSCF1566.jpg", title: "Llyn y Fan Fach, Brecon Beacons", href: "/portfolio/hiking-uk#llyn-y-fan-fach-brecon-beacons" },
  { src: "/images/hiking/ogwen-valley/DSCF1130.jpg", title: "Ogwen Valley, Snowdonia", href: "/portfolio/hiking-uk#ogwen-valley-snowdonia" },
  { src: "/images/hiking/cadair-idris/DSCF7279-2.jpg", title: "Cadair Idris, Snowdonia", href: "/portfolio/hiking-uk#cadair-idris-snowdonia" },
  { src: "/images/hiking/dinorwic-quarry/DSCF8120.jpg", title: "Dinorwic Quarry, Snowdonia", href: "/portfolio/hiking-uk#dinorwic-quarry-snowdonia" },
  { src: "/images/hiking/pen-y-fan/69630026-3.jpg", title: "Pen y Fan, Brecon Beacons", href: "/portfolio/hiking-uk#pen-y-fan-brecon-beacons" },
  { src: "/images/hiking/helvellyn/IMG_0804.jpg", title: "Helvellyn, Lake District", href: "/portfolio/hiking-uk#helvellyn-lake-district" },
  // Hiking Abroad
  { src: "/images/hiking/mont-joly-megeve/DSCF0582.jpg", title: "Mont Joly, Megève", href: "/portfolio/hiking-abroad#mont-joly-meg-ve" },
  // Winter Alps
  { src: "/images/winter-alps/megeve-feb/DSCF4477.jpg", title: "Megève, French Alps", href: "/portfolio/winter-alps#meg-ve-french-alps" },
  { src: "/images/winter-alps/megeve-jumps/DSCF4450.jpg", title: "Saint Gervais, French Alps", href: "/portfolio/winter-alps#saint-gervais-french-alps" },
  { src: "/images/winter-alps/megeve-film/IMG_7873.jpg", title: "Megève, French Alps", href: "/portfolio/winter-alps#meg-ve-french-alps" },
  { src: "/images/winter-alps/tignes/IMG_7847.jpg", title: "Tignes, French Alps", href: "/portfolio/winter-alps#tignes-french-alps" },
  { src: "/images/winter-alps/megeve-hike/DSCF3831.jpg", title: "Megève, French Alps", href: "/portfolio/winter-alps#meg-ve-french-alps" },
  { src: "/images/winter-alps/nendaz/DSCF3525.jpg", title: "Nendaz, Swiss Alps", href: "/portfolio/winter-alps#nendaz-swiss-alps" },
  { src: "/images/winter-alps/crans-montana/DSCF2709.jpg", title: "Crans Montana, Swiss Alps", href: "/portfolio/winter-alps#crans-montana-swiss-alps" },
  // Jersey & Coast
  { src: "/images/jersey/DSCF8637-2.jpg", title: "Jersey & the Coast", href: "/portfolio/jersey-coast" },
];

// Fixed card width for desktop
const CARD_WIDTH = 360;
const GAP = 24;
const VISIBLE_COUNT = 9;

/** Mobile: only render active + previous item (2 DOM nodes max) */
function MobileTicker({ shuffled }: { shuffled: TickerItem[] }) {
  const [active, setActive] = useState(0);
  const [visible, setVisible] = useState<Set<number>>(() => new Set([0]));
  const pausedUntil = useRef(0);

  useEffect(() => {
    const interval = setInterval(() => {
      if (Date.now() < pausedUntil.current) return;
      setActive((prev) => {
        const next = (prev + 1) % shuffled.length;
        setVisible(new Set([prev, next]));
        return next;
      });
    }, 2500);
    return () => clearInterval(interval);
  }, [shuffled.length]);

  // Clean up previous item after transition
  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(new Set([active]));
    }, 1100); // slightly longer than 1000ms transition
    return () => clearTimeout(timer);
  }, [active]);

  const goTo = useCallback((direction: -1 | 1) => {
    pausedUntil.current = Date.now() + 5000;
    setActive((prev) => {
      const next = (prev + direction + shuffled.length) % shuffled.length;
      setVisible(new Set([prev, next]));
      return next;
    });
  }, [shuffled.length]);

  return (
    <div className="px-4 py-12">
      <div className="relative aspect-[3/2] overflow-hidden rounded-lg bg-brand-surface mx-auto max-w-[420px]">
        {shuffled.map((item, i) => {
          if (!visible.has(i)) return null;
          return (
            <Link
              key={i}
              href={item.href}
              className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
                i === active ? "opacity-100 z-10" : "opacity-0 z-0"
              }`}
            >
              <Image
                src={item.src}
                alt={item.title}
                fill
                className="object-cover"
                sizes="(max-width: 640px) 100vw, 420px"
                priority={i === 0}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-4">
                <p className="text-sm font-medium text-white">{item.title}</p>
              </div>
            </Link>
          );
        })}
        {/* Navigation arrows */}
        <button
          onClick={(e) => { e.preventDefault(); goTo(-1); }}
          className="absolute left-2 top-1/2 -translate-y-1/2 z-20 p-2 text-white/60 hover:text-white transition-colors"
          aria-label="Previous"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <button
          onClick={(e) => { e.preventDefault(); goTo(1); }}
          className="absolute right-2 top-1/2 -translate-y-1/2 z-20 p-2 text-white/60 hover:text-white transition-colors"
          aria-label="Next"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    </div>
  );
}

/** Wrapping modular index */
function mod(n: number, m: number): number {
  return ((n % m) + m) % m;
}

/** Desktop: virtual window of items using translateX for smooth sliding */
function DesktopTicker({ shuffled }: { shuffled: TickerItem[] }) {
  const count = shuffled.length;
  const [active, setActive] = useState(0);
  const pausedUntil = useRef(0);

  // How many cards on each side of active
  const half = Math.floor(VISIBLE_COUNT / 2); // 4

  useEffect(() => {
    const interval = setInterval(() => {
      if (Date.now() < pausedUntil.current) return;
      setActive((prev) => (prev + 1) % count);
    }, 2500);
    return () => clearInterval(interval);
  }, [count]);

  const goTo = useCallback((direction: -1 | 1) => {
    pausedUntil.current = Date.now() + 5000;
    setActive((prev) => mod(prev + direction, count));
  }, [count]);

  // Render visible window + 1 extra each side for smooth enter/exit
  const visibleItems: { idx: number; offset: number }[] = [];
  for (let offset = -half - 1; offset <= half + 1; offset++) {
    visibleItems.push({ idx: mod(active + offset, count), offset });
  }

  // Track dimensions
  const trackWidth = VISIBLE_COUNT * CARD_WIDTH + (VISIBLE_COUNT - 1) * GAP;
  const cardHeight = Math.round(CARD_WIDTH * (2 / 3)); // aspect-[3/2]
  const centerX = (trackWidth - CARD_WIDTH) / 2;

  return (
    <div className="relative overflow-hidden py-12">
      {/* Left arrow */}
      <button
        onClick={() => goTo(-1)}
        className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 z-20 p-2 sm:p-3 text-white/40 hover:text-white transition-colors"
        aria-label="Previous"
      >
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 19l-7-7 7-7" />
        </svg>
      </button>

      {/* Right arrow */}
      <button
        onClick={() => goTo(1)}
        className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 z-20 p-2 sm:p-3 text-white/40 hover:text-white transition-colors"
        aria-label="Next"
      >
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5l7 7-7 7" />
        </svg>
      </button>

      <div className="flex justify-center">
        <div
          className="relative"
          style={{ width: trackWidth, height: cardHeight }}
        >
          {visibleItems.map(({ idx, offset }) => {
            const item = shuffled[idx];
            const isActive = offset === 0;
            const isOutside = Math.abs(offset) > half;
            const x = centerX + offset * (CARD_WIDTH + GAP);

            return (
              <Link
                key={idx}
                href={item.href}
                className="absolute top-0 transition-all duration-700 ease-in-out"
                style={{
                  width: CARD_WIDTH,
                  transform: `translateX(${x}px)`,
                  opacity: isOutside ? 0 : 1,
                }}
              >
                <div
                  className={`relative aspect-[3/2] overflow-hidden rounded-lg bg-brand-surface transition-all duration-700 ease-in-out origin-center ${
                    isActive
                      ? "ring-1 ring-white/20 brightness-100 scale-[1.05]"
                      : "brightness-[0.82] scale-100"
                  }`}
                >
                  <Image
                    src={item.src}
                    alt={item.title}
                    fill
                    className="object-cover"
                    sizes="400px"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <p className={`text-sm font-medium transition-colors duration-700 ease-in-out ${
                      isActive ? "text-white" : "text-white/70"
                    }`}>{item.title}</p>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default function GalleryTicker() {
  const [shuffled, setShuffled] = useState<TickerItem[] | null>(null);

  useEffect(() => {
    setShuffled(shuffle(items));
  }, []);

  // SSR placeholder — matches the height of the rendered ticker
  if (!shuffled) {
    return (
      <>
        <div className="sm:hidden px-4 py-12">
          <div className="relative aspect-[3/2] rounded-lg bg-brand-surface mx-auto max-w-[420px]" />
        </div>
        <div className="hidden sm:block py-12" style={{ height: 280 }} />
      </>
    );
  }

  return (
    <>
      <div className="sm:hidden">
        <MobileTicker shuffled={shuffled} />
      </div>
      <div className="hidden sm:block">
        <DesktopTicker shuffled={shuffled} />
      </div>
    </>
  );
}
