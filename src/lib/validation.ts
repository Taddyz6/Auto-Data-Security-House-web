import { z } from "zod";

export const assessmentSchema = z.object({
  companyName: z.string().trim().max(100).optional().or(z.literal("")),
  enterpriseType: z.string().trim().min(1, "请选择企业类型"),
  scenarios: z.array(z.string()).min(1, "至少选择一个业务场景"),
  transferDirection: z.string().trim().min(1, "请选择跨境方向"),
  destinations: z.array(z.string()).min(1, "至少选择一个目的地"),
  multipleCountries: z.boolean(),
  dataTypes: z.array(z.string()).min(1, "至少选择一个数据类型"),
  frequency: z.string().trim().min(1, "请选择传输频率"),
  dataVolume: z.string().trim().min(1, "请选择单次数据量"),
  currentChannels: z.array(z.string()).min(1, "至少选择一个当前方式"),
  hasApprovalProcess: z.enum(["yes", "no", "unknown"]),
  hasClassification: z.enum(["yes", "no", "unknown"]),
  hasCompleteLogs: z.enum(["yes", "no", "unknown"]),
  painPoints: z.array(z.string()).min(1, "至少选择一个主要困难"),
});
