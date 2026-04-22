"use client";

import { cn } from "@/lib/utils";
import { motion, HTMLMotionProps } from "framer-motion";

interface BentoGridProps extends HTMLMotionProps<"div"> {
  children: React.ReactNode;
  className?: string;
  columns?: number;
}

export function BentoGrid({ children, className, columns = 4, ...props }: BentoGridProps) {
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={{
        hidden: { opacity: 0 },
        visible: {
          opacity: 1,
          transition: {
            staggerChildren: 0.1,
          },
        },
      }}
      className={cn(
        "grid gap-6 auto-rows-[minmax(180px,auto)]",
        columns === 2 && "grid-cols-1 md:grid-cols-2",
        columns === 3 && "grid-cols-1 md:grid-cols-2 lg:grid-cols-3",
        columns === 4 && "grid-cols-1 md:grid-cols-2 lg:grid-cols-4",
        className
      )}
      {...props}
    >
      {children}
    </motion.div>
  );
}

interface BentoBoxProps extends HTMLMotionProps<"div"> {
  children: React.ReactNode;
  className?: string;
  colSpan?: number | "full";
  rowSpan?: number;
  noPadding?: boolean;
}

export function BentoBox({
  children,
  className,
  colSpan = 1,
  rowSpan = 1,
  noPadding = false,
  ...props
}: BentoBoxProps) {
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 100, damping: 15 } },
      }}
      whileHover={{ y: -4, transition: { duration: 0.2 } }}
      className={cn(
        "group relative overflow-hidden rounded-3xl border border-white/5 bg-[#131316]/80 backdrop-blur-2xl",
        "transition-all duration-300 hover:border-violet-500/30 hover:shadow-xl hover:shadow-violet-500/10",
        colSpan === "full" ? "md:col-span-full" : `md:col-span-${colSpan}`,
        rowSpan > 1 && `row-span-${rowSpan}`,
        !noPadding && "p-6 sm:p-8",
        className
      )}
      {...props}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-violet-600/5 via-transparent to-fuchsia-600/5 opacity-0 transition-opacity duration-500 group-hover:opacity-100 mix-blend-overlay" />
      <div className="relative z-10 h-full w-full">{children}</div>
    </motion.div>
  );
}