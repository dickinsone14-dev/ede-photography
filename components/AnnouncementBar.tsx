"use client";

import Link from "next/link";
import { useState, useEffect } from "react";

const STORAGE_KEY = "ede-announcement-dismissed";

export default function AnnouncementBar() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Check sessionStorage (persists for the tab session, clears on close)
    const dismissed = sessionStorage.getItem(STORAGE_KEY);
    if (!dismissed) {
      setVisible(true);
    }
  }, []);

  // Update CSS custom property for navbar/main offset
  useEffect(() => {
    const height = visible ? "32px" : "0px";
    document.documentElement.style.setProperty(
      "--announcement-height",
      height
    );
    return () => {
      document.documentElement.style.setProperty(
        "--announcement-height",
        "0px"
      );
    };
  }, [visible]);

  function dismiss() {
    setVisible(false);
    sessionStorage.setItem(STORAGE_KEY, "1");
  }

  if (!visible) return null;

  return (
    <div className="fixed top-0 left-0 right-0 z-[60] bg-charcoal-900 border-b border-brand-border">
      <div className="container-wide flex items-center justify-center h-8 relative">
        <p className="text-xs tracking-wide text-brand-text-light">
          Prints &amp; digital downloads available&ensp;
          <Link
            href="/store"
            className="text-brand-accent hover:text-brand-accent-hover transition-colors font-medium inline-flex items-center gap-1"
          >
            Browse the store
            <svg
              className="w-3 h-3"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </Link>
        </p>

        <button
          onClick={dismiss}
          className="absolute right-0 top-1/2 -translate-y-1/2 p-1.5 text-brand-text-faint hover:text-brand-text-light transition-colors"
          aria-label="Dismiss announcement"
        >
          <svg
            className="w-3.5 h-3.5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </div>
    </div>
  );
}
