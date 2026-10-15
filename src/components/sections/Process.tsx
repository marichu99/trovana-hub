import { useRef, type ReactElement } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import { processSteps } from "../../data/process";
import RevealSection from "../RevealSection";

const ICONS: Record<string, ReactElement> = {
  discover: (
    <path d="M11 19a8 8 0 100-16 8 8 0 000 16zM21 21l-4.35-4.35" />
  ),
  design: <path d="M12 2l2.5 6.5L21 11l-6.5 2.5L12 20l-2.5-6.5L3 11l6.5-2.5L12 2z" />,
  build: (
    <path d="M14.7 6.3a1 1 0 000 1.41l1.59 1.59a1 1 0 001.41 0l3.77-3.77a6 6 0 01-7.94 7.94l-6.91 6.91a2.12 2.12 0 01-3-3l6.91-6.91a6 6 0 017.94-7.94l-3.77 3.77z" />
  ),
  launch: <path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z" />,
  grow: <path d="M3 17l5-5 4 4 8-8M15 8h5v5" />,
};

export default function Process() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start 0.7", "end 0.4"],
  });
  const scaleY = useSpring(scrollYProgress, { stiffness: 120, damping: 30 });

  return (
    <section id="process" ref={sectionRef} className="bg-espresso px-5 py-28">
      <div className="mx-auto max-w-4xl">
        <RevealSection>
          <h2 className="font-display text-4xl font-semibold tracking-tight text-stone sm:text-5xl">
            How we <span className="font-accent italic text-sunbeam">work.</span>
          </h2>
        </RevealSection>

        <div className="relative mt-16 pl-12">
          <div className="absolute left-4 top-0 h-full w-px bg-warmgrey/25" />
          <motion.div
            className="absolute left-4 top-0 w-px origin-top bg-ember"
            style={{ scaleY, height: "100%" }}
          />

          <div className="flex flex-col gap-14">
            {processSteps.map((step, i) => (
              <RevealSection key={step.id} delay={i * 0.05} className="relative">
                <span className="absolute -left-12 top-0 flex h-8 w-8 items-center justify-center rounded-full border border-ember/60 bg-espresso text-ember">
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    {ICONS[step.id]}
                  </svg>
                </span>
                <h3 className="font-display text-xl font-semibold text-stone">{step.title}</h3>
                <p className="mt-1 text-warmgrey">{step.description}</p>
              </RevealSection>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
