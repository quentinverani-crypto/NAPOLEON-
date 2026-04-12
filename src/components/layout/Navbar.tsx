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
          ? "bg-napoleon-black/80 backdrop-blur-xl border-b border-white/[0.06]"
          : "bg-transparent"
      }`}
    >
      <div className="mx-auto max-w-7xl px-6 flex items-center justify-between h-16 lg:h-20">
        <a href="#" className="relative z-10 flex items-center">
          <Logo variant="emblem" width={42} height={42} priority className="h-9 w-auto" />
        </a>

        <a href="#beta">
          <Button className="bg-napoleon-deep hover:bg-napoleon-deep/90 text-white px-5 h-10 text-sm font-medium rounded-full border border-white/10 shadow-[0_0_20px_rgba(41,17,191,0.35)]">
            Rejoindre la bêta
          </Button>
        </a>
      </div>
    </nav>
  );
}
