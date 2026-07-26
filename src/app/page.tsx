import Link from "next/link";
import Image from "next/image";
import { DocumentStack } from "./components/DocumentStack";
import { SiteFooter, SiteHeader } from "./components/SiteChrome";

export default function Home() {
  return (
    <>
      <SiteHeader />
      <main>
        <section className="hero" aria-labelledby="hero-title">
          <div className="hero__copy reveal">
            <p className="eyebrow">Le temps médical redevient humain</p>
            <h1 id="hero-title">Retrouvez la relation patient.</h1>
            <p className="hero__lead">
              NAPOLÉON Médical écoute, structure et prépare vos documents pour
              vous laisser pleinement présent face à votre patient.
            </p>
            <div className="hero__actions">
              <a className="button button--primary" href="#beta">Rejoindre la bêta</a>
              <a className="text-link" href="#plateforme">
                Découvrir la plateforme <span aria-hidden="true">→</span>
              </a>
            </div>
            <ul className="trust-line" aria-label="Engagements principaux">
              <li><span className="trust-mark">M</span>Conçu par un médecin</li>
              <li>
                <span className="flag" aria-hidden="true"><i /><i /><i /></span>
                Infrastructure française
              </li>
              <li><span className="trust-mark trust-mark--check">✓</span>Validation par le praticien</li>
            </ul>
          </div>
          <div className="hero__visual">
            <Image
              src="/assets/consultation-medecin-patient.webp"
              alt="Un médecin échange avec sa patiente sans écran entre eux"
              width={900}
              height={992}
              sizes="(max-width: 900px) 100vw, 54vw"
              preload
            />
            <div className="status-note status-note--hero" aria-hidden="true">
              <div className="status-note__head"><span className="status-dot" /><strong>Compte rendu</strong></div>
              <p>en préparation</p>
              <div className="status-lines"><i /><i /><i /></div>
              <small><span className="typing-dots">•••</span> Préparation en cours</small>
            </div>
          </div>
        </section>

        <section className="problem-section" id="plateforme">
          <div className="section-heading reveal">
            <p className="eyebrow">Le constat</p>
            <h2>Pendant la consultation, il faut saisir.<br />Après, il faut encore produire.</h2>
          </div>
          <div className="consultation-rhythm">
            <div className="rhythm-line reveal"><span>01</span><strong>Écouter le patient</strong><p>Comprendre, observer, décider.</p></div>
            <div className="rhythm-line reveal reveal--delay"><span>02</span><strong>Saisir pendant</strong><p>L’attention quitte l’échange pour l’écran.</p></div>
            <div className="rhythm-line reveal reveal--delay-2"><span>03</span><strong>Rédiger après</strong><p>Compte rendu, ordonnance, courrier d’adressage.</p></div>
          </div>
          <p className="problem-closing reveal">NAPOLÉON prend en charge la documentation, sous votre contrôle.</p>
        </section>

        <section className="documents-section" aria-labelledby="documents-title">
          <div className="documents-copy reveal">
            <p className="eyebrow">Les documents créés</p>
            <h2 id="documents-title">Une consultation.<br />Tous les documents prêts.</h2>
            <p>Compte rendu, ordonnance et courrier d’adressage sont préparés ensemble, puis relus et validés par le médecin.</p>
          </div>
          <DocumentStack />
        </section>

        <section className="control-section" aria-labelledby="control-title">
          <div className="control-transition" aria-hidden="true" />
          <div className="control-film">
            <Image
              src="/assets/medecin-ouvre-porte.webp"
              alt="Un médecin ouvre la porte de son cabinet"
              width={1586}
              height={992}
              sizes="100vw"
            />
            <div className="control-film__veil" />
            <div className="control-film__copy reveal">
              <p className="eyebrow eyebrow--gold">Le médecin garde le contrôle</p>
              <h2 id="control-title"><span>NAPOLÉON prépare.</span><span>Vous décidez.</span></h2>
              <p>Chaque document reste sous votre contrôle. Vous relisez, ajustez et validez avant toute utilisation.</p>
            </div>
          </div>
        </section>

        <section className="commitments-section">
          <div className="section-heading reveal">
            <p className="eyebrow">Une confiance concrète</p>
            <h2>Pensé dans la pratique. Maîtrisé par le médecin.</h2>
          </div>
          <div className="commitment-list">
            <article className="commitment reveal"><span>01</span><h3>Conçu par un médecin</h3><p>NAPOLÉON est né d’une réalité quotidienne : trop de temps médical disparaît dans la saisie et la rédaction.</p></article>
            <article className="commitment reveal reveal--delay"><span>02</span><h3>Le praticien reste décisionnaire</h3><p>La plateforme prépare et structure. Le médecin relit, ajuste et valide chaque document.</p></article>
            <article className="commitment reveal reveal--delay-2"><span>03</span><h3>Souveraineté française</h3><p>Une infrastructure française et un environnement HDS sont prévus pour accueillir la bêta dans un cadre médical exigeant.</p></article>
          </div>
          <div className="founder-note reveal">
            <div className="founder-note__portrait" aria-label="Emplacement réservé au portrait de Quentin Verani"><span>QV</span><small>Portrait fondateur</small></div>
            <div className="founder-note__copy">
              <p className="eyebrow">Pourquoi NAPOLÉON</p>
              <h2>Créé à partir de la pratique réelle.</h2>
              <p>« En commençant à prendre en charge mes patients de façon plus autonome, j’ai mesuré tout ce que la documentation retirait à la consultation. NAPOLÉON est né pour rendre ce temps au médecin et au patient. »</p>
              <strong>Quentin Verani — médecin ORL et cofondateur</strong>
              <Link className="text-link" href="/histoire">Découvrir notre histoire <span aria-hidden="true">→</span></Link>
            </div>
          </div>
          <aside className="hospital-note reveal"><p><span>Médecins libéraux d’abord.</span> Une déclinaison adaptée aux établissements de santé est intégrée à la réflexion.</p></aside>
        </section>

        <section className="beta-section" id="beta">
          <div className="beta-copy reveal">
            <p className="eyebrow eyebrow--gold">La bêta</p>
            <h2>Construisons un outil vraiment utile en consultation.</h2>
            <p>La bêta est une phase de coconstruction avec des médecins libéraux. Vos usages, vos contraintes et vos retours guideront les derniers choix avant la commercialisation.</p>
          </div>
          <div className="beta-action reveal reveal--delay">
            <a className="button button--light" href="mailto:contact@napoleonmedical.fr">Rejoindre la bêta</a>
            <small>Une prise de contact simple, sans engagement.</small>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
