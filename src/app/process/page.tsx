import { ProcessDemo } from "@/components/public/process-demo";
import { SiteDisclaimer } from "@/components/public/disclaimer";
import { Section } from "@/components/section";

export const metadata = {
  title: "全流程演示",
};

export default function ProcessPage() {
  return (
    <div>
      <Section
        title="全流程交互演示"
        description="以下为演示流程。每一步显示通俗说明、输入、系统动作、可能输出和风险点，用于帮助企业理解安全屋的工作方式。"
      >
        <ProcessDemo />
      </Section>
      <Section title="重要提示">
        <SiteDisclaimer />
      </Section>
    </div>
  );
}
