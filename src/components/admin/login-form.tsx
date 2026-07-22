"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export function AdminLoginForm() {
  const router = useRouter();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function onSubmit(formData: FormData) {
    setLoading(true);
    setError("");
    const payload = Object.fromEntries(formData.entries());
    try {
      const response = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await response.json();
      if (!response.ok) {
        setError(data.error ?? "登录失败");
        return;
      }
      router.push("/admin/dashboard");
      router.refresh();
    } catch {
      setError("网络异常，请稍后重试。");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form action={onSubmit} className="space-y-4 rounded-[28px] border border-border bg-white p-6">
      <div>
        <p className="text-lg font-semibold">管理员登录</p>
        <p className="mt-1 text-sm text-slate-500">账号密码仅用于 MVP 演示后台。</p>
      </div>
      <label className="block space-y-2">
        <span className="text-sm font-medium">邮箱</span>
        <Input name="email" type="email" placeholder="请输入管理员邮箱" />
      </label>
      <label className="block space-y-2">
        <span className="text-sm font-medium">密码</span>
        <Input name="password" type="password" placeholder="请输入密码" />
      </label>
      {error ? <p className="text-sm text-red-600">{error}</p> : null}
      <Button type="submit" disabled={loading}>
        {loading ? "登录中..." : "登录后台"}
      </Button>
    </form>
  );
}
