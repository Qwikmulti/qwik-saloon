"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

export function CtaSection() {
  return (
    <section
      className="relative overflow-hidden py-6 pb-20"
      aria-labelledby="cta-heading"
    >
      <div className="container mx-auto px-8 sm:px-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="relative overflow-hidden rounded-[2.5rem]"
        >
          {/* Background image */}
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage:
                "url('https://images.unsplash.com/photo-1522337660859-02fbefca4702?q=80&w=2069&auto=format&fit=crop')",
            }}
            role="img"
            aria-label="Qwik Saloon interior"
          />

          {/* Overlay layers */}
          <div className="absolute inset-0 bg-[#050507]/70" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#050507]/90 via-[#050507]/60 to-transparent" />

          {/* Ambient orbs */}
          <div className="absolute -right-20 -top-20 h-96 w-96 rounded-full bg-violet-600/20 blur-[80px]" aria-hidden="true" />
          <div className="absolute -bottom-20 right-32 h-64 w-64 rounded-full bg-fuchsia-600/20 blur-[80px]" aria-hidden="true" />

          <div className="relative z-10 px-10 py-24 md:px-20 lg:py-32">
            <div className="max-w-2xl">
              <span className="mb-5 inline-block text-xs font-bold uppercase tracking-[0.25em] text-violet-400">
                Ready?
              </span>
              <h2
                id="cta-heading"
                className="font-display text-4xl font-bold leading-tight text-white md:text-5xl lg:text-6xl"
              >
                Your transformation
                <br />
                <span className="bg-gradient-to-r from-violet-300 to-fuchsia-300 bg-clip-text text-transparent">
                  starts today.
                </span>
              </h2>
              <p className="mt-6 max-w-md text-lg text-zinc-400">
                Join thousands of clients who trust Qwik Saloon for their
                monthly ritual. Book in under a minute.
              </p>
              <div className="mt-10 flex flex-wrap gap-4">
                <Link href="/sign-up">
                  <button
                    className="group relative overflow-hidden rounded-full bg-white px-8 py-4 text-sm font-bold text-[#050507] shadow-[0_0_50px_rgba(139,92,246,0.4)] transition-all hover:scale-105"
                    aria-label="Book your appointment at Qwik Saloon"
                  >
                    <span className="relative z-10 flex items-center gap-2">
                      Book Your Appointment
                      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </span>
                    <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/40 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
                  </button>
                </Link>
                <Link href="/about">
                  <button className="rounded-full border border-white/15 px-8 py-4 text-sm font-semibold text-zinc-300 backdrop-blur-sm transition hover:bg-white/10 hover:text-white">
                    Learn Our Story
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
