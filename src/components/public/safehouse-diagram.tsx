"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Card } from "@/components/ui/card";

const columns = [
  {
    title: "企业侧数据",
    items: ["研发图纸", "售后日志", "位置轨迹", "碳足迹数据"],
  },
  {
    title: "安全屋处理",
    items: ["识别分类", "规则预审", "审批放行", "脱敏裁剪"],
  },
  {
    title: "跨境结果",
    items: ["安全传输", "实时监测", "日志存证", "审计摘要"],
  },
] as const;

export function SafehouseDiagram() {
  const reduce = useReducedMotion();

  return (
    <Card className="panel-grid overflow-hidden p-6">
      <div className="grid gap-5 lg:grid-cols-[1fr_auto_1fr_auto_1fr]">
        {columns.map((column, index) => (
          <div key={column.title} className="contents">
            <div className="rounded-[24px] border border-white/10 bg-slate-950/45 p-5">
              <p className="text-sm font-medium text-cyan-300">{column.title}</p>
              <div className="mt-4 space-y-3">
                {column.items.map((item, itemIndex) => (
                  <motion.div
                    key={item}
                    className="rounded-2xl border border-white/8 bg-white/5 px-4 py-3 text-sm text-slate-200"
                    initial={reduce ? false : { opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{ duration: 0.35, delay: itemIndex * 0.05 + index * 0.08 }}
                  >
                    {item}
                  </motion.div>
                ))}
              </div>
            </div>
            {index < columns.length - 1 ? (
              <div className="hidden items-center justify-center lg:flex">
                <motion.div
                  className="h-px w-16 bg-gradient-to-r from-cyan-300/20 via-cyan-300/90 to-cyan-300/20"
                  animate={reduce ? { opacity: 0.8 } : { opacity: [0.35, 1, 0.35] }}
                  transition={{ duration: 1.8, repeat: reduce ? 0 : Number.POSITIVE_INFINITY }}
                />
              </div>
            ) : null}
          </div>
        ))}
      </div>
    </Card>
  );
}
