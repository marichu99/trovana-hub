import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useReducedMotion } from "../../lib/useReducedMotion";

gsap.registerPlugin(ScrollTrigger);

const ITEMS = [
  "WEB DEVELOPMENT",
  "PAID ADS",
  "AI PROPERTY VIDEOS",
  "SEO",
  "BRAND SYSTEMS",
  "LANDING PAGES",
];

function Row({ reverse }: { reverse: boolean }) {
  return (
    <div
      className="marquee-row flex w-max shrink-0 items-center gap-8 pr-8"
      style={{
        animationDirection: reverse ? "reverse" : "normal",
      }}
    >
      {[...ITEMS, ...ITEMS].map((item, i) => (
        <span
          key={i}
          className="font-display text-4xl font-semibold tracking-tight text-stone/90 sm:text-5xl"
        >
          {item} <span className="text-ember">•</span>
        </span>
      ))}
    </div>
  );
}

export default function Marquee() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    if (reducedMotion || !sectionRef.current) return;
    const rows = sectionRef.current.querySelectorAll<HTMLElement>(".marquee-row");

    const st = ScrollTrigger.create({
      trigger: sectionRef.current,
      start: "top bottom",
      end: "bottom top",
      onUpdate: (self) => {
        const velocity = Math.min(Math.abs(self.getVelocity()) / 1000, 6);
        const speed = 18 - velocity * 2.2;
        rows.forEach((row) => {
          row.style.animationDuration = `${Math.max(speed, 6)}s`;
        });
      },
    });

    return () => st.kill();
  }, [reducedMotion]);

  return (
    <section ref={sectionRef} className="overflow-hidden border-y border-warmgrey/15 bg-charcoal py-10">
      <div className="flex overflow-hidden">
        <Row reverse={false} />
      </div>
      <div className="mt-4 flex overflow-hidden">
        <Row reverse={true} />
      </div>
    </section>
  );
}
