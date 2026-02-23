import Image from "next/image";

interface HeroImageProps {
  src: string;
  alt: string;
  title?: string;
  subtitle?: string;
  overlay?: boolean;
  height?: "full" | "large" | "medium";
}

export default function HeroImage({
  src,
  alt,
  title,
  subtitle,
  overlay = true,
  height = "large",
}: HeroImageProps) {
  const heightClasses = {
    full: "h-screen",
    large: "h-[80vh]",
    medium: "h-[60vh]",
  };

  return (
    <section className={`relative ${heightClasses[height]} w-full overflow-hidden`}>
      <Image
        src={src}
        alt={alt}
        fill
        priority
        className="object-cover"
        sizes="100vw"
      />
      {overlay && (
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal-900 via-charcoal-900/20 to-transparent" />
      )}
      {(title || subtitle) && (
        <div className="absolute inset-0 flex items-end">
          <div className="container-wide pb-16 md:pb-24">
            {title && (
              <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-4">
                {title}
              </h1>
            )}
            {subtitle && (
              <p className="text-lg md:text-xl text-gray-300 max-w-2xl">
                {subtitle}
              </p>
            )}
          </div>
        </div>
      )}
    </section>
  );
}
