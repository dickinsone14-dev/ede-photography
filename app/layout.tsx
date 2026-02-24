import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ScrollIndicator from "@/components/ScrollIndicator";
import SmoothScroll from "@/components/SmoothScroll";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "E.D.E Photography",
    template: "%s | E.D.E Photography",
  },
  description:
    "Photography by Ed. Prints available. Specialising in mountains, hiking, and coastal photography across Wales, the Alps, and Jersey.",
  metadataBase: new URL("https://ede-photography.com"),
  openGraph: {
    type: "website",
    locale: "en_GB",
    siteName: "E.D.E Photography",
  },
  twitter: {
    card: "summary_large_image",
  },
  robots: {
    index: true,
    follow: true,
  },
  other: {
    "theme-color": "#000000",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: "E.D.E Photography",
    description:
      "Photography. Prints, licensing, and commissions.",
    url: "https://ede-photography.com",
    image: "https://ede-photography.com/images/hiking/cadair-idris/DSCF6982-2.jpg",
    sameAs: ["https://www.instagram.com/e.d.e.photography/"],
    address: {
      "@type": "PostalAddress",
      addressCountry: "GB",
    },
  };

  return (
    <html lang="en">
      <head>
        <meta name="theme-color" content="#000000" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-screen flex flex-col">
        <SmoothScroll />
        <Navbar />
        <main className="flex-1 pt-16">{children}</main>
        <ScrollIndicator />
        <Footer />
        <Analytics />
      </body>
    </html>
  );
}
