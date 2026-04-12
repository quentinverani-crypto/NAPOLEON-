import { Logo } from "@/components/brand/Logo";

export function Footer() {
  return (
    <footer className="relative bg-napoleon-warm-deep border-t border-white/[0.06] overflow-hidden">
      <div className="absolute inset-0 grain-overlay opacity-[0.05] pointer-events-none" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-napoleon-gold-dark/40 to-transparent" />

      <div className="relative mx-auto max-w-7xl px-6 py-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8">
          <div className="space-y-5">
            <Logo variant="horizontal" width={170} height={48} className="h-10 w-auto" />
            <p className="text-white/50 text-sm leading-relaxed max-w-xs">
              La voix médicale souveraine.
              <br />
              Fait avec soin en France.
            </p>
          </div>

          <div>
            <h4 className="text-white/40 text-xs uppercase tracking-[0.2em] mb-5">
              Navigation
            </h4>
            <ul className="space-y-3">
              <li>
                <a href="#probleme" className="text-sm text-white/60 hover:text-white transition-colors">
                  Le constat
                </a>
              </li>
              <li>
                <a href="#solution" className="text-sm text-white/60 hover:text-white transition-colors">
                  La solution
                </a>
              </li>
              <li>
                <a href="#fonctionnement" className="text-sm text-white/60 hover:text-white transition-colors">
                  Fonctionnement
                </a>
              </li>
              <li>
                <a href="#beta" className="text-sm text-napoleon-gold hover:text-napoleon-gold/80 transition-colors">
                  Rejoindre la bêta
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-white/40 text-xs uppercase tracking-[0.2em] mb-5">
              Suivez-nous
            </h4>
            <div className="flex gap-5 mb-6">
              {[
                { label: "LinkedIn", href: "https://linkedin.com" },
                { label: "X", href: "https://x.com" },
                { label: "Instagram", href: "https://instagram.com" },
              ].map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-white/60 hover:text-white transition-colors"
                >
                  {social.label}
                </a>
              ))}
            </div>
            <p className="text-white/30 text-xs">Mentions légales</p>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-white/[0.06]">
          <p className="text-white/30 text-xs text-center tracking-wide">
            © {new Date().getFullYear()} NAPOLEON Medical SAS. Tous droits réservés.
          </p>
        </div>
      </div>
    </footer>
  );
}
