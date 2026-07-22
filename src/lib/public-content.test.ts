import { readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";

function source(path: string) {
  return readFileSync(join(process.cwd(), path), "utf8");
}

describe("public page content", () => {
  it("移除指定提示并使用面向企业的专业表达", () => {
    const contact = source("src/app/contact/page.tsx");
    const footer = source("src/components/layout/footer.tsx");
    const home = source("src/app/page.tsx");
    const about = source("src/app/about/page.tsx");
    const assessment = source("src/app/assessment/page.tsx");
    const cases = source("src/app/cases/page.tsx");
    const header = source("src/components/layout/header.tsx");
    const wordmark = source("src/components/layout/catarc-wordmark.tsx");
    const heroFlow = source("src/components/public/hero-flow.tsx");

    expect(contact).not.toContain("联系说明");
    expect(footer).not.toContain("不处理企业真实跨境数据");
    expect(home).not.toContain("<SiteDisclaimer compact />");
    expect(about).not.toContain('title="合规提示"');
    expect(assessment).not.toContain('title="结果边界"');
    expect(home).toContain("行业场景与治理实践");
    expect(home).toContain("生成结构化风险诊断与改进建议");
    expect(cases).toContain("行业场景案例");
    expect(cases).not.toContain("MVP 使用脱敏案例或示例案例");
    expect(header).toContain("<CatarcWordmark");
    expect(header).not.toContain(">CATARC<");
    expect(header).not.toContain("<CatarcMark");
    expect(wordmark).toContain('fill="white"');
    expect(wordmark).not.toContain("<ellipse");
    expect(home).toContain("<HoverBorderGradient");
    expect(home).toContain("<WorldMap");
    expect(home.indexOf("<WorldMap")).toBeLessThan(home.indexOf("<HeroFlow"));
    expect(home).toContain('label: "上海"');
    expect(home).toContain('label: "重庆"');
    expect(home).toContain('label: "新加坡"');
    expect(heroFlow).not.toContain("rounded-[34px] border border-white/10");
  });
});
