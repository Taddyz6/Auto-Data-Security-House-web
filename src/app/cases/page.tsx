import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Section } from "@/components/section";
import {
  caseItems,
  downloadResources,
  qualificationItems,
} from "@/lib/public-content";

export const metadata = {
  title: "案例与资质",
};

const statusLabel = {
  example: "示例场景",
  planned: "规划能力",
  implemented: "已实现能力",
} as const;

export default function CasesPage() {
  return (
    <div>
      <Section title="行业场景案例" description="围绕跨国研发、海外售后与供应链协同等业务，展示典型问题、治理路径与能力组合。">
        <div className="grid gap-6 xl:grid-cols-3">
          {caseItems.map((item) => (
            <Card key={item.id} className="p-6">
              <div className="flex items-center justify-between gap-3">
                <Badge>{item.anonymized ? "脱敏案例" : "示例场景"}</Badge>
                <Badge className="bg-blue-50 text-blue-700">{statusLabel[item.status]}</Badge>
              </div>
              <h2 className="mt-4 text-xl font-semibold">{item.title}</h2>
              <p className="mt-2 text-sm text-slate-500">{item.enterpriseType} · {item.scenario}</p>
              <p className="mt-4 text-sm leading-7 text-slate-600"><strong>主要问题：</strong>{item.problem}</p>
              <p className="mt-3 text-sm leading-7 text-slate-600"><strong>解决方式：</strong>{item.solution}</p>
              <p className="mt-3 text-sm leading-7 text-slate-600"><strong>实施效果：</strong>{item.outcome}</p>
            </Card>
          ))}
        </div>
      </Section>
      <Section title="资质展示" description="如暂无可公开材料，显示持续建设提示，不虚构证书。">
        {qualificationItems.length ? (
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {qualificationItems.map((item) => (
              <Card key={item.id} className="p-6">
                <h3 className="text-lg font-semibold">{item.title}</h3>
                <p className="mt-2 text-sm text-slate-500">{item.issuer ?? "公开信息整理"} {item.issueDate ? `· ${item.issueDate}` : ""}</p>
                <p className="mt-3 text-sm leading-7 text-slate-600">{item.description ?? "相关能力与成果持续建设中。"}</p>
              </Card>
            ))}
          </div>
        ) : (
          <Card className="p-6 text-sm text-slate-600">相关能力与成果持续建设中。</Card>
        )}
      </Section>
      <Section title="资料下载" description="公开资料通过静态文件直接提供下载，不收集或记录下载信息。">
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {downloadResources.map((item) => (
            <Card key={item.id} className="p-6">
              <p className="text-sm uppercase tracking-[0.18em] text-cyan-300">{item.fileType}</p>
              <h3 className="mt-2 text-lg font-semibold">{item.title}</h3>
              <p className="mt-3 text-sm leading-7 text-slate-600">{item.description}</p>
              <a href={item.fileUrl} download className="mt-4 inline-block text-sm font-medium text-primary">
                下载资料
              </a>
            </Card>
          ))}
        </div>
      </Section>
    </div>
  );
}
