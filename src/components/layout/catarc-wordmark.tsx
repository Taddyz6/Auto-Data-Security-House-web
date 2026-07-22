import { cn } from "@/lib/utils";

export function CatarcWordmark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 150 52"
      role="img"
      aria-label="CATARC"
      className={cn("h-9 w-[108px]", className)}
    >
      <g transform="translate(4 0) skewX(-6)">
        <text
          x="71"
          y="36"
          textAnchor="middle"
          fill="white"
          fontFamily="Arial Black, Impact, sans-serif"
          fontSize="31"
          fontWeight="900"
          letterSpacing="-2.4"
        >
          CATARC
        </text>
      </g>
    </svg>
  );
}
