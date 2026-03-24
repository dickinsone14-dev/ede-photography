import type { Metadata } from "next";
import Link from "next/link";
import FaqAccordion from "@/components/FaqAccordion";
import ScrollReveal from "@/components/ScrollReveal";

import faqData from "@/content/faqs.json";

export const metadata: Metadata = {
  title: "FAQs",
  description:
    "Frequently asked questions about prints, licensing, commissions, shipping, and digital downloads from E.D.E Photography.",
};

export default function FaqsPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqData.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer.replace(/\[([^\]]+)\]\([^)]+\)/g, "$1"),
      },
    })),
  };

  return (
    <div className="container-narrow py-16">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ScrollReveal>
        <div className="mb-12">
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-4 text-brand-text">
            Frequently Asked Questions
          </h1>
          <p className="text-brand-text-light max-w-2xl">
            Everything you need to know about prints, licensing, commissions, and
            more. If your question isn&apos;t answered here, feel free to{" "}
            <Link
              href="/contact"
              className="text-brand-teal underline underline-offset-4 hover:text-brand-teal-hover transition-colors"
            >
              get in touch
            </Link>
            .
          </p>
        </div>
      </ScrollReveal>

      <ScrollReveal>
        <FaqAccordion items={faqData} />
      </ScrollReveal>
    </div>
  );
}
