"use client";

import { motion } from "framer-motion";
import { Award, Heart, Globe, Leaf } from "lucide-react";

const values = [
  {
    icon: Award,
    title: "Uncompromising Quality",
    description: "Premium products and precise techniques.",
  },
  {
    icon: Heart,
    title: "Deep Care",
    description: "Every client is treated as our most important guest.",
  },
  {
    icon: Globe,
    title: "Inclusivity",
    description: "Mastery over all hair textures and styles.",
  },
  {
    icon: Leaf,
    title: "Sustainability",
    description: "Eco-conscious practices and zero waste initiatives.",
  },
];

export function AboutValues() {
  return (
    <section className="py-24" aria-labelledby="values-heading">
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="mb-16 text-center">
          <span className="mb-3 block text-xs font-bold uppercase tracking-[0.25em] text-violet-400">
            Our Ethos
          </span>
          <h2
            id="values-heading"
            className="font-display text-4xl font-bold tracking-tight lg:text-5xl"
          >
            Principles we stand by.
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {values.map((v, i) => (
            <motion.div
              key={v.title}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className="group relative flex flex-col items-center rounded-3xl border border-white/5 bg-white/[0.02] p-8 text-center transition-all hover:bg-white/[0.04]"
            >
              <div
                className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl border border-white/10 bg-[#050507] shadow-inner transition-transform group-hover:scale-110"
                aria-hidden="true"
              >
                <v.icon className="h-8 w-8 text-violet-400" />
              </div>
              <h3 className="mb-3 font-display text-xl font-bold text-white">
                {v.title}
              </h3>
              <p className="text-sm leading-relaxed text-zinc-400">
                {v.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
