import { ExternalLink } from "lucide-react";
import {
  negativeListItems,
  regulationItems,
} from "@/lib/regulatory-content";

export function RuleMatchDetails() {
  return (
    <div className="mt-6 space-y-8">
      <section aria-labelledby="latest-regulations">
        <div className="flex items-end justify-between gap-4">
          <h5 id="latest-regulations" className="font-medium text-white">
            最新法规与规则
          </h5>
          <span className="text-xs text-slate-400">8 项 · 按时间倒序</span>
        </div>
        <div className="mt-3 divide-y divide-white/8 border-y border-white/8">
          {regulationItems.map((item) => (
            <a
              key={item.title}
              href={item.sourceUrl}
              target="_blank"
              rel="noreferrer"
              className="group flex items-center justify-between gap-4 py-4"
            >
              <span className="min-w-0">
                <span className="block text-sm font-medium text-white transition group-hover:text-cyan-200">
                  {item.title}
                </span>
                <span className="mt-1 block text-xs leading-5 text-slate-400">
                  {item.authority} · {item.publishedAt}
                </span>
              </span>
              <ExternalLink
                aria-hidden="true"
                className="h-4 w-4 shrink-0 text-cyan-300"
              />
              <span className="sr-only">在新标签页查看官方来源</span>
            </a>
          ))}
        </div>
      </section>

      <section aria-labelledby="negative-lists">
        <div className="flex items-end justify-between gap-4">
          <h5 id="negative-lists" className="font-medium text-white">
            地方与自贸区数据出境负面清单
          </h5>
          <span className="shrink-0 text-xs text-slate-400">10 个地区</span>
        </div>
        <div className="mt-3 grid gap-3 sm:grid-cols-2">
          {negativeListItems.map((item) => (
            <a
              key={item.region}
              href={item.sourceUrl}
              target="_blank"
              rel="noreferrer"
              className="group rounded-2xl border border-white/8 bg-white/4 p-4 transition hover:border-cyan-300/30 hover:bg-cyan-300/8"
            >
              <span className="flex items-center justify-between gap-3">
                <span className="font-medium text-white transition group-hover:text-cyan-200">
                  {item.region}
                </span>
                <ExternalLink
                  aria-hidden="true"
                  className="h-4 w-4 shrink-0 text-cyan-300"
                />
              </span>
              <span className="mt-2 block text-xs text-slate-400">
                {item.version} · 发布于 {item.publishedAt}
              </span>
              <span className="sr-only">在新标签页查看官方来源</span>
            </a>
          ))}
        </div>
      </section>

      <p className="rounded-2xl border border-cyan-300/15 bg-cyan-300/6 px-4 py-3 text-xs leading-6 text-slate-300">
        仅作法规信息导航与科普展示，不自动给出适用性结论。
      </p>
    </div>
  );
}
