# Process Auto-Play Timing Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Make the process demo advance every 5 seconds, wait 15 seconds after every manual step click, and reset that 15-second wait on repeated clicks.

**Architecture:** Put the two timing values and the delay selector in a small pure module. Replace the component’s fixed interval with one resettable timeout driven by manual-pause state and a click reset counter, while preserving the existing reduced-motion and sample-wrap behavior.

**Tech Stack:** React 19, TypeScript, Next.js 16, Vitest

## Global Constraints

- Every step, including step 5, uses a 5000 ms automatic delay.
- Every manual step click uses a 15000 ms delay before the next automatic advance.
- Repeated manual clicks, including clicking the already-active step, restart the 15000 ms delay.
- Reduced-motion mode starts no automatic timer.
- Do not add playback controls or modify step content, sample content, animations, or regulation rendering.
- Preserve the existing sample change when the process wraps from step 14 to step 1.

---

## File Structure

- Create `src/lib/process-auto-play.ts`: timing constants and pure delay selection.
- Create `src/lib/process-auto-play.test.ts`: timing and integration contract tests.
- Modify `src/components/public/process-demo.tsx`: replace the interval with a resettable timeout and manual-click delay reset.

### Task 1: Resettable Process Auto-Play

**Files:**
- Create: `src/lib/process-auto-play.test.ts`
- Create: `src/lib/process-auto-play.ts`
- Modify: `src/components/public/process-demo.tsx:3-123`
- Modify: `src/components/public/process-demo.tsx:176`

**Interfaces:**
- Produces: `PROCESS_AUTO_ADVANCE_MS: 5000`
- Produces: `PROCESS_MANUAL_RESUME_MS: 15000`
- Produces: `getProcessAdvanceDelay(isManualPauseActive: boolean): number`
- `ProcessDemo` consumes the helper and resets the manual delay through `manualResetKey`

- [ ] **Step 1: Write the failing timing and integration tests**

Create `src/lib/process-auto-play.test.ts`:

```ts
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
```

- [ ] **Step 2: Run the focused test and verify RED**

Run:

```bash
npx vitest run src/lib/process-auto-play.test.ts
```

Expected: FAIL because `@/lib/process-auto-play` does not exist.

- [ ] **Step 3: Add the minimal timing module**

Create `src/lib/process-auto-play.ts`:

```ts
export const PROCESS_AUTO_ADVANCE_MS = 5_000;
export const PROCESS_MANUAL_RESUME_MS = 15_000;

export function getProcessAdvanceDelay(isManualPauseActive: boolean) {
  return isManualPauseActive
    ? PROCESS_MANUAL_RESUME_MS
    : PROCESS_AUTO_ADVANCE_MS;
}
```

- [ ] **Step 4: Replace the fixed interval with a resettable timeout**

Add the import in `src/components/public/process-demo.tsx`:

```tsx
import { getProcessAdvanceDelay } from "@/lib/process-auto-play";
```

Add state after `activeStep`:

```tsx
const [manualPauseActive, setManualPauseActive] = useState(false);
const [manualResetKey, setManualResetKey] = useState(0);
```

Replace the existing effect with:

```tsx
useEffect(() => {
  if (reduce) return;

  const timer = window.setTimeout(() => {
    setManualPauseActive(false);
    setActiveStep((value) => {
      const nextStep = (value + 1) % processSteps.length;
      if (nextStep === 0) {
        setActiveSample((current) => {
          const currentIndex = sampleKeys.indexOf(current);
          return sampleKeys[(currentIndex + 1) % sampleKeys.length];
        });
      }
      return nextStep;
    });
  }, getProcessAdvanceDelay(manualPauseActive));

  return () => window.clearTimeout(timer);
}, [activeStep, manualPauseActive, manualResetKey, reduce]);
```

Add the click handler:

```tsx
function handleStepSelect(index: number) {
  setActiveStep(index);
  setManualPauseActive(true);
  setManualResetKey((value) => value + 1);
}
```

Change the step button action to:

```tsx
onClick={() => handleStepSelect(index)}
```

- [ ] **Step 5: Run the focused test and verify GREEN**

Run:

```bash
npx vitest run src/lib/process-auto-play.test.ts
```

Expected: 3 tests PASS.

- [ ] **Step 6: Run all quality gates**

Run:

```bash
npm run lint
npm run typecheck
npm test
npm run build
```

Expected: every command exits with status 0.

- [ ] **Step 7: Commit**

```bash
git add src/lib/process-auto-play.ts src/lib/process-auto-play.test.ts src/components/public/process-demo.tsx
git commit -m "Adjust process autoplay timing"
```
