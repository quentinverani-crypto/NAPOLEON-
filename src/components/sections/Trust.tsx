"use client";

import { Stethoscope, ShieldCheck, MapPin, Clock } from "lucide-react";
import { FadeIn } from "@/components/motion/FadeIn";

const signals = [
  {
    icon: Stethoscope,
    label: "Conçu par un médecin",
    sublabel: "Pour des médecins",
  },
  {
    icon: ShieldCheck,
    label: "Conforme RGPD & HDS",
    sublabel: "Sécurité certifiée",
  },
  {
    icon: MapPin,
    label: "Hébergé en France",
    sublabel: "Souveraineté des données",
  },
  {
    icon: Clock,
    label: "Aucun engagement",
    sublabel: "Bêta gratuite",
  },
];

export function Trust() {
  return (
    <section className="relative bg-napoleon-warm py-24 lg:py-28 overflow-hidden">
      <div className="absolute inset-0 grain-overlay opacity-[0.06] pointer-events-none" />

      <div className="relative mx-auto max-w-7xl px-6">
        <div className="h-px bg-gradient-to-r from-transparent via-napoleon-gold-dark/35 to-transparent mb-16" />

        <FadeIn>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8">
            {signals.map((signal) => (
              <div key={signal.label} className="text-center lg:text-left">
                <signal.icon
                  size={30}
                  className="text-napoleon-gold mx-auto lg:mx-0 mb-5"
                  strokeWidth={1.4}
                />
                <p className="text-white font-medium text-sm lg:text-base tracking-wide">
                  {signal.label}
                </p>
                <p className="text-white/40 text-xs mt-1.5">{signal.sublabel}</p>
              </div>
            ))}
          </div>
        </FadeIn>

        <div className="h-px bg-gradient-to-r from-transparent via-napoleon-gold-dark/35 to-transparent mt-16" />
      </div>
    </section>
  );
}
