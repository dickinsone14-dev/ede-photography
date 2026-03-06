import Link from "next/link";
import HeroImage from "@/components/HeroImage";
import ScrollReveal from "@/components/ScrollReveal";
import GalleryTicker from "@/components/GalleryTicker";

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
      <ScrollReveal>
        <section className="pb-20">
          <div className="container-wide">
            <h2 className="text-lg font-medium text-brand-text-faint mb-8">
              Featured Work
            </h2>
          </div>
          <GalleryTicker />
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
