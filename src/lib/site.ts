export const SITE_URL = "https://polo-habitat.github.io/pac_website";

/** next/image n'applique pas basePath aux src chaînes : préfixer via ce helper. */
export const BASE_PATH = "/pac_website";
export const asset = (p: string) => `${BASE_PATH}${p}`;

export const NAP = {
  nom: "P.A.C. Pièces Auto Cass",
  telephone: "04 94 08 15 33",
  telephoneHref: "tel:+33494081533",
  telephoneE164: "+33494081533",
  fax: "04 94 08 66 39",
  rue: "25 rue Gay Lussac",
  zone: "ZI Toulon Est",
  codePostal: "83210",
  ville: "La Farlède",
  departement: "Var",
  horaires: "lun–ven 8h–12h / 14h–18h",
  mapsUrl:
    "https://www.google.com/maps/search/?api=1&query=P.A.C.+Pi%C3%A8ces+Auto+Cass+25+rue+Gay+Lussac+83210+La+Farl%C3%A8de",
} as const;

export const NAV = [
  { href: "/pieces-neuves", label: "Pièces neuves" },
  { href: "/pieces-occasion", label: "Pièces d'occasion" },
  { href: "/enlevement-epave", label: "Épaves & recyclage" },
  { href: "/contact", label: "Contact" },
] as const;

export const SECTEUR =
  "La Farlède, Toulon, La Garde, La Valette-du-Var, Solliès-Pont, Solliès-Ville, La Crau, Cuers, Hyères et tout l'est varois.";

/* Établissement JSON-LD complet (accueil) et stub (sous-pages).
   Le rachat de métaux n'est plus proposé ; le rachat de véhicules est au cas par cas. */
export const ETABLISSEMENT_ID = `${SITE_URL}/#etablissement`;

export const etablissementStub = {
  "@type": "AutoPartsStore",
  "@id": ETABLISSEMENT_ID,
  name: "P.A.C. Pièces Auto Cass",
  telephone: "+33494081533",
  url: `${SITE_URL}/`,
  address: {
    "@type": "PostalAddress",
    streetAddress: "25 rue Gay Lussac, ZI Toulon Est",
    addressLocality: "La Farlède",
    postalCode: "83210",
    addressRegion: "Var",
    addressCountry: "FR",
  },
};

export const etablissementComplet = {
  "@context": "https://schema.org",
  "@type": "AutoPartsStore",
  "@id": ETABLISSEMENT_ID,
  name: "P.A.C. Pièces Auto Cass",
  alternateName: "PAC La Farlède",
  slogan: "La bonne pièce au bon prix",
  description:
    "Casse automobile et magasin de pièces détachées neuves et d'occasion à La Farlède (Var) depuis 1992. Enlèvement d'épaves, recyclage de véhicules hors d'usage, rachat de véhicules selon les cas.",
  url: `${SITE_URL}/`,
  telephone: "+33494081533",
  faxNumber: "+33494086639",
  foundingDate: "1992-02-01",
  priceRange: "€",
  currenciesAccepted: "EUR",
  paymentAccepted: "Espèces, Carte bancaire",
  image: `${SITE_URL}/img/og-image.png`,
  sameAs: [
    "https://www.pagesjaunes.fr/pros/05323898",
    "https://www.yelp.fr/biz/p-a-c-pi%C3%A8ces-auto-cass-la-farl%C3%A8de",
  ],
  address: etablissementStub.address,
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      opens: "08:00",
      closes: "12:00",
    },
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      opens: "14:00",
      closes: "18:00",
    },
  ],
  areaServed: [
    { "@type": "City", name: "La Farlède" },
    { "@type": "City", name: "Toulon" },
    { "@type": "City", name: "La Garde" },
    { "@type": "City", name: "La Valette-du-Var" },
    { "@type": "City", name: "Solliès-Pont" },
    { "@type": "City", name: "Solliès-Ville" },
    { "@type": "City", name: "La Crau" },
    { "@type": "City", name: "Cuers" },
    { "@type": "City", name: "Hyères" },
  ],
  makesOffer: [
    { "@type": "Offer", itemOffered: { "@type": "Service", name: "Vente de pièces détachées neuves" } },
    { "@type": "Offer", itemOffered: { "@type": "Service", name: "Vente de pièces détachées d'occasion vérifiées, y compris pour anciens modèles et véhicules de collection" } },
    { "@type": "Offer", itemOffered: { "@type": "Service", name: "Enlèvement d'épaves et recyclage de véhicules hors d'usage" } },
    { "@type": "Offer", itemOffered: { "@type": "Service", name: "Rachat de véhicules selon les cas, sur étude au comptoir ou par téléphone" } },
  ],
};

