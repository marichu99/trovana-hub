import { useState, type MouseEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { services } from "../../data/services";
import RevealSection from "../RevealSection";
import { useReducedMotion } from "../../lib/useReducedMotion";

function ServiceCard({ service }: { service: (typeof services)[number] }) {
  const [open, setOpen] = useState(false);
  const [tilt, setTilt] = useState({ rx: 0, ry: 0, mx: 50, my: 50 });
  const reducedMotion = useReducedMotion();

  const onMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (reducedMotion) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width;
    const py = (e.clientY - rect.top) / rect.height;
    setTilt({
      rx: (0.5 - py) * 10,
      ry: (px - 0.5) * 10,
      mx: px * 100,
      my: py * 100,
    });
  };

  const onMouseLeave = () => setTilt({ rx: 0, ry: 0, mx: 50, my: 50 });

  return (
    <motion.div
      layout
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      onClick={() => setOpen((v) => !v)}
      data-cursor={open ? "Close" : "Open"}
      className="group relative cursor-pointer overflow-hidden rounded-3xl border border-warmgrey/20 bg-espresso/40 p-8"
      style={{
        transform: `perspective(900px) rotateX(${tilt.rx}deg) rotateY(${tilt.ry}deg)`,
        transition: "transform 0.3s cubic-bezier(0.22,1,0.36,1)",
      }}
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{
          background: `radial-gradient(400px circle at ${tilt.mx}% ${tilt.my}%, rgba(255,106,43,0.18), transparent 70%)`,
        }}
      />

      <div className="relative z-10">
        <div className="flex items-start justify-between">
          <span className="font-display text-sm text-warmgrey">{service.index}</span>
          {service.badge && (
            <span className="rounded-full bg-ember px-3 py-1 text-xs font-bold uppercase tracking-wide text-charcoal">
              {service.badge}
            </span>
          )}
        </div>

        <h3 className="mt-6 font-display text-2xl font-semibold text-stone sm:text-3xl">
          {service.title}
        </h3>
        <p className="mt-3 text-warmgrey">{service.summary}</p>

        <AnimatePresence initial={false}>
          {open && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="overflow-hidden"
            >
              <ul className="mt-6 space-y-2 border-t border-warmgrey/20 pt-6">
                {service.bullets.map((b) => (
                  <li key={b} className="flex items-center gap-2 text-sm text-stone/90">
                    <span className="h-1 w-1 rounded-full bg-ember" />
                    {b}
                  </li>
                ))}
              </ul>
              <a
                href="#contact"
                data-cursor="Go"
                onClick={(e) => e.stopPropagation()}
                className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-ember"
              >
                Get started →
              </a>
            </motion.div>
          )}
        </AnimatePresence>

        {!open && (
          <span className="mt-6 inline-block text-sm font-medium text-warmgrey/70">
            Tap to explore →
          </span>
        )}
      </div>
    </motion.div>
  );
}

export default function Services() {
  return (
    <section id="services" className="bg-charcoal px-5 py-28">
      <div className="mx-auto max-w-6xl">
        <RevealSection>
          <h2 className="font-display text-4xl font-semibold tracking-tight text-stone sm:text-5xl">
            Three disciplines.{" "}
            <span className="font-accent italic text-caramel">Fully integrated.</span>
          </h2>
        </RevealSection>

        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {services.map((service, i) => (
            <RevealSection key={service.id} delay={i * 0.1}>
              <ServiceCard service={service} />
            </RevealSection>
          ))}
        </div>
      </div>
    </section>
  );
}
