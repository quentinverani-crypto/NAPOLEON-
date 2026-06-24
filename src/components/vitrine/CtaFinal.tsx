"use client";

import { useState, type FormEvent } from "react";
import Image from "next/image";
import { motion } from "motion/react";
import { Reveal } from "./Reveal";

const PROFILES = [
  "Médecin libéral",
  "Médecin hospitalier",
  "Exercice mixte",
  "Interne · Docteur junior",
  "Établissement de santé",
  "Investisseur",
  "Autre",
];

type Status = "idle" | "loading" | "success" | "error";

export function CtaFinal() {
  const [status, setStatus] = useState<Status>("idle");

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);

    // Honeypot anti-spam : champ invisible qui doit rester vide.
    if ((data.get("company") as string)?.trim()) {
      setStatus("success");
      form.reset();
      return;
    }

    const payload = {
      name: (data.get("name") as string)?.trim(),
      email: (data.get("email") as string)?.trim(),
      profile: data.get("profile") as string,
      message: (data.get("message") as string)?.trim(),
    };

    if (!payload.name || !payload.email) {
      setStatus("error");
      return;
    }

    setStatus("loading");
    try {
      const res = await fetch("/api/demo", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error("request failed");
      setStatus("success");
      form.reset();
    } catch {
      // Repli mailto si une adresse publique est configurée, sinon message d'erreur.
      const to = process.env.NEXT_PUBLIC_DEMO_EMAIL;
      if (to) {
        const subject = encodeURIComponent("Demande de démo — NAPOLEON Médical");
        const body = encodeURIComponent(
          `Nom : ${payload.name}\nE-mail : ${payload.email}\nProfil : ${payload.profile}\n\n${payload.message ?? ""}`,
        );
        window.location.href = `mailto:${to}?subject=${subject}&body=${body}`;
        setStatus("success");
        form.reset();
      } else {
        setStatus("error");
      }
    }
  }

  return (
    <section
      id="demo"
      className="relative overflow-hidden bg-nap-ink py-28 sm:py-36"
    >
      {/* Emblème or en filigrane très discret */}
      <div
        className="pointer-events-none absolute -right-16 top-1/2 -translate-y-1/2 opacity-[0.05]"
        aria-hidden
      >
        <Image
          src="/vitrine/embleme-or.png"
          alt=""
          width={620}
          height={620}
          className="h-[min(80vh,620px)] w-auto"
        />
      </div>
      {/* Filet or 70° */}
      <div className="nap-filet-70 right-[22%] top-[-10%] h-[120%]" aria-hidden />

      <div className="relative mx-auto grid max-w-6xl gap-14 px-5 sm:px-8 lg:grid-cols-2 lg:items-center">
        {/* Accroche */}
        <div>
          <Reveal blade>
            <h2 className="font-news font-medium leading-[1.08] text-nap-ivory text-[clamp(2.2rem,6vw,4rem)]">
              Votre prochaine consultation peut être différente.
            </h2>
          </Reveal>
          <Reveal delay={0.12}>
            <p className="mt-7 max-w-xl font-body text-lg leading-relaxed text-nap-ivory/80">
              Rejoignez la première vague des{" "}
              <span className="text-nap-gold">100 médecins pionniers</span> qui
              construisent l’assistant médical de demain.
            </p>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="mt-4 max-w-xl font-body text-nap-muted">
              Démonstration personnalisée, en visio ou sur site. Sans
              engagement.
            </p>
          </Reveal>
        </div>

        {/* Formulaire */}
        <Reveal delay={0.1}>
          <div className="rounded-3xl border border-white/10 bg-nap-paper p-7 shadow-[0_40px_80px_-40px_rgba(0,0,0,0.6)] sm:p-9">
            {status === "success" ? (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="py-10 text-center"
              >
                <div className="mx-auto mb-5 flex h-12 w-12 items-center justify-center rounded-full border border-nap-gold text-nap-gold">
                  ✓
                </div>
                <p className="font-news text-2xl text-nap-ink">
                  Demande bien reçue.
                </p>
                <p className="mt-3 font-body text-nap-inksoft">
                  Nous revenons vers vous très vite pour convenir d’une
                  démonstration.
                </p>
              </motion.div>
            ) : (
              <form onSubmit={onSubmit} className="space-y-5" noValidate>
                {/* Honeypot */}
                <div
                  aria-hidden
                  className="absolute left-[-9999px] h-0 w-0 overflow-hidden"
                >
                  <label htmlFor="company">Société</label>
                  <input
                    id="company"
                    name="company"
                    type="text"
                    tabIndex={-1}
                    autoComplete="off"
                  />
                </div>

                <Field label="Nom" htmlFor="name">
                  <input
                    id="name"
                    name="name"
                    type="text"
                    required
                    autoComplete="name"
                    className={inputCls}
                  />
                </Field>

                <Field label="Adresse e-mail" htmlFor="email">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    autoComplete="email"
                    className={inputCls}
                  />
                </Field>

                <Field label="Vous êtes" htmlFor="profile">
                  <select
                    id="profile"
                    name="profile"
                    defaultValue={PROFILES[0]}
                    className={inputCls}
                  >
                    {PROFILES.map((p) => (
                      <option key={p} value={p}>
                        {p}
                      </option>
                    ))}
                  </select>
                </Field>

                <Field label="Message (optionnel)" htmlFor="message">
                  <textarea
                    id="message"
                    name="message"
                    rows={3}
                    className={`${inputCls} resize-none`}
                  />
                </Field>

                {status === "error" && (
                  <p className="font-body text-sm text-nap-terracotta-deep">
                    Une erreur est survenue. Vérifiez vos informations et
                    réessayez.
                  </p>
                )}

                <button
                  type="submit"
                  disabled={status === "loading"}
                  className="nap-sweep inline-flex w-full items-center justify-center border border-nap-gold/70 px-7 py-4 font-imperial text-[0.72rem] uppercase tracking-[0.22em] text-nap-gold transition-colors hover:bg-nap-gold/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-nap-gold disabled:opacity-60"
                >
                  {status === "loading" ? "Envoi…" : "Demander une démo"}
                </button>

                <p className="text-center font-body text-xs text-nap-muted">
                  NAPOLEON Médical — née à Perpignan, conçue pour la médecine
                  française.
                </p>
              </form>
            )}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

const inputCls =
  "w-full rounded-xl border border-nap-border bg-nap-canvas px-4 py-3 font-body text-nap-ink outline-none transition-colors placeholder:text-nap-muted focus:border-nap-deep focus:ring-2 focus:ring-nap-deep/20";

function Field({
  label,
  htmlFor,
  children,
}: {
  label: string;
  htmlFor: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label
        htmlFor={htmlFor}
        className="mb-1.5 block font-body text-sm font-medium text-nap-ink"
      >
        {label}
      </label>
      {children}
    </div>
  );
}
