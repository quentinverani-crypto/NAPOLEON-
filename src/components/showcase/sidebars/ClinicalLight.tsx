"use client";

import Image from "next/image";
import { useState } from "react";
import { ChevronRight } from "lucide-react";
import { primaryNav, secondaryNav } from "../data";

export function SidebarClinicalLight() {
  const [active, setActive] = useState("Patients");
  return (
    <aside
      className="w-[264px] h-full flex flex-col border-r border-black/[0.06]"
      style={{ background: "#faf8f4" }}
    >
      {/* Brand */}
      <div className="px-6 pt-6 pb-6 border-b border-black/[0.05] flex items-center gap-3">
        <div className="w-9 h-9 rounded-xl bg-napoleon-black flex items-center justify-center">
          <Image
            src="/logos/napoleon-embleme-negatif.png"
            alt=""
            width={22}
            height={22}
          />
        </div>
        <div>
          <div className="font-serif text-napoleon-black text-[17px] tracking-tight leading-none">
            Napoléon
          </div>
          <div className="text-black/40 text-[10px] mt-1 uppercase tracking-[0.18em]">
            Médical
          </div>
        </div>
      </div>

      <nav className="px-3 pt-5 flex-1 space-y-0.5">
        <div className="px-3 pb-2 text-[10px] uppercase tracking-[0.2em] text-black/35 font-medium">
          Espace de travail
        </div>
        {primaryNav.map((item) => {
          const isActive = item.label === active;
          return (
            <button
              key={item.label}
              onClick={() => setActive(item.label)}
              className={`w-full group flex items-center gap-3 px-3 py-2.5 rounded-lg text-[14px] transition-all duration-150 ${
                isActive
                  ? "bg-white text-napoleon-black shadow-[0_1px_3px_rgba(0,0,0,0.04),0_1px_2px_rgba(0,0,0,0.02)] border border-black/[0.04]"
                  : "text-black/60 hover:text-napoleon-black hover:bg-white/70"
              }`}
            >
              <item.icon
                size={17}
                strokeWidth={1.7}
                className={isActive ? "text-napoleon-deep" : ""}
              />
              <span className={isActive ? "font-medium" : ""}>{item.label}</span>
              {item.badge && (
                <span className="ml-auto text-[10px] bg-napoleon-deep text-white px-1.5 py-0.5 rounded-full font-medium">
                  {item.badge}
                </span>
              )}
              {isActive && !item.badge && (
                <ChevronRight size={14} className="ml-auto text-black/30" />
              )}
            </button>
          );
        })}
      </nav>

      <div className="px-3 pb-4 pt-3 border-t border-black/[0.05] space-y-0.5">
        {secondaryNav.map((item) => (
          <button
            key={item.label}
            className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-[13px] text-black/50 hover:text-napoleon-black hover:bg-white/70"
          >
            <item.icon size={15} strokeWidth={1.7} />
            {item.label}
          </button>
        ))}

        <div className="mt-4 p-3 rounded-xl bg-napoleon-black text-white">
          <div className="text-[11px] text-white/60 uppercase tracking-wider mb-1">
            Plan Bêta
          </div>
          <div className="text-sm text-white mb-2">
            Accès complet pendant la bêta
          </div>
          <button className="text-[11px] text-napoleon-gold underline underline-offset-2">
            Voir les détails →
          </button>
        </div>
      </div>
    </aside>
  );
}
