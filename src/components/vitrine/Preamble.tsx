"use client";

import { useCallback, useEffect, useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/gsap";
import { GoldWave } from "./GoldWave";

const SESSION_KEY = "nap_vitrine_preamble";
const WORD = "NAPOLEON Médical";

/**
 * Préambule « Le Fil d'or » — timeline GSAP (≤ 5 s, skippable, une fois par
 * session). Une ligne d'or s'étire, vibre comme une onde vocale, se fige en
 * lame diagonale 70° qui ouvre l'écran sur l'ivoire, d'où surgit le wordmark.
 * Tout input saute à l'état final. Reduced-motion : fondu simple.
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
        duration: 0.5,
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
          delay: 0.5,
          duration: 0.4,
          onComplete: onDone,
        });
        return;
      }

      const q = gsap.utils.selector(scope);
      const blade = q(".pa-blade")[0] as unknown as SVGLineElement | undefined;
      const len = blade ? blade.getTotalLength() : 0;

      gsap.set(q(".pa-wave, .pa-baseline"), { autoAlpha: 0 });
      gsap.set(q(".pa-word .pa-char"), {
        autoAlpha: 0,
        yPercent: 60,
        filter: "blur(4px)",
      });
      if (blade)
        gsap.set(blade, {
          strokeDasharray: len,
          strokeDashoffset: len,
          autoAlpha: 0,
        });

      const tl = gsap.timeline({ onComplete: finish });
      tlRef.current = tl;

      tl.fromTo(
        q(".pa-line"),
        { width: 0, autoAlpha: 0 },
        { width: "40vw", autoAlpha: 1, duration: 0.5, ease: "power2.out" },
        0,
      )
        .to(q(".pa-line"), { autoAlpha: 0, duration: 0.3 }, 0.6)
        .to(q(".pa-wave"), { autoAlpha: 1, duration: 0.4 }, 0.6)
        .to(q(".pa-wave"), { autoAlpha: 0, duration: 0.4 }, 2.0);

      if (blade) {
        tl.set(blade, { autoAlpha: 1 }, 2.0).to(
          blade,
          { strokeDashoffset: 0, duration: 0.6, ease: "power2.inOut" },
          2.0,
        );
      }

      tl.to(
        q(".pa-panel-left"),
        { xPercent: -58, yPercent: -18, duration: 0.9, ease: "power4.inOut" },
        2.7,
      )
        .to(
          q(".pa-panel-right"),
          { xPercent: 58, yPercent: 18, duration: 0.9, ease: "power4.inOut" },
          2.7,
        )
        .to(q(".pa-blade"), { autoAlpha: 0, duration: 0.4 }, 2.9)
        .to(
          q(".pa-word .pa-char"),
          {
            autoAlpha: 1,
            yPercent: 0,
            filter: "blur(0px)",
            stagger: 0.03,
            duration: 0.4,
            ease: "power2.out",
          },
          3.4,
        )
        .to(q(".pa-baseline"), { autoAlpha: 1, duration: 0.4 }, 4.1)
        .to({}, { duration: 0.4 });
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
      {/* Pans Bleu Nuit qui coulissent à l'ouverture */}
      <div
        className="pa-panel-left absolute inset-0 bg-nap-ink"
        style={{ clipPath: "polygon(0 0, 62% 0, 38% 100%, 0 100%)" }}
      />
      <div
        className="pa-panel-right absolute inset-0 bg-nap-ink"
        style={{ clipPath: "polygon(62% 0, 100% 0, 100% 100%, 38% 100%)" }}
      />

      {/* Fil / onde dorée centrés */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div
          className="pa-line h-px nap-hairline-gold"
          style={{ filter: "drop-shadow(0 0 6px rgba(223,182,112,0.5))" }}
        />
        <div className="pa-wave absolute w-[44vw] max-w-[560px]">
          <GoldWave className="h-16 w-full" strokeWidth={1.6} />
        </div>
      </div>

      {/* La lame diagonale 70° */}
      <svg
        className="absolute inset-0 h-full w-full"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        aria-hidden
      >
        <line
          className="pa-blade"
          x1="62"
          y1="0"
          x2="38"
          y2="100"
          stroke="#DFB670"
          strokeWidth="0.25"
          vectorEffect="non-scaling-stroke"
          style={{ filter: "drop-shadow(0 0 5px rgba(223,182,112,0.7))" }}
        />
      </svg>

      {/* Wordmark révélé sur l'ivoire */}
      <div className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center">
        <div
          aria-label={WORD}
          className="pa-word font-news text-nap-ink text-[clamp(2.2rem,7vw,4.5rem)] font-medium leading-none"
        >
          {WORD.split("").map((ch, i) => (
            <span key={i} aria-hidden className="pa-char inline-block">
              {ch === " " ? " " : ch}
            </span>
          ))}
        </div>
        <p className="pa-baseline nap-eyebrow mt-5 text-nap-gold">
          — La voix médicale souveraine —
        </p>
      </div>

      <button
        type="button"
        onClick={handleSkip}
        className="absolute bottom-6 right-6 z-10 nap-eyebrow text-nap-ivory/40 transition-colors hover:text-nap-ivory/80"
      >
        Passer
      </button>
    </div>
  );
}
