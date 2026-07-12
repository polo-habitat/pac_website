import type { Metadata } from "next";
import Image from "next/image";
import { ChevronRight, CreditCard, MapPin, ParkingSquare } from "lucide-react";

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableRow } from "@/components/ui/table";
import { CtaPill } from "@/components/cta-pill";
import { JsonLd } from "@/components/json-ld";
import { MotsDefilants } from "@/components/mots-defilants";
import { Counter } from "@/components/motion/counter";
import { Reveal } from "@/components/motion/reveal";
import { SplitText } from "@/components/motion/split-text";
import {
  asset,
  etablissementComplet,
  FAQ,
  faqPageJsonLd,
  NAP,
  SITE_URL,
  webSiteJsonLd,
} from "@/lib/site";

export const metadata: Metadata = {
  alternates: { canonical: `${SITE_URL}/` },
  openGraph: {
    title: "P.A.C. · La bonne pièce au bon prix · La Farlède (Var)",
    description:
      "Pièces auto neuves et d'occasion depuis 1992. Enlèvement d'épaves, recyclage VHU. ZI Toulon Est, La Farlède. Tél 04 94 08 15 33.",
    url: `${SITE_URL}/`,
  },
  twitter: {
    title: "P.A.C. · La bonne pièce au bon prix · La Farlède (Var)",
    description:
      "Pièces auto neuves et d'occasion depuis 1992 à La Farlède. Tél 04 94 08 15 33.",
  },
};

const PIECES_NEUVES_LISTE = [
  "Plaquettes de frein",
  "Filtres & huiles",
  "Courroies",
  "Amortisseurs",
  "Embrayages",
  "Batteries",
  "Bougies",
  "Disques de frein",
] as const;

const HORAIRES = [
  ["Lundi", "8h–12h · 14h–18h"],
  ["Mardi", "8h–12h · 14h–18h"],
  ["Mercredi", "8h–12h · 14h–18h"],
  ["Jeudi", "8h–12h · 14h–18h"],
  ["Vendredi", "8h–12h · 14h–18h"],
] as const;

