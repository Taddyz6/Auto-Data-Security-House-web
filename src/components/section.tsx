import { cn } from "@/lib/utils";

export function Section({
  title,
  description,
  className,
  eyebrow,
  children,
}: {
  title: string;
  description?: string;
  className?: string;
  eyebrow?: string;
  children: React.ReactNode;
}) {
  return (
    <section className={cn("section-divider mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 lg:py-28", className)}>
      <div className="mb-10 max-w-3xl">
        {eyebrow ? (
          <p className="text-xs font-medium uppercase tracking-[0.28em] text-cyan-300">{eyebrow}</p>
        ) : null}
        <h2 className="mt-3 text-3xl font-semibold tracking-tight text-foreground-strong sm:text-4xl">
          {title}
        </h2>
        {description ? (
          <p className="mt-4 text-base leading-8 text-slate-300 sm:text-lg">{description}</p>
        ) : null}
      </div>
      {children}
    </section>
  );
}
