"use client";

import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import Image from "next/image";
import { ChipEmblem, DocumentEmblem } from "@/components/brand/StepEmblems";

type Step = {
  title: string;
  description: string;
  render: () => React.ReactNode;
};

const steps: Step[] = [
  {
    render: () => (
      <Image
        src="/logos/napoleon-mic-emblem.png"
        alt=""
        width={96}
        height={96}
        className="w-[96px] h-[96px] object-contain"
        aria-hidden="true"
      />
    ),
    title: "Écoute active",
    description:
      "Parlez. Consultez. Examinez.\nNAPOLÉON Médical se charge du reste.",
  },
  {
    render: () => <ChipEmblem className="w-[72px] h-[72px]" />,
    title: "Analyse IA",
    description:
      "La parole est analysée, structurée et transformée en données médicales exploitables.",
  },
  {
    render: () => <DocumentEmblem className="w-[72px] h-[72px]" />,
    title: "Documents générés",
    description:
      "Dossier médical, comptes rendus, ordonnances — tout est généré automatiquement.",
  },
];

export function HowItWorks() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    // Progress reaches 1 earlier so the bar fills before leaving viewport
    offset: ["start 80%", "end 85%"],
  });
  const lineProgress = useTransform(scrollYProgress, [0, 0.9], [0, 1]);

  return (
    <section
      id="fonctionnement"
      ref={containerRef}
      className="relative bg-napoleon-black py-28 lg:py-40 overflow-hidden"
    >
      {/* Ambient */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 70% 60% at 50% 50%, rgba(41,17,191,0.16) 0%, transparent 70%)",
        }}
      />
      <div className="absolute inset-0 grain-overlay opacity-[0.08] pointer-events-none" />

      <div className="relative mx-auto max-w-7xl px-6">
        <div className="max-w-3xl">
          <motion.h2
            className="font-serif text-white leading-[1.05] tracking-tight"
            style={{ fontSize: "clamp(2.25rem, 5vw, 4.25rem)" }}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.9, ease: [0.2, 0.8, 0.2, 1] }}
          >
            De la parole
            <br />
            <span className="text-napoleon-light italic">aux documents.</span>
          </motion.h2>
          <motion.p
            className="mt-8 text-white/55 text-base lg:text-lg max-w-xl leading-relaxed"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.15 }}
          >
            Moins d&apos;administratif. Plus rapide. Sans rien changer.
            <br />
            Du début à la fin, sans effort.
          </motion.p>
        </div>

        {/* Timeline */}
        <div className="mt-24 relative">
          {/* Desktop: horizontal line */}
          <div className="hidden lg:block absolute top-[40px] left-[12%] right-[12%] h-px bg-white/10">
            <motion.div
              className="h-full bg-gradient-to-r from-napoleon-deep via-napoleon-light to-napoleon-gold origin-left"
              style={{ scaleX: lineProgress }}
            />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-16 lg:gap-8 relative">
            {steps.map((step, i) => (
              <motion.div
                key={step.title}
                className="relative flex flex-col items-center text-center lg:px-6"
                initial={{ opacity: 0, y: 40, filter: "blur(10px)" }}
                whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{
                  duration: 0.9,
                  delay: 0.15 + i * 0.2,
                  ease: [0.2, 0.8, 0.2, 1],
                }}
              >
                {/* Branded emblem badge */}
                <div className="relative z-10 flex items-center justify-center">
                  <div className="absolute inset-0 -m-3 rounded-full bg-napoleon-deep/20 blur-2xl" />
                  <div className="relative">{step.render()}</div>
                </div>

                <h3 className="font-serif text-white text-2xl lg:text-3xl mt-8 mb-4 tracking-tight">
                  {step.title}
                </h3>
                <p className="text-white/55 leading-relaxed max-w-xs text-[15px] whitespace-pre-line">
                  {step.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Highlight stat */}
        <motion.div
          className="mt-28 flex justify-center"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.9, delay: 0.2 }}
        >
          <div className="relative inline-flex items-baseline gap-5 px-10 py-7 rounded-full border border-napoleon-gold/25 bg-napoleon-gold/[0.04] backdrop-blur-sm">
            <span
              className="font-serif text-napoleon-gold leading-none"
              style={{ fontSize: "clamp(1.75rem, 3vw, 2.75rem)" }}
            >
              3 à 5 min
            </span>
            <span className="text-white/55 text-sm lg:text-base">
              gagnées par consultation
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
