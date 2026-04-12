"use client";

import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";

type Chapter = {
  statLine1: string;
  statLine2?: string;
  kicker: string;
  title: string;
  body: string;
};

const chapters: Chapter[] = [
  {
    statLine1: "1 à 2 heures",
    statLine2: "par jour",
    kicker: "",
    title: "Perdues en administratif",
    body:
      "Remplissage des dossiers, comptes rendus, ordonnances. Des logiciels peu ergonomiques qui volent du temps médical.",
  },
  {
    statLine1: "1 médecin",
    statLine2: "sur 2",
    kicker: "",
    title: "Présente des signes de burn-out",
    body:
      "La profession paie le prix d'une charge invisible qui ne cesse de croître. Derrière chaque consultation, une montagne de tâches qui s'accumulent.",
  },
  {
    statLine1: "53%",
    statLine2: "des médecins",
    kicker: "",
    title: "Y voient une perte de sens",
    body:
      "L'essentiel — la relation humaine, l'écoute, le regard — s'efface derrière l'écran. La médecine perd le cœur de ce qui fait sa valeur.",
  },
];

export function Problem() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Horizontal translation: 3 chapters → slide from 0% to -66.667%
  // Keep a tiny dwell at start and end so first/last chapter fully settle
  const x = useTransform(
    scrollYProgress,
    [0, 0.05, 0.95, 1],
    ["0%", "0%", "-66.667%", "-66.667%"]
  );

  // Progress bar fills across the entire scroll
  const progressWidth = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section
      id="probleme"
      ref={containerRef}
      className="relative bg-napoleon-warm"
      style={{ height: "320vh" }}
    >
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        {/* Ambient glow */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 60% 50% at 30% 50%, rgba(41,17,191,0.18) 0%, transparent 70%)",
          }}
        />
        <div className="absolute inset-0 grain-overlay opacity-[0.08] pointer-events-none" />

        {/* Top gold divider */}
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-napoleon-gold-dark/30 to-transparent" />

        {/* Section heading — stays fixed on top */}
        <div className="absolute top-0 left-0 right-0 z-20 pt-24 lg:pt-28">
          <div className="mx-auto max-w-7xl px-6">
            <motion.h2
              className="font-serif text-white leading-[1.05] tracking-tight max-w-3xl"
              style={{ fontSize: "clamp(1.75rem, 3vw, 2.75rem)" }}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.9, ease: [0.2, 0.8, 0.2, 1] }}
            >
              Les chiffres parlent{" "}
              <span className="text-napoleon-gold italic">d&apos;eux-mêmes.</span>
            </motion.h2>
          </div>
        </div>

        {/* Horizontal reel */}
        <motion.div
          className="absolute inset-0 flex"
          style={{ x, width: `${chapters.length * 100}%` }}
        >
          {chapters.map((ch, i) => (
            <div
              key={i}
              className="h-full shrink-0 flex items-center"
              style={{ width: `${100 / chapters.length}%` }}
            >
              <ChapterSlide chapter={ch} index={i} />
            </div>
          ))}
        </motion.div>

        {/* Bottom progress bar + counter */}
        <div className="absolute bottom-10 lg:bottom-14 left-0 right-0 z-20 px-6">
          <div className="mx-auto max-w-7xl flex items-center gap-6">
            <span className="text-napoleon-gold text-[11px] uppercase tracking-[0.3em] font-medium shrink-0">
              Constat
            </span>
            <div className="relative flex-1 h-px bg-white/10">
              <motion.div
                className="absolute inset-y-0 left-0 bg-napoleon-gold"
                style={{ width: progressWidth }}
              />
            </div>
            <ChapterCounter scrollYProgress={scrollYProgress} />
          </div>
        </div>
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-b from-transparent to-napoleon-warm-deep pointer-events-none" />
    </section>
  );
}

function ChapterCounter({
  scrollYProgress,
}: {
  scrollYProgress: ReturnType<typeof useScroll>["scrollYProgress"];
}) {
  const count = useTransform(scrollYProgress, (v) => {
    const idx = Math.min(chapters.length - 1, Math.floor(v * chapters.length));
    return `0${idx + 1} / 0${chapters.length}`;
  });
  return (
    <motion.span className="text-white/50 text-xs tracking-[0.2em] font-mono shrink-0">
      {count}
    </motion.span>
  );
}

function ChapterSlide({ chapter, index }: { chapter: Chapter; index: number }) {
  return (
    <div className="w-full px-6 lg:px-20">
      <div className="mx-auto max-w-6xl grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
        {/* Big stat */}
        <div className="lg:col-span-7">
          <div
            className="font-serif text-white leading-[0.95] tracking-tight"
            style={{ fontSize: "clamp(3.5rem, 9vw, 9rem)" }}
          >
            {chapter.statLine1}
          </div>
          {chapter.statLine2 && (
            <div
              className="font-serif text-napoleon-light italic leading-[0.95] tracking-tight mt-1"
              style={{ fontSize: "clamp(3rem, 7.5vw, 7.5rem)" }}
            >
              {chapter.statLine2}
            </div>
          )}
          {chapter.kicker && (
            <p className="text-white/50 text-sm lg:text-base mt-5 tracking-wide max-w-md">
              {chapter.kicker}
            </p>
          )}
        </div>

        {/* Body */}
        <div className="lg:col-span-5 lg:pl-6">
          <div className="flex items-center gap-3 mb-5">
            <span className="text-napoleon-gold/70 text-[11px] uppercase tracking-[0.3em] font-mono">
              0{index + 1}
            </span>
            <div className="h-px w-10 bg-napoleon-gold-dark" />
          </div>
          <h3
            className="font-serif text-white leading-tight tracking-tight mb-5"
            style={{ fontSize: "clamp(1.5rem, 2.6vw, 2.25rem)" }}
          >
            {chapter.title}
          </h3>
          <p className="text-white/55 text-base leading-relaxed max-w-md">
            {chapter.body}
          </p>
        </div>
      </div>
    </div>
  );
}
