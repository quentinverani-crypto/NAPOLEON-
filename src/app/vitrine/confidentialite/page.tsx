import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Politique de confidentialité — NAPOLEON Médical",
  robots: { index: false },
};

export default function Confidentialite() {
  return (
    <main className="mx-auto max-w-2xl px-5 py-24 sm:px-8">
      <a
        href="/vitrine"
        className="nap-eyebrow text-nap-terracotta hover:text-nap-terracotta-deep"
      >
        ← Retour
      </a>
      <h1 className="mt-6 font-news text-4xl font-medium text-nap-ink">
        Politique de confidentialité
      </h1>

      <div className="mt-10 space-y-8 font-body leading-relaxed text-nap-inksoft">
        <section>
          <h2 className="font-news text-xl text-nap-ink">Données collectées</h2>
          <p className="mt-2">
            Le formulaire de demande de démonstration recueille uniquement les
            informations que vous fournissez : nom, adresse e-mail, profil
            d’exercice et, le cas échéant, votre message. Ces données servent
            exclusivement à vous recontacter au sujet de votre demande.
          </p>
        </section>
        <section>
          <h2 className="font-news text-xl text-nap-ink">Aucun traceur</h2>
          <p className="mt-2">
            Ce site n’utilise aucun cookie tiers ni traceur publicitaire. Aucune
            donnée patient n’est traitée par le site vitrine.
          </p>
        </section>
        <section>
          <h2 className="font-news text-xl text-nap-ink">Vos droits</h2>
          <p className="mt-2">
            Conformément au RGPD, vous disposez d’un droit d’accès, de
            rectification et de suppression de vos données. Pour l’exercer :
            [À FOURNIR PAR QUENTIN : adresse e-mail de contact].
          </p>
        </section>
      </div>
    </main>
  );
}
