"use client";

import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Card } from "@/components/ui/card";

const items = [
  { title: "企业端提交", desc: "发起跨境任务并附带业务背景" },
  { title: "识别分类", desc: "识别字段、场景和敏感数据要素" },
  { title: "规则审核", desc: "匹配规则并进入审批判断" },
  { title: "安全传输", desc: "通过受控链路加密发送" },
  { title: "持续监测", desc: "监测行为、流量和异常状态" },
  { title: "可信存证", desc: "形成留痕和审计摘要" },
] as const;

export function HomeProcessLoop() {
  const reduce = useReducedMotion();
  const [active, setActive] = useState(0);

  useEffect(() => {
    if (reduce) return;
    const timer = window.setInterval(() => {
      setActive((value) => (value + 1) % items.length);
    }, 1800);
    return () => window.clearInterval(timer);
  }, [reduce]);

  return (
    <Card className="panel-grid overflow-hidden p-6 sm:p-8">
      <div className="grid gap-6 lg:grid-cols-[0.85fr_1.15fr]">
        <div>
          <p className="text-sm uppercase tracking-[0.22em] text-cyan-300">自动流程演示</p>
          <h3 className="mt-3 text-3xl font-semibold text-white">数据如何经过安全屋</h3>
          <p className="mt-4 text-sm leading-8 text-slate-300">
            下面的流程会自动循环，展示企业端数据如何进入安全屋后被识别、审核、传输、监测并最终形成存证记录。
          </p>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {items.map((item, index) => (
            <motion.div
              key={item.title}
              animate={
                reduce || index !== active
                  ? { y: 0, scale: 1, opacity: 1 }
                  : { y: -4, scale: 1.01, opacity: 1 }
              }
              transition={{ duration: 0.25 }}
            >
              <div
                className={`h-full rounded-[24px] border p-5 transition ${
                  index === active
                    ? "border-cyan-300/35 bg-cyan-300/10"
                    : "border-white/8 bg-white/5"
                }`}
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-white/10 text-sm font-semibold text-cyan-100">
                  {index + 1}
                </div>
                <h4 className="mt-4 text-lg font-semibold text-white">{item.title}</h4>
                <p className="mt-2 text-sm leading-7 text-slate-300">{item.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </Card>
  );
}
