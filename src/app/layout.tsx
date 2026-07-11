import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import Script from "next/script";
import "./globals.css";

import { CursorHalo } from "@/components/motion/cursor-halo";
import { Preloader } from "@/components/motion/preloader";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { SITE_URL } from "@/lib/site";

const archivo = localFont({
  src: "../fonts/archivo-var-latin.woff2",
  weight: "100 900",
  display: "swap",
  variable: "--font-archivo",
});

export const metadata: Metadata = {
  metadataBase: new URL(`${SITE_URL}/`),
  title: "Pièces auto neuves & d'occasion à La Farlède (Var) | P.A.C.",
  description:
    "Casse auto à La Farlède depuis 1992 : pièces détachées neuves et d'occasion vérifiées, enlèvement d'épaves. Lun-ven 8h-12h / 14h-18h. Tél 04 94 08 15 33.",
  robots: { index: true, follow: true, "max-image-preview": "large" },
  icons: { icon: `${SITE_URL}/img/favicon.svg` },
  openGraph: {
    type: "website",
    locale: "fr_FR",
    siteName: "P.A.C. Pièces Auto Cass",
    images: [{ url: `${SITE_URL}/img/og-image.png`, width: 1200, height: 630 }],
  },
  twitter: { card: "summary_large_image" },
  other: { "geo.region": "FR-83", "geo.placename": "La Farlède" },
};

export const viewport: Viewport = {
  themeColor: "#ffd400",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className={`${archivo.variable} h-full`} suppressHydrationWarning>
      <head>
        {/* Avant peinture : masque le préloader si déjà vu cette session */}
        <Script id="pac-vu" strategy="beforeInteractive">
          {`try{if(sessionStorage.getItem('pac_vu'))document.documentElement.setAttribute('data-pac-vu','1')}catch(e){}`}
        </Script>
      </head>
      <body className="flex min-h-full flex-col overflow-x-clip">
        <a
          href="#contenu"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[110] focus:rounded-full focus:bg-accent focus:px-5 focus:py-3 focus:font-semibold focus:text-accent-foreground"
        >
          Aller au contenu
        </a>
        <Preloader />
        <CursorHalo />
        <SiteHeader />
        <main id="contenu" className="flex-1">
          {children}
        </main>
        <SiteFooter />
      </body>
    </html>
  );
}
