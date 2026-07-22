import Link from "next/link";
import { redirect } from "next/navigation";
import { clearAdminSession, getAdminSession } from "@/lib/auth";
import { AdminSidebar } from "@/components/admin/sidebar";
import { Button } from "@/components/ui/button";

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const session = await getAdminSession();
  if (!session) {
    redirect("/admin/login");
  }

  async function logoutAction() {
    "use server";
    await clearAdminSession();
    redirect("/admin/login");
  }

  return (
    <div className="mx-auto grid max-w-7xl gap-6 px-4 py-8 sm:px-6 lg:grid-cols-[280px_1fr] lg:px-8">
      <div className="space-y-4">
        <Link href="/admin/dashboard" className="block rounded-[28px] bg-slate-950 px-5 py-6 text-white">
          <p className="text-sm text-slate-300">管理员后台</p>
          <p className="mt-2 text-xl font-semibold">{session.email}</p>
        </Link>
        <AdminSidebar />
        <form action={logoutAction}>
          <Button type="submit" variant="outline" className="w-full">退出登录</Button>
        </form>
      </div>
      <div>{children}</div>
    </div>
  );
}
