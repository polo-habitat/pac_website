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
      "Vente au comptoir de pièces détachées automobiles depuis 1992. Pièces neuves, pièces d'occasion pour véhicules anciens et de collection, rachat de véhicules. ZI Toulon Est, La Farlède. Tél 04 94 08 15 33.",
    url: `${SITE_URL}/`,
  },
  twitter: {
    title: "P.A.C. · La bonne pièce au bon prix · La Farlède (Var)",
    description:
      "Pièces détachées automobiles neuves et d'occasion depuis 1992 à La Farlède. Tél 04 94 08 15 33.",
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

      {/* ================= HERO / ACCROCHE : image automobile plein cadre,
          voile sombre, slogan sobre centré par-dessus ================= */}
      <section aria-label="Présentation" data-nav="dark" className="relative flex min-h-[100svh] items-center overflow-hidden">
        <div className="pac-zoom absolute inset-0">
          <Image
            src={asset("/img/hero-voiture-1600.webp")}
            alt="Porsche 911 rouge classique, de profil"
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
              Pièces détachées automobiles · La Farlède depuis 1992
            </p>
          </Reveal>
          <h1 className="mt-6 text-[clamp(2.4rem,5.8vw,4.8rem)] font-semibold leading-[1.06] tracking-[-0.02em] text-white">
            <SplitText text="La bonne pièce" delay={0.15} />
            <br />
            <SplitText text="au bon prix." delay={0.5} />
          </h1>
          <Reveal delay={0.9} y={20}>
            <p className="mx-auto mt-7 max-w-[52ch] text-lg leading-relaxed text-white/80">
              Vente au comptoir de pièces neuves, de pièces d&apos;occasion pour véhicules anciens
              et de collection, et rachat de véhicules sur étude de dossier.
            </p>
          </Reveal>
          <Reveal delay={1.05} y={16}>
            <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
              <CtaPill href={NAP.telephoneHref}>Appeler le {NAP.telephone}</CtaPill>
              <CtaPill href="#activites" tone="blanche">
                Nos activités
              </CtaPill>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ================= NOTRE HISTOIRE : image qui s'élargit + texte ================= */}
      <section aria-labelledby="t-histoire" className="overflow-x-clip bg-background py-24 sm:py-36">
        <div className="mx-auto grid max-w-[100rem] items-center gap-12 px-5 sm:px-10 md:grid-cols-[1.1fr_1fr] md:gap-20">
          <div className="pac-grandit relative aspect-[4/3] overflow-hidden md:aspect-[5/4]">
            <div className="pac-zoom absolute inset-0">
              <Image
                src={asset("/img/equipe-900.webp")}
                alt="Mécanicien devant un véhicule capot ouvert, en atelier"
                fill
                sizes="(max-width: 768px) 100vw, 55vw"
                className="object-cover"
              />
            </div>
          </div>
          <div className="md:pr-10">
            <Reveal y={16}>
              <p className="pac-eyebrow text-muted-foreground">Notre histoire</p>
            </Reveal>
            <h2 id="t-histoire" className="mt-6 text-[clamp(1.6rem,2.9vw,2.5rem)] font-semibold leading-[1.2] tracking-[-0.015em]">
              <SplitText text="Plus de trente ans au service des particuliers et des professionnels." />
            </h2>
            <Reveal delay={0.25}>
              <p className="mt-6 max-w-[52ch] leading-relaxed text-muted-foreground">
                Fondée en 1992, P.A.C. Pièces Auto Cass accompagne les particuliers et les
                professionnels dans la recherche et la fourniture de pièces détachées automobiles.
                Implantée à La Farlède, l&apos;entreprise a construit au fil des années une
                connaissance fine du secteur et un réseau de partenaires permettant de répondre à des
                demandes variées, y compris les plus spécifiques.
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ================= NOS ACTIVITÉS : pièces neuves / pièces d'occasion ================= */}
      <section id="activites" aria-labelledby="t-activites" className="scroll-mt-28 px-3 sm:px-4">
        <div className="mx-auto mb-10 max-w-[100rem] px-2 text-center sm:mb-12">
          <Reveal y={16}>
            <p className="pac-eyebrow text-muted-foreground">Nos activités</p>
          </Reveal>
          <h2 id="t-activites" className="mx-auto mt-5 max-w-[24ch] text-[clamp(1.7rem,3.4vw,2.8rem)] font-semibold leading-[1.14] tracking-[-0.015em]">
            <SplitText text="Pièces neuves et pièces d'occasion, toutes marques." />
          </h2>
        </div>
        <div className="mx-auto grid max-w-[100rem] gap-3 sm:gap-4 md:grid-cols-2">
          <Reveal className="h-full">
            <article className="flex h-full min-h-[34rem] flex-col rounded-[32px] bg-sable p-8 sm:p-10">
              <p className="pac-eyebrow text-center text-muted-foreground">Pièces neuves</p>
              <div className="my-8 flex min-h-72 flex-1 flex-col">
                <MotsDefilants mots={PIECES_NEUVES_LISTE} />
              </div>
              <p className="mx-auto max-w-[40ch] text-center text-sm leading-relaxed text-muted-foreground">
                L&apos;essentiel de l&apos;activité : la fourniture de pièces neuves, toutes marques
                et tous modèles, pour l&apos;entretien courant comme pour les réparations plus
                importantes.
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
                  Pièces d&apos;occasion
                </p>
                <h3 className="mx-auto mt-auto max-w-[22ch] pt-40 text-center text-[clamp(1.6rem,2.6vw,2.3rem)] font-semibold leading-[1.15] tracking-[-0.015em]">
                  Véhicules anciens et de collection : la référence introuvable en neuf se trouve
                  souvent ici.
                </h3>
                <p className="mx-auto mt-4 max-w-[42ch] text-center text-sm leading-relaxed text-primary-foreground/75">
                  Des pièces d&apos;occasion pour les modèles dont certaines références ne sont plus
                  disponibles en neuf. Chaque pièce est contrôlée avant la vente.
                </p>
                <div className="mt-7 text-center">
                  <CtaPill href="/pieces-occasion">La gamme occasion</CtaPill>
                </div>
              </div>
            </article>
          </Reveal>
        </div>
      </section>

      {/* ================= PLAQUE SOMBRE : réemploi & rachat ================= */}
      <section aria-labelledby="t-reemploi" data-nav="dark" className="mt-24 bg-primary py-24 text-primary-foreground sm:mt-36 sm:py-36">
        <div className="mx-auto max-w-[100rem] px-5 text-center sm:px-10">
          <Reveal y={16}>
            <p className="pac-eyebrow text-primary-foreground/70">Réemploi &amp; rachat</p>
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
              <CtaPill href="/rachat-de-voiture">Rachat de voiture</CtaPill>
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
                titre: "Pièces d'occasion",
                texte:
                  "Chaque pièce est démontée, contrôlée et référencée avant la vente, y compris pour les anciens modèles et véhicules de collection.",
                href: "/pieces-occasion",
                label: "En savoir plus",
              },
              {
                image: "/img/compteur-900.webp",
                alt: "Compteur de vitesse en gros plan, aiguille au repos",
                titre: "Rachat de voiture",
                texte:
                  "Étudié au cas par cas, selon le modèle, son état et la disponibilité des pièces qu'il peut fournir. Évaluation au comptoir ou par téléphone.",
                href: "/rachat-de-voiture",
                label: "En savoir plus",
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

      {/* ================= PLAQUE SABLE : au-delà du stock —
          réseau de partenaires + pièces sur commande ================= */}
      <section aria-labelledby="t-ressources" className="bg-sable py-24 sm:py-36">
        <div className="mx-auto max-w-[100rem] px-5 sm:px-10">
          <div className="text-center">
            <Reveal y={16}>
              <p className="pac-eyebrow text-muted-foreground">Au-delà du stock</p>
            </Reveal>
            <h2 id="t-ressources" className="mx-auto mt-6 max-w-[26ch] text-[clamp(1.9rem,4vw,3.3rem)] font-semibold leading-[1.14] tracking-[-0.015em]">
              <SplitText text="Quand la pièce n'est pas en stock," />{" "}
              <span className="text-muted-foreground">
                <SplitText text="la recherche continue." delay={0.35} />
              </span>
            </h2>
          </div>

          <div className="mt-16 grid gap-4 md:grid-cols-2">
            {[
              {
                eyebrow: "Un réseau de partenaires",
                texte:
                  "Au-delà de notre stock, nous nous appuyons sur un réseau de partenaires constitué au fil des années. Il permet d'élargir le champ des recherches lorsque la pièce demandée n'est pas courante ou concerne un modèle plus rare.",
              },
              {
                eyebrow: "Pièces sur commande",
                texte:
                  "Lorsqu'une pièce n'est pas disponible en stock, elle peut être commandée. Le délai et la disponibilité sont confirmés au moment de la demande, en fonction de la référence recherchée.",
              },
            ].map((carte, i) => (
              <Reveal key={carte.eyebrow} delay={i * 0.1} className="h-full">
                <article className="flex h-full flex-col rounded-[28px] bg-white p-8 sm:p-10">
                  <p className="pac-eyebrow text-muted-foreground">{carte.eyebrow}</p>
                  <p className="mt-5 max-w-[48ch] leading-relaxed text-muted-foreground">
                    {carte.texte}
                  </p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ================= PLEINE PAGE : notre fonctionnement ================= */}
      <section aria-labelledby="t-fonctionnement" className="mt-24 sm:mt-36">
        <div data-nav="dark" className="relative flex min-h-[92vh] items-center overflow-hidden">
          <div className="pac-zoom absolute inset-0">
            <Image
              src={asset("/img/atelier-900.webp")}
              alt=""
              fill
              sizes="100vw"
              className="object-cover"
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-r from-black/65 via-black/30 to-transparent" aria-hidden="true" />
          <div className="relative mx-auto w-full max-w-[100rem] px-5 py-24 sm:px-10">
            <Reveal y={16}>
              <p className="pac-eyebrow text-white/80">Notre fonctionnement</p>
            </Reveal>
            <h2 id="t-fonctionnement" className="mt-5 max-w-[24ch] text-[clamp(1.7rem,3.2vw,2.7rem)] font-semibold leading-[1.18] tracking-[-0.015em] text-white">
              <SplitText text="La vente s'effectue exclusivement au comptoir, sans vente en ligne ni libre-service." />
            </h2>
            <Reveal delay={0.3}>
              <p className="mt-6 max-w-[50ch] leading-relaxed text-white/75">
                Ce fonctionnement permet un contrôle systématique de la pièce remise au client, tant
                sur la référence que sur son état.
              </p>
            </Reveal>
            <Reveal delay={0.4}>
              <div className="mt-8">
                <CtaPill href="/contact">Contact &amp; accès</CtaPill>
              </div>
            </Reveal>
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

      {/* ================= CONTACT / VENIR AU COMPTOIR ================= */}
      <section id="contact" aria-labelledby="t-contact" className="mx-auto max-w-[100rem] px-5 sm:px-10">
        <div className="grid gap-10 rounded-[32px] bg-sable p-8 sm:p-12 md:grid-cols-[1.2fr_1fr]">
          <Reveal>
            <div>
              <p id="t-contact" className="pac-eyebrow text-muted-foreground">Venir au comptoir</p>
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
              <div className="mt-7 flex flex-wrap gap-3">
                <CtaPill href="/contact">Écrire un message</CtaPill>
                <CtaPill href={NAP.mapsUrl} tone="noire">
                  Itinéraire Google Maps
                </CtaPill>
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
