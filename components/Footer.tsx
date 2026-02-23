import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-brand-cream border-t border-brand-border mt-24">
      <div className="container-wide py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand */}
          <div>
            <Link href="/" className="text-lg font-semibold tracking-tight text-brand-text">
              E.D.E Photography
            </Link>
            <p className="mt-2 text-sm text-brand-text-light">
              UK Photography
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="text-sm font-medium text-brand-text-faint mb-3">
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
                    className="text-sm text-brand-text-light hover:text-brand-teal transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Connect */}
          <div>
            <h3 className="text-sm font-medium text-brand-text-faint mb-3">Connect</h3>
            <ul className="space-y-2">
              <li>
                <a
                  href="https://www.instagram.com/e.d.e.photography/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-brand-text-light hover:text-brand-teal transition-colors"
                >
                  Instagram
                </a>
              </li>
              <li>
                <a
                  href="mailto:hello@ede-photography.com"
                  className="text-sm text-brand-text-light hover:text-brand-teal transition-colors"
                >
                  hello@ede-photography.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-brand-border text-center">
          <p className="text-xs text-brand-text-faint">
            &copy; {new Date().getFullYear()} E.D.E Photography. All rights
            reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
