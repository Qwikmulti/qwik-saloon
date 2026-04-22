"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

export function AboutHero() {
  const containerRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section
      ref={containerRef}
      className="relative flex min-h-screen items-center justify-center overflow-hidden pt-20"
      aria-labelledby="about-hero-heading"
    >
      {/* Background with subtle parallax */}
      <motion.div style={{ y, opacity }} className="absolute inset-0 z-0">
        <div
          className="h-full w-full bg-cover bg-center"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1522337660859-02fbefca4702?q=80&w=2069&auto=format&fit=crop')",
          }}
          role="img"
          aria-label="Elegant salon interior with modern lighting"
        />
        <div className="absolute inset-0 bg-[#050507]/80" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#050507] via-[#050507]/60 to-transparent" />
      </motion.div>

      <div className="container relative z-10 mx-auto px-6 text-center lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="mx-auto max-w-4xl cursor-default"
        >
          <span className="mb-6 inline-block text-xs font-bold uppercase tracking-[0.3em] text-violet-400">
            Our Story & Philosophy
          </span>
          <h1
            id="about-hero-heading"
            className="font-display text-5xl font-bold tracking-tight sm:text-6xl lg:text-7xl xl:text-8xl"
          >
            Redefining the <br />
            <span className="bg-gradient-to-r from-violet-400 to-fuchsia-400 bg-clip-text text-transparent">
              salon experience.
            </span>
          </h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="mx-auto mt-8 max-w-2xl text-lg leading-relaxed text-zinc-400 sm:text-xl"
          >
            Qwik Saloon is a sanctuary where artistry meets precision. Founded
            on the belief that premium beauty should be frictionless, we integrate
            advanced booking technology with world-class aesthetics carefully
            designed for your ultimate comfort.
          </motion.p>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2"
        aria-hidden="true"
      >
        <div className="flex h-12 w-6 justify-center rounded-full border border-white/20 p-1">
          <motion.div
            animate={{ y: [0, 16, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="h-2 w-2 rounded-full bg-violet-400"
          />
        </div>
      </motion.div>
    </section>
  );
}
