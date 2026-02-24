import Image from "next/image";
import Link from "next/link";

interface GalleryCardProps {
  title: string;
  slug: string;
  coverImage: string;
  imageCount: number;
  category: "portfolio" | "other-work";
}

export default function GalleryCard({
  title,
  slug,
  coverImage,
  imageCount,
  category,
}: GalleryCardProps) {
  const href = category === "portfolio" ? `/portfolio/${slug}` : `/other-work/${slug}`;

  return (
    <Link href={href} className="group block">
      <div className="relative aspect-[4/3] overflow-hidden rounded-lg bg-brand-surface transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
        <Image
          src={coverImage}
          alt={title}
          fill
          quality={100}
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-5">
          <h3 className="text-lg font-semibold text-white">{title}</h3>
          <p className="text-sm text-white/80 mt-1">
            {imageCount} {imageCount === 1 ? "image" : "images"}
          </p>
        </div>
      </div>
    </Link>
  );
}
