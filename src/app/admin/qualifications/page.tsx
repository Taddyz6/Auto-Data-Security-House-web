import { revalidatePath } from "next/cache";
import { db } from "@/lib/db";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export default async function AdminQualificationsPage() {
  const qualifications = await db.qualificationItem.findMany({ orderBy: { sortOrder: "asc" } });

  async function createQualification(formData: FormData) {
    "use server";
    await db.qualificationItem.create({
      data: {
        title: String(formData.get("title")),
        issuer: String(formData.get("issuer") || ""),
        issueDate: String(formData.get("issueDate") || ""),
        description: String(formData.get("description") || ""),
        published: true,
        sortOrder: Number(formData.get("sortOrder") ?? 0),
      },
    });
    revalidatePath("/admin/qualifications");
    revalidatePath("/cases");
  }

  async function togglePublish(formData: FormData) {
    "use server";
    const id = String(formData.get("id"));
    const published = formData.get("published") === "true";
    await db.qualificationItem.update({ where: { id }, data: { published: !published } });
    revalidatePath("/admin/qualifications");
    revalidatePath("/cases");
  }

  async function removeQualification(formData: FormData) {
    "use server";
    const id = String(formData.get("id"));
    await db.qualificationItem.delete({ where: { id } });
    revalidatePath("/admin/qualifications");
    revalidatePath("/cases");
  }

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-semibold">资质管理</h1>
      <Card className="p-6">
        <form action={createQualification} className="grid gap-4 md:grid-cols-2">
          <Input name="title" placeholder="资质名称" required />
          <Input name="issuer" placeholder="颁发单位" />
          <Input name="issueDate" placeholder="获得时间" />
          <Input name="sortOrder" type="number" placeholder="排序" />
          <Textarea name="description" placeholder="简要说明" className="md:col-span-2" />
          <button className="rounded-full bg-primary px-4 py-2 text-sm text-white md:col-span-2">新增资质</button>
        </form>
      </Card>
      <div className="space-y-4">
        {qualifications.map((item) => (
          <Card key={item.id} className="p-5">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <h2 className="text-lg font-semibold">{item.title}</h2>
                <p className="mt-2 text-sm text-slate-600">{item.description}</p>
              </div>
              <div className="flex gap-2">
                <form action={togglePublish}>
                  <input type="hidden" name="id" value={item.id} />
                  <input type="hidden" name="published" value={String(item.published)} />
                  <button className="rounded-full border border-border px-4 py-2 text-sm">
                    {item.published ? "下线" : "发布"}
                  </button>
                </form>
                <form action={removeQualification}>
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
