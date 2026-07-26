import { Gelasio, Open_Sans } from "next/font/google";

/**
 * Polices du design system NAPOLEON Médical.
 *
 * Arbitrage de marque : Georgia porte le nom et les grandes écritures,
 * Open Sans porte tous les contenus. Cet arbitrage prévaut sur les trois
 * directions typographiques proposées au § 12 de la charte 2026.
 *
 * Georgia n'est installée ni sur Android ni sur la plupart des Linux.
 * Gelasio est son substitut libre de droits aux MÉTRIQUES IDENTIQUES :
 * même chasse, même hauteur d'x, même approche. Elle prend le relais là où
 * Georgia manque, sans le moindre décalage de mise en page — ni saut, ni
 * reflow, ni césure déplacée.
 *
 * L'ordre de la pile est donc, et doit rester : Georgia → Gelasio → serif.
 * Il est défini dans tokens.css (`--font-display`), pas ici.
 *
 * Ajout strictement additif : n'altère ni `/` ni `/vitrine`, qui gardent
 * leurs propres polices (figtree / gfs-didot / newsreader / manrope).
 */

export const gelasio = Gelasio({
  subsets: ["latin", "latin-ext"],
  variable: "--font-gelasio",
  display: "swap",
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
});

export const openSans = Open_Sans({
  subsets: ["latin", "latin-ext"],
  variable: "--font-open-sans",
  display: "swap",
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
});

/** À poser sur `<html>` pour activer les polices du design system. */
export const designSystemFontVariables = `${gelasio.variable} ${openSans.variable}`;
