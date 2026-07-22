import { redirect } from "next/navigation";
import { getAdminSession } from "@/lib/auth";
import { AdminLoginForm } from "@/components/admin/login-form";
import { Section } from "@/components/section";

export default async function AdminLoginPage() {
  const session = await getAdminSession();
  if (session) redirect("/admin/dashboard");

  return (
    <Section title="管理员登录" description="仅管理员可访问后台。密码不明文存储。">
      <div className="mx-auto max-w-md">
        <AdminLoginForm />
      </div>
    </Section>
  );
}
