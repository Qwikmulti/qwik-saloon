"use client";

import { motion } from "framer-motion";
import { BentoGrid, BentoBox } from "@/components/ui";

const timelineItems = [
  {
    year: "2020",
    title: "Inception in London",
    description: "Founded to elevate grooming standards, creating a premium space dedicated exclusively to meticulous craft.",
    accent: "text-violet-400",
    bg: "bg-violet-500/10",
    border: "border-violet-500/30",
  },
  {
    year: "2023",
    title: "The Digital Shift",
    description: "Integrating proprietary technology to enable zero-wait appointments and frictionless digital bookings.",
    accent: "text-fuchsia-400",
    bg: "bg-fuchsia-500/10",
    border: "border-fuchsia-500/30",
  },
  {
    year: "2026",
    title: "A New Standard",
    description: "Refining the spatial experience with our new flagship salon, designed around the principles of calm and luxury.",
    accent: "text-emerald-400",
    bg: "bg-emerald-500/10",
    border: "border-emerald-500/30",
  },
];

export function AboutTimeline() {
  return (
    <section className="py-32" aria-labelledby="timeline-heading">
      <div className="container mx-auto px-6 max-w-7xl">
        <BentoGrid columns={3} className="mb-32">
          <BentoBox
            colSpan={2}
            className="min-h-[400px] flex flex-col justify-center bg-gradient-to-br from-violet-900/20 to-[#050507] p-10 lg:p-14"
          >
            <h2 id="timeline-heading" className="font-display text-4xl font-bold mb-6 lg:text-5xl">
              Born from Frustration, <br />
              <span className="text-zinc-500">Built for Luxury</span>
            </h2>
            <p className="text-zinc-400 text-lg leading-relaxed max-w-2xl">
              We noticed an industry stuck in the past—hidden wait times, obscure
              pricing, and rushed services. Our response was to completely dismantle
              that model. We deliver a fully transparent, luxuriously accommodating
              space where your time is respected as much as your personal style.
            </p>
          </BentoBox>

          <BentoBox
            colSpan={1}
            rowSpan={2}
            className="bg-[#0d0d12] flex flex-col justify-between p-10 border border-white/5 relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-64 h-64 bg-violet-600/10 rounded-full blur-[80px]" />
            <div className="relative z-10 flex flex-col gap-12">
              {timelineItems.map((item, index) => (
                <motion.div
                  key={item.year}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ delay: index * 0.2, duration: 0.6 }}
                  className="flex flex-col relative"
                >
                  {/* Connecting Line */}
                  {index !== timelineItems.length - 1 && (
                    <div className="absolute left-6 top-16 bottom-[-3rem] w-px bg-white/10" aria-hidden="true" />
                  )}
                  <div className="flex gap-6">
                    <div
                      className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-full border ${item.border} ${item.bg} z-10`}
                      aria-hidden="true"
                    >
                      <span className={`font-display text-sm font-bold ${item.accent}`}>
                        {item.year.slice(-2)}'
                      </span>
                    </div>
                    <div>
                      <h3 className="font-display text-xl font-bold text-white">
                        {item.year} — {item.title}
                      </h3>
                      <p className="mt-2 text-sm leading-relaxed text-zinc-500">
                        {item.description}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </BentoBox>

          <BentoBox
            colSpan={2}
            className="min-h-[300px] flex flex-col justify-center bg-[url('https://images.unsplash.com/photo-1542038380854-c923f7736e4b?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center relative overflow-hidden p-10 lg:p-14"
          >
            <div className="absolute inset-0 bg-gradient-to-t from-[#050507] via-[#050507]/80 to-transparent" />
            <div className="relative z-10">
              <h2 className="font-display text-3xl font-bold mb-4 text-white">
                Sustainability at our Core
              </h2>
              <p className="text-zinc-300 text-lg leading-relaxed max-w-2xl">
                Beyond beauty, we care for the planet. We operate a 95% zero-waste
                model, ethically sourcing clean, vegan products, and using 100%
                renewable energy across our locations.
              </p>
            </div>
          </BentoBox>
        </BentoGrid>
      </div>
    </section>
  );
}
