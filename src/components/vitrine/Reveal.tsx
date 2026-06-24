"use client";

import { motion, useReducedMotion } from "motion/react";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

/**
 * Apparition signature : le contenu monte en fondu et un voile doré
 * balaie le bloc en diagonale 70° (geste impérial). Déclenché à ~15 % de
 * visibilité, une seule fois. Respecte `prefers-reduced-motion`.
 */
export function Reveal({
  children,
  className,
  delay = 0,
  blade = false,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  blade?: boolean;
}) {
  const reduce = useReducedMotion();

  if (reduce) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: "-10%" }}
        transition={{ duration: 0.5, delay }}
        className={className}
      >
        {children}
      </motion.div>
    );
  }

  return (
    <motion.div
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-12%" }}
      className={cn("relative", className)}
    >
      <motion.div
        variants={{
          hidden: { opacity: 0, y: 42, filter: "blur(6px)" },
          show: { opacity: 1, y: 0, filter: "blur(0px)" },
        }}
        transition={{ duration: 1.05, delay, ease: [0.16, 1, 0.3, 1] }}
      >
        {children}
      </motion.div>
      {blade && (
        <motion.span
          aria-hidden
          className="pointer-events-none absolute inset-y-0 -inset-x-6 z-10"
          variants={{
            hidden: { opacity: 0, x: "-28%" },
            show: { opacity: [0, 0.7, 0], x: ["-28%", "118%"] },
          }}
          transition={{ duration: 1.15, delay: delay + 0.1, ease: "easeInOut" }}
          style={{
            background:
              "linear-gradient(105deg, transparent 45%, rgba(223,182,112,0.45) 50%, transparent 55%)",
          }}
        />
      )}
    </motion.div>
  );
}
