"use client";

import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Badge } from "@/components/ui/badge";

const stages = ["识别", "审核", "传输", "监测", "存证"] as const;

const nodes = {
  source: { x: 76, y: 188, label: "企业数据源", sub: "图纸 / 日志 / 轨迹" },
  china: { x: 210, y: 118, label: "中国节点", sub: "境内数据边界" },
  safehouse: { x: 330, y: 188, label: "安全屋", sub: "预审 / 审批 / 留痕" },
  monitor: { x: 470, y: 96, label: "监测中心", sub: "持续检测" },
  overseas: { x: 590, y: 188, label: "境外节点", sub: "接收方 / 业务系统" },
  archive: { x: 470, y: 280, label: "存证审计", sub: "日志 / 证据链" },
} as const;

const connections = [
  { from: nodes.source, to: nodes.china },
  { from: nodes.china, to: nodes.safehouse },
  { from: nodes.safehouse, to: nodes.overseas },
  { from: nodes.safehouse, to: nodes.monitor },
  { from: nodes.safehouse, to: nodes.archive },
] as const;

const stageCopy = {
  识别: "识别数据类型与敏感字段",
  审核: "匹配规则并进入审批判断",
  传输: "通过受控链路加密传输",
  监测: "实时监测流量与异常行为",
  存证: "沉淀日志与审计摘要",
} as const;

function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t;
}

