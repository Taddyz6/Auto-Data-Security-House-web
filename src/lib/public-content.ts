export const siteSettings = {
  homeHeroSubtitle:
    "面向跨国研发、海外路试、车联网运营、电池碳数据和全球供应链场景，提供数据识别、合规预审、安全传输、风险监测和存证审计的一体化能力展示。",
} as const;

export type CaseStatus = "example" | "planned" | "implemented";

export type CaseItem = {
  id: string;
  title: string;
  enterpriseType: string;
  scenario: string;
  direction: string;
  dataTypes: string[];
  problem: string;
  solution: string;
  outcome: string;
  status: CaseStatus;
  anonymized: boolean;
};

export const caseItems: CaseItem[] = [
  {
    id: "global-rd-transfer",
    title: "跨国联合研发文件传输",
    enterpriseType: "整车企业",
    scenario: "跨国联合研发",
    direction: "中国境内传向境外",
    dataTypes: ["研发图纸和技术文件", "软件代码和算法"],
    problem: "研发图纸与代码跨区域协同时，人工审核慢且权限边界不清。",
    solution: "通过模拟预审、人工复核和最小化授权流程，统一跨境任务入口与留痕。",
    outcome: "形成可演示的跨境任务闭环，便于后续咨询与方案设计。",
    status: "example",
    anonymized: true,
  },
  {
    id: "overseas-aftersales-log",
    title: "海外售后诊断日志回传",
    enterpriseType: "车联网运营企业",
    scenario: "售后诊断",
    direction: "境外传向中国",
    dataTypes: ["车辆运行和故障日志", "VIN 和车辆标识"],
    problem: "日志可能夹带 VIN、账号与设备标识，缺少统一回传策略。",
    solution: "先识别非必要标识，再按项目和时效授权回传，并生成审计记录。",
    outcome: "帮助企业梳理售后日志回传的重点控制点和演示流程。",
    status: "example",
    anonymized: true,
  },
  {
    id: "battery-carbon-collaboration",
    title: "电池碳足迹数据协同",
    enterpriseType: "动力电池企业",
    scenario: "动力电池碳足迹",
    direction: "中国境内传向境外",
    dataTypes: ["电池和碳足迹数据", "生产、质量、供应链数据"],
    problem: "供应链字段多、用途复杂，难以快速说明哪些字段需要最小化处理。",
    solution: "按字段做最小化核验，明确接收方与境外使用范围，并输出模拟审计记录。",
    outcome: "用于展示电池护照与碳数据协同场景下的治理思路。",
    status: "example",
    anonymized: true,
  },
];

export type FaqItem = {
  id: string;
  question: string;
  answer: string;
};

export const faqItems: FaqItem[] = [
  {
    id: "safehouse-vs-line",
    question: "安全屋和普通专线有什么区别？",
    answer:
      "普通专线主要解决网络连通，安全屋强调数据识别、预审、监测、存证和流程留痕，适合持续、高频、复杂的跨境业务。",
  },
  {
    id: "assessment-boundary",
    question: "做了自测是否代表已经合规？",
    answer:
      "不是。自测只提供模拟需求诊断，不构成正式法律意见或监管结论，企业仍需结合具体数据和规则开展专项评估。",
  },
  {
    id: "file-upload-boundary",
    question: "网站会接收企业真实文件吗？",
    answer: "不会。网站不上传、不处理企业真实跨境数据，也不接入真实跨境传输系统。",
  },
];

export type QualificationItem = {
  id: string;
  title: string;
  issuer?: string;
  issueDate?: string;
  description?: string;
};

export const qualificationItems: QualificationItem[] = [
  {
    id: "capability-building",
    title: "相关能力与成果持续建设中",
    issuer: "公开说明",
    issueDate: "2026-07",
    description: "当前页展示为公开说明，不虚构资质证书或监管结论。",
  },
];

export type DownloadResource = {
  id: string;
  title: string;
  description: string;
  fileType: "PDF" | "DOCX" | "XLSX";
  fileUrl: `/downloads/${string}`;
};

export const downloadResources: DownloadResource[] = [
  {
    id: "data-cross-border-security-foundation-v1-1",
    title: "深耕车企全球化运营实践，搭建数据跨境安全底座",
    description: "面向车企全球化运营的数据跨境安全实践与安全底座方案介绍。",
    fileType: "PDF",
    fileUrl: "/downloads/data-cross-border-security-foundation-v1.1.pdf",
  },
];
