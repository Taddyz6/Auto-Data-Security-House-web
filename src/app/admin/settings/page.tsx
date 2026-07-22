import { revalidatePath } from "next/cache";
import { db } from "@/lib/db";
import { Card } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";

export default async function AdminSettingsPage() {
  const hero = await db.siteSetting.findUnique({ where: { key: "homeHeroSubtitle" } });

  async function updateHero(formData: FormData) {
    "use server";
    await db.siteSetting.upsert({
      where: { key: "homeHeroSubtitle" },
      update: { value: String(formData.get("value")) },
      create: { key: "homeHeroSubtitle", value: String(formData.get("value")) },
    });
    revalidatePath("/");
    revalidatePath("/admin/settings");
  }

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-semibold">首页基础文案</h1>
      <Card className="p-6">
        <form action={updateHero} className="space-y-4">
          <Textarea name="value" defaultValue={hero?.value ?? ""} placeholder="首页副标题" />
          <button className="rounded-full bg-primary px-4 py-2 text-sm text-white">更新首页副标题</button>
        </form>
      </Card>
    </div>
  );
}
