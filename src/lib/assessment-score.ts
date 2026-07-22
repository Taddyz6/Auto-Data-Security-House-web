export type Ternary = "yes" | "no" | "unknown";

export interface AssessmentInput {
  companyName?: string;
  enterpriseType: string;
  scenarios: string[];
  transferDirection: string;
  destinations: string[];
  multipleCountries: boolean;
  dataTypes: string[];
  frequency: string;
  dataVolume: string;
  currentChannels: string[];
  hasApprovalProcess: Ternary;
  hasClassification: Ternary;
  hasCompleteLogs: Ternary;
  painPoints: string[];
}

export interface AssessmentResult {
  complexityScore: number;
  sensitivityScore: number;
  maturityGapScore: number;
  totalScore: number;
  resultLevel: "basic" | "process" | "security_house";
  title: string;
  recommendations: string[];
  focusItems: string[];
  recommendedModules: string[];
}

const HIGH_SENSITIVITY = new Set([
  "高精地图或地理数据",
  "位置轨迹",
  "车主或驾驶员信息",
  "生物识别信息",
  "视频、图像、点云",
  "软件代码和算法",
]);

const MEDIUM_SENSITIVITY = new Set([
  "VIN 和车辆标识",
  "车辆运行和故障日志",
  "研发图纸和技术文件",
  "电池和碳足迹数据",
  "生产、质量、供应链数据",
]);

export function calculateAssessment(input: AssessmentInput): AssessmentResult {
  let complexityScore = 0;
  if (input.scenarios.length === 1) complexityScore += 1;
  else if (input.scenarios.length === 2) complexityScore += 2;
  else if (input.scenarios.length >= 3) complexityScore += 3;

  if (input.multipleCountries || input.transferDirection === "双向传输") {
    complexityScore += 2;
  }
  if (input.frequency === "每日" || input.frequency === "实时") {
    complexityScore += 2;
  }

  const sensitivityScore = input.dataTypes.reduce((sum, item) => {
    if (HIGH_SENSITIVITY.has(item)) return sum + 2;
    if (MEDIUM_SENSITIVITY.has(item)) return sum + 1;
    return sum;
  }, 0);

  const maturityChecks = [
    input.hasApprovalProcess,
    input.hasClassification,
    input.hasCompleteLogs,
  ];
  let maturityGapScore = maturityChecks.filter((item) => item !== "yes").length;
  if (input.currentChannels.includes("公共网盘") || input.currentChannels.includes("邮件")) {
    maturityGapScore += 2;
  }

  const totalScore = complexityScore + sensitivityScore + maturityGapScore;
  const resultLevel =
    totalScore <= 5 ? "basic" : totalScore <= 10 ? "process" : "security_house";

  const titleMap = {
    basic: "基础咨询型需求",
    process: "流程建设型需求",
    security_house: "安全屋重点适配型需求",
  } as const;

  return {
    complexityScore,
    sensitivityScore,
    maturityGapScore,
    totalScore,
    resultLevel,
    title: titleMap[resultLevel],
    recommendations: buildRecommendations(input, resultLevel),
    focusItems: buildFocusItems(input),
    recommendedModules: buildRecommendedModules(input, resultLevel),
  };
}

function buildFocusItems(input: AssessmentInput) {
  const items = new Set<string>();
  if (input.dataTypes.some((item) => HIGH_SENSITIVITY.has(item))) {
    items.add("高敏感数据建议先做字段级识别、脱敏策略和最小化核验。");
  }
  if (input.transferDirection === "双向传输" || input.multipleCountries) {
    items.add("跨多国家或双向流转时，应分别确认接收方、目的地和使用边界。");
  }
  if (input.frequency === "每日" || input.frequency === "实时") {
    items.add("高频传输场景需要持续监测、异常告警和完整日志留存。");
  }
  if (input.hasApprovalProcess !== "yes") {
    items.add("建议先补齐传输前审批机制，明确业务责任人与授权路径。");
  }
  if (input.hasClassification !== "yes") {
    items.add("建议开展场景化数据盘点和分类分级，避免一刀切传输。");
  }
  if (input.currentChannels.includes("公共网盘") || input.currentChannels.includes("邮件")) {
    items.add("现有传输通道分散，建议统一收敛到受控入口。");
  }
  if (items.size < 3) {
    items.add("需结合数据内容、规模、目的地和接收方做专项评估，当前结果仅为模拟诊断。");
  }
  return Array.from(items).slice(0, 5);
}

function buildRecommendedModules(
  input: AssessmentInput,
  level: AssessmentResult["resultLevel"],
) {
  const modules = ["智能合规预审", "安全可控传输"];
  if (level !== "basic") modules.push("全链路合规检测");
  if (level === "security_house") modules.push("可信存证与审计");
  if (input.dataTypes.includes("视频、图像、点云")) modules.push("脱敏与裁剪策略");
  return Array.from(new Set(modules));
}

function buildRecommendations(
  input: AssessmentInput,
  level: AssessmentResult["resultLevel"],
) {
  if (level === "basic") {
    return [
      "优先梳理数据清单、传输主体与目的地。",
      "建立基础审批流程和日志留存机制。",
      "对现有传输方式进行合规风险复核。",
      "必要时开展一次专项咨询与场景盘点。",
    ];
  }
  if (level === "process") {
    return [
      "开展场景化数据盘点、规则比对和分类分级。",
      "建立传输前审批、接收方管理和字段最小化流程。",
      "设计统一的安全传输和持续监测方案。",
      "补齐日志、审计证据和异常处置机制。",
    ];
  }
  if (input.painPoints.includes("人工审核慢")) {
    return [
      "建议评估一体化安全屋方案，统一处理高频、多场景跨境任务。",
      "重点完善智能识别、合规预审、权限控制和持续监测能力。",
      "对高敏感数据设置人工复核、脱敏和拦截策略。",
      "形成完整的跨境日志、审批记录和审计证据链。",
    ];
  }
  return [
    "建议评估一体化安全屋方案，统一处理高频、多场景跨境任务。",
    "重点完善智能识别、合规预审、权限控制和持续监测能力。",
    "对高敏感数据设置人工复核、脱敏和拦截策略。",
    "形成完整的跨境日志、审批记录和审计证据链。",
  ];
}
