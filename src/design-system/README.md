# NAPOLEON Médical — Design System 2026

La charte graphique (Volume I) fixe l'identité. Ce dossier fixe **l'interface** :
les jetons, le logotype vectoriel, la typographie et les composants.

**Référence vivante :** [`/design-system`](../app/design-system/page.tsx) — tout ce
qui suit y est rendu, mesuré et vérifiable dans un navigateur.

---

## La règle qui décide de tout

> **Georgia** porte le nom et les grandes écritures.
> **Open Sans** porte les contenus.

« Grande écriture » ne veut pas dire « texte important » : un chiffre-clé de
48 px est en Georgia, un avertissement critique de 15 px est en Open Sans.
C'est la **taille** qui tranche, jamais le poids éditorial.

Georgia est absente d'Android et de la plupart des Linux. **Gelasio** — substitut
libre aux métriques identiques — prend le relais sans le moindre décalage de
mise en page. L'ordre de la pile est, et doit rester :

```
Georgia → Gelasio → Times New Roman → serif
```

Il est défini une seule fois, dans `tokens.css` (`--font-display`).

---

## Mise en service

Déjà faite. Pour mémoire, elle tient en deux points :

1. `src/app/globals.css` importe `../design-system/tokens.css`
2. `src/app/layout.tsx` pose `designSystemFontVariables` sur `<html>`

Ensuite, tout s'importe depuis le point d'entrée unique :

```tsx
import { Button, Display, Emblem, Logotype } from "@/design-system";
```

Ne jamais importer un fichier interne (`@/design-system/components/Button`) :
le barrel est le contrat, le reste est réarrangeable.

---

## Additif par construction

Ce système **ne touche à rien** de ce qui existe :

| Espace de noms | Portée | État |
|---|---|---|
| `nm-*`, `font-display`, `font-text` | design system | ce dossier |
| `nap-*`, `font-news`, `font-body` | site `/vitrine` | inchangé |
| `napoleon-*`, `font-sans`, `font-serif` | site racine `/` | inchangé |

Un seul fichier partagé a été modifié : `src/lib/utils.ts`.

`tailwind-merge` ne connaît que l'échelle typographique par défaut de Tailwind.
Sans déclaration explicite, il prend `text-display-lg` pour une **couleur** et la
supprime dès qu'un `text-<couleur>` la suit — le texte retombe à 16 px, sans
erreur, sans avertissement. `cn()` déclare donc les nouveaux groupes. L'ajout
est strictement additif : les groupes par défaut sont conservés.

---

## Jetons

`tokens.css` est la **source de vérité** — c'est lui que consomme Tailwind.
`tokens.ts` en est le miroir TypeScript : il sert à documenter et à alimenter la
page `/design-system`. **Toute modification doit être portée dans les deux.**

### Couleurs

**Quinze valeurs, pas une de plus.** Quatorze viennent de la charte (§ 11 et
§ 08) ; la quinzième est le Bleu Ardoise `#253846` du logotype.

Une interface a besoin de nuances que ces quinze valeurs ne couvrent pas —
filets, survols, fonds d'encarts. Elles s'obtiennent **exclusivement par
opacité** sur une couleur de la palette : `border-nm-ink-soft/45`,
`bg-nm-gold/12`. Une opacité n'introduit aucune teinte nouvelle ; un nouveau
code hexadécimal, si. **Ne jamais en ajouter un.**

Le contraste mesuré décide de l'usage, et il écarte trois couleurs du texte :

| Couleur | Sur blanc | Ce qu'elle peut faire |
|---|---|---|
| Doré Médical `#DFB670` | 1,90:1 | filets, aplats, jamais du texte |
| Terracotta `#D77962` | 3,09:1 | grands corps uniquement |
| Muted `#9AA0AB` | 2,63:1 | décoratif uniquement |

Ce n'est pas une contrainte importée : la charte dit déjà du doré qu'il ne
s'emploie « qu'en touche ». Le seul texte doré autorisé est « Médical » dans le
logotype — les logotypes sont exemptés du critère WCAG 1.4.3.

**Les états** n'existent pas dans la charte. Ils sont donc composés avec elle,
sans y ajouter :

| État | Couleur | Note |
|---|---|---|
| Information | `nm-blue` | 4,54:1 |
| Validation | `nm-deep` | 11,20:1 — bleu et non vert, il n'y a pas de vert dans la charte |
| Vigilance | `nm-gold` | en filet et en fond ; le texte reste en Bleu Nuit |
| Alerte | `nm-terracotta-deep` | 4,58:1 — pas de rouge, la charte tient la chaleur par le terracotta |

Aucun état ne repose sur la seule couleur : le libellé porte toujours
l'information.

### Typographie, rayons, élévation, mouvement

Voir `/design-system` § 3 et § 5. Deux points valent d'être retenus :

