"use client";

import { cn } from "@/lib/utils";

interface BentoGridProps {
  children: React.ReactNode;
  className?: string;
  columns?: number;
}

export function BentoGrid({ children, className, columns = 3 }: BentoGridProps) {
  return (
    <div
      className={cn(
        "grid gap-4",
        columns === 2 && "grid-cols-1 md:grid-cols-2",
        columns === 3 && "grid-cols-1 md:grid-cols-2 lg:grid-cols-3",
        columns === 4 && "grid-cols-1 md:grid-cols-2 lg:grid-cols-4",
        className
      )}
    >
      {children}
    </div>
  );
}

interface BentoBoxProps {
  children: React.ReactNode;
  className?: string;
  colSpan?: number | "full";
  rowSpan?: number;
}

export function BentoBox({
  children,
  className,
  colSpan = 1,
  rowSpan,
}: BentoBoxProps) {
  return (
    <div
      className={cn(
        "group relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl",
        "transition-all duration-300 hover:border-violet-500/30 hover:bg-white/10 hover:shadow-lg hover:shadow-violet-500/20",
        colSpan === "full" ? "md:col-span-2 lg:col-span-3" : `md:col-span-${colSpan}`,
        rowSpan && `row-span-${rowSpan}`,
        className
      )}
    >
      {children}
    </div>
  );
}