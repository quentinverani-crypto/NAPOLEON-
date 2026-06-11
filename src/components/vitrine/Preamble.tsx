"use client";

import { useCallback, useEffect, useRef } from "react";
import Image from "next/image";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/gsap";
import {
  wavePath,
  FRAME_FLAT,
  FRAME_A,
  FRAME_B,
  FRAME_C,
  WAVE_W,
  WAVE_H,
} from "./GoldWave";

const SESSION_KEY = "nap_vitrine_preamble";
const WORD = "NAPOLEON Médical";

const FLAT = wavePath(FRAME_FLAT);
const WAVES = [wavePath(FRAME_A), wavePath(FRAME_B), wavePath(FRAME_C)];

/**
 * Préambule « Le Fil d'or » — storyboard 6.1 du cahier des charges (≤ 5 s,
 * skippable dès la première frame, une fois par session).
 *
 * Sur le bleu nuit, une ligne d'or s'étire puis vibre comme une onde vocale
 * (deux respirations). L'onde se lisse, PIVOTE à 70° autour du centre et
 * s'étire jusqu'aux bords : elle devient la lame de lumière qui OUVRE l'écran
 * — les deux pans bleu nuit glissent le long de la diagonale, l'ivoire entre.
 * Sur l'ivoire, l'emblème apparaît (première apparition de la marque), le
 * wordmark se compose lettre à lettre, la baseline se pose ; puis le tout se
 * réduit et glisse vers sa position de navigation. Reduced-motion : fondu.
 */
