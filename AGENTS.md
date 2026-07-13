<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# Mémoire du projet pac_website

Site vitrine de **P.A.C. Pièces Auto Cass**, casse automobile et pièces
détachées neuves et d'occasion à La Farlède (Var). Slogan : « la bonne
pièce au bon prix ». Dernière mise à jour : 12 juillet 2026.

## État actuel : EN LIGNE ✅ (v6 « Roulez », esprit zoox.com)

- **Prod** : https://polo-habitat.github.io/pac_website/
- **Repo** : https://github.com/polo-habitat/pac_website (branche `main`)
- Compte GitHub CLI authentifié : `polo-habitat`
  (gh.exe : `C:\Program Files\GitHub CLI\gh.exe` ; git : dans le PATH)
- **Déploiement** : `npm run deploy` → build Next.js puis push de `out/`
  sur la branche **gh-pages** (package npm `gh-pages`), servie par GitHub
  Pages (build_type=legacy, source gh-pages/racine). Pousser `main` ne
  publie PAS le site : toujours `npm run deploy` après le push.
  ⚠️ Le jeton OAuth gh n'a pas le scope `workflow` : impossible de pousser
  `.github/workflows/*` (le fichier deploy.yml existe localement, non
  suivi). Si le client exécute un jour
  `gh auth refresh -h github.com -s workflow`, on pourra committer le
  workflow et repasser Pages en build_type=workflow.
