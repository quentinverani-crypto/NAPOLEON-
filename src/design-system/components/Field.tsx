"use client";

import { createContext, useContext, useId } from "react";
import type {
  InputHTMLAttributes,
  TextareaHTMLAttributes,
  SelectHTMLAttributes,
  ReactNode,
} from "react";
import { cn } from "@/lib/utils";

/* =========================================================================
   CHAMPS DE SAISIE

   Un médecin saisit entre deux patients, souvent au clavier, parfois d'une
   seule main. Trois partis pris en découlent :

   1. Les zones de frappe sont hautes (44 px) — la cible minimale tactile.
   2. L'erreur est TOUJOURS écrite, jamais seulement colorée, et reliée au
      champ par `aria-describedby` pour être lue à voix haute.
   3. L'étiquette est visible en permanence. Pas de « placeholder-label » :
      il disparaît dès la première frappe, au moment précis où l'on doute.

   `<Field>` porte l'étiquette, l'aide et l'erreur ; le contrôle qu'il
   contient récupère tout seul son `id`, son `aria-describedby` et son état
   invalide. Rien à recâbler à la main, donc rien à oublier :

       <Field label="Numéro RPPS" error="11 chiffres attendus.">
         <TextInput defaultValue="1023" />
       </Field>
   ========================================================================= */

type FieldContext = { id: string; describedBy?: string; invalid: boolean };

const Ctx = createContext<FieldContext | null>(null);

/** Un contrôle hors `<Field>` reste utilisable : il retombe sur ses props. */
function useFieldWiring(props: { id?: string; invalid?: boolean; "aria-describedby"?: string }) {
  const ctx = useContext(Ctx);
  return {
    id: props.id ?? ctx?.id,
    invalid: props.invalid ?? ctx?.invalid ?? false,
    describedBy: props["aria-describedby"] ?? ctx?.describedBy,
  };
}

const controlBase = [
  "font-text text-body w-full rounded-nm-md border bg-nm-paper text-nm-ink",
  "placeholder:text-nm-muted",
  "transition-[border-color,box-shadow] duration-200",
  "outline-none focus-visible:border-nm-deep focus-visible:ring-2 focus-visible:ring-nm-deep/25",
  "disabled:cursor-not-allowed disabled:bg-nm-ivory disabled:text-nm-ink-soft",
].join(" ");

const edge = (invalid: boolean) =>
  invalid
    ? "border-nm-terracotta-deep focus-visible:border-nm-terracotta-deep focus-visible:ring-nm-terracotta-deep/25"
    : "border-nm-ink-soft/45";

export type FieldProps = {
  label: ReactNode;
  /** Aide de saisie, affichée sous le champ tant qu'il n'y a pas d'erreur. */
  hint?: ReactNode;
  /** Message d'erreur. Sa présence bascule le champ en état invalide. */
  error?: ReactNode;
  required?: boolean;
  children: ReactNode;
  className?: string;
};

export function Field({ label, hint, error, required, children, className }: FieldProps) {
  const id = useId();
  const hintId = `${id}-hint`;
  const errorId = `${id}-error`;
  const invalid = Boolean(error);
  const describedBy = invalid ? errorId : hint ? hintId : undefined;

  return (
    <Ctx.Provider value={{ id, describedBy, invalid }}>
      <div className={cn("flex flex-col gap-1.5", className)}>
        <label htmlFor={id} className="font-text text-body-sm text-nm-ink font-semibold">
          {label}
          {required && (
            <>
              <span className="text-nm-terracotta-deep ml-1" aria-hidden="true">
                *
              </span>
              <span className="sr-only"> (obligatoire)</span>
            </>
          )}
        </label>

        {children}

        {invalid ? (
          <p id={errorId} role="alert" className="font-text text-caption text-nm-terracotta-deep">
            {error}
          </p>
        ) : hint ? (
          <p id={hintId} className="font-text text-caption text-nm-ink-soft">
            {hint}
          </p>
        ) : null}
      </div>
    </Ctx.Provider>
  );
}

export type TextInputProps = Omit<InputHTMLAttributes<HTMLInputElement>, "size"> & {
  invalid?: boolean;
};

export function TextInput({ className, ...props }: TextInputProps) {
  const w = useFieldWiring(props);
  const { invalid: _drop, ...rest } = props;
  void _drop;
  return (
    <input
      {...rest}
      id={w.id}
      aria-describedby={w.describedBy}
      aria-invalid={w.invalid || undefined}
      className={cn(controlBase, edge(w.invalid), "h-11 px-3.5", className)}
    />
  );
}

export type TextAreaProps = TextareaHTMLAttributes<HTMLTextAreaElement> & {
  invalid?: boolean;
};

export function TextArea({ className, rows = 4, ...props }: TextAreaProps) {
  const w = useFieldWiring(props);
  const { invalid: _drop, ...rest } = props;
  void _drop;
  return (
    <textarea
      {...rest}
      rows={rows}
      id={w.id}
      aria-describedby={w.describedBy}
      aria-invalid={w.invalid || undefined}
      className={cn(controlBase, edge(w.invalid), "resize-y px-3.5 py-3", className)}
    />
  );
}

export type SelectProps = SelectHTMLAttributes<HTMLSelectElement> & {
  invalid?: boolean;
};

export function Select({ className, children, ...props }: SelectProps) {
  const w = useFieldWiring(props);
  const { invalid: _drop, ...rest } = props;
  void _drop;
  return (
    <div className="relative">
      <select
        {...rest}
        id={w.id}
        aria-describedby={w.describedBy}
        aria-invalid={w.invalid || undefined}
        className={cn(
          controlBase,
          edge(w.invalid),
          "h-11 appearance-none py-0 pr-10 pl-3.5",
          className,
        )}
      >
        {children}
      </select>
      <svg
        viewBox="0 0 20 20"
        aria-hidden="true"
        className="text-nm-ink-soft pointer-events-none absolute top-1/2 right-3.5 size-4 -translate-y-1/2"
      >
        <path
          d="M5 8l5 5 5-5"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
}

/**
 * Case à cocher. La cible cliquable englobe le libellé — plus large, donc
 * plus sûre en usage rapide.
 */
export function Checkbox({
  label,
  className,
  ...props
}: { label: ReactNode } & InputHTMLAttributes<HTMLInputElement>) {
  const generated = useId();
  const id = props.id ?? generated;
  return (
    <div className={cn("flex items-start gap-2.5", className)}>
      <input
        {...props}
        id={id}
        type="checkbox"
        className="border-nm-ink-soft/45 accent-nm-deep focus-visible:outline-nm-deep mt-0.5 size-4 shrink-0 rounded-nm-xs border outline-none focus-visible:outline-2 focus-visible:outline-offset-2"
      />
      <label htmlFor={id} className="font-text text-body-sm text-nm-ink-soft cursor-pointer">
        {label}
      </label>
    </div>
  );
}
