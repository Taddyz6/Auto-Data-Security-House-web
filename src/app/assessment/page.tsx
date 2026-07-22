import { AssessmentForm } from "@/components/public/assessment-form";
import { Section } from "@/components/section";

export const metadata = {
  title: "企业自测",
};

export default function AssessmentPage() {
  return (
    <div>
      <Section
        title="六步企业需求自测"
        description="根据业务场景、数据类型和治理现状，在浏览器中即时生成模拟评分、重点关注事项和下一步建议。填写内容不会上传或保存。"
      >
        <AssessmentForm />
      </Section>
    </div>
  );
}
