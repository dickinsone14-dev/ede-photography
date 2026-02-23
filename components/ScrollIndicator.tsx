"use client";

import { useEffect, useRef, useState } from "react";

export default function ScrollIndicator() {
  const [visible, setVisible] = useState(false);
  const hideTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const scrollTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const lastScrollY = useRef(0);
  const isScrolling = useRef(false);

  useEffect(() => {
    // Show on page load after a brief delay, then auto-hide
    const showTimer = setTimeout(() => {
      setVisible(true);
      hideTimer.current = setTimeout(() => setVisible(false), 2500);
    }, 400);

    function handleScroll() {
      const scrollY = window.scrollY;

      // Don't show if near the very bottom of the page
      const nearBottom =
        scrollY + window.innerHeight >= document.documentElement.scrollHeight - 100;
      if (nearBottom) {
        setVisible(false);
        return;
      }

      // Mark as actively scrolling
      isScrolling.current = true;
      // Hide while actively scrolling
      if (hideTimer.current) clearTimeout(hideTimer.current);
      if (scrollTimer.current) clearTimeout(scrollTimer.current);
      setVisible(false);

      // Detect scroll pause — when scrolling stops for 600ms, show briefly
      scrollTimer.current = setTimeout(() => {
        isScrolling.current = false;
        setVisible(true);
        hideTimer.current = setTimeout(() => setVisible(false), 2000);
      }, 600);

      lastScrollY.current = scrollY;
    }

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      clearTimeout(showTimer);
      if (hideTimer.current) clearTimeout(hideTimer.current);
      if (scrollTimer.current) clearTimeout(scrollTimer.current);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div
      className={`fixed bottom-6 left-1/2 -translate-x-1/2 z-40 flex flex-col items-center gap-1 transition-opacity duration-500 pointer-events-none ${
        visible ? "opacity-100" : "opacity-0"
      }`}
    >
      <span className="text-[11px] font-medium tracking-[0.2em] uppercase text-brand-text-faint/70 bg-black/60 backdrop-blur-sm rounded-full px-3 py-1">
        Scroll
      </span>
      <svg
        className="w-5 h-5 text-brand-text-faint/70 animate-bounce"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M19 9l-7 7-7-7"
        />
      </svg>
    </div>
  );
}
