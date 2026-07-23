"use client";

import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { processSamples, processSteps } from "@/lib/constants";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { RuleMatchDetails } from "@/components/public/rule-match-details";
import { cn } from "@/lib/utils";

const stepDetails = [
  {
    input: "业务发起部门、项目名称、拟传输数据包。",
    action: "创建跨境任务编号，锁定责任部门与提交时间。",
    output: "待补充业务信息的任务草稿。",
    risk: "责任主体不明确会导致后续审批无法闭环。",
  },
  {
    input: "业务场景、目的地国家/地区、接收方、处理目的。",
    action: "校验用途与目的地信息是否完整，形成场景标签。",
    output: "结构化业务画像与目的地画像。",
    risk: "目的地、接收方或用途描述模糊时，后续规则匹配会失真。",
  },
  {
    input: "文件、接口、日志流或批量数据清单。",
    action: "接入待处理对象，识别格式、大小、来源系统与传输批次。",
    output: "数据接入清单与基础元信息。",
    risk: "数据来源混杂、版本不清可能带来误传和错传。",
  },
  {
    input: "原始字段、文件内容、日志标签。",
    action: "按固定规则识别研发数据、轨迹、VIN、个人信息等敏感要素。",
    output: "数据类型标签、疑似敏感字段列表。",
    risk: "字段命名不规范可能降低识别准确度，需要人工补充判断。",
  },
  {
    input: "数据类型标签、目的地、场景、接收方属性。",
    action: "匹配境内外规则关注点，生成需重点审查的事项。",
    output: "规则关注清单与风险提示。",
    risk: "若场景跨多国家，单一规则模板可能不足以覆盖全部要求。",
  },
  {
    input: "规则关注清单、数据画像、业务背景。",
    action: "输出初步风险等级与建议动作，如放行、脱敏、裁剪、暂停。",
    output: "模拟预审结论。",
    risk: "此步骤仅为演示，不构成正式法律意见或监管结论。",
  },
  {
    input: "预审结果、审批权限、补充说明材料。",
    action: "进入人工复核或审批流，确认是否允许继续处理。",
    output: "审批意见、退回意见或放行意见。",
    risk: "审批链缺失或权限设置不清时，结果无法形成有效授权。",
  },
  {
    input: "需处置的数据字段、文件片段或日志项。",
    action: "执行脱敏、裁剪、字段剔除或直接拦截。",
    output: "可继续传输的处理后数据包，或拦截结论。",
    risk: "处置范围过大可能影响业务可用性，过小则可能残留风险。",
  },
  {
    input: "放行后的数据包、目标链路、传输策略。",
    action: "通过受控链路执行加密传输并记录传输任务状态。",
    output: "传输中的任务记录与加密状态。",
    risk: "链路策略配置错误可能导致超范围传输或异常重试。",
  },
  {
    input: "传输流量、访问行为、任务日志。",
    action: "持续监测流量波动、异常访问和违规行为迹象。",
    output: "监测日志、告警事件或正常通过记录。",
    risk: "高频任务下若无持续监测，异常行为难以及时发现。",
  },
  {
    input: "境外接收方身份、授权信息、项目范围。",
    action: "核验接收主体、权限范围和使用边界。",
    output: "接收方身份校验结果。",
    risk: "接收方身份变更或权限漂移会造成授权失效。",
  },
  {
    input: "传输完成后的文件哈希、批次号、接收确认。",
    action: "校验数据完整性，确认内容未在途中被篡改或丢失。",
    output: "完整性校验通过或失败提示。",
    risk: "校验失败时应暂停后续使用并追查链路问题。",
  },
  {
    input: "任务全链路记录、审批结果、处置动作、监测日志。",
    action: "沉淀结构化日志，形成全过程留痕。",
    output: "日志存证条目与检索索引。",
    risk: "留痕缺失会直接影响后续审计、复盘与举证能力。",
  },
  {
    input: "全链路记录、任务摘要、关键风险事项。",
    action: "输出中英文审计记录与管理摘要，用于演示和复核。",
    output: "模拟审计记录与结果摘要。",
    risk: "报告内容依赖前序数据完整性，信息缺失会影响可追溯性。",
  },
] as const;

const sampleKeys = Object.keys(processSamples) as Array<keyof typeof processSamples>;

