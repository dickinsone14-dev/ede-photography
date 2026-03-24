export interface NavLink {
  href: string;
  label: string;
  /** Show only in the footer, not the main navbar */
  footerOnly?: boolean;
}

export const navLinks: NavLink[] = [
  { href: "/portfolio", label: "Portfolio" },
  { href: "/other-work", label: "Other Work" },
  { href: "/store", label: "Store" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
  { href: "/faqs", label: "FAQs", footerOnly: true },
  { href: "/legal", label: "Legal", footerOnly: true },
];

export const mainNavLinks = navLinks.filter((l) => !l.footerOnly);
