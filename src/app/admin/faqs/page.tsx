import { revalidatePath } from "next/cache";
import { db } from "@/lib/db";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export default async function AdminFaqsPage() {
  const faqs = await db.faqItem.findMany({ orderBy: { sortOrder: "asc" } });

  async function createFaq(formData: FormData) {
    "use server";
    await db.faqItem.create({
      data: {
        question: String(formData.get("question")),
        answer: String(formData.get("answer")),
        published: true,
        sortOrder: Number(formData.get("sortOrder") ?? 0),
      },
    });
    revalidatePath("/admin/faqs");
    revalidatePath("/about");
    revalidatePath("/");
  }

  async function togglePublish(formData: FormData) {
    "use server";
    const id = String(formData.get("id"));
    const published = formData.get("published") === "true";
    await db.faqItem.update({ where: { id }, data: { published: !published } });
    revalidatePath("/admin/faqs");
    revalidatePath("/about");
    revalidatePath("/");
  }

  async function removeFaq(formData: FormData) {
    "use server";
    const id = String(formData.get("id"));
    await db.faqItem.delete({ where: { id } });
    revalidatePath("/admin/faqs");
    revalidatePath("/about");
    revalidatePath("/");
  }

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-semibold">FAQ 管理</h1>
      <Card className="p-6">
        <form action={createFaq} className="grid gap-4">
          <Input name="question" placeholder="问题" required />
          <Textarea name="answer" placeholder="答案" required />
          <Input name="sortOrder" type="number" placeholder="排序" />
          <button className="rounded-full bg-primary px-4 py-2 text-sm text-white">新增 FAQ</button>
        </form>
      </Card>
      <div className="space-y-4">
        {faqs.map((item) => (
          <Card key={item.id} className="p-5">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <h2 className="text-lg font-semibold">{item.question}</h2>
                <p className="mt-2 text-sm text-slate-600">{item.answer}</p>
              </div>
              <div className="flex gap-2">
                <form action={togglePublish}>
                  <input type="hidden" name="id" value={item.id} />
                  <input type="hidden" name="published" value={String(item.published)} />
                  <button className="rounded-full border border-border px-4 py-2 text-sm">
                    {item.published ? "下线" : "发布"}
                  </button>
                </form>
                <form action={removeFaq}>
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
