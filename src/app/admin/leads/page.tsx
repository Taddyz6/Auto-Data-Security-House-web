import { revalidatePath } from "next/cache";
import Link from "next/link";
import { db } from "@/lib/db";
import { leadStatusLabel } from "@/lib/constants";
import { formatDate, maskContact } from "@/lib/utils";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";

const PAGE_SIZE = 10;

export default async function AdminLeadsPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const params = await searchParams;
  const page = Math.max(1, Number(params.page ?? 1));
  const status = typeof params.status === "string" ? params.status : "";
  const source = typeof params.source === "string" ? params.source : "";
  const q = typeof params.q === "string" ? params.q.trim() : "";

  const where = {
    ...(status ? { status: status as keyof typeof leadStatusLabel } : {}),
    ...(source ? { source: source as "self_assessment" | "consultation" | "demo" | "visit" } : {}),
    ...(q
      ? {
          OR: [
            { companyName: { contains: q } },
            { contactName: { contains: q } },
          ],
        }
      : {}),
  };

  const [leads, total] = await Promise.all([
    db.consultationLead.findMany({
      where,
      orderBy: { createdAt: "desc" },
      skip: (page - 1) * PAGE_SIZE,
      take: PAGE_SIZE,
    }),
    db.consultationLead.count({ where }),
  ]);
  const totalPages = Math.max(1, Math.ceil(total / PAGE_SIZE));
  const exportHref = `/api/admin/export?entity=leads${status ? `&status=${status}` : ""}${source ? `&source=${source}` : ""}${q ? `&q=${encodeURIComponent(q)}` : ""}`;

  async function updateStatus(formData: FormData) {
    "use server";
    const id = String(formData.get("id"));
    const status = String(formData.get("status")) as keyof typeof leadStatusLabel;
    await db.consultationLead.update({ where: { id }, data: { status } });
    revalidatePath("/admin/leads");
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h1 className="text-3xl font-semibold">咨询线索</h1>
        <a href={exportHref} className="rounded-full border border-border px-4 py-2 text-sm">
          导出 CSV
        </a>
      </div>
      <Card className="p-5">
        <form className="grid gap-4 md:grid-cols-4">
          <Input name="q" defaultValue={q} placeholder="搜索企业或联系人" />
          <Select name="source" defaultValue={source}>
            <option value="">全部来源</option>
            <option value="consultation">consultation</option>
            <option value="demo">demo</option>
            <option value="visit">visit</option>
            <option value="self_assessment">self_assessment</option>
          </Select>
          <Select name="status" defaultValue={status}>
            <option value="">全部状态</option>
            {Object.entries(leadStatusLabel).map(([value, label]) => (
              <option key={value} value={value}>
                {label}
              </option>
            ))}
          </Select>
          <button className="rounded-full bg-primary px-4 py-2 text-sm text-white">筛选</button>
        </form>
      </Card>
      <div className="space-y-4">
        {leads.map((lead) => (
          <Card key={lead.id} className="p-6">
            <div className="flex flex-col gap-4 xl:flex-row xl:items-start xl:justify-between">
              <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
                <Info label="来源" value={lead.source} />
                <Info label="联系人" value={lead.contactName} />
                <Info label="企业" value={lead.companyName ?? "-"} />
                <Info label="手机号" value={maskContact(lead.phone)} />
                <Info label="邮箱" value={maskContact(lead.email)} />
                <Info label="创建时间" value={formatDate(lead.createdAt)} />
              </div>
              <form action={updateStatus} className="flex items-center gap-3">
                <input type="hidden" name="id" value={lead.id} />
                <Select name="status" defaultValue={lead.status}>
                  {Object.entries(leadStatusLabel).map(([value, label]) => (
                    <option key={value} value={value}>
                      {label}
                    </option>
                  ))}
                </Select>
                <button className="rounded-full bg-primary px-4 py-2 text-sm text-white">更新状态</button>
              </form>
            </div>
            {lead.message ? <p className="mt-4 text-sm leading-7 text-slate-600">{lead.message}</p> : null}
          </Card>
        ))}
      </div>
      <Pagination basePath="/admin/leads" page={page} totalPages={totalPages} status={status} source={source} q={q} />
    </div>
  );
}

function Info({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-xs text-slate-500">{label}</p>
      <p className="mt-1 text-sm text-slate-900">{value}</p>
    </div>
  );
}

function Pagination({
  basePath,
  page,
  totalPages,
  status,
  source,
  q,
}: {
  basePath: string;
  page: number;
  totalPages: number;
  status?: string;
  source?: string;
  q?: string;
}) {
  const query = new URLSearchParams();
  if (status) query.set("status", status);
  if (source) query.set("source", source);
  if (q) query.set("q", q);

  const prev = new URLSearchParams(query);
  prev.set("page", String(Math.max(1, page - 1)));
  const next = new URLSearchParams(query);
  next.set("page", String(Math.min(totalPages, page + 1)));

  return (
    <div className="flex items-center justify-between text-sm text-slate-600">
      <span>
        第 {page} / {totalPages} 页
      </span>
      <div className="flex gap-3">
        <Link className="rounded-full border border-border px-4 py-2" href={`${basePath}?${prev.toString()}`}>
          上一页
        </Link>
        <Link className="rounded-full border border-border px-4 py-2" href={`${basePath}?${next.toString()}`}>
          下一页
        </Link>
      </div>
    </div>
  );
}
