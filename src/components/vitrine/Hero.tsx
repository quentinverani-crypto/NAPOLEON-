import { Eyebrow, DemoButton } from "./ui";
import { Reveal } from "./Reveal";

export function Hero() {
  return (
    <section
      id="accueil"
      className="relative flex min-h-[100svh] items-center overflow-hidden bg-nap-ivory pt-24 pb-28"
    >
      {/* Filet or 70° discret en arrière-plan (un seul par écran) */}
      <div
        className="nap-filet-70 left-[18%] top-[-10%] h-[120%]"
        aria-hidden
      />

      <div className="mx-auto w-full max-w-5xl px-5 sm:px-8">
        <Reveal>
          <Eyebrow tone="terracotta">
            Assistant de consultation médical
          </Eyebrow>
        </Reveal>

        <Reveal delay={0.1} blade>
          <h1 className="mt-6 font-news text-nap-ink font-medium leading-[1.04] text-[clamp(2.6rem,8vw,5.6rem)]">
            Face au patient.
            <br />
            <span className="text-nap-blue">Pas à l&apos;écran.</span>
          </h1>
        </Reveal>

        <Reveal delay={0.2}>
          <p className="mt-8 max-w-2xl font-body text-lg leading-relaxed text-nap-inksoft sm:text-xl">
            NAPOLEON Médical écoute la consultation et prépare comptes-rendus,
            ordonnances et courriers — prêts à valider. Vous restez concentré
            sur ce qui compte : votre patient.
          </p>
        </Reveal>

        <Reveal delay={0.3}>
          <div className="mt-10 flex flex-wrap items-center gap-x-7 gap-y-4">
            <DemoButton>Demander une démo</DemoButton>
            <a
              href="#constat"
              className="group inline-flex items-center gap-2 text-sm font-medium text-nap-inksoft transition-colors hover:text-nap-ink"
            >
              Découvrir
              <span className="transition-transform duration-300 group-hover:translate-y-0.5">
                ↓
              </span>
            </a>
          </div>
        </Reveal>
      </div>

      {/* Filet d'or horizontal, fin et discret, en bas du hero */}
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 mx-auto h-px w-[min(80vw,640px)] nap-hairline-gold"
        aria-hidden
      />
    </section>
  );
}
