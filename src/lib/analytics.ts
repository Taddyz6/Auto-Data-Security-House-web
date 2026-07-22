import { db } from "@/lib/db";

export async function trackEvent(event: string, path?: string, metadata?: object) {
  try {
    await db.analyticsEvent.create({
      data: {
        event,
        path,
        metadata: metadata ?? undefined,
      },
    });
  } catch {
    // Ignore analytics failures.
  }
}
