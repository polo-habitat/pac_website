import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Car, CreditCard, MapPin, ParkingSquare, Recycle, Search, Truck } from "lucide-react";

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableRow } from "@/components/ui/table";
import { CtaPanel } from "@/components/cta-panel";
import { JsonLd } from "@/components/json-ld";
import { Marquee } from "@/components/marquee";
import { Counter } from "@/components/motion/counter";
import { Gear } from "@/components/motion/gear";
import { Magnetic } from "@/components/motion/magnetic";
import { Reveal } from "@/components/motion/reveal";
import { SplitText } from "@/components/motion/split-text";
import { PhonePill } from "@/components/phone-pill";
import { SectionHeader } from "@/components/section-header";
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

const SERVICES = [
  {
    icone: Search,
    titre: "Recherche de pièce",
    texte:
      "Vous appelez avec la carte grise, on cherche dans le stock et chez nos confrères si besoin. Réponse immédiate ou rappel dans la journée.",
    lien: undefined as undefined | { href: string; label: string },
  },
  {
    icone: Truck,
    titre: "Enlèvement d'épaves",
    texte:
      "Votre véhicule ne roule plus ? P.A.C. organise son enlèvement dans le secteur de La Farlède et Toulon Est et gère le recyclage.",
    lien: { href: "/enlevement-epave", label: "Voir les modalités" },
  },
  {
    icone: Recycle,
    titre: "Recyclage VHU",
    texte:
      "Dépollution et valorisation des véhicules hors d'usage : chaque voiture est vidée de ses fluides puis démontée pour redonner une vie à ses pièces.",
    lien: undefined,
  },
  {
    icone: Car,
    titre: "Rachat de véhicules",
    texte:
      "Selon le véhicule et son état, P.A.C. peut racheter votre voiture : ce n'est pas systématique, contactez-nous ou passez directement au comptoir pour une réponse rapide.",
    lien: { href: "/contact", label: "Nous contacter" },
  },
];

