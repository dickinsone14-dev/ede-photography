"use client";

import { useCallback, useEffect, useRef, useState } from "react";

export default function ScrollDivider() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
        }
      },
      { threshold: 0.5 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const handleClick = useCallback(() => {
    const el = ref.current;
    if (!el) return;

    // Find the next sibling section/element after this divider
    let next = el.nextElementSibling;
    while (next && next.getAttribute("data-scroll-divider") !== null) {
      next = next.nextElementSibling;
    }

    if (next) {
      const navHeight = 64;
      const top = next.getBoundingClientRect().top + window.scrollY - navHeight - 16;
      window.scrollTo({ top, behavior: "smooth" });
    }
  }, []);

  return (
    <div
      ref={ref}
      data-scroll-divider
      className={`flex flex-col items-center py-10 transition-all duration-700 ${
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
      }`}
    >
      {/* Thin line */}
      <div
        className={`w-px h-10 bg-gradient-to-b from-transparent via-brand-border to-brand-text-faint/30 transition-all duration-1000 ${
          visible ? "scale-y-100" : "scale-y-0"
        }`}
        style={{ transformOrigin: "top" }}
      />

      {/* Clickable chevron button */}
      <button
        onClick={handleClick}
        aria-label="Scroll to next section"
        className="group relative mt-2 flex items-center justify-center w-10 h-10 rounded-full border border-brand-border bg-white hover:border-brand-accent hover:bg-brand-accent transition-all duration-300 cursor-pointer hover:scale-110 active:scale-95 hover:shadow-md"
      >
        <svg
          className="w-4 h-4 text-brand-text-faint group-hover:text-white transition-colors duration-300 animate-bounce"
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
      </button>

      {/* Thin line below */}
      <div
        className={`w-px h-10 bg-gradient-to-b from-brand-text-faint/30 via-brand-border to-transparent transition-all duration-1000 delay-200 ${
          visible ? "scale-y-100" : "scale-y-0"
        }`}
        style={{ transformOrigin: "top" }}
      />
    </div>
  );
}
