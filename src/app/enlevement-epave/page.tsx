import type { Metadata } from "next";

import { CtaPanel } from "@/components/cta-panel";
import { JsonLd } from "@/components/json-ld";
import { Reveal } from "@/components/motion/reveal";
import { PageBanner } from "@/components/page-banner";
import { PhonePill } from "@/components/phone-pill";
import { NAP, SITE_URL, sousPageJsonLd } from "@/lib/site";

const TITRE = "Enlèvement d'épave & recyclage VHU · P.A.C. La Farlède (Var)";
const DESCRIPTION =
  "P.A.C. enlève votre épave dans l'est varois, dépollue et recycle le véhicule hors d'usage, et peut racheter votre véhicule selon les cas. Tél 04 94 08 15 33.";

export const metadata: Metadata = {
  title: TITRE,
  description: DESCRIPTION,
  alternates: { canonical: `${SITE_URL}/enlevement-epave.html` },
  openGraph: {
    title: TITRE,
    description:
      "Enlèvement, dépollution et recyclage de véhicules hors d'usage dans l'est varois. Tél 04 94 08 15 33.",
    url: `${SITE_URL}/enlevement-epave.html`,
  },
  twitter: { title: TITRE },
};

const ETAPES = [
  ["Vous appelez le 04 94 08 15 33", "et décrivez le véhicule : marque, modèle, état, lieu de stationnement."],
  ["On convient des modalités", "date d'enlèvement et documents à préparer (carte grise, pièce d'identité, certificat de situation administrative)."],
  ["Le véhicule est enlevé", "puis dépollué : batterie, fluides, pneumatiques et éléments dangereux sont extraits et traités."],
  ["Les pièces réutilisables sont sauvées", "et rejoignent le stock ; le reste part au recyclage matière."],
] as const;

export default function EnlevementEpave() {
  return (
    <>
      <JsonLd
        data={sousPageJsonLd({
          service: {
            name: "Enlèvement d'épaves et recyclage de véhicules hors d'usage",
            serviceType: "Épaviste, recyclage VHU, rachat de véhicules selon les cas",
            path: "/enlevement-epave.html",
          },
          breadcrumb: "Épaves & recyclage",
        })}
      />
      <PageBanner
        fil="Épaves & recyclage"
        titre="Votre épave repart, ses pièces revivent."
        chapo="Un véhicule qui ne roule plus n'a rien à faire dans votre jardin ou sur un parking : la loi impose de le confier à un centre de traitement des véhicules hors d'usage. P.A.C. organise l'enlèvement dans l'est varois et prend en charge la dépollution, le démontage et le recyclage."
        action={<PhonePill label="Organiser un enlèvement" />}
      />

      <section className="mx-auto max-w-6xl px-5 py-14 sm:py-20">
        <div className="max-w-[70ch]">
          <Reveal>
            <h2 className="text-[clamp(1.6rem,3.2vw,2.4rem)] font-bold leading-tight tracking-[-0.015em]">
              Comment se passe l&apos;enlèvement
            </h2>
          </Reveal>
          <ol className="mt-7 space-y-4">
            {ETAPES.map(([titre, texte], i) => (
              <Reveal key={titre} delay={i * 0.06}>
                <li className="pac-verre flex gap-5 rounded-[20px] p-6">
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
            <p className="mt-6 leading-relaxed text-muted-foreground">
              À l&apos;issue du traitement, le véhicule est sorti du fichier des
              immatriculations : vous n&apos;êtes plus responsable de rien, ni assurance, ni
              fourrière, ni amende.
            </p>
          </Reveal>

          <Reveal>
            <h2 className="mt-14 text-[clamp(1.6rem,3.2vw,2.4rem)] font-bold leading-tight tracking-[-0.015em]">
              Rachat de véhicules
            </h2>
          </Reveal>
          <Reveal>
            <p className="mt-5 leading-relaxed text-muted-foreground">
              Selon le véhicule et son état, P.A.C. peut également racheter votre voiture. Ce
              n&apos;est pas systématique : chaque cas est étudié. Le plus simple est de nous
              contacter au{" "}
              <a href={NAP.telephoneHref} className="font-semibold text-foreground underline decoration-accent decoration-2 underline-offset-4 hover:decoration-4">
                04 94 08 15 33
              </a>{" "}
              ou de vous rendre directement au comptoir du 25 rue Gay Lussac à La Farlède : vous
              aurez une réponse rapide et franche.
            </p>
          </Reveal>

          <Reveal>
            <h2 className="mt-14 text-[clamp(1.6rem,3.2vw,2.4rem)] font-bold leading-tight tracking-[-0.015em]">
              Pourquoi c&apos;est important
            </h2>
          </Reveal>
          <Reveal>
            <p className="mt-5 leading-relaxed text-muted-foreground">
              Une voiture contient environ 85 % de matériaux valorisables : métaux, verre,
              plastiques, et surtout des dizaines de pièces en parfait état de marche. Chaque
              véhicule traité proprement, c&apos;est moins de pollution dans les sols et des
              pièces d&apos;occasion au bon prix pour les automobilistes du Var. La boucle est
              bouclée au même comptoir depuis 1992.
            </p>
          </Reveal>
        </div>
      </section>

      <CtaPanel
        titre="Une épave à enlever dans l'est varois ?"
        texte="La Farlède, Toulon, La Garde, La Valette, Solliès, La Crau, Cuers, Hyères : un appel et c'est réglé."
        image="/img/atelier-900.webp"
        alt="Véhicule pris en charge en atelier, capot ouvert sur le pont"
      />
    </>
  );
}
