import type { HTMLAttributes, TableHTMLAttributes, ThHTMLAttributes, TdHTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/utils";

/* =========================================================================
   TABLEAUX

   Un tableau clinique se lit en diagonale, vite, souvent sur un écran
   partagé. D'où :

   · en-têtes en capitales espacées Open Sans — repérables sans être lourds
   · chiffres tabulaires par défaut : les colonnes ne tremblent pas quand
     les valeurs changent
   · pas de zébrures — des filets fins suffisent et se photocopient
   · défilement horizontal encapsulé, pour que la PAGE ne défile jamais
     latéralement

   `<Table caption>` est obligatoire dans un contexte clinique : c'est ce
   que lit un lecteur d'écran avant d'entrer dans la grille. La légende peut
   être visuellement masquée (`captionHidden`) mais jamais omise.
   ========================================================================= */

export type TableProps = TableHTMLAttributes<HTMLTableElement> & {
  caption: ReactNode;
  captionHidden?: boolean;
  containerClassName?: string;
};

export function Table({
  caption,
  captionHidden = false,
  className,
  containerClassName,
  children,
  ...props
}: TableProps) {
  return (
    <div
      className={cn(
        "border-nm-border rounded-nm-lg overflow-x-auto border",
        containerClassName,
      )}
    >
      <table
        className={cn("font-text w-full border-collapse text-left text-body-sm", className)}
        {...props}
      >
        <caption
          className={cn(
            captionHidden
              ? "sr-only"
              : "text-nm-muted-strong border-nm-border border-b px-4 py-3 text-left text-caption",
          )}
        >
          {caption}
        </caption>
        {children}
      </table>
    </div>
  );
}

export function THead({ className, ...props }: HTMLAttributes<HTMLTableSectionElement>) {
  return <thead className={cn("bg-nm-ivory", className)} {...props} />;
}

export function TBody({ className, ...props }: HTMLAttributes<HTMLTableSectionElement>) {
  return <tbody className={cn("divide-nm-border divide-y", className)} {...props} />;
}

export function TR({ className, ...props }: HTMLAttributes<HTMLTableRowElement>) {
  return <tr className={cn("hover:bg-nm-canvas transition-colors", className)} {...props} />;
}

export function TH({
  numeric = false,
  className,
  ...props
}: { numeric?: boolean } & ThHTMLAttributes<HTMLTableCellElement>) {
  return (
    <th
      scope={props.scope ?? "col"}
      className={cn(
        "nm-eyebrow text-nm-ink-soft border-nm-border border-b px-4 py-3 whitespace-nowrap",
        numeric && "text-right",
        className,
      )}
      {...props}
    />
  );
}

export function TD({
  numeric = false,
  className,
  ...props
}: { numeric?: boolean } & TdHTMLAttributes<HTMLTableCellElement>) {
  return (
    <td
      className={cn(
        "text-nm-ink-soft px-4 py-3 align-middle",
        numeric && "nm-nums text-nm-ink text-right",
        className,
      )}
      {...props}
    />
  );
}
