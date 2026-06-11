"use client";

import { useRef, useEffect, useState } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useInView,
  useReducedMotion,
} from "motion/react";
import { Eyebrow } from "./ui";

/** Compteur animé (800 ms) à l'apparition. */
function CountUp({ to, suffix = "" }: { to: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-20%" });
  const reduce = useReducedMotion();
  const [val, setVal] = useState(0);
  const display = reduce ? to : val;

  useEffect(() => {
    if (!inView || reduce) return;
    let raf = 0;
    const start = performance.now();
    const dur = 800;
    const tick = (t: number) => {
      const p = Math.min(1, (t - start) / dur);
      setVal(Math.round(p * to));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, to, reduce]);

  return (
    <span ref={ref}>
      {display}
      {suffix}
    </span>
  );
}

const STATS = [
  {
    figure: <>1&nbsp;à&nbsp;2&nbsp;h</>,
    legend: "perdues chaque jour en documentation",
  },
  {
    figure: <>1 médecin sur 2</>,
    legend: "présente des signes de burn-out",
  },
  {
    figure: (
      <>
        <CountUp to={53} suffix=" %" />
      </>
    ),
    legend:
      "des médecins déclarent écouter moins attentivement leurs patients depuis la digitalisation du secteur",
  },
];

export function Constat() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  // Le fond se refroidit : Canvas → Bleu Nuit (l'écran-prison se referme).
  const bg = useTransform(
    scrollYProgress,
    [0, 0.4, 1],
    ["#FAFBFC", "#FAFBFC", "#1A2540"],
  );
  const titleColor = useTransform(
    scrollYProgress,
    [0, 0.42, 0.62],
    ["#1A2540", "#1A2540", "#F3F1EC"],
  );
  const bodyColor = useTransform(
    scrollYProgress,
    [0, 0.42, 0.62],
    ["#4A5670", "#4A5670", "#9AA0AB"],
  );

  return (
    <section ref={ref} id="constat" className="relative">
      <motion.div
        style={{ backgroundColor: bg }}
        className="absolute inset-0"
        aria-hidden
      />

      <div className="relative mx-auto max-w-5xl px-5 pb-[18vh] pt-[16vh] sm:px-8">
        {/* Constat — intro */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-12%" }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <Eyebrow tone="terracotta">N° 02 · Le constat</Eyebrow>
          <motion.h2
            style={{ color: titleColor }}
            className="mt-6 max-w-3xl font-news font-medium leading-[1.08] text-[clamp(2rem,5.5vw,3.6rem)]"
          >
            Quatorze ans d&apos;études.
            <br />
            Pour regarder un écran.
          </motion.h2>
          <motion.p
            style={{ color: bodyColor }}
            className="mt-7 max-w-2xl font-body text-lg leading-relaxed"
          >
            La surcharge administrative et des logiciels peu ergonomiques ont
            transformé la relation médecin–patient. Le médecin documente,
            l&apos;écran s&apos;interpose, l&apos;écoute s&apos;érode.
          </motion.p>
        </motion.div>

        {/* Trois chiffres, révélés un à un — composition décalée, façon
            relevés d'un document officiel */}
        <div className="mt-[14vh] space-y-[12vh]">
          {STATS.map((s, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 36 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-18%" }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className={i % 2 === 1 ? "ml-auto max-w-3xl" : "max-w-3xl"}
            >
              <div className="flex items-baseline gap-5">
                <span className="font-news text-sm tabular-nums tracking-[0.3em] text-nap-gold/70">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="nap-hairline-gold h-px w-16" aria-hidden />
              </div>
              <p className="mt-5 font-news font-medium leading-none text-nap-gold text-[clamp(3rem,11vw,7rem)]">
                {s.figure}
              </p>
              <p className="mt-4 max-w-xl font-body text-base text-nap-ivory/75 sm:text-lg">
                {s.legend}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
