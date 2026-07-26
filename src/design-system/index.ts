/**
 * NAPOLEON Médical — Design System 2026
 *
 * Point d'entrée unique. Importer d'ici, jamais des fichiers internes :
 *
 *     import { Button, Display, Emblem } from "@/design-system";
 *
 * Mise en service (déjà faite dans src/app/layout.tsx) :
 *   1. `@import "../design-system/tokens.css"` dans globals.css
 *   2. `designSystemFontVariables` posé sur `<html>`
 *
 * Sur une page, activer les polices du système avec `font-text` sur le
 * conteneur : les composants posent eux-mêmes `font-display` là où Georgia
 * doit prendre le relais.
 */

export { gelasio, openSans, designSystemFontVariables } from "./fonts";

export {
  PALETTE,
  EXTENSIONS,
  TYPE_SCALE,
  RADIUS,
  ELEVATION,
  IMPERIAL_ANGLE_DEG,
  type ColorToken,
  type TypeToken,
} from "./tokens";

export { EMBLEM } from "./brand/emblem-geometry";
export { Emblem, type EmblemProps, type EmblemVariant } from "./brand/Emblem";
export {
  Logotype,
  type LogotypeProps,
  type LogotypeVariant,
  type LogotypeTone,
} from "./brand/Logotype";

export {
  Display,
  Title,
  Eyebrow,
  Lead,
  Body,
  Caption,
  Quote,
  Numeral,
} from "./components/Text";

export { Button, ButtonLink, buttonVariants, type ButtonVariants } from "./components/Button";

export {
  Surface,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  type SurfaceProps,
  type CardProps,
} from "./components/Surface";

export { Badge, SectionNumber, type BadgeProps } from "./components/Badge";

export {
  Field,
  TextInput,
  TextArea,
  Select,
  Checkbox,
  type TextInputProps,
  type TextAreaProps,
  type SelectProps,
} from "./components/Field";

export { Callout, type CalloutProps } from "./components/Callout";

export { Divider, GoldRule, LabelledDivider, ImperialRule } from "./components/Divider";

export { Stat, type StatProps } from "./components/Stat";

export { Table, THead, TBody, TR, TH, TD, type TableProps } from "./components/DataTable";
