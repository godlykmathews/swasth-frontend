import { cn } from "@/lib/utils";

export function Badge({
  className,
  children
}: React.HTMLAttributes<HTMLSpanElement>) {
  return (
    <span
      className={cn(
        "inline-flex min-h-8 items-center rounded-[4px] border border-gilt/35 bg-[#fff8e8] px-3 py-1 text-sm text-umber shadow-etching",
        className
      )}
    >
      {children}
    </span>
  );
}
