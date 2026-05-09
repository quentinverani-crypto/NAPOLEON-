import Image from "next/image";

type LogoVariant = "horizontal" | "vertical" | "emblem";

export function Logo({
  variant = "horizontal",
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
    variant === "emblem"
      ? "/logos/napoleon-embleme-clean.svg"
      : variant === "vertical"
        ? "/logos/napoleon-embleme.png"
        : "/logos/napoleon-embleme.png";

  return (
    <Image
      src={src}
      alt="NAPOLEON Medical"
      width={width}
      height={height}
      className={className}
      priority={priority}
    />
  );
}
