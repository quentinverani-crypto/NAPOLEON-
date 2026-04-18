"use client";

import Image from "next/image";
import { Search, Bell, ChevronDown } from "lucide-react";

export function NavbarMinimal() {
  return (
    <header className="h-16 bg-napoleon-black border-b border-white/[0.06] flex items-center px-6 gap-6">
      <div className="flex items-center gap-2.5">
        <Image src="/logos/napoleon-embleme-negatif.png" alt="" width={26} height={26} />
        <span className="font-serif text-white text-[16px] tracking-tight">
          Napoléon
        </span>
      </div>

      <div className="flex-1 max-w-md relative">
        <Search
          size={15}
          className="absolute left-3.5 top-1/2 -translate-y-1/2 text-white/40"
        />
        <input
          placeholder="Rechercher un patient, un document…"
          className="w-full bg-white/[0.04] border border-white/[0.08] rounded-lg pl-10 pr-3 h-9 text-[13px] text-white placeholder:text-white/35 focus:outline-none focus:border-napoleon-gold/40"
        />
      </div>

      <div className="ml-auto flex items-center gap-2">
        <button className="relative w-9 h-9 rounded-lg hover:bg-white/[0.05] flex items-center justify-center text-white/60 hover:text-white">
          <Bell size={16} strokeWidth={1.6} />
          <span className="absolute top-2 right-2.5 w-1.5 h-1.5 bg-napoleon-gold rounded-full" />
        </button>
        <button className="flex items-center gap-2 pl-1 pr-2 py-1 rounded-lg hover:bg-white/[0.05]">
          <div className="w-7 h-7 rounded-full bg-napoleon-gold/20 border border-napoleon-gold/40 flex items-center justify-center text-napoleon-gold text-[11px] font-medium">
            QV
          </div>
          <span className="text-white text-[13px]">Dr. Verani</span>
          <ChevronDown size={13} className="text-white/40" />
        </button>
      </div>
    </header>
  );
}
