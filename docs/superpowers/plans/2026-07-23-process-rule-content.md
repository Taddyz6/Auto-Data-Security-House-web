# Process Rule Content Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the four generic detail cards in process step 5 with verified regulation links and the 10 currently published regional/free-trade-zone negative lists.

**Architecture:** Keep legal content in a typed static data module so the client page never depends on runtime network access. Render the data through a focused `RuleMatchDetails` server-compatible component, and conditionally insert that component only when `ProcessDemo` has `activeStep === 4`.

**Tech Stack:** Next.js 16, React 19, TypeScript, Tailwind CSS 4, Vitest, React DOM server renderer

## Global Constraints

- The interface remains Chinese by default.
- Do not fabricate legal conclusions, corporate cases, qualifications, or quantified outcomes.
- Do not upload or process real enterprise cross-border data.
- Step 5 contains only “最新法规与规则” and “地方与自贸区数据出境负面清单”; do not add recommended questions.
- Regulation content is static, uses verified government or issuing-authority HTTPS links, and does not perform runtime fetching.
- Other 13 process steps, sample selection, auto-loop behavior, and simulated results remain unchanged.
- The page must state: “仅作法规信息导航与科普展示，不自动给出适用性结论。”

---

## File Structure

- Create `src/lib/regulatory-content.ts`: typed regulation and negative-list source data only.
- Create `src/lib/regulatory-content.test.ts`: content completeness, link, and date validation.
- Create `src/components/public/rule-match-details.tsx`: presentational rendering for process step 5.
- Create `src/components/public/rule-match-details.test.tsx`: rendered markup and integration contract tests.
- Modify `src/components/public/process-demo.tsx`: conditionally use `RuleMatchDetails` for `activeStep === 4`.

### Task 1: Verified Static Regulatory Data

**Files:**
- Create: `src/lib/regulatory-content.test.ts`
- Create: `src/lib/regulatory-content.ts`

**Interfaces:**
- Produces: `RegulationItem`, `NegativeListItem`, `regulationItems`, `negativeListItems`
- `RegulationItem`: `{ title: string; authority: string; publishedAt: string; sourceUrl: string }`
- `NegativeListItem`: `{ region: string; version: string; publishedAt: string; sourceUrl: string }`

- [ ] **Step 1: Write the failing data test**

```ts
import { describe, expect, it } from "vitest";
import { negativeListItems, regulationItems } from "@/lib/regulatory-content";

const expectedRegions = [
  "广东",
  "北京",
  "上海",
  "福建",
  "广西",
  "江苏",
  "重庆",
  "浙江",
  "海南",
  "天津",
];

describe("regulatory content", () => {
  it("包含已确认的汽车数据出境相关法规", () => {
    expect(regulationItems).toHaveLength(8);
    expect(regulationItems[0]).toMatchObject({
      title: "汽车数据出境安全指引（2026版）",
      publishedAt: "2026-02-03",
    });
    expect(regulationItems.map((item) => item.title)).toContain(
      "汽车数据安全管理若干规定（试行）",
    );
  });

  it("包含国家网信办专题当前收录的十个地区", () => {
    expect(negativeListItems).toHaveLength(10);
    expect(negativeListItems.map((item) => item.region)).toEqual(expectedRegions);
  });

  it("所有条目都使用 HTTPS 来源和标准日期", () => {
    for (const item of [...regulationItems, ...negativeListItems]) {
      expect(item.sourceUrl).toMatch(/^https:\/\//);
      expect(item.publishedAt).toMatch(/^\d{4}-\d{2}-\d{2}$/);
    }
  });
});
```

- [ ] **Step 2: Run the test and verify RED**

Run:

```bash
npx vitest run src/lib/regulatory-content.test.ts
```

Expected: FAIL because `@/lib/regulatory-content` does not exist.

- [ ] **Step 3: Add the minimal typed data module**

Create `src/lib/regulatory-content.ts`:

