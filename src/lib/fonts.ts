import { Figtree, Newsreader, Manrope } from "next/font/google";
import localFont from "next/font/local";

export const figtree = Figtree({
  subsets: ["latin"],
  variable: "--font-figtree",
  display: "swap",
});

/**
 * Polices du site vitrine commercial (phase 2) — charte NAPOLEON 2026.
 * Titres : Newsreader (serif humaniste). Corps & eyebrows : Manrope.
 * Ajout strictement additif : n'altère pas le premier site.
 */
export const newsreader = Newsreader({
  subsets: ["latin"],
  variable: "--font-newsreader",
  weight: ["400", "500"],
  style: ["normal", "italic"],
  display: "swap",
});

export const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
  weight: ["400", "500", "600"],
  display: "swap",
});

export const gfsDidot = localFont({
  src: "../assets/fonts/GFSDidot-Regular.ttf",
  variable: "--font-gfs-didot",
  display: "swap",
  weight: "400",
});
