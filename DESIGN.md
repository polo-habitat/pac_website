# DESIGN.md — P.A.C.

## Direction

Lane nommée : **« comptoir d'atelier français »**. Signalétique industrielle,
plaques frappées, livrée Bleu de France sur acier. Référence couleur nommée :
livrée de course française (bleu de France) posée sur du papier chamois
d'atelier, pas le réflexe rouge/noir/jaune du secteur pièces auto.

Scène physique (choix du thème) : un garagiste au comptoir à 9 h du matin,
la lumière du Var entre par la porte du hangar, il cherche un alternateur de
Clio sur un téléphone taché de cambouis. → Base claire (papier chamois),
hero et bandeaux « hangar » en bleu nuit drenché. Art direction par section
assumée.

## Couleurs (OKLCH, stratégie : Committed → Drenched sur le hero)

- `--nuit`   : oklch(0.22 0.045 258)  — bleu-noir de hangar (hero, footer)
- `--nuit-2` : oklch(0.27 0.055 257)  — panneau sur nuit
- `--bleu`   : oklch(0.50 0.17 257)   — bleu de France, couleur porteuse
- `--bleu-vif`: oklch(0.66 0.16 252)  — bleu lisible sur nuit
- `--papier` : oklch(0.962 0.012 85)  — chamois d'atelier (fond clair)
- `--papier-2`: oklch(0.93 0.018 83)  — chamois soutenu (alternance)
- `--encre`  : oklch(0.25 0.025 260)  — texte sur clair
- `--craie`  : oklch(0.96 0.008 85)   — texte sur nuit
- `--ambre`  : oklch(0.78 0.14 78)    — étiquette de prix, marquages (≤ 5 %)

Jamais de #000 ni #fff. Le bleu porte 30–60 % des surfaces (hero, bandeaux,
titres, liens, boutons).

## Typographie

- Display : **Big Shoulders** (variable, condensé industriel) — titres
  énormes, capitales, tracking serré. C'est la voix « plaque frappée ».
- Texte : **Barlow** (400 / 500 / 700) — grotesque issue de la signalétique
  routière, parfaite pour un métier de plaques d'immatriculation.
- Échelle fluide clamp(), ratio ≥ 1.3. Hero : clamp(3.4rem, 11vw, 9rem).
- Corps : 65ch max, line-height 1.6 (1.68 sur fond nuit).
- Labels techniques : Barlow 500, caps, tracking 0.08em — réservés aux
  étiquettes de données (horaires, réfs), pas un kicker répété par section.

## Motifs et matière

- Filets techniques 1px, coins à onglet coupé (chanfrein 45°) sur les
  encarts : découpe de tôle, pas de border-radius mou (radius max 6px).
- Numérotation frappée « 01 / 02 / 03 » Big Shoulders en très grand.
- Marquee horizontal des familles de pièces (moteur · boîte · optique …).
- Texture : léger grain SVG sur les fonds nuit.

## Motion (ease-out-quint partout, jamais de layout animé)

- Chargement : choréographie unique du hero — lignes du titre révélées par
  clip-path en cascade (80 ms d'écart), image qui se dévoile, stats qui
  comptent.
- Scroll : IntersectionObserver, translateY(24px)+opacity, une seule fois.
- Marquee CSS infini (translate3d), pause au hover.
- SVG traits (pistons, engrenage) dessinés au stroke-dashoffset.
- `prefers-reduced-motion` : tout est désactivé, contenu visible d'emblée.

## Imagerie (Unsplash, IDs vérifiés le 05/07/2026)

- Hero : photo-1619642751034-765dfdf7c58e (mains, clé plate, moteur, sombre)
- Moteur/occasion : photo-1486262715619-67b85e0b08d3 (courroie, poulies)
- Entretien/neuves : photo-1487754180451-c456f719a1fc (vidange)
- Roues : photo-1613214149922-f1809c99b414 (boulonneur sur jante)
- Atelier : photo-1625047509168-a7026f36de04 (capot ouvert, pont)
- Équipe : photo-1504222490345-c075b6008014 (mécano souriant)
- Compteur : photo-1498887960847-2a5e46312788 (cadran km/h)
- Alt text rédigé, jamais générique.

## Interdits spécifiques

- Rouge/noir/jaune « pièces auto » (réflexe de catégorie).
- Cards identiques en grille, icônes arrondies au-dessus des titres.
- Dégradé sur texte, bordure latérale colorée, glassmorphism.
- Em dashes dans la copie.
