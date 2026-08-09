import Link from "next/link";
import Image from "next/image";
const navItems = [
  { href: "/#documents", label: "La plateforme" },
  { href: "/histoire", label: "Notre histoire" },
  { href: "/tarifs", label: "Tarifs" },
];
export function SiteHeader() {
  return (
    <header className="site-header">
      <Link className="site-logo" href="/" aria-label="NAPOLÉON Médical — Accueil">
        <Image
          src="/assets/napoleon-medical-logo-transparent.png"
          alt="NAPOLÉON Médical"
          width={869}
          height={175}
          sizes="(max-width: 900px) 205px, 282px"
        />
      </Link>
      <nav className="desktop-nav" aria-label="Navigation principale">
        {navItems.map((item) => <Link href={item.href} key={item.href}>{item.label}</Link>)}
        <Link className="button button--nav" href="/#beta">Rejoindre la bêta</Link>
      </nav>
      <details className="mobile-nav">
        <summary aria-label="Ouvrir la navigation"><span /><span /></summary>
        <nav aria-label="Navigation mobile">
          {navItems.map((item) => <Link href={item.href} key={item.href}>{item.label}</Link>)}
          <Link className="button button--primary" href="/#beta">Rejoindre la bêta</Link>
        </nav>
      </details>
    </header>
  );
}
export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div>
        <Image
          src="/assets/napoleon-medical-logo-transparent.png"
          alt="NAPOLÉON Médical"
          width={869}
          height={175}
          sizes="270px"
        />
        <p>Retrouvez la relation patient.</p>
      </div>
      <nav aria-label="Pied de page"><Link href="/#documents">La plateforme</Link><Link href="/histoire">Notre histoire</Link><Link href="/tarifs">Tarifs</Link><a href="mailto:contact@napoleonmedical.fr">Contact</a></nav>
      <small>© 2026 NAPOLÉON Médical.</small>
    </footer>
  );
}
