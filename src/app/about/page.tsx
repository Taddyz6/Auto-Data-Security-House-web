import { faqItems } from "@/lib/public-content";
import { Card } from "@/components/ui/card";
import { Section } from "@/components/section";

const pains = [
  ["规则多", "境内、境外、行业和地区要求同时存在。"],
  ["数据杂", "图纸、代码、日志、地图、个人信息、碳数据格式不同。"],
  ["链路散", "专线、云接口、邮件、网盘、车端上行等路径难以统一管理。"],
];

const layers = [
  ["安全基础设施", "通过防火墙、隔离网闸、SD-WAN 合规链路、流量探针、云桌面、堡垒机、日志审计和综合监测平台构成底座。"],
  ["AI 合规引擎", "用固定规则与模拟识别逻辑帮助识别数据类型、敏感字段和业务背景。"],
  ["跨境传输系统", "承接审批、权限控制、加密传输、接收方验证与任务状态管理。"],
  ["合规检测系统", "持续监测文件、接口、流量和行为，识别异常传输与违规风险。"],
  ["存证审计系统", "留存主体、时间、审批、传输与处置记录，支撑后续审计举证。"],
];

const notWhat = [
  "不是只提供一条网络专线。",
  "不是只做一次性数据出境咨询。",
  "不是把数据全部上传到公共云。",
  "不是自动保证所有数据都可以出境。",
  "不是以技术系统替代企业法务和合规责任。",
];

export const metadata = {
  title: "认识安全屋",
};

export default function AboutPage() {
  return (
    <div>
      <Section title="为什么需要安全屋" description="用一页解释汽车行业数据跨境中的核心难点与安全屋的作用边界。">
        <div className="grid gap-6 md:grid-cols-3">
          {pains.map(([title, desc]) => (
            <Card key={title} className="p-6">
              <h3 className="text-xl font-semibold">{title}</h3>
              <p className="mt-3 text-sm leading-7 text-slate-600">{desc}</p>
            </Card>
          ))}
        </div>
      </Section>
      <Section title="五层能力示意" description="以下为面向企业演示的简化结构说明。">
        <div className="grid gap-6 lg:grid-cols-2">
          {layers.map(([title, desc]) => (
            <Card key={title} className="p-6">
              <h3 className="text-xl font-semibold">{title}</h3>
              <p className="mt-3 text-sm leading-7 text-slate-600">{desc}</p>
            </Card>
          ))}
        </div>
      </Section>
      <Section title="安全屋不是什么" description="明确能力边界，避免把演示平台误解为正式合规结论或真实跨境系统。">
        <div className="grid gap-4 md:grid-cols-2">
          {notWhat.map((item) => (
            <Card key={item} className="p-5 text-sm text-slate-700">{item}</Card>
          ))}
        </div>
      </Section>
      <Section title="常见问题">
        <div className="space-y-4">
          {faqItems.map((item) => (
            <Card key={item.id} className="p-5">
              <h3 className="text-lg font-semibold">{item.question}</h3>
              <p className="mt-2 text-sm leading-7 text-slate-600">{item.answer}</p>
            </Card>
          ))}
        </div>
      </Section>
    </div>
  );
}
