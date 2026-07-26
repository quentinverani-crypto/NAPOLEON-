import type { HTMLAttributes } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

/* =========================================================================
   BADGES & ÉTIQUETTES

   Les états n'existent pas dans la charte — un logiciel médical, si. Ils
   sont donc dérivés de la palette officielle et vérifiés en contraste :
   le rouge pur reste proscrit, le terracotta porte l'alerte.

   Un badge ne doit JAMAIS être le seul porteur d'une information critique :
   ni la couleur ni la forme ne se voient sous daltonisme ou en monochrome.
   Toujours doubler par le texte — c'est ce que font les libellés ci-dessous.
   ========================================================================= */

const badge = cva(
  "font-text inline-flex items-center gap-1.5 whitespace-nowrap [&_svg]:size-3.5 [&_svg]:shrink-0",
  {
    variants: {
      tone: {
        neutral: "bg-nm-ivory text-nm-ink-soft border-nm-border",
        blue: "bg-nm-blue/10 text-nm-blue-ink border-nm-blue/25",
        gold: "bg-nm-gold/14 text-nm-gold-ink border-nm-gold/40",
        success: "bg-nm-success/10 text-nm-success border-nm-success/25",
        warning: "bg-nm-warning/10 text-nm-warning border-nm-warning/25",
        danger: "bg-nm-danger/10 text-nm-danger border-nm-danger/25",
        ink: "bg-nm-ink text-nm-ivory border-transparent",
        /* Sur fond encre uniquement : le doré plein atteint 8:1 sur #1A2540,
           là où `gold` (text-nm-gold-ink) y devient illisible. */
        "gold-inverse": "bg-nm-gold/10 text-nm-gold border-nm-gold/45",
        "paper-inverse": "bg-nm-paper/8 text-nm-ivory border-nm-paper/25",
      },
      variant: {
        soft: "border",
        outline: "border bg-transparent",
        solid: "border-transparent",
      },
      size: {
        sm: "rounded-nm-pill px-2 py-0.5 text-[0.6875rem] font-semibold",
        md: "rounded-nm-pill px-2.5 py-1 text-caption font-semibold",
      },
    },
    defaultVariants: { tone: "neutral", variant: "soft", size: "md" },
  },
);

export type BadgeProps = VariantProps<typeof badge> & HTMLAttributes<HTMLSpanElement>;

export function Badge({ tone, variant, size, className, ...props }: BadgeProps) {
  return <span className={cn(badge({ tone, variant, size }), className)} {...props} />;
}

/**
 * Numérotation de chapitre — « N° 01 », « N° 02 »… La charte numérote ses
 * propres sections ainsi ; le procédé structure les pages longues et
 * appartient à la voix de la marque.
 */
export function SectionNumber({
  value,
  className,
  ...props
}: { value: number | string } & HTMLAttributes<HTMLSpanElement>) {
  return (
    <span
      className={cn(
        "font-display nm-nums text-nm-gold-ink inline-flex items-baseline gap-1 text-caption tracking-[0.18em] uppercase",
        className,
      )}
      {...props}
    >
      <span aria-hidden="true">N°</span>
      <span className="text-title-sm tracking-normal">
        {typeof value === "number" ? String(value).padStart(2, "0") : value}
      </span>
    </span>
  );
}
