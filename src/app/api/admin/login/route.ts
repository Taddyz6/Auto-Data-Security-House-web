import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { createAdminSession, verifyPassword } from "@/lib/auth";
import { adminLoginSchema } from "@/lib/validation";

export async function POST(request: Request) {
  try {
    const json = await request.json();
    const parsed = adminLoginSchema.safeParse(json);
    if (!parsed.success) {
      return NextResponse.json({ error: parsed.error.issues[0]?.message ?? "参数错误" }, { status: 400 });
    }

    const admin = await db.adminUser.findUnique({ where: { email: parsed.data.email } });
    if (!admin) {
      return NextResponse.json({ error: "账号或密码错误" }, { status: 401 });
    }

    const valid = await verifyPassword(parsed.data.password, admin.passwordHash);
    if (!valid) {
      return NextResponse.json({ error: "账号或密码错误" }, { status: 401 });
    }

    await createAdminSession({ email: admin.email });
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "登录失败，请稍后重试。" }, { status: 500 });
  }
}
