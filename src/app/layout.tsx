import type { Metadata } from "next";
import { figtree, gfsDidot, cormorant, cinzel, spectral } from "@/lib/fonts";
import "./globals.css";

export const metadata: Metadata = {
  title: "NAPOLEON Medical — La voix médicale souveraine",
  description:
    "L'assistant IA qui libère le médecin de l'administratif. Reconnaissance vocale, comptes rendus automatiques, données souveraines. Rejoignez la bêta.",
  openGraph: {
    title: "NAPOLEON Medical — La voix médicale souveraine",
    description:
      "L'assistant IA qui libère le médecin de l'administratif pour recentrer la consultation sur l'essentiel : le patient.",
    type: "website",
    locale: "fr_FR",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="fr"
      className={`${figtree.variable} ${gfsDidot.variable} ${cormorant.variable} ${cinzel.variable} ${spectral.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-sans bg-napoleon-black text-napoleon-ink">
        {children}
      </body>
    </html>
  );
}
