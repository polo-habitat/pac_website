# pac_website

Site vitrine de **P.A.C. Pièces Auto Cass**, casse automobile et pièces
détachées neuves et d'occasion depuis 1992.
ZI Toulon Est, 25 rue Gay Lussac, 83210 La Farlède (Var).
Devise : « la bonne pièce au bon prix ».

**Site en ligne : <https://polo-habitat.github.io/pac_website/>**

## Stack

- **Next.js 16** (App Router, TypeScript) en **export statique**
  (`output: "export"`, `basePath: "/pac_website"`)
- **Tailwind CSS v4 + shadcn/ui** : design system neutre réchauffé +
  jaune #ffd400 en accent unique (direction « Kolibri » validée)
- **motion** (Framer Motion) : préloader rideau, split text, pilules
  magnétiques, engrenage piloté au scroll, compteurs, marquee avec pause
- Police Archivo variable auto-hébergée (`next/font/local`), images WebP
  auto-hébergées

## Pages

Accueil, pièces neuves, pièces d'occasion (dont anciens modèles &
collection), rachat de voiture, contact, mentions légales, 404.

## SEO / GEO

- JSON-LD : `AutoPartsStore`, `FAQPage`, `WebSite`, `BreadcrumbList`,
  `Service`, `ContactPage` — générés depuis `src/lib/site.ts`
- NAP cohérent, `sitemap.xml`, `robots.txt` ouvert aux crawlers IA,
  `llms.txt`, Open Graph + Twitter Cards 1200×630
- Les URLs historiques `*.html` restent servies par GitHub Pages

## Développement

```bash
npm install
npm run dev     # http://localhost:3000/pac_website
npm run build   # export statique dans out/
```

## Déploiement

```bash
npm run deploy   # build + push de out/ sur la branche gh-pages
```

GitHub Pages sert la branche `gh-pages` (racine). Pousser `main` ne
publie pas le site.

## Contexte design

Voir `AGENTS.md` (mémoire projet), `PRODUCT.md` (voix de marque) et
`DESIGN.md` (palette, typographie, motion). Photos d'illustration :
Unsplash.
