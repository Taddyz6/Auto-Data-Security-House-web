import { revalidatePath } from "next/cache";
import { db } from "@/lib/db";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

export default async function AdminCasesPage() {
  const cases = await db.caseItem.findMany({ orderBy: { sortOrder: "asc" } });

  async function createCase(formData: FormData) {
    "use server";
    await db.caseItem.create({
      data: {
        title: String(formData.get("title")),
        enterpriseType: String(formData.get("enterpriseType")),
        scenario: String(formData.get("scenario")),
        direction: String(formData.get("direction")),
        dataTypes: String(formData.get("dataTypes")).split("、"),
        problem: String(formData.get("problem")),
        solution: String(formData.get("solution")),
        outcome: String(formData.get("outcome")),
        status: String(formData.get("status")) as "example" | "planned" | "implemented",
        anonymized: formData.get("anonymized") === "on",
        published: true,
        sortOrder: Number(formData.get("sortOrder") ?? 0),
      },
    });
    revalidatePath("/admin/cases");
    revalidatePath("/cases");
  }

  async function togglePublish(formData: FormData) {
    "use server";
    const id = String(formData.get("id"));
    const published = formData.get("published") === "true";
    await db.caseItem.update({ where: { id }, data: { published: !published } });
    revalidatePath("/admin/cases");
    revalidatePath("/cases");
  }

  async function removeCase(formData: FormData) {
    "use server";
    const id = String(formData.get("id"));
    await db.caseItem.delete({ where: { id } });
    revalidatePath("/admin/cases");
    revalidatePath("/cases");
  }

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-semibold">案例管理</h1>
      <Card className="p-6">
        <form action={createCase} className="grid gap-4 md:grid-cols-2">
          <Input name="title" placeholder="案例名称" required />
          <Input name="enterpriseType" placeholder="企业类型" required />
          <Input name="scenario" placeholder="业务场景" required />
          <Input name="direction" placeholder="跨境方向" required />
          <Input name="dataTypes" placeholder="数据类型，使用中文顿号分隔" required />
          <Select name="status" defaultValue="example">
            <option value="example">示例场景</option>
            <option value="planned">规划能力</option>
            <option value="implemented">已实现能力</option>
          </Select>
          <Textarea name="problem" placeholder="主要问题" className="md:col-span-2" required />
          <Textarea name="solution" placeholder="解决方式" className="md:col-span-2" required />
          <Textarea name="outcome" placeholder="实施效果" className="md:col-span-2" required />
          <Input name="sortOrder" type="number" placeholder="排序" />
          <label className="flex items-center gap-2 text-sm">
            <input type="checkbox" name="anonymized" defaultChecked />
            脱敏案例
          </label>
          <button className="rounded-full bg-primary px-4 py-2 text-sm text-white md:col-span-2">新增案例</button>
        </form>
      </Card>
      <div className="space-y-4">
        {cases.map((item) => (
          <Card key={item.id} className="p-5">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <h2 className="text-lg font-semibold">{item.title}</h2>
                <p className="mt-2 text-sm text-slate-600">{item.scenario} · {item.status} · {item.published ? "已发布" : "未发布"}</p>
              </div>
              <div className="flex gap-2">
                <form action={togglePublish}>
                  <input type="hidden" name="id" value={item.id} />
                  <input type="hidden" name="published" value={String(item.published)} />
                  <button className="rounded-full border border-border px-4 py-2 text-sm">
                    {item.published ? "下线" : "发布"}
                  </button>
                </form>
                <form action={removeCase}>
                  <input type="hidden" name="id" value={item.id} />
                  <button className="rounded-full border border-red-200 px-4 py-2 text-sm text-red-600">
                    删除
                  </button>
                </form>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
