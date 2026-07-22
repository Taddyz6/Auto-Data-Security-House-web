"use client";

import { useMemo, useState } from "react";
import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { assessmentSchema } from "@/lib/validation";
import { assessmentOptions } from "@/lib/constants";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { z } from "zod";
import { useRouter } from "next/navigation";

type Values = z.infer<typeof assessmentSchema>;

const steps = [
  "企业基本信息",
  "业务场景",
  "跨境方向",
  "数据类型",
  "现状与规模",
  "主要困难",
];

const ternaryOptions = [
  { value: "yes", label: "是" },
  { value: "no", label: "否" },
  { value: "unknown", label: "不清楚" },
];

export function AssessmentForm() {
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const form = useForm<Values>({
    resolver: zodResolver(assessmentSchema),
    defaultValues: {
      companyName: "",
      enterpriseType: "",
      scenarios: [],
      transferDirection: "",
      destinations: [],
      multipleCountries: false,
      dataTypes: [],
      frequency: "",
      dataVolume: "",
      currentChannels: [],
      hasApprovalProcess: "unknown",
      hasClassification: "unknown",
      hasCompleteLogs: "unknown",
      painPoints: [],
    },
    mode: "onBlur",
  });

  const progress = useMemo(() => Math.round(((step + 1) / steps.length) * 100), [step]);
  const scenariosValue = useWatch({ control: form.control, name: "scenarios" }) ?? [];
  const destinationsValue = useWatch({ control: form.control, name: "destinations" }) ?? [];
  const dataTypesValue = useWatch({ control: form.control, name: "dataTypes" }) ?? [];
  const channelsValue = useWatch({ control: form.control, name: "currentChannels" }) ?? [];
  const painPointsValue = useWatch({ control: form.control, name: "painPoints" }) ?? [];
  const multipleCountriesValue =
    useWatch({ control: form.control, name: "multipleCountries" }) ?? false;

  async function submit(values: Values) {
    setSubmitting(true);
    setError("");
    try {
      const response = await fetch("/api/assessment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      const data = await response.json();
      if (!response.ok) {
        setError(data.error ?? "提交失败，请稍后重试。");
        return;
      }
      router.push(`/assessment/result/${data.assessmentId}`);
    } catch {
      setError("网络异常，请稍后重试。");
    } finally {
      setSubmitting(false);
    }
  }

  async function next() {
    const fieldsByStep: Array<Array<keyof Values>> = [
      ["enterpriseType"],
      ["scenarios"],
      ["transferDirection", "destinations"],
      ["dataTypes"],
      ["frequency", "dataVolume", "currentChannels", "hasApprovalProcess", "hasClassification", "hasCompleteLogs"],
      ["painPoints"],
    ];
    const valid = await form.trigger(fieldsByStep[step]);
    if (!valid) return;
    if (step < steps.length - 1) setStep((value) => value + 1);
  }

  return (
    <Card className="p-6 sm:p-8">
      <div className="mb-6">
        <div className="flex items-center justify-between text-sm text-slate-300">
          <span>第 {step + 1} 步 / 6</span>
          <span>{progress}%</span>
        </div>
        <div className="mt-3 h-2 rounded-full bg-white/10">
          <div className="h-2 rounded-full bg-primary transition-all" style={{ width: `${progress}%` }} />
        </div>
        <h3 className="mt-4 text-2xl font-semibold text-white">{steps[step]}</h3>
      </div>
      <form onSubmit={form.handleSubmit(submit)} className="space-y-6">
        {step === 0 ? (
          <div className="grid gap-4 md:grid-cols-2">
            <Field label="企业名称（选填)">
              <Input {...form.register("companyName")} placeholder="请输入企业名称" />
            </Field>
            <Field label="企业类型" error={form.formState.errors.enterpriseType?.message}>
              <Select {...form.register("enterpriseType")}>
                <option value="">请选择</option>
                {assessmentOptions.enterpriseTypes.map((item) => (
                  <option key={item} value={item}>
                    {item}
                  </option>
                ))}
              </Select>
            </Field>
          </div>
        ) : null}
        {step === 1 ? (
            <CheckboxGroup
              options={assessmentOptions.scenarios}
              value={scenariosValue}
              onChange={(values) => form.setValue("scenarios", values, { shouldValidate: true })}
              error={form.formState.errors.scenarios?.message}
            />
        ) : null}
        {step === 2 ? (
          <div className="space-y-4">
            <Field label="数据方向" error={form.formState.errors.transferDirection?.message}>
              <Select {...form.register("transferDirection")}>
                <option value="">请选择</option>
                {assessmentOptions.directions.map((item) => (
                  <option key={item} value={item}>
                    {item}
                  </option>
                ))}
              </Select>
            </Field>
            <CheckboxGroup
              options={assessmentOptions.destinations}
              value={destinationsValue}
              onChange={(values) => form.setValue("destinations", values, { shouldValidate: true })}
              error={form.formState.errors.destinations?.message}
            />
            <label className="flex items-center gap-3 text-sm text-slate-200">
              <input
                type="checkbox"
                checked={multipleCountriesValue}
                onChange={(event) => form.setValue("multipleCountries", event.target.checked)}
              />
              是否涉及多个国家
            </label>
          </div>
        ) : null}
        {step === 3 ? (
          <CheckboxGroup
            options={assessmentOptions.dataTypes}
            value={dataTypesValue}
            onChange={(values) => form.setValue("dataTypes", values, { shouldValidate: true })}
            error={form.formState.errors.dataTypes?.message}
          />
        ) : null}
        {step === 4 ? (
          <div className="grid gap-4 md:grid-cols-2">
            <Field label="传输频率" error={form.formState.errors.frequency?.message}>
              <Select {...form.register("frequency")}>
                <option value="">请选择</option>
                {assessmentOptions.frequencies.map((item) => (
                  <option key={item} value={item}>
                    {item}
                  </option>
                ))}
              </Select>
            </Field>
            <Field label="单次数据量" error={form.formState.errors.dataVolume?.message}>
              <Select {...form.register("dataVolume")}>
                <option value="">请选择</option>
                {assessmentOptions.volumes.map((item) => (
                  <option key={item} value={item}>
                    {item}
                  </option>
                ))}
              </Select>
            </Field>
            <div className="md:col-span-2">
              <CheckboxGroup
                options={assessmentOptions.channels}
                value={channelsValue}
                onChange={(values) => form.setValue("currentChannels", values, { shouldValidate: true })}
                error={form.formState.errors.currentChannels?.message}
                title="当前方式"
              />
            </div>
            <Field label="是否已有审批流程">
              <Select {...form.register("hasApprovalProcess")}>
                {ternaryOptions.map((item) => (
                  <option key={item.value} value={item.value}>
                    {item.label}
                  </option>
                ))}
              </Select>
            </Field>
            <Field label="是否已有数据分类分级">
              <Select {...form.register("hasClassification")}>
                {ternaryOptions.map((item) => (
                  <option key={item.value} value={item.value}>
                    {item.label}
                  </option>
                ))}
              </Select>
            </Field>
            <Field label="是否保留完整传输日志">
              <Select {...form.register("hasCompleteLogs")}>
                {ternaryOptions.map((item) => (
                  <option key={item.value} value={item.value}>
                    {item.label}
                  </option>
                ))}
              </Select>
            </Field>
          </div>
        ) : null}
        {step === 5 ? (
          <CheckboxGroup
            options={assessmentOptions.painPoints}
            value={painPointsValue}
            onChange={(values) => form.setValue("painPoints", values, { shouldValidate: true })}
            error={form.formState.errors.painPoints?.message}
          />
        ) : null}
        {error ? <p className="text-sm text-red-600">{error}</p> : null}
        <div className="flex flex-wrap gap-3">
          <Button type="button" variant="outline" onClick={() => setStep((value) => Math.max(0, value - 1))} disabled={step === 0}>
            上一步
          </Button>
          {step === steps.length - 1 ? (
            <Button type="submit" disabled={submitting}>
              {submitting ? "生成中..." : "查看模拟结果"}
            </Button>
          ) : (
            <Button type="button" onClick={next}>
              下一步
            </Button>
          )}
        </div>
      </form>
    </Card>
  );
}

function Field({ label, error, children }: { label: string; error?: string; children: React.ReactNode }) {
  return (
    <label className="block space-y-2">
      <span className="text-sm font-medium text-slate-100">{label}</span>
      {children}
      {error ? <span className="text-sm text-red-600">{error}</span> : null}
    </label>
  );
}

function CheckboxGroup({
  title,
  options,
  value,
  onChange,
  error,
}: {
  title?: string;
  options: string[];
  value: string[];
  onChange: (values: string[]) => void;
  error?: string;
}) {
  function toggle(item: string) {
    if (value.includes(item)) {
      onChange(value.filter((entry) => entry !== item));
      return;
    }
    onChange([...value, item]);
  }

  return (
    <div className="space-y-3">
      {title ? <p className="text-sm font-medium text-slate-100">{title}</p> : null}
      <div className="grid gap-3 md:grid-cols-2">
        {options.map((item) => (
          <label
            key={item}
            className={`flex cursor-pointer items-start gap-3 rounded-2xl border p-4 text-sm transition ${
              value.includes(item)
                ? "border-cyan-300/45 bg-cyan-300/12 text-white"
                : "border-white/10 bg-white/5 text-slate-200"
            }`}
          >
            <input type="checkbox" checked={value.includes(item)} onChange={() => toggle(item)} className="mt-1" />
            <span>{item}</span>
          </label>
        ))}
      </div>
      {error ? <p className="text-sm text-red-600">{error}</p> : null}
    </div>
  );
}
