"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/gsap";
import { Eyebrow, DemoButton } from "./ui";
import { GoldWave } from "./GoldWave";
import { PREAMBLE_DONE_EVENT } from "./PreambleGate";

/**
 * Hero — l'entrée se joue dans la continuité du préambule : dès que
 * l'ouverture rend la main, les deux lignes du titre montent sous leur masque,
 * le filet or se dessine, le reste se pose. Reduced-motion : fondu simple.
 */
export function Hero() {
  const scope = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const el = scope.current;
      if (!el) return;
      const q = gsap.utils.selector(scope);
      const reduce = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;

      const preambleDone = () =>
        document.documentElement.dataset.napPreambleDone === "1";

      if (reduce) {
        gsap.set(q(".h-stagger"), { opacity: 0 });
        const play = () =>
          gsap.to(q(".h-stagger"), { opacity: 1, duration: 0.6, stagger: 0.1 });
        if (preambleDone()) {
          play();
          return;
        }
        window.addEventListener(PREAMBLE_DONE_EVENT, play, { once: true });
        return () => window.removeEventListener(PREAMBLE_DONE_EVENT, play);
      }

      gsap.set(q(".h-line-inner"), { yPercent: 110 });
      gsap.set(q(".h-eyebrow, .h-sub, .h-ctas"), { autoAlpha: 0, y: 22 });
      gsap.set(q(".h-filet"), { scaleY: 0, transformOrigin: "top center" });
      gsap.set(q(".h-wave"), { autoAlpha: 0 });

      const tl = gsap.timeline({ paused: true });
      tl.to(q(".h-eyebrow"), { autoAlpha: 1, y: 0, duration: 0.5, ease: "power2.out" }, 0)
        .to(
          q(".h-line-inner"),
          {
            yPercent: 0,
            duration: 0.9,
            stagger: 0.14,
            ease: "power4.out",
          },
          0.1,
        )
        .to(
          q(".h-filet"),
          { scaleY: 1, duration: 1.4, ease: "power2.inOut" },
          0.2,
        )
        .to(q(".h-sub"), { autoAlpha: 1, y: 0, duration: 0.7, ease: "power2.out" }, 0.7)
        .to(q(".h-ctas"), { autoAlpha: 1, y: 0, duration: 0.7, ease: "power2.out" }, 0.9)
        .to(q(".h-wave"), { autoAlpha: 1, duration: 1.2, ease: "power1.inOut" }, 1.1);

      const play = () => tl.play();
      if (preambleDone()) {
        play();
        return;
      }
      window.addEventListener(PREAMBLE_DONE_EVENT, play, { once: true });
      // Filet de sécurité si l'événement n'arrive jamais.
      const fallback = window.setTimeout(() => {
        if (tl.progress() === 0 && tl.paused()) tl.play();
      }, 7000);

      return () => {
        window.removeEventListener(PREAMBLE_DONE_EVENT, play);
        window.clearTimeout(fallback);
      };
    },
    { scope, dependencies: [] },
  );

  return (
    <section
      ref={scope}
      id="accueil"
      className="nap-grain relative flex min-h-[100svh] items-center overflow-hidden bg-nap-ivory pt-24 pb-28"
    >
      {/* Filet or 70° discret en arrière-plan (un seul par écran) */}
      <div
        className="nap-filet-70 h-filet left-[18%] top-[-10%] h-[120%]"
        aria-hidden
      />

      <div className="relative mx-auto w-full max-w-5xl px-5 sm:px-8">
        <div className="h-eyebrow h-stagger">
          <Eyebrow tone="terracotta">
            Assistant de consultation médical
          </Eyebrow>
        </div>

        <h1 className="mt-7 font-news text-nap-ink font-medium leading-[1.04] text-[clamp(2.6rem,8vw,5.6rem)]">
          <span className="block overflow-hidden">
            <span className="h-line-inner h-stagger block">
              Face au patient.
            </span>
          </span>
          <span className="block overflow-hidden">
            <span className="h-line-inner h-stagger block text-nap-blue">
              Pas à l&apos;écran.
            </span>
          </span>
        </h1>

        <p className="h-sub h-stagger mt-8 max-w-2xl font-body text-lg leading-relaxed text-nap-inksoft sm:text-xl">
          NAPOLEON Médical écoute la consultation et prépare comptes-rendus,
          ordonnances et courriers — prêts à valider. Vous restez concentré
          sur ce qui compte : votre patient.
        </p>

        <div className="h-ctas h-stagger mt-11 flex flex-wrap items-center gap-x-8 gap-y-4">
          <DemoButton>Demander une démo</DemoButton>
          <a
            href="#constat"
            className="group inline-flex items-center gap-3 text-sm font-medium text-nap-inksoft transition-colors hover:text-nap-ink"
          >
            <span className="border-b border-nap-gold/50 pb-0.5 transition-colors group-hover:border-nap-gold">
              Découvrir
            </span>
            <svg
              width="10"
              height="12"
              viewBox="0 0 10 12"
              fill="none"
              aria-hidden
              className="transition-transform duration-300 group-hover:translate-y-0.5"
            >
              <path
                d="M5 1v9.2M1.2 7 5 10.8 8.8 7"
                stroke="currentColor"
                strokeWidth="1.2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </a>
        </div>
      </div>

      {/* Onde vocale dorée, fine et lente, en bas du hero (rappel du préambule) */}
      <div
        className="h-wave pointer-events-none absolute inset-x-0 bottom-0 flex justify-center"
        aria-hidden
      >
        <GoldWave
          className="h-14 w-[min(90vw,720px)]"
          strokeWidth={1.2}
          opacity={0.5}
        />
      </div>
    </section>
  );
}
