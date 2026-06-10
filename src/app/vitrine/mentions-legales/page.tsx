import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Mentions légales — NAPOLEON Médical",
  robots: { index: false },
};

export default function MentionsLegales() {
  return (
    <main className="mx-auto max-w-2xl px-5 py-24 sm:px-8">
      <a
        href="/vitrine"
        className="nap-eyebrow text-nap-terracotta hover:text-nap-terracotta-deep"
      >
        ← Retour
      </a>
      <h1 className="mt-6 font-news text-4xl font-medium text-nap-ink">
        Mentions légales
      </h1>

      <div className="mt-10 space-y-8 font-body leading-relaxed text-nap-inksoft">
        <section>
          <h2 className="font-news text-xl text-nap-ink">Éditeur</h2>
          <p className="mt-2">
            NAPOLEON SAS · [À FOURNIR PAR QUENTIN : SIREN, capital social,
            adresse du siège]. Née à Perpignan, conçue pour la médecine
            française.
          </p>
        </section>
        <section>
          <h2 className="font-news text-xl text-nap-ink">
            Directeur de la publication
          </h2>
          <p className="mt-2">[À FOURNIR PAR QUENTIN]</p>
        </section>
        <section>
          <h2 className="font-news text-xl text-nap-ink">Hébergement</h2>
          <p className="mt-2">
            [À FOURNIR PAR QUENTIN : hébergeur du site vitrine]. Le site vitrine
            ne traite aucune donnée de santé.
          </p>
        </section>
        <section>
          <h2 className="font-news text-xl text-nap-ink">Contact</h2>
          <p className="mt-2">[À FOURNIR PAR QUENTIN : adresse e-mail de contact]</p>
        </section>
      </div>
    </main>
  );
}
