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
  /** Rôle assigné par la charte. */
  usage: string;
  /** Contraste WCAG sur Paper (#FFFFFF). */
  onPaper: number;
};

/**
 * LA palette. Quinze valeurs, pas une de plus.
 *
 * Quatorze viennent de la charte 2026 (§ 11 et § 08) ; la quinzième,
 * Bleu Ardoise #253846, est la couleur du logotype, ajoutée par la marque.
 *
 * Les nuances dont une interface a besoin (filets, survols, fonds d'encarts)
 * s'obtiennent par OPACITÉ sur ces valeurs — `bg-nm-gold/12`,
 * `border-nm-ink-soft/45`. Jamais par un nouveau code hexadécimal.
 */
export const PALETTE: ColorToken[] = [
  { token: "nm-blue", name: "Bleu Napoléon", hex: "#5478A8", usage: "Structure, titres", onPaper: 4.54 },
  { token: "nm-blue-light", name: "Bleu clair", hex: "#7FA0C6", usage: "Décoratif, variantes logo", onPaper: 2.71 },
  { token: "nm-ink", name: "Bleu Nuit · Ink", hex: "#1A2540", usage: "Autorité, encre, fonds sombres", onPaper: 15.19 },
  { token: "nm-slate", name: "Bleu Ardoise", hex: "#253846", usage: "Couleur du logotype", onPaper: 12.12 },
  { token: "nm-deep", name: "Bleu Profond", hex: "#1F3A6B", usage: "CTA forts & boutons", onPaper: 11.2 },
  { token: "nm-gold", name: "Doré Médical", hex: "#DFB670", usage: "Accent prestige — jamais en aplat dominant", onPaper: 1.9 },
  { token: "nm-terracotta", name: "Terracotta", hex: "#D77962", usage: "Accent éditorial", onPaper: 3.09 },
  { token: "nm-terracotta-deep", name: "Terracotta Deep", hex: "#B85A45", usage: "Emphase italique, alerte", onPaper: 4.58 },
  { token: "nm-paper", name: "Paper", hex: "#FFFFFF", usage: "Cartes & modales", onPaper: 1 },
  { token: "nm-canvas", name: "Canvas", hex: "#FAFBFC", usage: "Fond général de l'application", onPaper: 1.02 },
  { token: "nm-ivory", name: "Ivoire", hex: "#F3F1EC", usage: "Fond chaud, respirations", onPaper: 1.13 },
  { token: "nm-ink-soft", name: "Ink Soft", hex: "#4A5670", usage: "Texte courant", onPaper: 7.35 },
  { token: "nm-muted", name: "Muted", hex: "#9AA0AB", usage: "Décoratif — pas de texte", onPaper: 2.63 },
  { token: "nm-border", name: "Border", hex: "#E5E7EB", usage: "Filets, bordures", onPaper: 1.24 },
  { token: "nm-black", name: "Noir", hex: "#151616", usage: "Monochromie, gravure", onPaper: 18.13 },
];

/**
 * Les états. La charte n'en prévoit pas : ils sont COMPOSÉS avec elle, sans
 * ajouter la moindre teinte. Aucun ne repose sur la seule couleur — le
 * libellé porte toujours l'information.
 */
export const STATES = [
  { state: "Information", cls: "bg-nm-blue", note: "Bleu Napoléon — 4,54:1" },
  { state: "Validation", cls: "bg-nm-deep", note: "Bleu Profond — 11,20:1. Bleu et non vert : il n'y a pas de vert dans la charte." },
  { state: "Vigilance", cls: "bg-nm-gold", note: "Doré Médical en filet et en fond ; le texte reste en Bleu Nuit — l'or ne s'écrit pas." },
  { state: "Alerte", cls: "bg-nm-terracotta-deep", note: "Terracotta Deep — 4,58:1. Pas de rouge : la charte tient la chaleur par le terracotta." },
] as const;

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
