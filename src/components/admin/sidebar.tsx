import Link from "next/link";
import { navItems } from "@/lib/constants";

const adminItems = [
  { href: "/admin/dashboard", label: "概览" },
  { href: "/admin/leads", label: "咨询线索" },
  { href: "/admin/assessments", label: "自测记录" },
  { href: "/admin/cases", label: "案例管理" },
  { href: "/admin/qualifications", label: "资质管理" },
  { href: "/admin/resources", label: "资料管理" },
  { href: "/admin/faqs", label: "FAQ 管理" },
  { href: "/admin/settings", label: "首页文案" },
];

export function AdminSidebar() {
  return (
    <aside className="rounded-[28px] border border-border bg-white p-5">
      <p className="text-sm font-semibold text-slate-500">后台导航</p>
      <div className="mt-4 flex flex-col gap-2">
        {adminItems.map((item) => (
          <Link key={item.href} href={item.href} className="rounded-2xl px-3 py-2 text-sm text-slate-700 hover:bg-slate-50">
            {item.label}
          </Link>
        ))}
      </div>
      <div className="mt-6 border-t border-slate-100 pt-4 text-xs text-slate-400">
        前台页面：{navItems.map((item) => item.label).join(" / ")}
      </div>
    </aside>
  );
}
