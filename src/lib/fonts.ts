import { Figtree } from "next/font/google";
import localFont from "next/font/local";

export const figtree = Figtree({
  subsets: ["latin"],
  variable: "--font-figtree",
  display: "swap",
});

export const gfsDidot = localFont({
  src: "../assets/fonts/GFSDidot-Regular.ttf",
  variable: "--font-gfs-didot",
  display: "swap",
  weight: "400",
});
