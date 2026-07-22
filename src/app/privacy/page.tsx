import { Section } from "@/components/section";
import { Card } from "@/components/ui/card";

export const metadata = {
  title: "隐私声明",
};

export default function PrivacyPage() {
  return (
    <Section title="隐私声明" description="网站仅收集咨询所需的最少信息，不接收企业真实跨境文件。">
      <Card className="space-y-4 p-6 text-sm leading-7 text-slate-600">
        <p>1. 收集范围：企业名称、联系人、手机、邮箱、业务说明、偏好联系方式等咨询必要信息。</p>
        <p>2. 使用目的：用于企业咨询回访、演示预约、参观安排和需求归档。</p>
        <p>3. 最小化原则：不默认勾选隐私同意，不允许上传真实个人信息或敏感跨境数据文件。</p>
        <p>4. 权利说明：如需删除、更正或查询信息，可通过“联系我们”页面提交请求。</p>
        <p>5. 安全措施：管理员后台需鉴权，导出功能仅管理员可用，日志中不记录完整敏感联系方式。</p>
      </Card>
    </Section>
  );
}
