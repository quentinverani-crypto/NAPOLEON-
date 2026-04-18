"use client";

import Image from "next/image";
import { useState } from "react";
import {
  LayoutDashboard,
  Stethoscope,
  Users,
  Calendar,
  FileText,
  Pill,
  MessageSquare,
  Receipt,
  Settings,
  HelpCircle,
  UserCircle,
} from "lucide-react";

type Group = {
  title: string;
  items: { label: string; icon: typeof LayoutDashboard; badge?: number }[];
};

const groups: Group[] = [
  {
    title: "Aujourd'hui",
    items: [
      { label: "Tableau de bord", icon: LayoutDashboard },
      { label: "Consultations", icon: Stethoscope, badge: 3 },
      { label: "Agenda", icon: Calendar },
    ],
  },
  {
    title: "Clinique",
    items: [
      { label: "Patients", icon: Users },
      { label: "Comptes rendus", icon: FileText },
      { label: "Ordonnances", icon: Pill },
    ],
  },
  {
    title: "Administratif",
    items: [
      { label: "Messagerie", icon: MessageSquare, badge: 12 },
      { label: "Facturation", icon: Receipt },
    ],
  },
];

export function SidebarGroupedSections() {
  const [active, setActive] = useState("Consultations");
  return (
    <aside className="w-[272px] h-full bg-napoleon-warm flex flex-col border-r border-white/[0.06]">
      <div className="px-5 pt-5 pb-5 flex items-center gap-3 border-b border-white/[0.05]">
        <Image src="/logos/napoleon-embleme-negatif.png" alt="" width={30} height={30} />
        <div>
          <div className="font-serif text-white text-[17px] tracking-tight leading-none">
            Napoléon
          </div>
          <div className="text-white/40 text-[10px] mt-1 uppercase tracking-[0.2em]">
            Cabinet Dr. Verani
          </div>
        </div>
      </div>

      <nav className="flex-1 px-3 pt-5 overflow-y-auto">
        {groups.map((g) => (
          <div key={g.title} className="mb-6">
            <div className="px-3 mb-2 text-[10px] uppercase tracking-[0.22em] text-napoleon-gold/80 font-medium font-serif italic">
              {g.title}
            </div>
            <div className="space-y-0.5">
              {g.items.map((item) => {
                const isActive = item.label === active;
                return (
                  <button
                    key={item.label}
                    onClick={() => setActive(item.label)}
                    className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-[13.5px] transition-all ${
                      isActive
                        ? "bg-white/[0.07] text-white border border-white/[0.08]"
                        : "text-white/55 hover:text-white hover:bg-white/[0.03] border border-transparent"
                    }`}
                  >
                    <item.icon
                      size={16}
                      strokeWidth={1.6}
                      className={isActive ? "text-napoleon-gold" : ""}
                    />
                    <span>{item.label}</span>
                    {item.badge && (
                      <span className="ml-auto text-[10px] bg-napoleon-gold/20 text-napoleon-gold px-1.5 py-0.5 rounded-full">
                        {item.badge}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </nav>

      {/* Current patient card */}
      <div className="mx-3 mb-3 p-3 rounded-xl bg-gradient-to-br from-napoleon-deep/25 to-napoleon-purple/10 border border-napoleon-light/20">
        <div className="flex items-center gap-2 text-[10px] uppercase tracking-[0.18em] text-napoleon-light/80 font-medium mb-2">
          <UserCircle size={12} />
          Consultation en cours
        </div>
        <div className="text-white text-sm">Marie Delacourt</div>
        <div className="text-white/50 text-[11px] mt-0.5">
          14h30 · Suivi post-op
        </div>
        <button className="mt-3 w-full text-[12px] text-white bg-white/10 hover:bg-white/15 rounded-lg py-1.5 border border-white/10">
          Reprendre
        </button>
      </div>

      <div className="px-3 pb-3 flex gap-1">
        <button className="flex-1 flex items-center gap-2 px-3 py-2 rounded-lg text-[12px] text-white/50 hover:text-white hover:bg-white/[0.04]">
          <Settings size={14} />
          Réglages
        </button>
        <button className="flex items-center justify-center w-9 h-9 rounded-lg text-white/50 hover:text-white hover:bg-white/[0.04]">
          <HelpCircle size={14} />
        </button>
      </div>
    </aside>
  );
}
