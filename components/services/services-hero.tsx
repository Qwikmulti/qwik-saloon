"use client";

import { motion } from "framer-motion";

export function ServicesHero() {
  return (
    <section
      className="relative overflow-hidden pb-8 pt-32"
      aria-labelledby="services-hero-heading"
    >
      {/* Ambient glow */}
      <div
        className="pointer-events-none absolute left-1/2 top-24 h-[400px] w-[600px] -translate-x-1/2 rounded-full bg-violet-600/10 blur-[120px]"
        aria-hidden="true"
      />

      <div className="container relative z-10 mx-auto max-w-4xl px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <span className="mb-6 inline-block text-xs font-bold uppercase tracking-[0.3em] text-violet-400">
            Our Menu
          </span>
          <h1
            id="services-hero-heading"
            className="font-display text-5xl font-bold tracking-tight sm:text-6xl lg:text-7xl"
          >
            Curated{" "}
            <span className="bg-gradient-to-r from-violet-400 to-fuchsia-400 bg-clip-text text-transparent">
              Treatments
            </span>
          </h1>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="mx-auto mt-8 max-w-2xl text-lg leading-relaxed text-zinc-400 sm:text-xl"
        >
          Uncomplicated pricing. Transparent duration. Elite execution. Select
          your service category below to view our offerings.
        </motion.p>
      </div>
    </section>
  );
}
