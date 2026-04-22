"use client";

import { useState, useEffect, useRef } from "react";
import { useInView } from "framer-motion";

function useCountUp(target: number, duration = 1800) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (!isInView) return;
    const startTime = performance.now();
    const step = (now: number) => {
      const progress = Math.min((now - startTime) / duration, 1);
      const ease = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      setCount(Math.floor(ease * target));
      if (progress < 1) requestAnimationFrame(step);
      else setCount(target);
    };
    requestAnimationFrame(step);
  }, [isInView, target, duration]);

  return { count, ref };
}

function StatPill({ value, label, suffix = "" }: { value: number; label: string; suffix?: string }) {
  const isFloat = !Number.isInteger(value);
  const { count, ref } = useCountUp(isFloat ? Math.round(value * 10) : value);
  const display = isFloat ? (count / 10).toFixed(1) : count;

  return (
    <div ref={ref} className="flex flex-col items-center gap-1">
      <span className="font-display text-5xl font-bold tracking-tight text-white lg:text-6xl">
        {display}
        <span className="text-violet-400">{suffix}</span>
      </span>
      <span className="text-xs font-semibold uppercase tracking-[0.25em] text-zinc-500">
        {label}
      </span>
    </div>
  );
}

const stats = [
  { value: 2500, label: "Happy Clients", suffix: "+" },
  { value: 15, label: "Expert Stylists", suffix: "" },
  { value: 5, label: "Years of Craft", suffix: "" },
  { value: 4.9, label: "Avg. Rating", suffix: "" },
];

export function StatsSection() {
  return (
    <section
      className="relative overflow-hidden py-20"
      aria-label="Key salon statistics"
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-violet-900/10 via-transparent to-transparent" />
      <div className="container mx-auto grid grid-cols-2 gap-y-14 px-8 sm:px-10 lg:grid-cols-4 lg:divide-x lg:divide-white/5">
        {stats.map((s) => (
          <div key={s.label} className="flex flex-col items-center justify-center px-6">
            <StatPill value={s.value} label={s.label} suffix={s.suffix} />
          </div>
        ))}
      </div>
    </section>
  );
}
