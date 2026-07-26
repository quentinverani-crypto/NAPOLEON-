import type { SVGProps } from "react";
import { EMBLEM as E } from "./emblem-geometry";

/**
 * Les variantes normées de l'emblème — charte § 08 « Variantes couleur ».
 * Toute autre combinaison est proscrite (§ 10 : « Changer les couleurs »).
 */
export type EmblemVariant =
  | "ink" /* encre sur clair — usage par défaut */
  | "blue" /* bleu Napoléon sur clair */
  | "gold" /* or sur clair — supports prestige */
  | "gold-on-ink" /* or sur encre — protocolaire, § 07 */
  | "cream-on-ink" /* crème sur encre — fonds sombres */
  | "negative" /* blanc sur fond coloré */
  | "mono" /* noir pur — impression monochrome, gravure */
  | "current"; /* hérite de `currentColor` */

const PALETTE = {
  ink: "#1a2540",
  blue: "#5478a8",
  gold: "#dfb670",
  paper: "#ffffff",
  ivory: "#f3f1ec",
  black: "#151616",
} as const;

/**
 * `mark` trace le dessin, `field` remplit le fond ET le liseré de réserve.
 * Le liseré n'est pas décoratif : c'est lui qui détache la tête des piliers.
 * Il DOIT valoir la couleur du support, sinon l'emblème se referme sur
 * lui-même dans les petites tailles.
 */
const VARIANTS: Record<EmblemVariant, { mark: string; field: string }> = {
  ink: { mark: PALETTE.ink, field: PALETTE.paper },
  blue: { mark: PALETTE.blue, field: PALETTE.paper },
  gold: { mark: PALETTE.gold, field: PALETTE.paper },
  "gold-on-ink": { mark: PALETTE.gold, field: PALETTE.ink },
  "cream-on-ink": { mark: PALETTE.ivory, field: PALETTE.ink },
  /* `negative` et `current` n'ont pas de fond connu : leur réserve retombe
     sur la variable CSS `--nm-field`, à poser sur n'importe quel ancêtre.
     Le repli est l'encre — jamais `transparent`, qui ferait fusionner le
     contour de la tête avec les piliers en une tache muette. */
  negative: { mark: PALETTE.paper, field: "var(--nm-field, #1a2540)" },
  mono: { mark: PALETTE.black, field: PALETTE.paper },
  current: { mark: "currentColor", field: "var(--nm-field, #ffffff)" },
};

type EmblemBase = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Côté du carré, en pixels. */
  size?: number | string;
  /**
   * Peint le disque intérieur avec la couleur de réserve. À activer dès que
   * l'emblème est posé sur une photo, un dégradé ou un aplat contrasté —
   * charte § 10, « Fond non contrasté ».
   */
  filled?: boolean;
  /**
   * Texte alternatif. `null` marque l'emblème comme purement décoratif —
   * à faire chaque fois que le nom de la marque est déjà écrit à côté.
   */
  title?: string | null;
};

export type EmblemProps = EmblemBase & {
  variant?: EmblemVariant;
  /**
   * Couleur du support, reprise par le liseré de réserve.
   *
   * À renseigner dès que le fond n'est ni blanc ni encre — et TOUJOURS avec
   * `negative` ou `current`, dont le fond est par définition inconnu. Le
   * liseré est ce qui détache la tête des piliers : mal réglé, l'emblème se
   * referme en une tache. À défaut de cette prop, la variable CSS `--nm-field`
   * posée sur un ancêtre fait le même travail.
   */
  field?: string;
};

/**
 * L'emblème souverain : un cercle, trois piliers, une diagonale, une tête de
 * serpent. Rendu vectoriel — net à toute taille, du favicon 16 px à la
 * signalétique.
 *
 * En dessous de 24 px, préférer `variant="mono"` : le liseré de réserve
 * devient sous-pixellique et le dessin se referme.
 */
export function Emblem({
  variant = "ink",
  size = 40,
  filled = false,
  field,
  title = "NAPOLEON Médical",
  ...props
}: EmblemProps) {
  const v = VARIANTS[variant];
  const reserve = field ?? v.field;
  const { r, stroke } = E.circle;
  const { width: pw, cap, offset, side, centre } = E.pillar;
  const half = pw / 2;

  const pillar = (cx: number, y0: number, y1: number, key: string) => (
    <rect
      key={key}
      x={cx - half}
      y={y0}
      width={pw}
      height={y1 - y0}
      rx={cap}
      fill={v.mark}
    />
  );

  /* Chaque trait de la diagonale est posé deux fois : la réserve d'abord,
     le trait ensuite. C'est ce qui creuse la saignée blanche dans les
     piliers qu'il traverse. */
  const sabre = (s: { x1: number; y1: number; x2: number; y2: number }, key: string) => {
    const d = `M${s.x1} ${s.y1}L${s.x2} ${s.y2}`;
    return (
      <g key={key} fill="none">
        <path d={d} stroke={reserve} strokeWidth={E.keyline} strokeLinecap="butt" />
        <path d={d} stroke={v.mark} strokeWidth={E.sabre.stroke} strokeLinecap="round" />
      </g>
    );
  };

  return (
    <svg
      viewBox={`0 0 ${E.view} ${E.view}`}
      width={size}
      height={size}
      role={title ? "img" : "presentation"}
      aria-label={title ?? undefined}
      aria-hidden={title ? undefined : true}
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      {(filled || variant === "gold-on-ink" || variant === "cream-on-ink") && (
        <circle cx={500} cy={500} r={r + stroke / 2} fill={reserve} />
      )}

      <circle cx={500} cy={500} r={r} fill="none" stroke={v.mark} strokeWidth={stroke} />

      {pillar(500 - offset, side.y0, side.y1, "left")}
      {pillar(500, centre.y0, centre.y1, "centre")}
      {pillar(500 + offset, side.y0, side.y1, "right")}

      {sabre(E.sabre.a, "sabre-a")}
      {sabre(E.sabre.b, "sabre-b")}

      {/* La tête : réserve élargie d'abord, contour ensuite. */}
      <path
        d={E.path.head}
        fill={reserve}
        stroke={reserve}
        strokeWidth={E.keyline}
        strokeLinejoin="round"
        strokeLinecap="round"
      />
      <path
        d={E.path.head}
        fill="none"
        stroke={v.mark}
        strokeWidth={E.headStroke}
        strokeLinejoin="round"
        strokeLinecap="round"
      />

      {/* Le pilier central réapparaît dans la gueule ouverte. */}
      <rect
        x={500 - half}
        y={E.mouthY}
        width={pw}
        height={centre.y1 - E.mouthY}
        rx={cap}
        fill={v.mark}
      />
      {sabre(E.sabre.b, "sabre-b-over")}

      <path d={E.path.eyeLeft} fill={v.mark} />
      <path d={E.path.eyeRight} fill={v.mark} />
      <path d={E.path.pupilLeft} fill={reserve} />
      <path d={E.path.pupilRight} fill={reserve} />
    </svg>
  );
}
