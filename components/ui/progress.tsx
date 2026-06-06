import { cn } from "@/lib/utils";

export function Progress({
  value = 0,
  className
}: {
  value?: number;
  className?: string;
}) {
  const width = Math.max(0, Math.min(100, value));

  return (
    <div
      className={cn("h-3 overflow-hidden rounded-[3px] border border-gilt/30 bg-[#efe0c0]", className)}
      role="progressbar"
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={width}
    >
      <div
        className="h-full rounded-[2px] bg-gradient-to-r from-[#b88936] via-[#e4bf72] to-[#fbf0bd] transition-all duration-500"
        style={{ width: `${width}%` }}
      />
    </div>
  );
}
