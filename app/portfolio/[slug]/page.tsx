import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import GalleryGrid from "@/components/GalleryGrid";
import ScrollReveal from "@/components/ScrollReveal";

import { getAllGalleries, getGalleryBySlug, getImageCount } from "@/lib/galleries";

interface Props {
  params: { slug: string };
}

export async function generateStaticParams() {
  const galleries = getAllGalleries().filter((g) => g.category === "portfolio");
  return galleries.map((g) => ({ slug: g.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const gallery = getGalleryBySlug(params.slug);
  if (!gallery) return {};
  return {
    title: gallery.title,
    description: gallery.description,
  };
}

export default function GalleryPage({ params }: Props) {
  const gallery = getGalleryBySlug(params.slug);
  if (!gallery || gallery.category !== "portfolio") notFound();

  const imageCount = getImageCount(gallery);

  return (
    <div className="container-wide py-16">
      {/* Breadcrumb */}
      <div className="mb-8">
        <Link
          href="/portfolio"
          className="text-sm text-brand-text-faint hover:text-brand-teal transition-colors"
        >
          Portfolio
        </Link>
        <span className="text-brand-text-faint mx-2">/</span>
        <span className="text-sm text-brand-text">{gallery.title}</span>
      </div>

      {/* Header */}
      <ScrollReveal>
        <div className="mb-12">
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-4 text-brand-text">
            {gallery.title}
          </h1>
          <p className="text-brand-text-light max-w-3xl leading-relaxed">
            {gallery.description}
          </p>
          <p className="text-sm text-brand-text-faint mt-4">
            {imageCount} images
          </p>
        </div>
      </ScrollReveal>

      {/* Gallery */}
      <GalleryGrid sections={gallery.sections} images={gallery.images} />
    </div>
  );
}
