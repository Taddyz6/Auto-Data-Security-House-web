"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu } from "lucide-react";
import { navItems } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { CatarcWordmark } from "@/components/layout/catarc-wordmark";

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 18);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 px-3 pt-3 transition-all duration-300 sm:px-5 sm:pt-4",
        scrolled ? "pb-2" : "pb-0",
      )}
    >
      <div
        className={cn(
          "mx-auto flex max-w-[1480px] items-center justify-between rounded-[26px] border px-4 py-3 transition-all duration-300 sm:px-6",
          scrolled
            ? "border-cyan-200/16 bg-[#050b15]/90 shadow-[0_18px_60px_rgba(2,6,23,0.48)] backdrop-blur-2xl"
            : "border-white/12 bg-[#050b15]/78 shadow-[0_14px_50px_rgba(2,6,23,0.34)] backdrop-blur-xl",
        )}
      >
        <Link href="/" className="flex shrink-0 items-center gap-4 text-sm font-semibold text-white">
          <CatarcWordmark />
          <span className="hidden 2xl:block">汽车数据跨境安全屋</span>
          <span className="sr-only">汽车数据跨境安全屋首页</span>
        </Link>
        <nav className="hidden items-center gap-4 lg:flex xl:gap-6">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "relative whitespace-nowrap px-1 py-2 text-sm transition-colors after:absolute after:inset-x-1 after:bottom-0 after:h-px after:origin-left after:scale-x-0 after:bg-cyan-300 after:transition-transform hover:text-white hover:after:scale-x-100",
                pathname === item.href ? "text-cyan-300 after:scale-x-100" : "text-slate-300",
              )}
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="hidden lg:block">
          <Link
            href="/assessment"
            className={cn(
              buttonVariants({}),
              "h-12 rounded-full border border-cyan-100/70 bg-gradient-to-r from-cyan-50 to-sky-100 px-7 text-[15px] font-semibold text-slate-950 shadow-[0_12px_30px_rgba(56,189,248,0.22)] hover:from-white hover:to-cyan-50",
            )}
          >
            立即自测
          </Link>
        </div>
        <button
          className="flex h-11 w-11 items-center justify-center rounded-full border border-white/12 bg-white/6 text-white lg:hidden"
          onClick={() => setOpen((v) => !v)}
          aria-label="打开菜单"
        >
          <Menu className="h-6 w-6" />
        </button>
      </div>
      {open ? (
        <div className="surface-glass mx-auto mt-2 max-w-[1480px] rounded-[24px] border border-white/10 px-4 py-4 shadow-[0_18px_50px_rgba(2,6,23,0.45)] lg:hidden">
          <div className="flex flex-col gap-3">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="rounded-2xl px-3 py-2 text-sm text-slate-200 hover:bg-white/8"
              >
                {item.label}
              </Link>
            ))}
            <Link href="/assessment" onClick={() => setOpen(false)} className={cn(buttonVariants({}), "w-full")}>
              立即自测
            </Link>
          </div>
        </div>
      ) : null}
    </header>
  );
}
