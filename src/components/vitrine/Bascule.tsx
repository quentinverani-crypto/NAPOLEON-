"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/gsap";
import { useReducedMotion } from "./use-reduced-motion";

/** Fauteuil stylisé (profil, esthétique galerie — aucun personnage humain). */
function Chair({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 124 150" className={className} aria-hidden>
      <g fill="#1A2540" stroke="#5478A8" strokeOpacity="0.35" strokeWidth="1">
        <rect x="14" y="14" width="30" height="100" rx="15" />
        <rect x="26" y="86" width="84" height="28" rx="14" />
        <rect x="40" y="60" width="74" height="17" rx="8.5" />
        <rect x="22" y="110" width="15" height="32" rx="6" />
        <rect x="98" y="110" width="15" height="32" rx="6" />
      </g>
    </svg>
  );
}

const TEXT = {
  a: "Aujourd’hui, un écran sépare.",
  b: "NAPOLEON l’efface.",
  c: "Deux personnes. Une conversation. La médecine que vous avez choisie.",
};

/** Repli reduced-motion : même narration, trois temps présentés simplement. */
function BasculeReduced() {
  const blocks = [
    { t: TEXT.a, sub: "Un moniteur s’interpose entre le médecin et le patient." },
    { t: TEXT.b, sub: "L’écran s’efface ; l’information reste, elle ne s’impose plus." },
    { t: TEXT.c, sub: "Face à face, plus rien entre eux." },
  ];
  return (
    <section id="bascule" className="bg-nap-ink py-24">
      <h2 className="sr-only">La bascule</h2>
      <div className="mx-auto max-w-3xl space-y-20 px-6 text-center">
        {blocks.map((b, i) => (
          <div key={i}>
            <p className="font-news text-[clamp(1.8rem,5vw,3rem)] font-medium leading-tight text-nap-ivory">
              {b.t}
            </p>
            <p className="mt-4 font-body text-nap-muted">{b.sub}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export function Bascule() {
  const reduce = useReducedMotion();
  const scope = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (!scope.current) return;
      const q = gsap.utils.selector(scope);
      const monitor = q(".b-monitor")[0];
      const chairR = q(".b-chair-right")[0];

      // États initiaux.
      gsap.set(q(".b-warm, .b-frame, .b-ray, .b-textB, .b-textC"), {
        opacity: 0,
      });
      gsap.set(q(".b-textA"), { opacity: 1, y: 0 });
      gsap.set(q(".b-textB"), { y: 18 });
      gsap.set(q(".b-textC"), { y: 18 });
      gsap.set(monitor, { xPercent: -50, transformOrigin: "center bottom" });
      gsap.set(chairR, { scaleX: -1 });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: scope.current,
          start: "top top",
          end: "+=2800",
          scrub: 0.7,
          pin: true,
          anticipatePin: 1,
        },
      });

      tl.to(q(".b-warm"), { opacity: 1, duration: 0.42, ease: "none" }, 0.3)
        .to(
          monitor,
          { scaleX: 0.16, scaleY: 0.34, yPercent: -120, duration: 0.32, ease: "power2.inOut" },
          0.3,
        )
        .to(q(".b-glow"), { opacity: 0, duration: 0.28, ease: "none" }, 0.3)
        .to(monitor, { opacity: 0, duration: 0.16 }, 0.46)
        .to(q(".b-frame"), { opacity: 1, duration: 0.2 }, 0.56)
        .to(q(".b-scrim"), { opacity: 0, duration: 0.12, ease: "none" }, 0.6)
        .to(q(".b-chair-left"), { xPercent: 118, duration: 0.34, ease: "power2.inOut" }, 0.6)
        .to(chairR, { xPercent: -118, duration: 0.34, ease: "power2.inOut" }, 0.6)
        .to(q(".b-ray"), { opacity: 1, duration: 0.16, ease: "none" }, 0.74)
        // Textes synchronisés — chaque phrase monte en se posant, la
        // précédente s'efface en s'élevant (continuité spatiale).
        .to(q(".b-textA"), { opacity: 0, y: -16, duration: 0.07 }, 0.24)
        .to(q(".b-textB"), { opacity: 1, y: 0, duration: 0.08 }, 0.33)
        .to(q(".b-textB"), { opacity: 0, y: -16, duration: 0.07 }, 0.57)
        .to(q(".b-textC"), { opacity: 1, y: 0, duration: 0.1 }, 0.68);
    },
    { scope, dependencies: [reduce] },
  );

  if (reduce) return <BasculeReduced />;

  return (
    <section
      ref={scope}
      id="bascule"
      className="relative h-[100svh] overflow-hidden bg-nap-ink"
    >
      <h2 className="sr-only">La bascule</h2>

      {/* Base froide (la prison de l’écran) */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(120% 90% at 50% 60%, #243150 0%, #1A2540 70%)",
        }}
        aria-hidden
      />
      {/* Base chaude (la consultation réhumanisée) */}
      <div
        className="b-warm absolute inset-0"
        style={{
          background:
            "radial-gradient(120% 95% at 50% 64%, #FBF6EA 0%, #F3F1EC 58%, #ECE6D8 100%)",
        }}
        aria-hidden
      />
      {/* Sol — marbre doux */}
      <div
        className="absolute inset-x-0 bottom-0 h-[34%]"
        style={{
          background:
            "linear-gradient(to top, rgba(255,255,255,0.06), transparent)",
        }}
        aria-hidden
      />

      {/* Cadre mural discret (ce que devient l’écran) */}
      <div
        className="b-frame absolute left-1/2 top-[15%] h-[12%] w-[16%] -translate-x-1/2 rounded-sm border border-nap-gold/40 bg-white/30"
        aria-hidden
      />

      {/* Fauteuils */}
      <div
        className="b-chair-left absolute bottom-[20%] left-[7%] w-[clamp(96px,15vw,200px)]"
        aria-hidden
      >
        <Chair className="h-auto w-full" />
      </div>
      <div
        className="b-chair-right absolute bottom-[20%] right-[7%] w-[clamp(96px,15vw,200px)]"
        aria-hidden
      >
        <Chair className="h-auto w-full" />
      </div>

      {/* Moniteur sur pied, lueur froide #5478A8 */}
      <div
        className="b-monitor absolute bottom-[24%] left-1/2 flex flex-col items-center"
        aria-hidden
      >
        <div className="b-glow h-[20vh] max-h-[200px] w-[26vw] max-w-[300px] rounded-md">
          <div className="h-full w-full rounded-md bg-[#5478A8] shadow-[0_0_80px_24px_rgba(84,120,168,0.55)]" />
        </div>
        <div className="h-[8vh] max-h-[70px] w-[3px] bg-nap-blue/60" />
        <div className="h-[6px] w-[14%] min-w-[60px] rounded-full bg-nap-blue/50" />
      </div>

      {/* Rai de lumière doré à 70° */}
      <div
        className="b-ray pointer-events-none absolute left-1/2 top-1/2 h-[160%] w-[2px] -translate-x-1/2 -translate-y-1/2 rotate-[20deg]"
        aria-hidden
      >
        <div className="h-full w-full bg-gradient-to-b from-transparent via-nap-gold/70 to-transparent shadow-[0_0_12px_rgba(223,182,112,0.6)]" />
      </div>

      {/* Scrim haut */}
      <div
        className="b-scrim pointer-events-none absolute inset-x-0 top-0 h-[46%] bg-gradient-to-b from-nap-ink/80 to-transparent"
        aria-hidden
      />

      {/* Textes synchronisés */}
      <div className="absolute inset-x-0 top-[14%] flex justify-center px-6">
        <div className="relative h-[30vh] w-full max-w-3xl text-center">
          <p className="b-textA absolute inset-x-0 top-0 font-news text-[clamp(1.8rem,5vw,3.2rem)] font-medium leading-tight text-nap-ivory drop-shadow-[0_2px_12px_rgba(0,0,0,0.4)]">
            {TEXT.a}
          </p>
          <p className="b-textB absolute inset-x-0 top-0 font-news text-[clamp(2rem,6vw,3.8rem)] font-medium leading-tight text-nap-ivory drop-shadow-[0_2px_12px_rgba(0,0,0,0.35)]">
            {TEXT.b}
          </p>
          <p className="b-textC absolute inset-x-0 top-0 mx-auto max-w-2xl font-news text-[clamp(1.6rem,4.4vw,2.8rem)] font-medium leading-tight text-nap-ink">
            {TEXT.c}
          </p>
        </div>
      </div>
    </section>
  );
}
