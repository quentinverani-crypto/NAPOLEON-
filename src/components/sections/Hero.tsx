"use client";

import { motion, useMotionValue, useTransform, useSpring } from "motion/react";
import { Button } from "@/components/ui/button";
import { useEffect } from "react";
import Image from "next/image";

const tagline = ["La", "voix", "médicale", "souveraine"];
const actions = ["Automatise", "Accélère", "Fiabilise"];

const georgia = '"Georgia", "Times New Roman", serif';

const letterVariants = {
  hidden: { opacity: 0, y: 48, filter: "blur(12px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.9, ease: [0.2, 0.8, 0.2, 1] as const },
  },
};

export function Hero() {
  const mouseY = useMotionValue(0);
  const sy = useSpring(mouseY, { stiffness: 50, damping: 22 });
  const emblemY = useTransform(sy, [-0.5, 0.5], [-10, 10]);

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      mouseY.set(e.clientY / window.innerHeight - 0.5);
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, [mouseY]);

  return (
    <section className="relative min-h-screen bg-napoleon-black overflow-hidden flex flex-col items-center justify-center isolate pt-24 pb-[10vh]">
      {/* Ambient radial glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 70% 60% at 50% 40%, rgba(31,49,72,0.10) 0%, rgba(122,138,168,0.05) 35%, transparent 70%)",
        }}
      />
      <div
        className="absolute inset-0 pointer-events-none ambient-orb"
        style={{
          background:
            "radial-gradient(circle 40% at 70% 30%, rgba(201,164,100,0.08) 0%, transparent 60%)",
        }}
      />

      {/* Grain overlay */}
      <div className="absolute inset-0 grain-overlay opacity-[0.04] pointer-events-none" />

      {/* Logo (foreground, gold, vivid) — sits above the tagline on a clean white disc */}
      <motion.div
        className="relative z-10 flex items-center justify-center"
        style={{ y: emblemY }}
        initial={{ opacity: 0, scale: 1.05 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.8, delay: 0.1, ease: [0.2, 0.8, 0.2, 1] }}
      >
        <div className="relative">
          {/* Halo blanc à center qui se fond progressivement dans le halo bleu ambient */}
          <div
            className="absolute inset-0 rounded-full pointer-events-none"
            style={{
              background:
                "radial-gradient(circle, rgba(255,255,255,0.95) 12%, rgba(254,254,254,0.85) 25%, rgba(252,253,254,0.70) 38%, rgba(248,250,253,0.52) 50%, rgba(242,246,252,0.36) 62%, rgba(234,240,250,0.22) 73%, rgba(222,231,246,0.12) 83%, rgba(210,222,242,0.05) 92%, rgba(31,49,72,0) 100%)",
              transform: "scale(2.2)",
            }}
            aria-hidden="true"
          />
          <Image
            src="/logos/napoleon-emblem-v2-gold.png"
            alt="NAPOLEON Médical"
            width={620}
            height={620}
            priority
            className="relative w-[min(38vw,360px)] h-auto select-none"
            style={{ opacity: 0.85 }}
          />
        </div>
      </motion.div>

      {/* Content directly under the logo */}
      <div className="relative z-10 mx-auto max-w-5xl px-6 text-center mt-8 lg:mt-10">
        {/* Tagline — Georgia, royal blue, no italic */}
        <motion.h1
          className="text-napoleon-royal leading-[1.05] tracking-tight"
          style={{
            fontFamily: georgia,
            fontSize: "clamp(2.25rem, 5.5vw, 4.75rem)",
          }}
          initial="hidden"
          animate="visible"
          transition={{ staggerChildren: 0.14, delayChildren: 0.4 }}
        >
          {tagline.map((word, i) => (
            <span
              key={i}
              className="inline-block overflow-hidden align-baseline"
              style={{ paddingBottom: "0.12em" }}
            >
              <motion.span
                variants={letterVariants}
                className="inline-block"
                style={{ marginRight: "0.22em" }}
              >
                {word}
              </motion.span>
            </span>
          ))}
        </motion.h1>

        {/* Three action words — gold, italic serif */}
        <motion.div
          className="mt-8 lg:mt-10 flex items-center justify-center gap-8 lg:gap-14 flex-wrap"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.35, duration: 0.6 }}
        >
          {actions.map((w, i) => (
            <motion.span
              key={w}
              className="font-serif italic text-napoleon-gold tracking-wide"
              style={{ fontSize: "clamp(1.5rem, 2.4vw, 2.2rem)" }}
              initial={{ opacity: 0, y: 18, filter: "blur(8px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{
                duration: 0.8,
                delay: 1.45 + i * 0.2,
                ease: [0.2, 0.8, 0.2, 1],
              }}
            >
              {w}
            </motion.span>
          ))}
        </motion.div>

        {/* CTA */}
        <motion.div
          className="mt-10 lg:mt-12 flex items-center justify-center"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 2.2 }}
        >
          <a href="#beta">
            <Button className="bg-napoleon-deep hover:bg-napoleon-deep/90 text-white px-9 py-6 text-base font-medium rounded-full border border-napoleon-ink/10 shadow-[0_8px_40px_rgba(31,49,72,0.32)]">
              Rejoindre la bêta
            </Button>
          </a>
        </motion.div>
      </div>

      {/* Bottom fade to next section */}
      <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-napoleon-warm to-transparent pointer-events-none" />
    </section>
  );
}
