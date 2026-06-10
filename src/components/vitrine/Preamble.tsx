"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { motion, AnimatePresence, useReducedMotion } from "motion/react";
import { GoldWave } from "./GoldWave";

const ORDER = ["line", "wave", "blade", "open", "reveal", "done"] as const;
type Stage = (typeof ORDER)[number];

const SESSION_KEY = "nap_vitrine_preamble";

const WORD = "NAPOLEON Médical";

/**
 * Préambule « Le Fil d'or » (≤ 5 s, skippable, une fois par session).
 * Sur fond Bleu Nuit : une ligne d'or s'étire, vibre comme une onde vocale,
 * se fige en lame diagonale 70° qui ouvre l'écran sur l'ivoire, d'où surgit
 * le wordmark. Tout input saute à l'état final. Reduced-motion : fondu simple.
 */
export function Preamble({ onDone }: { onDone: () => void }) {
  const reduce = useReducedMotion();
  const [active, setActive] = useState(true);
  const [stage, setStage] = useState<Stage>("line");
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);
  const finished = useRef(false);

  const idx = ORDER.indexOf(stage);
  const past = (s: Stage) => idx >= ORDER.indexOf(s);

  const finish = useCallback(() => {
    if (finished.current) return;
    finished.current = true;
    timers.current.forEach(clearTimeout);
    try {
      sessionStorage.setItem(SESSION_KEY, "1");
    } catch {}
    setActive(false);
    onDone();
  }, [onDone]);

  // Saut immédiat à l'état final (scroll, clic, touche, tactile).
  const skip = useCallback(() => finish(), [finish]);

  useEffect(() => {
    let seen = false;
    try {
      seen = sessionStorage.getItem(SESSION_KEY) === "1";
    } catch {}

    if (seen || reduce) {
      // Déjà vu cette session, ou mouvement réduit → fondu court vers le Hero.
      const t = setTimeout(finish, reduce && !seen ? 500 : 0);
      timers.current.push(t);
      return () => clearTimeout(t);
    }

    const timersList = timers.current;
    const schedule: [number, Stage][] = [
      [500, "wave"],
      [2000, "blade"],
      [2700, "open"],
      [3400, "reveal"],
      [4500, "done"],
    ];
    schedule.forEach(([ms, s]) => {
      timersList.push(
        setTimeout(() => (s === "done" ? finish() : setStage(s)), ms),
      );
    });

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape" || e.key === " " || e.key === "Enter") skip();
    };
    window.addEventListener("wheel", skip, { passive: true });
    window.addEventListener("touchstart", skip, { passive: true });
    window.addEventListener("keydown", onKey);

    return () => {
      timersList.forEach(clearTimeout);
      window.removeEventListener("wheel", skip);
      window.removeEventListener("touchstart", skip);
      window.removeEventListener("keydown", onKey);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const panelsOpen = past("open");

  return (
    <AnimatePresence>
      {active && (
        <motion.div
          key="preamble"
          className="fixed inset-0 z-[200] overflow-hidden bg-nap-ivory"
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          onClick={skip}
          role="presentation"
        >
          {/* Pan gauche (Bleu Nuit) — coulisse vers le haut-gauche à l'ouverture */}
          <motion.div
            className="absolute inset-0 bg-nap-ink"
            style={{ clipPath: "polygon(0 0, 62% 0, 38% 100%, 0 100%)" }}
            animate={
              panelsOpen ? { x: "-58%", y: "-18%" } : { x: 0, y: 0 }
            }
            transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1] }}
          />
          {/* Pan droit (Bleu Nuit) — coulisse vers le bas-droite */}
          <motion.div
            className="absolute inset-0 bg-nap-ink"
            style={{ clipPath: "polygon(62% 0, 100% 0, 100% 100%, 38% 100%)" }}
            animate={
              panelsOpen ? { x: "58%", y: "18%" } : { x: 0, y: 0 }
            }
            transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1] }}
          />

          {/* Ligne / onde dorée, centrée, visible tant que l'écran est fermé */}
          <AnimatePresence>
            {!panelsOpen && (
              <motion.div
                key="thread"
                className="absolute inset-0 flex items-center justify-center"
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4 }}
              >
                {stage === "line" ? (
                  <motion.div
                    className="h-px nap-hairline-gold"
                    initial={{ width: 0, opacity: 0 }}
                    animate={{ width: "40vw", opacity: 1 }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                    style={{
                      filter: "drop-shadow(0 0 6px rgba(223,182,112,0.5))",
                    }}
                  />
                ) : (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: stage === "blade" ? 0 : 1 }}
                    transition={{ duration: 0.5 }}
                    className="w-[44vw] max-w-[560px]"
                  >
                    <GoldWave className="h-16 w-full" strokeWidth={1.6} />
                  </motion.div>
                )}
              </motion.div>
            )}
          </AnimatePresence>

          {/* La lame : ligne d'or diagonale 70° le long de l'entaille */}
          <svg
            className="absolute inset-0 h-full w-full"
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
            aria-hidden
          >
            <motion.line
              x1="62"
              y1="0"
              x2="38"
              y2="100"
              stroke="#DFB670"
              strokeWidth="0.25"
              vectorEffect="non-scaling-stroke"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{
                pathLength: past("blade") ? 1 : 0,
                opacity: past("blade") && !panelsOpen ? 1 : 0,
              }}
              transition={{ duration: 0.6, ease: "easeInOut" }}
              style={{ filter: "drop-shadow(0 0 5px rgba(223,182,112,0.7))" }}
            />
          </svg>

          {/* Wordmark révélé sur l'ivoire */}
          <AnimatePresence>
            {past("reveal") && (
              <motion.div
                key="wordmark"
                className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.4 }}
              >
                <motion.div
                  aria-label={WORD}
                  className="font-news text-nap-ink text-[clamp(2.2rem,7vw,4.5rem)] font-medium leading-none"
                  initial="hidden"
                  animate="show"
                  transition={{ staggerChildren: 0.03, delayChildren: 0.1 }}
                >
                  {WORD.split("").map((ch, i) => (
                    <motion.span
                      key={i}
                      aria-hidden
                      className="inline-block"
                      variants={{
                        hidden: { opacity: 0, y: 8, filter: "blur(4px)" },
                        show: { opacity: 1, y: 0, filter: "blur(0px)" },
                      }}
                      transition={{ duration: 0.4, ease: "easeOut" }}
                    >
                      {ch === " " ? " " : ch}
                    </motion.span>
                  ))}
                </motion.div>
                <motion.p
                  className="nap-eyebrow mt-5 text-nap-gold"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.6, duration: 0.4 }}
                >
                  — La voix médicale souveraine —
                </motion.p>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Indice « passer » discret */}
          {!panelsOpen && (
            <motion.button
              type="button"
              onClick={skip}
              className="absolute bottom-6 right-6 z-10 nap-eyebrow text-nap-ivory/40 hover:text-nap-ivory/80 transition-colors"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
            >
              Passer
            </motion.button>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
