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
        titre="Du neuf, quand c'est ce qu'il faut."
        chapo="Freins, filtres, distribution, amortisseurs : il y a des pièces qu'on change toujours par du neuf. On les commande pour votre voiture et vous les récupérez au comptoir, sans la marge d'une concession."
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
              La règle est simple. Les pièces de sécurité et d&apos;usure (freinage, distribution,
              filtres) se posent en neuf. Le reste (moteur, boîte, carrosserie, optiques, sellerie)
              se trouve très bien en occasion, pour beaucoup moins cher. Au téléphone, on vous
              oriente vers ce qui est le plus logique pour votre voiture et votre budget. C&apos;est
              l&apos;intérêt d&apos;un comptoir qui vend les deux.
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
              avec la carte grise ou la référence constructeur. On vous donne le prix et le délai
              tout de suite. La plupart des pièces arrivent au comptoir sous 24 à 48 h ouvrées.
            </p>
          </Reveal>
        </div>
      </section>

      <CtaPanel
        titre="Un devis ? C'est gratuit et immédiat."
        texte="Un appel, deux prix quand l'occasion existe (neuf et occasion), et vous décidez."
        image="/img/roue-900.webp"
        alt="Serrage d'une jante à la boulonneuse en atelier"
      />
    </>
  );
}
