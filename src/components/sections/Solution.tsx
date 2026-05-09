"use client";

import { Layers, ShieldCheck, Sparkles } from "lucide-react";
import {
  StaggerChildren,
  StaggerItem,
} from "@/components/motion/StaggerChildren";
import { SlideUp } from "@/components/motion/SlideUp";

const cards = [
  {
    icon: Layers,
    iconColor: "text-napoleon-deep",
    iconBg: "bg-gradient-to-br from-napoleon-deep/15 to-napoleon-light/10",
    hoverBorder: "hover:border-napoleon-deep/30",
    title: "Simplicité & modularité",
    body:
      "Conçus pour être simple, intuitive et adaptative. Une interface qui s'ajuste à votre pratique — pas l'inverse.",
  },
  {
    icon: ShieldCheck,
    iconColor: "text-napoleon-deep",
    iconBg: "bg-gradient-to-br from-napoleon-deep/15 to-napoleon-light/10",
    hoverBorder: "hover:border-napoleon-deep/30",
    title: "Souveraineté",
    body:
      "IA française, hébergée en France. Respect des normes réglementaires les plus strictes.",
  },
  {
    icon: Sparkles,
    iconColor: "text-napoleon-gold-dark",
    iconBg: "bg-gradient-to-br from-napoleon-gold/20 to-napoleon-gold-dark/10",
    hoverBorder: "hover:border-napoleon-gold/35",
    title: "Liberté",
    body:
      "En automatisant les tâches chronophages, Napoléon libère du temps médical et redonne de la sérénité au quotidien.",
  },
];

export function Solution() {
  return (
    <section
      id="solution"
      className="relative bg-napoleon-warm-deep py-28 lg:py-40 overflow-hidden"
    >
      {/* Ambient */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 80% 50% at 80% 30%, rgba(58,90,156,0.05) 0%, transparent 60%)",
        }}
      />
      <div className="absolute inset-0 grain-overlay opacity-[0.03] pointer-events-none" />

      <div className="relative mx-auto max-w-7xl px-6">
        <SlideUp>
          <h2
            className="font-serif text-napoleon-ink max-w-3xl leading-[1.05] tracking-tight"
            style={{ fontSize: "clamp(2.25rem, 5vw, 4.25rem)" }}
          >
            Simplifier. Protéger.{" "}
            <span className="text-napoleon-light italic">Libérer.</span>
          </h2>
        </SlideUp>

        <SlideUp delay={0.15}>
          <p className="mt-8 text-napoleon-ink/55 text-base lg:text-lg max-w-xl leading-relaxed">
            Une plateforme française, souveraine et pensée par des médecins —
            pour replacer la médecine au cœur de la consultation.
          </p>
        </SlideUp>

        <StaggerChildren className="mt-20 grid grid-cols-1 lg:grid-cols-3 gap-5">
          {cards.map((card) => (
            <StaggerItem key={card.title}>
              <div
                className={`h-full bg-napoleon-ink/[0.03] border border-napoleon-ink/[0.08] rounded-3xl p-8 lg:p-10 group ${card.hoverBorder} hover:bg-napoleon-ink/[0.05] transition-all duration-700 relative overflow-hidden`}
              >
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
                  style={{
                    background:
                      "radial-gradient(circle at 30% 20%, rgba(58,90,156,0.05) 0%, transparent 60%)",
                  }}
                />
                <div className="relative">
                  <div
                    className={`w-14 h-14 rounded-2xl ${card.iconBg} border border-napoleon-ink/10 flex items-center justify-center mb-8`}
                  >
                    <card.icon
                      size={24}
                      className={card.iconColor}
                      strokeWidth={1.5}
                    />
                  </div>
                  <h3
                    className="font-serif text-napoleon-ink mb-4 leading-tight"
                    style={{ fontSize: "clamp(1.5rem, 2.2vw, 2rem)" }}
                  >
                    {card.title}
                  </h3>
                  <p className="text-napoleon-ink/55 leading-relaxed text-base">
                    {card.body}
                  </p>
                </div>
              </div>
            </StaggerItem>
          ))}
        </StaggerChildren>
      </div>
    </section>
  );
}
