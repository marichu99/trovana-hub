import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { useReducedMotion } from "../lib/useReducedMotion";

const WORD = "Trovana Hub";

export default function Loader({ onDone }: { onDone: () => void }) {
  const [visible, setVisible] = useState(true);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    const total = reducedMotion ? 200 : 1100;
    const t = setTimeout(() => setVisible(false), total);
    return () => clearTimeout(t);
  }, [reducedMotion]);

  return (
    <AnimatePresence onExitComplete={onDone}>
      {visible && (
        <motion.div
          className="fixed inset-0 z-[200] flex items-center justify-center bg-charcoal"
          exit={{ y: "-100%" }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="flex overflow-hidden font-display text-3xl font-semibold tracking-tight text-stone sm:text-5xl">
            {WORD.split("").map((char, i) => (
              <motion.span
                key={i}
                initial={{ y: "100%", opacity: 0 }}
                animate={{ y: "0%", opacity: 1 }}
                transition={{
                  duration: 0.5,
                  delay: reducedMotion ? 0 : i * 0.035,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className={char === " " ? "w-3" : undefined}
              >
                {char === " " ? " " : char}
              </motion.span>
            ))}
            <motion.span
              className="ml-1 text-ember"
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 1, 0] }}
              transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }}
            >
              .
            </motion.span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
