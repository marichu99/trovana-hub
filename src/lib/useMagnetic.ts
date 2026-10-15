import { useRef, type PointerEvent } from "react";
import { useReducedMotion } from "./useReducedMotion";

export function useMagnetic<T extends HTMLElement>(strength = 0.35) {
  const ref = useRef<T>(null);
  const reducedMotion = useReducedMotion();

  const onPointerMove = (e: PointerEvent<T>) => {
    if (reducedMotion || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    ref.current.style.transform = `translate(${x * strength}px, ${y * strength}px)`;
  };

  const onPointerLeave = () => {
    if (!ref.current) return;
    ref.current.style.transform = "translate(0, 0)";
  };

  return { ref, onPointerMove, onPointerLeave };
}
