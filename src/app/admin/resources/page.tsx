import { revalidatePath } from "next/cache";
import { db } from "@/lib/db";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

export default async function AdminResourcesPage() {
  const resources = await db.resourceItem.findMany({ orderBy: { createdAt: "desc" } });

  async function createResource(formData: FormData) {
    "use server";
    await db.resourceItem.create({
      data: {
        title: String(formData.get("title")),
        category: String(formData.get("category")) as "whitepaper" | "checklist" | "solution" | "policy",
        description: String(formData.get("description") || ""),
        fileUrl: String(formData.get("fileUrl")),
        published: true,
      },
    });
    revalidatePath("/admin/resources");
    revalidatePath("/cases");
  }

  async function togglePublish(formData: FormData) {
    "use server";
    const id = String(formData.get("id"));
    const published = formData.get("published") === "true";
    await db.resourceItem.update({ where: { id }, data: { published: !published } });
    revalidatePath("/admin/resources");
    revalidatePath("/cases");
  }

  async function removeResource(formData: FormData) {
    "use server";
    const id = String(formData.get("id"));
    await db.resourceItem.delete({ where: { id } });
    revalidatePath("/admin/resources");
    revalidatePath("/cases");
  }

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-semibold">资料管理</h1>
      <Card className="p-6">
        <form action={createResource} className="grid gap-4 md:grid-cols-2">
          <Input name="title" placeholder="资料标题" required />
          <Select name="category" defaultValue="whitepaper">
            <option value="whitepaper">whitepaper</option>
            <option value="checklist">checklist</option>
            <option value="solution">solution</option>
            <option value="policy">policy</option>
          </Select>
          <Input name="fileUrl" placeholder="资料链接或相对路径" required />
          <Textarea name="description" placeholder="资料说明" className="md:col-span-2" />
          <button className="rounded-full bg-primary px-4 py-2 text-sm text-white md:col-span-2">新增资料</button>
        </form>
      </Card>
      <div className="space-y-4">
        {resources.map((item) => (
          <Card key={item.id} className="p-5">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <h2 className="text-lg font-semibold">{item.title}</h2>
                <p className="mt-2 text-sm text-slate-600">{item.description}</p>
                <p className="mt-2 text-xs text-slate-500">下载量：{item.downloadCount} · {item.published ? "已发布" : "未发布"}</p>
              </div>
              <div className="flex gap-2">
                <form action={togglePublish}>
                  <input type="hidden" name="id" value={item.id} />
                  <input type="hidden" name="published" value={String(item.published)} />
                  <button className="rounded-full border border-border px-4 py-2 text-sm">
                    {item.published ? "下线" : "发布"}
                  </button>
                </form>
                <form action={removeResource}>
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
