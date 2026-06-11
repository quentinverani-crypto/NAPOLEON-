"use client";

import { motion, useReducedMotion } from "motion/react";

export const WAVE_W = 320;
export const WAVE_H = 64;
const W = WAVE_W;
const H = WAVE_H;

/** Construit un tracé d'onde lisse à partir d'amplitudes — structure constante
 *  pour permettre le morphing fluide d'un état à l'autre. */
export function wavePath(amps: number[]): string {
  const mid = H / 2;
  const seg = W / (amps.length - 1);
  let d = `M0,${(mid - amps[0]).toFixed(2)}`;
  for (let i = 1; i < amps.length; i++) {
    const x0 = (i - 1) * seg;
    const x1 = i * seg;
    const cx = ((x0 + x1) / 2).toFixed(2);
    const yPrev = (mid - amps[i - 1]).toFixed(2);
    const y = (mid - amps[i]).toFixed(2);
    d += ` C${cx},${yPrev} ${cx},${y} ${x1.toFixed(2)},${y}`;
  }
  return d;
}

// Deux « respirations » distinctes, comme une phrase parlée.
export const FRAME_FLAT = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
export const FRAME_A = [0, 4, 11, 5, 14, 6, 2, 9, 16, 7, 3, 8, 2, 5, 0];
export const FRAME_B = [0, 7, 3, 13, 6, 10, 18, 4, 8, 14, 5, 11, 4, 6, 0];
export const FRAME_C = [0, 3, 9, 6, 11, 16, 5, 13, 7, 3, 12, 6, 9, 4, 0];

const PATHS = [
  wavePath(FRAME_A),
  wavePath(FRAME_B),
  wavePath(FRAME_C),
  wavePath(FRAME_A),
];

/**
 * Onde vocale dorée, fine et lente — rappel du préambule (« Le Fil d'or »).
 * Vit en continu, très subtilement. S'immobilise si reduced-motion.
 */
export function GoldWave({
  className,
  strokeWidth = 1.5,
  opacity = 1,
  glow = true,
}: {
  className?: string;
  strokeWidth?: number;
  opacity?: number;
  glow?: boolean;
}) {
  const reduce = useReducedMotion();

  return (
    <svg
      viewBox={`0 0 ${W} ${H}`}
      preserveAspectRatio="none"
      className={className}
      aria-hidden
      style={{ opacity }}
    >
      <motion.path
        d={PATHS[0]}
        fill="none"
        stroke="#DFB670"
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        animate={reduce ? undefined : { d: PATHS }}
        transition={
          reduce
            ? undefined
            : { duration: 6, repeat: Infinity, ease: "easeInOut" }
        }
        style={
          glow
            ? { filter: "drop-shadow(0 0 4px rgba(223,182,112,0.45))" }
            : undefined
        }
        vectorEffect="non-scaling-stroke"
      />
    </svg>
  );
}
