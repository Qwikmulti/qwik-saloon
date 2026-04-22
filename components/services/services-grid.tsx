"use client";

import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowRight,
  Clock,
  Scissors,
  Sparkles,
  Heart,
  Crown,
} from "lucide-react";
import { formatCurrency } from "@/lib/utils";
import { SERVICE_CATEGORIES } from "@/lib/constants";

export interface SerializedService {
  _id: string;
  name: string;
  description?: string;
  category: string;
  durationMinutes: number;
  basePrice: number;
  imageUrl?: string;
}

interface ServicesGridProps {
  services: SerializedService[];
  activeCategory: string | null;
}

/* ─────────────────────────────────────────────────────
   Icon map
───────────────────────────────────────────────────── */
const categoryIcons: Record<string, React.ComponentType<{ className?: string }>> = {
  haircut: Scissors,
  coloring: Sparkles,
  treatment: Heart,
  styling: Crown,
  other: Sparkles,
};

/* ─────────────────────────────────────────────────────
   Component
───────────────────────────────────────────────────── */
export function ServicesGrid({ services, activeCategory }: ServicesGridProps) {
  // Group services by category
  const grouped = services.reduce<Record<string, SerializedService[]>>(
    (acc, service) => {
      const cat = service.category;
      if (!acc[cat]) acc[cat] = [];
      acc[cat].push(service);
      return acc;
    },
    {}
  );

  return (
    <section className="pb-28 pt-8" aria-label="Service listings">
      <div className="container mx-auto max-w-7xl px-6">
        {/* ── Category Filter Pills ── */}
        <div
          className="mb-16 flex flex-wrap justify-center gap-3"
          role="navigation"
          aria-label="Filter services by category"
        >
          <Link href="/services" prefetch>
            <button
              className={`rounded-full px-6 py-3 text-sm font-semibold uppercase tracking-wider transition-all duration-300 ${
                !activeCategory
                  ? "bg-white text-[#050507] shadow-lg shadow-white/10"
                  : "border border-white/10 bg-white/5 text-zinc-300 hover:border-white/20 hover:text-zinc-100"
              }`}
              aria-current={!activeCategory ? "page" : undefined}
            >
              All Services
            </button>
          </Link>
          {SERVICE_CATEGORIES.map((cat) => {
            const Icon = categoryIcons[cat.value] || Sparkles;
            const isActive = activeCategory === cat.value;
            return (
              <Link
                key={cat.value}
                href={`/services?category=${cat.value}`}
                prefetch
              >
                <button
                  className={`flex items-center gap-2.5 rounded-full px-6 py-3 text-sm font-semibold uppercase tracking-wider transition-all duration-300 ${
                    isActive
                      ? "bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white shadow-lg shadow-violet-500/25"
                      : "border border-white/10 bg-white/5 text-zinc-300 hover:border-white/20 hover:text-zinc-100"
                  }`}
                  aria-current={isActive ? "page" : undefined}
                >
                  <Icon className="h-4 w-4" aria-hidden="true" />
                  {cat.label}
                </button>
              </Link>
            );
          })}
        </div>

        {/* ── Grouped Service Cards ── */}
        <AnimatePresence mode="wait">
          {Object.keys(grouped).length > 0 ? (
            <motion.div
              key={activeCategory || "all"}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            >
              {Object.entries(grouped).map(([category, catServices]) => {
                const Icon = categoryIcons[category] || Sparkles;
                const catLabel =
                  SERVICE_CATEGORIES.find((c) => c.value === category)?.label ||
                  category;

                return (
                  <div key={category} className="mb-24 last:mb-0">
                    {/* Category Header */}
                    <div className="mb-10 flex items-center gap-4 border-b border-white/5 pb-5">
                      <div
                        className="flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 bg-white/5"
                        aria-hidden="true"
                      >
                        <Icon className="h-6 w-6 text-violet-400" />
                      </div>
                      <h2 className="font-display text-3xl font-bold capitalize">
                        {catLabel}
                      </h2>
                      <span className="ml-auto rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-semibold text-zinc-500">
                        {catServices.length}{" "}
                        {catServices.length === 1 ? "service" : "services"}
                      </span>
                    </div>

                    {/* Cards Grid */}
                    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                      {catServices.map((service, i) => (
                        <motion.article
                          key={service._id}
                          initial={{ opacity: 0, y: 24 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true, margin: "-40px" }}
                          transition={{ delay: i * 0.08, duration: 0.5 }}
                          whileHover={{ y: -6 }}
                          className="group flex flex-col overflow-hidden rounded-3xl border border-white/5 bg-[#131316]/80 backdrop-blur-xl transition-all duration-300 hover:border-violet-500/30 hover:shadow-xl hover:shadow-violet-500/10"
                        >
                          {/* Image or Gradient Header */}
                          {service.imageUrl ? (
                            <div className="relative h-44 overflow-hidden">
                              <img
                                src={service.imageUrl}
                                alt={`${service.name} treatment at Qwik Saloon`}
                                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                              />
                              <div className="absolute inset-0 bg-gradient-to-t from-[#131316] to-transparent" />
                            </div>
                          ) : (
                            <div className="relative h-3 overflow-hidden">
                              <div className="absolute inset-0 bg-gradient-to-r from-violet-600/40 via-fuchsia-600/40 to-violet-600/40 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                            </div>
                          )}

                          {/* Body */}
                          <div className="flex flex-1 flex-col p-8">
                            {/* Price & Duration */}
                            <div className="mb-6 flex items-start justify-between">
                              <div className="flex flex-col">
                                <span className="bg-gradient-to-r from-violet-300 to-fuchsia-300 bg-clip-text font-display text-3xl font-bold text-transparent">
                                  {formatCurrency(service.basePrice)}
                                </span>
                                <span className="mt-1 text-[10px] font-semibold uppercase tracking-widest text-zinc-500">
                                  Starting Price
                                </span>
                              </div>
                              <div
                                className="flex items-center gap-1.5 rounded-lg border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-semibold tracking-wider text-zinc-300"
                                aria-label={`Duration: ${service.durationMinutes} minutes`}
                              >
                                <Clock
                                  className="h-3 w-3 text-emerald-400"
                                  aria-hidden="true"
                                />
                                {service.durationMinutes}m
                              </div>
                            </div>

                            {/* Title & Description */}
                            <h3 className="mb-3 font-display text-2xl font-bold text-zinc-100">
                              {service.name}
                            </h3>
                            {service.description && (
                              <p className="mb-8 min-h-[48px] text-sm leading-relaxed text-zinc-400">
                                {service.description}
                              </p>
                            )}

                            {/* CTA */}
                            <div className="mt-auto border-t border-white/5 pt-6">
                              <Link href={`/booking?service=${service._id}`}>
                                <button className="group/btn flex w-full items-center justify-center gap-2 rounded-2xl bg-white py-3.5 text-sm font-bold text-[#050507] transition-all hover:bg-zinc-200 hover:shadow-lg hover:shadow-violet-500/10">
                                  Select Treatment
                                  <ArrowRight className="h-4 w-4 transition-transform group-hover/btn:translate-x-1" />
                                </button>
                              </Link>
                            </div>
                          </div>
                        </motion.article>
                      ))}
                    </div>
                  </div>
                );
              })}
            </motion.div>
          ) : (
            /* Empty State */
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="mx-auto max-w-2xl rounded-3xl border border-white/10 bg-white/5 py-24 text-center backdrop-blur-md"
            >
              <Sparkles
                className="mx-auto mb-6 h-12 w-12 text-zinc-500 opacity-50"
                aria-hidden="true"
              />
              <h3 className="mb-3 font-display text-2xl font-bold">
                No Treatments Found
              </h3>
              <p className="mb-8 text-zinc-400">
                We couldn&apos;t locate services in this specific category.
              </p>
              <Link href="/services">
                <button className="rounded-full bg-violet-600 px-6 py-3 text-sm font-bold text-white transition-all hover:bg-violet-500">
                  Clear Filters
                </button>
              </Link>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
