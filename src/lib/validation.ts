import { z } from "zod";

const phoneSchema = z
  .string()
  .trim()
  .regex(/^1\d{10}$/, "请输入有效手机号")
  .optional()
  .or(z.literal(""));

const emailSchema = z
  .string()
  .trim()
  .email("请输入有效邮箱")
  .optional()
  .or(z.literal(""));

export const leadSchema = z
  .object({
    source: z.enum(["self_assessment", "consultation", "demo", "visit"]),
    companyName: z.string().trim().max(100).optional().or(z.literal("")),
    contactName: z.string().trim().min(2, "请填写联系人"),
    jobTitle: z.string().trim().max(50).optional().or(z.literal("")),
    phone: phoneSchema,
    email: emailSchema,
    preferredContact: z.enum(["phone", "email", "wechat", "meeting"]).optional(),
    expectedContactTime: z.string().trim().max(100).optional().or(z.literal("")),
    message: z.string().trim().max(500).optional().or(z.literal("")),
    consent: z.boolean().refine((value) => value, {
      message: "请勾选隐私同意",
    }),
    honeypot: z.string().max(0).optional().default(""),
  })
  .superRefine((data, ctx) => {
    if (!data.phone && !data.email) {
      ctx.addIssue({
        code: "custom",
        message: "手机或邮箱至少填写一项",
        path: ["phone"],
      });
    }
  });

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

export const adminLoginSchema = z.object({
  email: z.string().email("请输入有效邮箱"),
  password: z.string().min(8, "密码至少 8 位"),
});
