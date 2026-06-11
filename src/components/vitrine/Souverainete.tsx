import { Eyebrow } from "./ui";
import { Reveal } from "./Reveal";

const VALUES = [
  {
    title: "Traçabilité",
    quote: "Un outil au service du médecin, jamais l’inverse.",
    body: "Chaque validation est horodatée et ancrée : une preuve infalsifiable, sans aucune donnée patient exposée.",
  },
  {
    title: "Souveraineté",
    quote: "Les données de santé restent en France.",
    body: "IA française, datacenters français, normes les plus strictes.",
  },
  {
    title: "Humanité",
    quote: "L’exigence du soin, l’humanité du lien.",
    body: "L’écoute et le regard reviennent au centre de la consultation. Pour le patient : une consultation où le médecin est réellement présent.",
  },
];

export function Souverainete() {
  return (
    <section id="souverainete" className="bg-nap-ivory py-28 sm:py-36">
      <div className="mx-auto max-w-5xl px-5 sm:px-8">
        <div className="max-w-3xl">
          <Reveal>
            <Eyebrow tone="terracotta">N° 05 · Souveraineté</Eyebrow>
          </Reveal>
          <Reveal delay={0.1} blade>
            <h2 className="mt-6 font-news font-medium leading-[1.08] text-nap-ink text-[clamp(2rem,5.5vw,3.4rem)]">
              100 % française. De bout en bout.
            </h2>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="mt-7 font-body text-lg leading-relaxed text-nap-inksoft">
              Tous nos partenaires sont français. Hébergement certifié HDS à
              Paris. Aucune donnée patient ne quitte la France.
            </p>
          </Reveal>
        </div>

        {/* Triptyque des valeurs */}
        <div className="mt-16 grid gap-px overflow-hidden rounded-2xl border border-nap-border bg-nap-border sm:grid-cols-3">
          {VALUES.map((v, i) => (
            <Reveal key={v.title} delay={i * 0.08} className="h-full">
              <div className="flex h-full flex-col bg-nap-paper px-7 py-9">
                {/* Filet or fin au-dessus de chaque colonne */}
                <span
                  className="mb-6 block h-px w-12 nap-hairline-gold"
                  aria-hidden
                />
                <h3 className="font-news text-2xl text-nap-ink">{v.title}</h3>
                <p className="mt-3 font-body italic text-nap-terracotta-deep">
                  «&nbsp;{v.quote}&nbsp;»
                </p>
                <p className="mt-4 font-body leading-relaxed text-nap-inksoft">
                  {v.body}
                </p>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal>
          <p className="mx-auto mt-16 max-w-3xl text-center font-news font-medium leading-snug text-nap-ink text-[clamp(1.4rem,3.6vw,2.2rem)]">
            Là où d’autres se contentent d’automatiser, NAPOLEON protège la
            donnée et réhumanise la consultation.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
