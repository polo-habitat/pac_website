import type { Metadata } from "next";

import { CtaPanel } from "@/components/cta-panel";
import { JsonLd } from "@/components/json-ld";
import { Reveal } from "@/components/motion/reveal";
import { PageBanner } from "@/components/page-banner";
import { PhonePill } from "@/components/phone-pill";
import { NAP, pageMeta, sousPageJsonLd } from "@/lib/site";

export const metadata: Metadata = pageMeta({
  titre: "Rachat de voiture dans le Var · P.A.C. La Farlède, près de Toulon",
  description:
    "Vendre sa voiture dans le Var : P.A.C. étudie le rachat selon le modèle et son état. Évaluation au comptoir de La Farlède ou par téléphone au 04 94 08 15 33.",
  path: "/rachat-de-voiture",
  ogDescription:
    "Rachat de voiture selon le modèle et son état, dans l'est varois. Tél 04 94 08 15 33.",
});

const ETAPES = [
  ["Prise de contact", "Appelez le 04 94 08 15 33 en précisant la marque, le modèle, l'année, le kilométrage et l'état du véhicule."],
  ["Évaluation", "Selon le modèle et son état, une proposition de rachat peut être formulée. L'évaluation se fait au comptoir ou par téléphone ; elle n'est pas systématique."],
  ["Documents", "En cas d'accord, les documents à réunir sont indiqués : carte grise, pièce d'identité et certificat de situation administrative."],
  ["Cession", "La cession est enregistrée et le véhicule est retiré du fichier des immatriculations : plus d'assurance, ni de contrôle technique à assurer."],
] as const;

export default function RachatDeVoiture() {
  return (
    <>
      <JsonLd
        data={sousPageJsonLd({
          path: "/rachat-de-voiture",
          service: {
            name: "Rachat de voiture selon les cas",
            serviceType: "Rachat de véhicules, sur étude au comptoir ou par téléphone",
          },
          breadcrumb: "Rachat de voiture",
        })}
      />
      <PageBanner
        fil="Rachat de voiture"
        titre="Rachat de voiture dans l'est du Var."
        image="/img/hero-rachat-1600.webp"
        imageAlt="Ancienne berline garée le long d'un mur de pierre"
        chapo="Selon le modèle et son état, P.A.C. peut racheter votre voiture. L'évaluation se fait au comptoir de La Farlède ou par téléphone ; elle n'est pas systématique."
        action={<PhonePill label="Faire évaluer un véhicule" />}
      />

      <section className="mx-auto max-w-6xl px-5 py-14 sm:py-20">
        <div className="max-w-[70ch]">
          <div className="space-y-5 leading-relaxed text-muted-foreground">
            <Reveal>
              <p>
                L&apos;entreprise étudie les opportunités d&apos;acquisition de véhicules. Cette
                activité demeure sélective et s&apos;opère de manière stricte au cas par cas.
              </p>
            </Reveal>
            <Reveal>
              <p>
                L&apos;évaluation repose sur une analyse technique approfondie du modèle présenté
                et dépend directement des besoins en approvisionnement de l&apos;établissement. Il
                n&apos;existe pas de procédure de reprise systématique. Les propositions
                d&apos;acquisition sont formulées uniquement à l&apos;issue d&apos;une expertise
                physique du véhicule.
              </p>
            </Reveal>
            <Reveal>
              <p>
                Pour vendre une voiture d&apos;occasion à un professionnel du Var : un appel au
                04 94 08 15 33 ou un passage au comptoir de La Farlède, près de Toulon. Les
                pièces issues des véhicules repris rejoignent le stock de{" "}
                <a
                  href="/pieces-occasion"
                  className="font-semibold text-foreground underline decoration-accent decoration-2 underline-offset-4 hover:decoration-4"
                >
                  pièces d&apos;occasion
                </a>
                .
              </p>
            </Reveal>
          </div>
          <Reveal>
            <h2 className="mt-12 text-[clamp(1.6rem,3.2vw,2.4rem)] font-bold leading-tight tracking-[-0.015em]">
              Comment se passe le rachat
            </h2>
          </Reveal>
          <ol className="mt-7 space-y-4">
            {ETAPES.map(([titre, texte], i) => (
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

          <Reveal>
            <h2 className="mt-14 text-[clamp(1.6rem,3.2vw,2.4rem)] font-bold leading-tight tracking-[-0.015em]">
              Quels véhicules
            </h2>
          </Reveal>
          <Reveal>
            <p className="mt-5 leading-relaxed text-muted-foreground">
              Voitures et utilitaires, en état de marche ou immobilisés. Les anciens modèles
              et véhicules de collection présentent souvent des pièces recherchées :
              ils font l&apos;objet d&apos;une attention particulière. Communiquez la référence ou
              la carte grise au{" "}
              <a href={NAP.telephoneHref} className="font-semibold text-foreground underline decoration-accent decoration-2 underline-offset-4 hover:decoration-4">
                04 94 08 15 33
              </a>{" "}
              ou passez au comptoir du 25 rue Gay Lussac à La Farlède.
            </p>
          </Reveal>
        </div>
      </section>

      <CtaPanel
        titre="Une voiture à faire évaluer ?"
        texte="Étude du dossier sur La Farlède, Toulon, La Garde, La Valette, Solliès, La Crau, Cuers, Hyères et l'ensemble de l'est varois."
        image="/img/atelier-900.webp"
        alt="Véhicule pris en charge en atelier, capot ouvert sur le pont"
      />
    </>
  );
}
