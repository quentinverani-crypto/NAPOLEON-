"use client";

import Image from "next/image";
import { useState } from "react";
import { primaryNav, secondaryNav } from "../data";

export function SidebarEditorialDark() {
  const [active, setActive] = useState("Consultations");
  return (
    <aside className="w-[248px] h-full bg-napoleon-black border-r border-white/[0.06] flex flex-col">
      {/* Brand */}
      <div className="px-6 pt-7 pb-8 flex items-center gap-3">
        <Image
          src="/logos/napoleon-embleme-negatif.png"
          alt="Napoléon"
          width={32}
          height={32}
          className="w-7 h-7"
        />
        <div className="font-serif text-white text-lg tracking-tight">
          Napoléon
        </div>
      </div>

      {/* Gold divider */}
      <div className="mx-6 h-px bg-gradient-to-r from-napoleon-gold-dark/50 to-transparent" />

      {/* Primary */}
      <nav className="px-4 pt-6 flex-1 space-y-1">
        {primaryNav.map((item) => {
          const isActive = item.label === active;
          return (
            <button
              key={item.label}
              onClick={() => setActive(item.label)}
              className={`w-full group flex items-center gap-3 px-3 py-2.5 rounded-lg text-[14px] transition-all duration-200 ${
                isActive
                  ? "bg-white/[0.06] text-white"
                  : "text-white/55 hover:text-white hover:bg-white/[0.03]"
              }`}
            >
              {isActive && (
                <span className="absolute left-0 w-[3px] h-6 bg-napoleon-gold rounded-r-full -translate-x-4" />
              )}
              <item.icon
                size={17}
                strokeWidth={1.6}
                className={isActive ? "text-napoleon-gold" : ""}
              />
              <span
                className={
                  isActive ? "font-serif tracking-tight" : "tracking-wide"
                }
              >
                {item.label}
              </span>
              {item.badge && (
                <span className="ml-auto text-[10px] bg-napoleon-deep/50 text-napoleon-light px-1.5 py-0.5 rounded-full">
                  {item.badge}
                </span>
              )}
            </button>
          );
        })}
      </nav>

      {/* Secondary */}
      <div className="px-4 pb-4 space-y-1 border-t border-white/[0.06] pt-4 mx-2">
        {secondaryNav.map((item) => (
          <button
            key={item.label}
            className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-[13px] text-white/40 hover:text-white/80 hover:bg-white/[0.03]"
          >
            <item.icon size={16} strokeWidth={1.6} />
            {item.label}
          </button>
        ))}
      </div>

      {/* Doctor card */}
      <div className="mx-4 mb-4 p-3 rounded-xl border border-white/[0.08] bg-white/[0.02] flex items-center gap-3">
        <div className="w-9 h-9 rounded-full bg-napoleon-gold/20 border border-napoleon-gold/30 flex items-center justify-center text-napoleon-gold text-xs font-medium">
          QV
        </div>
        <div className="min-w-0">
          <div className="text-white text-sm truncate">Dr. Verani</div>
          <div className="text-white/40 text-[11px] truncate">ORL · Libéral</div>
        </div>
      </div>
    </aside>
  );
}
