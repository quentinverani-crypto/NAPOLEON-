import { Figtree, Cormorant_Garamond, Cinzel, Spectral } from "next/font/google";
import localFont from "next/font/local";

export const figtree = Figtree({
  subsets: ["latin"],
  variable: "--font-figtree",
  display: "swap",
});

/**
 * Polices du site vitrine — direction « impériale / éditoriale de prestige ».
 * Cormorant Garamond : titres (serif haute couture, contrastée, majestueuse).
 * Cinzel : capitales romaines lapidaires — surtitres, numérotation, wordmark, CTA.
 * Spectral : corps de texte (serif élégante, lisible à l'écran).
 * Rien de « tech » : aucune sans géométrique. Ajout strictement additif.
 */
export const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  variable: "--font-cormorant",
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
  display: "swap",
});

export const cinzel = Cinzel({
  subsets: ["latin"],
  variable: "--font-cinzel",
  weight: ["400", "500", "600"],
  display: "swap",
});

export const spectral = Spectral({
  subsets: ["latin"],
  variable: "--font-spectral",
  weight: ["300", "400", "500", "600"],
  style: ["normal", "italic"],
  display: "swap",
});

export const gfsDidot = localFont({
  src: "../assets/fonts/GFSDidot-Regular.ttf",
  variable: "--font-gfs-didot",
  display: "swap",
  weight: "400",
});
