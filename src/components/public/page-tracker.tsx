"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

const eventMap: Record<string, string> = {
  "/": "home_view",
  "/process": "process_view",
  "/assessment": "assessment_start",
};

export function PageTracker() {
  const pathname = usePathname();

  useEffect(() => {
    const event = eventMap[pathname] ?? "page_view";
    void fetch("/api/analytics", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ event, path: pathname }),
    }).catch(() => undefined);
  }, [pathname]);

  return null;
}
