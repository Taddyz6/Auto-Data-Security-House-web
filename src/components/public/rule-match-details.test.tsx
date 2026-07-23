import { readFileSync } from "node:fs";
import { join } from "node:path";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { RuleMatchDetails } from "@/components/public/rule-match-details";
import { processSteps } from "@/lib/constants";

describe("RuleMatchDetails", () => {
  it("渲染法规、十个地区和边界提示", () => {
    const markup = renderToStaticMarkup(<RuleMatchDetails />);

    expect(markup).toContain("最新法规与规则");
    expect(markup).toContain("地方与自贸区数据出境负面清单");
    expect(markup).toContain("汽车数据出境安全指引（2026版）");
    expect(markup).toContain("广东");
    expect(markup).toContain("天津");
    expect(markup).toContain(
      "仅作法规信息导航与科普展示，不自动给出适用性结论。",
    );
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

  it("第 5 步只称国内规则匹配", () => {
    const processSource = readFileSync(
      join(process.cwd(), "src/components/public/process-demo.tsx"),
      "utf8",
    );

    expect(processSteps[4]).toBe("国内规则匹配");
    expect(processSource).not.toContain("境内外规则");
  });
});
