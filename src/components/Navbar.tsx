import { useEffect, useState } from "react";
import { motion, useScroll, useMotionValueEvent, AnimatePresence } from "framer-motion";
import { useMagnetic } from "../lib/useMagnetic";

const LINKS = [
  { href: "#services", label: "Services" },
  { href: "#ai-videos", label: "AI Videos" },
  { href: "#work", label: "Work" },
  { href: "#process", label: "Process" },
  { href: "#about", label: "About" },
  { href: "#contact", label: "Contact" },
];

export default function Navbar() {
  const [shrink, setShrink] = useState(false);
  const [open, setOpen] = useState(false);
  const { scrollY } = useScroll();
  const magnetic = useMagnetic<HTMLAnchorElement>(0.25);

  useMotionValueEvent(scrollY, "change", (latest) => {
    setShrink(latest > 40);
  });

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header className="fixed inset-x-0 top-0 z-[80]">
      <motion.div
        className="mx-auto flex max-w-6xl items-center justify-between rounded-b-2xl border border-white/0 bg-charcoal/60 px-5 backdrop-blur-xl transition-[padding,margin,border-color] duration-500"
        animate={{
          paddingTop: shrink ? 10 : 20,
          paddingBottom: shrink ? 10 : 20,
          marginLeft: shrink ? "1rem" : "0rem",
          marginRight: shrink ? "1rem" : "0rem",
        }}
        style={{
          borderColor: shrink ? "rgba(138,133,128,0.2)" : "transparent",
        }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      >
        <a
          href="#top"
          className="font-display text-lg font-semibold tracking-tight text-stone"
          data-cursor="Home"
        >
          Trovana<span className="text-ember"> Hub</span>
        </a>

        <nav className="hidden items-center gap-8 md:flex">
          {LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-warmgrey transition-colors hover:text-stone"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <a
          ref={magnetic.ref}
          href="#contact"
          onPointerMove={magnetic.onPointerMove}
          onPointerLeave={magnetic.onPointerLeave}
          data-cursor="Go"
          className="hidden rounded-full bg-ember px-5 py-2 text-sm font-semibold text-charcoal transition-transform duration-300 ease-out md:inline-block"
        >
          Start a project
        </a>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="relative z-[110] flex h-10 w-10 flex-col items-center justify-center gap-1.5 md:hidden"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
        >
          <motion.span
            className="h-0.5 w-6 bg-stone"
            animate={{ rotate: open ? 45 : 0, y: open ? 6 : 0 }}
          />
          <motion.span className="h-0.5 w-6 bg-stone" animate={{ opacity: open ? 0 : 1 }} />
          <motion.span
            className="h-0.5 w-6 bg-stone"
            animate={{ rotate: open ? -45 : 0, y: open ? -6 : 0 }}
          />
        </button>
      </motion.div>

      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-[100] flex flex-col items-center justify-center gap-6 bg-charcoal md:hidden"
            initial={{ clipPath: "circle(0% at 90% 5%)" }}
            animate={{ clipPath: "circle(150% at 90% 5%)" }}
            exit={{ clipPath: "circle(0% at 90% 5%)" }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            {LINKS.map((link, i) => (
              <motion.a
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="font-display text-3xl font-semibold text-stone"
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15 + i * 0.07, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              >
                {link.label}
              </motion.a>
            ))}
            <motion.a
              href="#contact"
              onClick={() => setOpen(false)}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 + LINKS.length * 0.07, duration: 0.5 }}
              className="mt-4 rounded-full bg-ember px-6 py-3 text-sm font-semibold text-charcoal"
            >
              Start a project
            </motion.a>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
