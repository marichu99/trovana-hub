import { motion } from "framer-motion";

const NAV = [
  { href: "#services", label: "Services" },
  { href: "#work", label: "Work" },
  { href: "#process", label: "Process" },
  { href: "#about", label: "About" },
  { href: "#contact", label: "Contact" },
];

const SOCIALS = [
  { label: "Instagram", href: "#" },
  { label: "LinkedIn", href: "#" },
  { label: "TikTok", href: "#" },
];

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="border-t border-warmgrey/15 bg-charcoal px-5 pb-10 pt-20">
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-col items-start justify-between gap-10 border-b border-warmgrey/15 pb-14 md:flex-row md:items-end">
          <div>
            <p className="font-display text-4xl font-semibold tracking-tight text-stone sm:text-6xl">
              Trovana<span className="text-ember"> Hub</span>
            </p>
            <p className="mt-4 max-w-sm text-warmgrey">We build websites and demand.</p>
          </div>

          <button
            type="button"
            onClick={scrollToTop}
            data-cursor="Up"
            className="flex h-14 w-14 items-center justify-center rounded-full border border-warmgrey/30 text-stone transition-colors hover:border-ember hover:text-ember"
            aria-label="Back to top"
          >
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
              <path
                d="M9 15V3M9 3L3 9M9 3l6 6"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>

        <div className="flex flex-col items-start justify-between gap-8 pt-10 md:flex-row md:items-center">
          <nav className="flex flex-wrap gap-6">
            {NAV.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm text-warmgrey transition-colors hover:text-stone"
              >
                {link.label}
              </a>
            ))}
          </nav>

          <div className="flex gap-5">
            {SOCIALS.map((social) => (
              <motion.a
                key={social.label}
                href={social.href}
                whileHover={{ y: -3, color: "#FF6A2B" }}
                className="text-sm text-warmgrey"
                data-cursor="View"
              >
                {social.label}
              </motion.a>
            ))}
          </div>
        </div>

        <p className="mt-10 text-xs text-warmgrey/60">
          © {new Date().getFullYear()} Trovana Hub. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