- Les quatre tailles d'affichage sont **fluides** (`clamp`) : elles se règlent
  seules entre mobile et grand écran, sans point de rupture.
- Les ombres sont teintées à l'encre, jamais au noir — une ombre grise salit une
  palette bleue. Et **aucune ombre ne s'applique jamais au logotype** (§ 10).

---

## Le logotype

`<Emblem />` dessine l'emblème seul, `<Logotype />` les verrouillages.

**Deux verrouillages, et deux seulement :**

| Variante | Composition | Usage |
|---|---|---|
| `primary` | emblème + nom, à l'horizontale | la signature de référence |
| `secondary` | emblème au-dessus du nom | formats étroits, carrés |

**La signature « La voix médicale souveraine » ne fait pas partie du
logotype.** Elle se compose dans la page, à distance du verrouillage. La
constante `BASELINE` l'exporte pour éviter les variantes de saisie.

L'emblème est **vectoriel** : reconstruit sur la grille de tracé de la charte
§ 09, il est net du favicon 16 px à la signalétique. Sa géométrie est nommée et
commentée dans `brand/emblem-geometry.ts`.

### Le liseré de réserve

La pièce la plus fragile du dessin. C'est la réserve blanche qui détache la tête
et la diagonale de tout ce qu'elles recouvrent — sans elle, l'emblème se referme
en une tache.

Elle vaut donc **toujours la couleur exacte du support**. Sur blanc et sur encre
c'est automatique. Partout ailleurs :

```tsx
<Emblem variant="negative" field="#5478A8" />      // par prop
<div style={{ "--nm-field": "#5478A8" }}>…</div>   // ou par variable CSS
```

### Seuil de lisibilité

Sous **24 px**, le liseré devient sous-pixellique. Utiliser `variant="mono"`.

### Interdits — charte § 10

Ne jamais recolorer hors charte, rogner, déformer, pivoter, ni ajouter d'ombre,
de relief ou de contour. Zone de protection : ½ × le diamètre du cercle tout
autour, qu'aucun élément ne pénètre.

---

## Écarts entre la charte et le tracé

Trois points où le document écrit et la marque réelle ne disent pas la même
chose. **Le système suit le tracé** ; c'est à la marque de trancher si elle veut
l'inverse.

| Point | La charte dit | Le tracé mesure | Retenu |
|---|---|---|---|
| Diagonale | 70° (§ 09) | 66,16° | le tracé |
| Piliers | rayon = ⅛ Ø (§ 09) | largeur = 0,111 × Ø | le tracé |
| Typographie | Newsreader + Manrope (§ 12-13) | — | Georgia + Open Sans |

**Un quatrième point, non documenté.** La diagonale n'est pas un trait unique :
ce sont **deux traits parallèles décalés**, interrompus par la tête, de sorte
que le regard lit un seul geste que le volume de l'emblème déplace. Le décalage
est reproduit tel quel, mais rien dans la charte ne le mentionne. À inscrire au
§ 09 s'il est intentionnel.

---

## Reconstruction de l'emblème

Les tracés de `emblem-geometry.ts` proviennent d'une vectorisation de
`public/logos/napoleon-emblem-v2-navy.png` :

1. cercle ajusté par moindres carrés sur le bord extérieur du filet ;
2. piliers, diagonales et yeux mesurés par composantes connexes ;
3. contour de la tête isolé, squelettisé (Zhang-Suen), élagué, puis lissé en
   courbes de Bézier ;
4. tout ramené dans un repère de 1000 unités, le bord extérieur du filet
   affleurant exactement le `viewBox`.

Les GRAISSES (filet du cercle 38, contour de tête 18, liseré 60) ont ensuite
été relevées à l'œil, d'après la version modifiée du logotype fournie par la
marque. **Elles sont approximatives** : l'image n'était disponible que collée
en conversation, jamais en fichier, donc impossible à mesurer. Elles sont
regroupées en tête de `emblem-geometry.ts` pour être réglées d'une ligne dès
que le fichier source est déposé dans le dépôt.

Recouvrement vérifié avec la version antérieure : **IoU 0,80** — élevé pour une marque
filaire, où la mesure est très sensible au sous-pixel.

Les écarts d'asymétrie du tracé d'origine (< 1 %) ont été symétrisés
horizontalement ; les positions verticales suivent la mesure.

---

## Ce qui manque encore

- Aucun **thème sombre** : la palette a de quoi le porter (`nm-ink`,
  `nm-slate`, `nm-ivory`) mais aucun jeu de jetons inversé n'est défini.
- **Navigation, onglets, modales, menus, info-bulles** ne sont pas couverts.
- Les sites `/` et `/vitrine` n'ont pas été migrés — c'est un chantier distinct,
  volontairement hors périmètre.
