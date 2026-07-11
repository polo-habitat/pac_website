import type { Metadata } from "next";

import { PageBanner } from "@/components/page-banner";
import { Reveal } from "@/components/motion/reveal";
import { SITE_URL } from "@/lib/site";

export const metadata: Metadata = {
  title: "Mentions légales | P.A.C. Pièces Auto Cass · La Farlède",
  description:
    "Mentions légales du site de P.A.C. Pièces Auto Cass, SARL au SIREN 384 297 552, ZI Toulon Est, 83210 La Farlède (Var). Éditeur, hébergeur, données personnelles.",
  alternates: { canonical: `${SITE_URL}/mentions-legales.html` },
  robots: { index: false, follow: true },
};

const SECTIONS: Array<{ titre: string; contenu: React.ReactNode }> = [
  {
    titre: "Éditeur du site",
    contenu: (
      <p>
        P.A.C. Pièces Auto Cass (PIECES AUTO CASS)
        <br />
        Société à responsabilité limitée · SIREN 384 297 552 · RCS Toulon
        <br />
        Siège social : ZI Toulon Est, 79 rue Gay Lussac, 83210 La Farlède
        <br />
        Point de vente : ZI Toulon Est, 25 rue Gay Lussac, 83210 La Farlède
        <br />
        Gérant et directeur de la publication : Lazaros Efstathiou
        <br />
        Téléphone : 04 94 08 15 33 · Fax : 04 94 08 66 39
      </p>
    ),
  },
  {
    titre: "Hébergement",
    contenu: (
      <p>
        Site hébergé par GitHub, Inc. (GitHub Pages),
        <br />
        88 Colin P. Kelly Jr Street, San Francisco, CA 94107, États-Unis.
        <br />
        <a
          href="https://pages.github.com/"
          rel="noopener noreferrer"
          className="font-semibold text-foreground underline decoration-accent decoration-2 underline-offset-4 hover:decoration-4"
        >
          pages.github.com
        </a>
      </p>
    ),
  },
  {
    titre: "Propriété intellectuelle",
    contenu: (
      <p>
        L&apos;ensemble des contenus de ce site (textes, mise en page, éléments graphiques) est la
        propriété de P.A.C. Pièces Auto Cass, sauf mention contraire. Les photographies
        d&apos;illustration proviennent d&apos;
        <a
          href="https://unsplash.com"
          rel="noopener noreferrer"
          className="font-semibold text-foreground underline decoration-accent decoration-2 underline-offset-4 hover:decoration-4"
        >
          Unsplash
        </a>{" "}
        et sont utilisées conformément à leur licence.
      </p>
    ),
  },
  {
    titre: "Données personnelles",
    contenu: (
      <p>
        Ce site ne collecte aucune donnée personnelle : il n&apos;utilise ni cookie, ni traceur,
        ni formulaire, ni outil de mesure d&apos;audience. Les échanges avec l&apos;entreprise se
        font exclusivement par téléphone ou au comptoir.
      </p>
    ),
  },
  {
    titre: "Responsabilité",
    contenu: (
      <p>
        Les informations publiées (horaires, services, disponibilités) sont fournies à titre
        indicatif et peuvent évoluer. Elles ne constituent pas un engagement contractuel : les
        conditions applicables à chaque vente sont celles annoncées au comptoir ou par téléphone.
      </p>
    ),
  },
];

export default function MentionsLegales() {
  return (
    <>
      <PageBanner fil="Mentions légales" titre="Mentions légales." />
      <section className="mx-auto max-w-6xl px-5">
        <div className="max-w-[68ch] space-y-10">
          {SECTIONS.map((section) => (
            <Reveal key={section.titre}>
              <div>
                <h2 className="text-2xl font-bold tracking-[-0.015em]">{section.titre}</h2>
                <div className="mt-4 leading-relaxed text-muted-foreground">{section.contenu}</div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>
    </>
  );
}
