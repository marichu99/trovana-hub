import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function CustomCursor() {
  const [enabled, setEnabled] = useState(false);
  const [label, setLabel] = useState("");
  const [active, setActive] = useState(false);

  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const springX = useSpring(x, { stiffness: 400, damping: 35, mass: 0.4 });
  const springY = useSpring(y, { stiffness: 400, damping: 35, mass: 0.4 });

  useEffect(() => {
    const isTouch = window.matchMedia("(pointer: coarse)").matches;
    if (isTouch) return;

    setEnabled(true);
    document.documentElement.classList.add("has-custom-cursor");

    const onMove = (e: PointerEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);

      const target = (e.target as HTMLElement)?.closest<HTMLElement>("[data-cursor]");
      if (target) {
        setLabel(target.dataset.cursor ?? "");
        setActive(true);
      } else {
        setActive(false);
        setLabel("");
      }
    };

    window.addEventListener("pointermove", onMove);
    return () => {
      window.removeEventListener("pointermove", onMove);
      document.documentElement.classList.remove("has-custom-cursor");
    };
  }, [x, y]);

  if (!enabled) return null;

  return (
    <motion.div
      className="pointer-events-none fixed left-0 top-0 z-[100] flex items-center justify-center rounded-full bg-ember text-xs font-semibold uppercase tracking-wide text-charcoal"
      style={{
        x: springX,
        y: springY,
        translateX: "-50%",
        translateY: "-50%",
        boxShadow: active
          ? "0 0 40px 10px rgba(255,106,43,0.45)"
          : "0 0 16px 4px rgba(255,106,43,0.35)",
      }}
      animate={{
        width: active ? 72 : 10,
        height: active ? 72 : 10,
        opacity: active ? 1 : 0.9,
      }}
      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
    >
      {active && label}
    </motion.div>
  );
}
