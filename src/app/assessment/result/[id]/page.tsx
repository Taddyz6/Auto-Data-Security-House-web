import Link from "next/link";
import { notFound } from "next/navigation";
import { db } from "@/lib/db";
import { formatDate } from "@/lib/utils";
import { CompanyContactCard } from "@/components/public/company-contact-card";
import { PrintButton } from "@/components/public/print-button";
import { Section } from "@/components/section";
import { Card } from "@/components/ui/card";
import { buttonVariants } from "@/components/ui/button";

const levelCopy = {
  basic: "当前场景相对集中，建议优先完成数据清单梳理、主体与目的地确认，并建立基础审批和日志留存机制。",
  process: "企业已存在较明确的跨境业务，建议开展场景化数据盘点、规则比对、分类分级、审批流程和安全传输方案设计。",
  security_house:
    "企业涉及多场景、多类型或高频数据跨境，建议进一步评估智能识别、合规预审、专属传输、持续监测和审计存证的一体化安全屋方案。",
};

export default async function AssessmentResultPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const record = await db.assessmentRecord.findUnique({ where: { id } });
  if (!record) notFound();

  const scenarios = record.scenarios as string[];
  const dataTypes = record.dataTypes as string[];
  const recommendations = record.recommendations as string[];
  const focusItems = record.focusItems as string[];

  return (
    <div>
      <Section title="企业自测模拟结果" description="以下结果仅用于需求预诊断，不构成正式法律意见或数据出境合规结论。">
        <div className="grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
          <div className="space-y-6">
            <Card className="p-6">
              <p className="text-sm text-slate-500">结果类型</p>
              <h1 className="mt-2 text-3xl font-semibold">{record.resultLevel === "basic" ? "基础咨询型需求" : record.resultLevel === "process" ? "流程建设型需求" : "安全屋重点适配型需求"}</h1>
              <p className="mt-3 text-sm leading-7 text-slate-600">{levelCopy[record.resultLevel]}</p>
              <div className="mt-5 grid gap-4 md:grid-cols-4">
                {[
                  ["业务复杂度", record.complexityScore],
                  ["敏感关注度", record.sensitivityScore],
                  ["治理缺口", record.maturityGapScore],
                  ["总分", record.totalScore],
                ].map(([label, value]) => (
                  <div key={String(label)} className="rounded-2xl bg-slate-50 p-4">
                    <p className="text-sm text-slate-500">{label}</p>
                    <p className="mt-2 text-2xl font-semibold">{value}</p>
                  </div>
                ))}
              </div>
            </Card>

            <Card className="p-6">
              <h2 className="text-xl font-semibold">业务摘要</h2>
              <div className="mt-4 grid gap-4 md:grid-cols-2">
                <SummaryItem label="企业类型" value={record.enterpriseType} />
                <SummaryItem label="传输方向" value={record.transferDirection} />
                <SummaryItem label="场景" value={scenarios.join("、")} />
                <SummaryItem label="数据类型" value={dataTypes.join("、")} />
                <SummaryItem label="传输频率" value={record.frequency} />
                <SummaryItem label="创建时间" value={formatDate(record.createdAt)} />
              </div>
            </Card>

            <Card className="p-6">
              <h2 className="text-xl font-semibold">重点关注事项</h2>
              <ul className="mt-4 space-y-3 text-sm leading-7 text-slate-600">
                {focusItems.map((item) => (
                  <li key={item}>• {item}</li>
                ))}
              </ul>
            </Card>

            <Card className="p-6">
              <h2 className="text-xl font-semibold">推荐下一步</h2>
              <ul className="mt-4 space-y-3 text-sm leading-7 text-slate-600">
                {recommendations.map((item) => (
                  <li key={item}>• {item}</li>
                ))}
              </ul>
              <div className="mt-6 flex flex-wrap gap-3">
                <PrintButton />
                <Link href="/contact" className={buttonVariants({ variant: "outline" })}>预约专家沟通</Link>
              </div>
            </Card>
          </div>
          <CompanyContactCard className="h-fit" />
        </div>
      </Section>
    </div>
  );
}

function SummaryItem({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-slate-100 p-4">
      <p className="text-sm text-slate-500">{label}</p>
      <p className="mt-2 text-sm text-slate-900">{value}</p>
    </div>
  );
}
