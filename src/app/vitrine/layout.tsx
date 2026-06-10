import type { Metadata } from "next";

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ??
  (process.env.VERCEL_URL
    ? `https://${process.env.VERCEL_URL}`
    : "http://localhost:3000");

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "NAPOLEON Médical — La voix médicale souveraine",
  description:
    "Assistant de consultation médical 100 % français. NAPOLEON écoute la consultation et prépare comptes-rendus, ordonnances et courriers, prêts à valider.",
  openGraph: {
    title: "NAPOLEON Médical — La voix médicale souveraine",
    description:
      "Assistant de consultation médical 100 % français. NAPOLEON écoute la consultation et prépare comptes-rendus, ordonnances et courriers, prêts à valider.",
    type: "website",
    locale: "fr_FR",
    images: [{ url: "/vitrine/embleme-or-sur-bleu.png", width: 800, height: 800 }],
  },
};

export default function VitrineLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="font-body bg-nap-canvas text-nap-ink antialiased">
      {children}
    </div>
  );
}
