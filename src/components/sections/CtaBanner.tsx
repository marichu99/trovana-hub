import { motion } from "framer-motion";
import { useMagnetic } from "../../lib/useMagnetic";

const HEADLINE = "Have a project in mind?";

export default function CtaBanner() {
  const magnetic = useMagnetic<HTMLAnchorElement>(0.35);

  return (
    <section className="bg-gradient-to-br from-espresso to-charcoal px-5 py-32">
      <div className="mx-auto flex max-w-5xl flex-col items-center gap-10 text-center">
        <h2 className="font-display text-4xl font-semibold leading-tight tracking-tight text-stone sm:text-6xl lg:text-7xl">
          {HEADLINE.split(" ").map((word, wi) => (
            <span key={wi} className="mr-4 inline-block">
              {word.split("").map((char, ci) => (
                <motion.span
                  key={ci}
                  className="inline-block"
                  whileHover={{ y: -10, color: "#FF6A2B" }}
                  transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                >
                  {char}
                </motion.span>
              ))}
            </span>
          ))}
        </h2>

        <a
          ref={magnetic.ref}
          href="#contact"
          onPointerMove={magnetic.onPointerMove}
          onPointerLeave={magnetic.onPointerLeave}
          data-cursor="Go"
          className="rounded-full bg-ember px-10 py-5 text-base font-semibold text-charcoal transition-transform duration-300 hover:shadow-[0_0_40px_rgba(255,106,43,0.5)]"
        >
          Get in touch
        </a>
      </div>
    </section>
  );
}
