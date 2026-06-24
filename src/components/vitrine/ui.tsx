import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

/* Surtitre / eyebrow — Manrope capitales très espacées, façon document officiel. */
export function Eyebrow({
  children,
  className,
  tone = "terracotta",
}: {
  children: ReactNode;
  className?: string;
  tone?: "terracotta" | "gold" | "muted" | "ivory" | "blue";
}) {
  const tones: Record<string, string> = {
    terracotta: "text-nap-terracotta",
    gold: "text-nap-gold",
    muted: "text-nap-muted",
    ivory: "text-nap-ivory/70",
    blue: "text-nap-blue",
  };
  return <p className={cn("nap-eyebrow", tones[tone], className)}>{children}</p>;
}

/* CTA unique du site : « Demander une démo ». Balayage doré 70° au survol. */
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
    primary: "bg-nap-ink text-nap-ivory hover:bg-nap-deep",
    goldline: "border border-nap-gold/70 text-nap-gold hover:bg-nap-gold/10",
  };
  return (
    <a
      href={href}
      className={cn(
        "nap-sweep inline-flex items-center justify-center gap-2 px-9 py-4 font-imperial text-[0.72rem] uppercase tracking-[0.22em] transition-colors duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-nap-gold focus-visible:ring-offset-2 focus-visible:ring-offset-transparent",
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
