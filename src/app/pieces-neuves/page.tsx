import type { Metadata } from "next";
import Image from "next/image";

import { CtaPanel } from "@/components/cta-panel";
import { JsonLd } from "@/components/json-ld";
import { Reveal } from "@/components/motion/reveal";
import { PageBanner } from "@/components/page-banner";
import { PhonePill } from "@/components/phone-pill";
import { asset, NAP, SITE_URL, sousPageJsonLd } from "@/lib/site";

const TITRE = "Pièces auto neuves au tarif comptoir · P.A.C. La Farlède";
const DESCRIPTION =
  "Freinage, filtres, courroies, mécanique : pièces neuves commandées sur carte grise, retrait sous 24-48 h à La Farlède (Var). Tél 04 94 08 15 33.";

export const metadata: Metadata = {
  title: TITRE,
  description: DESCRIPTION,
  alternates: { canonical: `${SITE_URL}/pieces-neuves.html` },
  openGraph: {
    title: TITRE,
    description: "Pièces neuves commandées sur carte grise, retrait sous 24-48 h. Tél 04 94 08 15 33.",
    url: `${SITE_URL}/pieces-neuves.html`,
  },
  twitter: { title: TITRE },
};

const GAMME = [
  ["Freinage", "plaquettes, disques, étriers, flexibles."],
  ["Filtration", "filtres à huile, à air, à carburant, d'habitacle."],
  ["Distribution", "kits courroie, galets, pompes à eau."],
  ["Suspension", "amortisseurs, silentblocs, rotules."],
  ["Électricité", "batteries, bougies, capteurs."],
  ["Consommables", "huiles, liquides, balais d'essuie-glace."],
] as const;

/* Familles de pièces (catalogue quasi exhaustif, utile au SEO local).
   Établi à partir du stock réel de P.A.C. (colonne « Nom » de l'inventaire),
   complété des familles demandées par le client. Ordre alphabétique. */
const FAMILLES = [
  "Alternateurs",
  "Amortisseurs",
  "Attelages",
  "Batteries",
  "Boîte de vitesse",
  "Carrosserie",
  "Clignotants",
  "Coques et glaces de rétroviseur",
  "Démarreurs",
  "Échappements et catalyseurs",
  "Embrayages",
  "Feux",
  "Filtres",
  "Grilles et calandres",
  "Hayons et coffres",
  "Kit d'extension",
  "Lève-vitres",
  "Liquide de refroidissement",
  "Liquide lave-glace",
  "Moteur",
  "Motoventilateurs",
  "Moulures",
  "Pare-brise",
  "Pare-chocs",
  "Phares",
  "Pièces de chauffage",
  "Plaquettes et disques de frein",
  "Pneus",
  "Poignées",
  "Pompes à eau",
  "Portières",
  "Radiateur",
  "Suspensions",
  "Transmissions",
] as const;

