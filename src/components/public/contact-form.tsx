"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { leadSchema } from "@/lib/validation";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { z } from "zod";

type LeadValues = z.input<typeof leadSchema>;

const sourceLabel = {
  consultation: "专家咨询",
  demo: "预约线上演示",
  visit: "预约线下参观",
  self_assessment: "自测留资",
} as const;

export function ContactForm({
  source,
  defaultMessage,
}: {
  source: "consultation" | "demo" | "visit" | "self_assessment";
  defaultMessage?: string;
}) {
  const [serverMessage, setServerMessage] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const form = useForm<LeadValues>({
    resolver: zodResolver(leadSchema),
    defaultValues: {
      source,
      companyName: "",
      contactName: "",
      jobTitle: "",
      phone: "",
      email: "",
      expectedContactTime: "",
      preferredContact: "phone",
      message: defaultMessage ?? "",
      consent: false,
      honeypot: "",
    },
  });

  async function onSubmit(values: LeadValues) {
    setSubmitting(true);
    setServerMessage("");
    try {
      const response = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      const data = await response.json();
      if (!response.ok) {
        setServerMessage(data.error ?? "提交失败，请稍后重试。");
        return;
      }
      form.reset({
        source,
        companyName: "",
        contactName: "",
        jobTitle: "",
        phone: "",
        email: "",
        expectedContactTime: "",
        preferredContact: "phone",
        message: defaultMessage ?? "",
        consent: false,
        honeypot: "",
      });
      setServerMessage("信息已提交。工作人员将根据您填写的业务场景进行后续联系。");
    } catch {
      setServerMessage("网络异常，请稍后重试。");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 rounded-[28px] border border-border bg-white p-6">
      <input type="text" className="hidden" tabIndex={-1} autoComplete="off" {...form.register("honeypot")} />
      <div>
        <p className="text-sm font-medium text-slate-900">{sourceLabel[source]}</p>
        <p className="mt-1 text-sm text-slate-500">手机或邮箱至少填写一项。</p>
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        <Field label="姓名" error={form.formState.errors.contactName?.message}>
          <Input placeholder="请输入联系人姓名" {...form.register("contactName")} />
        </Field>
        <Field label="企业" error={form.formState.errors.companyName?.message}>
          <Input placeholder="请输入企业名称" {...form.register("companyName")} />
        </Field>
        <Field label="职务" error={form.formState.errors.jobTitle?.message}>
          <Input placeholder="如：合规负责人" {...form.register("jobTitle")} />
        </Field>
        <Field label="首选联系" error={form.formState.errors.preferredContact?.message}>
          <Select {...form.register("preferredContact")}>
            <option value="phone">电话</option>
            <option value="email">邮箱</option>
            <option value="wechat">微信</option>
            <option value="meeting">会议</option>
          </Select>
        </Field>
        <Field label="手机号" error={form.formState.errors.phone?.message}>
          <Input placeholder="请输入手机号" {...form.register("phone")} />
        </Field>
        <Field label="邮箱" error={form.formState.errors.email?.message}>
          <Input placeholder="请输入邮箱" {...form.register("email")} />
        </Field>
      </div>
      <Field label="期望联系时间" error={form.formState.errors.expectedContactTime?.message}>
        <Input placeholder="如：工作日 14:00-18:00" {...form.register("expectedContactTime")} />
      </Field>
      <Field label="业务说明" error={form.formState.errors.message?.message}>
        <Textarea placeholder="请简要描述业务场景、数据类型或希望沟通的问题" {...form.register("message")} />
      </Field>
      <label className="flex items-start gap-3 text-sm text-slate-600">
        <input type="checkbox" className="mt-1 h-4 w-4" {...form.register("consent")} />
        <span>我已阅读并同意隐私声明，知悉网站仅用于科普、演示与咨询，不接收企业真实跨境数据。</span>
      </label>
      {form.formState.errors.consent ? (
        <p className="text-sm text-red-600">{form.formState.errors.consent.message}</p>
      ) : null}
      {serverMessage ? <p className="text-sm text-slate-700">{serverMessage}</p> : null}
      <Button type="submit" disabled={submitting}>
        {submitting ? "提交中..." : "提交信息"}
      </Button>
    </form>
  );
}

function Field({
  label,
  error,
  children,
}: {
  label: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block space-y-2">
      <span className="text-sm font-medium text-slate-700">{label}</span>
      {children}
      {error ? <span className="text-sm text-red-600">{error}</span> : null}
    </label>
  );
}
