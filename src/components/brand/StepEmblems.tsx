"use client";

import { useId } from "react";

type Props = { className?: string };

function BrandCircle({
  ringId,
  fillId,
  children,
  className,
}: {
  ringId: string;
  fillId: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <svg
      viewBox="0 0 120 120"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id={ringId} x1="0.15" y1="0" x2="0.85" y2="1">
          <stop offset="0" stopColor="#a7dcff" />
          <stop offset="0.55" stopColor="#6e5cf6" />
          <stop offset="1" stopColor="#4a32d6" />
        </linearGradient>
        <linearGradient id={fillId} x1="0.5" y1="0" x2="0.5" y2="1">
          <stop offset="0" stopColor="#a7dcff" />
          <stop offset="0.5" stopColor="#6e5cf6" />
          <stop offset="1" stopColor="#2911bf" />
        </linearGradient>
      </defs>
      {/* White circle background */}
      <circle cx="60" cy="60" r="52" fill="#ffffff" />
      {/* Gradient ring */}
      <circle
        cx="60"
        cy="60"
        r="52"
        fill="none"
        stroke={`url(#${ringId})`}
        strokeWidth="4"
      />
      {children}
    </svg>
  );
}

/** Chip emblem — same visual DNA as logotype 3 mic emblem */
export function ChipEmblem({ className }: Props) {
  const ringId = useId();
  const fillId = useId();
  return (
    <BrandCircle ringId={ringId} fillId={fillId} className={className}>
      {/* Chip body */}
      <rect
        x="38"
        y="38"
        width="44"
        height="44"
        rx="5"
        fill={`url(#${fillId})`}
      />
      {/* Inner window */}
      <rect
        x="48"
        y="48"
        width="24"
        height="24"
        rx="2"
        fill="#ffffff"
        opacity="0.82"
      />
      {/* Top pins */}
      <rect x="44.5" y="30" width="3.5" height="8" rx="1.2" fill={`url(#${fillId})`} />
      <rect x="55.5" y="30" width="3.5" height="8" rx="1.2" fill={`url(#${fillId})`} />
      <rect x="66.5" y="30" width="3.5" height="8" rx="1.2" fill={`url(#${fillId})`} />
      {/* Bottom pins */}
      <rect x="44.5" y="82" width="3.5" height="8" rx="1.2" fill={`url(#${fillId})`} />
      <rect x="55.5" y="82" width="3.5" height="8" rx="1.2" fill={`url(#${fillId})`} />
      <rect x="66.5" y="82" width="3.5" height="8" rx="1.2" fill={`url(#${fillId})`} />
      {/* Left pins */}
      <rect x="30" y="44.5" width="8" height="3.5" rx="1.2" fill={`url(#${fillId})`} />
      <rect x="30" y="55.5" width="8" height="3.5" rx="1.2" fill={`url(#${fillId})`} />
      <rect x="30" y="66.5" width="8" height="3.5" rx="1.2" fill={`url(#${fillId})`} />
      {/* Right pins */}
      <rect x="82" y="44.5" width="8" height="3.5" rx="1.2" fill={`url(#${fillId})`} />
      <rect x="82" y="55.5" width="8" height="3.5" rx="1.2" fill={`url(#${fillId})`} />
      <rect x="82" y="66.5" width="8" height="3.5" rx="1.2" fill={`url(#${fillId})`} />
    </BrandCircle>
  );
}

/** Document emblem — same visual DNA as logotype 3 mic emblem */
export function DocumentEmblem({ className }: Props) {
  const ringId = useId();
  const fillId = useId();
  return (
    <BrandCircle ringId={ringId} fillId={fillId} className={className}>
      {/* Document body with folded corner */}
      <path
        d="M 40 30
           L 70 30
           L 84 44
           L 84 90
           Q 84 94 80 94
           L 44 94
           Q 40 94 40 90
           Z"
        fill={`url(#${fillId})`}
      />
      {/* Folded corner */}
      <path d="M 70 30 L 70 44 L 84 44 Z" fill="#ffffff" opacity="0.35" />
      {/* Text lines */}
      <rect x="48" y="52" width="28" height="2.6" rx="1.2" fill="#ffffff" opacity="0.9" />
      <rect x="48" y="59" width="28" height="2.6" rx="1.2" fill="#ffffff" opacity="0.9" />
      <rect x="48" y="66" width="22" height="2.6" rx="1.2" fill="#ffffff" opacity="0.9" />
      <rect x="48" y="76" width="28" height="2.6" rx="1.2" fill="#ffffff" opacity="0.9" />
      <rect x="48" y="83" width="18" height="2.6" rx="1.2" fill="#ffffff" opacity="0.9" />
    </BrandCircle>
  );
}
