import type { Metadata } from "next";
import Image from "next/image";

import { CtaPanel } from "@/components/cta-panel";
import { JsonLd } from "@/components/json-ld";
import { Reveal } from "@/components/motion/reveal";
import { PageBanner } from "@/components/page-banner";
import { PhonePill } from "@/components/phone-pill";
import { asset, NAP, SITE_URL, sousPageJsonLd } from "@/lib/site";

const TITRE = "Pièces auto d'occasion vérifiées · P.A.C. La Farlède (Var)";
const DESCRIPTION =
  "Moteurs, boîtes, optiques, carrosserie : pièces d'occasion contrôlées, 40 à 70 % moins cher que le neuf, y compris anciens modèles et collection. Tél 04 94 08 15 33.";

export const metadata: Metadata = {
  title: TITRE,
  description: DESCRIPTION,
  alternates: { canonical: `${SITE_URL}/pieces-occasion.html` },
  openGraph: {
    title: TITRE,
    description:
      "Pièces d'occasion contrôlées, 40 à 70 % moins cher que le neuf. Tél 04 94 08 15 33.",
    url: `${SITE_URL}/pieces-occasion.html`,
  },
  twitter: { title: TITRE },
};

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
          service: {
            name: "Vente de pièces détachées automobiles d'occasion",
            serviceType: "Pièces auto d'occasion vérifiées",
            path: "/pieces-occasion.html",
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
            <div className="group relative overflow-hidden rounded-[20px]" style={{ aspectRatio: "5/4" }}>
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
            <h2 className="text-[clamp(1.6rem,3.2vw,2.4rem)] font-bold leading-tight tracking-[-0.015em] text-foreground">
              Anciens modèles et véhicules de collection
            </h2>
          </Reveal>
          <Reveal>
            <p>
              C&apos;est l&apos;atout d&apos;une casse établie : des pièces qui ne sont plus
              fabriquées restent disponibles pour les modèles anciens et de collection. Optiques,
              poignées, moteurs, garnitures d&apos;origine passent régulièrement en stock.
              Collectionneurs et restaurateurs peuvent communiquer une référence ou une carte
              grise ; la recherche est étendue aux confrères si nécessaire.
            </p>
          </Reveal>
          <Reveal>
            <h2 className="pt-4 text-[clamp(1.6rem,3.2vw,2.4rem)] font-bold leading-tight tracking-[-0.015em] text-foreground">
              L&apos;intérêt de l&apos;occasion professionnelle
            </h2>
          </Reveal>
          <Reveal>
            <p>
              Un véhicule hors d&apos;usage comporte de nombreuses pièces encore fonctionnelles.
              Le rôle d&apos;une casse est de les identifier, de les démonter et de les contrôler
              avant revente. Le prix ne comprend que la pièce. Une pièce réutilisée est par
              ailleurs une pièce qui n&apos;a pas à être fabriquée.
            </p>
          </Reveal>
          <Reveal>
            <p>
              Depuis 2017, les réparateurs sont tenus de proposer des pièces d&apos;occasion pour
              une part importante des réparations (article L.224-67 du Code de la consommation).
              Les professionnels du Var s&apos;approvisionnent chez P.A.C. de longue date.
            </p>
          </Reveal>
          <Reveal>
            <h2 className="pt-4 text-[clamp(1.6rem,3.2vw,2.4rem)] font-bold leading-tight tracking-[-0.015em] text-foreground">
              Vérifier une disponibilité
            </h2>
          </Reveal>
          <Reveal>
            <p>
              Le stock évolue quotidiennement. Appelez le{" "}
              <a href={NAP.telephoneHref} className="font-semibold text-foreground underline decoration-accent decoration-2 underline-offset-4 hover:decoration-4">
                04 94 08 15 33
              </a>{" "}
              (lundi au vendredi, 8h–12h et 14h–18h) muni de la carte grise. Le véhicule est
              identifié, la pièce vérifiée, l&apos;état et le prix communiqués, et la pièce
              réservée à votre nom.
            </p>
          </Reveal>
        </div>
      </section>

      <CtaPanel
        titre="La pièce est peut-être déjà en stock."
        texte="Un appel suffit pour le vérifier, aux heures d'ouverture du comptoir."
        image="/img/atelier-900.webp"
        alt="Atelier avec véhicule capot ouvert sur un pont élévateur"
      />
    </>
  );
}
