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
    primary:
      "bg-nap-deep text-white hover:bg-nap-ink shadow-[0_10px_30px_-12px_rgba(31,58,107,0.6)]",
    goldline:
      "border border-nap-gold text-nap-gold hover:bg-nap-gold/10",
  };
  return (
    <a
      href={href}
      className={cn(
        "nap-sweep inline-flex items-center justify-center gap-2 rounded-full px-7 py-3.5 text-sm font-semibold tracking-wide transition-colors duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-nap-deep focus-visible:ring-offset-2 focus-visible:ring-offset-transparent",
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
