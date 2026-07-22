import { NextResponse } from "next/server";
import { assessmentSchema } from "@/lib/validation";
import { calculateAssessment } from "@/lib/assessment-score";
import { db } from "@/lib/db";
import { rateLimit } from "@/lib/rate-limit";
import { trackEvent } from "@/lib/analytics";

export async function POST(request: Request) {
  try {
    const forwardedFor = request.headers.get("x-forwarded-for") ?? "unknown";
    const limited = rateLimit(`assessment:${forwardedFor}`, 20, 60_000);
    if (!limited.success) {
      return NextResponse.json({ error: "请求过于频繁，请稍后重试。" }, { status: 429 });
    }

    const json = await request.json();
    const parsed = assessmentSchema.safeParse(json);
    if (!parsed.success) {
      return NextResponse.json(
        { error: parsed.error.issues[0]?.message ?? "参数错误" },
        { status: 400 },
      );
    }

    const result = calculateAssessment(parsed.data);
    const record = await db.assessmentRecord.create({
      data: {
        ...parsed.data,
        complexityScore: result.complexityScore,
        sensitivityScore: result.sensitivityScore,
        maturityGapScore: result.maturityGapScore,
        totalScore: result.totalScore,
        resultLevel: result.resultLevel,
        recommendations: result.recommendations,
        focusItems: result.focusItems,
      },
    });

    await trackEvent("assessment_complete", "/assessment", {
      resultLevel: result.resultLevel,
      totalScore: result.totalScore,
    });

    return NextResponse.json({
      assessmentId: record.id,
      scores: {
        complexity: result.complexityScore,
        sensitivity: result.sensitivityScore,
        maturityGap: result.maturityGapScore,
        total: result.totalScore,
      },
      resultLevel: result.resultLevel,
      title: result.title,
      recommendations: result.recommendations,
    });
  } catch {
    return NextResponse.json({ error: "服务暂时不可用，请稍后重试。" }, { status: 500 });
  }
}
