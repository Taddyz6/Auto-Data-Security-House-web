import { notFound } from "next/navigation";
import Link from "next/link";
import { scenarios } from "@/lib/constants";
import { Card } from "@/components/ui/card";
import { buttonVariants } from "@/components/ui/button";
import { Section } from "@/components/section";

export async function generateStaticParams() {
  return scenarios.map((item) => ({ slug: item.slug }));
}

export default async function ScenarioDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const scenario = scenarios.find((item) => item.slug === slug);
  if (!scenario) notFound();

  return (
    <div>
      <Section title={scenario.title} description={scenario.summary}>
        <div className="grid gap-6 lg:grid-cols-2">
          <Card className="p-6">
            <h3 className="text-lg font-semibold">常见跨境数据</h3>
            <ul className="mt-3 space-y-2 text-sm text-slate-600">
              {scenario.dataTypes.map((item) => <li key={item}>• {item}</li>)}
            </ul>
          </Card>
          <Card className="p-6">
            <h3 className="text-lg font-semibold">常见风险</h3>
            <ul className="mt-3 space-y-2 text-sm text-slate-600">
              {scenario.risks.map((item) => <li key={item}>• {item}</li>)}
            </ul>
          </Card>
          <Card className="p-6">
            <h3 className="text-lg font-semibold">安全屋处理方式</h3>
            <ul className="mt-3 space-y-2 text-sm text-slate-600">
              {scenario.handling.map((item) => <li key={item}>• {item}</li>)}
            </ul>
          </Card>
          <Card className="p-6">
            <h3 className="text-lg font-semibold">适合咨询的企业情况</h3>
            <p className="mt-3 text-sm leading-7 text-slate-600">{scenario.fit}</p>
          </Card>
        </div>
        <div className="mt-8">
          <Link href="/assessment" className={buttonVariants({})}>进入企业自测</Link>
        </div>
      </Section>
    </div>
  );
}
