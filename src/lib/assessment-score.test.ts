import { describe, expect, it } from "vitest";
import { calculateAssessment } from "@/lib/assessment-score";

describe("calculateAssessment", () => {
  it("returns basic for low-complexity scenario", () => {
    const result = calculateAssessment({
      enterpriseType: "零部件企业",
      scenarios: ["供应链协同"],
      transferDirection: "中国境内传向境外",
      destinations: ["东南亚"],
      multipleCountries: false,
      dataTypes: ["生产、质量、供应链数据"],
      frequency: "每月",
      dataVolume: "小于 100MB",
      currentChannels: ["企业网盘"],
      hasApprovalProcess: "yes",
      hasClassification: "yes",
      hasCompleteLogs: "yes",
      painPoints: ["缺乏专业人员"],
    });

    expect(result.totalScore).toBe(2);
    expect(result.resultLevel).toBe("basic");
  });

  it("returns security house for high-risk frequent scenario", () => {
    const result = calculateAssessment({
      enterpriseType: "整车企业",
      scenarios: ["海外路试", "海外车联网运营", "跨国研发"],
      transferDirection: "双向传输",
      destinations: ["欧盟", "美国/加拿大"],
      multipleCountries: true,
      dataTypes: ["位置轨迹", "视频、图像、点云", "软件代码和算法", "VIN 和车辆标识"],
      frequency: "实时",
      dataVolume: "10GB—1TB",
      currentChannels: ["邮件", "公共网盘"],
      hasApprovalProcess: "unknown",
      hasClassification: "no",
      hasCompleteLogs: "no",
      painPoints: ["人工审核慢", "无法持续监测"],
    });

    expect(result.complexityScore).toBe(7);
    expect(result.sensitivityScore).toBe(7);
    expect(result.maturityGapScore).toBe(5);
    expect(result.resultLevel).toBe("security_house");
  });
});
