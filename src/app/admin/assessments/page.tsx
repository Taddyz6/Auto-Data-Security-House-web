import Link from "next/link";
import { db } from "@/lib/db";
import { formatDate } from "@/lib/utils";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";

const PAGE_SIZE = 10;

export default async function AdminAssessmentsPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const params = await searchParams;
  const page = Math.max(1, Number(params.page ?? 1));
  const level = typeof params.level === "string" ? params.level : "";
  const q = typeof params.q === "string" ? params.q.trim() : "";
  const where = {
    ...(level ? { resultLevel: level as "basic" | "process" | "security_house" } : {}),
    ...(q
      ? {
          OR: [
            { enterpriseType: { contains: q } },
            { companyName: { contains: q } },
          ],
        }
      : {}),
  };
  const [assessments, total] = await Promise.all([
    db.assessmentRecord.findMany({
      where,
      orderBy: { createdAt: "desc" },
      skip: (page - 1) * PAGE_SIZE,
      take: PAGE_SIZE,
    }),
    db.assessmentRecord.count({ where }),
  ]);
  const totalPages = Math.max(1, Math.ceil(total / PAGE_SIZE));
  const exportHref = `/api/admin/export?entity=assessments${level ? `&level=${level}` : ""}${q ? `&q=${encodeURIComponent(q)}` : ""}`;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-semibold">自测记录</h1>
        <a href={exportHref} className="rounded-full border border-border px-4 py-2 text-sm">导出 CSV</a>
      </div>
      <Card className="p-5">
        <form className="grid gap-4 md:grid-cols-3">
          <Input name="q" defaultValue={q} placeholder="搜索企业类型或企业名称" />
          <Select name="level" defaultValue={level}>
            <option value="">全部等级</option>
            <option value="basic">basic</option>
            <option value="process">process</option>
            <option value="security_house">security_house</option>
          </Select>
          <button className="rounded-full bg-primary px-4 py-2 text-sm text-white">筛选</button>
        </form>
      </Card>
      <div className="space-y-4">
        {assessments.map((item) => (
          <Card key={item.id} className="p-6">
            <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-4">
              <Info label="企业类型" value={item.enterpriseType} />
              <Info label="总分" value={String(item.totalScore)} />
              <Info label="结果等级" value={item.resultLevel} />
              <Info label="创建时间" value={formatDate(item.createdAt)} />
            </div>
            <p className="mt-4 text-sm leading-7 text-slate-600">
              场景：{(item.scenarios as string[]).join("、")}；数据类型：{(item.dataTypes as string[]).join("、")}
            </p>
          </Card>
        ))}
      </div>
      <Pagination basePath="/admin/assessments" page={page} totalPages={totalPages} level={level} q={q} />
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
  level,
  q,
}: {
  basePath: string;
  page: number;
  totalPages: number;
  level?: string;
  q?: string;
}) {
  const query = new URLSearchParams();
  if (level) query.set("level", level);
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
