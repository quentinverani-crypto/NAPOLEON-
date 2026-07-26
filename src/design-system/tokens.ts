/**
 * Miroir TypeScript des jetons définis dans `tokens.css`.
 *
 * `tokens.css` reste la SOURCE DE VÉRITÉ : c'est lui que consomme Tailwind
 * et donc l'interface. Ce fichier existe pour ce que le CSS ne sait pas
 * faire — documenter, énumérer, et alimenter la page /design-system.
 *
 * Toute modification doit être portée dans les DEUX fichiers.
 */

export type ColorToken = {
  /** Nom du jeton, sans le préfixe `--color-`. Classe : `text-nm-ink`, `bg-nm-ink`… */
  token: string;
  name: string;
  hex: string;
  /** Rôle assigné par la charte, ou raison d'être de l'extension. */
  usage: string;
  /** Contraste WCAG sur Paper (#FFFFFF). */
  onPaper: number;
  /** `true` si le jeton figure dans la charte, `false` si c'est une extension. */
  charter: boolean;
};

/** Palette officielle — charte 2026 § 11 et § 08. */
export const PALETTE: ColorToken[] = [
  { token: "nm-blue", name: "Bleu Napoléon", hex: "#5478A8", usage: "Structure, titres", onPaper: 4.54, charter: true },
  { token: "nm-blue-light", name: "Bleu clair", hex: "#7FA0C6", usage: "Décoratif, variantes logo", onPaper: 2.71, charter: true },
  { token: "nm-ink", name: "Bleu Nuit · Ink", hex: "#1A2540", usage: "Autorité, encre, fonds sombres", onPaper: 15.19, charter: true },
  { token: "nm-deep", name: "Bleu Profond", hex: "#1F3A6B", usage: "CTA forts & boutons", onPaper: 11.2, charter: true },
  { token: "nm-gold", name: "Doré Médical", hex: "#DFB670", usage: "Accent prestige — jamais en aplat dominant", onPaper: 1.9, charter: true },
  { token: "nm-terracotta", name: "Terracotta", hex: "#D77962", usage: "Accent éditorial", onPaper: 3.09, charter: true },
  { token: "nm-terracotta-deep", name: "Terracotta Deep", hex: "#B85A45", usage: "Emphase italique", onPaper: 4.58, charter: true },
  { token: "nm-paper", name: "Paper", hex: "#FFFFFF", usage: "Cartes & modales", onPaper: 1, charter: true },
  { token: "nm-canvas", name: "Canvas", hex: "#FAFBFC", usage: "Fond général de l'application", onPaper: 1.02, charter: true },
  { token: "nm-ivory", name: "Ivoire", hex: "#F3F1EC", usage: "Fond chaud, respirations", onPaper: 1.13, charter: true },
  { token: "nm-ink-soft", name: "Ink Soft", hex: "#4A5670", usage: "Texte courant", onPaper: 7.35, charter: true },
  { token: "nm-muted", name: "Muted", hex: "#9AA0AB", usage: "Texte secondaire — décoratif uniquement", onPaper: 2.63, charter: true },
  { token: "nm-border", name: "Border", hex: "#E5E7EB", usage: "Filets, bordures", onPaper: 1.24, charter: true },
  { token: "nm-black", name: "Noir", hex: "#151616", usage: "Monochromie, gravure", onPaper: 18.13, charter: true },
];

/** Extensions — absentes de la charte, dérivées et vérifiées en contraste. */
export const EXTENSIONS: ColorToken[] = [
  { token: "nm-ink-deep", name: "Ink Deep", hex: "#101832", usage: "Fonds sombres profonds", onPaper: 17.52, charter: false },
  { token: "nm-gold-ink", name: "Or lisible", hex: "#7E5F26", usage: "L'or EN TEXTE sur fond clair", onPaper: 5.91, charter: false },
  { token: "nm-blue-ink", name: "Bleu lisible", hex: "#3F5F8C", usage: "Le bleu en texte courant", onPaper: 6.51, charter: false },
  { token: "nm-muted-strong", name: "Muted Strong", hex: "#6B7688", usage: "Texte secondaire réellement lisible", onPaper: 4.59, charter: false },
  { token: "nm-border-strong", name: "Border Strong", hex: "#CFD5DE", usage: "Filets appuyés, contours de champs", onPaper: 1.48, charter: false },
  { token: "nm-success", name: "Succès", hex: "#3F7A64", usage: "Validation, état conforme", onPaper: 5.02, charter: false },
  { token: "nm-warning", name: "Vigilance", hex: "#8F6520", usage: "Attention requise", onPaper: 5.18, charter: false },
  { token: "nm-danger", name: "Alerte", hex: "#B85A45", usage: "Erreur, destruction — = Terracotta Deep", onPaper: 4.58, charter: false },
  { token: "nm-info", name: "Information", hex: "#1F3A6B", usage: "Information neutre — = Bleu Profond", onPaper: 11.2, charter: false },
];

