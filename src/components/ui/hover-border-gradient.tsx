"use client";

import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

type Direction = "TOP" | "LEFT" | "BOTTOM" | "RIGHT";

const directions: Direction[] = ["TOP", "LEFT", "BOTTOM", "RIGHT"];

const movingMap: Record<Direction, string> = {
  TOP: "radial-gradient(22% 54% at 50% 0%, rgba(255,255,255,1) 0%, rgba(125,211,252,0.55) 28%, rgba(255,255,255,0) 100%)",
  LEFT: "radial-gradient(18% 48% at 0% 50%, rgba(255,255,255,1) 0%, rgba(34,211,238,0.55) 28%, rgba(255,255,255,0) 100%)",
  BOTTOM: "radial-gradient(22% 54% at 50% 100%, rgba(255,255,255,1) 0%, rgba(56,189,248,0.55) 28%, rgba(255,255,255,0) 100%)",
  RIGHT: "radial-gradient(18% 48% at 100% 50%, rgba(255,255,255,1) 0%, rgba(34,211,238,0.55) 28%, rgba(255,255,255,0) 100%)",
};

const highlight =
  "radial-gradient(85% 190% at 50% 50%, rgba(56,189,248,0.95) 0%, rgba(34,211,238,0.38) 42%, rgba(255,255,255,0) 100%)";

function nextDirection(current: Direction, clockwise: boolean): Direction {
  const currentIndex = directions.indexOf(current);
  const offset = clockwise ? -1 : 1;
  return directions[(currentIndex + offset + directions.length) % directions.length];
}

export function HoverBorderGradient({
  children,
  containerClassName,
  className,
  as: Tag = "button",
  duration = 1.2,
  clockwise = true,
  ...props
}: React.PropsWithChildren<
  {
    as?: React.ElementType;
    containerClassName?: string;
    className?: string;
    duration?: number;
    clockwise?: boolean;
  } & React.HTMLAttributes<HTMLElement>
>) {
  const reduce = useReducedMotion();
  const [hovered, setHovered] = useState(false);
  const [direction, setDirection] = useState<Direction>("TOP");

  useEffect(() => {
    if (hovered || reduce) return;

    const interval = window.setInterval(() => {
      setDirection((current) => nextDirection(current, clockwise));
    }, duration * 1000);

    return () => window.clearInterval(interval);
  }, [clockwise, duration, hovered, reduce]);

  return (
    <Tag
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className={cn(
        "relative flex h-min w-fit items-center justify-center overflow-visible rounded-full border border-white/10 bg-black/20 p-px transition duration-500 hover:bg-black/10",
        containerClassName,
      )}
      {...props}
    >
      <div
        className={cn(
          "relative z-10 w-auto rounded-[inherit] bg-[#07111f] px-4 py-2 text-white",
          className,
        )}
      >
        {children}
      </div>
      <motion.div
        aria-hidden="true"
        className="absolute inset-0 z-0 overflow-hidden rounded-[inherit]"
        style={{ filter: "blur(2px)" }}
        initial={{ background: movingMap.TOP }}
        animate={{
          background: reduce
            ? highlight
            : hovered
              ? [movingMap[direction], highlight]
              : movingMap[direction],
        }}
        transition={{ ease: "linear", duration }}
      />
      <div aria-hidden="true" className="absolute inset-[2px] z-[1] rounded-[inherit] bg-[#07111f]" />
    </Tag>
  );
}
