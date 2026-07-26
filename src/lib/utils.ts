import { clsx, type ClassValue } from "clsx"
import { extendTailwindMerge } from "tailwind-merge"

/**
 * tailwind-merge ne connaît que l'échelle typographique par défaut de
 * Tailwind. Le design system NAPOLEON en ajoute une (`text-display-lg`,
 * `text-title-md`, `text-body-sm`…) : sans la déclaration ci-dessous,
 * tailwind-merge prend ces classes pour des couleurs et les SUPPRIME
 * silencieusement dès qu'un `text-<couleur>` les suit — le texte retombe
 * alors à 16 px sans la moindre erreur.
 *
 * Ajout strictement additif : les groupes par défaut sont conservés, on ne
 * fait qu'y verser les nouvelles tailles.
 */
const twMerge = extendTailwindMerge({
  extend: {
    classGroups: {
      "font-size": [
        {
          text: [
            "display-xl",
            "display-lg",
            "display-md",
            "display-sm",
            "title-lg",
            "title-md",
            "title-sm",
            "lead",
            "body-lg",
            "body",
            "body-sm",
            "caption",
            "eyebrow",
          ],
        },
      ],
      "font-family": [{ font: ["display", "text"] }],
    },
  },
})

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
