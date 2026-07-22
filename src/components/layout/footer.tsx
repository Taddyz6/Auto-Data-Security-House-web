import Link from "next/link";
import { companyName } from "@/lib/constants";

export function Footer() {
  return (
    <footer className="border-t border-white/10 bg-[#040b17] text-slate-200">
      <div className="mx-auto grid max-w-7xl gap-8 px-4 py-12 sm:px-6 lg:grid-cols-[2fr_1fr_1fr] lg:px-8">
        <div>
          <h3 className="text-lg font-semibold text-white">汽车数据跨境安全屋</h3>
          <p className="mt-3 max-w-xl text-sm leading-7 text-slate-400">
            由{companyName}提供演示支持。本网站用于汽车数据跨境安全屋的技术与业务科普、企业需求预诊断与咨询预约。
          </p>
        </div>
        <div>
          <h4 className="text-sm font-semibold text-white">快速入口</h4>
          <div className="mt-3 flex flex-col gap-2 text-sm text-slate-400">
            <Link href="/assessment">企业自测</Link>
            <Link href="/process">全流程演示</Link>
            <Link href="/cases">案例与资质</Link>
          </div>
        </div>
        <div>
          <h4 className="text-sm font-semibold text-white">合规说明</h4>
          <div className="mt-3 flex flex-col gap-2 text-sm text-slate-400">
            <span>{companyName}</span>
            <Link href="/privacy">隐私声明</Link>
            <Link href="/disclaimer">免责声明</Link>
            <span>备案信息占位</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