- Dev local : `npm run dev` (basePath /pac_website s'applique aussi en dev)
- Build : `npm run build` → export statique dans `out/`

## Données entreprise (VÉRIFIÉES, ne pas réinventer)

- SARL PIECES AUTO CASS · SIREN 384 297 552 · RCS Toulon · créée le
  01/02/1992 · gérant Lazaros Efstathiou
- Comptoir : 25 rue Gay Lussac, ZI Toulon Est, 83210 La Farlède
  (siège social au 79 de la même rue — distinction faite dans les mentions)
- Tél 04 94 08 15 33 · Fax 04 94 08 66 39
- Horaires : lun-ven 8h-12h / 14h-18h, fermé week-end et fériés
- ~4/5 sur une centaine d'avis annuaires · CB, accès PMR, parking
- ⚠️ **Pas de rachat de métaux** (retiré le 11/07/2026 à la demande du
  client). Le **rachat de véhicules** existe mais n'est pas systématique :
  toujours renvoyer vers un appel ou un passage au comptoir.
- ⚠️ **Pas d'enlèvement d'épave / recyclage VHU** (retiré le 13/07/2026 à
  la demande du client : « sur le site il n'y a pas d'enlèvement d'épave,
  juste rachat de véhicule »). L'ancienne page `enlevement-epave` a été
  renommée **`rachat-de-voiture`** (nouvelle URL `/rachat-de-voiture`,
  l'ancienne `/enlevement-epave.html` n'existe plus). Ne pas réintroduire
  enlèvement / dépollution / centre agréé VHU.
- Positionnement voulu par le client : **pièces neuves mises en avant**
  devant l'occasion ; l'occasion est valorisée via les **anciens modèles,
  youngtimers et véhicules de collection**.

## Stack v4 (refonte du 11/07/2026, remplace le statique pur v3)

- **Next.js 16 (App Router, Turbopack) + TypeScript**, `output: "export"`,
  `basePath: "/pac_website"`, images `unoptimized`
- **Tailwind CSS v4 + shadcn/ui** (base radix, préset nova) : Button,
  Card, Badge, Accordion, Sheet (menu mobile), Table, Breadcrumb, Separator
- **motion** (Framer Motion) pour Counter/Magnetic + **lenis** (défilement
  inertiel, monté par `src/components/motion/smooth-scroll.tsx` ; purement
  décoratif, aucun contenu n'en dépend). ⚠️ Depuis le 13/07/2026 **actif sur
  TOUS les appareils, tactiles compris** (le garde `pointer: coarse` a été
  retiré à la demande du client : « forcer les animations sur tous les
  mobiles/tablettes »). Si le scroll tactile paraît flottant, c'est le
  point à revoir en premier.
- Jetons dans `src/app/globals.css` : neutres shadcn réchauffés
  (#fefdfb/#131312/#f5f3ee/#6f6d68) + `--accent`/`--jaune` **#ffd400** +
  `--sable` #f8f2dd. Radius panneaux 28px, pilules rounded-full.
- Police : Archivo variable auto-hébergée (`src/fonts/`, next/font/local,
  wght 100-900, wdth via `.font-wide`)
- Contenu/NAP/JSON-LD/FAQ centralisés dans **`src/lib/site.ts`**
  (la FAQ visible et le FAQPage JSON-LD sortent du même tableau `FAQ` —
  impossible à désynchroniser)
- ⚠️ `next/image` n'applique PAS basePath aux src : utiliser le helper
  `asset()` de `src/lib/site.ts` pour toute image de `public/`

## URLs et SEO

- Pas de trailingSlash → l'export émet `page.html`; GitHub Pages sert
  `/page` ET `/page.html` : les anciennes URLs indexées restent valides
- Canonicals conservés sur les URLs `.html` (comme le sitemap déjà connu)
- JSON-LD : AutoPartsStore complet + WebSite + FAQPage sur l'accueil,
  stub @id + Service + BreadcrumbList sur les sous-pages (ContactPage sur
  contact) — tout est généré depuis `src/lib/site.ts`
- `public/` : robots.txt, sitemap.xml, llms.txt, `.nojekyll`
  (obligatoire sinon Pages ignore `_next/`)

## Couche motion v6 (composants `src/components/motion/` + CSS)

- `use-reveal.ts` : IntersectionObserver + filet scroll/visibilitychange
  (équivalent du `balayer()` de l'ancien site)
- **Reveal et SplitText sont en transitions CSS pures** (`[data-reveal]`,
  `[data-split]` dans globals.css, classe `.pac-vu` posée par useReveal,
  gate `html.js` posé avant peinture) : NE PAS les repasser sur des
  animations rAF (motion/Framer) — sur le poste client le renderer gèle
  et les éléments restaient bloqués invisibles (« je ne vois rien »,
  12/07/2026). Filet ultime : keyframe `pac-secours` force la visibilité
  après 4 s. L'espace entre mots du SplitText doit rester HORS du span
  inline-block overflow-hidden (sinon il est rogné).
- **Animations pilotées par le scroll en CSS pur** (`@supports
  (animation-timeline: view())`, globals.css) : `.pac-grandit` (média qui
  s'élargit en traversant le viewport), `.pac-zoom` (zoom lent d'image),
  `.pac-roue` (roues de la petite voiture du header, `scroll(root)`).
  Sans support, l'état de base = état final : rien n'est jamais caché.
- Header : nav complète en haut de page ; au-delà de 72 px les liens
  s'effacent (`inert`), le wordmark devient une pastille blanche avec la
  petite voiture (`src/components/nav-voiture.tsx`, SVG maison) et le
  burger apparaît. Menu = Sheet Radix côté gauche restylé (panneau blanc
  arrondi, liens en cascade `.pac-menu-item`).
- `mots-defilants.tsx` : colonne de mots en boucle CSS + bouton pause
  (WCAG 2.2.2), carte « pièces neuves » de l'accueil.
- Counter (motion animate + setTimeout de secours) et Magnetic restent
  sur motion (décoratifs). **Supprimés en v6 : Préloader rideau,
  CursorHalo, Marquee jaune** (pas dans l'esprit zoox voulu par le
  client). Le script sessionStorage `pac_vu` du layout reste (inoffensif).

## ⚠️ Particularités du poste client (IMPORTANT)

- Windows du client a les effets d'animation désactivés →
  `prefers-reduced-motion: reduce` en permanence dans Chrome. Décision
  actée : les animations jouent pour tous — **ne pas gater sur
  prefers-reduced-motion** (motion/Framer ne le fait pas par défaut, ne
  pas ajouter `MotionConfig reducedMotion="user"`).
- Sa fenêtre Chrome est souvent occultée → renderer gelé : captures CDP
  en timeout, rAF/IO suspendus, animations motion figées en cours de vol
  sur les captures. Les filets sont en place (préloader CSS pur,
  use-reveal avec balayage, Counter avec timeout). Reprendre une capture
  après quelques secondes suffit en général.

## Historique design — ne pas y revenir

1. ~~v1 « comptoir d'atelier » bleu de France/chanfreins~~ → rejetée
2. v2 minimaliste façon kolibri.is/en (référence imposée) → validée
3. v3 = v2 + couche motion vanilla JS → validée
4. v4 = même direction visuelle Kolibri reconstruite sur
   Next/shadcn/Tailwind/motion — jugée « un peu cheap » par le client
5. ~~v5 (12/07/2026) = « Verre clair »~~ : mesh gradient + panneaux verre
   dépoli, choisie parmi 10 maquettes — remplacée le jour même.
   ⚠️ **L'ENGRENAGE RESTE SUPPRIMÉ** : le client ne l'aime pas
   (« j'aime pas la roue crantée ») — ne jamais le réintroduire.
6. **v6 (actuelle, 12/07/2026) = « Roulez », esprit zoox.com** : le client
   a demandé de reproduire à 100 % l'esprit de zoox.com (menu, arrivée,
   apparitions au scroll, structure) en gardant contenu/textes/polices/
   couleurs P.A.C. Grandes plaques plates (hero + bannières sable
   `--sable`, sections noires `--primary`, fond crème), titres géants
   centrés en Archivo semibold, sur-titres `.pac-eyebrow`, pilules CTA
   `cta-pill.tsx` (capitales espacées + chevron), cartes très arrondies
   (24-32 px). Header : liens autour du logo centré → pastille voiture
   au scroll. Footer : panneau blanc arrondi sur fond noir + photo +
   wordmark géant. `.pac-verre` est redéfini en panneau BLANC PLAT
   (plus aucun verre dépoli ni mesh). Défilement inertiel lenis.
   Déroulé de l'accueil calqué sur zoox.com : hero → image qui
   s'élargit + texte → 2 cartes (mots défilants / carte sombre) →
   pleine page comptoir → plaque noire (stats + 2 cartes) → plaque
   sable (méthode + 2 cartes) → FAQ en rangées → contact/horaires.
   ⚠️ **Hero = image auto plein cadre** (`public/img/hero-voiture-1600.webp`,
   **Porsche 911 rouge classique**, Unsplash, choisie par le client le
   12/07/2026 — les photos moteur puis Impala ont été rejetées). Voile
   sombre `from-black/70 via-black/40 to-black/75` + renfort haut pour la
   lisibilité du titre et du menu blancs.
   ⚠️ **En-tête = menu « Métal & Gas »** (site-header.tsx, réf.
   metalandgas.com imposée). Haut de page : **liens verticaux empilés en
   haut à gauche** (capitales, soulignement jaune au survol `.pac-navlink`),
   à **couleur adaptative comme le hamburger** (état unique `menuBlanc`,
   13/07/2026) : **blancs** dès qu'une section `data-nav="dark"` est derrière
   l'en-tête (accueil + toutes les sous-pages à hero photo sombre), **sombres**
   sinon (mentions légales). Valeur initiale sans flash : blanc partout sauf
   `/mentions-legales`. **Au défilement** ce
   bloc se transforme (fondu) en **HAMBURGER** qui ouvre un **menu plein
   écran** animé (liens en cascade `.pac-menu-lien`). **CTA tél jaune en
   haut à droite, toujours visible.**
   ⚠️ **Hamburger à couleur adaptative** : blanc quand une section
   `data-nav="dark"` est derrière lui, noir sinon. Marquer toute section
   sombre plein cadre avec `data-nav="dark"` (accueil : hero, pleine page
   comptoir, plaque réemploi). `mix-blend-mode` NE marche PAS (l'en-tête
   fixe isole le mélange) — d'où l'approche `data-nav`.
   ⚠️ **Détection du scroll = boucle rAF**, PAS `window.addEventListener
   ('scroll')` : avec **Lenis**, l'événement `scroll` natif ne se déclenche
   pas de façon fiable (vérifié : `nativeScrollFires:0`). Corollaire : quand
   la fenêtre est occultée (`document.hidden`), rAF est suspendu → l'en-tête
   ne réagit pas et les captures CDP sont figées. C'est sans impact réel
   (on ne scrolle pas une fenêtre cachée) mais ça empêche la validation
   visuelle en automatisation — valider sur l'URL en ligne, fenêtre au
   premier plan.
   ⚠️ **SUPPRIMÉS** : la pastille-voiture (NavVoiture, « icône qui sert à
   rien »), `.pac-roue`. Ne pas réintroduire.
   ⚠️ **Registre éditorial : professionnel et sobre**, pas familier
   (« on/vous » proscrits) ni redondant. Le client a rejeté deux passes :
   trop « IA » (marketing/triades), puis trop familière. Voir aussi
   [[reduced-motion-windows]] / [[renderer-gele-css-only]].
   ⚠️ **Sous-pages à hero photo plein cadre** (13/07/2026) : `PageBanner`
   accepte `image`/`imageAlt` et bascule alors en hero sombre identique à
   l'accueil (voile + texte blanc + `data-nav="dark"`). Actif sur pièces
   neuves (disque de frein), occasion (garage de collection), rachat
   (ancienne berline), contact (atelier). Mentions légales = plaque sable
   sobre (pas de photo). Fichiers `public/img/hero-{neuves,occasion,rachat,
   contact}-1600.webp` (Unsplash).
   ⚠️ **Thème verrouillé en clair** (`color-scheme: only light` dans
   globals.css + `viewport.colorScheme:"light"`), pour empêcher l'auto-dark
   de Chrome (Android) d'assombrir le site quel que soit le mode système.
   ⚠️ **Animations forcées pour tous** : aucun gate `prefers-reduced-motion`
   (bloc de réaffirmation dans globals.css) ; cf. lenis actif partout ci-dessus.

Voir `PRODUCT.md` (voix, utilisateurs) et `DESIGN.md` (jetons v2/v3,
toujours la référence visuelle).

## Prochaines étapes suggérées (non faites)

1. **Google Search Console** : soumettre le sitemap manuellement
2. **Domaine personnalisé** (ex. pac-lafarlede.fr) : mettre à jour
   SITE_URL/BASE_PATH dans `src/lib/site.ts` + next.config.ts + public/
3. **Google Business Profile** : revendiquer la fiche, y lier le site
4. Vraies photos du site de La Farlède à substituer aux Unsplash
5. Transitions entre pages (View Transitions) si demande de plus de motion

## Conventions de travail avec ce client

- Répondre en français
- Il veut du spectaculaire mais sobre ; valider visuellement dans Chrome
  (claude-in-chrome) avant de pousser
- Workflow validé : audits par sous-agents parallèles (a11y / SEO-GEO /
  perf-sécu) puis corrections