```ts
export type RegulationItem = {
  title: string;
  authority: string;
  publishedAt: string;
  sourceUrl: string;
};

export type NegativeListItem = {
  region: string;
  version: string;
  publishedAt: string;
  sourceUrl: string;
};

export const regulationItems: readonly RegulationItem[] = [
  {
    title: "汽车数据出境安全指引（2026版）",
    authority: "工业和信息化部等八部门",
    publishedAt: "2026-02-03",
    sourceUrl: "https://www.cac.gov.cn/2026-02/03/c_1771851453192164.htm",
  },
  {
    title: "个人信息出境认证办法",
    authority: "国家网信办、市场监管总局",
    publishedAt: "2025-10-17",
    sourceUrl: "https://www.cac.gov.cn/2025-10/17/c_1762449728720008.htm",
  },
  {
    title: "网络数据安全管理条例",
    authority: "国务院",
    publishedAt: "2024-09-24",
    sourceUrl: "https://xzfg.moj.gov.cn/front/law/detail?LawID=1734&Query=",
  },
  {
    title: "促进和规范数据跨境流动规定",
    authority: "国家网信办",
    publishedAt: "2024-03-22",
    sourceUrl: "https://www.cac.gov.cn/2024-03/22/c_1712776612187994.htm",
  },
  {
    title: "个人信息出境标准合同办法",
    authority: "国家网信办",
    publishedAt: "2023-02-24",
    sourceUrl: "https://www.cac.gov.cn/2023-02/24/c_1678884830036813.htm",
  },
  {
    title: "数据出境安全评估办法",
    authority: "国家网信办",
    publishedAt: "2022-07-07",
    sourceUrl: "https://www.cac.gov.cn/2022-07/07/c_1658811536396503.htm",
  },
  {
    title: "汽车数据安全管理若干规定（试行）",
    authority: "国家网信办等五部门",
    publishedAt: "2021-08-20",
    sourceUrl: "https://www.cac.gov.cn/2021-08/20/c_1631049984897667.htm",
  },
  {
    title: "中华人民共和国个人信息保护法",
    authority: "全国人大常委会",
    publishedAt: "2021-08-20",
    sourceUrl:
      "https://www.samr.gov.cn/wljys/gzzd/art/2023/art_3ef1e889c1e644d4b65b5f5c7f432386.html",
  },
];

const negativeListTopicUrl =
  "https://www.cac.gov.cn/wxzw/sjzl/sjcjfmqd/A09370806index_1.htm";

export const negativeListItems: readonly NegativeListItem[] = [
  { region: "广东", version: "2025版", publishedAt: "2026-05-18", sourceUrl: negativeListTopicUrl },
  { region: "北京", version: "2025版", publishedAt: "2026-05-11", sourceUrl: negativeListTopicUrl },
  { region: "上海", version: "2025版", publishedAt: "2026-04-29", sourceUrl: negativeListTopicUrl },
  { region: "福建", version: "2025版", publishedAt: "2025-12-25", sourceUrl: negativeListTopicUrl },
  { region: "广西", version: "2025版", publishedAt: "2025-09-05", sourceUrl: negativeListTopicUrl },
  { region: "江苏", version: "2025版", publishedAt: "2025-09-05", sourceUrl: negativeListTopicUrl },
  { region: "重庆", version: "2025版", publishedAt: "2025-09-05", sourceUrl: negativeListTopicUrl },
  { region: "浙江", version: "2024版", publishedAt: "2025-04-10", sourceUrl: negativeListTopicUrl },
  { region: "海南", version: "2024版", publishedAt: "2025-02-20", sourceUrl: negativeListTopicUrl },
  { region: "天津", version: "2024版", publishedAt: "2024-05-09", sourceUrl: negativeListTopicUrl },
];
```

- [ ] **Step 4: Run the data test and verify GREEN**

Run:

```bash
npx vitest run src/lib/regulatory-content.test.ts
```

