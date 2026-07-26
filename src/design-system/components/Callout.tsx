import type { HTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/utils";

/* =========================================================================
   ENCARTS

   Un encart interrompt la lecture : il en faut peu, et chacun doit valoir
   l'interruption. Le filet vertical de gauche reprend le geste de la
   citation — c'est la même famille de signes.

   Accessibilité : `danger` et `warning` prennent `role="alert"`, donc sont
   annoncés dès leur apparition. Les autres sont lus dans le flux.
   ========================================================================= */

type CalloutTone = "neutral" | "info" | "gold" | "success" | "warning" | "danger";

const TONES: Record<CalloutTone, { box: string; rule: string; title: string }> = {
  neutral: {
    box: "bg-nm-ivory text-nm-ink-soft",
    rule: "bg-nm-border-strong",
    title: "text-nm-ink",
  },
  info: {
    box: "bg-nm-blue/8 text-nm-ink-soft",
    rule: "bg-nm-blue",
    title: "text-nm-blue-ink",
  },
  gold: {
    box: "bg-nm-gold/12 text-nm-ink-soft",
    rule: "bg-nm-gold",
    title: "text-nm-gold-ink",
  },
  success: {
    box: "bg-nm-success/8 text-nm-ink-soft",
    rule: "bg-nm-success",
    title: "text-nm-success",
  },
  warning: {
    box: "bg-nm-warning/8 text-nm-ink-soft",
    rule: "bg-nm-warning",
    title: "text-nm-warning",
  },
  danger: {
    box: "bg-nm-danger/8 text-nm-ink-soft",
    rule: "bg-nm-danger",
    title: "text-nm-danger",
  },
};

export type CalloutProps = HTMLAttributes<HTMLDivElement> & {
  tone?: CalloutTone;
  title?: ReactNode;
  icon?: ReactNode;
};

export function Callout({
  tone = "neutral",
  title,
  icon,
  className,
  children,
  ...props
}: CalloutProps) {
  const t = TONES[tone];
  const urgent = tone === "danger" || tone === "warning";

  return (
    <div
      role={urgent ? "alert" : undefined}
      className={cn("rounded-nm-md relative overflow-hidden py-4 pr-5 pl-5", t.box, className)}
      {...props}
    >
      <span className={cn("absolute inset-y-0 left-0 w-[3px]", t.rule)} aria-hidden="true" />
      <div className="flex gap-3">
        {icon && (
          <span className={cn("mt-0.5 shrink-0 [&_svg]:size-4.5", t.title)} aria-hidden="true">
            {icon}
          </span>
        )}
        <div className="flex min-w-0 flex-col gap-1">
          {title && (
            <p className={cn("font-text text-body-sm font-semibold", t.title)}>{title}</p>
          )}
          <div className="font-text text-body-sm [&_a]:underline [&_a]:underline-offset-2">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
