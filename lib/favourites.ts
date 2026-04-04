"use client";

import { useState, useEffect, useCallback, useSyncExternalStore } from "react";

const STORAGE_KEY = "ede-favourites";

/** Read favourites from localStorage */
function getStoredFavourites(): string[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

/** Write favourites to localStorage and notify listeners */
function setStoredFavourites(favs: string[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(favs));
  window.dispatchEvent(new Event("favourites-changed"));
}

// External store for useSyncExternalStore
function subscribe(callback: () => void) {
  window.addEventListener("favourites-changed", callback);
  window.addEventListener("storage", callback);
  return () => {
    window.removeEventListener("favourites-changed", callback);
    window.removeEventListener("storage", callback);
  };
}

function getSnapshot(): string {
  if (typeof window === "undefined") return "[]";
  return localStorage.getItem(STORAGE_KEY) || "[]";
}

function getServerSnapshot(): string {
  return "[]";
}

/** Hook to manage favourited images. Uses localStorage and syncs across components. */
export function useFavourites() {
  const raw = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  const favourites: string[] = JSON.parse(raw);

  const toggle = useCallback((src: string) => {
    const current = getStoredFavourites();
    const next = current.includes(src)
      ? current.filter((s) => s !== src)
      : [...current, src];
    setStoredFavourites(next);
  }, []);

  const isFavourited = useCallback(
    (src: string) => favourites.includes(src),
    [favourites]
  );

  const clear = useCallback(() => {
    setStoredFavourites([]);
  }, []);

  return {
    favourites,
    count: favourites.length,
    toggle,
    isFavourited,
    clear,
  };
}
