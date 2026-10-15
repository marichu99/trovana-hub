import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { useMagnetic } from "../../lib/useMagnetic";
import { useReducedMotion } from "../../lib/useReducedMotion";

const HEADLINE = [
  { text: "We", accent: false },
  { text: "build", accent: false },
  { text: "websites", accent: false },
  { text: "and", accent: false },
  { text: "demand.", accent: true },
];

export default function Hero() {
  const blobRef = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();
  const primaryMagnetic = useMagnetic<HTMLAnchorElement>(0.3);
  const secondaryMagnetic = useMagnetic<HTMLAnchorElement>(0.3);

  useEffect(() => {
    if (reducedMotion || !blobRef.current) return;
    const el = blobRef.current;
    const xTo = gsap.quickTo(el, "x", { duration: 1.1, ease: "power3.out" });
    const yTo = gsap.quickTo(el, "y", { duration: 1.1, ease: "power3.out" });

    const onMove = (e: PointerEvent) => {
      const relX = (e.clientX / window.innerWidth - 0.5) * 60;
      const relY = (e.clientY / window.innerHeight - 0.5) * 60;
      xTo(relX);
      yTo(relY);
    };

    window.addEventListener("pointermove", onMove);
    return () => window.removeEventListener("pointermove", onMove);
  }, [reducedMotion]);

  return (
    <section
      id="top"
      className="relative flex min-h-[100svh] items-center overflow-hidden bg-charcoal pt-28"
    >
      <div
        ref={blobRef}
        className="pointer-events-none absolute left-1/2 top-1/2 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 opacity-70 blur-3xl"
        style={{
          background:
            "radial-gradient(circle at 30% 30%, #B07A4F 0%, #4A3326 45%, transparent 70%), radial-gradient(circle at 70% 70%, #FF6A2B 0%, transparent 55%)",
        }}
      />
      <div className="grain-overlay" />

      <div className="relative z-10 mx-auto w-full max-w-6xl px-5">
        <h1 className="font-display text-[12vw] font-semibold leading-[0.95] tracking-tight text-stone sm:text-[9vw] lg:text-[6.2vw]">
          {HEADLINE.map((word, i) => (
            <span key={word.text} className="relative mr-[0.28em] inline-block overflow-hidden align-top">
              <motion.span
                className={`inline-block ${word.accent ? "text-ember" : ""}`}
                initial={{ y: "110%" }}
                animate={{ y: "0%" }}
                transition={{
                  duration: 0.8,
                  delay: reducedMotion ? 0 : 0.5 + i * 0.1,
                  ease: [0.22, 1, 0.36, 1],
                }}
              >
                {word.text}
                {word.accent && (
                  <motion.svg
                    viewBox="0 0 200 20"
                    className="absolute -bottom-2 left-0 h-3 w-full text-ember"
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={{ pathLength: 1, opacity: 1 }}
                    transition={{ duration: 0.8, delay: reducedMotion ? 0 : 1.4, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <motion.path
                      d="M2 14C40 4 160 4 198 14"
                      stroke="currentColor"
                      strokeWidth="4"
                      strokeLinecap="round"
                      fill="none"
                    />
                  </motion.svg>
                )}
              </motion.span>
            </span>
          ))}
        </h1>

        <motion.p
          className="mt-8 max-w-xl font-accent text-2xl italic text-warmgrey sm:text-3xl"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: reducedMotion ? 0 : 1.3, ease: [0.22, 1, 0.36, 1] }}
        >
          One team, three disciplines, one outcome: growth.
        </motion.p>

        <motion.div
          className="mt-10 flex flex-wrap items-center gap-4"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: reducedMotion ? 0 : 1.5, ease: [0.22, 1, 0.36, 1] }}
        >
          <a
            ref={primaryMagnetic.ref}
            href="#contact"
            onPointerMove={primaryMagnetic.onPointerMove}
            onPointerLeave={primaryMagnetic.onPointerLeave}
            data-cursor="Go"
            className="rounded-full bg-ember px-7 py-4 text-sm font-semibold text-charcoal transition-transform duration-300 ease-out hover:shadow-[0_0_30px_rgba(255,106,43,0.5)]"
          >
            Start a project
          </a>
          <a
            ref={secondaryMagnetic.ref}
            href="#work"
            onPointerMove={secondaryMagnetic.onPointerMove}
            onPointerLeave={secondaryMagnetic.onPointerLeave}
            data-cursor="View"
            className="rounded-full border border-warmgrey/40 px-7 py-4 text-sm font-semibold text-stone transition-colors duration-300 hover:border-stone"
          >
            See our work
          </a>
        </motion.div>
      </div>

      <motion.div
        className="absolute bottom-10 left-1/2 flex -translate-x-1/2 flex-col items-center gap-2 text-warmgrey"
        animate={reducedMotion ? {} : { y: [0, 10, 0] }}
        transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
      >
        <span className="text-xs uppercase tracking-[0.3em]">Scroll</span>
        <span className="h-8 w-px bg-warmgrey/60" />
      </motion.div>
    </section>
  );
}
