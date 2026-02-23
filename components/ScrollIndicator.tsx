"use client";

import { useEffect, useState } from "react";

export default function ScrollIndicator() {
  const [visible, setVisible] = useState(false);
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    // Fade in after a short delay so it doesn't flash on fast-loading pages
    const showTimer = setTimeout(() => setVisible(true), 400);

    function handleScroll() {
      if (window.scrollY > 80) {
        setHidden(true);
      }
    }

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      clearTimeout(showTimer);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  if (hidden) return null;

  return (
    <div
      className={`fixed bottom-6 left-1/2 -translate-x-1/2 z-40 flex flex-col items-center gap-1 transition-opacity duration-700 ${
        visible ? "opacity-100" : "opacity-0"
      }`}
    >
      <span className="text-[11px] font-medium tracking-[0.2em] uppercase text-brand-text-faint/80 bg-white/70 backdrop-blur-sm rounded-full px-3 py-1">
        Scroll
      </span>
      <svg
        className="w-6 h-6 text-brand-text-faint/80 animate-bounce"
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
