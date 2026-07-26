import type { ButtonHTMLAttributes, AnchorHTMLAttributes, ReactNode } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

/* =========================================================================
   BOUTONS

   Charte § 13 : « pas plus de deux couleurs dominantes par support » et
   « l'or, jamais en aplat dominant — en touche seulement ».

   D'où la hiérarchie : Bleu Profond porte l'action principale, l'or ne
   sert qu'en filet (`gold`), jamais en fond. Un seul bouton `primary` par
   écran ; au-delà, plus rien ne prime.
   ========================================================================= */

const button = cva(
  [
    "font-text inline-flex shrink-0 items-center justify-center gap-2 whitespace-nowrap",
    "rounded-nm-pill font-semibold tracking-[0.01em]",
    "transition-[background-color,border-color,color,box-shadow] duration-200 ease-[var(--ease-nm-standard)]",
    /* Le focus se voit toujours : une interface médicale se pilote au clavier. */
    "outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-nm-deep",
    "disabled:pointer-events-none disabled:opacity-45",
    "[&_svg]:pointer-events-none [&_svg]:shrink-0",
  ],
  {
    variants: {
      variant: {
        /* Action principale. Balayage doré au survol — signature impériale. */
        primary: "nm-sweep bg-nm-deep text-nm-paper shadow-nm-2 hover:bg-nm-ink",
        /* Action secondaire sur fond clair. */
        secondary: "bg-nm-ivory text-nm-ink hover:bg-nm-border/70",
        /* Contour encre — l'alternative sobre au primaire. */
        outline: "border border-nm-ink/25 text-nm-ink hover:border-nm-ink/60 hover:bg-nm-ivory/60",
        /* L'or EN FILET, jamais en aplat. Supports prestige et institutionnels. */
        gold: "border border-nm-gold text-nm-gold-ink hover:bg-nm-gold/12",
        /* Sur fond encre. */
        inverse: "bg-nm-paper text-nm-ink hover:bg-nm-ivory",
        /* Discret — barres d'outils, actions de ligne. */
        ghost: "text-nm-ink-soft hover:bg-nm-ivory hover:text-nm-ink",
        /* Destructif. Terracotta Deep : la charte n'a pas de rouge, et n'en
           veut pas — la chaleur suffit à signaler. */
        danger: "bg-nm-danger text-nm-paper hover:bg-nm-terracotta-deep/85",
      },
      size: {
        sm: "h-9 px-4 text-body-sm [&_svg]:size-4",
        md: "h-11 px-6 text-body-sm [&_svg]:size-4",
        lg: "h-13 px-8 text-body [&_svg]:size-5",
        icon: "size-11 p-0 [&_svg]:size-5",
      },
      full: { true: "w-full", false: "" },
    },
    defaultVariants: { variant: "primary", size: "md", full: false },
  },
);

export type ButtonVariants = VariantProps<typeof button>;

type ButtonProps = ButtonVariants &
  Omit<ButtonHTMLAttributes<HTMLButtonElement>, "color"> & {
    children: ReactNode;
  };

export function Button({ variant, size, full, className, ...props }: ButtonProps) {
  return (
    <button
      type={props.type ?? "button"}
      className={cn(button({ variant, size, full }), className)}
      {...props}
    />
  );
}

type ButtonLinkProps = ButtonVariants &
  Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "color"> & {
    children: ReactNode;
  };

/**
 * Même dessin, sémantique de lien. À utiliser dès que le clic NAVIGUE :
 * un lecteur d'écran, une molette ou un Cmd-clic doivent pouvoir agir.
 */
export function ButtonLink({ variant, size, full, className, ...props }: ButtonLinkProps) {
  return <a className={cn(button({ variant, size, full }), className)} {...props} />;
}

export { button as buttonVariants };
