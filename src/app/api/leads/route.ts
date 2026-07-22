import { LeadPreference, LeadSource } from "@prisma/client";
import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { leadSchema } from "@/lib/validation";
import { rateLimit } from "@/lib/rate-limit";
import { trackEvent } from "@/lib/analytics";

export async function POST(request: Request) {
  try {
    const forwardedFor = request.headers.get("x-forwarded-for") ?? "unknown";
    const limited = rateLimit(`lead:${forwardedFor}`, 10, 60_000);
    if (!limited.success) {
      return NextResponse.json({ error: "提交过于频繁，请稍后再试。" }, { status: 429 });
    }

    const json = await request.json();
    const parsed = leadSchema.safeParse(json);
    if (!parsed.success) {
      return NextResponse.json(
        { error: parsed.error.issues[0]?.message ?? "参数错误" },
        { status: 400 },
      );
    }
    if (parsed.data.honeypot) {
      return NextResponse.json({ error: "非法请求" }, { status: 400 });
    }

    const lead = await db.consultationLead.create({
      data: {
        source: parsed.data.source as LeadSource,
        companyName: parsed.data.companyName || undefined,
        contactName: parsed.data.contactName,
        jobTitle: parsed.data.jobTitle || undefined,
        phone: parsed.data.phone || undefined,
        email: parsed.data.email || undefined,
        preferredContact: parsed.data.preferredContact as LeadPreference | undefined,
        expectedContactTime: parsed.data.expectedContactTime || undefined,
        message: parsed.data.message || undefined,
        consent: parsed.data.consent,
      },
    });

    const eventMap = {
      consultation: "consultation_submit",
      demo: "demo_submit",
      visit: "visit_submit",
      self_assessment: "assessment_lead_submit",
    } as const;

    await trackEvent(eventMap[parsed.data.source], "/contact");
    return NextResponse.json({ id: lead.id, success: true });
  } catch {
    return NextResponse.json({ error: "服务暂时不可用，请稍后重试。" }, { status: 500 });
  }
}
