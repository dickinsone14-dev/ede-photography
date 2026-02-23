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
      <div className="relative aspect-[3/4] overflow-hidden rounded-lg bg-brand-surface transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
        <Image
          src={src}
          alt={alt}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
        />
      </div>
      <div className="mt-3">
        <h3 className="text-sm font-medium text-brand-text">{title}</h3>
        <p className="text-sm text-brand-text-light mt-1">From {price}</p>
        <a
          href={picfairUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block mt-2 text-sm text-brand-teal hover:text-brand-teal-hover transition-colors underline underline-offset-4"
        >
          Buy on Picfair
        </a>
      </div>
    </div>
  );
}
