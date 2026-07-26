# Emblème NAPOLEON Médical — exports vectoriels

Générés depuis `src/design-system/brand/emblem-geometry.ts`. Repère de
1000 × 1000 ; le bord extérieur du filet affleure exactement le `viewBox`,
l'emblème se pose donc sans marge dans un carré.

Dans l'application, préférer toujours le composant `<Emblem />` : il gère les
variantes, le liseré de réserve et l'accessibilité. Ces fichiers sont là pour
tout ce qui vit hors du code — slides, PDF, signatures e-mail, imprimeur.

| Fichier | Usage |
|---|---|
| `embleme-encre.svg` | défaut, sur fond blanc |
| `embleme-bleu.svg` | Bleu Napoléon sur fond blanc |
| `embleme-or.svg` | supports prestige, fond blanc |
| `embleme-mono.svg` | impression monochrome, gravure, tampon |
| `embleme-or-sur-encre.svg` | protocolaire — charte § 07 |
| `embleme-creme-sur-encre.svg` | fonds sombres |
| `embleme-negatif-sur-bleu.svg` | blanc sur Bleu Napoléon |
| `embleme-encre-sur-ivoire.svg` | fond chaud |

Le liseré de réserve est cuit dans chaque fichier : un export ne peut donc PAS
être reposé sur un fond d'une autre couleur que celle de son nom. Pour une
couleur non listée, ajouter une variante plutôt que détourner un fichier.
