"use client";

import Image from "next/image";
import { ChevronRight, Mic, FileText, Bell, MoreHorizontal } from "lucide-react";

export function NavbarContextualPatient() {
  return (
    <header className="h-[68px] bg-napoleon-black border-b border-white/[0.06] flex items-center px-5 gap-4">
      <div className="flex items-center gap-2">
        <Image src="/logos/napoleon-embleme-negatif.png" alt="" width={28} height={28} />
      </div>

      {/* Breadcrumb + patient */}
      <div className="flex items-center gap-2 text-[13px] min-w-0">
        <span className="text-white/40 hover:text-white cursor-pointer">
          Patients
        </span>
        <ChevronRight size={13} className="text-white/25 shrink-0" />
        <div className="flex items-center gap-2.5 bg-white/[0.04] border border-white/[0.08] rounded-full pl-1 pr-3 py-1">
          <div className="w-6 h-6 rounded-full bg-napoleon-light/20 border border-napoleon-light/30 flex items-center justify-center text-napoleon-light text-[10px] font-medium">
            MD
          </div>
          <span className="text-white text-[13px] font-medium">
            Marie Delacourt
          </span>
          <span className="text-white/35 text-[11px]">· 42 ans</span>
        </div>
        <ChevronRight size={13} className="text-white/25 shrink-0" />
        <span className="text-white/65 font-serif italic">
          Consultation du 17 avril
        </span>
      </div>

      {/* Right actions */}
      <div className="ml-auto flex items-center gap-2">
        {/* Live recording pill */}
        <div className="flex items-center gap-2 bg-red-500/[0.08] border border-red-500/25 rounded-full px-3 py-1.5">
          <span className="relative flex w-2 h-2">
            <span className="absolute inset-0 bg-red-400 rounded-full animate-ping opacity-60" />
            <span className="relative w-2 h-2 bg-red-400 rounded-full" />
          </span>
          <span className="text-red-200 text-[12px] font-medium">
            Enregistrement · 08:24
          </span>
          <Mic size={12} className="text-red-200" />
        </div>

        <button className="flex items-center gap-1.5 bg-napoleon-deep hover:bg-napoleon-deep/90 text-white rounded-lg px-3.5 h-9 text-[12.5px] border border-white/10">
          <FileText size={13} strokeWidth={1.8} />
          Générer le compte rendu
        </button>
        <button className="w-9 h-9 rounded-lg hover:bg-white/[0.05] flex items-center justify-center text-white/55 hover:text-white relative">
          <Bell size={15} strokeWidth={1.6} />
          <span className="absolute top-2 right-2.5 w-1.5 h-1.5 bg-napoleon-gold rounded-full" />
        </button>
        <button className="w-9 h-9 rounded-lg hover:bg-white/[0.05] flex items-center justify-center text-white/55 hover:text-white">
          <MoreHorizontal size={15} />
        </button>
        <div className="w-8 h-8 rounded-full bg-napoleon-gold/20 border border-napoleon-gold/40 flex items-center justify-center text-napoleon-gold text-[11px] font-medium">
          QV
        </div>
      </div>
    </header>
  );
}
