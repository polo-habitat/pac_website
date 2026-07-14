export const SITE_URL = "https://polo-habitat.github.io/pac_website";

/**
 * Clé publique Web3Forms pour le formulaire de contact (envoi sans backend).
 * À générer gratuitement sur https://web3forms.com avec l'adresse e-mail qui
 * doit recevoir les messages, puis coller la clé ici. Vide = formulaire
 * inactif (il renvoie alors vers le téléphone).
 */
export const WEB3FORMS_ACCESS_KEY: string = "e85372ed-25ef-45ee-9cf3-26d345584e4e";

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
  { href: "/rachat-de-voiture", label: "Rachat de voiture" },
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
    "Casse automobile et magasin de pièces détachées neuves et d'occasion à La Farlède (Var) depuis 1992. Rachat de véhicules selon les cas.",
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
    { "@type": "Offer", itemOffered: { "@type": "Service", name: "Rachat de véhicules selon les cas, sur étude au comptoir ou par téléphone" } },
  ],
};

/* FAQ : la version visible (accueil) et le JSON-LD FAQPage doivent rester MOT À MOT identiques. */
export const FAQ = [
  {
    question: "Quelles pièces trouve-t-on chez P.A.C. ?",
    reponse:
      "Des pièces neuves et d'occasion pour voitures et utilitaires : mécanique, carrosserie, optiques, électricité, sellerie et jantes. Le stock évolue chaque jour ; appelez le 04 94 08 15 33 pour vérifier une référence.",
  },
  {
    question: "Comment savoir si une pièce est disponible ?",
    reponse:
      "Appelez le 04 94 08 15 33 aux heures d'ouverture, du lundi au vendredi de 8h à 12h et de 14h à 18h, muni de la carte grise ou de la référence. La disponibilité est vérifiée immédiatement et la pièce mise de côté.",
  },
  {
    question: "Les pièces d'occasion sont-elles contrôlées ?",
    reponse:
      "Oui. Chaque pièce est démontée, contrôlée et référencée avant la vente. L'état et les conditions de reprise sont précisés au comptoir.",
  },
  {
    question: "Trouve-t-on des pièces pour véhicules anciens ou de collection ?",
    reponse:
      "Fréquemment. Une casse dispose de pièces qui ne sont plus fabriquées, pour les modèles anciens et de collection. Communiquez la référence ou la carte grise : la recherche est étendue aux confrères si nécessaire.",
  },
  {
    question: "P.A.C. rachète-t-il les véhicules ?",
    reponse:
      "Selon le modèle et son état, un rachat est possible mais non systématique. L'évaluation se fait au comptoir, 25 rue Gay Lussac à La Farlède, ou par téléphone au 04 94 08 15 33.",
  },
  {
    question: "Quels sont les horaires et l'accès au comptoir ?",
    reponse:
      "Ouvert du lundi au vendredi, de 8h à 12h et de 14h à 18h, fermé le week-end et les jours fériés. Comptoir au 25 rue Gay Lussac, ZI Toulon Est, 83210 La Farlède. Parking, accès pour personnes à mobilité réduite, carte bancaire acceptée.",
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
