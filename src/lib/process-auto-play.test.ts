import { readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import {
  getProcessAdvanceDelay,
  PROCESS_AUTO_ADVANCE_MS,
  PROCESS_MANUAL_RESUME_MS,
} from "@/lib/process-auto-play";

describe("process auto-play timing", () => {
  it("自动播放每五秒前进一步", () => {
    expect(PROCESS_AUTO_ADVANCE_MS).toBe(5_000);
    expect(getProcessAdvanceDelay(false)).toBe(5_000);
  });

  it("手动点击后等待十五秒", () => {
    expect(PROCESS_MANUAL_RESUME_MS).toBe(15_000);
    expect(getProcessAdvanceDelay(true)).toBe(15_000);
  });

  it("使用可重置的单次计时并保留减少动态效果判断", () => {
    const source = readFileSync(
      join(process.cwd(), "src/components/public/process-demo.tsx"),
      "utf8",
    );

    expect(source).toContain("window.setTimeout");
    expect(source).not.toContain("window.setInterval");
    expect(source).toContain("if (reduce) return");
    expect(source).toContain("setManualPauseActive(true)");
    expect(source).toContain("setManualResetKey((value) => value + 1)");
    expect(source).toContain("getProcessAdvanceDelay(manualPauseActive)");
  });
});
