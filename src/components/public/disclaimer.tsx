import { Badge } from "@/components/ui/badge";

export function SiteDisclaimer({ compact = false }: { compact?: boolean }) {
  return (
    <div className="rounded-[28px] border border-amber-200 bg-amber-50 p-6 text-sm leading-7 text-amber-900">
      <Badge className="bg-amber-100 text-amber-800">重要提示</Badge>
      <p className="mt-3">
        本网站内容用于汽车数据跨境安全屋的技术与业务科普，不构成法律意见、监管结论或数据出境许可。
        企业实际数据跨境活动应结合最新法律法规、监管要求、数据内容、处理规模、业务目的、接收方和目的地开展专项评估。
      </p>
      {!compact ? (
        <p className="mt-2">
          所有模拟功能均为“演示”或“模拟结果”，不接入真实 AI、区块链或跨境传输系统。
        </p>
      ) : null}
    </div>
  );
}
