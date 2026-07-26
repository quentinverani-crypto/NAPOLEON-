import type { HTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/utils";

/* =========================================================================
   CHIFFRES-CLÉS

   Charte § 05, ton de voix : « factuel, sans promesse excessive ». Un
   chiffre-clé porte donc toujours sa SOURCE ou sa période — c'est la
   propriété `footnote`. Un chiffre sans provenance est une promesse.

   Le nombre est en Georgia, tabulaire ; le libellé et la source en
   Open Sans. C'est la règle typographique du système appliquée telle
   quelle : la taille décide, pas l'importance.
   ========================================================================= */

export type StatProps = HTMLAttributes<HTMLDivElement> & {
  /** La valeur elle-même. */
  value: ReactNode;
  /** Ce que la valeur mesure. */
  label: ReactNode;
  /** Unité ou suffixe, composé plus petit à côté du nombre. */
  unit?: ReactNode;
  /** Source, périmètre ou période. Ce qui rend le chiffre vérifiable. */
  footnote?: ReactNode;
  align?: "start" | "center";
  tone?: "default" | "inverse";
};

export function Stat({
  value,
  label,
  unit,
  footnote,
  align = "start",
  tone = "default",
  className,
  ...props
}: StatProps) {
  const inverse = tone === "inverse";
  return (
    <div
      className={cn(
        "flex flex-col gap-1.5",
        align === "center" && "items-center text-center",
        className,
      )}
      {...props}
    >
      <p
        className={cn(
          "font-display nm-nums text-display-md flex items-baseline gap-1.5 leading-none",
          align === "center" && "justify-center",
          inverse ? "text-nm-paper" : "text-nm-ink",
        )}
      >
        {value}
        {unit && (
          <span
            className={cn(
              "text-title-sm font-normal",
              inverse ? "text-nm-gold" : "text-nm-gold-ink",
            )}
          >
            {unit}
          </span>
        )}
      </p>
      <p
        className={cn(
          "font-text text-body-sm font-semibold",
          inverse ? "text-nm-ivory" : "text-nm-ink",
        )}
      >
        {label}
      </p>
      {footnote && (
        <p
          className={cn(
            "font-text text-caption",
            inverse ? "text-nm-paper/60" : "text-nm-muted-strong",
          )}
        >
          {footnote}
        </p>
      )}
    </div>
  );
}
