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
  ["Vous appelez", "au 04 94 08 15 33. Dites-nous la marque, le modèle, l'état et où se trouve la voiture."],
  ["On fixe un rendez-vous", "et on vous dit quels papiers préparer : carte grise, pièce d'identité et certificat de situation administrative."],
  ["On enlève et on dépollue", "batterie, fluides, pneus : tout ce qui est polluant est retiré et traité comme il faut."],
  ["On garde ce qui ressert", "les pièces encore bonnes rejoignent le stock, le reste part au recyclage."],
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
        titre="Votre épave, on vient la chercher."
        chapo="Une voiture qui ne roule plus doit être confiée à un centre agréé VHU, c'est la loi. On vient la chercher dans l'est du Var, on la dépollue et on la démonte pour le recyclage."
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
              Une fois le véhicule traité, il est sorti du fichier des immatriculations. Vous
              n&apos;avez plus rien à gérer : ni assurance, ni fourrière, ni amende.
            </p>
          </Reveal>

          <Reveal>
            <h2 className="mt-14 text-[clamp(1.6rem,3.2vw,2.4rem)] font-bold leading-tight tracking-[-0.015em]">
              Rachat de véhicules
            </h2>
          </Reveal>
          <Reveal>
            <p className="mt-5 leading-relaxed text-muted-foreground">
              Selon le véhicule et son état, on peut aussi vous le racheter. Ce n&apos;est pas
              automatique, chaque cas est différent. Appelez le{" "}
              <a href={NAP.telephoneHref} className="font-semibold text-foreground underline decoration-accent decoration-2 underline-offset-4 hover:decoration-4">
                04 94 08 15 33
              </a>{" "}
              ou passez au comptoir, 25 rue Gay Lussac à La Farlède, on vous répond rapidement.
            </p>
          </Reveal>

          <Reveal>
            <h2 className="mt-14 text-[clamp(1.6rem,3.2vw,2.4rem)] font-bold leading-tight tracking-[-0.015em]">
              Pourquoi c&apos;est utile
            </h2>
          </Reveal>
          <Reveal>
            <p className="mt-5 leading-relaxed text-muted-foreground">
              Une voiture, c&apos;est environ 85 % de matière qui se récupère : métaux, verre,
              plastiques, et surtout des dizaines de pièces encore en état de marche. Bien traité,
              chaque véhicule évite de la pollution et remet des pièces d&apos;occasion en
              circulation dans le Var.
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
