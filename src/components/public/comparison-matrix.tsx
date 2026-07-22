"use client";

import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const modes = [
  { key: "cloud", label: "普通云盘" },
  { key: "vpn", label: "VPN/跨境专线" },
  { key: "consulting", label: "数据出境咨询" },
  { key: "safehouse", label: "数据跨境安全屋" },
] as const;

const descriptions = {
  cloud: "适合普通协作，但缺乏跨境场景下的识别、预审和持续监测能力。",
  vpn: "解决链路连通问题，但不天然提供跨境数据治理闭环。",
  consulting: "适合前期咨询评估，但不直接承接持续传输任务。",
  safehouse: "面向持续、高频、复杂跨境业务的一体化受控处理与传输环境。",
} as const;

export function ComparisonMatrix({
  rows,
}: {
  rows: string[][];
}) {
  const reduce = useReducedMotion();
  const [active, setActive] = useState<(typeof modes)[number]["key"]>("safehouse");

  const activeIndex = modes.findIndex((mode) => mode.key === active) + 1;

  return (
    <div className="grid gap-6 xl:grid-cols-[320px_1fr]">
      <Card className="panel-grid p-6">
        <p className="text-sm uppercase tracking-[0.22em] text-cyan-300">方案切换</p>
        <div className="mt-5 flex flex-col gap-3">
          {modes.map((mode) => (
            <Button
              key={mode.key}
              variant={active === mode.key ? "default" : "outline"}
              className="justify-start rounded-2xl"
              onClick={() => setActive(mode.key)}
            >
              {mode.label}
            </Button>
          ))}
        </div>
        <div className="mt-6 rounded-[24px] border border-white/10 bg-slate-950/55 p-4 text-sm leading-7 text-slate-300">
          <p className="font-medium text-white">{modes.find((item) => item.key === active)?.label}</p>
          <p className="mt-2">{descriptions[active]}</p>
        </div>
      </Card>

      <Card className="overflow-hidden p-0">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[760px] text-left text-sm">
            <thead className="bg-white/6 text-slate-100">
              <tr>
                {["对比项", "普通云盘", "VPN/跨境专线", "数据出境咨询", "数据跨境安全屋"].map((item, index) => (
                  <th
                    key={item}
                    className={`px-5 py-4 font-medium ${index === activeIndex ? "bg-cyan-300/10 text-cyan-100" : ""}`}
                  >
                    {item}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((row) => (
                <tr key={row[0]} className="border-t border-white/8">
                  {row.map((cell, index) => (
                    <td
                      key={`${row[0]}-${index}`}
                      className={`px-5 py-4 align-top ${index === activeIndex ? "bg-cyan-300/6 text-cyan-100" : index === 0 ? "text-slate-100" : "text-slate-300"}`}
                    >
                      {index === activeIndex && !reduce ? (
                        <motion.div
                          initial={{ opacity: 0.8 }}
                          animate={{ opacity: [0.8, 1, 0.8] }}
                          transition={{ duration: 1.8, repeat: Number.POSITIVE_INFINITY }}
                        >
                          {cell}
                        </motion.div>
                      ) : (
                        cell
                      )}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