export type TypeToken = {
  token: string;
  family: "Georgia" | "Open Sans";
  size: string;
  usage: string;
  /**
   * Classe Tailwind écrite EN TOUTES LETTRES. Tailwind scanne le source :
   * une classe assemblée à l'exécution (`text-${token}`) n'est jamais
   * générée. Ne pas remplacer par une interpolation.
   */
  cls: string;
};

/** Échelle typographique. */
export const TYPE_SCALE: TypeToken[] = [
  { token: "display-xl", cls: "text-display-xl", family: "Georgia", size: "44 → 88 px", usage: "Titre de premier écran — un seul par page" },
  { token: "display-lg", cls: "text-display-lg", family: "Georgia", size: "36 → 64 px", usage: "Ouverture de section majeure" },
  { token: "display-md", cls: "text-display-md", family: "Georgia", size: "30 → 48 px", usage: "Titre de section, chiffre-clé" },
  { token: "display-sm", cls: "text-display-sm", family: "Georgia", size: "24 → 36 px", usage: "Sous-section" },
  { token: "title-lg", cls: "text-title-lg", family: "Georgia", size: "28 px", usage: "Titre de bloc" },
  { token: "title-md", cls: "text-title-md", family: "Georgia", size: "22 px", usage: "Titre de carte, citation" },
  { token: "title-sm", cls: "text-title-sm", family: "Georgia", size: "18 px", usage: "Titre courant" },
  { token: "lead", cls: "text-lead", family: "Open Sans", size: "19 px", usage: "Chapô sous un titre d'ouverture" },
  { token: "body-lg", cls: "text-body-lg", family: "Open Sans", size: "17 px", usage: "Corps long, lecture soutenue" },
  { token: "body", cls: "text-body", family: "Open Sans", size: "16 px", usage: "Corps par défaut de l'interface" },
  { token: "body-sm", cls: "text-body-sm", family: "Open Sans", size: "15 px", usage: "Corps dense, tableaux, formulaires" },
  { token: "caption", cls: "text-caption", family: "Open Sans", size: "13 px", usage: "Mentions, aides, horodatages" },
  { token: "eyebrow", cls: "nm-eyebrow", family: "Open Sans", size: "12 px · 0,26 em", usage: "Surtitre capitales espacées" },
];

export const RADIUS = [
  { token: "rounded-nm-xs", cls: "rounded-nm-xs", value: "4 px", usage: "Cases à cocher, puces" },
  { token: "rounded-nm-sm", cls: "rounded-nm-sm", value: "6 px", usage: "Étiquettes serrées" },
  { token: "rounded-nm-md", cls: "rounded-nm-md", value: "10 px", usage: "Champs, encarts" },
  { token: "rounded-nm-lg", cls: "rounded-nm-lg", value: "14 px", usage: "Cartes, surfaces — défaut" },
  { token: "rounded-nm-xl", cls: "rounded-nm-xl", value: "20 px", usage: "Panneaux, modales" },
  { token: "rounded-nm-2xl", cls: "rounded-nm-2xl", value: "28 px", usage: "Grands blocs éditoriaux" },
  { token: "rounded-nm-pill", cls: "rounded-nm-pill", value: "9999 px", usage: "Boutons, badges — l'arrondi des piliers de l'emblème" },
] as const;

export const ELEVATION = [
  { token: "shadow-nm-1", cls: "shadow-nm-1", usage: "Repos — séparation à peine perceptible" },
  { token: "shadow-nm-2", cls: "shadow-nm-2", usage: "Carte posée, bouton primaire" },
  { token: "shadow-nm-3", cls: "shadow-nm-3", usage: "Survol d'un élément interactif" },
  { token: "shadow-nm-4", cls: "shadow-nm-4", usage: "Modale, panneau flottant" },
  { token: "shadow-nm-gold", cls: "shadow-nm-gold", usage: "Halo doré — supports prestige uniquement" },
] as const;

/** L'angle de la diagonale de l'emblème. Toute inclinaison du système s'y réfère. */
export const IMPERIAL_ANGLE_DEG = 66.16;
