import type { Metadata } from "next";
import Image from "next/image";

import { CtaPanel } from "@/components/cta-panel";
import { JsonLd } from "@/components/json-ld";
import { Reveal } from "@/components/motion/reveal";
import { PageBanner } from "@/components/page-banner";
import { PhonePill } from "@/components/phone-pill";
import { asset, pageMeta, sousPageJsonLd } from "@/lib/site";

export const metadata: Metadata = pageMeta({
  titre: "Pièces auto d'occasion contrôlées · La Farlède, près de Toulon",
  description:
    "Pièces auto d'occasion contrôlées à La Farlède, près de Toulon : moteurs, boîtes, optiques, carrosserie, youngtimers et collection. Tél 04 94 08 15 33.",
  path: "/pieces-occasion",
  ogDescription:
    "Pièces d'occasion contrôlées, 40 à 70 % moins cher que le neuf. Tél 04 94 08 15 33.",
});

const GAMME = [
  ["Mécanique", "moteurs complets, boîtes de vitesses manuelles et automatiques, turbos, injecteurs, pompes."],
  ["Électricité", "alternateurs, démarreurs, calculateurs, faisceaux, compteurs."],
  ["Carrosserie", "portières, ailes, capots, pare-chocs, hayons, rétroviseurs."],
  ["Éclairage", "optiques avant, feux arrière, antibrouillards."],
  ["Intérieur", "sièges, sellerie, garnitures, commandes."],
  ["Roues", "jantes tôle et alliage."],
] as const;

export default function PiecesOccasion() {
  return (
    <>
      <JsonLd
        data={sousPageJsonLd({
          path: "/pieces-occasion",
          service: {
            name: "Vente de pièces détachées automobiles d'occasion",
            serviceType: "Pièces auto d'occasion vérifiées",
          },
          breadcrumb: "Pièces d'occasion",
        })}
      />
      <PageBanner
        fil="Pièces d'occasion"
        titre="Pièces détachées d'occasion contrôlées."
        image="/img/hero-occasion-1600.webp"
        imageAlt="Voitures anciennes et de collection réunies dans un garage"
        chapo="Une pièce d'occasion contrôlée coûte généralement 40 à 70 % de moins qu'une pièce neuve en concession. Chaque pièce est démontée, contrôlée et référencée avant la vente."
        action={<PhonePill label="Vérifier une disponibilité" />}
      />

      <section className="mx-auto max-w-6xl px-5 py-14 sm:py-20">
        <div className="grid gap-10 md:grid-cols-[1.1fr_1fr]">
          <Reveal>
            <div>
              <h2 className="text-[clamp(1.6rem,3.2vw,2.4rem)] font-bold leading-tight tracking-[-0.015em]">
                Ce que vous trouvez en occasion
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
                src={asset("/img/courroie-900.webp")}
                alt="Courroie et poulies d'un moteur d'occasion en cours de contrôle"
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
              Le département des pièces d&apos;occasion est spécifiquement orienté vers les anciens
              modèles et les véhicules de collection.
            </p>
          </Reveal>
          <Reveal>
            <p>
              Cette sélection vise à répondre aux exigences de restauration et de maintien en
              circulation des automobiles classiques. Les pièces disponibles au comptoir
              proviennent d&apos;un inventaire ciblé et font l&apos;objet d&apos;un contrôle
              technique strict préalable à la distribution. Tout comme pour le matériel neuf,
              l&apos;identification des pièces requiert une analyse directe pour garantir
              l&apos;intégrité et la compatibilité de chaque élément.
            </p>
          </Reveal>
        </div>

        <div className="mt-14 max-w-[68ch]">
          <Reveal>
            <h2 className="text-[clamp(1.6rem,3.2vw,2.4rem)] font-bold leading-tight tracking-[-0.015em]">
              Anciens modèles, youngtimers et véhicules de collection
            </h2>
          </Reveal>
          <div className="mt-6 space-y-5 leading-relaxed text-muted-foreground">
            <Reveal>
              <p>
                Le stock d&apos;occasion couvre en priorité les modèles qui ne sont plus suivis
                par les réseaux constructeurs : voitures anciennes, youngtimers et véhicules de
                collection. Pour ces automobiles, certaines références ne sont plus fabriquées ;
                un stock d&apos;occasion constitué de longue date est alors la source la plus
                directe pour une pièce d&apos;origine.
              </p>
            </Reveal>
            <Reveal>
              <p>
                La recherche s&apos;effectue sur présentation de la carte grise ou de la
                référence, au comptoir de La Farlède ou par téléphone. Lorsqu&apos;une pièce
                n&apos;est pas disponible sur place, la demande est relayée auprès d&apos;un
                réseau de confrères constitué depuis 1992. Le stock est par ailleurs alimenté
                par le{" "}
                <a
                  href="/rachat-de-voiture"
                  className="font-semibold text-foreground underline decoration-accent decoration-2 underline-offset-4 hover:decoration-4"
                >
                  rachat de véhicules
                </a>
                , étudié au cas par cas.
              </p>
            </Reveal>
            <Reveal>
              <p>
                Installé dans la zone industrielle Toulon Est à La Farlède, le magasin est
                accessible en une dizaine de minutes depuis Toulon par l&apos;A57, sortie La
                Farlède. Particuliers et professionnels de Toulon, La Valette-du-Var, La Garde,
                Solliès-Pont, Cuers ou Hyères peuvent faire vérifier une disponibilité par
                téléphone avant de se déplacer.
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      <CtaPanel
        titre="La pièce est peut-être déjà en stock."
        texte="Un appel suffit pour le vérifier, aux heures d'ouverture du comptoir. N'hésitez pas à contacter Pièces Auto Cass : ils auront peut-être votre pièce."
        image="/img/atelier-900.webp"
        alt="Atelier avec véhicule capot ouvert sur un pont élévateur"
      />
    </>
  );
}
