import type { Metadata } from "next";
import Image from "next/image";
import ScrollReveal from "@/components/ScrollReveal";

export const metadata: Metadata = {
  title: "About",
  description:
    "About Ed — UK landscape and adventure photographer. Jersey roots, Welsh mountains, Alpine winters.",
};

export default function AboutPage() {
  return (
    <div className="container-narrow py-16">
      {/* Portrait */}
      <ScrollReveal>
        <div className="mb-12">
          <div className="relative aspect-[4/3] md:aspect-[3/2] overflow-hidden rounded-lg bg-brand-surface">
            <Image
              src="/images/about/DSC00756.jpg"
              alt="Ed — E.D.E Photography"
              fill
              className="object-cover"
              sizes="(max-width: 896px) 100vw, 896px"
              priority
            />
          </div>
        </div>
      </ScrollReveal>

      {/* Bio */}
      <ScrollReveal>
        <div className="max-w-none">
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-8 text-brand-text">
            About
          </h1>

          <div className="space-y-6 text-brand-text-light leading-relaxed">
            <p>
              I&apos;m Ed — a landscape and adventure photographer based in the
              UK. I grew up in Jersey, surrounded by the sea, and developed an
              early appreciation for the outdoors and the way light changes
              everything about a place.
            </p>

            <p>
              These days I spend most of my time in the mountains of Wales — the
              Brecon Beacons and Snowdonia in particular — as well as making
              regular trips to the Alps, the Scottish Highlands, and back to
              Jersey. My work is driven by early starts, long hikes, and the
              pursuit of those rare moments when conditions come together and the
              landscape does something extraordinary.
            </p>

            <p>
              I&apos;m drawn to ridgelines, cloud inversions, winter conditions,
              and the quiet hours at either end of the day. I shoot to capture
              what it feels like to be in these places — the scale, the silence,
              and the changing light.
            </p>

            <p>
              Prints of my work are available through the{" "}
              <a
                href="/store"
                className="text-brand-teal underline underline-offset-4 hover:text-brand-teal-hover transition-colors"
              >
                store
              </a>
              , and I&apos;m available for commissions, licensing, and
              collaborations. Get in touch via the{" "}
              <a
                href="/contact"
                className="text-brand-teal underline underline-offset-4 hover:text-brand-teal-hover transition-colors"
              >
                contact page
              </a>
              .
            </p>
          </div>
        </div>
      </ScrollReveal>

      {/* Instagram link */}
      <ScrollReveal>
        <section className="mt-16 pt-16 border-t border-brand-border">
          <a
            href="https://www.instagram.com/e.d.e_photography/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm text-brand-teal hover:text-brand-teal-hover transition-colors"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
            </svg>
            Follow on Instagram
          </a>
        </section>
      </ScrollReveal>
    </div>
  );
}
