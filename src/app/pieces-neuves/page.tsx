import type { Metadata } from "next";
import Image from "next/image";

import { CtaPanel } from "@/components/cta-panel";
import { JsonLd } from "@/components/json-ld";
import { Reveal } from "@/components/motion/reveal";
import { PageBanner } from "@/components/page-banner";
import { PhonePill } from "@/components/phone-pill";
import { asset, pageMeta, sousPageJsonLd } from "@/lib/site";

export const metadata: Metadata = pageMeta({
  titre: "Pièces auto neuves · La Farlède, près de Toulon (Var) | P.A.C.",
  description:
    "Freinage, filtres, courroies, mécanique : pièces neuves commandées sur carte grise, retrait au comptoir de La Farlède, près de Toulon. Tél 04 94 08 15 33.",
  path: "/pieces-neuves",
  ogDescription:
    "Pièces neuves commandées sur carte grise, retrait au comptoir. Tél 04 94 08 15 33.",
});

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
          path: "/pieces-neuves",
          service: {
            name: "Vente de pièces détachées automobiles neuves",
            serviceType: "Pièces auto neuves sur commande",
          },
          breadcrumb: "Pièces neuves",
        })}
      />
      <PageBanner
        fil="Pièces neuves"
        titre="Pièces détachées neuves."
        image="/img/hero-neuves-1600.webp"
        imageAlt="Disque de frein et étrier neufs, en gros plan"
        chapo="Certaines pièces se remplacent nécessairement par du neuf : freinage, filtration, distribution, suspension."
        action={<PhonePill label="Demander un tarif" />}
      />

      <section className="mx-auto max-w-6xl px-5 py-14 sm:py-20">
        <div className="grid gap-10 md:grid-cols-[1.1fr_1fr]">
          <Reveal>
            <div>
              <h2 className="text-[clamp(1.6rem,3.2vw,2.4rem)] font-bold leading-tight tracking-[-0.015em]">
                Familles de pièces
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
            <div className="pac-ombre-douce group relative overflow-hidden rounded-[28px]" style={{ aspectRatio: "5/4" }}>
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
            <p>
              La fourniture de pièces détachées neuves constitue l&apos;activité principale de
              l&apos;établissement. Le stock disponible couvre les besoins d&apos;entretien
              courant, de mécanique et de carrosserie pour le parc automobile contemporain.
            </p>
          </Reveal>
          <Reveal>
            <p>
              La distribution s&apos;effectue exclusivement au comptoir. Ce processus impose une
              vérification systématique des références et des spécifications techniques avant
              toute remise de matériel. En cas d&apos;indisponibilité immédiate d&apos;une
              référence, les relations établies avec un réseau de fournisseurs professionnels
              permettent un approvisionnement sur commande dans des délais restreints.
            </p>
          </Reveal>
          <Reveal>
            <p>
              Pour certaines familles — carrosserie, optiques, sellerie — une{" "}
              <a
                href="/pieces-occasion"
                className="font-semibold text-foreground underline decoration-accent decoration-2 underline-offset-4 hover:decoration-4"
              >
                pièce d&apos;occasion
              </a>{" "}
              constitue une alternative au neuf, notamment sur les anciens modèles.
            </p>
          </Reveal>
        </div>

        <div className="mt-14 max-w-[70ch]">
          <Reveal>
            <h2 className="text-[clamp(1.6rem,3.2vw,2.4rem)] font-bold leading-tight tracking-[-0.015em]">
              Commander une pièce neuve : le déroulé
            </h2>
          </Reveal>
          <ol className="mt-7 space-y-4">
            {[
              ["Appel ou passage au comptoir", "communiquez la carte grise du véhicule ou la référence de la pièce."],
              ["Vérification", "la référence et la compatibilité sont contrôlées immédiatement."],
              ["Commande", "si la pièce n'est pas en stock, elle est commandée auprès du réseau de fournisseurs ; le délai est annoncé au moment de la demande."],
              ["Retrait", "la pièce est vérifiée puis remise au comptoir, 25 rue Gay Lussac à La Farlède. Règlement par carte bancaire ou espèces."],
            ].map(([titre, texte], i) => (
              <Reveal key={titre} delay={i * 0.06}>
                <li className="pac-verre flex gap-5 rounded-[24px] p-6">
                  <span
                    className="font-wide grid size-10 shrink-0 place-items-center rounded-full bg-accent text-lg font-extrabold text-accent-foreground"
                    aria-hidden="true"
                  >
                    {i + 1}
                  </span>
                  <p className="leading-relaxed text-muted-foreground">
                    <strong className="text-foreground">{titre}</strong> — {texte}
                  </p>
                </li>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      {/* Catalogue des familles de pièces : énumération quasi exhaustive
          (issue du stock réel), utile au référencement local/GEO. */}
      <section aria-labelledby="t-familles" className="border-t border-border bg-sable">
        <div className="mx-auto max-w-6xl px-5 py-14 sm:py-20">
          <Reveal>
            <p className="pac-eyebrow pac-kick text-muted-foreground">Catalogue</p>
            <h2
              id="t-familles"
              className="mt-3 text-[clamp(1.6rem,3.2vw,2.4rem)] font-bold leading-tight tracking-[-0.015em]"
            >
              Les familles de pièces disponibles
            </h2>
            <p className="mt-4 max-w-[70ch] leading-relaxed text-muted-foreground">
              Le stock P.A.C. couvre l&apos;essentiel des pièces détachées automobiles, neuves
              ou d&apos;occasion, pour la plupart des marques et modèles — y compris
              anciens et de collection. Pour une référence absente de la liste, la recherche
              est étendue au réseau de confrères.
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
        image="/img/roue-900.webp"
        alt="Serrage d'une jante à la boulonneuse en atelier"
      />
    </>
  );
}
