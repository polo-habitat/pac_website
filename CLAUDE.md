# CLAUDE.md — Mémoire du projet pac_website

Site vitrine de **P.A.C. Pièces Auto Cass**, casse automobile et pièces
détachées neuves et d'occasion à La Farlède (Var). Slogan : « la bonne
pièce au bon prix ». Dernière mise à jour : 5 juillet 2026.

## État actuel : EN LIGNE ✅

- **Prod** : https://polo-habitat.github.io/pac_website/
- **Repo** : https://github.com/polo-habitat/pac_website (branche `main`,
  GitHub Pages legacy build sur main/racine, HTTPS forcé, `.nojekyll`)
- Compte GitHub CLI authentifié : `polo-habitat`
  (gh.exe : `C:\Program Files\GitHub CLI\gh.exe` ; git : dans le PATH)
- Déploiement = simple `git push origin main` (1 à 2 min de build)
- Serveur local de dev : n'importe quel serveur statique à la racine
  (aucun build, aucune dépendance)

## Données entreprise (VÉRIFIÉES, ne pas réinventer)

- SARL PIECES AUTO CASS · SIREN 384 297 552 · RCS Toulon · créée le
  01/02/1992 · gérant Lazaros Efstathiou
- Comptoir : 25 rue Gay Lussac, ZI Toulon Est, 83210 La Farlède
  (siège social au 79 de la même rue — distinction faite dans les mentions)
- Tél 04 94 08 15 33 · Fax 04 94 08 66 39
- Horaires : lun-ven 8h-12h / 14h-18h, fermé week-end et fériés
- ~4/5 sur une centaine d'avis annuaires · CB, accès PMR, parking
- Sources : annuaire-horaire.fr, casseautos.com, Yelp, Mappy,
  API recherche-entreprises.api.gouv.fr

## Design : v3 « Kolibri + motion agence » (VALIDÉ après 2 refontes)

Historique des directions — ne pas y revenir :
1. ~~v1 « comptoir d'atelier » bleu de France/chanfreins~~ → rejetée
   (« très moche »)
2. v2 minimaliste façon **kolibri.is/en** (référence imposée par le
   client) : blanc #fefdfb, noir #131312, jaune unique #ffd400, Archivo
   variable seule famille (wdth 62-125), wordmark géant coupé, pilules,
   panneaux radius 28px, engrenage SVG jaune → base validée
3. v3 = v2 + couche motion (demande « effet WOUHAOU, 10 000 € ») :
   préloader rideau noir/jaune (1×/session via sessionStorage `pac_vu`),
   split text mot à mot, wordmark lettre à lettre, curseur custom +
   halo, pilules magnétiques, engrenage piloté au scroll, parallaxe +
   révélation d'images au clip-path, compteurs, marquee jaune avec
   bouton pause

Voir `PRODUCT.md` (voix, utilisateurs) et `DESIGN.md` (jetons, règles).

## ⚠️ Particularités du poste client (IMPORTANT)

- Son Windows a les effets d'animation désactivés →
  `prefers-reduced-motion: reduce` **en permanence** dans Chrome.
  Décision actée avec lui : les animations jouent pour tous, le gate
  reduced-motion a été retiré (JS : `mqReduit = { matches: false }`).
  Ne pas le réintroduire sans le prévenir, il verrait à nouveau un site
  « sans aucune animation ».
- Sa fenêtre Chrome est souvent occultée → renderer gelé : captures CDP
  en timeout, rAF/IntersectionObserver suspendus. Les fallbacks sont en
  place dans `main.js` (setTimeout de secours pour `pret`, balayage
  `balayer()` au scroll/visibilitychange). En tester d'autres si ajout
  de features dépendantes de rAF.

## Architecture (statique pur, zéro framework, zéro requête externe)

- 7 pages : `index.html`, `pieces-occasion.html`, `pieces-neuves.html`,
  `enlevement-epave.html`, `contact.html`, `mentions-legales.html`,
  `404.html` (chemins absolus `/pac_website/` dans la 404 uniquement)
- `assets/css/style.css` : design system complet (jetons OKLCH + repli
  hex, couche motion en fin de fichier)
- `assets/js/main.js` : tout le moteur d'animation vanilla (~350 lignes),
  gaté derrière `html.js` posé par un script inline dans chaque <head> —
  sans JS tout le contenu est visible
- `assets/fonts/archivo-var-latin.woff2` (88 Ko, seule police)
- Images WebP Unsplash auto-hébergées, recadrées aux ratios CSS exacts
  (hero 4:5, panneaux 5:4, bandeaux 3:2), lazy sauf 1re image
- OG image générée via PowerShell System.Drawing (script re-jouable,
  style v2 blanc/jaune/noir)

## SEO / GEO en place

- JSON-LD : AutoPartsStore complet sur l'accueil (`#etablissement`),
  stubs du même @id + Service + BreadcrumbList sur les sous-pages,
  FAQPage alignée MOT À MOT avec la FAQ visible (ne pas désynchroniser),
  WebSite, ContactPage · 7/7 blocs validés par parsing
- `sitemap.xml` (5 URLs), `robots.txt` ouvert aux bots IA, `llms.txt`
- NAP identique partout · titles < 65 car. · descriptions 120-160 car.

## Prochaines étapes suggérées (non faites)

1. **Google Search Console** : soumettre le sitemap manuellement —
   robots.txt/llms.txt d'une « project page » GitHub ne sont pas lus à la
   racine du domaine, c'est le point SEO le plus important restant
2. **Domaine personnalisé** (ex. pac-lafarlede.fr) : réglerait le point 1,
   penser à mettre à jour canonical/sitemap/JSON-LD/OG (URLs absolues)
3. **Google Business Profile** : revendiquer la fiche, y lier le site
4. Éventuels enrichissements motion évoqués : transitions entre pages,
   distorsion au survol des photos
5. Vraies photos du site de La Farlède à substituer aux Unsplash quand
   le client en fournira

## Conventions de travail avec ce client

- Répondre en français
- Il veut du spectaculaire mais sobre ; valider visuellement dans Chrome
  (claude-in-chrome) avant de pousser
- Workflow validé : audits par sous-agents parallèles (a11y / SEO-GEO /
  perf-sécu) puis corrections — les 45 constats de l'audit du 05/07/2026
  sont tous traités ou intégrés
