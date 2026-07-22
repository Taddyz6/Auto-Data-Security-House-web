import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { trackEvent } from "@/lib/analytics";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  const resource = await db.resourceItem.findUnique({ where: { id } });
  if (!resource) {
    return NextResponse.json({ error: "资源不存在" }, { status: 404 });
  }

  await db.resourceItem.update({
    where: { id },
    data: { downloadCount: { increment: 1 } },
  });
  await trackEvent("resource_download", `/resources/${id}`);

  return NextResponse.redirect(new URL(resource.fileUrl, request.url));
}
