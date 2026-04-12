"use client";

import { useState } from "react";
import { Check, Shield, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { SlideUp } from "@/components/motion/SlideUp";

const TOTAL_SPOTS = 250;

const professions = [
  { value: "liberal", label: "Médecin libéral" },
  { value: "hospitalier", label: "Médecin hospitalier" },
  { value: "mixte", label: "Exercice mixte" },
  { value: "docteur-junior", label: "Docteur Junior" },
  { value: "interne", label: "Interne" },
];

const benefits = [
  "Accès prioritaire à la bêta",
  "Retour direct avec l'équipe fondatrice",
  "Participez à façonner l'outil",
];

export function BetaSignup() {
  const [formState, setFormState] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [profession, setProfession] = useState("");
  const currentSignups = 0; // Replace with real count from API

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setFormState("loading");

    const form = e.currentTarget;
    const data = {
      name: (form.elements.namedItem("name") as HTMLInputElement).value,
      email: (form.elements.namedItem("email") as HTMLInputElement).value,
      phone: (form.elements.namedItem("phone") as HTMLInputElement).value,
      profession,
    };

    try {
      const res = await fetch("/api/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error("Erreur");
      setFormState("success");
    } catch {
      setFormState("error");
    }
  }

  return (
    <section id="beta" className="relative bg-napoleon-black py-28 lg:py-36 overflow-hidden">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 60% 50% at 80% 50%, rgba(110,92,246,0.18) 0%, transparent 70%)",
        }}
      />
      <div className="absolute inset-0 grain-overlay opacity-[0.07] pointer-events-none" />
      <div className="relative mx-auto max-w-7xl px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-20 items-start">
          {/* Left - Copy */}
          <SlideUp>
            <div className="space-y-8">
              <div>
                <span className="text-napoleon-gold text-xs uppercase tracking-[0.3em] font-medium">
                  Bêta limitée
                </span>
                <h2
                  className="font-serif text-white mt-4 leading-tight tracking-tight"
                  style={{ fontSize: "clamp(2rem, 4vw, 3.5rem)" }}
                >
                  Faites partie
                  <br />
                  des premiers.
                </h2>
              </div>

              <p className="text-white/55 leading-relaxed max-w-md text-base lg:text-lg">
                Nous recherchons {TOTAL_SPOTS} médecins pionniers pour tester
                Napoléon et contribuer à construire l&apos;assistant médical de
                demain.
              </p>

              <ul className="space-y-4">
                {benefits.map((benefit) => (
                  <li key={benefit} className="flex items-start gap-3">
                    <Check
                      size={16}
                      className="text-napoleon-gold mt-0.5 shrink-0"
                    />
                    <span className="text-white/60 text-sm">{benefit}</span>
                  </li>
                ))}
              </ul>

              {/* Progress bar */}
              <div className="pt-4">
                <div className="flex justify-between text-xs mb-2">
                  <span className="text-white/40">Places restantes</span>
                  <span className="text-white/60 font-medium">
                    {currentSignups}/{TOTAL_SPOTS}
                  </span>
                </div>
                <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-napoleon-deep to-napoleon-purple rounded-full transition-all duration-1000"
                    style={{
                      width: `${Math.max((currentSignups / TOTAL_SPOTS) * 100, 2)}%`,
                    }}
                  />
                </div>
              </div>
            </div>
          </SlideUp>

          {/* Right - Form */}
          <SlideUp delay={0.15}>
            <div className="bg-white/[0.03] border border-napoleon-purple/20 rounded-2xl p-8 lg:p-10 glow-breathe">
              {formState === "success" ? (
                <div className="text-center py-12 space-y-4">
                  <div className="w-16 h-16 rounded-full bg-napoleon-deep/20 flex items-center justify-center mx-auto">
                    <Check size={28} className="text-napoleon-light" />
                  </div>
                  <h3 className="font-serif text-xl text-white">
                    Bienvenue dans l&apos;aventure.
                  </h3>
                  <p className="text-white/50 text-sm max-w-xs mx-auto">
                    Vous recevrez un email avec les prochaines étapes dès
                    l&apos;ouverture de la bêta.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="name" className="text-white/60 text-sm">
                      Nom et prénom
                    </Label>
                    <Input
                      id="name"
                      name="name"
                      required
                      placeholder="Dr. Jean Dupont"
                      className="bg-white/5 border-white/10 text-white placeholder:text-white/20 h-11 rounded-lg focus:border-napoleon-gold/50 focus:ring-napoleon-gold/20"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-white/60 text-sm">
                      Email
                    </Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      required
                      placeholder="jean.dupont@email.com"
                      className="bg-white/5 border-white/10 text-white placeholder:text-white/20 h-11 rounded-lg focus:border-napoleon-gold/50 focus:ring-napoleon-gold/20"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="phone" className="text-white/60 text-sm">
                      Téléphone
                    </Label>
                    <Input
                      id="phone"
                      name="phone"
                      type="tel"
                      placeholder="06 12 34 56 78"
                      className="bg-white/5 border-white/10 text-white placeholder:text-white/20 h-11 rounded-lg focus:border-napoleon-gold/50 focus:ring-napoleon-gold/20"
                    />
                  </div>

                  <div className="space-y-3">
                    <Label className="text-white/60 text-sm">Vous êtes :</Label>
                    <RadioGroup
                      value={profession}
                      onValueChange={setProfession}
                      className="grid grid-cols-1 gap-2"
                    >
                      {professions.map((p) => (
                        <div key={p.value} className="flex items-center gap-3">
                          <RadioGroupItem
                            value={p.value}
                            id={p.value}
                            className="border-white/20 text-napoleon-light data-[state=checked]:border-napoleon-light"
                          />
                          <Label
                            htmlFor={p.value}
                            className="text-white/50 text-sm cursor-pointer"
                          >
                            {p.label}
                          </Label>
                        </div>
                      ))}
                    </RadioGroup>
                  </div>

                  <Button
                    type="submit"
                    disabled={formState === "loading" || !profession}
                    className="w-full bg-napoleon-deep hover:bg-napoleon-deep/90 text-white h-12 text-base font-medium rounded-lg mt-2 disabled:opacity-40"
                  >
                    {formState === "loading" ? (
                      <Loader2 size={18} className="animate-spin" />
                    ) : (
                      "Rejoindre la bêta"
                    )}
                  </Button>

                  {formState === "error" && (
                    <p className="text-red-400 text-sm text-center">
                      Une erreur est survenue. Veuillez réessayer.
                    </p>
                  )}

                  <div className="flex items-center justify-center gap-2 pt-2">
                    <Shield size={12} className="text-white/30" />
                    <span className="text-white/30 text-xs">
                      Vos données sont protégées. Aucun spam.
                    </span>
                  </div>
                </form>
              )}
            </div>
          </SlideUp>
        </div>
      </div>
    </section>
  );
}
