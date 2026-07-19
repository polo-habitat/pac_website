import type { Metadata } from "next";
import Image from "next/image";
import { ArrowRight, CreditCard, MapPin, ParkingSquare } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableRow } from "@/components/ui/table";
import { ContactForm } from "@/components/contact-form";
import { JsonLd } from "@/components/json-ld";
import { Magnetic } from "@/components/motion/magnetic";
import { Reveal } from "@/components/motion/reveal";
import { PageBanner } from "@/components/page-banner";
import { asset, NAP, SITE_URL, sousPageJsonLd, WEB3FORMS_ACCESS_KEY } from "@/lib/site";

const TITRE = "Contact P.A.C. La Farlède · 04 94 08 15 33 (Var)";
const DESCRIPTION =
  "P.A.C. Pièces Auto Cass : 04 94 08 15 33, 25 rue Gay Lussac, ZI Toulon Est, 83210 La Farlède. Lun-ven 8h-12h / 14h-18h. Parking, CB, accès PMR.";

export const metadata: Metadata = {
  title: TITRE,
  description: DESCRIPTION,
  alternates: { canonical: `${SITE_URL}/contact.html` },
  openGraph: {
    title: TITRE,
    description: "25 rue Gay Lussac, ZI Toulon Est, 83210 La Farlède. Lun-ven 8h-12h / 14h-18h.",
    url: `${SITE_URL}/contact.html`,
  },
  twitter: { title: TITRE },
};

const HORAIRES = [
  ["Lundi", "8h–12h · 14h–18h"],
  ["Mardi", "8h–12h · 14h–18h"],
  ["Mercredi", "8h–12h · 14h–18h"],
  ["Jeudi", "8h–12h · 14h–18h"],
  ["Vendredi", "8h–12h · 14h–18h"],
] as const;

