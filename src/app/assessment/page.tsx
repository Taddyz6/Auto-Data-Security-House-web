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
        description="自测不是法律判断工具，而是需求分流和咨询线索收集工具。结果仅展示初步适配程度、重点关注事项、推荐能力模块和下一步建议。"
      >
        <AssessmentForm />
      </Section>
    </div>
  );
}