export function ProcessDemo() {
  const reduce = useReducedMotion();
  const [activeSample, setActiveSample] =
    useState<keyof typeof processSamples>("blueprint");
  const [activeStep, setActiveStep] = useState(0);

  useEffect(() => {
    if (reduce) return;

    const timer = window.setInterval(() => {
      setActiveStep((value) => {
        const nextStep = (value + 1) % processSteps.length;
        if (nextStep === 0) {
          setActiveSample((current) => {
            const currentIndex = sampleKeys.indexOf(current);
            return sampleKeys[(currentIndex + 1) % sampleKeys.length];
          });
        }
        return nextStep;
      });
    }, 2200);

    return () => window.clearInterval(timer);
  }, [reduce]);

  const currentSample = processSamples[activeSample];

  return (
    <div className="grid gap-6 lg:grid-cols-[360px_1fr]">
      <Card className="panel-grid relative overflow-hidden p-6">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(34,211,238,0.12),_transparent_34%)]" />
        <div className="relative">
          <p className="text-sm font-medium text-cyan-300">演示样例</p>
          <div className="mt-4 flex flex-col gap-3">
            {sampleKeys.map((sampleKey) => {
              const sample = processSamples[sampleKey];
              const selected = sampleKey === activeSample;
              return (
                <Button
                  key={sample.key}
                  variant={selected ? "default" : "outline"}
                  className="justify-start rounded-2xl"
                  onClick={() => setActiveSample(sampleKey)}
                >
                  {sample.title}
                </Button>
              );
            })}
          </div>
          <div className="mt-6 rounded-[24px] border border-white/10 bg-slate-950/60 p-4 text-sm text-slate-300">
            <p className="font-medium text-white">模拟结果</p>
            <p className="mt-2 text-cyan-200">{currentSample.status}</p>
            <ul className="mt-3 space-y-2">
              {currentSample.result.map((item) => (
                <li key={item}>• {item}</li>
              ))}
            </ul>
          </div>
        </div>
      </Card>

      <Card className="panel-grid overflow-hidden p-0">
        <div className="grid lg:grid-cols-[0.9fr_1.1fr]">
          <div className="border-b border-white/8 p-6 lg:border-b-0 lg:border-r">
            <div className="mb-5 flex items-center justify-between">
              <div>
                <p className="text-sm text-cyan-300">流程状态</p>
                <h3 className="mt-2 text-2xl font-semibold text-white">安全屋自动循环演示</h3>
              </div>
              <Badge>{reduce ? "静态模式" : "自动循环"}</Badge>
            </div>
            <div className="space-y-2">
              {processSteps.map((step, index) => (
                <button
                  key={step}
                  type="button"
                  onClick={() => setActiveStep(index)}
                  className={cn(
                    "flex w-full items-center gap-4 rounded-[22px] border px-4 py-3 text-left transition",
                    index === activeStep
                      ? "border-cyan-300/40 bg-cyan-300/10 text-white"
                      : "border-white/8 bg-white/4 text-slate-300 hover:bg-white/8",
                  )}
                >
                  <motion.span
                    className={cn(
                      "flex h-9 w-9 items-center justify-center rounded-2xl text-sm font-semibold",
                      index === activeStep
                        ? "bg-gradient-to-br from-cyan-300 to-sky-400 text-slate-950"
                        : "bg-white/8 text-slate-200",
                    )}
                    animate={
                      reduce || index !== activeStep
                        ? { scale: 1 }
                        : { scale: [1, 1.08, 1] }
                    }
                    transition={{ duration: 1.4, repeat: reduce ? 0 : Number.POSITIVE_INFINITY }}
                  >
                    {index + 1}
                  </motion.span>
                  <span className="text-sm">{step}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="relative p-6">
            <div className="absolute left-8 top-0 bottom-0 w-px bg-gradient-to-b from-cyan-300/0 via-cyan-300/50 to-cyan-300/0" />
            <motion.div
              key={activeStep}
              initial={reduce ? false : { opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35 }}
              className="relative ml-8 rounded-[26px] border border-white/10 bg-slate-950/55 p-6"
            >
              <div className="absolute -left-[39px] top-8 flex h-5 w-5 items-center justify-center rounded-full border border-cyan-300/40 bg-cyan-300/20">
                <motion.span
                  className="h-2.5 w-2.5 rounded-full bg-cyan-200"
                  animate={reduce ? { opacity: 1 } : { opacity: [0.55, 1, 0.55] }}
                  transition={{ duration: 1.2, repeat: reduce ? 0 : Number.POSITIVE_INFINITY }}
                />
              </div>
              <p className="text-sm text-cyan-300">步骤 {activeStep + 1}</p>
              <h4 className="mt-2 text-2xl font-semibold text-white">
                {processSteps[activeStep]}
              </h4>
              {activeStep === 4 ? (
                <RuleMatchDetails />
              ) : (
                <div className="mt-6 grid gap-4 md:grid-cols-2">
                  <InfoCard label="主要输入" value={stepDetails[activeStep].input} />
                  <InfoCard label="系统动作" value={stepDetails[activeStep].action} />
                  <InfoCard label="可能输出" value={stepDetails[activeStep].output} />
                  <InfoCard label="风险点" value={stepDetails[activeStep].risk} />
                </div>
              )}
            </motion.div>
          </div>
        </div>
      </Card>
    </div>
  );
}

function InfoCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-[22px] border border-white/8 bg-white/4 p-4">
      <p className="text-sm font-medium text-white">{label}</p>
      <p className="mt-2 text-sm leading-7 text-slate-300">{value}</p>
    </div>
  );
}
