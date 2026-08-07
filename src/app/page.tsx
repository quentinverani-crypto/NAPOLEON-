import Link from "next/link";
import { DocumentStack } from "./components/DocumentStack";
import { BetaForm } from "./components/BetaForm";
import { HeroExperience } from "./components/HeroExperience";
import { SiteFooter, SiteHeader } from "./components/SiteChrome";

export default function Home() {
  return (
    <>
      <SiteHeader />
      <main>
        <HeroExperience />

        <section className="documents-section" id="documents" aria-labelledby="documents-title">
          <div className="documents-copy reveal">
            <p className="eyebrow">Les documents créés</p>
            <h2 id="documents-title">Une consultation.<br />Tous les documents prêts.</h2>
            <p>Compte rendu, ordonnance et courrier d’adressage sont préparés ensemble, puis relus et validés par le médecin.</p>
          </div>
          <DocumentStack />
        </section>

        <section className="compact-trust" aria-labelledby="trust-title">
          <div className="compact-trust__heading reveal">
            <p className="eyebrow">Une confiance concrète</p>
            <h2 id="trust-title">NAPOLÉON prépare.<br />Vous décidez.</h2>
          </div>
          <div className="compact-trust__proofs">
            <article className="reveal"><span>01</span><strong>Conçu par un médecin</strong><p>Né de la pratique réelle et des contraintes de la consultation.</p></article>
            <article className="reveal reveal--delay"><span>02</span><strong>Le praticien reste décisionnaire</strong><p>NAPOLÉON prépare. Vous relisez, ajustez et validez.</p></article>
            <article className="reveal reveal--delay-2"><span>03</span><strong>Souveraineté française</strong><p>Infrastructure française, avec un environnement HDS prévu pour la bêta.</p></article>
          </div>
          <Link className="text-link compact-trust__link" href="/histoire">Découvrir notre histoire <span aria-hidden="true">→</span></Link>
        </section>

        <section className="beta-section" id="beta">
          <div className="beta-copy reveal">
            <p className="eyebrow eyebrow--gold">La bêta</p>
            <h2>Construisons un outil vraiment utile en consultation.</h2>
            <p>La bêta est une phase de coconstruction avec des médecins libéraux. Vos usages, vos contraintes et vos retours guideront les derniers choix avant la commercialisation.</p>
            <ul className="beta-benefits" aria-label="Ce que propose la bêta">
              <li>Accès prioritaire à la bêta</li>
              <li>Échange direct avec l’équipe fondatrice</li>
              <li>Participation aux derniers choix produit</li>
            </ul>
          </div>
          <div className="reveal reveal--delay">
            <BetaForm />
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
