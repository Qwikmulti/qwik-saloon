"use client";

import { motion } from "framer-motion";

const marqueeItems = [
  "Precision Cuts",
  "Balayage",
  "Colour Artistry",
  "Deep Treatments",
  "Bridal Styling",
  "Lash Extensions",
  "Keratin Therapy",
  "Brow Design",
];

export function MarqueeTicker() {
  return (
    <div
      className="relative overflow-hidden border-y border-white/5 py-5"
      aria-hidden="true"
    >
      <div className="absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-[#050507] to-transparent" />
      <div className="absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-[#050507] to-transparent" />
      <motion.div
        animate={{ x: ["0%", "-50%"] }}
        transition={{ duration: 28, repeat: Infinity, ease: "linear" }}
        className="flex gap-12 whitespace-nowrap"
      >
        {[...marqueeItems, ...marqueeItems].map((item, i) => (
          <span
            key={i}
            className="flex items-center gap-4 text-sm font-semibold uppercase tracking-[0.2em] text-zinc-400"
          >
            <span className="h-1 w-1 rounded-full bg-violet-500" />
            {item}
          </span>
        ))}
      </motion.div>
    </div>
  );
}
