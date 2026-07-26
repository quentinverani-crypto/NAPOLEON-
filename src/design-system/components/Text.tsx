import type { ElementType, ReactNode } from "react";
import { cn } from "@/lib/utils";

/* =========================================================================
   TYPOGRAPHIE

   Une seule règle, et elle décide de tout :

     Georgia (`font-display`)  →  le nom, les titres, les grandes écritures
     Open Sans (`font-text`)   →  tous les contenus, sans exception

   « Grande écriture » ne veut pas dire « texte important » : un chiffre-clé
   de 48 px est en Georgia, un avertissement critique de 15 px est en
   Open Sans. C'est la TAILLE qui tranche, pas le poids éditorial.

   Charte § 13 : « un titre fort, un sous-titre discret, un corps lisible ».
   ========================================================================= */

/**
 * Les seules couleurs de texte du système, toutes tirées de la charte § 11.
 *
 * Ni le Doré Médical (1,9:1) ni le Muted (2,6:1) ni le Terracotta (3,1:1)
 * n'y figurent : sur fond clair, aucun des trois n'est lisible en texte. Ils
 * restent des couleurs de FILET et d'APLAT — ce que dit déjà la charte du
 * doré, « en touche seulement ».
 */
type Tone =
  | "default" /* Bleu Nuit — texte principal, 15,2:1 */
  | "soft" /* Ink Soft — texte courant, 7,4:1 */
  | "accent" /* Terracotta Deep — emphase éditoriale, 4,6:1 */
  | "blue" /* Bleu Napoléon — surtitres, liens, 4,5:1 */
  | "inverse"; /* sur fond sombre */

const TONES: Record<Tone, string> = {
  default: "text-nm-ink",
  soft: "text-nm-ink-soft",
  accent: "text-nm-terracotta-deep",
  blue: "text-nm-blue",
  inverse: "text-nm-paper",
};

type BaseProps = {
  children: ReactNode;
  className?: string;
  tone?: Tone;
  as?: ElementType;
};

/* ---------------------------------------------------------------------------
   AFFICHAGE — Georgia. Fluide, sans point de rupture.
   `xl` est réservé au premier écran : un seul par page.
   --------------------------------------------------------------------------- */
const DISPLAY = {
  xl: "text-display-xl",
  lg: "text-display-lg",
  md: "text-display-md",
  sm: "text-display-sm",
} as const;

export function Display({
  size = "lg",
  tone = "default",
  as: Tag = "h1",
  className,
  children,
}: BaseProps & { size?: keyof typeof DISPLAY }) {
  return (
    <Tag className={cn("font-display text-balance", DISPLAY[size], TONES[tone], className)}>
      {children}
    </Tag>
  );
}

/* ---------------------------------------------------------------------------
   TITRES — Georgia. Titres de section et de carte.
   --------------------------------------------------------------------------- */
const TITLE = {
  lg: "text-title-lg",
  md: "text-title-md",
  sm: "text-title-sm",
} as const;

export function Title({
  size = "md",
  tone = "default",
  as: Tag = "h2",
  className,
  children,
}: BaseProps & { size?: keyof typeof TITLE }) {
  return (
    <Tag className={cn("font-display text-pretty", TITLE[size], TONES[tone], className)}>
      {children}
    </Tag>
  );
}

/* ---------------------------------------------------------------------------
   SURTITRE — Open Sans capitales espacées, façon document officiel.
   Toujours accompagné d'un titre : seul, il ne dit rien.
   --------------------------------------------------------------------------- */
export function Eyebrow({
  tone = "accent",
  as: Tag = "p",
  className,
  children,
}: BaseProps) {
  return (
    <Tag className={cn("nm-eyebrow", TONES[tone], className)}>{children}</Tag>
  );
}

/* ---------------------------------------------------------------------------
   CHAPÔ — Open Sans. Le paragraphe qui suit un titre d'ouverture.
   --------------------------------------------------------------------------- */
export function Lead({ tone = "soft", as: Tag = "p", className, children }: BaseProps) {
  return (
    <Tag className={cn("font-text text-lead text-pretty", TONES[tone], className)}>
      {children}
    </Tag>
  );
}

/* ---------------------------------------------------------------------------
   CORPS — Open Sans. Le régime par défaut de toute l'interface.
   --------------------------------------------------------------------------- */
const BODY = {
  lg: "text-body-lg",
  md: "text-body",
  sm: "text-body-sm",
} as const;

export function Body({
  size = "md",
  tone = "soft",
  as: Tag = "p",
  className,
  children,
}: BaseProps & { size?: keyof typeof BODY }) {
  return (
    <Tag className={cn("font-text", BODY[size], TONES[tone], className)}>{children}</Tag>
  );
}

/* ---------------------------------------------------------------------------
   LÉGENDE — Open Sans. Mentions, horodatages, aides de saisie.
   --------------------------------------------------------------------------- */
export function Caption({ tone = "soft", as: Tag = "p", className, children }: BaseProps) {
  return (
    <Tag className={cn("font-text text-caption", TONES[tone], className)}>{children}</Tag>
  );
}

/* ---------------------------------------------------------------------------
   CITATION — Georgia italique. Réservée aux verbatims de praticiens et aux
   trois valeurs fondatrices (charte § 04).
   --------------------------------------------------------------------------- */
export function Quote({
  attribution,
  tone = "default",
  className,
  children,
}: BaseProps & { attribution?: ReactNode }) {
  return (
    <figure className={cn("border-nm-gold/60 border-l-2 pl-5", className)}>
      <blockquote
        className={cn("font-display text-title-md text-pretty italic", TONES[tone])}
      >
        {children}
      </blockquote>
      {attribution && (
        <figcaption className="nm-eyebrow text-nm-ink-soft mt-3">
          {attribution}
        </figcaption>
      )}
    </figure>
  );
}

/* ---------------------------------------------------------------------------
   NOMBRE — Georgia, chiffres tabulaires. Statistiques, chiffres-clés.
   L'alignement tabulaire évite le tremblement des colonnes qui se mettent
   à jour en direct.
   --------------------------------------------------------------------------- */
export function Numeral({
  tone = "default",
  as: Tag = "span",
  className,
  children,
}: BaseProps) {
  return (
    <Tag
      className={cn("font-display nm-nums text-display-sm", TONES[tone], className)}
    >
      {children}
    </Tag>
  );
}
