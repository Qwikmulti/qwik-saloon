"use client";

import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import {
  ArrowRight,
  Scissors,
  Star,
  ShieldCheck,
  Clock,
  Award,
  Zap,
  Play,
} from "lucide-react";

export function HeroSection() {
  const heroRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const heroImgY = useTransform(scrollYProgress, [0, 1], ["0%", "25%"]);

  return (
    <section
      ref={heroRef}
      className="relative grid min-h-[100dvh] overflow-hidden lg:grid-cols-2"
    >
      {/* ── Left: Copy ── */}
      <div className="relative z-20 flex flex-col justify-center px-8 py-28 sm:px-14 lg:py-0 lg:pl-16 xl:pl-24">
        {/* Ambient glow */}
        <div className="pointer-events-none absolute -left-32 top-1/2 h-[500px] w-[500px] -translate-y-1/2 rounded-full bg-violet-600/15 blur-[100px]" />

        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, x: -24 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <span className="inline-flex items-center gap-2 rounded-full border border-violet-500/25 bg-violet-500/10 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.18em] text-violet-300 backdrop-blur-sm">
            <Zap className="h-3 w-3 fill-violet-400 text-violet-400" />
            London&apos;s Premier Salon · Est. 2020
          </span>
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 40, filter: "blur(8px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 1, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          className="mt-7 font-display text-[clamp(2.8rem,6vw,5.5rem)] font-bold leading-[1.02] tracking-tight"
        >
          Where hair
          <br />
          becomes{" "}
          <span className="relative inline-block">
            <span className="bg-gradient-to-r from-violet-400 via-fuchsia-400 to-pink-400 bg-clip-text text-transparent">
              art.
            </span>
            <svg
              className="absolute -bottom-2 left-0 w-full"
              viewBox="0 0 300 12"
              fill="none"
              aria-hidden="true"
            >
              <motion.path
                d="M2 8 Q75 2 150 8 Q225 14 298 8"
                stroke="url(#hero-underline)"
                strokeWidth="3"
                strokeLinecap="round"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ delay: 1.2, duration: 0.8, ease: "easeOut" }}
              />
              <defs>
                <linearGradient id="hero-underline" x1="0" y1="0" x2="300" y2="0">
                  <stop stopColor="#a78bfa" />
                  <stop offset="1" stopColor="#f472b6" />
                </linearGradient>
              </defs>
            </svg>
          </span>
        </motion.h1>

        {/* Subheading */}
        <motion.p
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
          className="mt-7 max-w-md text-lg leading-relaxed text-zinc-400"
        >
          Hyper-modern salon services with frictionless online booking. Walk in
          transformed. No surprises, no waits, only results.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="mt-10 flex flex-wrap gap-4"
        >
          <Link href="/sign-up">
            <button
              className="group relative overflow-hidden rounded-full bg-white px-7 py-4 text-sm font-bold text-[#050507] shadow-[0_0_40px_rgba(139,92,246,0.35)] transition-all duration-300 hover:scale-105 hover:shadow-[0_0_60px_rgba(139,92,246,0.5)]"
              aria-label="Book an appointment at Qwik Saloon"
            >
              <span className="relative z-10 flex items-center gap-2">
                Book Appointment
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </span>
              <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/30 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
            </button>
          </Link>

          <Link href="/services">
            <button
              className="group flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-7 py-4 text-sm font-semibold text-zinc-300 backdrop-blur-sm transition-all duration-300 hover:border-violet-500/40 hover:bg-violet-500/10 hover:text-white"
              aria-label="Explore Qwik Saloon services"
            >
              <Play className="h-3.5 w-3.5 fill-current opacity-70" />
              Explore Services
            </button>
          </Link>
        </motion.div>

        {/* Trust bar */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9, duration: 0.8 }}
          className="mt-14 flex flex-wrap items-center gap-x-8 gap-y-3 border-t border-white/5 pt-8"
        >
          {[
            { icon: ShieldCheck, text: "Certified Stylists" },
            { icon: Clock, text: "0-Wait Promise" },
            { icon: Award, text: "4.9★ on Google" },
          ].map(({ icon: Icon, text }) => (
            <span key={text} className="flex items-center gap-2 text-xs font-medium text-zinc-500">
              <Icon className="h-4 w-4 text-violet-400" aria-hidden="true" />
              {text}
            </span>
          ))}
        </motion.div>
      </div>

      {/* ── Right: Cinematic image panel ── */}
      <div className="relative hidden overflow-hidden lg:block">
        <motion.div
          style={{ y: heroImgY }}
          className="absolute inset-0 scale-[1.15]"
        >
          <div
            className="h-full w-full bg-cover bg-center"
            style={{
              backgroundImage:
                "url('https://images.unsplash.com/photo-1562322140-8baeececf3df?q=80&w=2069&auto=format&fit=crop')",
            }}
            role="img"
            aria-label="Salon stylist at work"
          />
        </motion.div>

        {/* Gradient overlays */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#050507] via-[#050507]/30 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#050507] via-transparent to-transparent" />

        {/* Floating glass card — next available slot */}
        <motion.div
          initial={{ opacity: 0, x: 40, y: 20 }}
          animate={{ opacity: 1, x: 0, y: 0 }}
          transition={{ delay: 1, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="absolute bottom-16 left-[-2rem] z-20 w-72 rounded-3xl border border-white/10 bg-[#050507]/80 p-5 shadow-2xl backdrop-blur-2xl"
          aria-label="Next available appointment"
        >
          <p className="mb-3 text-xs font-bold uppercase tracking-wider text-zinc-400">
            Next Available
          </p>
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-violet-600 to-fuchsia-600 text-white shadow-lg shadow-violet-500/30">
              <Scissors className="h-5 w-5" aria-hidden="true" />
            </div>
            <div>
              <p className="font-semibold text-white">Precision Cut</p>
              <p className="text-xs text-zinc-400">Today · 3:00 PM · £45</p>
            </div>
          </div>
          <div className="mt-4 flex items-center justify-between">
            <div className="flex -space-x-2" aria-label="Available stylists">
              {["AC", "MT", "SR"].map((init) => (
                <div
                  key={init}
                  className="flex h-7 w-7 items-center justify-center rounded-full border-2 border-[#050507] bg-gradient-to-br from-violet-600 to-fuchsia-600 text-[10px] font-bold text-white"
                  aria-label={`Stylist ${init}`}
                >
                  {init}
                </div>
              ))}
            </div>
            <Link href="/sign-up">
              <button className="rounded-xl bg-white px-4 py-1.5 text-xs font-bold text-[#050507] transition hover:bg-zinc-200">
                Book now →
              </button>
            </Link>
          </div>
        </motion.div>

        {/* Floating rating pill */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1.3, duration: 0.7, type: "spring" }}
          className="absolute right-8 top-16 z-20 flex items-center gap-2 rounded-full border border-white/10 bg-[#050507]/80 px-4 py-2 backdrop-blur-xl"
          aria-label="Customer rating: 4.9 stars from 2,500+ reviews"
        >
          <div className="flex gap-0.5" aria-hidden="true">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
            ))}
          </div>
          <span className="text-sm font-bold text-white">4.9</span>
          <span className="text-xs text-zinc-500">· 2,500+ reviews</span>
        </motion.div>
      </div>
    </section>
  );
}