export default function Contact() {
  return (
    <>
      <JsonLd data={sousPageJsonLd({ breadcrumb: "Contact & accès", contactPage: true })} />
      <PageBanner
        fil="Contact & accès"
        titre="Nous contacter."
        image="/img/hero-contact-1600.webp"
        imageAlt="Mécanicien à l'établi dans l'atelier"
        chapo="Contactez-nous pour toute demande de renseignements."
      />

      <section aria-label="Coordonnées et horaires" className="mx-auto max-w-6xl px-5 pb-14 sm:pb-20">
        <div className="grid gap-10 md:grid-cols-[1.2fr_1fr]">
          <Reveal>
            <div>
              <a
                href={NAP.telephoneHref}
                className="font-wide inline-block text-[clamp(2rem,5.4vw,4rem)] font-extrabold tracking-tight underline decoration-accent decoration-[0.08em] underline-offset-8 transition-all hover:decoration-[0.14em]"
              >
                {NAP.telephone}
              </a>
              <address className="mt-6 not-italic leading-relaxed text-muted-foreground">
                <b className="text-foreground">{NAP.nom}</b>
                <br />
                {NAP.rue} · {NAP.zone}
                <br />
                {NAP.codePostal} {NAP.ville} · {NAP.departement}
              </address>
              <ul className="mt-5 flex flex-wrap gap-2" aria-label="Services sur place">
                {[
                  { icone: CreditCard, label: "Carte bancaire" },
                  { icone: MapPin, label: "Retrait au comptoir" },
                  { icone: ParkingSquare, label: "Parking · accès PMR" },
                ].map((b) => (
                  <li key={b.label}>
                    <Badge variant="secondary" className="gap-1.5 rounded-full px-3.5 py-1.5 text-xs font-semibold">
                      <b.icone className="size-3.5" aria-hidden="true" />
                      {b.label}
                    </Badge>
                  </li>
                ))}
              </ul>
              <div className="mt-7">
                <Magnetic>
                  <Button asChild className="h-12 rounded-full bg-accent px-6 text-base font-bold text-accent-foreground hover:bg-accent/85">
                    <a href={NAP.mapsUrl} target="_blank" rel="noopener noreferrer">
                      Itinéraire Google Maps
                      <span className="sr-only"> (nouvelle fenêtre)</span>
                      <ArrowRight className="size-4.5" aria-hidden="true" />
                    </a>
                  </Button>
                </Magnetic>
              </div>
            </div>
          </Reveal>
          <Reveal delay={0.12}>
            <div className="pac-verre pac-ombre-douce rounded-[28px] p-5 sm:p-7">
            <Table>
              <TableCaption className="text-left">Horaires du comptoir</TableCaption>
              <TableBody>
                {HORAIRES.map(([jour, heures]) => (
                  <TableRow key={jour}>
                    <TableHead scope="row" className="font-semibold text-foreground">
                      {jour}
                    </TableHead>
                    <TableCell className="text-right tabular-nums">{heures}</TableCell>
                  </TableRow>
                ))}
                <TableRow className="text-muted-foreground">
                  <TableHead scope="row" className="font-semibold">
                    Samedi & dimanche
                  </TableHead>
                  <TableCell className="text-right">Fermé</TableCell>
                </TableRow>
                <TableRow className="text-muted-foreground">
                  <TableHead scope="row" className="font-semibold">
                    Jours fériés
                  </TableHead>
                  <TableCell className="text-right">Fermé</TableCell>
                </TableRow>
              </TableBody>
            </Table>
            </div>
          </Reveal>
        </div>
      </section>

      {WEB3FORMS_ACCESS_KEY ? (
      <section aria-labelledby="t-ecrire" className="mx-auto max-w-3xl px-5 pb-14 sm:pb-20">
        <Reveal>
          <h2 id="t-ecrire" className="pac-eyebrow pac-kick text-muted-foreground">Écrire au comptoir</h2>
        </Reveal>
        <Reveal delay={0.1}>
          <div className="mt-5">
            <ContactForm />
          </div>
        </Reveal>
      </section>
      ) : null}

      <section className="mx-auto max-w-6xl px-5">
        <div className="grid gap-10 md:grid-cols-[1.1fr_1fr]">
          <div className="max-w-[62ch] space-y-5 leading-relaxed text-muted-foreground">
            <Reveal>
              <h2 className="text-[clamp(1.6rem,3.2vw,2.4rem)] font-bold leading-tight tracking-[-0.015em] text-foreground">
                Venir à la ZI Toulon Est
              </h2>
            </Reveal>
            <Reveal>
              <p>
                La ZI Toulon Est se situe au sud de La Farlède, à une dizaine de minutes de Toulon
                par l&apos;A57, sortie La Farlède. Le comptoir est au 25 rue Gay Lussac ; un
                parking est disponible devant l&apos;entrée.
              </p>
            </Reveal>
            <Reveal>
              <p>
                Pour une pièce précise, un appel au{" "}
                <a href={NAP.telephoneHref} className="font-semibold text-foreground underline decoration-accent decoration-2 underline-offset-4 hover:decoration-4">
                  04 94 08 15 33
                </a>{" "}
                avant tout déplacement évite un aller-retour inutile : si la référence doit être
                commandée, le délai est annoncé ; si elle est en stock, elle est réservée.
              </p>
            </Reveal>
            <Reveal>
              <h2 className="pt-4 text-[clamp(1.6rem,3.2vw,2.4rem)] font-bold leading-tight tracking-[-0.015em] text-foreground">
                Vous êtes un professionnel ?
              </h2>
            </Reveal>
            <Reveal>
              <p>
                Garages et carrosseries du Var s&apos;approvisionnent chez P.A.C. de longue date.
                Communiquez vos références par téléphone : Pièces Auto Cass tient compte des
                contraintes d&apos;atelier.
              </p>
            </Reveal>
          </div>
          <Reveal delay={0.1}>
            <div className="pac-ombre-douce group relative overflow-hidden rounded-[28px]" style={{ aspectRatio: "3/2" }}>
              <Image
                src={asset("/img/equipe-900.webp")}
                alt="Mécanicien souriant devant un véhicule capot ouvert, en atelier"
                fill
                sizes="(max-width: 768px) 92vw, 42vw"
                className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.04]"
              />
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
