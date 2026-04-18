"use client";

import Image from "next/image";
import { useState } from "react";
import { primaryNav, secondaryNav } from "../data";

export function SidebarExpandableRail() {
  const [active, setActive] = useState("Messagerie");
  const [hover, setHover] = useState(false);
  return (
    <aside
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      className="h-full bg-napoleon-black border-r border-white/[0.06] flex flex-col transition-[width] duration-300 overflow-hidden"
      style={{ width: hover ? 232 : 68 }}
    >
      <div className="px-4 pt-5 pb-6 flex items-center gap-3">
        <Image src="/logos/napoleon-embleme-negatif.png" alt="" width={28} height={28} className="w-7 h-7 shrink-0" />
        <span
          className={`font-serif text-white text-lg tracking-tight transition-opacity duration-200 whitespace-nowrap ${
            hover ? "opacity-100" : "opacity-0"
          }`}
        >
          Napoléon
        </span>
      </div>

      <nav className="flex-1 px-3 space-y-0.5 overflow-hidden">
        {primaryNav.map((item) => {
          const isActive = item.label === active;
          return (
            <button
              key={item.label}
              onClick={() => setActive(item.label)}
              className={`w-full flex items-center gap-3 px-2.5 py-2.5 rounded-lg text-[14px] transition-colors duration-200 whitespace-nowrap ${
                isActive
                  ? "bg-napoleon-deep/25 text-white"
                  : "text-white/55 hover:text-white hover:bg-white/[0.04]"
              }`}
            >
              <item.icon
                size={18}
                strokeWidth={1.6}
                className={`shrink-0 ${isActive ? "text-napoleon-light" : ""}`}
              />
              <span
                className={`transition-opacity duration-200 ${
                  hover ? "opacity-100" : "opacity-0"
                }`}
              >
                {item.label}
              </span>
              {item.badge && hover && (
                <span className="ml-auto text-[10px] bg-napoleon-light/20 text-napoleon-light px-1.5 py-0.5 rounded-full">
                  {item.badge}
                </span>
              )}
            </button>
          );
        })}
      </nav>

      <div className="px-3 py-3 border-t border-white/[0.06] space-y-0.5">
        {secondaryNav.map((item) => (
          <button
            key={item.label}
            className="w-full flex items-center gap-3 px-2.5 py-2 rounded-lg text-[13px] text-white/40 hover:text-white hover:bg-white/[0.04] whitespace-nowrap"
          >
            <item.icon size={16} strokeWidth={1.6} className="shrink-0" />
            <span className={`transition-opacity duration-200 ${hover ? "opacity-100" : "opacity-0"}`}>
              {item.label}
            </span>
          </button>
        ))}
      </div>
    </aside>
  );
}
