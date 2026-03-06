/**
 * One-time enrichment script: adds picfairUrl to gallery JSON images
 * using the manually-reviewed mapping from store-gallery-map.json.
 *
 * Usage: npx tsx scripts/enrich-galleries.ts
 */

import fs from "fs";
import path from "path";

const CONTENT_DIR = path.join(process.cwd(), "content");
const STORE_PATH = path.join(CONTENT_DIR, "store.json");
const MAP_PATH = path.join(CONTENT_DIR, "store-gallery-map.json");
const GALLERIES_DIR = path.join(CONTENT_DIR, "galleries");

interface StoreImage {
  imageId: string;
  picfairUrl: string;
  title: string;
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
  [key: string]: unknown;
}

// Load data
const storeData = JSON.parse(fs.readFileSync(STORE_PATH, "utf-8"));
const mapData = JSON.parse(fs.readFileSync(MAP_PATH, "utf-8"));

// Build imageId → picfairUrl lookup from store
const picfairLookup = new Map<string, string>();
for (const album of Object.values(storeData.albums as Record<string, { images: StoreImage[] }>)) {
  for (const img of album.images) {
    picfairLookup.set(img.imageId, img.picfairUrl);
  }
}

// Build gallerySrc → picfairUrl from mapping
const srcToPicfair = new Map<string, string>();
for (const [imageId, entry] of Object.entries(mapData.mapping as Record<string, { gallerySrc: string }>)) {
  const picfairUrl = picfairLookup.get(imageId);
  if (picfairUrl) {
    srcToPicfair.set(entry.gallerySrc, picfairUrl);
  }
}

console.log(`Loaded ${srcToPicfair.size} mappings to apply\n`);

// Process each gallery file
const galleryFiles = fs
  .readdirSync(GALLERIES_DIR)
  .filter((f) => f.endsWith(".json"));

let totalEnriched = 0;

for (const file of galleryFiles) {
  const filePath = path.join(GALLERIES_DIR, file);
  const gallery: Gallery = JSON.parse(fs.readFileSync(filePath, "utf-8"));
  let fileEnriched = 0;

  const enrichImage = (img: GalleryImage) => {
    const picfairUrl = srcToPicfair.get(img.src);
    if (picfairUrl && !img.picfairUrl) {
      img.picfairUrl = picfairUrl;
      fileEnriched++;
    }
  };

  if (gallery.sections) {
    for (const section of gallery.sections) {
      section.images.forEach(enrichImage);
    }
  } else if (gallery.images) {
    gallery.images.forEach(enrichImage);
  }

  if (fileEnriched > 0) {
    fs.writeFileSync(filePath, JSON.stringify(gallery, null, 2) + "\n");
    console.log(`  ${file}: enriched ${fileEnriched} images`);
    totalEnriched += fileEnriched;
  } else {
    console.log(`  ${file}: no changes`);
  }
}

console.log(`\nTotal images enriched: ${totalEnriched}`);
