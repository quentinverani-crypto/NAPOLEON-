import {
  SITE_DESCRIPTION,
  SITE_LOGO,
  SITE_NAME,
  SITE_TAGLINE,
  SITE_URL,
} from "@/lib/site";

const ORG_ID = `${SITE_URL}/#organization`;
const WEBSITE_ID = `${SITE_URL}/#website`;
const APP_ID = `${SITE_URL}/#software`;

// Ne déclare que des faits affichés sur le site (pas d'avis, de note ni de
// profils sociaux tant qu'ils n'existent pas publiquement).
const graph = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": ORG_ID,
      name: SITE_NAME,
      alternateName: ["NAPOLEON Medical", "Napoléon Médical"],
      url: `${SITE_URL}/`,
      logo: { "@type": "ImageObject", url: SITE_LOGO },
      slogan: SITE_TAGLINE,
      description: SITE_DESCRIPTION,
      areaServed: { "@type": "Country", name: "France" },
      knowsAbout: [
        "Assistant IA de consultation médicale",
        "Reconnaissance vocale médicale",
        "Génération automatique de comptes rendus médicaux",
        "Souveraineté des données de santé",
      ],
    },
    {
      "@type": "WebSite",
      "@id": WEBSITE_ID,
      url: `${SITE_URL}/`,
      name: SITE_NAME,
      description: SITE_DESCRIPTION,
      inLanguage: "fr-FR",
      publisher: { "@id": ORG_ID },
    },
    {
      "@type": "SoftwareApplication",
      "@id": APP_ID,
      name: SITE_NAME,
      url: `${SITE_URL}/`,
      applicationCategory: "HealthApplication",
      applicationSubCategory: "Assistant IA de consultation médicale",
      operatingSystem: "Web",
      inLanguage: "fr-FR",
      description: SITE_DESCRIPTION,
      featureList: [
        "Écoute active de la consultation",
        "Analyse et structuration de la parole en données médicales",
        "Génération automatique du dossier médical, des comptes rendus et des ordonnances",
        "Traçabilité des données par blockchain",
        "IA française hébergée en France, conforme RGPD et HDS",
      ],
      audience: {
        "@type": "Audience",
        audienceType:
          "Médecins libéraux, médecins hospitaliers, docteurs juniors et internes",
        geographicArea: { "@type": "Country", name: "France" },
      },
      offers: {
        "@type": "Offer",
        price: "0",
        priceCurrency: "EUR",
        description: "Bêta gratuite, sans engagement, limitée à 250 médecins.",
        url: `${SITE_URL}/#beta`,
      },
      publisher: { "@id": ORG_ID },
    },
  ],
};

export function JsonLd() {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(graph).replace(/</g, "\\u003c"),
      }}
    />
  );
}
