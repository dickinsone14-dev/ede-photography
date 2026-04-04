"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect, useRef, useCallback } from "react";
import { mainNavLinks as navLinks } from "@/lib/nav";
import { useFavourites } from "@/lib/favourites";

export default function Navbar() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const { count: favCount } = useFavourites();
  const mobileRef = useRef<HTMLDivElement>(null);
  const navRef = useRef<HTMLElement>(null);
  const hamburgerRef = useRef<HTMLButtonElement>(null);
  const firstLinkRef = useRef<HTMLAnchorElement>(null);

  // Animate mobile menu height
  useEffect(() => {
    const el = mobileRef.current;
    if (!el) return;

    if (mobileOpen) {
      el.style.maxHeight = el.scrollHeight + "px";
      el.style.opacity = "1";
      // Focus first link when menu opens
      setTimeout(() => firstLinkRef.current?.focus(), 100);
    } else {
      el.style.maxHeight = "0";
      el.style.opacity = "0";
    }
  }, [mobileOpen]);

  // Close on outside click
  useEffect(() => {
    if (!mobileOpen) return;
    function handleClick(e: MouseEvent) {
      if (navRef.current && !navRef.current.contains(e.target as Node)) {
        setMobileOpen(false);
      }
    }
    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, [mobileOpen]);

  // Close on Escape and trap focus within mobile menu
  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (e.key === "Escape") {
      setMobileOpen(false);
      hamburgerRef.current?.focus();
      return;
    }

    // Focus trap: keep Tab cycling within hamburger button + menu links
    if (e.key === "Tab" && mobileRef.current) {
      const focusable = [
        hamburgerRef.current,
        ...Array.from(mobileRef.current.querySelectorAll<HTMLElement>("a")),
      ].filter(Boolean) as HTMLElement[];
      if (focusable.length === 0) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    }
  }, []);

  useEffect(() => {
    if (!mobileOpen) return;
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [mobileOpen, handleKeyDown]);

  return (
    <nav ref={navRef} aria-label="Main navigation" className="fixed left-0 right-0 z-50 bg-black/90 backdrop-blur-md border-b border-brand-border" style={{ top: "var(--announcement-height, 0px)" }}>
      <div className="container-wide flex items-center justify-between h-16">
        <Link
          href="/"
          className="text-xl font-semibold tracking-tight text-brand-text hover:text-brand-teal transition-colors"
        >
          E.D.E
        </Link>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-8">
          <ul className="flex items-center gap-8">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  aria-current={pathname.startsWith(link.href) ? "page" : undefined}
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
          <Link
            href="/favourites"
            className={`relative p-1 transition-colors ${
              pathname === "/favourites" ? "text-red-400" : "text-brand-text-faint hover:text-brand-text-light"
            }`}
            aria-label={`Favourites${favCount > 0 ? ` (${favCount})` : ""}`}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill={favCount > 0 || pathname === "/favourites" ? "currentColor" : "none"}
              stroke="currentColor"
              strokeWidth={favCount > 0 || pathname === "/favourites" ? 0 : 1.5}
              className="w-5 h-5"
            >
              <path d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z" />
            </svg>
            {favCount > 0 && (
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                {favCount > 9 ? "9+" : favCount}
              </span>
            )}
          </Link>
        </div>

        {/* Mobile menu button */}
        <button
          ref={hamburgerRef}
          onClick={() => setMobileOpen(!mobileOpen)}
          className="md:hidden p-3 -mr-1 text-brand-text-light hover:text-brand-text transition-colors"
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
          aria-expanded={mobileOpen}
          aria-controls="mobile-menu"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            aria-hidden="true"
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
        id="mobile-menu"
        ref={mobileRef}
        role="navigation"
        aria-label="Mobile menu"
        className="md:hidden border-t border-brand-border bg-black/95 backdrop-blur-md overflow-hidden transition-all duration-300 ease-in-out"
        style={{ maxHeight: 0, opacity: 0 }}
      >
        <ul className="flex flex-col py-4">
          {navLinks.map((link, i) => (
            <li key={link.href}>
              <Link
                ref={i === 0 ? firstLinkRef : undefined}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                aria-current={pathname.startsWith(link.href) ? "page" : undefined}
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
          <li>
            <Link
              href="/favourites"
              onClick={() => setMobileOpen(false)}
              className={`flex items-center gap-2 px-6 py-3 text-sm tracking-wide transition-colors hover:text-brand-teal ${
                pathname === "/favourites"
                  ? "text-brand-text font-medium"
                  : "text-brand-text-light"
              }`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill={favCount > 0 ? "currentColor" : "none"}
                stroke="currentColor"
                strokeWidth={favCount > 0 ? 0 : 1.5}
                className={`w-4 h-4 ${favCount > 0 ? "text-red-400" : ""}`}
              >
                <path d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z" />
              </svg>
              Favourites{favCount > 0 ? ` (${favCount})` : ""}
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}
