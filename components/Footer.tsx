import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-white/5 mt-24">
      <div className="container-wide py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand */}
          <div>
            <Link href="/" className="text-lg font-semibold tracking-tight">
              E.D.E Photography
            </Link>
            <p className="mt-2 text-sm text-gray-500">
              UK Landscape & Adventure Photography
            </p>
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
                    className="text-sm text-gray-500 hover:text-white transition-colors"
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
                  href="https://www.instagram.com/e.d.e_photography/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-gray-500 hover:text-white transition-colors"
                >
                  Instagram
                </a>
              </li>
              <li>
                <a
                  href="mailto:hello@ede-photography.com"
                  className="text-sm text-gray-500 hover:text-white transition-colors"
                >
                  hello@ede-photography.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-white/5 text-center">
          <p className="text-xs text-gray-600">
            &copy; {new Date().getFullYear()} E.D.E Photography. All rights
            reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
