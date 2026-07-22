import Link from "next/link";
import { db } from "@/lib/db";
import { formatDate } from "@/lib/utils";
import { Card } from "@/components/ui/card";
import { leadStatusLabel, companyName } from "@/lib/constants";

export default async function AdminDashboardPage() {
  const [leadCount, assessmentCount, latestLead, eventCount, statusGroups, eventGroups, resourceTop] = await Promise.all([
    db.consultationLead.count(),
    db.assessmentRecord.count(),
    db.consultationLead.findFirst({ orderBy: { createdAt: "desc" } }),
    db.analyticsEvent.count(),
    db.consultationLead.groupBy({
      by: ["status"],
      _count: { status: true },
    }),
    db.analyticsEvent.groupBy({
      by: ["event"],
      _count: { event: true },
      orderBy: { _count: { event: "desc" } },
      take: 6,
    }),
    db.resourceItem.findMany({
      orderBy: [{ downloadCount: "desc" }, { createdAt: "desc" }],
      take: 5,
    }),
  ]);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-semibold">后台概览</h1>
        <p className="mt-2 text-sm text-slate-600">当前站点主体：{companyName}</p>
      </div>
      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        {[
          ["咨询线索", String(leadCount)],
          ["自测记录", String(assessmentCount)],
          ["埋点事件", String(eventCount)],
          ["最新线索", latestLead ? formatDate(latestLead.createdAt) : "-"],
        ].map(([label, value]) => (
          <Card key={label} className="p-6">
            <p className="text-sm text-slate-500">{label}</p>
            <p className="mt-3 text-3xl font-semibold">{value}</p>
          </Card>
        ))}
      </div>
      <Card className="p-6">
        <h2 className="text-xl font-semibold">快捷入口</h2>
        <div className="mt-4 flex flex-wrap gap-3 text-sm">
          <Link href="/admin/leads" className="rounded-full border border-border px-4 py-2">查看线索</Link>
          <Link href="/admin/assessments" className="rounded-full border border-border px-4 py-2">查看自测</Link>
          <Link href="/admin/cases" className="rounded-full border border-border px-4 py-2">管理案例</Link>
          <Link href="/admin/resources" className="rounded-full border border-border px-4 py-2">管理资料</Link>
        </div>
      </Card>
      <div className="grid gap-6 xl:grid-cols-2">
        <Card className="p-6">
          <h2 className="text-xl font-semibold">线索状态分布</h2>
          <div className="mt-4 space-y-3">
            {statusGroups.map((item) => (
              <div key={item.status} className="flex items-center justify-between rounded-2xl bg-slate-50 px-4 py-3 text-sm">
                <span>{leadStatusLabel[item.status]}</span>
                <span className="font-semibold">{item._count.status}</span>
              </div>
            ))}
          </div>
        </Card>
        <Card className="p-6">
          <h2 className="text-xl font-semibold">访问与行为事件</h2>
          <div className="mt-4 space-y-3">
            {eventGroups.map((item) => (
              <div key={item.event} className="flex items-center justify-between rounded-2xl bg-slate-50 px-4 py-3 text-sm">
                <span>{item.event}</span>
                <span className="font-semibold">{item._count.event}</span>
              </div>
            ))}
          </div>
        </Card>
      </div>
      <Card className="p-6">
        <h2 className="text-xl font-semibold">资料下载排行</h2>
        <div className="mt-4 grid gap-3">
          {resourceTop.map((item) => (
            <div key={item.id} className="flex items-center justify-between rounded-2xl bg-slate-50 px-4 py-3 text-sm">
              <span>{item.title}</span>
              <span className="font-semibold">{item.downloadCount}</span>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
