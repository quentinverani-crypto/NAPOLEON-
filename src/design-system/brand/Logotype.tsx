import { cn } from "@/lib/utils";
import { Emblem, type EmblemVariant } from "./Emblem";

/**
 * Deux verrouillages, et deux seulement.
 *
 *  primary    emblème + nom, à l'horizontale — la signature de référence.
 *             En-têtes, supports commerciaux, signatures e-mail, documents.
 *  secondary  emblème au-dessus du nom — formats étroits, carrés, avatars
 *             larges, tout ce qui n'a pas la place d'une ligne.
 *
 * Pour l'emblème seul (favicon, application mobile, format restreint),
 * utiliser `<Emblem />`.
 */
export type LogotypeVariant = "primary" | "secondary";

/**
 * La signature de marque. Elle ne fait PAS partie du logotype : elle
 * s'écrit dans la mise en page, jamais dans le verrouillage.
 */
export const BASELINE = "La voix médicale souveraine";

export type LogotypeTone = "ink" | "gold-on-ink" | "mono" | "negative";

const TONES: Record<LogotypeTone, { emblem: EmblemVariant; name: string; suffix: string }> = {
  /* Usage par défaut : le bleu du logotype sur fond clair. */
  ink: {
    emblem: "slate",
    name: "text-nm-slate",
    suffix: "text-nm-gold",
  },
  /* Protocolaire — charte § 07, or sur encre. */
  "gold-on-ink": {
    emblem: "gold-on-ink",
    name: "text-nm-ivory",
    suffix: "text-nm-gold",
  },
  /* Impression monochrome, gravure, fax. */
  mono: {
    emblem: "mono",
    name: "text-nm-black",
    suffix: "text-nm-black",
  },
  /* Blanc sur fond coloré ou photographique. Passer `field` pour que le
     liseré de réserve prenne la couleur exacte du support. */
  negative: {
    emblem: "negative",
    name: "text-nm-paper",
    suffix: "text-nm-paper",
  },
};

/**
 * Le nom est en `whitespace-nowrap` — « NAPOLEON Médical » ne se coupe jamais.
 * Chaque taille descend donc d'un cran sous 640 px, sinon les grands
 * verrouillages débordent de l'écran plutôt que de se replier.
 *
 * `px` fixe la taille intrinsèque de l'emblème (avant CSS) ; `emblem` la
 * reprend en classes, où le point de rupture peut s'appliquer.
 */
const SIZES = {
  sm: {
    px: 28,
    emblem: "size-6 sm:size-7",
    name: "text-[0.9375rem] sm:text-[1.0625rem]",
    gap: "gap-2 sm:gap-2.5",
    stack: "gap-2 sm:gap-2.5",
  },
  md: {
    px: 40,
    emblem: "size-8 sm:size-10",
    name: "text-[1.25rem] sm:text-[1.5rem]",
    gap: "gap-2.5 sm:gap-3",
    stack: "gap-2.5 sm:gap-3",
  },
  lg: {
    px: 56,
    emblem: "size-11 sm:size-14",
    name: "text-[1.625rem] sm:text-[2.125rem]",
    gap: "gap-3 sm:gap-4",
    stack: "gap-3 sm:gap-4",
  },
  xl: {
    px: 80,
    emblem: "size-14 sm:size-20",
    name: "text-[2rem] sm:text-[3rem]",
    gap: "gap-3.5 sm:gap-5",
    stack: "gap-4 sm:gap-5",
  },
} as const;

export type LogotypeProps = {
  variant?: LogotypeVariant;
  tone?: LogotypeTone;
  size?: keyof typeof SIZES;
  /**
   * Couleur du support. Indispensable avec `tone="negative"` : le liseré de
   * réserve de l'emblème doit valoir exactement la couleur du fond.
   */
  field?: string;
  /** Balise à utiliser. `span` par défaut : un logo n'est pas un titre. */
  as?: "span" | "div" | "h1";
  className?: string;
};

/**
 * Le nom. « NAPOLEON » en capitales, « Médical » en Doré Médical, les deux
 * en Georgia.
 *
 * Le contraste du doré sur fond clair est de 1,9:1 — insuffisant pour du
 * texte, mais les logotypes sont explicitement exemptés du critère WCAG
 * 1.4.3. Ce couple de couleurs est donc réservé AU LOGOTYPE : « Médical »
 * dans une phrase s'écrit comme le reste de la phrase.
 */
function Wordmark({
  tone,
  sizeClass,
}: {
  tone: (typeof TONES)[LogotypeTone];
  sizeClass: string;
}) {
  return (
    <span className={cn("font-display leading-none whitespace-nowrap", sizeClass)}>
      <span className={cn("tracking-[0.015em]", tone.name)}>NAPOLEON</span>
      <span aria-hidden="true">&nbsp;</span>
      <span className={tone.suffix}>Médical</span>
    </span>
  );
}

/**
 * Le logotype NAPOLEON Médical.
 *
 * La zone de protection (charte § 10 : ½ × le diamètre du cercle tout autour)
 * n'est PAS réservée par le composant — elle dépend de la mise en page.
 * L'utilitaire `nm-logo-clearspace` de tokens.css la matérialise au besoin.
 */
export function Logotype({
  variant = "primary",
  tone = "ink",
  size = "md",
  field,
  as: Tag = "span",
  className,
}: LogotypeProps) {
  const t = TONES[tone];
  const s = SIZES[size];

  /* Le nom est déjà écrit à côté : l'emblème devient décoratif pour les
     lecteurs d'écran, sinon la marque est annoncée deux fois. */
  const emblem = (
    <Emblem
      variant={t.emblem}
      field={field}
      size={s.px}
      title={null}
      className={cn("shrink-0", s.emblem)}
    />
  );

  if (variant === "secondary") {
    return (
      <Tag className={cn("inline-flex flex-col items-center text-center", s.stack, className)}>
        {emblem}
        <Wordmark tone={t} sizeClass={s.name} />
      </Tag>
    );
  }

  return (
    <Tag className={cn("inline-flex items-center", s.gap, className)}>
      {emblem}
      <Wordmark tone={t} sizeClass={s.name} />
    </Tag>
  );
}
