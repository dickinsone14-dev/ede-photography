import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="relative overflow-hidden mt-24">
      {/* Background photo */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <Image
          src="/images/winter-alps/megeve-film/IMG_7877.jpg"
          alt=""
          fill
          className="object-cover object-[center_42%]"
          quality={75}
          sizes="100vw"
        />
        {/* Dark overlay for text readability */}
        <div className="absolute inset-0 bg-black/65" />
      </div>

      <div className="container-wide py-12 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand */}
          <div>
            <Link href="/" className="text-lg font-semibold tracking-tight text-white">
              E.D.E Photography
            </Link>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="text-sm font-medium text-gray-400 mb-3">
              Navigate
            </h3>
            <ul className="space-y-2">
              {[
                { href: "/portfolio", label: "Portfolio" },
                { href: "/store", label: "Store" },
                { href: "/about", label: "About" },
                { href: "/contact", label: "Contact" },
                { href: "/faqs", label: "FAQs" },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-gray-300 hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Connect */}
          <div>
            <h3 className="text-sm font-medium text-gray-400 mb-3">Connect</h3>
            <ul className="space-y-2">
              <li>
                <a
                  href="https://www.instagram.com/e.d.e.photography/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-gray-300 hover:text-white transition-colors"
                >
                  Instagram
                </a>
              </li>
              <li>
                <a
                  href="mailto:hello@ede-photography.com"
                  className="text-sm text-gray-300 hover:text-white transition-colors"
                >
                  hello@ede-photography.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-white/20 text-center">
          <p className="text-xs text-gray-400">
            &copy; {new Date().getFullYear()} E.D.E Photography. All rights
            reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
