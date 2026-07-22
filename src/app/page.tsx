import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { scenarios } from "@/lib/constants";
import { caseItems, faqItems, siteSettings } from "@/lib/public-content";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Card } from "@/components/ui/card";
import { Section } from "@/components/section";
import { HeroFlow } from "@/components/public/hero-flow";
import { BrandRibbon } from "@/components/public/brand-ribbon";
import { CapabilityGrid } from "@/components/public/capability-grid";
import { ComparisonMatrix } from "@/components/public/comparison-matrix";
import { ScrollReveal } from "@/components/public/scroll-reveal";
import { ScenarioCarousel } from "@/components/public/scenario-carousel";
import { SafehouseDiagram } from "@/components/public/safehouse-diagram";
import { HomeProcessLoop } from "@/components/public/home-process-loop";
import { HoverBorderGradient } from "@/components/ui/hover-border-gradient";
import WorldMap from "@/components/ui/world-map";

const worldRoutes = [
  {
    start: { lat: 31.2304, lng: 121.4737, label: "上海", primary: true },
    end: { lat: 29.4316, lng: 106.9123, label: "重庆" },
  },
  {
    start: { lat: 31.2304, lng: 121.4737, label: "上海", primary: true },
    end: { lat: 1.3521, lng: 103.8198, label: "新加坡" },
  },
  {
    start: { lat: 31.2304, lng: 121.4737, label: "上海", primary: true },
    end: { lat: 51.5074, lng: -0.1278, label: "伦敦" },
  },
  {
    start: { lat: 31.2304, lng: 121.4737, label: "上海", primary: true },
    end: { lat: 25.2048, lng: 55.2708, label: "迪拜" },
  },
  {
    start: { lat: 31.2304, lng: 121.4737, label: "上海", primary: true },
    end: { lat: 34.0522, lng: -118.2437, label: "洛杉矶" },
  },
];

const comparisonRows = [
  ["文件传输", "支持", "支持", "不支持", "支持"],
  ["数据识别", "通常不支持", "不支持", "人工分析", "规则与智能识别"],
  ["出境前审核", "不支持", "不支持", "阶段性人工审核", "流程化预审"],
  ["风险监测", "有限", "主要监测网络", "不持续", "全链路监测"],
  ["审批留痕", "有限", "有限", "文档记录", "全流程留痕"],
  ["审计存证", "通常不支持", "通常不支持", "输出咨询材料", "自动形成证据链"],
  ["适用场景", "普通协作", "已明确合规的数据传输", "前期合规评估", "持续、高频、复杂跨境业务"],
];

const capabilities = [
  {
    title: "智能合规预审",
    desc: "识别数据类型、敏感字段和业务场景，匹配适用规则，输出初步风险和处置建议。",
    icon: "radar",
  },
  {
    title: "安全可控传输",
    desc: "通过审批、权限、加密、身份验证和专属链路控制数据流转。",
    icon: "workflow",
  },
  {
    title: "全链路合规检测",
    desc: "对文件、接口、日志和跨境流量进行持续监测，识别异常传输和违规风险。",
    icon: "shield",
  },
  {
    title: "可信存证与审计",
    desc: "留存主体、时间、数据类型、审批、传输和处置记录，支持审计报告和证据核验。",
    icon: "audit",
  },
] as const;

