"use client";

import Image from "next/image";
import { useState } from "react";
import { primaryNav, secondaryNav } from "../data";

export function SidebarIconRail() {
  const [active, setActive] = useState("Agenda");
  return (
    <aside className="w-[68px] h-full bg-napoleon-warm-deep border-r border-white/[0.06] flex flex-col items-center py-4">
      {/* Emblem */}
      <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-napoleon-deep/30 border border-white/10 mb-6">
        <Image src="/logos/napoleon-embleme-negatif.png" alt="" width={22} height={22} />
      </div>

      {/* Items */}
      <nav className="flex-1 flex flex-col gap-1 items-center">
        {primaryNav.map((item) => {
          const isActive = item.label === active;
          return (
            <div key={item.label} className="relative group">
              <button
                onClick={() => setActive(item.label)}
                className={`relative w-11 h-11 rounded-xl flex items-center justify-center transition-all duration-200 ${
                  isActive
                    ? "bg-white/[0.08] text-napoleon-gold"
                    : "text-white/50 hover:text-white hover:bg-white/[0.04]"
                }`}
              >
                <item.icon size={19} strokeWidth={1.6} />
                {item.badge && (
                  <span className="absolute top-1 right-1 w-[7px] h-[7px] bg-napoleon-gold rounded-full" />
                )}
                {isActive && (
                  <span className="absolute -left-4 top-1/2 -translate-y-1/2 w-[3px] h-5 bg-napoleon-gold rounded-r-full" />
                )}
              </button>

              {/* Tooltip */}
              <span className="pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity absolute left-full top-1/2 -translate-y-1/2 ml-3 px-2.5 py-1.5 rounded-md bg-napoleon-black border border-white/10 text-white text-xs whitespace-nowrap z-50">
                {item.label}
              </span>
            </div>
          );
        })}
      </nav>

      <div className="flex flex-col gap-1 items-center border-t border-white/[0.06] pt-3 w-10">
        {secondaryNav.map((item) => (
          <button
            key={item.label}
            className="w-11 h-11 rounded-xl flex items-center justify-center text-white/40 hover:text-white hover:bg-white/[0.04]"
          >
            <item.icon size={17} strokeWidth={1.6} />
          </button>
        ))}
        <div className="mt-3 w-9 h-9 rounded-full bg-napoleon-gold/20 border border-napoleon-gold/40 flex items-center justify-center text-napoleon-gold text-[11px] font-medium">
          QV
        </div>
      </div>
    </aside>
  );
}
