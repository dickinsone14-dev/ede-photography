import Image from "next/image";
import Link from "next/link";
import HeroImage from "@/components/HeroImage";
import { getGalleriesByCategory } from "@/lib/galleries";

export default function Home() {
  const galleries = getGalleriesByCategory("portfolio");
  const featuredImages = galleries
    .flatMap((g) =>
      g.images.slice(0, 2).map((img) => ({
        ...img,
        galleryTitle: g.title,
        gallerySlug: g.slug,
      }))
    )
    .slice(0, 4);

  return (
    <>
      {/* Hero */}
      <HeroImage
        src="https://picsum.photos/seed/hero-landscape/1600/1000"
        alt="Mountain landscape at golden hour"
        title="E.D.E Photography"
        subtitle="UK Landscape & Adventure Photography"
        height="full"
      />

      {/* Intro */}
      <section className="container-wide py-20">
        <div className="max-w-2xl">
          <h2 className="text-2xl md:text-3xl font-semibold mb-6">
            Mountains. Coastlines. Wild places.
          </h2>
          <p className="text-gray-400 leading-relaxed">
            I photograph the landscapes of the UK and beyond — from the ridges
            of the Brecon Beacons and Snowdonia to the shores of Jersey and the
            peaks of the Alps. My work is driven by early starts, long hikes,
            and a love of being in the mountains when the light does something
            extraordinary.
          </p>
        </div>
      </section>

      {/* Featured Work */}
      <section className="container-wide pb-20">
        <h2 className="text-lg font-medium text-gray-400 mb-8">
          Featured Work
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {featuredImages.map((img, i) => (
            <Link
              key={i}
              href={`/portfolio/${img.gallerySlug}`}
              className="group relative aspect-[3/2] overflow-hidden rounded-lg bg-charcoal-800"
            >
              <Image
                src={img.src}
                alt={img.alt}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="absolute bottom-4 left-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <p className="text-sm font-medium">{img.alt}</p>
                <p className="text-xs text-gray-300 mt-1">
                  {img.galleryTitle}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* CTAs */}
      <section className="container-wide pb-20">
        <div className="flex flex-col sm:flex-row gap-4">
          <Link
            href="/portfolio"
            className="inline-flex items-center justify-center bg-white text-charcoal-900 font-medium py-3 px-8 rounded-lg hover:bg-gray-200 transition-colors"
          >
            View Portfolio
          </Link>
          <Link
            href="/store"
            className="inline-flex items-center justify-center border border-white/20 text-gray-300 font-medium py-3 px-8 rounded-lg hover:border-white/40 hover:text-white transition-colors"
          >
            Buy Prints
          </Link>
        </div>
      </section>

      {/* About snippet */}
      <section className="border-t border-white/5">
        <div className="container-wide py-20">
          <div className="max-w-2xl">
            <h2 className="text-lg font-medium text-gray-400 mb-4">
              About
            </h2>
            <p className="text-gray-400 leading-relaxed mb-6">
              I&apos;m Ed — a landscape and adventure photographer based in the
              UK. Originally from Jersey, I now spend most of my time in the
              mountains of Wales and further afield, chasing light and weather
              across ridgelines and coastlines.
            </p>
            <Link
              href="/about"
              className="text-sm text-gray-400 hover:text-white transition-colors underline underline-offset-4"
            >
              Read more about me
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
