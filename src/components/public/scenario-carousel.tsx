"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { Card } from "@/components/ui/card";

export function ScenarioCarousel({
  scenarios,
}: {
  scenarios: Array<{
    slug: string;
    title: string;
    summary: string;
  }>;
}) {
  const reduce = useReducedMotion();

  return (
    <>
      <div className="hidden gap-6 md:grid md:grid-cols-2 xl:grid-cols-5">
        {scenarios.map((scenario, index) => (
          <motion.div
            key={scenario.slug}
            initial={reduce ? false : { opacity: 0, y: 22 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.45, delay: index * 0.06 }}
          >
            <Link href={`/scenarios/${scenario.slug}`}>
              <Card className="panel-grid h-full p-6 transition duration-300 hover:-translate-y-1 hover:border-cyan-300/28 hover:bg-white/10">
                <p className="text-xs uppercase tracking-[0.2em] text-cyan-300">场景 {index + 1}</p>
                <h3 className="mt-3 text-lg font-semibold text-white">{scenario.title}</h3>
                <p className="mt-3 text-sm leading-7 text-slate-300">{scenario.summary}</p>
              </Card>
            </Link>
          </motion.div>
        ))}
      </div>

      <div className="-mx-4 overflow-x-auto px-4 md:hidden">
        <div className="flex snap-x snap-mandatory gap-4 pb-2">
          {scenarios.map((scenario, index) => (
            <Link
              key={scenario.slug}
              href={`/scenarios/${scenario.slug}`}
              className="min-w-[82vw] snap-center"
            >
              <Card className="panel-grid h-full p-5">
                <p className="text-xs uppercase tracking-[0.2em] text-cyan-300">场景 {index + 1}</p>
                <h3 className="mt-3 text-lg font-semibold text-white">{scenario.title}</h3>
                <p className="mt-3 text-sm leading-7 text-slate-300">{scenario.summary}</p>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
}
