#!/usr/bin/env node
/**
 * Generate blurDataURL for every image in gallery JSON files.
 * Run: node scripts/generate-blur-placeholders.mjs
 */
import fs from "fs";
import path from "path";
import sharp from "sharp";

const GALLERIES_DIR = path.join(process.cwd(), "content/galleries");
const PUBLIC_DIR = path.join(process.cwd(), "public");

async function generateBlurDataURL(imagePath) {
  const fullPath = path.join(PUBLIC_DIR, imagePath);
  if (!fs.existsSync(fullPath)) {
    console.warn(`  Warning: ${imagePath} not found, skipping`);
    return undefined;
  }
  const buffer = await sharp(fullPath)
    .resize(10, undefined, { withoutEnlargement: true })
    .jpeg({ quality: 30 })
    .toBuffer();
  return `data:image/jpeg;base64,${buffer.toString("base64")}`;
}

async function processGallery(filePath) {
  const raw = fs.readFileSync(filePath, "utf-8");
  const gallery = JSON.parse(raw);
  let count = 0;

  async function processImage(img) {
    if (img.blurDataURL) return; // already has one
    const blur = await generateBlurDataURL(img.src);
    if (blur) {
      img.blurDataURL = blur;
      count++;
    }
  }

  if (gallery.sections) {
    for (const section of gallery.sections) {
      for (const img of section.images) {
        await processImage(img);
      }
    }
  }
  if (gallery.images) {
    for (const img of gallery.images) {
      await processImage(img);
    }
  }

  // Also process cover image
  if (gallery.coverImage && !gallery.coverBlurDataURL) {
    const blur = await generateBlurDataURL(gallery.coverImage);
    if (blur) {
      gallery.coverBlurDataURL = blur;
      count++;
    }
  }

  if (count > 0) {
    fs.writeFileSync(filePath, JSON.stringify(gallery, null, 2) + "\n");
    console.log(`  ${path.basename(filePath)}: ${count} placeholders generated`);
  } else {
    console.log(`  ${path.basename(filePath)}: already up to date`);
  }
}

async function main() {
  console.log("Generating blur placeholders...\n");
  const files = fs.readdirSync(GALLERIES_DIR).filter((f) => f.endsWith(".json"));
  for (const file of files) {
    await processGallery(path.join(GALLERIES_DIR, file));
  }
  console.log("\nDone.");
}

main().catch(console.error);