export default function PiecesNeuves() {
  return (
    <>
      <JsonLd
        data={sousPageJsonLd({
          service: {
            name: "Vente de pièces détachées automobiles neuves",
            serviceType: "Pièces auto neuves sur commande",
            path: "/pieces-neuves.html",
          },
          breadcrumb: "Pièces neuves",
        })}
      />
      <PageBanner
        fil="Pièces neuves"
        titre="Pièces détachées neuves."
        image="/img/hero-neuves-1600.webp"
        imageAlt="Disque de frein et étrier neufs, en gros plan"
        chapo="Certaines pièces se remplacent nécessairement par du neuf : freinage, filtration, distribution, suspension. P.A.C. les commande pour votre véhicule, sans la marge d'un réseau constructeur."
        action={<PhonePill label="Demander un tarif" />}
      />

      <section className="mx-auto max-w-6xl px-5 py-14 sm:py-20">
        <div className="grid gap-10 md:grid-cols-[1.1fr_1fr]">
          <Reveal>
            <div>
              <h2 className="text-[clamp(1.6rem,3.2vw,2.4rem)] font-bold leading-tight tracking-[-0.015em]">
                Ce qui se commande en neuf
              </h2>
              <ul className="mt-6 divide-y divide-border">
                {GAMME.map(([famille, detail]) => (
                  <li key={famille} className="flex gap-3 py-3.5 leading-relaxed">
                    <span className="mt-2 size-2 shrink-0 rounded-full bg-accent" aria-hidden="true" />
                    <span>
                      <strong>{famille}</strong> : {detail}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="group relative overflow-hidden rounded-[20px]" style={{ aspectRatio: "5/4" }}>
              <Image
                src={asset("/img/vidange-900.webp")}
                alt="Huile moteur neuve versée au remplissage, capot ouvert"
                fill
                sizes="(max-width: 768px) 92vw, 42vw"
                className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.04]"
              />
            </div>
          </Reveal>
        </div>

        <div className="mt-14 max-w-[68ch] space-y-5 leading-relaxed text-muted-foreground">
          <Reveal>
            <h2 className="text-[clamp(1.6rem,3.2vw,2.4rem)] font-bold leading-tight tracking-[-0.015em] text-foreground">
              Neuf ou occasion : le bon choix pièce par pièce
            </h2>
          </Reveal>
          <Reveal>
            <p>
              Le principe est constant : les pièces de sécurité et d&apos;usure (freinage,
              distribution, filtration) se posent en neuf ; les pièces de structure et
              d&apos;équipement (moteur, boîte, carrosserie, optiques, sellerie) se trouvent en
              occasion contrôlée, à un coût nettement inférieur. Le comptoir oriente vers
              l&apos;option la plus adaptée au véhicule et au budget.
            </p>
          </Reveal>
          <Reveal>
            <h2 className="pt-4 text-[clamp(1.6rem,3.2vw,2.4rem)] font-bold leading-tight tracking-[-0.015em] text-foreground">
              Commande et retrait
            </h2>
          </Reveal>
          <Reveal>
            <p>
              Appelez le{" "}
              <a href={NAP.telephoneHref} className="font-semibold text-foreground underline decoration-accent decoration-2 underline-offset-4 hover:decoration-4">
                04 94 08 15 33
              </a>{" "}
              avec la carte grise ou la référence constructeur. Le prix et le délai sont
              communiqués immédiatement ; la plupart des références sont disponibles au comptoir
              sous 24 à 48 heures ouvrées.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Catalogue des familles de pièces : énumération quasi exhaustive
          (issue du stock réel), utile au référencement local/GEO. */}
      <section aria-labelledby="t-familles" className="border-t border-border bg-sable">
        <div className="mx-auto max-w-6xl px-5 py-14 sm:py-20">
          <Reveal>
            <p className="pac-eyebrow text-muted-foreground">Catalogue</p>
            <h2
              id="t-familles"
              className="mt-3 text-[clamp(1.6rem,3.2vw,2.4rem)] font-bold leading-tight tracking-[-0.015em]"
            >
              Les familles de pièces disponibles
            </h2>
            <p className="mt-4 max-w-[70ch] leading-relaxed text-muted-foreground">
              Le stock P.A.C. couvre l&apos;essentiel des pièces détachées automobiles, neuves
              ou d&apos;occasion contrôlée, pour la plupart des marques et modèles — y compris
              anciens et de collection. Une référence n&apos;apparaît pas dans la liste ?
              Appelez le comptoir à La Farlède : la recherche est étendue au réseau de
              confrères.
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <ul className="mt-8 flex flex-wrap gap-2.5">
              {FAMILLES.map((famille) => (
                <li
                  key={famille}
                  className="rounded-full border border-border bg-background px-4 py-2 text-sm font-medium"
                >
                  {famille}
                </li>
              ))}
            </ul>
          </Reveal>
          <Reveal delay={0.15}>
            <p className="mt-5 text-sm italic text-muted-foreground">… liste non exhaustive.</p>
          </Reveal>
        </div>
      </section>

      <CtaPanel
        titre="Devis gratuit et immédiat."
        texte="Un appel suffit pour obtenir le prix du neuf et, lorsqu'elle existe, celui de l'occasion."
        image="/img/roue-900.webp"
        alt="Serrage d'une jante à la boulonneuse en atelier"
      />
    </>
  );
}
