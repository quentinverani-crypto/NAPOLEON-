/** Identité publique du site — source unique pour metadata, robots, sitemap et JSON-LD. */
export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://napoleonmedical.fr"
).replace(/\/$/, "");

export const SITE_NAME = "NAPOLEON Médical";

export const SITE_TAGLINE = "La voix médicale souveraine";

export const SITE_DESCRIPTION =
  "NAPOLEON Médical est un assistant IA de consultation français : il écoute la consultation et génère automatiquement dossier médical, comptes rendus et ordonnances. Données hébergées en France. Bêta gratuite ouverte aux médecins.";

export const SITE_LOGO = `${SITE_URL}/logos/napoleon-emblem-v2-navy.png`;
