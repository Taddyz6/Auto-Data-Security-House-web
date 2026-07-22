import { NextResponse } from "next/server";
import { z } from "zod";
import { trackEvent } from "@/lib/analytics";

const schema = z.object({
  event: z.string().min(1).max(100),
  path: z.string().min(1).max(200).optional(),
});

export async function POST(request: Request) {
  try {
    const json = await request.json();
    const parsed = schema.safeParse(json);
    if (!parsed.success) {
      return NextResponse.json({ error: "参数错误" }, { status: 400 });
    }

    await trackEvent(parsed.data.event, parsed.data.path);
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "记录失败" }, { status: 500 });
  }
}
