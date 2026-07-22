import { Section } from "@/components/section";
import { Card } from "@/components/ui/card";
import { CompanyContactCard } from "@/components/public/company-contact-card";
import { companyAddress, companyName } from "@/lib/constants";

export const metadata = {
  title: "联系我们",
};

export default function ContactPage() {
  return (
    <Section title="联系我们" description="查看企业简介、业务联系人与办公地址。">
      <div className="grid gap-6 xl:grid-cols-[1.3fr_0.7fr]">
        <Card className="p-8">
          <p className="text-sm font-medium uppercase tracking-[0.18em] text-primary">企业简介</p>
          <h2 className="mt-4 text-3xl font-semibold text-white">{companyName}</h2>
          <p className="mt-6 text-sm leading-8 text-slate-200">
            中汽研临港数据科技（上海）有限公司，作为“中央企业专业化整合”重点项目，始终以“坚守国家跨境数据安全、护航国家汽车产业出海、服务民族汽车品牌国际跃升”为核心使命。公司聚焦汽车领域数据跨境流动关键需求，构建起数据“跨境合规-跨境检测-跨境回传-跨境流通”全链条服务能力。立足上海区位优势、辐射全球汽车产业，正加速打造国家级汽车行业数据跨境创新中心，致力于成为国际一流的汽车数据要素赋能平台与未来汽车数据新业态培育的创新型服务机构。
          </p>
        </Card>
        <div className="space-y-6">
          <CompanyContactCard showCompanyDetails={false} />
          <Card className="p-6">
            <h3 className="text-lg font-semibold text-white">企业地址</h3>
            <p className="mt-4 text-sm leading-7 text-slate-200">{companyAddress}</p>
          </Card>
        </div>
      </div>
    </Section>
  );
}
