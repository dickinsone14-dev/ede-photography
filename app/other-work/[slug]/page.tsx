import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import GalleryGrid from "@/components/GalleryGrid";
import { getAllGalleries, getGalleryBySlug } from "@/lib/galleries";

interface Props {
  params: { slug: string };
}

export async function generateStaticParams() {
  const galleries = getAllGalleries().filter(
    (g) => g.category === "other-work"
  );
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

export default function OtherWorkGalleryPage({ params }: Props) {
  const gallery = getGalleryBySlug(params.slug);
  if (!gallery || gallery.category !== "other-work") notFound();

  return (
    <div className="container-wide py-16">
      {/* Breadcrumb */}
      <div className="mb-8">
        <Link
          href="/other-work"
          className="text-sm text-gray-500 hover:text-white transition-colors"
        >
          Other Work
        </Link>
        <span className="text-gray-600 mx-2">/</span>
        <span className="text-sm text-gray-300">{gallery.title}</span>
      </div>

      {/* Header */}
      <div className="mb-12">
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
          {gallery.title}
        </h1>
        <p className="text-gray-400 max-w-3xl leading-relaxed">
          {gallery.description}
        </p>
        <p className="text-sm text-gray-600 mt-4">
          {gallery.images.length} images
        </p>
      </div>

      {/* Gallery */}
      <GalleryGrid images={gallery.images} />
    </div>
  );
}
