import Image from "next/image";

interface PrintCardProps {
  title: string;
  src: string;
  alt: string;
  price: string;
  picfairUrl: string;
}

export default function PrintCard({
  title,
  src,
  alt,
  price,
  picfairUrl,
}: PrintCardProps) {
  return (
    <div className="group">
      <div className="relative aspect-[3/4] overflow-hidden rounded-lg bg-charcoal-800">
        <Image
          src={src}
          alt={alt}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
        />
      </div>
      <div className="mt-3">
        <h3 className="text-sm font-medium">{title}</h3>
        <p className="text-sm text-gray-400 mt-1">From {price}</p>
        <a
          href={picfairUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block mt-2 text-sm text-gray-400 hover:text-white transition-colors underline underline-offset-4"
        >
          Buy on Picfair
        </a>
      </div>
    </div>
  );
}
