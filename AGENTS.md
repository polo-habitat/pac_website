<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# Mémoire du projet pac_website

Site vitrine de **P.A.C. Pièces Auto Cass**, casse automobile et pièces
détachées neuves et d'occasion à La Farlède (Var). Slogan : « la bonne
pièce au bon prix ». Dernière mise à jour : 11 juillet 2026.

## État actuel : EN LIGNE ✅ (refonte v4 React/shadcn)

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
- Positionnement voulu par le client : **pièces neuves mises en avant**
  devant l'occasion ; l'occasion est valorisée via les **anciens modèles,
  youngtimers et véhicules de collection**.

## Stack v4 (refonte du 11/07/2026, remplace le statique pur v3)

- **Next.js 16 (App Router, Turbopack) + TypeScript**, `output: "export"`,
  `basePath: "/pac_website"`, images `unoptimized`
- **Tailwind CSS v4 + shadcn/ui** (base radix, préset nova) : Button,
  Card, Badge, Accordion, Sheet (menu mobile), Table, Breadcrumb, Separator
- **motion** (Framer Motion) pour la couche animation
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

## Couche motion (composants `src/components/motion/`)

- Préloader rideau noir/jaune : **CSS pur** (fiable même renderer gelé),
  1×/session via sessionStorage `pac_vu` + script inline dans layout qui
  pose `html[data-pac-vu]` avant peinture
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
- Counter (motion animate + setTimeout de secours, affiche la valeur
  finale tant que non déclenché), Magnetic (pilules magnétiques), Gear
  (engrenage piloté au scroll), CursorHalo (halo jaune, pointer:fine
  uniquement), Marquee (bandeau jaune + bouton pause WCAG) — motion est
  acceptable pour ceux-là (décoratifs ou pilotés par le pointeur)

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
4. **v4 (actuelle)** = même direction visuelle Kolibri (blanc cassé, noir,
   jaune #ffd400 unique, Archivo, pilules, panneaux 28px, wordmark géant
   coupé, engrenage) reconstruite sur Next/shadcn/Tailwind/motion à la
   demande du client (« refonte avec shadcn, jaune en plus des couleurs
   shadcn, hyper réactif, magnifique »)

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
