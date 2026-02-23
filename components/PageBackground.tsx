import Image from "next/image";

interface PageBackgroundProps {
  src: string;
  children: React.ReactNode;
}

export default function PageBackground({ src, children }: PageBackgroundProps) {
  return (
    <div className="relative">
      {/* Fixed background image */}
      <div
        className="fixed inset-0 z-0 pointer-events-none"
        aria-hidden="true"
      >
        <Image
          src={src}
          alt=""
          fill
          className="object-cover opacity-[0.07]"
          quality={60}
          sizes="100vw"
          priority={false}
        />
        {/* Vignette overlays — white gradients on all edges */}
        <div className="absolute inset-0 bg-gradient-to-b from-white via-transparent to-white" />
        <div className="absolute inset-0 bg-gradient-to-r from-white via-transparent to-white" />
      </div>

      {/* Page content */}
      <div className="relative z-10">{children}</div>
    </div>
  );
}
