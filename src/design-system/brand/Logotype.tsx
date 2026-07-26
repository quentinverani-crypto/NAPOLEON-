import { cn } from "@/lib/utils";
import { Emblem, type EmblemVariant } from "./Emblem";

/**
 * Les trois verrouillages normés — charte § 06 « Logotype principal ».
 *
 *  primary   emblème + nom + baseline — première apparition de la marque,
 *            supports institutionnels, documents officiels
 *  secondary emblème + nom — usage courant : commercial, e-mails, slides
 *  stacked   emblème au-dessus du nom — formats étroits, carrés
 *  wordmark  nom seul — quand l'emblème figure déjà ailleurs sur la page
 *
 * Pour l'emblème seul (avatar, favicon, app mobile), utiliser `<Emblem />`.
 */
export type LogotypeVariant = "primary" | "secondary" | "stacked" | "wordmark";

export type LogotypeTone = "ink" | "gold-on-ink" | "mono" | "negative";

const TONES: Record<
  LogotypeTone,
  { emblem: EmblemVariant; name: string; suffix: string; baseline: string }
> = {
  /* Usage par défaut : encre sur clair. */
  ink: {
    emblem: "ink",
    name: "text-nm-ink",
    suffix: "text-nm-gold",
    baseline: "text-nm-muted-strong",
  },
  /* Protocolaire — charte § 07, or sur encre. */
  "gold-on-ink": {
    emblem: "gold-on-ink",
    name: "text-nm-ivory",
    suffix: "text-nm-gold",
    baseline: "text-nm-gold/70",
  },
  /* Impression monochrome, gravure, fax. */
  mono: {
    emblem: "mono",
    name: "text-nm-black",
    suffix: "text-nm-black",
    baseline: "text-nm-black/60",
  },
  /* Blanc sur fond coloré ou photographique. Le liseré prend la couleur
     passée en `field` sur <Logotype>, faute de quoi il vaut l'encre. */
  negative: {
    emblem: "negative",
    name: "text-nm-paper",
    suffix: "text-nm-paper",
    baseline: "text-nm-paper/70",
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
    baseline: "text-[0.5625rem] sm:text-[0.625rem]",
  },
  md: {
    px: 40,
    emblem: "size-8 sm:size-10",
    name: "text-[1.25rem] sm:text-[1.5rem]",
    gap: "gap-2.5 sm:gap-3",
    baseline: "text-[0.625rem] sm:text-[0.6875rem]",
  },
  lg: {
    px: 56,
    emblem: "size-11 sm:size-14",
    name: "text-[1.625rem] sm:text-[2.125rem]",
    gap: "gap-3 sm:gap-4",
    baseline: "text-[0.6875rem] sm:text-[0.75rem]",
  },
  xl: {
    px: 80,
    emblem: "size-14 sm:size-20",
    name: "text-[2rem] sm:text-[3rem]",
    gap: "gap-3.5 sm:gap-5",
    baseline: "text-[0.75rem] sm:text-[0.8125rem]",
  },
} as const;

export type LogotypeProps = {
  variant?: LogotypeVariant;
  tone?: LogotypeTone;
  size?: keyof typeof SIZES;
  /**
   * Couleur du support. Obligatoire en pratique avec `tone="negative"` : le
   * liseré de réserve de l'emblème doit valoir exactement la couleur du fond.
   */
  field?: string;
  /** Balise de titre à utiliser. `span` par défaut : un logo n'est pas un titre. */
  as?: "span" | "div" | "h1";
  className?: string;
};

/**
 * Le nom. « NAPOLEON » en capitales encre, « Médical » en Doré Médical, les
 * deux en Georgia.
 *
 * Le contraste du doré sur fond clair est de 1,9:1 — insuffisant pour du
 * texte courant, mais les logotypes sont explicitement exemptés du critère
 * WCAG 1.4.3. Ce couple de couleurs est donc réservé AU LOGOTYPE. Pour
 * écrire « Médical » dans un texte, utiliser `text-nm-gold-ink` (5,9:1).
 */
function Wordmark({
  tone,
  sizeClass,
  className,
}: {
  tone: (typeof TONES)[LogotypeTone];
  sizeClass: string;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "font-display leading-none whitespace-nowrap",
        sizeClass,
        className,
      )}
    >
      <span className={cn("tracking-[0.015em]", tone.name)}>NAPOLEON</span>
      <span aria-hidden="true">&nbsp;</span>
      <span className={tone.suffix}>Médical</span>
    </span>
  );
}

function Baseline({
  tone,
  sizeClass,
}: {
  tone: (typeof TONES)[LogotypeTone];
  sizeClass: string;
}) {
  return (
    <span className={cn("nm-eyebrow block", sizeClass, tone.baseline)}>
      La voix médicale souveraine
    </span>
  );
}

/**
 * Le logotype NAPOLEON Médical.
 *
 * La zone de protection (charte § 10 : ½ × le diamètre du cercle tout autour)
 * n'est PAS réservée par le composant — elle dépend de la mise en page.
 * L'utilitaire `nm-logo-clearspace` de tokens.css la matérialise en
 * développement si besoin.
 */
export function Logotype({
  variant = "secondary",
  tone = "ink",
  size = "md",
  field,
  as: Tag = "span",
  className,
}: LogotypeProps) {
  const t = TONES[tone];
  const s = SIZES[size];

  /* Le nom est déjà écrit : l'emblème devient décoratif pour les lecteurs
     d'écran, sinon la marque est annoncée deux fois. */
  const emblem = (
    <Emblem
      variant={t.emblem}
      field={field}
      size={s.px}
      title={null}
      className={cn("shrink-0", s.emblem)}
    />
  );

  if (variant === "wordmark") {
    return (
      <Tag className={cn("inline-flex", className)}>
        <Wordmark tone={t} sizeClass={s.name} />
      </Tag>
    );
  }

  if (variant === "stacked") {
    return (
      <Tag className={cn("inline-flex flex-col items-center gap-3 text-center", className)}>
        {emblem}
        <Wordmark tone={t} sizeClass={s.name} />
        <Baseline tone={t} sizeClass={s.baseline} />
      </Tag>
    );
  }

  return (
    <Tag className={cn("inline-flex items-center", s.gap, className)}>
      {emblem}
      <span className="inline-flex flex-col justify-center gap-1.5">
        <Wordmark tone={t} sizeClass={s.name} />
        {variant === "primary" && <Baseline tone={t} sizeClass={s.baseline} />}
      </span>
    </Tag>
  );
}
