import Link from "next/link";
import { SiteFooter, SiteHeader } from "../components/SiteChrome";
export default function HistoirePage() {
  return (
    <><SiteHeader /><main className="inner-page">
      <section className="inner-hero"><p className="eyebrow">Notre histoire</p><h1>NAPOLÉON est né dans une consultation.</h1><p>Pas d’une promesse technologique abstraite, mais d’une difficulté vécue : rester pleinement disponible pour le patient tout en produisant une documentation médicale complète.</p></section>
      <section className="story-chapters">
        <article className="story-chapter reveal"><span>01</span><div><p className="eyebrow">Le constat</p><h2>Le temps médical s’efface derrière la documentation.</h2><p>En prenant en charge ses patients de façon plus autonome, Quentin Verani, médecin ORL, mesure combien la saisie, les comptes rendus, les ordonnances et les courriers morcellent la consultation.</p></div></article>
        <article className="story-chapter reveal"><span>02</span><div><p className="eyebrow">L’intention</p><h2>Créer une plateforme qui prépare sans décider.</h2><p>NAPOLÉON structure les informations et prépare les documents. Le médecin conserve le contrôle clinique, éditorial et final. La technologie reste à sa place : en soutien.</p></div></article>
        <article className="story-chapter reveal"><span>03</span><div><p className="eyebrow">La construction</p><h2>Un projet médical, entrepreneurial et français.</h2><p>Le développement associe l’expérience clinique, la conception produit et une stratégie de déploiement pensée avec les professionnels de santé.</p></div></article>
      </section>
      <section className="team-section">
        <div className="section-heading"><p className="eyebrow">L’équipe fondatrice</p><h2>Deux regards complémentaires.</h2></div>
        <div className="team-grid">
          <article className="team-member reveal"><div className="team-portrait">QV</div><div><h3>Quentin Verani</h3><strong>Médecin ORL · Cofondateur et président</strong><p>Il porte la vision médicale, la conception du produit et son ancrage dans la pratique clinique.</p></div></article>
          <article className="team-member reveal reveal--delay"><div className="team-portrait team-portrait--gold">L</div><div><h3>Laury</h3><strong>Directrice générale · Cofondatrice</strong><p>Elle porte la stratégie commerciale, le développement et le passage du projet vers le marché.</p></div></article>
        </div>
      </section>
      <section className="story-cta"><div><p className="eyebrow eyebrow--gold">La prochaine étape</p><h2>La bêta sera construite avec les médecins.</h2></div><Link className="button button--light" href="/#beta">Rejoindre la bêta</Link></section>
    </main><SiteFooter /></>
  );
}