const ETAPES = [
  {
    titre: "Vous appelez",
    texte: "Le 04 94 08 15 33, avec votre carte grise ou la référence de la pièce sous les yeux.",
  },
  {
    titre: "On vérifie",
    texte: "Stock, état, compatibilité avec votre véhicule et prix : tout est annoncé au téléphone, franchement.",
  },
  {
    titre: "Vous repartez équipé",
    texte: "La pièce vous attend au comptoir du 25 rue Gay Lussac. Carte bancaire acceptée, parking sur place.",
  },
];

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

      {/* ================= HERO ================= */}
      <section aria-label="Présentation" className="relative overflow-hidden">
        <Gear className="pointer-events-none absolute -right-28 top-6 size-80 text-accent sm:-right-20 sm:size-[28rem] lg:size-[34rem]" />
        <div className="relative mx-auto max-w-6xl px-5 pt-16 sm:pt-24">
          <Reveal y={12}>
            <Badge className="rounded-full bg-secondary px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.14em] text-secondary-foreground">
              Casse automobile à La Farlède depuis 1992
            </Badge>
          </Reveal>
          <h1 className="mt-7 max-w-[16ch] text-[clamp(2.8rem,7vw,5.6rem)] font-bold leading-[1.02] tracking-[-0.02em]">
            <SplitText text="La bonne pièce, au bon prix." accentFrom={3} delay={0.15} />
          </h1>
          <Reveal delay={0.5}>
            <p className="mt-7 max-w-[58ch] text-lg leading-relaxed text-muted-foreground">
              <strong className="text-foreground">P.A.C. Pièces Auto Cass</strong> vend des pièces
              détachées <strong className="text-foreground">neuves et d&apos;occasion vérifiées</strong>{" "}
              pour voitures et utilitaires, reprend vos épaves et recycle les véhicules hors
              d&apos;usage. Vous appelez, on vérifie, vous repartez avec la pièce.
            </p>
          </Reveal>
          <Reveal delay={0.6}>
            <div className="mt-9 flex flex-wrap items-center gap-4">
              <PhonePill />
              <Magnetic>
                <Button
                  asChild
                  variant="ghost"
                  className="h-12 rounded-full px-5 text-base font-semibold"
                >
                  <Link href="#gammes">
                    Voir les pièces
                    <ArrowRight className="size-4.5" aria-hidden="true" />
                  </Link>
                </Button>
              </Magnetic>
            </div>
          </Reveal>
        </div>
        <div className="mt-10 h-[0.42em] overflow-hidden sm:mt-14" style={{ fontSize: "clamp(6rem, 19vw, 22rem)" }} aria-hidden="true">
          <Reveal y={60}>
            <span className="pac-wordmark text-foreground">P.A.C.</span>
          </Reveal>
        </div>
      </section>

      <Marquee />

      {/* ================= LE COMPTOIR ================= */}
      <section aria-labelledby="t-comptoir" className="mx-auto max-w-6xl px-5 py-20 sm:py-28">
        <SectionHeader kicker="Le comptoir" titre="Une casse auto de métier, pas un site de plus." id="t-comptoir">
          <div className="mt-9 grid gap-10 md:grid-cols-[1.15fr_1fr]">
            <Reveal delay={0.08}>
              <div className="space-y-5 leading-relaxed text-muted-foreground">
                <p>
                  Depuis le 1<sup>er</sup> février 1992, P.A.C. démonte, contrôle et revend des
                  pièces automobiles au 25 rue Gay Lussac, dans la zone industrielle Toulon Est de
                  La Farlède. Trente-quatre ans plus tard, la méthode n&apos;a pas changé : une
                  pièce vérifiée, un prix annoncé franchement, un comptoir où l&apos;on vous
                  répond.
                </p>
                <p>
                  Automobilistes du Var, garagistes, professionnels de la carrosserie : tout le
                  monde passe par le même téléphone, le{" "}
                  <a href={NAP.telephoneHref} className="font-semibold text-foreground underline underline-offset-4 decoration-accent decoration-2 hover:decoration-4">
                    04 94 08 15 33
                  </a>
                  . Vous donnez votre carte grise ou la référence, on vous dit si la pièce est là
                  et combien elle coûte. Pas de panier en ligne, pas de mauvaise surprise : la
                  pièce vous attend au comptoir.
                </p>
              </div>
            </Reveal>
            <Reveal delay={0.16}>
              <div className="group relative overflow-hidden rounded-[20px]" style={{ aspectRatio: "4/5" }}>
                <Image
                  src={asset("/img/hero-moteur-800.webp")}
                  alt="Serrage d'un écrou à la clé plate sur un moteur, dans la pénombre de l'atelier"
                  fill
                  sizes="(max-width: 768px) 92vw, 38vw"
                  priority
                  className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.04]"
                />
              </div>
            </Reveal>
          </div>
          <dl className="mt-12 grid grid-cols-2 gap-x-6 gap-y-8 border-t border-border pt-8 lg:grid-cols-4">
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
                  <dd className="mt-2 text-sm text-muted-foreground">{stat.legende}</dd>
                </div>
              </Reveal>
            ))}
          </dl>
        </SectionHeader>
      </section>

      {/* ================= LES GAMMES (neuves en tête) ================= */}
      <section id="gammes" aria-labelledby="t-gammes" className="mx-auto max-w-6xl scroll-mt-24 px-5 pb-20 sm:pb-28">
        <SectionHeader kicker="Les gammes" titre="Deux gammes, un seul comptoir." id="t-gammes" />
        <div className="mt-10 space-y-6">
          <Reveal>
            <Card className="overflow-hidden rounded-[28px] border-0 bg-sable p-0 shadow-none">
              <div className="grid items-center gap-8 p-8 sm:p-12 md:grid-cols-[1.15fr_1fr]">
                <div>
                  <Badge className="rounded-full bg-accent px-3 py-1 text-xs font-bold uppercase tracking-[0.12em] text-accent-foreground">
                    La gamme à connaître
                  </Badge>
                  <h3 className="mt-4 text-[clamp(1.5rem,3vw,2.2rem)] font-bold leading-tight tracking-[-0.015em]">
                    Pièces neuves au tarif comptoir
                  </h3>
                  <p className="mt-4 leading-relaxed text-muted-foreground">
                    Pour les pièces d&apos;usure et de sécurité (freinage, filtration,
                    distribution), P.A.C. commande la pièce neuve adaptée à votre véhicule et
                    l&apos;obtient rapidement, sans la marge d&apos;un réseau constructeur.
                  </p>
                  <ul className="mt-5 space-y-2.5 border-t border-border pt-5 text-sm leading-relaxed">
                    <li>Freinage, filtres, courroies, consommables</li>
                    <li>Pièces mécaniques et électriques neuves</li>
                    <li>Commande sur référence ou carte grise, retrait sous 24-48 h</li>
                  </ul>
                  <div className="mt-7">
                    <Magnetic>
                      <Button asChild className="h-12 rounded-full bg-primary px-6 text-base font-bold text-primary-foreground hover:bg-primary/85">
                        <Link href="/pieces-neuves">
                          La gamme neuve
                          <ArrowRight className="size-4.5" aria-hidden="true" />
                        </Link>
                      </Button>
                    </Magnetic>
                  </div>
                </div>
                <figure className="group">
                  <div className="relative overflow-hidden rounded-[20px]" style={{ aspectRatio: "5/4" }}>
                    <Image
                      src={asset("/img/vidange-900.webp")}
                      alt="Bidon d'huile neuve versé dans un moteur, capot ouvert"
                      fill
                      sizes="(max-width: 768px) 92vw, 40vw"
                      className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.05]"
                    />
                  </div>
                  <figcaption className="mt-3 text-sm text-muted-foreground">
                    Neuf, au tarif comptoir
                  </figcaption>
                </figure>
              </div>
            </Card>
          </Reveal>

          <Reveal>
            <Card className="overflow-hidden rounded-[28px] border-0 bg-card p-0 shadow-none">
              <div className="grid items-center gap-8 p-8 sm:p-12 md:grid-cols-[1fr_1.15fr]">
                <figure className="group order-2 md:order-1">
                  <div className="relative overflow-hidden rounded-[20px]" style={{ aspectRatio: "5/4" }}>
                    <Image
                      src={asset("/img/courroie-900.webp")}
                      alt="Courroie et poulies d'un moteur démonté, prêtes au contrôle avant la mise en vente"
                      fill
                      sizes="(max-width: 768px) 92vw, 40vw"
                      className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.05]"
                    />
                  </div>
                  <figcaption className="mt-3 text-sm text-muted-foreground">
                    Contrôlée avant la vente
                  </figcaption>
                </figure>
                <div className="order-1 md:order-2">
                  <h3 className="text-[clamp(1.5rem,3vw,2.2rem)] font-bold leading-tight tracking-[-0.015em]">
                    Pièces d&apos;occasion vérifiées
                  </h3>
                  <p className="mt-4 leading-relaxed text-muted-foreground">
                    Des pièces démontées et contrôlées une par une, vendues à une fraction du prix
                    du neuf. Et pour les anciens modèles, youngtimers et véhicules de collection,
                    c&apos;est souvent ici que se trouve la pièce introuvable ailleurs.
                  </p>
                  <ul className="mt-5 space-y-2.5 border-t border-border pt-5 text-sm leading-relaxed">
                    <li>Moteurs, boîtes de vitesses, turbos, injection</li>
                    <li>Optiques, carrosserie, portières, rétroviseurs</li>
                    <li>Pièces pour anciens modèles et véhicules de collection</li>
                  </ul>
                  <div className="mt-7">
                    <Magnetic>
                      <Button asChild className="h-12 rounded-full bg-primary px-6 text-base font-bold text-primary-foreground hover:bg-primary/85">
                        <Link href="/pieces-occasion">
                          La gamme occasion
                          <ArrowRight className="size-4.5" aria-hidden="true" />
                        </Link>
                      </Button>
                    </Magnetic>
                  </div>
                </div>
              </div>
            </Card>
          </Reveal>
        </div>
      </section>

      {/* ================= SERVICES ================= */}
      <section aria-labelledby="t-services" className="mx-auto max-w-6xl px-5 pb-20 sm:pb-28">
        <SectionHeader kicker="Services" titre="Tout ce qu'on fait pour vous." id="t-services">
          <ul className="mt-9 grid gap-px overflow-hidden rounded-[28px] border border-border bg-border sm:grid-cols-2">
            {SERVICES.map((service, i) => (
              <Reveal key={service.titre} delay={i * 0.06} className="h-full">
                <li className="group h-full bg-background p-7 transition-colors duration-300 hover:bg-sable sm:p-8">
                  <span className="grid size-11 place-items-center rounded-full bg-accent text-accent-foreground transition-transform duration-300 group-hover:-rotate-6 group-hover:scale-110">
                    <service.icone className="size-5" aria-hidden="true" />
                  </span>
                  <h3 className="mt-5 text-lg font-bold">{service.titre}</h3>
                  <p className="mt-2.5 text-sm leading-relaxed text-muted-foreground">
                    {service.texte}
                    {service.lien ? (
                      <>
                        {" "}
                        <Link
                          href={service.lien.href}
                          className="font-semibold text-foreground underline decoration-accent decoration-2 underline-offset-4 hover:decoration-4"
                        >
                          {service.lien.label}
                        </Link>
                        .
                      </>
                    ) : null}
                  </p>
                </li>
              </Reveal>
            ))}
          </ul>
        </SectionHeader>
      </section>

      {/* ================= COMMENT ÇA MARCHE ================= */}
      <section aria-labelledby="t-etapes" className="mx-auto max-w-6xl px-5 pb-20 sm:pb-28">
        <SectionHeader kicker="Comment ça marche" titre="Votre pièce en trois gestes." id="t-etapes">
          <ol className="mt-9 grid gap-6 sm:grid-cols-3">
            {ETAPES.map((etape, i) => (
              <Reveal key={etape.titre} delay={i * 0.08} className="h-full">
                <li className="h-full rounded-[28px] bg-card p-7">
                  <span className="font-wide text-5xl font-extrabold text-accent" aria-hidden="true">
                    {i + 1}
                  </span>
                  <h3 className="mt-4 text-lg font-bold">{etape.titre}</h3>
                  <p className="mt-2.5 text-sm leading-relaxed text-muted-foreground">{etape.texte}</p>
                </li>
              </Reveal>
            ))}
          </ol>
        </SectionHeader>
      </section>

      {/* ================= PANNEAU PRIX ================= */}
      <div className="pb-20 sm:pb-28">
        <CtaPanel
          titre="Le juste prix se dit au téléphone, pas en petits caractères."
          texte="Une pièce d'occasion vérifiée coûte souvent 40 à 70 % de moins que la même pièce neuve en concession. Chez P.A.C., le prix est annoncé avant votre déplacement et il ne change pas au comptoir. C'est notre devise depuis 1992 : la bonne pièce au bon prix."
          image="/img/compteur-900.webp"
          alt="Compteur de vitesse en gros plan, aiguille au repos"
        />
      </div>

      {/* ================= FAQ ================= */}
      <section aria-labelledby="t-faq" className="mx-auto max-w-6xl px-5 pb-20 sm:pb-28">
        <SectionHeader kicker="Questions fréquentes" titre="Vous vous demandez sûrement…" id="t-faq">
          <Reveal>
            <Accordion type="single" collapsible className="mt-9">
              {FAQ.map((item, i) => (
                <AccordionItem key={i} value={`faq-${i}`}>
                  <AccordionTrigger className="cursor-pointer py-5 text-left text-base font-semibold hover:no-underline">
                    {item.question}
                  </AccordionTrigger>
                  <AccordionContent className="max-w-[68ch] pb-6 text-base leading-relaxed text-muted-foreground">
                    {item.reponse}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </Reveal>
        </SectionHeader>
      </section>

      {/* ================= VENIR AU COMPTOIR ================= */}
      <section id="contact" aria-labelledby="t-contact" className="mx-auto max-w-6xl px-5">
        <SectionHeader kicker="Venir au comptoir" titre="Besoin d'une pièce ? Appelez." id="t-contact">
          <div className="mt-9 grid gap-10 md:grid-cols-[1.2fr_1fr]">
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
            </Reveal>
          </div>
        </SectionHeader>
      </section>
    </>
  );
}
