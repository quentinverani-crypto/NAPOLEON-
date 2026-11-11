import type { Metadata } from "next";
import { figtree, gfsDidot, newsreader, manrope } from "@/lib/fonts";
import {
  SITE_DESCRIPTION,
  SITE_NAME,
  SITE_TAGLINE,
  SITE_URL,
} from "@/lib/site";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: `${SITE_NAME} — ${SITE_TAGLINE}`,
  description: SITE_DESCRIPTION,
  applicationName: SITE_NAME,
  robots: {
    index: true,
    follow: true,
    googleBot: { "max-snippet": -1, "max-image-preview": "large" },
  },
  openGraph: {
    title: `${SITE_NAME} — ${SITE_TAGLINE}`,
    description: SITE_DESCRIPTION,
    url: "/",
    siteName: SITE_NAME,
    type: "website",
    locale: "fr_FR",
    images: [
      {
        url: "/vitrine/embleme-or-sur-bleu.png",
        width: 1650,
        height: 1634,
        alt: SITE_NAME,
      },
    ],
  },
  twitter: {
    card: "summary",
    title: `${SITE_NAME} — ${SITE_TAGLINE}`,
    description: SITE_DESCRIPTION,
    images: ["/vitrine/embleme-or-sur-bleu.png"],
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
      className={`${figtree.variable} ${gfsDidot.variable} ${newsreader.variable} ${manrope.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-sans bg-napoleon-black text-napoleon-ink">
        {children}
      </body>
    </html>
  );
}
