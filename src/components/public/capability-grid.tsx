"use client";

import { motion, useReducedMotion } from "framer-motion";
import { CheckCircle2, Radar, Shield, Workflow } from "lucide-react";
import { Card } from "@/components/ui/card";

const iconMap = {
  radar: Radar,
  workflow: Workflow,
  shield: Shield,
  audit: CheckCircle2,
} as const;

export function CapabilityGrid({
  items,
}: {
  items: ReadonlyArray<{
    title: string;
    desc: string;
    icon: keyof typeof iconMap;
  }>;
}) {
  const reduce = useReducedMotion();

  return (
    <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
      {items.map((item) => (
        <motion.div
          key={item.title}
          whileHover={
            reduce
              ? undefined
              : {
                  y: -6,
                  scale: 1.01,
                }
          }
          transition={{ duration: 0.22 }}
          className="group"
        >
          <Card className="panel-grid relative h-full overflow-hidden p-6">
            {(() => {
              const Icon = iconMap[item.icon];
              return (
                <div className="relative">
                  <div className="absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-cyan-300/50 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(34,211,238,0.14),_transparent_35%)] opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                  <div className="relative">
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 bg-white/8 text-cyan-200 transition-all duration-300 group-hover:border-cyan-300/40 group-hover:text-cyan-100">
                      <Icon className="h-6 w-6" />
                    </div>
                    <h3 className="mt-5 text-xl font-semibold text-white">{item.title}</h3>
                    <p className="mt-3 text-sm leading-7 text-slate-300">{item.desc}</p>
                  </div>
                </div>
              );
            })()}
          </Card>
        </motion.div>
      ))}
    </div>
  );
}