Expected: 3 tests PASS.

- [ ] **Step 5: Commit the data task**

```bash
git add src/lib/regulatory-content.ts src/lib/regulatory-content.test.ts
git commit -m "Add verified regulatory content"
```

### Task 2: Step 5 Regulation Presentation and Integration

**Files:**
- Create: `src/components/public/rule-match-details.test.tsx`
- Create: `src/components/public/rule-match-details.tsx`
- Modify: `src/components/public/process-demo.tsx:5-9`
- Modify: `src/components/public/process-demo.tsx:226-231`

**Interfaces:**
- Consumes: `regulationItems` and `negativeListItems` from `@/lib/regulatory-content`
- Produces: `RuleMatchDetails(): React.JSX.Element`
- `ProcessDemo` renders `RuleMatchDetails` only for zero-based step index `4`

- [ ] **Step 1: Write the failing render and integration test**

Create `src/components/public/rule-match-details.test.tsx`:

```tsx
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { RuleMatchDetails } from "@/components/public/rule-match-details";

describe("RuleMatchDetails", () => {
  it("渲染法规、十个地区和边界提示", () => {
    const markup = renderToStaticMarkup(<RuleMatchDetails />);

    expect(markup).toContain("最新法规与规则");
    expect(markup).toContain("地方与自贸区数据出境负面清单");
    expect(markup).toContain("汽车数据出境安全指引（2026版）");
    expect(markup).toContain("广东");
    expect(markup).toContain("天津");
    expect(markup).toContain("仅作法规信息导航与科普展示，不自动给出适用性结论。");
    expect(markup).not.toContain("推荐问题");
    expect(markup).toContain('target="_blank"');
    expect(markup).toContain('rel="noreferrer"');
  });

  it("只在第 5 步接入专用内容", () => {
    const processSource = readFileSync(
      join(process.cwd(), "src/components/public/process-demo.tsx"),
      "utf8",
    );

    expect(processSource).toContain('import { RuleMatchDetails }');
    expect(processSource).toContain("activeStep === 4");
    expect(processSource).toContain("<RuleMatchDetails />");
  });
});
```

- [ ] **Step 2: Run the component test and verify RED**

Run:

```bash
npx vitest run src/components/public/rule-match-details.test.tsx
```

Expected: FAIL because `@/components/public/rule-match-details` does not exist.

- [ ] **Step 3: Add the minimal presentation component**

Create `src/components/public/rule-match-details.tsx`:

```tsx
import { ExternalLink } from "lucide-react";
import {
  negativeListItems,
  regulationItems,
} from "@/lib/regulatory-content";

export function RuleMatchDetails() {
  return (
    <div className="mt-6 space-y-8">
      <section aria-labelledby="latest-regulations">
        <div className="flex items-end justify-between gap-4">
          <h5 id="latest-regulations" className="font-medium text-white">
            最新法规与规则
          </h5>
          <span className="text-xs text-slate-400">8 项 · 按时间倒序</span>
        </div>
        <div className="mt-3 divide-y divide-white/8 border-y border-white/8">
          {regulationItems.map((item) => (
            <a
              key={item.title}
              href={item.sourceUrl}
              target="_blank"
              rel="noreferrer"
              className="group flex items-center justify-between gap-4 py-4"
            >
              <span className="min-w-0">
                <span className="block text-sm font-medium text-white group-hover:text-cyan-200">
                  {item.title}
                </span>
                <span className="mt-1 block text-xs leading-5 text-slate-400">
                  {item.authority} · {item.publishedAt}
                </span>
              </span>
              <ExternalLink aria-hidden="true" className="h-4 w-4 shrink-0 text-cyan-300" />
              <span className="sr-only">在新标签页查看官方来源</span>
            </a>
          ))}
        </div>
      </section>

      <section aria-labelledby="negative-lists">
        <div className="flex items-end justify-between gap-4">
          <h5 id="negative-lists" className="font-medium text-white">
            地方与自贸区数据出境负面清单
          </h5>
          <span className="shrink-0 text-xs text-slate-400">10 个地区</span>
        </div>
        <div className="mt-3 grid gap-3 sm:grid-cols-2">
          {negativeListItems.map((item) => (
            <a
              key={item.region}
              href={item.sourceUrl}
              target="_blank"
              rel="noreferrer"
              className="group rounded-2xl border border-white/8 bg-white/4 p-4 transition hover:border-cyan-300/30 hover:bg-cyan-300/8"
            >
              <span className="flex items-center justify-between gap-3">
                <span className="font-medium text-white group-hover:text-cyan-200">
                  {item.region}
                </span>
                <ExternalLink aria-hidden="true" className="h-4 w-4 text-cyan-300" />
              </span>
              <span className="mt-2 block text-xs text-slate-400">
                {item.version} · 发布于 {item.publishedAt}
              </span>
              <span className="sr-only">在新标签页查看官方来源</span>
            </a>
          ))}
        </div>
      </section>

      <p className="rounded-2xl border border-cyan-300/15 bg-cyan-300/6 px-4 py-3 text-xs leading-6 text-slate-300">
        仅作法规信息导航与科普展示，不自动给出适用性结论。
      </p>
    </div>
  );
}
```

