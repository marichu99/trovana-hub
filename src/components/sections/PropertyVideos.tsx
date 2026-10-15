import { useEffect, useRef, useState, type PointerEvent as ReactPointerEvent } from "react";
import { useInView } from "framer-motion";
import RevealSection from "../RevealSection";
import { useMagnetic } from "../../lib/useMagnetic";

const STEPS = [
  { title: "Send your photos", description: "Share the listing photos you already have." },
  { title: "We animate them", description: "Our team turns stills into a cinematic short." },
  { title: "Post and get bookings", description: "Ready for Reels, TikTok and your listing." },
];

function BeforeAfterSlider() {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [position, setPosition] = useState(50);
  const dragging = useRef(false);
  const inView = useInView(containerRef, { once: false, margin: "-10% 0px -10% 0px" });

  useEffect(() => {
    const el = videoRef.current;
    if (!el) return;
    if (inView) el.play().catch(() => {});
    else el.pause();
  }, [inView]);

  const updateFromClientX = (clientX: number) => {
    const el = containerRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const pct = ((clientX - rect.left) / rect.width) * 100;
    setPosition(Math.min(100, Math.max(0, pct)));
  };

  const onPointerDown = (e: ReactPointerEvent<HTMLDivElement>) => {
    dragging.current = true;
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
    updateFromClientX(e.clientX);
  };
  const onPointerMove = (e: ReactPointerEvent<HTMLDivElement>) => {
    if (!dragging.current) return;
    updateFromClientX(e.clientX);
  };
  const onPointerUp = () => {
    dragging.current = false;
  };

  return (
    <div
      ref={containerRef}
      className="relative aspect-[4/5] w-full touch-none select-none overflow-hidden rounded-3xl border border-warmgrey/20 sm:aspect-video"
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      data-cursor="Drag"
    >
      <video
        ref={videoRef}
        src="/media/exterior-reel.mp4"
        muted
        loop
        playsInline
        preload="none"
        aria-hidden="true"
        className="absolute inset-0 h-full w-full object-cover"
      />

      <div
        className="absolute inset-0 h-full w-full overflow-hidden"
        style={{ clipPath: `inset(0 ${100 - position}% 0 0)` }}
      >
        <img
          src="/media/exterior.webp"
          alt="A-frame cabin exterior listing photo"
          loading="lazy"
          className="h-full w-full object-cover"
        />
      </div>

      <div
        className="absolute inset-y-0 w-0.5 bg-stone"
        style={{ left: `${position}%` }}
      >
        <div className="absolute left-1/2 top-1/2 flex h-10 w-10 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-ember text-charcoal shadow-lg">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M5 3L1 8L5 13M11 3L15 8L11 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
      </div>

      <span className="absolute left-4 top-4 rounded-full bg-charcoal/70 px-3 py-1 text-[10px] font-semibold uppercase tracking-wide text-stone backdrop-blur">
        Before
      </span>
      <span className="absolute right-4 top-4 rounded-full bg-charcoal/70 px-3 py-1 text-[10px] font-semibold uppercase tracking-wide text-stone backdrop-blur">
        After
      </span>
    </div>
  );
}

function PhoneMockup() {
  const ref = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const inView = useInView(ref, { once: false, margin: "-20% 0px -20% 0px" });

  useEffect(() => {
    const el = videoRef.current;
    if (!el) return;
    if (inView) el.play().catch(() => {});
    else el.pause();
  }, [inView]);

  return (
    <div
      ref={ref}
      className="mx-auto w-[220px] rounded-[2.5rem] border-4 border-espresso bg-charcoal p-2 shadow-2xl"
    >
      <div className="relative aspect-[9/19] overflow-hidden rounded-[1.8rem] bg-charcoal">
        <video
          ref={videoRef}
          src="/media/property-reel.mp4"
          muted
          loop
          playsInline
          preload="none"
          aria-hidden="true"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-charcoal/80 to-transparent px-4 pb-4 pt-10 text-center">
          <span className="text-[10px] font-semibold uppercase tracking-widest text-stone/90">
            {inView ? "Playing sample" : "Scroll to preview"}
          </span>
        </div>
        <div className="absolute left-1/2 top-2 h-1.5 w-12 -translate-x-1/2 rounded-full bg-charcoal/80" />
      </div>
    </div>
  );
}

export default function PropertyVideos() {
  const sampleMagnetic = useMagnetic<HTMLAnchorElement>(0.3);

  return (
    <section id="ai-videos" className="bg-stone px-5 py-28 text-charcoal">
      <div className="mx-auto max-w-6xl">
        <RevealSection>
          <h2 className="font-display text-4xl font-semibold tracking-tight sm:text-5xl">
            Your photos, now <span className="font-accent italic text-ember">in motion.</span>
          </h2>
        </RevealSection>

        <div className="mt-14 grid gap-12 lg:grid-cols-[1.3fr_0.7fr] lg:items-center">
          <RevealSection delay={0.1}>
            <BeforeAfterSlider />
          </RevealSection>

          <RevealSection delay={0.2}>
            <PhoneMockup />
          </RevealSection>
        </div>

        <div className="mt-20 grid gap-8 sm:grid-cols-3">
          {STEPS.map((step, i) => (
            <RevealSection key={step.title} delay={i * 0.15}>
              <div className="relative">
                <span className="font-display text-5xl font-semibold text-caramel/40">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-4 font-display text-lg font-semibold">{step.title}</h3>
                <p className="mt-2 text-sm text-charcoal/70">{step.description}</p>
              </div>
            </RevealSection>
          ))}
        </div>

        <RevealSection delay={0.1} className="mt-14 flex justify-center">
          <a
            ref={sampleMagnetic.ref}
            href="#contact"
            onPointerMove={sampleMagnetic.onPointerMove}
            onPointerLeave={sampleMagnetic.onPointerLeave}
            data-cursor="Go"
            className="rounded-full bg-charcoal px-8 py-4 text-sm font-semibold text-stone transition-transform duration-300 hover:shadow-[0_0_30px_rgba(74,51,38,0.4)]"
          >
            Get a free sample video
          </a>
        </RevealSection>
      </div>
    </section>
  );
}