export function Preamble({ onDone }: { onDone: () => void }) {
  const scope = useRef<HTMLDivElement>(null);
  const tlRef = useRef<gsap.core.Timeline | null>(null);
  const doneRef = useRef(false);

  const finish = useCallback(() => {
    if (doneRef.current) return;
    doneRef.current = true;
    try {
      sessionStorage.setItem(SESSION_KEY, "1");
    } catch {}
    if (scope.current) {
      gsap.to(scope.current, {
        autoAlpha: 0,
        duration: 0.45,
        ease: "power2.out",
        onComplete: onDone,
      });
    } else {
      onDone();
    }
  }, [onDone]);

  const handleSkip = useCallback(() => {
    tlRef.current?.progress(1);
    finish();
  }, [finish]);

  useGSAP(
    () => {
      let seen = false;
      try {
        seen = sessionStorage.getItem(SESSION_KEY) === "1";
      } catch {}
      const reduce = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;

      if (seen) {
        gsap.set(scope.current, { autoAlpha: 0 });
        onDone();
        return;
      }
      if (reduce) {
        gsap.to(scope.current, {
          autoAlpha: 0,
          delay: 0.6,
          duration: 0.6,
          onComplete: onDone,
        });
        return;
      }

      const q = gsap.utils.selector(scope);
      const stage = q(".pa-stage")[0] as HTMLElement;
      const path = q(".pa-path")[0] as unknown as SVGPathElement | undefined;
      if (!stage || !path) {
        finish();
        return;
      }

      // Géométrie de la lame : diagonale passant par le centre, de (62 %, 0)
      // à (38 %, 100 %) — la même que les pans en clip-path. Angle réel
      // calculé sur le viewport pour que la rotation tombe exactement sur la
      // couture des deux pans.
      const vw = window.innerWidth;
      const vh = window.innerHeight;
      const bladeAngle = (Math.atan2(vh, -0.24 * vw) * 180) / Math.PI; // ≈ 113°
      const bladeLen = Math.hypot(0.24 * vw, vh);
      const waveWidth = Math.min(0.44 * vw, 560);
      const bladeScale = (bladeLen * 1.15) / waveWidth;

      // États initiaux.
      gsap.set(path, { attr: { d: FLAT } });
      gsap.set(stage, { scaleX: 0, transformOrigin: "50% 50%", autoAlpha: 1 });
      gsap.set(q(".pa-embleme"), { autoAlpha: 0, scale: 0.92 });
      gsap.set(q(".pa-word .pa-char"), {
        autoAlpha: 0,
        yPercent: 70,
        filter: "blur(5px)",
      });
      gsap.set(q(".pa-baseline"), { autoAlpha: 0, y: 8 });

      const tl = gsap.timeline({ onComplete: finish });
      tlRef.current = tl;

      tl
        // 0,2 → 0,5 s — la ligne d'or s'étire depuis le centre.
        .to(
          stage,
          { scaleX: 1, duration: 0.45, ease: "power2.out" },
          0.2,
        )
        // 0,5 → 1,7 s — la ligne devient onde vocale : deux respirations.
        .to(path, { attr: { d: WAVES[0] }, duration: 0.35, ease: "sine.inOut" }, 0.55)
        .to(path, { attr: { d: WAVES[1] }, duration: 0.4, ease: "sine.inOut" }, 0.9)
        .to(path, { attr: { d: WAVES[2] }, duration: 0.4, ease: "sine.inOut" }, 1.3)
        // 1,7 → 2,0 s — l'onde se lisse, se fige.
        .to(path, { attr: { d: FLAT }, duration: 0.3, ease: "power2.inOut" }, 1.7)
        // 2,0 → 2,6 s — elle PIVOTE à 70° et s'étire jusqu'aux bords : la lame.
        .to(
          stage,
          {
            rotation: bladeAngle,
            scaleX: bladeScale,
            duration: 0.65,
            ease: "power3.inOut",
          },
          2.0,
        )
        .to(
          q(".pa-path"),
          { strokeWidth: 1, duration: 0.65, ease: "power2.inOut" },
          2.0,
        )
        // 2,6 → 3,7 s — la lame ouvre l'écran : les pans glissent le long de
        // la diagonale, la lumière entre par l'entaille.
        .to(
          q(".pa-panel-left"),
          { xPercent: -64, yPercent: -22, duration: 1.1, ease: "power4.inOut" },
          2.6,
        )
        .to(
          q(".pa-panel-right"),
          { xPercent: 64, yPercent: 22, duration: 1.1, ease: "power4.inOut" },
          2.6,
        )
        // Le liseré or suit l'arête pendant l'ouverture puis s'éteint.
        .to(stage, { autoAlpha: 0, duration: 0.5, ease: "power2.out" }, 3.2)
        // 3,1 → 4,4 s — première apparition de la marque : l'emblème se pose,
        // le wordmark se compose lettre à lettre, la baseline s'aligne.
        .to(
          q(".pa-embleme"),
          { autoAlpha: 1, scale: 1, duration: 0.8, ease: "power2.out" },
          3.1,
        )
        .to(
          q(".pa-word .pa-char"),
          {
            autoAlpha: 1,
            yPercent: 0,
            filter: "blur(0px)",
            stagger: 0.026,
            duration: 0.5,
            ease: "power3.out",
          },
          3.4,
        )
        .to(
          q(".pa-baseline"),
          { autoAlpha: 1, y: 0, duration: 0.4, ease: "power2.out" },
          4.05,
        )
        // 4,7 s — le wordmark se réduit et glisse vers sa place de
        // navigation ; le fondu final du préambule recouvre la fin du geste.
        .add(() => {
          const lockup = q(".pa-lockup")[0] as HTMLElement | undefined;
          if (!lockup || doneRef.current) return;
          const r = lockup.getBoundingClientRect();
          gsap.to(q(".pa-baseline"), { autoAlpha: 0, duration: 0.25 });
          gsap.to(lockup, {
            x: 132 - (r.left + r.width / 2),
            y: 36 - (r.top + r.height / 2),
            scale: 0.2,
            duration: 0.7,
            ease: "power3.inOut",
          });
        }, 4.7)
        .to({}, { duration: 0.45 }, 4.7);
    },
    { scope, dependencies: [] },
  );

  // Saut immédiat à l'état final : scroll, tactile, clavier.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape" || e.key === " " || e.key === "Enter") handleSkip();
    };
    window.addEventListener("wheel", handleSkip, { passive: true });
    window.addEventListener("touchstart", handleSkip, { passive: true });
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("wheel", handleSkip);
      window.removeEventListener("touchstart", handleSkip);
      window.removeEventListener("keydown", onKey);
    };
  }, [handleSkip]);

  return (
    <div
      ref={scope}
      onClick={handleSkip}
      role="presentation"
      className="fixed inset-0 z-[200] overflow-hidden bg-nap-ivory"
    >
      {/* Pans Bleu Nuit qui coulissent le long de la diagonale 70° */}
      <div
        className="pa-panel-left absolute inset-0 bg-nap-ink"
        style={{ clipPath: "polygon(0 0, 62% 0, 38% 100%, 0 100%)" }}
      />
      <div
        className="pa-panel-right absolute inset-0 bg-nap-ink"
        style={{ clipPath: "polygon(62% 0, 100% 0, 100% 100%, 38% 100%)" }}
      />

      {/* Le Fil d'or : ligne → onde vocale → lame diagonale (un seul tracé) */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="pa-stage w-[min(44vw,560px)]">
          <svg
            viewBox={`0 0 ${WAVE_W} ${WAVE_H}`}
            preserveAspectRatio="none"
            className="h-16 w-full overflow-visible"
            aria-hidden
          >
            <path
              className="pa-path"
              d={FLAT}
              fill="none"
              stroke="#DFB670"
              strokeWidth={1.6}
              strokeLinecap="round"
              vectorEffect="non-scaling-stroke"
              style={{ filter: "drop-shadow(0 0 6px rgba(223,182,112,0.55))" }}
            />
          </svg>
        </div>
      </div>

      {/* Première apparition de la marque, sur l'ivoire */}
      <div className="absolute inset-0 flex items-center justify-center px-6">
        <div className="pa-lockup flex flex-col items-center text-center">
          <Image
            src="/vitrine/embleme-encre.png"
            alt=""
            width={120}
            height={120}
            priority
            className="pa-embleme h-[clamp(64px,10vw,112px)] w-auto object-contain"
          />
          <div
            aria-label={WORD}
            className="pa-word mt-7 font-news text-nap-ink text-[clamp(2.1rem,6.5vw,4.2rem)] font-medium leading-none"
          >
            {WORD.split("").map((ch, i) => (
              <span key={i} aria-hidden className="pa-char inline-block">
                {ch === " " ? " " : ch}
              </span>
            ))}
          </div>
          <p className="pa-baseline nap-eyebrow mt-6 text-nap-gold">
            — La voix médicale souveraine —
          </p>
        </div>
      </div>

      <button
        type="button"
        onClick={handleSkip}
        className="nap-eyebrow absolute bottom-6 right-6 z-10 text-nap-ivory/40 transition-colors hover:text-nap-ivory/80"
      >
        Passer
      </button>
    </div>
  );
}
