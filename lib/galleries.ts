import fs from "fs";
import path from "path";

export interface GalleryImage {
  src: string;
  alt: string;
  location?: string;
  date?: string;
  picfairUrl?: string;
  orientation?: "landscape" | "portrait";
}

export interface GallerySection {
  title: string;
  date: string;
  images: GalleryImage[];
}

export interface Gallery {
  title: string;
  slug: string;
  category: "portfolio" | "other-work";
  order?: number;
  description: string;
  coverImage: string;
  sections?: GallerySection[];
  images?: GalleryImage[];
}

const galleriesDir = path.join(process.cwd(), "content/galleries");

export function getAllGalleries(): Gallery[] {
  const files = fs.readdirSync(galleriesDir).filter((f) => f.endsWith(".json"));
  return files.map((file) => {
    const raw = fs.readFileSync(path.join(galleriesDir, file), "utf-8");
    return JSON.parse(raw) as Gallery;
  });
}

export function getGalleriesByCategory(
  category: "portfolio" | "other-work"
): Gallery[] {
  return getAllGalleries()
    .filter((g) => g.category === category)
    .sort((a, b) => (a.order ?? 99) - (b.order ?? 99));
}

export function getGalleryBySlug(slug: string): Gallery | undefined {
  return getAllGalleries().find((g) => g.slug === slug);
}

/** Get all images from a gallery, whether sectioned or flat */
export function getAllImages(gallery: Gallery): GalleryImage[] {
  if (gallery.sections) {
    return gallery.sections.flatMap((s) => s.images);
  }
  return gallery.images || [];
}

/** Get total image count */
export function getImageCount(gallery: Gallery): number {
  return getAllImages(gallery).length;
}
