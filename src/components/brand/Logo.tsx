import Image from "next/image";

type LogoVariant = "horizontal" | "vertical" | "emblem" | "emblem-gold";

export function Logo({
  variant = "emblem",
  className = "",
  width = 160,
  height = 48,
  priority = false,
}: {
  variant?: LogoVariant;
  className?: string;
  width?: number;
  height?: number;
  priority?: boolean;
}) {
  const src =
    variant === "emblem-gold"
      ? "/logos/napoleon-emblem-v2-gold.png"
      : "/logos/napoleon-emblem-v2-navy.png";

  return (
    <Image
      src={src}
      alt="NAPOLEON Médical"
      width={width}
      height={height}
      className={className}
      priority={priority}
    />
  );
}
