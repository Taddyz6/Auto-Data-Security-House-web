"use client";

import type { AssessmentInput, AssessmentResult } from "@/lib/assessment-score";
import { CompanyContactCard } from "@/components/public/company-contact-card";
import { PrintButton } from "@/components/public/print-button";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

const levelCopy: Record<AssessmentResult["resultLevel"], string> = {
  basic:
    "当前场景相对集中，建议优先完成数据清单梳理、主体与目的地确认，并建立基础审批和日志留存机制。",
  process:
    "企业已存在较明确的跨境业务，建议开展场景化数据盘点、规则比对、分类分级、审批流程和安全传输方案设计。",
  security_house:
    "企业涉及多场景、多类型或高频数据跨境，建议进一步评估智能识别、合规预审、专属传输、持续监测和审计存证的一体化安全屋方案。",
};

export function AssessmentResultView({
  input,
  result,
  onReset,
}: {
  input: AssessmentInput;
  result: AssessmentResult;
  onReset: () => void;
}) {
  return (
    <div className="grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
      <div className="space-y-6">
        <Card className="p-6">
          <p className="text-sm text-slate-400">模拟结果类型</p>
          <h2 className="mt-2 text-3xl font-semibold text-white">{result.title}</h2>
          <p className="mt-3 text-sm leading-7 text-slate-300">{levelCopy[result.resultLevel]}</p>
          <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[
              ["业务复杂度", result.complexityScore],
              ["敏感关注度", result.sensitivityScore],
              ["治理缺口", result.maturityGapScore],
              ["总分", result.totalScore],
            ].map(([label, value]) => (
              <div key={String(label)} className="rounded-2xl border border-white/10 bg-white/5 p-4">
                <p className="text-sm text-slate-400">{label}</p>
                <p className="mt-2 text-2xl font-semibold text-white">{value}</p>
              </div>
            ))}
          </div>
        </Card>

        <Card className="p-6">
          <h2 className="text-xl font-semibold text-white">业务摘要</h2>
          <div className="mt-4 grid gap-4 md:grid-cols-2">
            <SummaryItem label="企业类型" value={input.enterpriseType} />
            <SummaryItem label="传输方向" value={input.transferDirection} />
            <SummaryItem label="场景" value={input.scenarios.join("、")} />
            <SummaryItem label="数据类型" value={input.dataTypes.join("、")} />
            <SummaryItem label="传输频率" value={input.frequency} />
            <SummaryItem label="目的地" value={input.destinations.join("、")} />
          </div>
        </Card>

        <Card className="p-6">
          <h2 className="text-xl font-semibold text-white">重点关注事项</h2>
          <ul className="mt-4 space-y-3 text-sm leading-7 text-slate-300">
            {result.focusItems.map((item) => (
              <li key={item}>• {item}</li>
            ))}
          </ul>
        </Card>

        <Card className="p-6">
          <h2 className="text-xl font-semibold text-white">推荐下一步</h2>
          <ul className="mt-4 space-y-3 text-sm leading-7 text-slate-300">
            {result.recommendations.map((item) => (
              <li key={item}>• {item}</li>
            ))}
          </ul>
          <div className="mt-5 flex flex-wrap gap-2">
            {result.recommendedModules.map((item) => (
              <span key={item} className="rounded-full border border-cyan-300/20 bg-cyan-300/8 px-3 py-1.5 text-sm text-cyan-200">
                {item}
              </span>
            ))}
          </div>
          <div className="mt-6 flex flex-wrap gap-3">
            <PrintButton />
            <Button variant="outline" onClick={onReset}>重新自测</Button>
          </div>
        </Card>
      </div>
      <CompanyContactCard className="h-fit" />
    </div>
  );
}

function SummaryItem({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
      <p className="text-sm text-slate-400">{label}</p>
      <p className="mt-2 text-sm leading-6 text-slate-100">{value}</p>
    </div>
  );
}
