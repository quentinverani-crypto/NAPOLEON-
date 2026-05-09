"use client";

import { useState, useEffect } from "react";
import { Logo } from "@/components/brand/Logo";
import { Button } from "@/components/ui/button";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-napoleon-black/80 backdrop-blur-xl border-b border-napoleon-ink/[0.06]"
          : "bg-transparent"
      }`}
    >
      <div className="mx-auto max-w-7xl px-6 flex items-center justify-between h-16 lg:h-20">
        <a href="#" className="relative z-10 flex items-center gap-3">
          <Logo variant="emblem" width={42} height={42} priority className="h-9 w-auto" />
          <span className="font-serif text-napoleon-ink text-lg lg:text-xl tracking-tight leading-none">
            NAPOLEON{" "}
            <span className="text-napoleon-gold-dark italic">Médical</span>
          </span>
        </a>

        <a href="#beta">
          <Button className="bg-napoleon-deep hover:bg-napoleon-deep/90 text-white px-5 h-10 text-sm font-medium rounded-full shadow-[0_4px_20px_rgba(58,90,156,0.25)]">
            Rejoindre la bêta
          </Button>
        </a>
      </div>
    </nav>
  );
}
