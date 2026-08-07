"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";

function clamp(value: number) {
  return Math.min(1, Math.max(0, value));
}

function smoothstep(from: number, to: number, value: number) {
  const progress = clamp((value - from) / (to - from));
  return progress * progress * (3 - 2 * progress);
}

const consultationFields = [
  {
    label: "Motif de consultation",
    text: "Gêne nasale persistante avec rhinorrhée depuis plusieurs semaines.",
  },
  {
    label: "Histoire de la maladie",
    text: "Symptômes fluctuants, plus marqués le matin, sans épisode fébrile récent.",
  },
  {
    label: "Examen clinique",
    text: "Muqueuse nasale congestive. Examen sans signe de complication immédiate.",
  },
  {
    label: "Conclusion",
    text: "Tableau de rhinite chronique. Prise en charge et suivi expliqués au patient.",
  },
];

export function HeroExperience() {
  const storyRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const story = storyRef.current;
    if (!story) return;

    let frame = 0;

    const update = () => {
      frame = 0;
      const rect = story.getBoundingClientRect();
      const headerHeight = window.innerWidth <= 900 ? 74 : 86;
      const viewportHeight = window.innerHeight - headerHeight;
      const travel = Math.max(1, story.offsetHeight - viewportHeight);
      const progress = clamp((headerHeight - rect.top) / travel);

      const expansion = smoothstep(0.06, 0.35, progress);
      const copyFade = 1 - smoothstep(0.08, 0.26, progress);
      const originalNoteFade = 1 - smoothstep(0.15, 0.3, progress);
      const orb = smoothstep(0.31, 0.42, progress);
      const panel = smoothstep(0.41, 0.54, progress);
      const documents = smoothstep(0.78, 0.87, progress);
      const exit = smoothstep(0.91, 1, progress);

      story.style.setProperty("--visual-left", `${46 * (1 - expansion)}vw`);
      story.style.setProperty("--visual-radius", `${62 * (1 - expansion)}px`);
      story.style.setProperty("--edge-fade", `${1 - expansion}`);
      story.style.setProperty("--copy-opacity", `${copyFade}`);
      story.style.setProperty("--copy-shift", `${-24 * (1 - copyFade)}px`);
      story.style.setProperty("--original-note-opacity", `${originalNoteFade}`);
      story.style.setProperty("--orb-opacity", `${orb}`);
      story.style.setProperty("--orb-scale", `${0.72 + orb * 0.28}`);
      story.style.setProperty("--panel-opacity", `${panel}`);
      story.style.setProperty("--panel-scale", `${0.92 + panel * 0.08}`);
      story.style.setProperty("--documents-opacity", `${documents}`);
      story.style.setProperty("--exit-opacity", `${exit}`);

      consultationFields.forEach((_, index) => {
        const start = 0.51 + index * 0.065;
        const reveal = smoothstep(start, start + 0.105, progress);
        story.style.setProperty(`--field-${index + 1}-clip`, `${100 * (1 - reveal)}%`);
        story.style.setProperty(`--field-${index + 1}-opacity`, `${0.18 + reveal * 0.82}`);
      });
    };

    const requestUpdate = () => {
      if (!frame) frame = window.requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", requestUpdate, { passive: true });
    window.addEventListener("resize", requestUpdate);

    return () => {
      window.removeEventListener("scroll", requestUpdate);
      window.removeEventListener("resize", requestUpdate);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <section className="hero-story" ref={storyRef} aria-labelledby="hero-title">
      <div className="hero-story__sticky">
        <div className="hero hero--story">
          <div className="hero__copy">
            <p className="eyebrow">Le temps médical redevient humain</p>
            <h1 id="hero-title">Retrouvez la relation patient.</h1>
            <p className="hero__lead">
              NAPOLÉON Médical écoute, structure et prépare vos documents pour
              vous laisser pleinement présent face à votre patient.
            </p>
            <div className="hero__actions">
              <a className="button button--primary" href="#beta">Rejoindre la bêta</a>
              <a className="text-link" href="#documents">
                Découvrir la plateforme <span aria-hidden="true">→</span>
              </a>
            </div>
            <ul className="trust-line" aria-label="Engagements principaux">
              <li><span className="trust-mark">M</span>Conçu par un médecin</li>
              <li>
                <span className="flag" aria-hidden="true"><i /><i /><i /></span>
                Infrastructure française
              </li>
              <li><span className="trust-mark trust-mark--check">✓</span>Validation par le praticien</li>
            </ul>
          </div>

          <div className="hero__visual">
            <Image
              src="/assets/consultation-medecin-patient.webp"
              alt="Un médecin échange avec sa patiente sans écran entre eux"
              fill
              sizes="100vw"
              preload
            />
            <div className="status-note status-note--hero" aria-hidden="true">
              <div className="status-note__head"><span className="status-dot" /><strong>Compte rendu</strong></div>
              <p>en préparation</p>
              <div className="status-lines"><i /><i /><i /></div>
              <small><span className="typing-dots">•••</span> Préparation en cours</small>
            </div>
          </div>

          <div className="assistant-orb" aria-hidden="true">
            <span className="assistant-orb__pulse" />
            <span className="assistant-orb__core">
              <Image
                src="/assets/napoleon-assistant-listening.jpg"
                alt=""
                fill
                sizes="68px"
              />
            </span>
          </div>

          <aside className="assistant-panel" aria-label="Exemple de structuration d'une consultation par NAPOLÉON">
            <header className="assistant-panel__header">
              <div>
                <span className="assistant-panel__listening"><i /> Consultation en cours</span>
                <strong>NAPOLÉON structure la consultation</strong>
              </div>
              <span className="assistant-panel__state">À vos côtés</span>
            </header>

            <div className="assistant-panel__fields">
              {consultationFields.map((field, index) => (
                <section className={`live-field live-field--${index + 1}`} key={field.label}>
                  <span>{field.label}</span>
                  <p>{field.text}</p>
                </section>
              ))}
            </div>

            <div className="assistant-panel__documents">
              <div><span>Compte rendu</span><small><i /> En préparation</small></div>
              <div><span>Ordonnance</span><small>En attente</small></div>
              <div><span>Courrier d’adressage</span><small>En attente</small></div>
            </div>
          </aside>
        </div>

        <div className="hero-story__exit" aria-hidden="true" />
      </div>
    </section>
  );
}
