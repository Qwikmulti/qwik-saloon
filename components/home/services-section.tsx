"use client";

import Link from "next/link";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Clock, Scissors, Sparkles, Heart, ChevronRight } from "lucide-react";

const services = [
  {
    id: "haircut",
    name: "Precision Architecture",
    price: "from £45",
    duration: "45–60 min",
    desc: "Structural cuts engineered to your bone structure and lifestyle for a look that thrives beyond the salon chair.",
    icon: Scissors,
    img: "https://images.unsplash.com/photo-1560066984-138dadb4c035?q=80&w=1674&auto=format&fit=crop",
    accent: "from-violet-500/20 to-violet-500/5",
    tag: "Most Booked",
  },
  {
    id: "coloring",
    name: "Luminosity Colour",
    price: "from £85",
    duration: "90–180 min",
    desc: "Multi-dimensional balayage and lived-in colour crafted with bond-protecting science to keep your hair healthy and vibrant.",
    icon: Sparkles,
    img: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?q=80&w=1674&auto=format&fit=crop",
    accent: "from-fuchsia-500/20 to-fuchsia-500/5",
    tag: "Signature",
  },
  {
    id: "treatment",
    name: "Molecular Repair",
    price: "from £60",
    duration: "45–90 min",
    desc: "Cellular-level restoration using Olaplex, keratin & bespoke conditioning masks to reverse damage and rebuild strength.",
    icon: Heart,
    img: "https://images.unsplash.com/photo-1559599101-f09722fb4948?q=80&w=1674&auto=format&fit=crop",
    accent: "from-emerald-500/20 to-emerald-500/5",
    tag: "New",
  },
];

export function ServicesSection() {
  const [activeService, setActiveService] = useState(0);
  const current = services[activeService];
  const Icon = current.icon;

  return (
    <section
      className="relative overflow-hidden py-28"
      aria-labelledby="services-heading"
    >
      <div className="container mx-auto px-8 sm:px-10">
        {/* Section heading */}
        <div className="mb-16 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <motion.span
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="mb-3 block text-xs font-bold uppercase tracking-[0.25em] text-violet-400"
            >
              Our Signature Menu
            </motion.span>
            <motion.h2
              id="services-heading"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="font-display text-4xl font-bold tracking-tight lg:text-5xl"
            >
              Curated treatments.
              <br />
              <span className="text-zinc-500">Zero compromise.</span>
            </motion.h2>
          </div>
          <Link href="/services">
            <button className="group flex shrink-0 items-center gap-2 rounded-full border border-white/10 px-5 py-2.5 text-sm font-semibold text-zinc-400 transition hover:border-violet-500/40 hover:text-white">
              Full Service Menu
              <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </button>
          </Link>
        </div>

        {/* Tab pills */}
        <div className="mb-10 flex flex-wrap gap-3" role="tablist" aria-label="Service categories">
          {services.map((s, i) => (
            <button
              key={s.id}
              role="tab"
              aria-selected={activeService === i}
              aria-controls={`service-panel-${s.id}`}
              onClick={() => setActiveService(i)}
              className={`relative rounded-full px-5 py-2.5 text-sm font-semibold transition-all duration-300 ${
                activeService === i
                  ? "bg-white text-[#050507] shadow-lg shadow-white/10"
                  : "border border-white/10 bg-white/5 text-zinc-400 hover:border-white/20 hover:text-zinc-200"
              }`}
            >
              {activeService === i && (
                <motion.span
                  layoutId="service-tab-bg"
                  className="absolute inset-0 rounded-full bg-white"
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              )}
              <span className="relative z-10">{s.name}</span>
            </button>
          ))}
        </div>

        {/* Service showcase panel */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeService}
            id={`service-panel-${current.id}`}
            role="tabpanel"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="grid overflow-hidden rounded-[2.5rem] border border-white/10 lg:grid-cols-2"
          >
            {/* Image */}
            <div className="relative h-72 lg:h-auto">
              <img
                src={current.img}
                alt={`${current.name} salon service at Qwik Saloon`}
                className="absolute inset-0 h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-transparent to-[#050507]/50" />
              <div className="absolute left-5 top-5 rounded-full bg-violet-600 px-3 py-1 text-xs font-bold tracking-wider text-white shadow-lg">
                {current.tag}
              </div>
            </div>

            {/* Content */}
            <div
              className={`flex flex-col justify-between bg-gradient-to-br ${current.accent} p-10 backdrop-blur-xl lg:p-14`}
            >
              <div>
                <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl border border-white/10 bg-white/5 shadow-inner">
                  <Icon className="h-6 w-6 text-violet-300" aria-hidden="true" />
                </div>
                <h3 className="font-display text-3xl font-bold leading-tight lg:text-4xl">
                  {current.name}
                </h3>
                <p className="mt-4 max-w-sm text-base leading-relaxed text-zinc-400">
                  {current.desc}
                </p>
              </div>

              <div className="mt-10 flex items-end justify-between">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-widest text-zinc-500">
                    Starting price
                  </p>
                  <p className="mt-1 font-display text-4xl font-bold text-white">
                    {current.price}
                  </p>
                  <p className="mt-1 flex items-center gap-1 text-xs text-zinc-500">
                    <Clock className="h-3.5 w-3.5" aria-hidden="true" />
                    {current.duration}
                  </p>
                </div>
                <Link href={`/services?category=${current.id}`}>
                  <button className="group flex items-center gap-2 rounded-2xl bg-white px-6 py-3.5 text-sm font-bold text-[#050507] shadow-lg transition-all hover:scale-105 hover:shadow-violet-500/30">
                    Book This
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </button>
                </Link>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