export function HeroFlow() {
  const reduce = useReducedMotion();
  const [activeStage, setActiveStage] = useState(0);

  useEffect(() => {
    if (reduce) return;
    const timer = window.setInterval(() => {
      setActiveStage((value) => (value + 1) % stages.length);
    }, 2200);
    return () => window.clearInterval(timer);
  }, [reduce]);

  const activeLabel = stages[activeStage];

  return (
    <div className="relative min-h-[520px] overflow-hidden bg-[radial-gradient(circle_at_top_left,_rgba(34,211,238,0.13),_transparent_24%),radial-gradient(circle_at_bottom_right,_rgba(59,130,246,0.12),_transparent_28%)] px-2 py-8 text-white sm:px-6 sm:py-10">
      <div className="absolute inset-0 bg-[linear-gradient(rgba(148,163,184,0.10)_1px,transparent_1px),linear-gradient(90deg,rgba(148,163,184,0.10)_1px,transparent_1px)] bg-[size:26px_26px] opacity-20" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(34,211,238,0.10),_transparent_38%)]" />

      {!reduce ? (
        <div className="pointer-events-none absolute inset-0 hidden md:block">
          {[0, 1, 2, 3, 4, 5].map((index) => (
            <motion.div
              key={index}
              className="absolute h-1.5 w-1.5 rounded-full bg-cyan-200/80"
              initial={{
                x: 40 + index * 88,
                y: 60 + (index % 3) * 70,
                opacity: 0.12,
              }}
              animate={{
                x: [40 + index * 88, 80 + index * 90, 50 + index * 84],
                y: [60 + (index % 3) * 70, 92 + (index % 4) * 58, 48 + (index % 3) * 72],
                opacity: [0.1, 0.6, 0.1],
              }}
              transition={{
                duration: 8 + index,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut",
              }}
            />
          ))}
        </div>
      ) : null}

      <div className="relative flex h-full flex-col">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="text-sm uppercase tracking-[0.24em] text-cyan-200">动态跨境流动示意</p>
            <h3 className="mt-2 text-2xl font-semibold">企业数据如何进入安全屋并跨境流动</h3>
          </div>
          <Badge className="bg-cyan-300/10 text-cyan-100">
            当前阶段：{activeLabel}
          </Badge>
        </div>

        <div className="mt-6 flex-1">
          <svg
            viewBox="0 0 660 360"
            className="h-[360px] w-full"
            role="img"
            aria-label="汽车数据跨境流动动画"
          >
            <defs>
              <linearGradient id="flowLine" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="rgba(34,211,238,0.25)" />
                <stop offset="50%" stopColor="rgba(125,211,252,0.9)" />
                <stop offset="100%" stopColor="rgba(34,211,238,0.2)" />
              </linearGradient>
              <radialGradient id="nodeGlow" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="rgba(125,211,252,0.42)" />
                <stop offset="100%" stopColor="rgba(125,211,252,0)" />
              </radialGradient>
            </defs>

            {connections.map((connection, index) => (
              <g key={`${connection.from.label}-${connection.to.label}`}>
                <line
                  x1={connection.from.x}
                  y1={connection.from.y}
                  x2={connection.to.x}
                  y2={connection.to.y}
                  stroke="rgba(148,163,184,0.18)"
                  strokeWidth="2"
                />
                <motion.line
                  x1={connection.from.x}
                  y1={connection.from.y}
                  x2={connection.to.x}
                  y2={connection.to.y}
                  stroke="url(#flowLine)"
                  strokeWidth="3"
                  strokeLinecap="round"
                  initial={{ pathLength: 0.25, opacity: 0.2 }}
                  animate={
                    reduce
                      ? { opacity: 0.65, pathLength: 1 }
                      : {
                          opacity: [0.25, 0.95, 0.25],
                          pathLength: [0.18, 1, 0.18],
                        }
                  }
                  transition={{
                    duration: 3.2,
                    repeat: reduce ? 0 : Number.POSITIVE_INFINITY,
                    delay: index * 0.25,
                    ease: "easeInOut",
                  }}
                />
                {!reduce ? (
                  <motion.circle
                    r="4.5"
                    fill="rgba(186,230,253,1)"
                    animate={{
                      cx: [
                        connection.from.x,
                        lerp(connection.from.x, connection.to.x, 0.5),
                        connection.to.x,
                      ],
                      cy: [
                        connection.from.y,
                        lerp(connection.from.y, connection.to.y, 0.5),
                        connection.to.y,
                      ],
                      opacity: [0, 1, 0],
                    }}
                    transition={{
                      duration: 2.8,
                      repeat: Number.POSITIVE_INFINITY,
                      delay: index * 0.3,
                      ease: "easeInOut",
                    }}
                  />
                ) : null}
              </g>
            ))}

            {Object.entries(nodes).map(([key, node]) => {
              const active =
                (activeStage === 0 && key === "safehouse") ||
                (activeStage === 1 && (key === "china" || key === "safehouse")) ||
                (activeStage === 2 && key === "overseas") ||
                (activeStage === 3 && key === "monitor") ||
                (activeStage === 4 && key === "archive");

              const isSafehouse = key === "safehouse";

              return (
                <g key={key}>
                  <circle cx={node.x} cy={node.y} r={isSafehouse ? 66 : 42} fill="url(#nodeGlow)" />
                  <motion.circle
                    cx={node.x}
                    cy={node.y}
                    r={isSafehouse ? 42 : 24}
                    fill={active ? "rgba(34,211,238,0.30)" : "rgba(15,23,42,0.86)"}
                    stroke={active ? "rgba(125,211,252,0.95)" : "rgba(148,163,184,0.24)"}
                    strokeWidth={isSafehouse ? 2.5 : 2}
                    animate={
                      reduce || !active
                        ? { scale: 1 }
                        : { scale: [1, 1.05, 1] }
                    }
                    transition={{ duration: 1.8, repeat: reduce || !active ? 0 : Number.POSITIVE_INFINITY }}
                  />
                  <text
                    x={node.x}
                    y={node.y - (isSafehouse ? 2 : 0)}
                    textAnchor="middle"
                    className="fill-white text-[12px] font-semibold"
                  >
                    {node.label}
                  </text>
                  <text
                    x={node.x}
                    y={node.y + (isSafehouse ? 18 : 16)}
                    textAnchor="middle"
                    className="fill-slate-300 text-[9px]"
                  >
                    {node.sub}
                  </text>
                </g>
              );
            })}

            <rect
              x="170"
              y="62"
              width="240"
              height="250"
              rx="30"
              fill="none"
              stroke="rgba(34,211,238,0.16)"
              strokeDasharray="6 8"
            />
            <text x="190" y="84" className="fill-cyan-200 text-[10px] uppercase tracking-[0.24em]">
              中国境内安全边界
            </text>
          </svg>
        </div>

        <div className="mt-4 grid gap-3 sm:grid-cols-5">
          {stages.map((stage, index) => (
            <div
              key={stage}
              className={`rounded-2xl border px-4 py-3 text-sm transition ${
                index === activeStage
                  ? "border-cyan-300/40 bg-cyan-300/10 text-white"
                  : "border-white/8 bg-white/5 text-slate-300"
              }`}
            >
              <p className="font-medium">{stage}</p>
              <p className="mt-1 text-xs leading-6 text-slate-300">{stageCopy[stage]}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
