import { cn } from "@/lib/utils";

export function Card({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "glow-ring rounded-[30px] border border-border bg-card text-card-foreground shadow-[0_18px_50px_rgba(2,6,23,0.35)] backdrop-blur-xl",
        className,
      )}
      {...props}
    />
  );
}
