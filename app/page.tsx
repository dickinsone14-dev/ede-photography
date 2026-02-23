import Image from "next/image";
import Link from "next/link";
import HeroImage from "@/components/HeroImage";
import ScrollReveal from "@/components/ScrollReveal";


const featuredWork = [
  {
    src: "/images/hiking/cadair-idris/DSCF7279-2.jpg",
    alt: "Llyn Cau and the cliffs of Cadair Idris",
    location: "Cadair Idris, Snowdonia",
    gallery: "Hiking in the UK",
    href: "/portfolio/hiking-uk#cadair-idris-snowdonia",
  },
  {
    src: "/images/hiking/llyn-y-fan-fach/DSCF1566.jpg",
    alt: "Llyn y Fan Fach crater lake in snow",
    location: "Brecon Beacons",
    gallery: "Hiking in the UK",
    href: "/portfolio/hiking-uk#llyn-y-fan-fach-brecon-beacons",
  },
  {
    src: "/images/winter-alps/crans-montana/DSCF2709.jpg",
    alt: "Snowboarder against alpine backdrop",
    location: "Crans Montana, Switzerland",
    gallery: "Winter in the Alps",
    href: "/portfolio/winter-alps#crans-montana-swiss-alps",
  },
  {
    src: "/images/hiking/dinorwic-quarry/DSCF8120.jpg",
    alt: "Mountain cabins at Dinorwic Quarry",
    location: "Dinorwic Quarry, Snowdonia",
    gallery: "Hiking in the UK",
    href: "/portfolio/hiking-uk#dinorwic-quarry-snowdonia",
  },
  {
    src: "/images/jersey/IMG_4905.jpg",
    alt: "Dramatic coastal cliffs of Jersey",
    location: "Jersey, Channel Islands",
    gallery: "Jersey & the Coast",
    href: "/portfolio/jersey-coast",
  },
  {
    src: "/images/hiking/mont-joly-megeve/DSCF0582.jpg",
    alt: "Sunset over the Mont Blanc massif from Mont Joly",
    location: "Megeve, French Alps",
    gallery: "Hiking Abroad",
    href: "/portfolio/hiking-abroad#mont-joly-megeve",
  },
];

export default function Home() {
  return (
    <>
      {/* Hero */}
      <HeroImage
        src="/images/hiking/llyn-y-fan-fach/DSCF1692.jpg"
        alt="Three hikers descending a snowy mountain at Llyn y Fan Fach, Brecon Beacons"
        mobileSrc="/images/DSCF6982.jpg"
        mobileAlt="Silhouette of a person standing on a rock outcrop against a dramatic sunset sky"
        title="E.D.E Photography"
        height="full"
      />

      {/* Intro */}
      <ScrollReveal>
        <section className="container-wide py-20">
          <div className="max-w-2xl">
            <h2 className="text-2xl md:text-3xl font-semibold mb-6 text-brand-text">
              Mountains. Coastlines. Wild places.
            </h2>
            <p className="text-brand-text-light leading-relaxed">
              I photograph the landscapes of the UK and beyond — from the ridges
              of the Brecon Beacons and Snowdonia to the Lake District, the
              shores of Jersey, and the peaks of the Alps.
            </p>
          </div>
        </section>
      </ScrollReveal>

      {/* Featured Work */}
      <ScrollReveal stagger={100}>
        <section className="container-wide pb-20">
          <h2 className="text-lg font-medium text-brand-text-faint mb-8">
            Featured Work
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {featuredWork.map((img, i) => (
              <Link
                key={i}
                href={img.href}
                data-stagger-item
                className="scroll-reveal group relative aspect-[3/2] overflow-hidden rounded-lg bg-brand-surface transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
              >
                <Image
                  src={img.src}
                  alt={img.alt}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <p className="text-sm font-medium text-white">{img.location}</p>
                  <p className="text-xs text-white/80 mt-1">{img.gallery}</p>
                </div>
              </Link>
            ))}
          </div>
        </section>
      </ScrollReveal>

      {/* CTAs */}
      <ScrollReveal>
        <section className="container-wide pb-20">
          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              href="/portfolio"
              className="inline-flex items-center justify-center bg-brand-accent text-white font-medium py-3 px-8 rounded-lg hover:bg-brand-accent-hover hover:scale-[1.02] active:scale-[0.98] transition-all"
            >
              View Portfolio
            </Link>
            <Link
              href="/store"
              className="inline-flex items-center justify-center border border-brand-border text-brand-text font-medium py-3 px-8 rounded-lg hover:border-brand-text-faint hover:text-brand-teal hover:scale-[1.02] active:scale-[0.98] transition-all"
            >
              Buy Prints
            </Link>
          </div>
        </section>
      </ScrollReveal>

      {/* About snippet */}
      <ScrollReveal>
        <section className="border-t border-brand-border-light bg-brand-cream">
          <div className="container-wide py-20">
            <div className="max-w-2xl">
              <h2 className="text-lg font-medium text-brand-text-faint mb-4">About</h2>
              <p className="text-brand-text-light leading-relaxed mb-6">
                I&apos;m Ed — a photographer based in the UK. Originally from
                Jersey, I now try and spend as much time as possible in the
                mountains of the UK and further afield.
              </p>
              <Link
                href="/about"
                className="text-sm text-brand-teal hover:text-brand-teal-hover transition-colors underline underline-offset-4"
              >
                Read more about me
              </Link>
            </div>
          </div>
        </section>
      </ScrollReveal>
    </>
  );
}
