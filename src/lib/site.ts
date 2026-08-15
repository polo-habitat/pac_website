export const SITE_URL = "https://piecesautocass.fr";

/**
 * Clé publique Web3Forms pour le formulaire de contact (envoi sans backend).
 * À générer gratuitement sur https://web3forms.com avec l'adresse e-mail qui
 * doit recevoir les messages, puis coller la clé ici. Vide = formulaire
 * inactif (il renvoie alors vers le téléphone).
 */
export const WEB3FORMS_ACCESS_KEY: string = "e85372ed-25ef-45ee-9cf3-26d345584e4e";

/** Depuis la migration domaine (19/07/2026), le site est servi à la racine :
 *  plus de basePath. Le helper est conservé (compat des appels existants). */
export const BASE_PATH = "";
export const asset = (p: string) => `${BASE_PATH}${p}`;

/** Coordonnées du 25 rue Gay Lussac (Base Adresse Nationale, id 83054_0093_00025). */
export const GEO = { latitude: 43.152461, longitude: 6.042753 } as const;

export const OG_IMAGE = {
  url: `${SITE_URL}/img/og-image.png`,
  width: 1200,
  height: 630,
} as const;

/** Metadata communes d'une page : canonical + Open Graph/Twitter COMPLETS.
 *  ⚠️ La fusion des metadata App Router est superficielle par clé racine :
 *  une page qui redéfinit `openGraph`/`twitter` écrase entièrement ceux du
 *  layout (l'og:image du layout disparaissait de toutes les pages). Ce helper
 *  fournit donc les objets entiers, images comprises. */
export function pageMeta(opts: {
  titre: string;
  description: string;
  path: string;
  ogDescription?: string;
}) {
  const url = `${SITE_URL}${opts.path}`;
  const ogDescription = opts.ogDescription ?? opts.description;
  return {
    title: opts.titre,
    description: opts.description,
    alternates: { canonical: url },
    openGraph: {
      type: "website" as const,
      locale: "fr_FR",
      siteName: "P.A.C. Pièces Auto Cass",
      title: opts.titre,
      description: ogDescription,
      url,
      images: [OG_IMAGE],
    },
    twitter: {
      card: "summary_large_image" as const,
      title: opts.titre,
      description: ogDescription,
      images: [OG_IMAGE.url],
    },
  };
}

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
  { href: "/contact", label: "Contact" },
] as const;

export const SECTEUR =
  "La Farlède, Toulon, La Garde, La Valette-du-Var, Solliès-Pont, Solliès-Ville, La Crau, Cuers, Hyères et tout l'est varois.";

/* Établissement JSON-LD complet (accueil) et stub (sous-pages).
   Ni rachat de métaux ni rachat de véhicules : aucun des deux n'est évoqué sur le site. */
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
  legalName: "PIECES AUTO CASS",
  slogan: "La bonne pièce au bon prix",
  description:
    "Magasin de pièces détachées automobiles neuves et d'occasion à La Farlède, près de Toulon (Var), depuis 1992. Conseil au comptoir.",
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
  geo: { "@type": "GeoCoordinates", ...GEO },
  hasMap: NAP.mapsUrl,
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
    { "@type": "Offer", itemOffered: { "@type": "Service", name: "Vente de pièces détachées d'occasion, notamment pour anciens modèles et véhicules de collection" } },
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
    question: "Quel est le délai pour une pièce neuve commandée ?",
    reponse:
      "Le délai dépend de la référence et du fournisseur ; il est annoncé au moment de la demande, au 04 94 08 15 33 ou au comptoir.",
  },
  {
    question: "Quelles marques de véhicules sont couvertes ?",
    reponse:
      "La plupart des marques et des modèles, en pièces neuves comme en occasion : véhicules courants, utilitaires, anciens modèles et véhicules de collection. La compatibilité est vérifiée sur présentation de la carte grise ou de la référence, au 04 94 08 15 33.",
  },
  {
    question: "Les pièces sont-elles expédiées ou vendues en ligne ?",
    reponse:
      "Non : la vente s'effectue exclusivement au comptoir, 25 rue Gay Lussac à La Farlède.",
  },
  {
    question: "Trouve-t-on des pièces pour véhicules anciens ou de collection ?",
    reponse:
      "Fréquemment. Le stock d'occasion, constitué de longue date, comprend des références qui ne sont plus fabriquées, pour les modèles anciens et de collection. Communiquez la référence ou la carte grise : la recherche est étendue aux confrères si nécessaire.",
  },
  {
    question: "Quels sont les horaires et l'accès au comptoir ?",
    reponse:
      "Ouvert du lundi au vendredi, de 8h à 12h et de 14h à 18h, fermé le week-end et les jours fériés. Comptoir au 25 rue Gay Lussac, ZI Toulon Est, 83210 La Farlède. Parking, accès pour personnes à mobilité réduite, carte bancaire acceptée.",
  },
  {
    question: "Où trouver une casse automobile près de Toulon ?",
    reponse:
      "P.A.C. Pièces Auto Cass répond à ce besoin : plus qu'une casse, il s'agit d'un magasin de pièces détachées neuves et d'occasion, avec conseil au comptoir. L'établissement se trouve ZI Toulon Est, 25 rue Gay Lussac à La Farlède, à une dizaine de minutes de Toulon par l'A57, sortie La Farlède, et sert Toulon, La Garde, La Valette-du-Var, Solliès-Pont, La Crau, Cuers, Hyères et l'est du Var.",
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
  "@id": `${SITE_URL}/#website`,
  name: "P.A.C. Pièces Auto Cass",
  url: `${SITE_URL}/`,
  inLanguage: "fr-FR",
  publisher: { "@id": ETABLISSEMENT_ID },
};

export function sousPageJsonLd(opts: {
  path: string;
  service?: { name: string; serviceType: string };
  breadcrumb: string;
  contactPage?: boolean;
}) {
  const url = `${SITE_URL}${opts.path}`;
  const graph: object[] = [etablissementStub];
  if (opts.service) {
    graph.push({
      "@type": "Service",
      "@id": `${url}#service`,
      name: opts.service.name,
      serviceType: opts.service.serviceType,
      provider: { "@id": ETABLISSEMENT_ID },
      areaServed: SECTEUR,
      url,
    });
  }
  if (opts.contactPage) {
    graph.push({
      "@type": "ContactPage",
      name: "Contact et accès · P.A.C. Pièces Auto Cass",
      url,
      about: { "@id": ETABLISSEMENT_ID },
    });
  }
  graph.push({
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Accueil", item: `${SITE_URL}/` },
      { "@type": "ListItem", position: 2, name: opts.breadcrumb, item: url },
    ],
  });
  return { "@context": "https://schema.org", "@graph": graph };
}
