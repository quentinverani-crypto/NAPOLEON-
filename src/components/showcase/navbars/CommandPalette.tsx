"use client";

import Image from "next/image";
import { Search, Sparkles, Bell } from "lucide-react";

export function NavbarCommandPalette() {
  return (
    <header className="h-[76px] bg-napoleon-black border-b border-white/[0.06] flex items-center px-6 gap-5">
      <Image src="/logos/napoleon-embleme-negatif.png" alt="" width={32} height={32} />

      <div className="flex-1 flex justify-center">
        <button className="group flex items-center gap-3 w-full max-w-xl h-11 bg-white/[0.03] hover:bg-white/[0.05] border border-white/[0.08] hover:border-napoleon-light/30 rounded-xl px-4 transition-all">
          <Search size={16} className="text-white/40 group-hover:text-napoleon-light" strokeWidth={1.7} />
          <span className="text-white/45 text-[13.5px] flex-1 text-left">
            Rechercher un patient, dicter un compte rendu, poser une question…
          </span>
          <div className="flex items-center gap-1 text-[11px] text-white/35">
            <Sparkles size={11} className="text-napoleon-gold" />
            <span>IA</span>
            <span className="mx-1.5 text-white/15">·</span>
            <kbd className="px-1.5 py-0.5 rounded border border-white/10 text-white/50 font-mono text-[10px]">
              ⌘K
            </kbd>
          </div>
        </button>
      </div>

      <div className="flex items-center gap-1.5">
        <button className="relative w-10 h-10 rounded-lg hover:bg-white/[0.05] flex items-center justify-center text-white/55 hover:text-white">
          <Bell size={17} strokeWidth={1.6} />
          <span className="absolute top-2 right-2.5 min-w-[16px] h-4 px-1 bg-napoleon-gold text-napoleon-black rounded-full text-[9px] flex items-center justify-center font-bold">
            3
          </span>
        </button>
        <div className="w-9 h-9 rounded-full bg-napoleon-gold/20 border border-napoleon-gold/40 flex items-center justify-center text-napoleon-gold text-[11px] font-medium">
          QV
        </div>
      </div>
    </header>
  );
}
