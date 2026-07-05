# DESIGN.md — P.A.C. (v2, direction « Kolibri »)

Référence nommée par le client : https://www.kolibri.is/en. Minimalisme
scandinave à geste d'affiche : blanc pur, une grotesque noire à échelle
énorme, un seul jaune vif en formes géantes, panneaux à grands arrondis,
filets hairline, boutons pilule.

## Couleurs (stratégie : Committed, le jaune porte l'identité)

- `--blanc`   : #fefdfb — fond de page (blanc à peine chauffé, jamais #fff)
- `--noir`    : #131312 — texte, wordmark, boutons pilule
- `--gris`    : #6f6d68 — texte secondaire, kickers
- `--jaune`   : #ffd400 — accent unique : formes géantes, pilule téléphone,
  panneau prix, marquee (texte noir dessus, contraste ≈ 13:1)
- `--panneau` : #f5f3ee — panneaux gris chauds
- `--sable`   : #f8f2dd — panneau teinté jaune doux
- `--filet`   : rgba(19,19,18,0.12) — hairlines

## Typographie

- **Archivo variable** (wght 100-900, wdth 62-125 %), seule famille,
  auto-hébergée (88 Ko). Sentence case partout, plus de capitales criées.
- Wordmark géant « P.A.C. » : wdth 125 %, wght 800, ~19vw, coupé par le bas
  du hero (geste Kolibri).
- Statements : clamp(2.6rem, 6vw, 5rem), wght 700, tracking -0.02em.
- Kickers : 0.95rem gris, à gauche d'une grille asymétrique label/contenu.
- Corps : 1.0625rem / 1.65, 68ch max.

## Formes

- Panneaux : border-radius 28px, fonds --panneau / --sable / --jaune.
- Boutons et nav : pilules (radius 999px). Nav flottante blanche avec ombre
  très douce, logo pilule noire à gauche, téléphone pilule jaune.
- Images : arrondies 20px, toujours dans un panneau ou une grille.
- Filets hairline 1px pour listes (services, FAQ, horaires, footer).
- Une forme géante : engrenage jaune SVG coupé par le bord droit du hero,
  rotation très lente (90s), stoppée par prefers-reduced-motion.

## Motion (douce, jamais de layout)

- Chargement hero : wordmark qui monte (translateY), formes qui s'installent
  en fondu, choréographie < 1s, ease-out-quint.
- Scroll : fondu + translateY(24px) une seule fois (IntersectionObserver).
- Marquee jaune avec bouton pause (WCAG 2.2.2) et pause hors viewport.
- Tout gaté derrière la classe `.js` (progressive enhancement : sans JS,
  tout est visible).

## Imagerie (inchangée, recadrée aux ratios exacts)

hero-moteur 4:5 (comptoir), courroie 5:4 (occasion), vidange 5:4 (neuves),
atelier 3:2 (épaves), compteur 3:2 (prix), roue 3:2 (neuves), equipe 3:2
(contact pros). Alt rédigés.

## Interdits

- Capitales sur les corps de texte, chanfreins v1, bleu de France v1.
- Dégradé sur texte, side-stripes, glassmorphism, em dashes.
- Deuxième couleur d'accent : le jaune est seul.
