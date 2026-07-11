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
        titre="Pièces d'occasion vérifiées, de la casse au comptoir."
        chapo="Une pièce d'occasion contrôlée coûte en général 40 à 70 % de moins que la même pièce neuve en concession. Chez P.A.C. à La Farlède, chaque pièce est démontée, contrôlée et référencée avant d'être proposée à la vente."
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
              Anciens modèles, youngtimers et véhicules de collection
            </h2>
          </Reveal>
          <Reveal>
            <p>
              C&apos;est la vraie force d&apos;une casse installée depuis 1992 : des pièces que
              plus personne ne fabrique. Optique de phare d&apos;une compacte des années 90,
              poignée de portière introuvable, moteur complet d&apos;un ancien modèle, garnitures
              d&apos;origine pour une restauration : ce qui a disparu des catalogues passe encore
              régulièrement dans le stock de La Farlède. Collectionneurs et restaurateurs du Var,
              appelez avec la référence ou la carte grise : l&apos;équipe cherche dans le stock,
              et chez les confrères si besoin.
            </p>
          </Reveal>
          <Reveal>
            <h2 className="pt-4 text-[clamp(1.6rem,3.2vw,2.4rem)] font-bold leading-tight tracking-[-0.015em] text-foreground">
              Pourquoi l&apos;occasion d&apos;une casse professionnelle
            </h2>
          </Reveal>
          <Reveal>
            <p>
              Un véhicule hors d&apos;usage contient des dizaines de pièces qui ont encore des
              années de service devant elles. Le rôle d&apos;une casse automobile comme P.A.C. est
              de les identifier, de les démonter proprement et de les contrôler avant de les
              revendre. Résultat : vous payez la pièce, pas le marketing. C&apos;est aussi le
              choix le plus écologique, puisqu&apos;une pièce réutilisée est une pièce qui
              n&apos;a pas besoin d&apos;être fabriquée.
            </p>
          </Reveal>
          <Reveal>
            <p>
              Depuis 2017, la loi française oblige d&apos;ailleurs les garagistes à proposer des
              pièces issues de l&apos;économie circulaire pour de nombreuses réparations (article
              L.224-67 du Code de la consommation). Les professionnels du Var qui
              s&apos;approvisionnent chez P.A.C. le font depuis bien plus longtemps.
            </p>
          </Reveal>
          <Reveal>
            <h2 className="pt-4 text-[clamp(1.6rem,3.2vw,2.4rem)] font-bold leading-tight tracking-[-0.015em] text-foreground">
              Comment vérifier une disponibilité
            </h2>
          </Reveal>
          <Reveal>
            <p>
              Le stock d&apos;une casse change tous les jours. Appelez le{" "}
              <a href={NAP.telephoneHref} className="font-semibold text-foreground underline decoration-accent decoration-2 underline-offset-4 hover:decoration-4">
                04 94 08 15 33
              </a>{" "}
              (lun–ven, 8h–12h et 14h–18h) avec votre carte grise sous les yeux : l&apos;équipe
              identifie précisément votre véhicule, vérifie la pièce, annonce l&apos;état et le
              prix, et la met de côté à votre nom.
            </p>
          </Reveal>
        </div>
      </section>

      <CtaPanel
        titre="Votre pièce est peut-être déjà sur l'étagère."
        texte="Un coup de fil suffit pour le savoir. Réponse immédiate pendant les horaires du comptoir."
        image="/img/atelier-900.webp"
        alt="Atelier avec véhicule capot ouvert sur un pont élévateur"
      />
    </>
  );
}
