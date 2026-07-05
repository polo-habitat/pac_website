# pac_website

Site vitrine de **P.A.C. Pièces Auto Cass**, casse automobile et pièces
détachées neuves et d'occasion depuis 1992.
ZI Toulon Est, 25 rue Gay Lussac, 83210 La Farlède (Var).
Devise : « la bonne pièce au bon prix ».

**Site en ligne : <https://polo-habitat.github.io/pac_website/>**

## Stack

Site 100 % statique, zéro framework, zéro dépendance externe au chargement :

- HTML sémantique multi-pages (accueil, occasion, neuves, épaves, contact,
  mentions légales, 404)
- CSS unique (`assets/css/style.css`) : design system « comptoir d'atelier »,
  OKLCH avec repli hex, animations GPU uniquement (transform/opacity),
  `prefers-reduced-motion` respecté
- JS vanilla (`assets/js/main.js`, ~4 Ko) : choréographie du hero,
  révélations au scroll (IntersectionObserver), compteurs, menu mobile
- Polices auto-hébergées (Big Shoulders variable + Barlow, woff2 latin)
- Images WebP auto-hébergées, lazy-loading hors hero

## SEO / GEO

- JSON-LD : `AutoPartsStore`, `FAQPage`, `WebSite`, `BreadcrumbList`,
  `Service`, `ContactPage`
- NAP cohérent sur toutes les pages, `sitemap.xml`, `robots.txt` ouvert aux
  crawlers IA (GPTBot, PerplexityBot, ClaudeBot…), `llms.txt`
- Open Graph + Twitter Cards avec image dédiée 1200×630

## Développement

Aucun build. Servir le dossier tel quel :

```bash
npx serve .        # ou n'importe quel serveur statique
```

Le déploiement se fait via GitHub Pages (branche `main`, racine).

## Contexte design

Voir `PRODUCT.md` (voix de marque, utilisateurs) et `DESIGN.md`
(palette, typographie, motion). Les photos d'illustration proviennent
d'Unsplash (IDs vérifiés).
