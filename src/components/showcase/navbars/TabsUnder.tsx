"use client";

import Image from "next/image";
import { Search, Bell, Plus, ChevronDown } from "lucide-react";
import { useState } from "react";

const tabs = [
  "Vue d'ensemble",
  "Consultations",
  "Patients",
  "Agenda",
  "Documents",
  "Messagerie",
];

export function NavbarTabsUnder() {
  const [active, setActive] = useState("Consultations");
  return (
    <header className="bg-napoleon-black border-b border-white/[0.06]">
      {/* Top row */}
      <div className="h-14 flex items-center px-6 gap-5 border-b border-white/[0.04]">
        <div className="flex items-center gap-2.5">
          <Image src="/logos/napoleon-embleme-negatif.png" alt="" width={26} height={26} />
          <span className="font-serif text-white text-[16px]">Napoléon</span>
          <div className="mx-3 w-px h-5 bg-white/10" />
          <button className="flex items-center gap-1.5 text-white/70 hover:text-white text-[13px]">
            Cabinet Dr. Verani
            <ChevronDown size={13} className="text-white/40" />
          </button>
        </div>

        <div className="flex-1 max-w-sm ml-4 relative">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/40" />
          <input
            placeholder="Rechercher…"
            className="w-full bg-white/[0.04] border border-white/[0.08] rounded-lg pl-9 pr-3 h-8 text-[12.5px] text-white placeholder:text-white/40 focus:outline-none focus:border-napoleon-gold/40"
          />
        </div>

        <div className="ml-auto flex items-center gap-1.5">
          <button className="flex items-center gap-1.5 bg-napoleon-deep hover:bg-napoleon-deep/90 text-white text-[12.5px] rounded-lg px-3 h-8 border border-white/10">
            <Plus size={13} strokeWidth={2.2} />
            Nouvelle consultation
          </button>
          <button className="relative w-8 h-8 rounded-lg hover:bg-white/[0.05] flex items-center justify-center text-white/55 hover:text-white">
            <Bell size={15} strokeWidth={1.6} />
            <span className="absolute top-1.5 right-2 w-1.5 h-1.5 bg-napoleon-gold rounded-full" />
          </button>
          <div className="w-8 h-8 rounded-full bg-napoleon-gold/20 border border-napoleon-gold/40 flex items-center justify-center text-napoleon-gold text-[11px] font-medium">
            QV
          </div>
        </div>
      </div>

      {/* Tabs row */}
      <div className="h-11 flex items-center px-6 gap-1 overflow-x-auto">
        {tabs.map((tab) => {
          const isActive = tab === active;
          return (
            <button
              key={tab}
              onClick={() => setActive(tab)}
              className={`relative h-11 px-3.5 text-[13px] whitespace-nowrap transition-colors ${
                isActive ? "text-white" : "text-white/55 hover:text-white"
              }`}
            >
              {tab}
              {isActive && (
                <span className="absolute bottom-[-1px] left-3.5 right-3.5 h-[2px] bg-napoleon-gold rounded-t-full" />
              )}
            </button>
          );
        })}
      </div>
    </header>
  );
}
