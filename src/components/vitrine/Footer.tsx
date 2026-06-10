import Image from "next/image";

export function Footer() {
  return (
    <footer className="border-t border-white/10 bg-nap-ink py-14 text-nap-ivory/70">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <div className="flex flex-col gap-8 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-3">
            <Image
              src="/vitrine/embleme-or.png"
              alt=""
              width={44}
              height={44}
              className="h-11 w-11 object-contain"
            />
            <div>
              <p className="font-news text-lg text-nap-ivory">
                NAPOLEON Médical
              </p>
              <p className="nap-eyebrow text-nap-gold/80">
                La voix médicale souveraine
              </p>
            </div>
          </div>

          <nav className="flex flex-wrap items-center gap-x-6 gap-y-2 font-body text-sm">
            <a
              href="/vitrine/mentions-legales"
              className="transition-colors hover:text-nap-ivory"
            >
              Mentions légales
            </a>
            <a
              href="/vitrine/confidentialite"
              className="transition-colors hover:text-nap-ivory"
            >
              Politique de confidentialité
            </a>
            <a
              href="#demo"
              className="transition-colors hover:text-nap-ivory"
            >
              Contact
            </a>
          </nav>
        </div>

        <div className="mt-10 border-t border-white/10 pt-6 font-body text-xs leading-relaxed text-nap-muted">
          <p>
            NAPOLEON SAS · [À FOURNIR PAR QUENTIN : SIREN, adresse] · Née à
            Perpignan, conçue pour la médecine française.
          </p>
          <p className="mt-2">
            Site conçu et hébergé dans le respect du RGPD. Aucun traceur
            publicitaire.
          </p>
        </div>
      </div>
    </footer>
  );
}