export default function HomePage() {
  return (
    <div>
      <section className="hero-grid relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(34,211,238,0.15),_transparent_24%),radial-gradient(circle_at_top_right,_rgba(59,130,246,0.16),_transparent_30%),linear-gradient(180deg,rgba(2,6,23,0.1)_0%,rgba(2,6,23,0)_100%)]" />
        <div className="relative mx-auto min-h-[84svh] max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="pointer-events-none absolute -inset-x-[12%] top-20 opacity-35 sm:top-12 sm:opacity-50 lg:left-[18%] lg:right-[-2%] lg:top-8 lg:opacity-90">
            <WorldMap routes={worldRoutes} />
          </div>
          <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(90deg,rgba(6,16,31,0.98)_0%,rgba(6,16,31,0.90)_38%,rgba(6,16,31,0.22)_72%,rgba(6,16,31,0.08)_100%)] sm:bg-[linear-gradient(90deg,rgba(6,16,31,0.98)_0%,rgba(6,16,31,0.82)_42%,rgba(6,16,31,0.12)_78%,transparent_100%)]" />
          <ScrollReveal className="relative z-10 flex min-h-[84svh] items-center py-20 lg:py-24">
            <div className="max-w-3xl">
              <div className="inline-flex w-fit items-center rounded-full border border-cyan-300/20 bg-cyan-300/8 px-4 py-2 text-xs uppercase tracking-[0.24em] text-cyan-200">
                汽车数据跨境安全屋
              </div>
              <h1 className="mt-6 text-5xl font-semibold tracking-tight text-foreground-strong sm:text-6xl lg:text-7xl">
                让跨境数据流动
                <span className="block text-gradient-brand">在安全边界内高效运行</span>
              </h1>
              <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-300">
                {siteSettings.homeHeroSubtitle}
              </p>
              <div className="mt-8 flex flex-wrap gap-3 text-sm text-slate-300">
                {["合规预审", "链路管控", "持续监测", "可信存证"].map((item) => (
                  <span key={item} className="rounded-full border border-white/10 bg-white/6 px-4 py-2">
                    {item}
                  </span>
                ))}
              </div>
              <div className="mt-8 flex flex-wrap gap-4">
                <HoverBorderGradient
                  as="div"
                  duration={1.35}
                  containerClassName="rounded-full shadow-[0_14px_40px_rgba(34,211,238,0.14)]"
                  className="p-0"
                >
                  <Link
                    href="/process"
                    className="flex h-14 items-center gap-2 rounded-full px-7 text-base font-medium text-white transition-colors hover:text-cyan-100"
                  >
                    查看完整流程
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </HoverBorderGradient>
                <Link href="/contact" className={buttonVariants({ variant: "outline", size: "xl" })}>
                  预约演示
                </Link>
              </div>
            </div>
          </ScrollReveal>
        </div>
        <div className="mx-auto max-w-7xl px-4 pb-8 sm:px-6 lg:px-8 lg:pb-12">
          <ScrollReveal>
            <HeroFlow />
          </ScrollReveal>
        </div>
        <div className="mx-auto max-w-7xl px-4 pb-8 sm:px-6 lg:px-8 lg:pb-16">
          <BrandRibbon />
        </div>
      </section>

      <Section
        eyebrow="定义与边界"
        title="什么是数据跨境安全屋"
        description="汽车数据跨境安全屋，是部署在企业数据与境外接收方之间的受控处理与传输环境。数据在出境前经过识别、分类、规则校验、审批和安全处理，传输过程中持续监测，传输结果形成完整记录和审计证据。"
        className="section-band-soft"
      >
        <ScrollReveal>
          <div className="grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">
            <div className="space-y-6">
              <SafehouseDiagram />
            </div>
            <div className="grid gap-4">
              {[
                ["规则多", "境内外、行业与区域规则并存，企业难以用一条链路统一处理。"],
                ["数据杂", "图纸、日志、视频、轨迹、碳数据格式多样，敏感程度不同。"],
                ["链路散", "网盘、邮件、专线、API、车端上行并存，统一管控成本高。"],
              ].map(([title, desc]) => (
                <Card key={title} className="p-5">
                  <h3 className="text-lg font-semibold text-white">{title}</h3>
                  <p className="mt-2 text-sm leading-7 text-slate-300">{desc}</p>
                </Card>
              ))}
            </div>
          </div>
        </ScrollReveal>
      </Section>

      <Section eyebrow="核心能力" title="从识别到审计的全链路能力体系" description="能力模块不只是单点工具，而是围绕跨境数据处理任务进行串联和闭环。" className="section-band-deep">
        <ScrollReveal>
          <CapabilityGrid items={capabilities} />
        </ScrollReveal>
      </Section>

      <Section eyebrow="场景矩阵" title="围绕汽车产业真实跨境需求构建入口" description="从研发、测试到车联网与供应链协同，不同场景对应不同的数据风险与治理策略。" className="section-band-soft">
        <ScrollReveal>
          <ScenarioCarousel scenarios={scenarios} />
        </ScrollReveal>
      </Section>

      <Section eyebrow="方案比较" title="相比单点传输或咨询，安全屋更适合持续高频业务" description="本对比为通俗化说明，实际能力以具体项目方案和部署范围为准。" className="section-band-deep">
        <ScrollReveal>
          <ComparisonMatrix rows={comparisonRows} />
        </ScrollReveal>
      </Section>

      <Section
        eyebrow="流程概览"
        title="数据如何经过安全屋"
        description="从企业端发起任务到最终生成审计记录，首页先展示自动循环的核心流程，完整细节可进入全流程演示页面查看。"
        className="section-band-soft"
      >
        <ScrollReveal>
          <HomeProcessLoop />
        </ScrollReveal>
      </Section>

      <Section eyebrow="案例与常见问题" title="行业场景与治理实践" description="聚焦典型业务问题、治理路径与能力组合，FAQ 用于统一企业对安全屋的认知。" className="section-band-deep">
        <ScrollReveal>
          <div className="grid gap-6 lg:grid-cols-2">
            <div className="space-y-4">
              {caseItems.slice(0, 3).map((item) => (
                <Card key={item.id} className="p-5">
                  <p className="text-sm text-cyan-300">脱敏案例 · {item.enterpriseType}</p>
                  <h3 className="mt-2 text-lg font-semibold text-white">{item.title}</h3>
                  <p className="mt-2 text-sm leading-7 text-slate-300">{item.solution}</p>
                </Card>
              ))}
            </div>
            <div className="space-y-4">
              {faqItems.slice(0, 4).map((item) => (
                <Card key={item.id} className="p-5">
                  <h3 className="text-base font-semibold text-white">{item.question}</h3>
                  <p className="mt-2 text-sm leading-7 text-slate-300">{item.answer}</p>
                </Card>
              ))}
            </div>
          </div>
        </ScrollReveal>
      </Section>

      <Section eyebrow="转化入口" title="快速进入企业需求预诊断" description="用 3 分钟完成业务自测，快速梳理跨境场景、数据类型与治理重点。" className="section-band-soft">
        <ScrollReveal>
          <Card className="panel-grid overflow-hidden px-6 py-10 sm:px-10">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_right_top,_rgba(34,211,238,0.18),_transparent_28%)]" />
            <div className="relative flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h3 className="text-2xl font-semibold text-white">从业务场景、数据类型与治理现状快速判断关注重点</h3>
                <p className="mt-2 text-sm text-slate-300">基于企业填写的信息，生成结构化风险诊断与改进建议。</p>
              </div>
              <div className="flex flex-wrap gap-3">
                <Link href="/assessment" className={buttonVariants({ size: "lg" })}>开始自测</Link>
                <Link href="/contact" className={cn(buttonVariants({ variant: "outline", size: "lg" }), "text-white")}>预约演示</Link>
              </div>
            </div>
          </Card>
        </ScrollReveal>
      </Section>
    </div>
  );
}
