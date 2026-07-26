import type { HTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/utils";

/* =========================================================================
   SÉPARATEURS

   Charte § 13, « Or rare » : l'or ne s'emploie qu'en touche. Un seul filet
   doré par écran — au-delà, il cesse d'être un accent et devient un motif.
   ========================================================================= */

export function Divider({
  className,
  ...props
}: HTMLAttributes<HTMLHRElement>) {
  return <hr className={cn("border-nm-border border-t", className)} {...props} />;
}

/** Filet doré dégradé — l'accent de prestige. Un seul par écran. */
export function GoldRule({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return <div role="separator" className={cn("nm-hairline-gold", className)} {...props} />;
}

/**
 * Séparateur avec libellé au centre — « — Mission & vision — », comme les
 * pieds de page de la charte.
 */
export function LabelledDivider({
  children,
  className,
  ...props
}: { children: ReactNode } & HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn("flex items-center gap-4", className)} {...props}>
      <span className="nm-hairline-gold flex-1" aria-hidden="true" />
      <span className="nm-eyebrow text-nm-ink-soft shrink-0">{children}</span>
      <span className="nm-hairline-gold flex-1" aria-hidden="true" />
    </div>
  );
}

/**
 * Le filet impérial : un trait doré incliné sur l'angle de la diagonale de
 * l'emblème (66,16°). C'est la signature graphique du système — il ne dit
 * rien, il signe. Purement décoratif, donc masqué aux lecteurs d'écran, et
 * positionné par le conteneur parent (`relative`).
 */
export function ImperialRule({
  height = "70%",
  className,
  style,
  ...props
}: { height?: string } & HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      aria-hidden="true"
      className={cn("nm-rule-imperial", className)}
      style={{ height, ...style }}
      {...props}
    />
  );
}
