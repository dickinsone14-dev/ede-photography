import type { Metadata } from "next";
import ContactForm from "@/components/ContactForm";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get in touch with E.D.E Photography. Available for commissions, licensing, and collaborations.",
};

export default function ContactPage() {
  return (
    <div className="container-narrow py-16">
      <div className="mb-12">
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
          Contact
        </h1>
        <p className="text-gray-400 max-w-2xl leading-relaxed">
          Available for commissions, licensing, and collaborations. Send me a
          message below or reach out directly by email.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
        {/* Form */}
        <div className="md:col-span-2">
          <ContactForm />
        </div>

        {/* Contact info sidebar */}
        <div className="space-y-8">
          <div>
            <h3 className="text-sm font-medium text-gray-300 mb-2">Email</h3>
            <a
              href="mailto:hello@ede-photography.com"
              className="text-sm text-gray-400 hover:text-white transition-colors"
            >
              hello@ede-photography.com
            </a>
          </div>

          <div>
            <h3 className="text-sm font-medium text-gray-300 mb-2">
              Instagram
            </h3>
            <a
              href="https://www.instagram.com/e.d.e_photography/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-gray-400 hover:text-white transition-colors"
            >
              @e.d.e_photography
            </a>
          </div>

          <div>
            <h3 className="text-sm font-medium text-gray-300 mb-2">
              Response time
            </h3>
            <p className="text-sm text-gray-400">
              I typically respond within 24-48 hours.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
