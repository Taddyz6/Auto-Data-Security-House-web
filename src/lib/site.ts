import { db } from "@/lib/db";

export async function getSiteSettings() {
  const settings = await db.siteSetting.findMany();
  return Object.fromEntries(settings.map((item) => [item.key, item.value]));
}
