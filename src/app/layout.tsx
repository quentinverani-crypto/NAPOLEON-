import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "NAPOLÉON Médical — Retrouvez la relation patient",
  description: "NAPOLÉON Médical prépare les documents de consultation pour laisser le médecin pleinement présent face à son patient.",
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body>{children}</body>
    </html>
  );
}
