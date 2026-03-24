import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import AnnouncementBar from "@/components/AnnouncementBar";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ScrollIndicator from "@/components/ScrollIndicator";
import SmoothScroll from "@/components/SmoothScroll";
import { BASE_URL } from "@/lib/constants";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "E.D.E Photography",
    template: "%s | E.D.E Photography",
  },
  description:
    "Photography by Ed. Prints available. Specialising in mountains, hiking, and coastal photography across Wales, the Alps, and Jersey.",
  metadataBase: new URL(BASE_URL),
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
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#000000",
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
    url: BASE_URL,
    logo: `${BASE_URL}/icon.png`,
    image: `${BASE_URL}/images/hiking/cadair-idris/DSCF6982-2.jpg`,
    sameAs: ["https://www.instagram.com/e.d.e.photography/"],
    address: {
      "@type": "PostalAddress",
      addressCountry: "GB",
    },
  };

  return (
    <html lang="en-GB" className={inter.className}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-screen flex flex-col">
        <SmoothScroll />
        <AnnouncementBar />
        <Navbar />
        <main className="flex-1" style={{ paddingTop: "calc(4rem + var(--announcement-height, 32px))" }}>{children}</main>
        <ScrollIndicator />
        <Footer />
        <Analytics />
      </body>
    </html>
  );
}
