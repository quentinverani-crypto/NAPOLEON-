import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

/* Surtitre / eyebrow — Manrope capitales très espacées, façon document officiel,
   posé sur un court filet. */
export function Eyebrow({
  children,
  className,
  tone = "terracotta",
  rule = true,
}: {
  children: ReactNode;
  className?: string;
  tone?: "terracotta" | "gold" | "muted" | "ivory" | "blue";
  rule?: boolean;
}) {
  const tones: Record<string, string> = {
    terracotta: "text-nap-terracotta",
    gold: "text-nap-gold",
    muted: "text-nap-muted",
    ivory: "text-nap-ivory/70",
    blue: "text-nap-blue",
  };
  const rules: Record<string, string> = {
    terracotta: "bg-nap-terracotta/60",
    gold: "bg-nap-gold/70",
    muted: "bg-nap-muted/60",
    ivory: "bg-nap-ivory/40",
    blue: "bg-nap-blue/50",
  };
  return (
    <p
      className={cn(
        "nap-eyebrow inline-flex items-center gap-4",
        tones[tone],
        className,
      )}
    >
      {rule && (
        <span aria-hidden className={cn("h-px w-10", rules[tone])} />
      )}
      <span>{children}</span>
    </p>
  );
}

/* CTA unique du site : « Demander une démo ». Rectangle net, capitales
   espacées, balayage doré 70° au survol — l'imprimé officiel, pas la pilule. */
export function DemoButton({
  href = "#demo",
  children = "Demander une démo",
  variant = "primary",
  className,
}: {
  href?: string;
  children?: ReactNode;
  variant?: "primary" | "goldline";
  className?: string;
}) {
  const variants: Record<string, string> = {
    primary:
      "bg-nap-deep text-white hover:bg-nap-ink",
    goldline:
      "border border-nap-gold text-nap-gold hover:bg-nap-gold/10",
  };
  return (
    <a
      href={href}
      className={cn(
        "nap-btn nap-sweep inline-flex items-center justify-center gap-2 px-8 py-4 transition-colors duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-nap-deep focus-visible:ring-offset-2 focus-visible:ring-offset-transparent",
        variants[variant],
        className,
      )}
    >
      {children}
    </a>
  );
}

/* Numérotation de section façon document officiel. */
export function SectionNumber({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "font-news text-nap-gold/80 text-sm tabular-nums tracking-widest",
        className,
      )}
    >
      {children}
    </span>
  );
}
