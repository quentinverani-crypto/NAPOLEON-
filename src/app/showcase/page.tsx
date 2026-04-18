import { SidebarEditorialDark } from "@/components/showcase/sidebars/EditorialDark";
import { SidebarClinicalLight } from "@/components/showcase/sidebars/ClinicalLight";
import { SidebarIconRail } from "@/components/showcase/sidebars/IconRail";
import { SidebarExpandableRail } from "@/components/showcase/sidebars/ExpandableRail";
import { SidebarGroupedSections } from "@/components/showcase/sidebars/GroupedSections";

import { NavbarMinimal } from "@/components/showcase/navbars/Minimal";
import { NavbarFloatingPill } from "@/components/showcase/navbars/FloatingPill";
import { NavbarCommandPalette } from "@/components/showcase/navbars/CommandPalette";
import { NavbarContextualPatient } from "@/components/showcase/navbars/ContextualPatient";
import { NavbarTabsUnder } from "@/components/showcase/navbars/TabsUnder";

type ShowcaseProps = {
  label: string;
  tag: string;
  description: string;
  height?: number;
  children: React.ReactNode;
};

function Frame({ label, tag, description, height = 520, children }: ShowcaseProps) {
  return (
    <section className="space-y-4">
      <div className="flex items-baseline justify-between gap-4">
        <div>
          <div className="flex items-center gap-3 mb-1">
            <span className="text-napoleon-gold text-[10px] uppercase tracking-[0.25em] font-mono">
              {tag}
            </span>
          </div>
          <h3 className="font-serif text-white text-2xl tracking-tight">
            {label}
          </h3>
          <p className="text-white/50 text-sm mt-1 max-w-xl">{description}</p>
        </div>
      </div>
      <div
        className="rounded-2xl overflow-hidden border border-white/10 bg-napoleon-black shadow-[0_20px_60px_-20px_rgba(0,0,0,0.5)]"
        style={{ height }}
      >
        {children}
      </div>
    </section>
  );
}

function DummyAppContent({ title = "Consultations" }: { title?: string }) {
  return (
    <div className="flex-1 p-10 overflow-hidden bg-napoleon-black">
      <div className="text-white/30 text-[11px] uppercase tracking-[0.2em] font-mono mb-3">
        Zone principale
      </div>
      <h1 className="font-serif text-white text-4xl tracking-tight mb-6">
        {title}
      </h1>
      <div className="grid grid-cols-3 gap-4">
        {[0, 1, 2, 3, 4, 5].map((i) => (
          <div
            key={i}
            className="h-28 rounded-xl bg-white/[0.03] border border-white/[0.06]"
          />
        ))}
      </div>
    </div>
  );
}

