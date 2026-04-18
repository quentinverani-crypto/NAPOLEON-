"use client";

import Image from "next/image";
import { Search, Bell, Plus } from "lucide-react";

export function NavbarFloatingPill() {
  return (
    <div className="h-20 px-4 flex items-center justify-center bg-napoleon-black/60">
      <header className="w-full max-w-5xl h-12 bg-napoleon-warm/80 backdrop-blur-xl border border-white/[0.08] rounded-full flex items-center pl-3 pr-2 gap-3 shadow-[0_10px_40px_-15px_rgba(41,17,191,0.4)]">
        <div className="flex items-center gap-2 pl-2 pr-4 border-r border-white/[0.08]">
          <Image
            src="/logos/napoleon-embleme-negatif.png"
            alt=""
            width={22}
            height={22}
          />
          <span className="font-serif text-white text-sm">Napoléon</span>
        </div>

        <nav className="flex items-center gap-1">
          {["Agenda", "Patients", "Documents"].map((l, i) => (
            <button
              key={l}
              className={`px-3 py-1.5 rounded-full text-[12.5px] transition-colors ${
                i === 0
                  ? "bg-white/[0.08] text-white"
                  : "text-white/55 hover:text-white"
              }`}
            >
              {l}
            </button>
          ))}
        </nav>

        <div className="flex-1 max-w-xs relative">
          <Search
            size={14}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-white/40"
          />
          <input
            placeholder="Rechercher…"
            className="w-full bg-white/[0.04] border border-white/[0.06] rounded-full pl-9 pr-3 h-8 text-[12.5px] text-white placeholder:text-white/40 focus:outline-none focus:border-napoleon-gold/40"
          />
        </div>

        <button className="ml-auto flex items-center gap-1.5 bg-napoleon-deep hover:bg-napoleon-deep/90 text-white text-[12.5px] rounded-full px-3 h-8 border border-white/10 shadow-[0_0_20px_rgba(41,17,191,0.4)]">
          <Plus size={13} strokeWidth={2.2} />
          Consultation
        </button>
        <button className="relative w-8 h-8 rounded-full hover:bg-white/[0.06] flex items-center justify-center text-white/60 hover:text-white">
          <Bell size={14} strokeWidth={1.6} />
          <span className="absolute top-1.5 right-2 w-1.5 h-1.5 bg-napoleon-gold rounded-full" />
        </button>
        <div className="w-8 h-8 rounded-full bg-napoleon-gold/20 border border-napoleon-gold/40 flex items-center justify-center text-napoleon-gold text-[10px] font-medium">
          QV
        </div>
      </header>
    </div>
  );
}