- [ ] **Step 4: Integrate the component only for step 5**

Add the import to `src/components/public/process-demo.tsx`:

```tsx
import { RuleMatchDetails } from "@/components/public/rule-match-details";
```

Replace the existing detail grid with:

```tsx
{activeStep === 4 ? (
  <RuleMatchDetails />
) : (
  <div className="mt-6 grid gap-4 md:grid-cols-2">
    <InfoCard label="主要输入" value={stepDetails[activeStep].input} />
    <InfoCard label="系统动作" value={stepDetails[activeStep].action} />
    <InfoCard label="可能输出" value={stepDetails[activeStep].output} />
    <InfoCard label="风险点" value={stepDetails[activeStep].risk} />
  </div>
)}
```

- [ ] **Step 5: Run focused tests and verify GREEN**

Run:

```bash
npx vitest run src/lib/regulatory-content.test.ts src/components/public/rule-match-details.test.tsx
```

Expected: 5 tests PASS.

- [ ] **Step 6: Run module quality gates**

Run:

```bash
npm run lint
npm run typecheck
npm test
npm run build
```

Expected: every command exits with status 0.

- [ ] **Step 7: Commit the presentation task**

```bash
git add src/components/public/rule-match-details.tsx src/components/public/rule-match-details.test.tsx src/components/public/process-demo.tsx
git commit -m "Show regulations in process step five"
```

### Task 3: Responsive Visual Verification

**Files:**
- Modify only if visual verification exposes a defect:
  - `src/components/public/rule-match-details.tsx`
  - `src/components/public/process-demo.tsx`

**Interfaces:**
- Consumes the completed `/process` page.
- Produces verified desktop and narrow-screen rendering without text overflow or nested scrolling.

- [ ] **Step 1: Start the local site**

Run:

```bash
npm run dev
```

Expected: Next.js reports the local development URL without compilation errors.

- [ ] **Step 2: Inspect desktop rendering**

Open `/process`, select step 5, and verify:

- the regulation list appears above the negative-list grid;
- all 8 regulations and all 10 regions are present;
- long titles wrap without covering the external-link icon;
- there is no independent inner scrollbar;
- no recommended-question section is present.

- [ ] **Step 3: Inspect narrow rendering**

At a viewport width near 390 px, verify:

- the negative-list grid collapses to one column;
- headings and counts remain readable;
- external links remain keyboard-focusable;
- steps other than step 5 still show the original four information cards.

- [ ] **Step 4: Re-run final verification**

Run:

```bash
npm run lint
npm run typecheck
npm test
npm run build
```

Expected: every command exits with status 0 after any visual correction.