export default function Accueil() {
  return (
    <>
      <JsonLd data={etablissementComplet} />
      <JsonLd data={webSiteJsonLd} />
      <JsonLd data={faqPageJsonLd} />

      {/* ================= HERO : image automobile plein cadre,
          voile sombre, titre sobre centré par-dessus ================= */}
      <section aria-label="Présentation" className="relative flex min-h-[100svh] items-center overflow-hidden">
        <div className="pac-zoom absolute inset-0">
          <Image
            src={asset("/img/hero-voiture-1600.webp")}
            alt="Automobile de collection, berline noire aux chromes, phares allumés"
            fill
            sizes="100vw"
            priority
            className="object-cover"
          />
        </div>
        <div
          className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/40 to-black/75"
          aria-hidden="true"
        />
        {/* Renfort d'en-tête : assombrit la bande supérieure pour la lisibilité
            du menu blanc, même là où la photo est claire (ciel, bâtiments). */}
        <div
          className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-black/55 to-transparent"
          aria-hidden="true"
        />
        <div className="relative mx-auto w-full max-w-5xl px-5 pb-20 pt-32 text-center">
          <Reveal y={12}>
            <p className="pac-eyebrow text-white/70">
              Casse automobile · La Farlède depuis 1992
            </p>
          </Reveal>
          <h1 className="mt-6 text-[clamp(2.4rem,5.8vw,4.8rem)] font-semibold leading-[1.06] tracking-[-0.02em] text-white">
            <SplitText text="Pièces détachées automobiles," delay={0.15} />
            <br />
            <SplitText text="neuves et d'occasion." delay={0.55} />
          </h1>
          <Reveal delay={0.95} y={20}>
            <p className="mx-auto mt-7 max-w-[46ch] text-lg leading-relaxed text-white/80">
              Pour voitures et utilitaires, au comptoir de la ZI Toulon Est.
            </p>
          </Reveal>
          <Reveal delay={1.1} y={16}>
            <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
              <CtaPill href={NAP.telephoneHref}>Appeler le {NAP.telephone}</CtaPill>
              <CtaPill href="#gammes" tone="blanche">
                Voir les pièces
              </CtaPill>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ================= UNE MEILLEURE FAÇON : image qui s'élargit
          + grand texte à droite ================= */}
      <section aria-labelledby="t-methode" className="overflow-x-clip bg-background py-24 sm:py-36">
        <div className="mx-auto grid max-w-[100rem] items-center gap-12 px-5 sm:px-10 md:grid-cols-[1.1fr_1fr] md:gap-20">
          <div className="pac-grandit relative aspect-[4/3] overflow-hidden md:aspect-[5/4]">
            <div className="pac-zoom absolute inset-0">
              <Image
                src={asset("/img/equipe-900.webp")}
                alt="Mécanicien souriant devant un véhicule capot ouvert, en atelier"
                fill
                sizes="(max-width: 768px) 100vw, 55vw"
                className="object-cover"
              />
            </div>
          </div>
          <div className="md:pr-10">
            <Reveal y={16}>
              <p className="pac-eyebrow text-muted-foreground">Fonctionnement</p>
            </Reveal>
            <h2 id="t-methode" className="mt-6 text-[clamp(1.6rem,2.9vw,2.5rem)] font-semibold leading-[1.2] tracking-[-0.015em]">
              <SplitText text="Pas de vente en ligne. Une pièce se demande par téléphone et se retire au comptoir." />
            </h2>
            <Reveal delay={0.25}>
              <p className="mt-6 max-w-[48ch] leading-relaxed text-muted-foreground">
                Le comptoir répond au{" "}
                <a
                  href={NAP.telephoneHref}
                  className="font-semibold text-foreground underline decoration-accent decoration-2 underline-offset-4 hover:decoration-4"
                >
                  {NAP.telephone}
                </a>{" "}
                du lundi au vendredi. Avec la carte grise ou la référence, la disponibilité,
                l&apos;état et le prix sont communiqués avant tout déplacement.
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ================= DEUX CARTES : neuves (mots défilants) /
          occasion & collection (carte sombre) ================= */}
      <section id="gammes" aria-label="Les gammes" className="scroll-mt-28 px-3 sm:px-4">
        <div className="mx-auto grid max-w-[100rem] gap-3 sm:gap-4 md:grid-cols-2">
          <Reveal className="h-full">
            <article className="flex h-full min-h-[34rem] flex-col rounded-[32px] bg-sable p-8 sm:p-10">
              <p className="pac-eyebrow text-center text-muted-foreground">Pièces neuves</p>
              <div className="my-8 flex min-h-72 flex-1 flex-col">
                <MotsDefilants mots={PIECES_NEUVES_LISTE} />
              </div>
              <p className="mx-auto max-w-[38ch] text-center text-sm leading-relaxed text-muted-foreground">
                Pièces d&apos;usure et de sécurité commandées neuves pour votre véhicule,
                disponibles au comptoir sous 24 à 48 heures.
              </p>
              <div className="mt-7 text-center">
                <CtaPill href="/pieces-neuves">La gamme neuve</CtaPill>
              </div>
            </article>
          </Reveal>

          <Reveal delay={0.12} className="h-full">
            <article className="relative flex h-full min-h-[34rem] flex-col overflow-hidden rounded-[32px] bg-primary p-8 text-primary-foreground sm:p-10">
              <div className="absolute inset-0">
                <Image
                  src={asset("/img/courroie-900.webp")}
                  alt=""
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover opacity-55"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/90 via-primary/20 to-primary/40" aria-hidden="true" />
              </div>
              <div className="relative flex flex-1 flex-col">
                <p className="pac-eyebrow text-center text-primary-foreground/80">
                  L&apos;occasion
                </p>
                <h2 className="mx-auto mt-auto max-w-[22ch] pt-40 text-center text-[clamp(1.6rem,2.6vw,2.3rem)] font-semibold leading-[1.15] tracking-[-0.015em]">
                  Modèles anciens et de collection : la pièce introuvable ailleurs se trouve
                  souvent ici.
                </h2>
                <p className="mx-auto mt-4 max-w-[40ch] text-center text-sm leading-relaxed text-primary-foreground/75">
                  Mécanique, carrosserie, optiques : chaque pièce est contrôlée avant la vente, à
                  une fraction du prix du neuf.
                </p>
                <div className="mt-7 text-center">
                  <CtaPill href="/pieces-occasion">La gamme occasion</CtaPill>
                </div>
              </div>
            </article>
          </Reveal>
        </div>
      </section>

      {/* ================= PLEINE PAGE : le comptoir depuis 1992 ================= */}
      <section aria-labelledby="t-comptoir" className="mt-24 sm:mt-36">
        <div className="relative flex min-h-[92vh] items-center overflow-hidden">
          <div className="pac-zoom absolute inset-0">
            <Image
              src={asset("/img/atelier-900.webp")}
              alt=""
              fill
              sizes="100vw"
              className="object-cover"
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/25 to-transparent" aria-hidden="true" />
          <div className="relative mx-auto w-full max-w-[100rem] px-5 py-24 sm:px-10">
            <Reveal y={16}>
              <p className="pac-eyebrow text-white/80">Le comptoir</p>
            </Reveal>
            <h2 id="t-comptoir" className="mt-5 max-w-[24ch] text-[clamp(1.7rem,3.2vw,2.7rem)] font-semibold leading-[1.18] tracking-[-0.015em] text-white">
              <SplitText text="Au même endroit depuis 1992 : le démontage, le contrôle et la vente de pièces automobiles, pour les particuliers comme pour les professionnels." />
            </h2>
            <Reveal delay={0.3}>
              <div className="mt-8">
                <CtaPill href="/contact">Contact &amp; accès</CtaPill>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ================= PLAQUE SOMBRE : réemploi + deux cartes ================= */}
      <section aria-labelledby="t-reemploi" className="bg-primary py-24 text-primary-foreground sm:py-36">
        <div className="mx-auto max-w-[100rem] px-5 text-center sm:px-10">
          <Reveal y={16}>
            <p className="pac-eyebrow text-primary-foreground/70">Réemploi</p>
          </Reveal>
          <h2 id="t-reemploi" className="mx-auto mt-6 max-w-[30ch] text-[clamp(1.9rem,4vw,3.3rem)] font-semibold leading-[1.14] tracking-[-0.015em]">
            <SplitText text="Près de 85 % d'une automobile est réutilisable." />
            <br />
            <span className="text-accent">
              <SplitText text="Un choix économique et responsable." delay={0.4} />
            </span>
          </h2>
          <Reveal delay={0.5}>
            <div className="mt-9">
              <CtaPill href="/enlevement-epave">Épaves &amp; recyclage</CtaPill>
            </div>
          </Reveal>

          <dl className="mx-auto mt-20 grid max-w-4xl grid-cols-2 gap-x-6 gap-y-10 lg:grid-cols-4">
            {[
              { valeur: <><Counter value={34} /> ans</>, legende: "de métier au même endroit" },
              { valeur: <>1992</>, legende: "année de création de la maison" },
              { valeur: <><Counter value={100} suffix="+" /></>, legende: "avis clients sur les annuaires" },
              { valeur: <>5j/7</>, legende: "au comptoir, ZI Toulon Est" },
            ].map((stat, i) => (
              <Reveal key={i} delay={i * 0.06}>
                <div>
                  <dt className="sr-only">{stat.legende}</dt>
                  <dd className="font-wide text-4xl font-extrabold tracking-tight sm:text-5xl">
                    {stat.valeur}
                  </dd>
                  <dd className="mt-2 text-sm text-primary-foreground/65">{stat.legende}</dd>
                </div>
              </Reveal>
            ))}
          </dl>

          <div className="mt-20 grid gap-10 text-left md:grid-cols-2 md:gap-6 lg:px-16">
            {[
              {
                image: "/img/roue-900.webp",
                alt: "Roue et pneu d'un véhicule en cours de démontage",
                titre: "Enlèvement d'épaves",
                texte:
                  "Enlèvement, dépollution et recyclage des véhicules hors d'usage dans l'est du Var.",
                href: "/enlevement-epave",
                label: "En savoir plus",
              },
              {
                image: "/img/compteur-900.webp",
                alt: "Compteur de vitesse en gros plan, aiguille au repos",
                titre: "Rachat de véhicules",
                texte:
                  "Selon le véhicule et son état, un rachat peut être proposé. L'évaluation se fait au comptoir ou par téléphone.",
                href: "/contact",
                label: "Nous contacter",
              },
            ].map((carte, i) => (
              <Reveal key={carte.titre} delay={i * 0.1} className="h-full">
                <article className="flex h-full flex-col items-center text-center">
                  <div className="relative aspect-[4/3] w-full overflow-hidden rounded-[24px] sm:mx-auto sm:w-4/5">
                    <Image
                      src={asset(carte.image)}
                      alt={carte.alt}
                      fill
                      sizes="(max-width: 768px) 92vw, 40vw"
                      className="object-cover"
                    />
                  </div>
                  <h3 className="mt-7 text-2xl font-semibold tracking-[-0.01em]">{carte.titre}</h3>
                  <p className="mx-auto mt-3 max-w-[44ch] text-sm leading-relaxed text-primary-foreground/70">
                    {carte.texte}
                  </p>
                  <CtaPill href={carte.href} tone="jaune" className="mt-6 h-10 px-5">
                    {carte.label}
                  </CtaPill>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ================= PLAQUE SABLE : la méthode + deux cartes ================= */}
      <section aria-labelledby="t-vision" className="bg-sable py-24 sm:py-36">
        <div className="mx-auto max-w-[100rem] px-5 sm:px-10">
          <div className="text-center">
            <Reveal y={16}>
              <p className="pac-eyebrow text-muted-foreground">Clientèle</p>
            </Reveal>
            <h2 id="t-vision" className="mx-auto mt-6 max-w-[26ch] text-[clamp(1.9rem,4vw,3.3rem)] font-semibold leading-[1.14] tracking-[-0.015em]">
              <SplitText text="Particuliers et professionnels," />{" "}
              <span className="text-muted-foreground">
                <SplitText text="au même comptoir." delay={0.35} />
              </span>
            </h2>
          </div>

          <div className="mt-16 grid gap-10 md:grid-cols-2 md:gap-6 lg:px-16">
            {[
              {
                image: "/img/vidange-900.webp",
                alt: "Bidon d'huile neuve versé dans un moteur, capot ouvert",
                eyebrow: "Particuliers",
                texte:
                  "Automobilistes du Var : un conseil sur le choix entre neuf et occasion, adapté au véhicule et au budget, et un retrait au comptoir.",
                href: NAP.telephoneHref,
                label: "Appeler le comptoir",
              },
              {
                image: "/img/equipe-900.webp",
                alt: "Mécanicien au travail dans l'atelier, en discussion devant un véhicule",
                eyebrow: "Professionnels",
                texte:
                  "Garages et carrosseries du Var s'approvisionnent chez P.A.C. de longue date. Le comptoir tient compte des contraintes d'atelier et répond référence en main.",
                href: "/contact",
                label: "Contact & accès",
              },
            ].map((carte, i) => (
              <Reveal key={carte.eyebrow} delay={i * 0.1} className="h-full">
                <article className="flex h-full flex-col items-center text-center">
                  <div className="relative aspect-[4/3] w-full overflow-hidden rounded-[24px] sm:mx-auto sm:w-4/5">
                    <Image
                      src={asset(carte.image)}
                      alt={carte.alt}
                      fill
                      sizes="(max-width: 768px) 92vw, 40vw"
                      className="object-cover"
                    />
                  </div>
                  <p className="pac-eyebrow mt-7 text-muted-foreground">{carte.eyebrow}</p>
                  <p className="mx-auto mt-3 max-w-[46ch] leading-relaxed text-muted-foreground">
                    {carte.texte}
                  </p>
                  <CtaPill href={carte.href} tone="noire" className="mt-6 h-10 px-5">
                    {carte.label}
                  </CtaPill>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ================= FAQ : rangées façon journal ================= */}
      <section aria-labelledby="t-faq" className="mx-auto max-w-[100rem] px-5 py-24 sm:px-10 sm:py-36">
        <div className="grid gap-10 md:grid-cols-[1fr_1.6fr] md:gap-16">
          <div>
            <Reveal y={16}>
              <p className="pac-eyebrow text-muted-foreground">FAQ</p>
            </Reveal>
            <h2 id="t-faq" className="mt-5 max-w-[14ch] text-[clamp(1.9rem,3.6vw,3rem)] font-semibold leading-[1.12] tracking-[-0.015em]">
              <SplitText text="Les questions les plus fréquentes." />
            </h2>
          </div>
          <Reveal delay={0.15}>
            <Accordion type="single" collapsible>
              {FAQ.map((item, i) => (
                <AccordionItem key={i} value={`faq-${i}`} className="border-border/70">
                  <AccordionTrigger className="group cursor-pointer items-center py-6 text-left text-base font-semibold hover:no-underline sm:text-lg [&>svg]:hidden">
                    <span className="pr-4">{item.question}</span>
                    <span
                      className="grid size-9 shrink-0 place-items-center rounded-full bg-accent text-accent-foreground transition-transform duration-300 group-data-[state=open]:rotate-90"
                      aria-hidden="true"
                    >
                      <ChevronRight className="size-4" />
                    </span>
                  </AccordionTrigger>
                  <AccordionContent className="max-w-[68ch] pb-7 text-base leading-relaxed text-muted-foreground">
                    {item.reponse}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </Reveal>
        </div>
      </section>

      {/* ================= VENIR AU COMPTOIR ================= */}
      <section id="contact" aria-labelledby="t-contact" className="mx-auto max-w-[100rem] px-5 sm:px-10">
        <div className="grid gap-10 rounded-[32px] bg-sable p-8 sm:p-12 md:grid-cols-[1.2fr_1fr]">
          <Reveal>
            <div>
              <p className="pac-eyebrow text-muted-foreground">Venir au comptoir</p>
              <a
                href={NAP.telephoneHref}
                className="font-wide mt-5 inline-block text-[clamp(1.9rem,5vw,3.7rem)] font-extrabold tracking-tight underline decoration-accent decoration-[0.08em] underline-offset-8 transition-all hover:decoration-[0.14em]"
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
                    <Badge className="gap-1.5 rounded-full bg-white px-3.5 py-1.5 text-xs font-semibold text-foreground">
                      <b.icone className="size-3.5" aria-hidden="true" />
                      {b.label}
                    </Badge>
                  </li>
                ))}
              </ul>
              <div className="mt-7">
                <CtaPill href={NAP.mapsUrl}>Itinéraire Google Maps</CtaPill>
              </div>
            </div>
          </Reveal>
          <Reveal delay={0.12}>
            <div className="rounded-[24px] bg-white p-5 sm:p-7">
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
                </TableBody>
              </Table>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
