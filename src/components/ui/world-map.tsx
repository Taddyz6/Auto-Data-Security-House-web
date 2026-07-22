"use client";

import Image from "next/image";
import DottedMap from "dotted-map";
import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

type MapPoint = {
  lat: number;
  lng: number;
  label?: string;
  primary?: boolean;
};

export type MapRoute = {
  start: MapPoint;
  end: MapPoint;
};

const dottedMap = new DottedMap({ height: 100, grid: "diagonal" });
const mapDataUrl = `data:image/svg+xml;utf8,${encodeURIComponent(
  dottedMap.getSVG({
    radius: 0.22,
    color: "rgba(148, 210, 230, 0.34)",
    shape: "circle",
    backgroundColor: "transparent",
  }),
)}`;

function projectPoint(lat: number, lng: number) {
  return {
    x: (lng + 180) * (800 / 360),
    y: (90 - lat) * (400 / 180),
  };
}

function createCurvedPath(start: { x: number; y: number }, end: { x: number; y: number }) {
  const midX = (start.x + end.x) / 2;
  const distance = Math.abs(end.x - start.x);
  const midY = Math.min(start.y, end.y) - Math.min(70, 28 + distance * 0.12);
  return `M ${start.x} ${start.y} Q ${midX} ${midY} ${end.x} ${end.y}`;
}

export default function WorldMap({
  routes,
  lineColor = "#22d3ee",
  className,
}: {
  routes: MapRoute[];
  lineColor?: string;
  className?: string;
}) {
  const reduce = useReducedMotion();
  const points = Array.from(
    new Map(
      routes
        .flatMap((route) => [route.start, route.end])
        .map((point) => [`${point.lat}-${point.lng}`, point]),
    ).values(),
  );

  return (
    <div className={cn("relative aspect-[2/1] w-full overflow-hidden bg-transparent", className)}>
      <Image
        src={mapDataUrl}
        alt="以上海为主节点的全球汽车数据跨境连接地图"
        fill
        unoptimized
        draggable={false}
        sizes="(max-width: 768px) 100vw, 70vw"
        className="pointer-events-none select-none object-cover opacity-75 [mask-image:linear-gradient(to_bottom,transparent,white_12%,white_88%,transparent)]"
      />
      <svg
        viewBox="0 0 800 400"
        className="pointer-events-none absolute inset-0 h-full w-full select-none"
        aria-hidden="true"
      >
        <defs>
          <linearGradient id="world-path-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="white" stopOpacity="0" />
            <stop offset="8%" stopColor={lineColor} stopOpacity="0.95" />
            <stop offset="92%" stopColor="#60a5fa" stopOpacity="0.9" />
            <stop offset="100%" stopColor="white" stopOpacity="0" />
          </linearGradient>
          <filter id="world-node-glow" x="-200%" y="-200%" width="500%" height="500%">
            <feGaussianBlur stdDeviation="5" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {routes.map((route, index) => {
          const start = projectPoint(route.start.lat, route.start.lng);
          const end = projectPoint(route.end.lat, route.end.lng);
          return (
            <motion.path
              key={`${route.end.label}-${index}`}
              d={createCurvedPath(start, end)}
              fill="none"
              stroke="url(#world-path-gradient)"
              strokeWidth="1.4"
              initial={reduce ? false : { pathLength: 0, opacity: 0.25 }}
              animate={{ pathLength: 1, opacity: 0.9 }}
              transition={{ duration: reduce ? 0 : 1.4, delay: reduce ? 0 : index * 0.22, ease: "easeOut" }}
            />
          );
        })}

        {points.map((point, index) => {
          const projected = projectPoint(point.lat, point.lng);
          const primary = Boolean(point.primary);
          return (
            <g key={`${point.lat}-${point.lng}`}>
              <motion.circle
                cx={projected.x}
                cy={projected.y}
                r={primary ? 10 : 6}
                fill={primary ? "rgba(34,211,238,0.18)" : "rgba(96,165,250,0.14)"}
                stroke={primary ? "#67e8f9" : "#7dd3fc"}
                strokeWidth={primary ? 1.5 : 1}
                filter="url(#world-node-glow)"
                animate={reduce ? undefined : { opacity: [0.55, 1, 0.55], scale: [0.9, 1.12, 0.9] }}
                transition={{ duration: 2.4, repeat: reduce ? 0 : Number.POSITIVE_INFINITY, delay: index * 0.12 }}
              />
              <circle cx={projected.x} cy={projected.y} r={primary ? 3.2 : 2.2} fill={primary ? "#ecfeff" : lineColor} />
              {point.label ? (
                <text
                  x={projected.x + (primary ? 12 : 9)}
                  y={projected.y - (primary ? 10 : 7)}
                  fill={primary ? "#ecfeff" : "#bae6fd"}
                  fontSize={primary ? 12 : 9}
                  fontWeight={primary ? 700 : 500}
                >
                  {point.label}
                </text>
              ) : null}
            </g>
          );
        })}
      </svg>
    </div>
  );
}
