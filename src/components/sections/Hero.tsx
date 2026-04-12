"use client";

import { motion, useMotionValue, useTransform, useSpring } from "motion/react";
import { Button } from "@/components/ui/button";
import { useEffect } from "react";
import Image from "next/image";

const tagline = ["La", "voix", "médicale", "souveraine"];
const actions = ["Automatise", "Accélère", "Fiabilise"];

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
  const emblemY = useTransform(sy, [-0.5, 0.5], [-14, 14]);

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      mouseY.set(e.clientY / window.innerHeight - 0.5);
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, [mouseY]);

  return (
    <section className="relative min-h-screen bg-napoleon-black overflow-hidden flex items-center justify-center isolate">
      {/* Ambient radial glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 70% 60% at 50% 55%, rgba(41,17,191,0.32) 0%, rgba(110,92,246,0.08) 35%, transparent 70%)",
        }}
      />
      <div
        className="absolute inset-0 pointer-events-none ambient-orb"
        style={{
          background:
            "radial-gradient(circle 40% at 70% 35%, rgba(52,176,255,0.08) 0%, transparent 60%)",
        }}
      />

      {/* Grain overlay */}
      <div className="absolute inset-0 grain-overlay opacity-[0.15] pointer-events-none mix-blend-overlay" />

      {/* Emblem watermark — smaller, pushed down, only Y parallax */}
      <motion.div
        className="absolute left-0 right-0 flex items-center justify-center pointer-events-none"
        style={{ y: emblemY, top: "18%", bottom: "8%" }}
        initial={{ opacity: 0, scale: 1.1 }}
        animate={{ opacity: 0.08, scale: 1 }}
        transition={{ duration: 2.2, delay: 0.2, ease: [0.2, 0.8, 0.2, 1] }}
      >
        <Image
          src="/logos/napoleon-embleme-negatif.png"
          alt=""
          width={620}
          height={620}
          priority
          className="w-[min(54vw,520px)] h-auto select-none"
          aria-hidden="true"
        />
      </motion.div>

      {/* Content */}
      <div className="relative z-10 mx-auto max-w-5xl px-6 text-center pt-32 pb-16">
        {/* Tagline */}
        <motion.h1
          className="font-serif text-white leading-[1.02] tracking-tight drop-shadow-[0_4px_40px_rgba(0,0,0,0.9)]"
          style={{ fontSize: "clamp(2.75rem, 7vw, 6rem)" }}
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
                className={`inline-block ${
                  word === "souveraine" ? "text-napoleon-light italic" : ""
                }`}
                style={{ marginRight: "0.22em" }}
              >
                {word}
              </motion.span>
            </span>
          ))}
        </motion.h1>

        {/* Three action words — standout */}
        <motion.div
          className="mt-12 flex items-center justify-center gap-8 lg:gap-14 flex-wrap"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.35, duration: 0.6 }}
        >
          {actions.map((w, i) => (
            <motion.span
              key={w}
              className="font-serif italic text-napoleon-gold tracking-wide"
              style={{ fontSize: "clamp(1.6rem, 2.6vw, 2.4rem)" }}
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
          className="mt-14 flex items-center justify-center"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 2.2 }}
        >
          <a href="#beta">
            <Button className="bg-napoleon-deep hover:bg-napoleon-deep/90 text-white px-9 py-6 text-base font-medium rounded-full border border-white/10 shadow-[0_0_50px_rgba(41,17,191,0.55)]">
              Rejoindre la bêta
            </Button>
          </a>
        </motion.div>
      </div>

      {/* Bottom fade to next section */}
      <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-napoleon-warm via-napoleon-black/80 to-transparent pointer-events-none" />
    </section>
  );
}
