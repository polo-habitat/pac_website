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
  ["Prise de contact", "Appelez le 04 94 08 15 33 en précisant la marque, le modèle, l'état et le lieu de stationnement."],
  ["Rendez-vous", "Une date d'enlèvement est fixée et les documents à réunir vous sont indiqués : carte grise, pièce d'identité, certificat de situation administrative."],
  ["Enlèvement et dépollution", "Le véhicule est enlevé puis dépollué : batterie, fluides, pneumatiques et éléments dangereux sont extraits et traités."],
  ["Recyclage", "Les pièces réutilisables rejoignent le stock ; le reste est orienté vers le recyclage matière."],
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
        titre="Enlèvement d'épaves dans l'est du Var."
        chapo="Un véhicule hors d'usage doit être confié à un centre agréé VHU. P.A.C. prend en charge l'enlèvement dans l'est du Var, la dépollution et le recyclage."
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
              Une fois le véhicule traité, il est retiré du fichier des immatriculations. Vous
              n&apos;êtes plus redevable de rien : ni assurance, ni fourrière, ni amende.
            </p>
          </Reveal>

          <Reveal>
            <h2 className="mt-14 text-[clamp(1.6rem,3.2vw,2.4rem)] font-bold leading-tight tracking-[-0.015em]">
              Rachat de véhicules
            </h2>
          </Reveal>
          <Reveal>
            <p className="mt-5 leading-relaxed text-muted-foreground">
              Selon le véhicule et son état, un rachat peut être proposé. Cette évaluation
              n&apos;est pas systématique. Contactez le{" "}
              <a href={NAP.telephoneHref} className="font-semibold text-foreground underline decoration-accent decoration-2 underline-offset-4 hover:decoration-4">
                04 94 08 15 33
              </a>{" "}
              ou le comptoir du 25 rue Gay Lussac à La Farlède.
            </p>
          </Reveal>

          <Reveal>
            <h2 className="mt-14 text-[clamp(1.6rem,3.2vw,2.4rem)] font-bold leading-tight tracking-[-0.015em]">
              L&apos;intérêt du recyclage
            </h2>
          </Reveal>
          <Reveal>
            <p className="mt-5 leading-relaxed text-muted-foreground">
              Une automobile est composée à près de 85 % de matières valorisables : métaux, verre,
              plastiques, ainsi que de nombreuses pièces en état de marche. Un traitement conforme
              limite la pollution et alimente la filière d&apos;occasion locale.
            </p>
          </Reveal>
        </div>
      </section>

      <CtaPanel
        titre="Un véhicule hors d'usage à faire enlever ?"
        texte="Intervention sur La Farlède, Toulon, La Garde, La Valette, Solliès, La Crau, Cuers, Hyères et l'ensemble de l'est varois."
        image="/img/atelier-900.webp"
        alt="Véhicule pris en charge en atelier, capot ouvert sur le pont"
      />
    </>
  );
}
