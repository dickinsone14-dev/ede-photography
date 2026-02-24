"use client";

import { useEffect, useRef, useState } from "react";

export default function ScrollIndicator() {
  const [visible, setVisible] = useState(false);
  const [atFooter, setAtFooter] = useState(false);
  const hideTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const scrollTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const lastScrollY = useRef(0);

  function scrollToTop() {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  useEffect(() => {
    // Show on page load after a brief delay, then auto-hide
    const showTimer = setTimeout(() => {
      setVisible(true);
      hideTimer.current = setTimeout(() => setVisible(false), 2500);
    }, 400);

    function handleScroll() {
      const scrollY = window.scrollY;
      const footer = document.querySelector("footer");

      // Check if footer is fully in view (user has scrolled to the very bottom)
      if (footer) {
        const footerRect = footer.getBoundingClientRect();
        const footerFullyVisible = footerRect.bottom <= window.innerHeight + 10;

        if (footerFullyVisible) {
          // At the very bottom — show back-to-top, hide scroll indicator
          if (hideTimer.current) clearTimeout(hideTimer.current);
          if (scrollTimer.current) clearTimeout(scrollTimer.current);
          setAtFooter(true);
          setVisible(true);
          return;
        }

        // Check if footer is partially in view — hide scroll indicator entirely
        const footerInView = footerRect.top < window.innerHeight;
        if (footerInView) {
          setAtFooter(false);
          setVisible(false);
          if (hideTimer.current) clearTimeout(hideTimer.current);
          if (scrollTimer.current) clearTimeout(scrollTimer.current);
          return;
        }
      }

      setAtFooter(false);

      // Hide while actively scrolling
      if (hideTimer.current) clearTimeout(hideTimer.current);
      if (scrollTimer.current) clearTimeout(scrollTimer.current);
      setVisible(false);

      // Detect scroll pause — when scrolling stops for 600ms, show briefly
      scrollTimer.current = setTimeout(() => {
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

  if (atFooter) {
    return (
      <button
        onClick={scrollToTop}
        className={`fixed bottom-6 left-1/2 -translate-x-1/2 z-40 flex flex-col items-center gap-1 transition-opacity duration-500 cursor-pointer ${
          visible ? "opacity-100" : "opacity-0"
        }`}
        aria-label="Back to top"
      >
        <span className="text-[11px] font-medium tracking-[0.2em] uppercase text-brand-text-faint/70 bg-black/60 backdrop-blur-sm rounded-full px-3 py-1">
          Back to top
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
            d="M5 15l7-7 7 7"
          />
        </svg>
      </button>
    );
  }

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
