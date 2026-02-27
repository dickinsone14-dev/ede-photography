"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect, useRef } from "react";

const navLinks = [
  { href: "/portfolio", label: "Portfolio" },
  { href: "/other-work", label: "Other Work" },
  { href: "/store", label: "Store" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const mobileRef = useRef<HTMLDivElement>(null);

  // Animate mobile menu height
  useEffect(() => {
    const el = mobileRef.current;
    if (!el) return;

    if (mobileOpen) {
      el.style.maxHeight = el.scrollHeight + "px";
      el.style.opacity = "1";
    } else {
      el.style.maxHeight = "0";
      el.style.opacity = "0";
    }
  }, [mobileOpen]);

  return (
    <nav className="fixed left-0 right-0 z-50 bg-black/90 backdrop-blur-md border-b border-brand-border" style={{ top: "var(--announcement-height, 0px)" }}>
      <div className="container-wide flex items-center justify-between h-16">
        <Link
          href="/"
          className="text-xl font-semibold tracking-tight text-brand-text hover:text-brand-teal transition-colors"
        >
          E.D.E
        </Link>

        {/* Desktop nav */}
        <ul className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className={`text-sm tracking-wide transition-colors hover:text-brand-teal ${
                  pathname.startsWith(link.href)
                    ? "text-brand-text font-medium"
                    : "text-brand-text-light"
                }`}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Mobile menu button */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="md:hidden p-3 -mr-1 text-brand-text-light hover:text-brand-text transition-colors"
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            {mobileOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M4 6h16M4 12h16M4 18h16"
              />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile nav */}
      <div
        ref={mobileRef}
        className="md:hidden border-t border-brand-border bg-black/95 backdrop-blur-md overflow-hidden transition-all duration-300 ease-in-out"
        style={{ maxHeight: 0, opacity: 0 }}
      >
        <ul className="flex flex-col py-4">
          {navLinks.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className={`block px-6 py-3 text-sm tracking-wide transition-colors hover:text-brand-teal ${
                  pathname.startsWith(link.href)
                    ? "text-brand-text font-medium"
                    : "text-brand-text-light"
                }`}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}
