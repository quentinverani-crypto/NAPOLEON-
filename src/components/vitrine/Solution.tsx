"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { Eyebrow } from "./ui";
import { Reveal } from "./Reveal";

const STEPS = [
  {
    n: "01",
    title: "L’écoute",
    body: "La consultation se déroule naturellement. NAPOLEON écoute, en arrière-plan.",
  },
  {
    n: "02",
    title: "La transcription",
    body: "La voix devient texte, par un moteur de transcription français.",
  },
  {
    n: "03",
    title: "La rédaction",
    body: "Une IA française structure l’information médicale et rédige : compte-rendu, ordonnances, courrier d’adressage, documents patient.",
  },
  {
    n: "04",
    title: "La validation",
    body: "Rien ne part sans vous. Chaque document est relu et validé par le médecin. Un outil au service du médecin, jamais l’inverse.",
  },
];

export function Solution() {
  const stepsRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: stepsRef,
    offset: ["start 75%", "end 70%"],
  });
  // Le fil doré se dessine au scroll (l'onde du préambule traverse les étapes).
  const threadScale = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <section id="solution" className="relative bg-nap-canvas py-28 sm:py-36">
      <div className="mx-auto max-w-5xl px-5 sm:px-8">
        {/* Phrase pont, au sortir de la Bascule */}
        <Reveal>
          <p className="mx-auto max-w-3xl text-center font-news font-medium leading-tight text-nap-ink text-[clamp(2rem,6vw,4rem)]">
            Plus d’une heure rendue, chaque jour.
          </p>
        </Reveal>

        <div className="mt-28 text-center">
          <Reveal>
            <Eyebrow tone="terracotta">N° 04 · La solution</Eyebrow>
          </Reveal>
          <Reveal delay={0.1} blade>
            <h2 className="mx-auto mt-6 max-w-3xl font-news font-medium leading-[1.08] text-nap-ink text-[clamp(2rem,5.5vw,3.4rem)]">
              Vous consultez. Il écrit. Vous validez.
            </h2>
          </Reveal>
        </div>

        {/* Étapes reliées par un fil doré continu */}
        <div ref={stepsRef} className="relative mx-auto mt-20 max-w-3xl">
          {/* Rail du fil doré */}
          <div
            className="absolute left-[27px] top-3 bottom-3 w-px bg-nap-border sm:left-[31px]"
            aria-hidden
          />
          <motion.div
            style={{ scaleY: threadScale }}
            className="absolute left-[27px] top-3 bottom-3 w-px origin-top bg-gradient-to-b from-nap-gold via-nap-gold to-nap-gold/40 sm:left-[31px]"
            aria-hidden
          />

          <ol className="space-y-5">
            {STEPS.map((s, i) => (
              <motion.li
                key={s.n}
                initial={{ opacity: 0, y: 22 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-15%" }}
                transition={{ duration: 0.6, delay: i * 0.05, ease: [0.22, 1, 0.36, 1] }}
                className="relative flex gap-5 sm:gap-7"
              >
                <div className="relative z-10 flex h-14 w-14 flex-none items-center justify-center rounded-full border border-nap-border bg-nap-paper sm:h-16 sm:w-16">
                  <span className="font-news text-lg text-nap-gold sm:text-xl">
                    {s.n}
                  </span>
                </div>
                <div className="flex-1 rounded-2xl border border-nap-border bg-nap-paper px-6 py-5 shadow-[0_18px_40px_-28px_rgba(26,37,64,0.35)] sm:px-8 sm:py-6">
                  <h3 className="font-news text-xl text-nap-ink sm:text-2xl">
                    {s.title}
                  </h3>
                  <p className="mt-2 font-body leading-relaxed text-nap-inksoft">
                    {s.body}
                  </p>
                </div>
              </motion.li>
            ))}
          </ol>
        </div>

        {/* Réassurance */}
        <Reveal>
          <p className="mx-auto mt-14 max-w-2xl text-center font-body text-nap-inksoft">
            3 à 5 minutes gagnées par consultation. Aucun changement dans votre
            pratique : l’interface s’ajuste à vous — jamais l’inverse.
          </p>
        </Reveal>

        {/* Clôture */}
        <Reveal>
          <p className="mx-auto mt-20 max-w-3xl text-center font-news font-medium leading-snug text-nap-ink text-[clamp(1.5rem,4vw,2.4rem)]">
            NAPOLEON n’automatise pas pour remplacer.{" "}
            <span className="italic text-nap-terracotta-deep">
              Il automatise pour libérer.
            </span>
          </p>
        </Reveal>
      </div>
    </section>
  );
}
