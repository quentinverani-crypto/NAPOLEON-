"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "motion/react";

/** Fauteuil stylisé (profil, esthétique galerie — aucun personnage humain). */
function Chair({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 124 150" className={className} aria-hidden>
      <g fill="#1A2540" stroke="#5478A8" strokeOpacity="0.35" strokeWidth="1">
        <rect x="14" y="14" width="30" height="100" rx="15" />
        <rect x="26" y="86" width="84" height="28" rx="14" />
        <rect x="40" y="60" width="74" height="17" rx="8.5" />
        <rect x="22" y="110" width="15" height="32" rx="6" />
        <rect x="98" y="110" width="15" height="32" rx="6" />
      </g>
    </svg>
  );
}

const TEXT = {
  a: "Aujourd’hui, un écran sépare.",
  b: "NAPOLEON l’efface.",
  c: "Deux personnes. Une conversation. La médecine que vous avez choisie.",
};

/** Version reduced-motion / repli : même narration, trois temps en fondu simple. */
function BasculeReduced() {
  const blocks = [
    { t: TEXT.a, sub: "Un moniteur s’interpose entre le médecin et le patient." },
    { t: TEXT.b, sub: "L’écran s’efface ; l’information reste, elle ne s’impose plus." },
    { t: TEXT.c, sub: "Face à face, plus rien entre eux." },
  ];
  return (
    <section id="bascule" className="bg-nap-ink py-24">
      <h2 className="sr-only">La bascule</h2>
      <div className="mx-auto max-w-3xl space-y-20 px-6 text-center">
        {blocks.map((b, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-20%" }}
            transition={{ duration: 0.6 }}
          >
            <p className="font-news text-[clamp(1.8rem,5vw,3rem)] font-medium leading-tight text-nap-ivory">
              {b.t}
            </p>
            <p className="mt-4 font-body text-nap-muted">{b.sub}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

export function Bascule() {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  // Lumière : froid → chaud (la base chaude se révèle par-dessus la froide).
  const warmOpacity = useTransform(scrollYProgress, [0.3, 0.72], [0, 1]);

  // Écran : s’amincit, s’élève, se fond dans le mur.
  const mScaleX = useTransform(scrollYProgress, [0.3, 0.62], [1, 0.16]);
  const mScaleY = useTransform(scrollYProgress, [0.3, 0.62], [1, 0.34]);
  const mY = useTransform(scrollYProgress, [0.3, 0.62], ["0%", "-120%"]);
  const mOpacity = useTransform(scrollYProgress, [0.46, 0.62], [1, 0]);
  const glowOpacity = useTransform(scrollYProgress, [0, 0.32, 0.58], [1, 1, 0]);
  const frameOpacity = useTransform(scrollYProgress, [0.56, 0.76], [0, 1]);

  // Fauteuils : se rapprochent.
  const leftX = useTransform(scrollYProgress, [0.62, 0.96], ["0%", "118%"]);
  const rightX = useTransform(scrollYProgress, [0.62, 0.96], ["0%", "-118%"]);

  // Rai de lumière doré à 70°, en clôture.
  const rayOpacity = useTransform(scrollYProgress, [0.74, 0.88], [0, 1]);

  // Scrim haut pour la lisibilité des textes A/B sur fond mouvant.
  const scrimOpacity = useTransform(scrollYProgress, [0, 0.62, 0.72], [0.4, 0.4, 0]);

  const tA = useTransform(scrollYProgress, [0, 0.06, 0.24, 0.3], [0, 1, 1, 0]);
  const tB = useTransform(
    scrollYProgress,
    [0.34, 0.42, 0.58, 0.64],
    [0, 1, 1, 0],
  );
  const tC = useTransform(scrollYProgress, [0.7, 0.8, 1, 1], [0, 1, 1, 1]);

  if (reduce) return <BasculeReduced />;

  return (
    <section ref={ref} id="bascule" className="relative h-[320vh] bg-nap-ink">
      <h2 className="sr-only">La bascule</h2>
      <div className="sticky top-0 h-[100svh] overflow-hidden">
        {/* Base lumineuse froide (la prison de l’écran) */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(120% 90% at 50% 60%, #243150 0%, #1A2540 70%)",
          }}
          aria-hidden
        />
        {/* Base lumineuse chaude (la consultation réhumanisée) */}
        <motion.div
          className="absolute inset-0"
          style={{
            opacity: warmOpacity,
            background:
              "radial-gradient(120% 95% at 50% 64%, #FBF6EA 0%, #F3F1EC 58%, #ECE6D8 100%)",
          }}
          aria-hidden
        />
        {/* Sol — marbre très doux */}
        <div
          className="absolute inset-x-0 bottom-0 h-[34%]"
          style={{
            background:
              "linear-gradient(to top, rgba(255,255,255,0.06), transparent)",
          }}
          aria-hidden
        />

        {/* Cadre mural discret (ce que devient l’écran) */}
        <motion.div
          style={{ opacity: frameOpacity }}
          className="absolute left-1/2 top-[15%] h-[12%] w-[16%] -translate-x-1/2 rounded-sm border border-nap-gold/40 bg-white/30"
          aria-hidden
        />

        {/* Fauteuil gauche */}
        <motion.div
          style={{ x: leftX }}
          className="absolute bottom-[20%] left-[7%] w-[clamp(96px,15vw,200px)]"
          aria-hidden
        >
          <Chair className="h-auto w-full" />
        </motion.div>
        {/* Fauteuil droit (miroir) */}
        <motion.div
          style={{ x: rightX, scaleX: -1 }}
          className="absolute bottom-[20%] right-[7%] w-[clamp(96px,15vw,200px)]"
          aria-hidden
        >
          <Chair className="h-auto w-full" />
        </motion.div>

        {/* Le moniteur sur pied, lueur froide #5478A8 */}
        <motion.div
          style={{
            x: "-50%",
            y: mY,
            scaleX: mScaleX,
            scaleY: mScaleY,
            opacity: mOpacity,
            transformOrigin: "center bottom",
          }}
          className="absolute bottom-[24%] left-1/2 flex flex-col items-center"
          aria-hidden
        >
          <motion.div
            style={{ opacity: glowOpacity }}
            className="h-[20vh] max-h-[200px] w-[26vw] max-w-[300px] rounded-md"
          >
            <div className="h-full w-full rounded-md bg-[#5478A8] shadow-[0_0_80px_24px_rgba(84,120,168,0.55)]" />
          </motion.div>
          <div className="h-[8vh] max-h-[70px] w-[3px] bg-nap-blue/60" />
          <div className="h-[6px] w-[14%] min-w-[60px] rounded-full bg-nap-blue/50" />
        </motion.div>

        {/* Rai de lumière doré à 70° */}
        <motion.div
          style={{ opacity: rayOpacity }}
          className="pointer-events-none absolute left-1/2 top-1/2 h-[160%] w-[2px] -translate-x-1/2 -translate-y-1/2 rotate-[20deg]"
          aria-hidden
        >
          <div className="h-full w-full bg-gradient-to-b from-transparent via-nap-gold/70 to-transparent shadow-[0_0_12px_rgba(223,182,112,0.6)]" />
        </motion.div>

        {/* Scrim haut */}
        <motion.div
          style={{ opacity: scrimOpacity }}
          className="pointer-events-none absolute inset-x-0 top-0 h-[46%] bg-gradient-to-b from-nap-ink/80 to-transparent"
          aria-hidden
        />

        {/* Textes synchronisés */}
        <div className="absolute inset-x-0 top-[14%] flex justify-center px-6">
          <div className="relative h-[30vh] w-full max-w-3xl text-center">
            <motion.p
              style={{ opacity: tA }}
              className="absolute inset-x-0 top-0 font-news text-[clamp(1.8rem,5vw,3.2rem)] font-medium leading-tight text-nap-ivory drop-shadow-[0_2px_12px_rgba(0,0,0,0.4)]"
            >
              {TEXT.a}
            </motion.p>
            <motion.p
              style={{ opacity: tB }}
              className="absolute inset-x-0 top-0 font-news text-[clamp(2rem,6vw,3.8rem)] font-medium leading-tight text-nap-ivory drop-shadow-[0_2px_12px_rgba(0,0,0,0.35)]"
            >
              {TEXT.b}
            </motion.p>
            <motion.p
              style={{ opacity: tC }}
              className="absolute inset-x-0 top-0 mx-auto max-w-2xl font-news text-[clamp(1.6rem,4.4vw,2.8rem)] font-medium leading-tight text-nap-ink"
            >
              {TEXT.c}
            </motion.p>
          </div>
        </div>
      </div>
    </section>
  );
}
