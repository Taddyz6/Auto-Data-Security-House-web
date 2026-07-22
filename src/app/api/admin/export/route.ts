import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { getAdminSession } from "@/lib/auth";
import { toCsvValue } from "@/lib/utils";

export async function GET(request: Request) {
  const session = await getAdminSession();
  if (!session) {
    return NextResponse.json({ error: "未授权" }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const entity = searchParams.get("entity");
  const status = searchParams.get("status");
  const source = searchParams.get("source");
  const q = searchParams.get("q");
  const level = searchParams.get("level");

  if (entity === "leads") {
    const leads = await db.consultationLead.findMany({
      where: {
        ...(status ? { status: status as never } : {}),
        ...(source ? { source: source as never } : {}),
        ...(q
          ? {
              OR: [
                { companyName: { contains: q } },
                { contactName: { contains: q } },
              ],
            }
          : {}),
      },
      orderBy: { createdAt: "desc" },
    });
    const rows = [
      ["id", "source", "companyName", "contactName", "phone", "email", "status", "createdAt"],
      ...leads.map((item) => [
        item.id,
        item.source,
        item.companyName ?? "",
        item.contactName,
        item.phone ?? "",
        item.email ?? "",
        item.status,
        item.createdAt.toISOString(),
      ]),
    ];
    const csv = rows.map((row) => row.map(toCsvValue).join(",")).join("\n");
    return new Response(csv, {
      headers: {
        "Content-Type": "text/csv; charset=utf-8",
        "Content-Disposition": 'attachment; filename="leads.csv"',
      },
    });
  }

  if (entity === "assessments") {
    const items = await db.assessmentRecord.findMany({
      where: {
        ...(level ? { resultLevel: level as never } : {}),
        ...(q
          ? {
              OR: [
                { enterpriseType: { contains: q } },
                { companyName: { contains: q } },
              ],
            }
          : {}),
      },
      orderBy: { createdAt: "desc" },
    });
    const rows = [
      ["id", "enterpriseType", "scenarios", "dataTypes", "totalScore", "resultLevel", "createdAt"],
      ...items.map((item) => [
        item.id,
        item.enterpriseType,
        item.scenarios,
        item.dataTypes,
        item.totalScore,
        item.resultLevel,
        item.createdAt.toISOString(),
      ]),
    ];
    const csv = rows.map((row) => row.map(toCsvValue).join(",")).join("\n");
    return new Response(csv, {
      headers: {
        "Content-Type": "text/csv; charset=utf-8",
        "Content-Disposition": 'attachment; filename="assessments.csv"',
      },
    });
  }

  return NextResponse.json({ error: "不支持的导出实体" }, { status: 400 });
}
