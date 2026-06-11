import { Eyebrow } from "./ui";
import { Reveal } from "./Reveal";

const STUDIES = [
  {
    tag: "JAMA · Avril 2026",
    body: "Une étude de cohorte parue en avril 2026 dans le JAMA, menée dans 5 CHU américains auprès de plus de 8 000 médecins, démontre que les assistants d’ambiance font gagner du temps aux médecins.",
  },
  {
    tag: "JAMA · Octobre 2025",
    body: "En octobre 2025, une étude publiée dans le JAMA montrait une réduction significative des signes de burn-out : de 52 % à 39 % après un mois d’utilisation.",
  },
];

export function Preuves() {
  return (
    <section id="preuves" className="bg-nap-canvas py-28 sm:py-36">
      <div className="mx-auto max-w-5xl px-5 sm:px-8">
        <div className="max-w-3xl">
          <Reveal>
            <Eyebrow tone="terracotta">
              N° 06 · Ce que montre la science
            </Eyebrow>
          </Reveal>
          <Reveal delay={0.1} blade>
            <h2 className="mt-6 font-news font-medium leading-[1.08] text-nap-ink text-[clamp(2rem,5.5vw,3.4rem)]">
              L’assistance vocale fait ses preuves.
            </h2>
          </Reveal>
        </div>

        <div className="mt-14 grid gap-6 md:grid-cols-2">
          {STUDIES.map((s, i) => (
            <Reveal key={i} delay={i * 0.1} className="h-full">
              <article className="flex h-full flex-col border border-nap-border bg-nap-paper p-8 sm:p-9">
                <span className="nap-hairline-gold mb-6 block h-px w-12" aria-hidden />
                <span className="nap-eyebrow text-nap-gold">{s.tag}</span>
                <p className="mt-5 font-body text-lg leading-relaxed text-nap-inksoft">
                  {s.body}
                </p>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
