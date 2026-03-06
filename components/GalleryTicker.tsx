"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect, useMemo, useRef, useCallback } from "react";

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

// Fixed card width matching the CSS (lg breakpoint)
const CARD_WIDTH = 360;
const GAP = 24;

export default function GalleryTicker() {
  const shuffled = useMemo(() => shuffle(items), []);
  const tripled = useMemo(() => [...shuffled, ...shuffled, ...shuffled], [shuffled]);
  const count = shuffled.length;

  const [active, setActive] = useState(count);
  const trackRef = useRef<HTMLDivElement>(null);
  const isResetting = useRef(false);

  const scrollToCard = useCallback((index: number, smooth: boolean) => {
    if (!trackRef.current) return;
    // Scroll so the active card is fully visible with some left padding
    const scrollLeft = index * (CARD_WIDTH + GAP);
    if (smooth) {
      trackRef.current.scrollTo({ left: scrollLeft, behavior: "smooth" });
    } else {
      trackRef.current.scrollLeft = scrollLeft;
    }
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      if (isResetting.current) return;
      setActive((prev) => {
        const next = prev + 1;
        if (next >= count * 2) {
          isResetting.current = true;
          setTimeout(() => {
            setActive(count);
            scrollToCard(count, false);
            isResetting.current = false;
          }, 50);
          return next;
        }
        return next;
      });
    }, 2500);
    return () => clearInterval(interval);
  }, [count, scrollToCard]);

  useEffect(() => {
    scrollToCard(active, !isResetting.current);
  }, [active, scrollToCard]);

  return (
    <div className="overflow-hidden py-12">
      <div
        ref={trackRef}
        className="flex gap-6 overflow-x-hidden px-4 sm:px-6 lg:px-8"
      >
        {tripled.map((item, i) => {
          const isActive = i === active;
          return (
            <Link
              key={i}
              href={item.href}
              className="group flex-shrink-0"
              style={{ width: CARD_WIDTH }}
            >
              <div
                className={`relative aspect-[3/2] overflow-hidden rounded-lg bg-brand-surface transition-all duration-1000 ease-in-out origin-center ${
                  isActive
                    ? "ring-1 ring-white/20 brightness-100 scale-[1.05]"
                    : "opacity-50 brightness-75 scale-100"
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
                  <p className={`text-sm font-medium transition-colors duration-1000 ease-in-out ${
                    isActive ? "text-white" : "text-white/60"
                  }`}>{item.title}</p>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
