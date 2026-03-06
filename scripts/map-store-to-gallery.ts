/**
 * One-time mapping script: matches store images to gallery images.
 *
 * Strategy:
 *   1. Album → gallery file mapping (hiking → hiking-uk + hiking-abroad, etc.)
 *   2. Numbered titles (e.g. "Nendaz 1") → positional match within that section
 *   3. Named titles (e.g. "Gloomy Tryfan") → keyword match on gallery alt text
 *   4. Outputs a JSON mapping file for review before enrichment
 *
 * Usage: npx tsx scripts/map-store-to-gallery.ts
 */

import fs from "fs";
import path from "path";

const CONTENT_DIR = path.join(process.cwd(), "content");
const STORE_PATH = path.join(CONTENT_DIR, "store.json");
const GALLERIES_DIR = path.join(CONTENT_DIR, "galleries");
const OUTPUT_PATH = path.join(CONTENT_DIR, "store-gallery-map.json");

interface StoreImage {
  imageId: string;
  picfairUrl: string;
  title: string;
  thumbnailUrl: string;
  price: string;
  orientation: string;
}

interface StoreAlbum {
  name: string;
  albumUrl: string;
  images: StoreImage[];
}

interface GalleryImage {
  src: string;
  alt: string;
  location?: string;
  date?: string;
  orientation?: string;
  picfairUrl?: string;
}

interface GallerySection {
  title: string;
  date: string;
  images: GalleryImage[];
}

interface Gallery {
  title: string;
  slug: string;
  sections?: GallerySection[];
  images?: GalleryImage[];
}

// Album → gallery file(s) + section location hints
const ALBUM_GALLERY_MAP: Record<string, string[]> = {
  hiking: ["hiking-uk", "hiking-abroad"],
  winterAlps: ["winter-alps"],
  jersey: ["jersey-coast"],
  top10: ["hiking-uk", "hiking-abroad", "winter-alps", "jersey-coast"],
};

// Location keyword → section title substring for positional matching
const LOCATION_SECTIONS: Record<string, string> = {
  nendaz: "Nendaz",
  tignes: "Tignes",
  "crans montana": "Crans Montana",
  megeve: "Megève",
};

function loadGallery(slug: string): Gallery {
  const filePath = path.join(GALLERIES_DIR, `${slug}.json`);
  return JSON.parse(fs.readFileSync(filePath, "utf-8"));
}

function getAllImages(gallery: Gallery): GalleryImage[] {
  if (gallery.sections) return gallery.sections.flatMap((s) => s.images);
  return gallery.images || [];
}

function getSectionImages(
  gallery: Gallery,
  sectionKeyword: string
): GalleryImage[] {
  if (!gallery.sections) return [];
  const section = gallery.sections.find((s) =>
    s.title.toLowerCase().includes(sectionKeyword.toLowerCase())
  );
  return section ? section.images : [];
}

/** Try positional match for numbered titles like "Nendaz 1" */
function tryPositionalMatch(
  title: string,
  galleries: Gallery[]
): GalleryImage | null {
  const match = title.match(/^(.+?)\s+(\d+)$/);
  if (!match) return null;

  const [, locationName, numStr] = match;
  const index = parseInt(numStr, 10) - 1; // 1-based to 0-based
  const sectionKey = locationName.toLowerCase();

  for (const gallery of galleries) {
    const sectionImages = getSectionImages(gallery, sectionKey);
    if (sectionImages.length > 0 && index < sectionImages.length) {
      return sectionImages[index];
    }
  }
  return null;
}

/** Try keyword match on alt text */
function tryKeywordMatch(
  title: string,
  galleries: Gallery[]
): GalleryImage | null {
  const keywords = title
    .toLowerCase()
    .split(/\s+/)
    .filter((w) => w.length > 2);

  let bestMatch: GalleryImage | null = null;
  let bestScore = 0;

  for (const gallery of galleries) {
    const allImages = getAllImages(gallery);
    for (const img of allImages) {
      const alt = img.alt.toLowerCase();
      let score = 0;
      for (const kw of keywords) {
        if (alt.includes(kw)) score++;
      }
      if (score > bestScore) {
        bestScore = score;
        bestMatch = img;
      }
    }
  }

  return bestScore > 0 ? bestMatch : null;
}

// --- Main ---
const storeData = JSON.parse(fs.readFileSync(STORE_PATH, "utf-8"));
const mapping: Record<string, { gallerySrc: string; confidence: string }> = {};
const unmatched: string[] = [];

for (const [albumKey, album] of Object.entries(
  storeData.albums as Record<string, StoreAlbum>
)) {
  const gallerySlugs = ALBUM_GALLERY_MAP[albumKey] || [];
  const galleries = gallerySlugs.map(loadGallery);

  console.log(`\n--- Album: ${album.name} (${album.images.length} images) ---`);

  for (const storeImg of album.images) {
    // Skip if already mapped (same imageId can appear in multiple albums)
    if (mapping[storeImg.imageId]) continue;

    // Try positional first
    let match = tryPositionalMatch(storeImg.title, galleries);
    let confidence = "positional";

    // Fall back to keyword
    if (!match) {
      match = tryKeywordMatch(storeImg.title, galleries);
      confidence = "keyword";
    }

    if (match) {
      mapping[storeImg.imageId] = {
        gallerySrc: match.src,
        confidence,
      };
      console.log(
        `  ✓ "${storeImg.title}" → ${match.src} (${confidence})`
      );
    } else {
      unmatched.push(`${albumKey}: "${storeImg.title}" (${storeImg.imageId})`);
      console.log(`  ✗ "${storeImg.title}" — NO MATCH`);
    }
  }
}

// Write output
const output = {
  generatedAt: new Date().toISOString(),
  totalStoreImages: Object.values(storeData.albums as Record<string, StoreAlbum>)
    .flatMap((a) => a.images)
    .length,
  matched: Object.keys(mapping).length,
  unmatched: unmatched.length,
  mapping,
  unmatchedImages: unmatched,
};

fs.writeFileSync(OUTPUT_PATH, JSON.stringify(output, null, 2));
console.log(`\n=== Results ===`);
console.log(`Matched: ${output.matched}`);
console.log(`Unmatched: ${output.unmatched}`);
console.log(`Output written to: ${OUTPUT_PATH}`);