/* FAQ : la version visible (accueil) et le JSON-LD FAQPage doivent rester MOT À MOT identiques. */
export const FAQ = [
  {
    question: "Quelles pièces détachées trouve-t-on chez P.A.C. à La Farlède ?",
    reponse:
      "P.A.C. vend des pièces détachées neuves et d'occasion pour voitures et utilitaires : moteurs, boîtes de vitesses, alternateurs, démarreurs, optiques, éléments de carrosserie, portières, rétroviseurs, jantes, sellerie et électronique embarquée. Le stock tourne en permanence : le plus simple est d'appeler le 04 94 08 15 33 pour vérifier la disponibilité.",
  },
  {
    question: "Comment savoir si ma pièce est en stock ?",
    reponse:
      "Appelez le comptoir au 04 94 08 15 33 du lundi au vendredi, de 8h à 12h et de 14h à 18h, avec votre carte grise ou la référence de la pièce. L'équipe vérifie le stock immédiatement et met la pièce de côté pour votre passage.",
  },
  {
    question: "Les pièces d'occasion sont-elles vérifiées ?",
    reponse:
      "Oui. Chaque pièce d'occasion est démontée, contrôlée et référencée avant sa mise en vente. Les conditions exactes (état, provenance, modalités de reprise) sont précisées au comptoir pour chaque pièce.",
  },
  {
    question: "Trouve-t-on des pièces pour anciens modèles ou véhicules de collection ?",
    reponse:
      "Oui, c'est une des forces de l'occasion en casse : des pièces introuvables en neuf pour les anciens modèles, youngtimers et véhicules de collection passent régulièrement dans le stock. Appelez le 04 94 08 15 33 avec la référence ou la carte grise, l'équipe cherche dans le stock et chez les confrères si besoin.",
  },
  {
    question: "P.A.C. reprend-il les épaves et véhicules hors d'usage ?",
    reponse:
      "Oui. P.A.C. assure l'enlèvement des épaves et le recyclage des véhicules hors d'usage dans le secteur de La Farlède, Toulon et l'est varois. Appelez le 04 94 08 15 33 pour convenir des modalités et des documents à préparer.",
  },
  {
    question: "P.A.C. rachète-t-il les véhicules ?",
    reponse:
      "C'est possible dans certains cas, selon le véhicule et son état, mais pas systématique. Le plus simple est de nous contacter au 04 94 08 15 33 ou de passer directement au comptoir du 25 rue Gay Lussac à La Farlède pour une réponse rapide.",
  },
  {
    question: "Quels sont les horaires et comment accéder au comptoir ?",
    reponse:
      "Le comptoir du 25 rue Gay Lussac (ZI Toulon Est, 83210 La Farlède) est ouvert du lundi au vendredi de 8h à 12h et de 14h à 18h, fermé le week-end et les jours fériés. Parking sur place, accès adapté aux personnes à mobilité réduite, carte bancaire acceptée.",
  },
] as const;

export const faqPageJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: FAQ.map((f) => ({
    "@type": "Question",
    name: f.question,
    acceptedAnswer: { "@type": "Answer", text: f.reponse },
  })),
};

export const webSiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "P.A.C. Pièces Auto Cass",
  url: `${SITE_URL}/`,
  inLanguage: "fr-FR",
  publisher: { "@id": ETABLISSEMENT_ID },
};

export function sousPageJsonLd(opts: {
  service?: { name: string; serviceType: string; path: string };
  breadcrumb: string;
  contactPage?: boolean;
}) {
  const graph: object[] = [etablissementStub];
  if (opts.service) {
    graph.push({
      "@type": "Service",
      name: opts.service.name,
      serviceType: opts.service.serviceType,
      provider: { "@id": ETABLISSEMENT_ID },
      areaServed:
        "La Farlède, Toulon, La Garde, La Valette-du-Var, Solliès-Pont, Cuers, Hyères, La Crau",
      url: `${SITE_URL}${opts.service.path}`,
    });
  }
  if (opts.contactPage) {
    graph.push({
      "@type": "ContactPage",
      name: "Contact et accès · P.A.C. Pièces Auto Cass",
      url: `${SITE_URL}/contact.html`,
      about: { "@id": ETABLISSEMENT_ID },
    });
  }
  graph.push({
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Accueil", item: `${SITE_URL}/` },
      { "@type": "ListItem", position: 2, name: opts.breadcrumb },
    ],
  });
  return { "@context": "https://schema.org", "@graph": graph };
}
