import { Section } from "@/components/section";
import { SiteDisclaimer } from "@/components/public/disclaimer";

export const metadata = {
  title: "免责声明",
};

export default function DisclaimerPage() {
  return (
    <Section title="免责声明">
      <SiteDisclaimer />
    </Section>
  );
}
