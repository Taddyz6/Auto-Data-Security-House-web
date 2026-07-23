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
