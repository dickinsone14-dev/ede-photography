import fs from "fs";
import path from "path";

export interface GalleryImage {
  src: string;
  alt: string;
  location?: string;
  date?: string;
  picfairUrl?: string;
}

export interface Gallery {
  title: string;
  slug: string;
  category: "portfolio" | "other-work";
  description: string;
  coverImage: string;
  images: GalleryImage[];
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
  return getAllGalleries().filter((g) => g.category === category);
}

export function getGalleryBySlug(slug: string): Gallery | undefined {
  return getAllGalleries().find((g) => g.slug === slug);
}
