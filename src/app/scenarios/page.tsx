import Link from "next/link";
import { scenarios } from "@/lib/constants";
import { Card } from "@/components/ui/card";
import { Section } from "@/components/section";

export const metadata = {
  title: "应用场景",
};

export default function ScenariosPage() {
  return (
    <Section title="应用场景" description="每个场景均包含业务说明、常见数据、风险、处理方式与适配企业画像。">
      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {scenarios.map((item) => (
          <Link key={item.slug} href={`/scenarios/${item.slug}`}>
            <Card className="h-full p-6 transition hover:-translate-y-1 hover:shadow-lg">
              <h2 className="text-xl font-semibold">{item.title}</h2>
              <p className="mt-3 text-sm leading-7 text-slate-600">{item.summary}</p>
            </Card>
          </Link>
        ))}
      </div>
    </Section>
  );
}
