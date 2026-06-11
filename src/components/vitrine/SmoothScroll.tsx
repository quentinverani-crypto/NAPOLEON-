"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import { gsap, ScrollTrigger } from "@/lib/gsap";

/**
 * Smooth scroll Lenis (lerp doux ≈ 0,1) piloté par le ticker GSAP et
 * synchronisé avec ScrollTrigger. Désactivé si `prefers-reduced-motion`.
 * Gère aussi le défilement fluide vers les ancres (#constat, #demo…).
 */
export function SmoothScroll() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const lenis = new Lenis({ lerp: 0.1 });
    lenis.on("scroll", ScrollTrigger.update);

    const tick = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);

    // Défilement fluide vers les ancres internes.
    const onClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const anchor = target.closest<HTMLAnchorElement>('a[href^="#"]');
      if (!anchor) return;
      const id = anchor.getAttribute("href");
      if (!id || id.length < 2) return;
      const el = document.querySelector(id);
      if (!el) return;
      e.preventDefault();
      lenis.scrollTo(el as HTMLElement, { offset: -72 });
    };
    document.addEventListener("click", onClick);

    // Recalcule les positions une fois les polices/images chargées.
    const onLoad = () => ScrollTrigger.refresh();
    window.addEventListener("load", onLoad);

    return () => {
      document.removeEventListener("click", onClick);
      window.removeEventListener("load", onLoad);
      gsap.ticker.remove(tick);
      lenis.destroy();
    };
  }, []);

  return null;
}
