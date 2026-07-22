import { companyName } from "@/lib/constants";

const items = [
  "跨境合规",
  "跨境检测",
  "跨境回传",
  "跨境流通",
  "汽车数据要素",
];

export function BrandRibbon() {
  return (
    <div className="rounded-[30px] border border-white/10 bg-white/6 px-5 py-4 backdrop-blur-xl">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.28em] text-cyan-300">企业主体</p>
          <p className="mt-2 text-base font-semibold text-white">{companyName}</p>
        </div>
        <div className="flex flex-wrap gap-2">
          {items.map((item) => (
            <span
              key={item}
              className="rounded-full border border-white/10 bg-slate-950/60 px-4 py-2 text-xs text-slate-200"
            >
              {item}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
