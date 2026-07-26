import type { HTMLAttributes, ReactNode } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

/* =========================================================================
   SURFACES

   Charte § 13 : « le blanc et l'ivoire sont des matières, pas des absences ».
   Les quatre fonds ci-dessous sont donc des choix, pas des remplissages :

     paper   #FFFFFF  ce sur quoi on lit et on saisit
     canvas  #FAFBFC  le fond général de l'application
     ivory   #F3F1EC  la respiration chaude, les encarts
     ink     #1A2540  l'autorité — pieds de page, bandeaux institutionnels

   Une surface ivoire sur un fond ivoire ne se voit pas : alterner.
   ========================================================================= */

const surface = cva("", {
  variants: {
    tone: {
      paper: "bg-nm-paper text-nm-ink",
      canvas: "bg-nm-canvas text-nm-ink",
      ivory: "bg-nm-ivory text-nm-ink",
      ink: "bg-nm-ink text-nm-ivory",
      "ink-deep": "bg-nm-ink-deep text-nm-ivory",
    },
    border: {
      none: "",
      hairline: "border border-nm-border",
      strong: "border border-nm-border-strong",
      gold: "border border-nm-gold/45",
      inverse: "border border-nm-paper/12",
    },
    elevation: {
      flat: "",
      low: "shadow-nm-1",
      medium: "shadow-nm-2",
      high: "shadow-nm-3",
      lifted: "shadow-nm-4",
    },
    radius: {
      none: "",
      md: "rounded-nm-md",
      lg: "rounded-nm-lg",
      xl: "rounded-nm-xl",
      "2xl": "rounded-nm-2xl",
    },
    padding: {
      none: "",
      sm: "p-4",
      md: "p-6",
      lg: "p-8",
      xl: "p-10",
    },
  },
  defaultVariants: {
    tone: "paper",
    border: "hairline",
    elevation: "flat",
    radius: "lg",
    padding: "none",
  },
});

export type SurfaceProps = VariantProps<typeof surface> &
  HTMLAttributes<HTMLDivElement> & { children?: ReactNode };

export function Surface({
  tone,
  border,
  elevation,
  radius,
  padding,
  className,
  ...props
}: SurfaceProps) {
  return (
    <div
      className={cn(surface({ tone, border, elevation, radius, padding }), className)}
      {...props}
    />
  );
}

/* -------------------------------------------------------------------------
   CARTE — une surface avec un rythme intérieur déjà réglé.
   ------------------------------------------------------------------------- */

export type CardProps = SurfaceProps & {
  /** Ajoute la réaction au survol. À ne mettre que si la carte est cliquable. */
  interactive?: boolean;
};

export function Card({
  interactive = false,
  className,
  padding = "lg",
  ...props
}: CardProps) {
  return (
    <Surface
      padding={padding}
      className={cn(
        interactive &&
          "hover:border-nm-blue/40 hover:shadow-nm-3 cursor-pointer transition-[border-color,box-shadow,transform] duration-200 hover:-translate-y-0.5",
        className,
      )}
      {...props}
    />
  );
}

export function CardHeader({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("mb-4 flex flex-col items-start gap-2", className)} {...props} />;
}

export function CardBody({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("flex flex-col gap-3", className)} {...props} />;
}

export function CardFooter({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("border-nm-border mt-6 flex items-center gap-3 border-t pt-5", className)}
      {...props}
    />
  );
}
