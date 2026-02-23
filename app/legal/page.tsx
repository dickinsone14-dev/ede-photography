import type { Metadata } from "next";
import ScrollReveal from "@/components/ScrollReveal";

export const metadata: Metadata = {
  title: "Legal",
  description:
    "Privacy policy, cookie information, copyright and licensing terms for E.D.E Photography.",
};

export default function LegalPage() {
  return (
    <div className="container-narrow py-16">
      <ScrollReveal>
        <div className="mb-12">
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-4 text-brand-text">
            Legal
          </h1>
          <p className="text-brand-text-light max-w-2xl">
            Privacy policy, cookie information, and terms relating to
            E.D.E Photography.
          </p>
        </div>
      </ScrollReveal>

      {/* Privacy Policy */}
      <ScrollReveal>
        <section className="mb-12">
          <h2 className="text-xl md:text-2xl font-semibold text-brand-text mb-4">
            Privacy Policy
          </h2>
          <div className="space-y-4 text-sm text-brand-text-light leading-relaxed">
            <p>
              E.D.E Photography is committed to protecting your privacy and
              complying with the UK General Data Protection Regulation (UK GDPR).
            </p>

            <h3 className="text-base font-medium text-brand-text pt-2">
              What data we collect
            </h3>
            <p>
              When you submit the contact form on this site, we collect your
              name, email address, and message content. This information is used
              solely to respond to your enquiry.
            </p>

            <h3 className="text-base font-medium text-brand-text pt-2">
              How we use your data
            </h3>
            <p>
              Your data is used only to respond to your enquiry and, where
              applicable, to discuss potential commissions or licensing. We do
              not share your personal data with third parties for marketing
              purposes.
            </p>

            <h3 className="text-base font-medium text-brand-text pt-2">
              Data retention
            </h3>
            <p>
              Contact form submissions are retained only as long as necessary to
              handle your enquiry. You may request deletion of your data at any
              time by emailing{" "}
              <a
                href="mailto:hello@ede-photography.com"
                className="text-brand-teal underline underline-offset-4 hover:text-brand-teal-hover transition-colors"
              >
                hello@ede-photography.com
              </a>
              .
            </p>

            <h3 className="text-base font-medium text-brand-text pt-2">
              Your rights
            </h3>
            <p>
              Under UK GDPR, you have the right to access, correct, or delete
              your personal data. You also have the right to restrict or object
              to processing and the right to data portability. To exercise any of
              these rights, please contact us at the email address above.
            </p>
          </div>
        </section>
      </ScrollReveal>

      {/* Cookies */}
      <ScrollReveal>
        <section className="mb-12">
          <h2 className="text-xl md:text-2xl font-semibold text-brand-text mb-4">
            Cookies
          </h2>
          <div className="space-y-4 text-sm text-brand-text-light leading-relaxed">
            <p>
              This site uses Vercel Analytics to collect anonymous, aggregated
              usage data such as page views and web vitals. Vercel Analytics does
              not use cookies and does not collect personally identifiable
              information.
            </p>
            <p>
              No additional tracking cookies or third-party advertising cookies
              are used on this site.
            </p>
          </div>
        </section>
      </ScrollReveal>

      {/* Copyright & Licensing */}
      <ScrollReveal>
        <section className="mb-12">
          <h2 className="text-xl md:text-2xl font-semibold text-brand-text mb-4">
            Copyright &amp; Licensing
          </h2>
          <div className="space-y-4 text-sm text-brand-text-light leading-relaxed">
            <p>
              All images and content on this site are &copy;{" "}
              {new Date().getFullYear()} E.D.E Photography. All rights reserved.
            </p>
            <p>
              No images may be reproduced, distributed, or used commercially
              without prior written permission. Licensing enquiries are welcome
              — please{" "}
              <a
                href="/contact"
                className="text-brand-teal underline underline-offset-4 hover:text-brand-teal-hover transition-colors"
              >
                get in touch
              </a>{" "}
              to discuss terms.
            </p>
          </div>
        </section>
      </ScrollReveal>

      {/* Third Parties */}
      <ScrollReveal>
        <section className="mb-12">
          <h2 className="text-xl md:text-2xl font-semibold text-brand-text mb-4">
            Third Parties
          </h2>
          <div className="space-y-4 text-sm text-brand-text-light leading-relaxed">
            <p>
              Print fulfilment and payment processing are handled by{" "}
              <a
                href="https://www.picfair.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-brand-teal underline underline-offset-4 hover:text-brand-teal-hover transition-colors"
              >
                Picfair
              </a>
              . When you purchase a print, your transaction is governed by{" "}
              <a
                href="https://www.picfair.com/terms"
                target="_blank"
                rel="noopener noreferrer"
                className="text-brand-teal underline underline-offset-4 hover:text-brand-teal-hover transition-colors"
              >
                Picfair&apos;s terms and conditions
              </a>
              .
            </p>
            <p>
              This site is hosted on{" "}
              <a
                href="https://vercel.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-brand-teal underline underline-offset-4 hover:text-brand-teal-hover transition-colors"
              >
                Vercel
              </a>
              . Vercel may process limited technical data (such as IP addresses)
              as part of hosting. See{" "}
              <a
                href="https://vercel.com/legal/privacy-policy"
                target="_blank"
                rel="noopener noreferrer"
                className="text-brand-teal underline underline-offset-4 hover:text-brand-teal-hover transition-colors"
              >
                Vercel&apos;s privacy policy
              </a>{" "}
              for details.
            </p>
          </div>
        </section>
      </ScrollReveal>
    </div>
  );
}
