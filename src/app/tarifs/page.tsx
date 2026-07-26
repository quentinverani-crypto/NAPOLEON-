import Link from "next/link";
import { SiteFooter, SiteHeader } from "../components/SiteChrome";
export default function TarifsPage() {
  return (
    <><SiteHeader /><main className="inner-page">
      <section className="inner-hero"><p className="eyebrow">Tarifs</p><h1>Des offres lisibles, en cours de finalisation.</h1><p>Nous travaillons encore sur l’équilibre juste entre fonctionnalités, accompagnement et prix. Les offres définitives seront publiées au moment de la commercialisation.</p></section>
      <section className="pricing-current">
        <div className="pricing-label"><span>BÊTA</span><small>Prochaine ouverture</small></div>
        <div className="pricing-copy"><h2>La priorité : coconstruire avec les premiers médecins.</h2><p>Les participants à la bêta découvriront la plateforme, testeront les usages en situation réelle et contribueront aux derniers choix avant le lancement.</p><ul><li>Accès progressif à la plateforme</li><li>Échanges directs avec l’équipe</li><li>Retours intégrés à la feuille de route</li></ul><Link className="button button--primary" href="/#beta">Rejoindre la bêta</Link></div>
      </section>
      <section className="pricing-note reveal"><p className="eyebrow eyebrow--gold">À la commercialisation</p><h2>L’abonnement remplacera naturellement l’inscription à la bêta.</h2><p>Cette page accueillera alors les offres détaillées et leurs fonctionnalités, sans comparaison artificielle ni option cachée.</p></section>
    </main><SiteFooter /></>
  );
}
