"use client";

import { useRef, type ReactNode } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/gsap";
import { cn } from "@/lib/utils";

/* Masque diagonal 70° — l'arête de découpe suit la signature du logo
   (CDC § 6.3 : reveals par masque diagonal, 500–700 ms, power2.out). */
const CLIP_HIDDEN = "polygon(0% 0%, 0% 0%, -36% 100%, -36% 100%)";
const CLIP_SHOWN = "polygon(0% 0%, 136% 0%, 100% 100%, -36% 100%)";

/**
 * Apparition signature : le contenu est révélé par un masque qui balaie le
 * bloc en diagonale 70° (geste impérial), accompagné d'une montée discrète.
 * `blade` ajoute un voile doré qui suit l'arête. Déclenché une seule fois à
 * ~20 % de visibilité. Respecte `prefers-reduced-motion`.
 */
export function Reveal({
  children,
  className,
  delay = 0,
  blade = false,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  blade?: boolean;
}) {
  const scope = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const el = scope.current;
      if (!el) return;
      const inner = el.querySelector<HTMLElement>(":scope > .rv-inner");
      const veil = el.querySelector<HTMLElement>(":scope > .rv-blade");
      if (!inner) return;

      const reduce = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;

      if (reduce) {
        gsap.set(inner, { opacity: 0 });
        gsap.to(inner, {
          opacity: 1,
          duration: 0.5,
          delay,
          scrollTrigger: { trigger: el, start: "top 88%", once: true },
        });
        return;
      }

      gsap.set(inner, { clipPath: CLIP_HIDDEN, y: 28, opacity: 0 });
      if (veil) gsap.set(veil, { xPercent: -45, opacity: 0 });

      const tl = gsap.timeline({
        delay,
        scrollTrigger: { trigger: el, start: "top 82%", once: true },
      });

      tl.to(inner, {
        clipPath: CLIP_SHOWN,
        y: 0,
        opacity: 1,
        duration: 0.7,
        ease: "power2.out",
        // Le masque a fait son office : on le retire pour ne pas rogner les
        // ombres ou débordements légitimes du contenu.
        onComplete: () => gsap.set(inner, { clearProps: "clipPath" }),
      });

      if (veil) {
        tl.to(
          veil,
          {
            xPercent: 140,
            opacity: 1,
            duration: 0.8,
            ease: "power2.out",
          },
          0.05,
        ).set(veil, { opacity: 0 });
      }
    },
    { scope, dependencies: [delay, blade] },
  );

  return (
    <div ref={scope} className={cn("relative", className)}>
      <div className="rv-inner h-full">{children}</div>
      {blade && (
        <span
          aria-hidden
          className="rv-blade pointer-events-none absolute inset-y-0 -inset-x-4 z-10 opacity-0"
          style={{
            background:
              "linear-gradient(110deg, transparent 43%, rgba(223,182,112,0.5) 50%, transparent 57%)",
          }}
        />
      )}
    </div>
  );
}
