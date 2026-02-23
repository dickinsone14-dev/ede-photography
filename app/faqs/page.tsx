import type { Metadata } from "next";
import FaqAccordion from "@/components/FaqAccordion";
import faqData from "@/content/faqs.json";

export const metadata: Metadata = {
  title: "FAQs",
  description:
    "Frequently asked questions about prints, licensing, commissions, shipping, and digital downloads from E.D.E Photography.",
};

export default function FaqsPage() {
  return (
    <div className="container-narrow py-16">
      <div className="mb-12">
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
          Frequently Asked Questions
        </h1>
        <p className="text-gray-400 max-w-2xl">
          Everything you need to know about prints, licensing, commissions, and
          more. If your question isn&apos;t answered here, feel free to{" "}
          <a
            href="/contact"
            className="text-gray-300 underline underline-offset-4 hover:text-white transition-colors"
          >
            get in touch
          </a>
          .
        </p>
      </div>

      <FaqAccordion items={faqData} />
    </div>
  );
}
