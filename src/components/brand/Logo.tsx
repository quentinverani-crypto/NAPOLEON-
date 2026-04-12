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
      ? "/logos/napoleon-embleme-negatif.png"
      : variant === "vertical"
        ? "/logos/napoleon-negatif-vertical.png"
        : "/logos/napoleon-negatif-horizontal.png";

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
