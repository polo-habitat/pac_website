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
        titre="L'occasion, contrôlée une par une."
        chapo="En occasion, vous payez souvent 40 à 70 % de moins qu'une pièce neuve en concession. Chez nous, chaque pièce est démontée, contrôlée et référencée avant d'être mise en vente."
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
              C&apos;est le vrai atout d&apos;une casse installée depuis longtemps : on a des
              pièces que plus personne ne fabrique. Un optique de phare d&apos;une compacte des
              années 90, une poignée introuvable, un moteur d&apos;ancien modèle, des garnitures
              d&apos;origine pour une restauration… ça passe régulièrement dans notre stock.
              Collectionneurs et restaurateurs du Var, appelez avec la référence ou la carte
              grise : on cherche chez nous, et chez les confrères si besoin.
            </p>
          </Reveal>
          <Reveal>
            <h2 className="pt-4 text-[clamp(1.6rem,3.2vw,2.4rem)] font-bold leading-tight tracking-[-0.015em] text-foreground">
              Pourquoi passer par une casse
            </h2>
          </Reveal>
          <Reveal>
            <p>
              Une voiture en fin de vie, c&apos;est des dizaines de pièces qui ont encore des
              années devant elles. Notre travail, c&apos;est de les repérer, de les démonter
              proprement et de les contrôler avant de les revendre. Vous payez la pièce, rien
              d&apos;autre. Et une pièce réutilisée, c&apos;est une pièce qu&apos;on n&apos;a pas
              eu besoin de fabriquer.
            </p>
          </Reveal>
          <Reveal>
            <p>
              Depuis 2017, les garagistes sont d&apos;ailleurs tenus de proposer des pièces
              d&apos;occasion pour une bonne partie des réparations (article L.224-67 du Code de
              la consommation). Beaucoup de pros du Var n&apos;ont pas attendu la loi pour venir
              chez nous.
            </p>
          </Reveal>
          <Reveal>
            <h2 className="pt-4 text-[clamp(1.6rem,3.2vw,2.4rem)] font-bold leading-tight tracking-[-0.015em] text-foreground">
              Vérifier une disponibilité
            </h2>
          </Reveal>
          <Reveal>
            <p>
              Le stock change tous les jours. Appelez le{" "}
              <a href={NAP.telephoneHref} className="font-semibold text-foreground underline decoration-accent decoration-2 underline-offset-4 hover:decoration-4">
                04 94 08 15 33
              </a>{" "}
              (lun–ven, 8h–12h et 14h–18h) avec la carte grise sous les yeux : on identifie votre
              véhicule, on vérifie la pièce, on vous donne l&apos;état et le prix, et on la met de
              côté à votre nom.
            </p>
          </Reveal>
        </div>
      </section>

      <CtaPanel
        titre="Votre pièce est peut-être déjà sur l'étagère."
        texte="Un coup de fil suffit pour le savoir, pendant les heures d'ouverture."
        image="/img/atelier-900.webp"
        alt="Atelier avec véhicule capot ouvert sur un pont élévateur"
      />
    </>
  );
}