export default function ShowcasePage() {
  return (
    <main className="min-h-screen bg-napoleon-warm-deep py-16 lg:py-20">
      <div className="mx-auto max-w-[1400px] px-6">
        {/* Header */}
        <div className="mb-16">
          <div className="text-napoleon-gold text-[11px] uppercase tracking-[0.3em] font-mono mb-3">
            Showcase · UI chrome
          </div>
          <h1
            className="font-serif text-white leading-[1.05] tracking-tight mb-4"
            style={{ fontSize: "clamp(2.5rem, 5vw, 4rem)" }}
          >
            Navigations &amp; <span className="italic text-napoleon-light">sidebars</span>
          </h1>
          <p className="text-white/55 text-lg max-w-2xl leading-relaxed">
            Cinq pistes pour chaque — sidebar et barre du haut — toutes alignées
            sur l&apos;identité Napoléon. Choisis les partis-pris qui te parlent
            et on affine.
          </p>
        </div>

        {/* ===== SIDEBARS ===== */}
        <div className="mb-8 flex items-center gap-4">
          <div className="h-px flex-1 bg-white/10" />
          <span className="text-white/40 text-xs uppercase tracking-[0.3em] font-mono">
            01 · Sidebars
          </span>
          <div className="h-px flex-1 bg-white/10" />
        </div>

        <div className="space-y-14">
          <Frame
            tag="Sidebar A"
            label="Editorial Dark"
            description="Fond noir, touche dorée sur l'item actif, label actif en serif. Identité directe héritée du hero."
          >
            <div className="flex h-full">
              <SidebarEditorialDark />
              <DummyAppContent title="Consultations du jour" />
            </div>
          </Frame>

          <Frame
            tag="Sidebar B"
            label="Clinical Light"
            description="Fond ivoire chaud, ambiance feutrée, haute lisibilité. Pour un positionnement plus clinique / hospitalier."
          >
            <div className="flex h-full">
              <SidebarClinicalLight />
              <DummyAppContent title="Patients" />
            </div>
          </Frame>

          <Frame
            tag="Sidebar C"
            label="Icon Rail"
            description="Rail ultra-compact de 68px — icônes seules + tooltip au survol. Maximum d'espace pour le contenu."
            height={480}
          >
            <div className="flex h-full">
              <SidebarIconRail />
              <DummyAppContent title="Agenda" />
            </div>
          </Frame>

          <Frame
            tag="Sidebar D"
            label="Expandable Rail"
            description="Rail replié par défaut, qui s'ouvre sur les labels au survol. Compromis compact / lisible."
          >
            <div className="flex h-full">
              <SidebarExpandableRail />
              <DummyAppContent title="Messagerie" />
            </div>
          </Frame>

          <Frame
            tag="Sidebar E"
            label="Grouped Sections"
            description="Navigation groupée par contexte (Aujourd'hui, Clinique, Admin) + card de consultation active en bas. Le plus riche fonctionnellement."
          >
            <div className="flex h-full">
              <SidebarGroupedSections />
              <DummyAppContent title="Consultations" />
            </div>
          </Frame>
        </div>

        {/* ===== NAVBARS ===== */}
        <div className="mt-24 mb-8 flex items-center gap-4">
          <div className="h-px flex-1 bg-white/10" />
          <span className="text-white/40 text-xs uppercase tracking-[0.3em] font-mono">
            02 · Navbars
          </span>
          <div className="h-px flex-1 bg-white/10" />
        </div>

        <div className="space-y-14">
          <Frame
            tag="Navbar A"
            label="Minimal"
            description="Logo + recherche + compte utilisateur. Discrète et classique, s'efface devant le contenu."
            height={240}
          >
            <div className="flex flex-col h-full">
              <NavbarMinimal />
              <div className="flex-1 bg-napoleon-black" />
            </div>
          </Frame>

          <Frame
            tag="Navbar B"
            label="Floating Pill"
            description="Barre flottante en pill arrondie, mini-nav intégrée, CTA de création mis en avant. Plus produit, plus moderne."
            height={280}
          >
            <div className="flex flex-col h-full">
              <NavbarFloatingPill />
              <div className="flex-1 bg-napoleon-black" />
            </div>
          </Frame>

          <Frame
            tag="Navbar C"
            label="Command Palette"
            description="Une grosse barre de recherche IA centrée avec ⌘K comme action primaire. Philosophie AI-first."
            height={260}
          >
            <div className="flex flex-col h-full">
              <NavbarCommandPalette />
              <div className="flex-1 bg-napoleon-black" />
            </div>
          </Frame>

          <Frame
            tag="Navbar D"
            label="Contextual Patient"
            description="Fil d'Ariane avec le patient courant, pill d'enregistrement live, CTA de génération de compte rendu. Pensée pour le flow consultation."
            height={260}
          >
            <div className="flex flex-col h-full">
              <NavbarContextualPatient />
              <div className="flex-1 bg-napoleon-black" />
            </div>
          </Frame>

          <Frame
            tag="Navbar E"
            label="Tabs Under"
            description="Barre principale + rangée d'onglets en dessous (app à nombreuses sections). Plus classique, très lisible."
            height={320}
          >
            <div className="flex flex-col h-full">
              <NavbarTabsUnder />
              <div className="flex-1 bg-napoleon-black" />
            </div>
          </Frame>
        </div>

        {/* Footer note */}
        <div className="mt-20 pt-10 border-t border-white/10">
          <p className="text-white/40 text-sm text-center">
            Dis-moi quelles pistes te parlent (ex. « Sidebar E + Navbar D ») et
            je les combine pour construire la vraie app.
          </p>
        </div>
      </div>
    </main>
  );
}
