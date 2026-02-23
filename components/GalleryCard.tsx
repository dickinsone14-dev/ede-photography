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
      <div className="relative aspect-[4/3] overflow-hidden rounded-lg bg-charcoal-800">
        <Image
          src={coverImage}
          alt={title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        <div className="absolute bottom-0 left-0 right-0 p-5 translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
          <h3 className="text-lg font-semibold">{title}</h3>
          <p className="text-sm text-gray-300 mt-1">
            {imageCount} {imageCount === 1 ? "image" : "images"}
          </p>
        </div>
      </div>
    </Link>
  );
}
