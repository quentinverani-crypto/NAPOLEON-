"use client";

import { useCallback, useEffect, useRef } from "react";
import Image from "next/image";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/gsap";

const SESSION_KEY = "nap_vitrine_preamble";
const WORD = "NAPOLEON Médical";

/**
 * Préambule « Le Geste impérial » — timeline GSAP (≤ 5,5 s, skippable, une fois
 * par session). Sur Bleu Nuit, une lame d'or trace la diagonale 70° et tranche
 * l'écran ; les deux pans s'écartent lentement sur l'ivoire, d'où s'élève
 * l'emblème, puis le wordmark gravé. Tout input saute à l'état final.
 * Reduced-motion : fondu simple.
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
        duration: 0.6,
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
          duration: 0.4,
          onComplete: onDone,
        });
        return;
      }

      const q = gsap.utils.selector(scope);
      const blade = q(".pa-blade")[0] as unknown as SVGLineElement | undefined;
      const len = blade ? blade.getTotalLength() : 0;

      gsap.set(q(".pa-baseline"), { autoAlpha: 0 });
      gsap.set(q(".pa-emblem"), { autoAlpha: 0, scale: 0.82, yPercent: 6 });
      gsap.set(q(".pa-word .pa-char"), { autoAlpha: 0, yPercent: 80 });
      if (blade)
        gsap.set(blade, {
          strokeDasharray: len,
          strokeDashoffset: len,
          autoAlpha: 0,
        });

      const tl = gsap.timeline({
        onComplete: finish,
        defaults: { ease: "power3.inOut" },
      });
      tlRef.current = tl;

      // La lame d'or trace la diagonale impériale 70°.
      if (blade) {
        tl.set(blade, { autoAlpha: 1 }, 0.3).to(
          blade,
          { strokeDashoffset: 0, duration: 1.1, ease: "power2.inOut" },
          0.3,
        );
      }

      // Les pans s'écartent lentement, révélant l'ivoire.
      tl.to(
        q(".pa-panel-left"),
        { xPercent: -60, yPercent: -20, duration: 1.3, ease: "power4.inOut" },
        1.7,
      )
        .to(
          q(".pa-panel-right"),
          { xPercent: 60, yPercent: 20, duration: 1.3, ease: "power4.inOut" },
          1.7,
        )
        .to(q(".pa-blade"), { autoAlpha: 0, duration: 0.5 }, 1.9)
        // L'emblème s'élève sur l'ivoire.
        .to(
          q(".pa-emblem"),
          { autoAlpha: 1, scale: 1, yPercent: 0, duration: 1.1, ease: "power3.out" },
          2.5,
        )
        // Le wordmark se grave.
        .to(
          q(".pa-word .pa-char"),
          {
            autoAlpha: 1,
            yPercent: 0,
            stagger: 0.035,
            duration: 0.55,
            ease: "power3.out",
          },
          3.3,
        )
        .to(q(".pa-baseline"), { autoAlpha: 1, duration: 0.5 }, 4.2)
        .to({}, { duration: 0.5 });
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
          strokeWidth="0.18"
          vectorEffect="non-scaling-stroke"
        />
      </svg>

      {/* Emblème + wordmark gravé sur l'ivoire */}
      <div className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center">
        <div className="pa-emblem">
          <Image
            src="/vitrine/embleme-or-sur-bleu.png"
            alt="Emblème NAPOLEON Médical"
            width={184}
            height={184}
            priority
            className="h-auto w-[clamp(96px,12vw,168px)]"
          />
        </div>
        <div
          aria-label={WORD}
          className="pa-word mt-8 font-news text-nap-ink text-[clamp(2.2rem,7vw,4.5rem)] font-medium leading-none tracking-tight"
        >
          {WORD.split("").map((ch, i) => (
            <span key={i} aria-hidden className="pa-char inline-block">
              {ch === " " ? " " : ch}
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
