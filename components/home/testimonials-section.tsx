"use client";

import { motion } from "framer-motion";
import { Star } from "lucide-react";

const testimonials = [
  {
    name: "Sarah M.",
    handle: "@sarahmitchell",
    text: "Absolutely transformative. My balayage looks like it belongs on a magazine cover. The booking flow took 40 seconds.",
    rating: 5,
    service: "Colour Artistry",
  },
  {
    name: "James T.",
    handle: "@jamesthompson",
    text: "Zero wait. Perfect cut. The stylist listened more closely than anyone I've been to in 10 years of salon visits.",
    rating: 5,
    service: "Precision Cut",
  },
  {
    name: "Emma L.",
    handle: "@emmalaurent",
    text: "The space feels like a luxury hotel, the staff feel like artists. I rebooked before leaving the chair.",
    rating: 5,
    service: "Full Treatment",
  },
];

export function TestimonialsSection() {
  return (
    <section
      className="relative overflow-hidden py-28"
      aria-labelledby="testimonials-heading"
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(139,92,246,0.08),transparent)]" />
      <div className="container mx-auto px-8 sm:px-10">
        <div className="mb-16 text-center">
          <span className="mb-3 block text-xs font-bold uppercase tracking-[0.25em] text-violet-400">
            Client Stories
          </span>
          <h2
            id="testimonials-heading"
            className="font-display text-4xl font-bold tracking-tight lg:text-5xl"
          >
            Real transformations.
          </h2>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {testimonials.map((t, i) => (
            <motion.blockquote
              key={t.name}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ delay: i * 0.12, duration: 0.6 }}
              className={`relative rounded-3xl border border-white/10 bg-[#131316] p-8 ${
                i === 1 ? "md:mt-8" : ""
              }`}
            >
              {/* Decorative quote mark */}
              <p
                className="mb-5 font-serif text-5xl leading-none text-violet-500/30 select-none"
                aria-hidden="true"
              >
                &ldquo;
              </p>

              <p className="text-base leading-relaxed text-zinc-300">{t.text}</p>

              <footer className="mt-6 flex items-center justify-between border-t border-white/5 pt-5">
                <div className="flex items-center gap-3">
                  <div
                    className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-violet-600 to-fuchsia-600 text-sm font-bold text-white shadow-md"
                    aria-hidden="true"
                  >
                    {t.name[0]}
                  </div>
                  <div>
                    <cite className="not-italic text-sm font-semibold text-white">
                      {t.name}
                    </cite>
                    <p className="text-xs text-zinc-500">{t.handle}</p>
                  </div>
                </div>
                <div>
                  <div
                    className="flex gap-0.5"
                    aria-label={`${t.rating} out of 5 stars`}
                  >
                    {[...Array(t.rating)].map((_, j) => (
                      <Star key={j} className="h-3 w-3 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <p className="mt-1 text-right text-[10px] font-semibold uppercase tracking-wider text-zinc-600">
                    {t.service}
                  </p>
                </div>
              </footer>
            </motion.blockquote>
          ))}
        </div>
      </div>
    </section>
  );
}
