'use client';

import Link from 'next/link';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import { useRef } from 'react';
import { ArrowRight, Clock, MapPin, Star, Users, Scissors, Sparkles, Crown, Heart, Award, ShieldCheck } from 'lucide-react';
import { Button, BentoGrid, BentoBox } from '@/components/ui';

function AnimatedCounter({ value, label, suffix = '' }: { value: number; label: string; suffix?: string }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  
  return (
    <div ref={ref} className="text-center group relative p-6">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={isInView ? { opacity: 1, scale: 1 } : {}}
        transition={{ duration: 0.8, type: "spring", bounce: 0.4 }}
        className="font-display text-5xl font-bold lg:text-7xl bg-gradient-to-br from-white to-white/50 bg-clip-text text-transparent"
      >
        {value.toLocaleString()}{suffix}
      </motion.div>
      <p className="mt-3 text-sm font-semibold uppercase tracking-[0.2em] text-zinc-500 group-hover:text-violet-400 transition-colors">{label}</p>
    </div>
  );
}

export default function HomePage() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  const stats = [
    { value: 2500, label: 'Happy Clients', suffix: '+' },
    { value: 15, label: 'Expert Stylists' },
    { value: 5, label: 'Years Experience' },
    { value: 4.9, label: 'Average Rating', suffix: '/5' },
  ];

  return (
    <div ref={containerRef} className="flex flex-col bg-[#050507]">
      {/* 2026 Hero Section with Parallax & Glassmorphism */}
      <section className="relative min-h-[100dvh] flex items-center justify-center overflow-hidden">
        {/* Deep, immersive animated background gradients */}
        <motion.div style={{ y, opacity }} className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-violet-900/40 via-[#050507] to-fuchsia-900/20" />
          <div className="absolute top-[20%] right-[10%] h-[500px] w-[500px] rounded-full bg-violet-600/20 blur-[120px] mix-blend-screen animate-pulse-glow" />
          <div className="absolute bottom-[20%] left-[10%] h-[600px] w-[600px] rounded-full bg-fuchsia-600/10 blur-[150px] mix-blend-screen" />
          {/* Subtle noise texture overlay */}
          <div className="absolute inset-0 bg-[url('/noise.png')] opacity-[0.03] mix-blend-overlay" />
        </motion.div>
        
        <div className="container relative z-10 mx-auto px-6 py-32">
          <div className="mx-auto max-w-5xl text-center">
            <motion.div
              initial={{ opacity: 0, y: 30, filter: 'blur(10px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
              className="mb-8"
            >
              <span className="inline-flex items-center gap-2 rounded-full border border-violet-500/30 bg-violet-500/10 px-5 py-2 text-sm font-semibold tracking-wide text-violet-300 backdrop-blur-md">
                <Sparkles className="h-4 w-4" />
                Next Generation Salon Experience
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 40, filter: 'blur(10px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="font-display mx-auto max-w-4xl text-6xl font-bold leading-[1.05] tracking-tight sm:text-7xl lg:text-8xl"
            >
              Mastering the art of{' '}
              <span className="relative whitespace-nowrap">
                <span className="relative z-10 bg-gradient-to-r from-violet-400 via-fuchsia-400 to-violet-400 bg-clip-text text-transparent animate-gradient">
                  your style.
                </span>
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="mx-auto mt-8 max-w-2xl text-xl leading-relaxed text-zinc-400/90"
            >
              A hyper-modern space blending luxury comfort with precision styling. Book effortlessly and discover true confidence.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="mt-12 flex flex-col gap-4 sm:flex-row sm:justify-center"
            >
              {/* Modern Glass floating CTA */}
              <Button asChild size="lg" className="group rounded-full bg-white px-8 py-7 text-[#050507] hover:bg-zinc-200 text-lg font-bold shadow-[0_0_40px_-10px_rgba(255,255,255,0.3)] transition-all hover:scale-105">
                <Link href="/sign-up">
                  Book Appointment
                  <motion.span className="inline-block ml-2 group-hover:translate-x-1 transition-transform">
                    <ArrowRight className="h-5 w-5" />
                  </motion.span>
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="rounded-full px-8 py-7 border-white/10 bg-white/5 backdrop-blur-xl hover:bg-white/10 text-lg">
                <Link href="/services">
                  Explore Menu
                </Link>
              </Button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Social Proof - Bento Style */}
      <section className="relative z-20 -mt-20 px-6 pb-24 max-w-7xl mx-auto w-full">
        <BentoGrid columns={4} className="gap-4 md:gap-6">
          {stats.map((stat, i) => (
             <BentoBox key={stat.label} colSpan={1} className="py-8 bg-[#0d0d12]/90 border-t-white/10 border-white/5">
                <AnimatedCounter value={stat.value} label={stat.label} suffix={stat.suffix} />
             </BentoBox>
          ))}
        </BentoGrid>
      </section>

      {/* Features bento spread */}
      <section className="py-24 relative">
        <div className="container mx-auto px-6 max-w-7xl">
           <div className="mb-16">
              <span className="text-violet-400 tracking-[0.2em] uppercase text-sm font-semibold mb-3 block">Why Choose Qwik</span>
              <h2 className="font-display text-4xl md:text-5xl font-bold">Uncompromising Quality.</h2>
           </div>

           <BentoGrid columns={3}>
              <BentoBox colSpan={2} rowSpan={2} className="min-h-[400px] flex flex-col justify-end bg-[url('https://images.unsplash.com/photo-1562322140-8baeececf3df?q=80&w=2069&auto=format&fit=crop')] bg-cover bg-center overflow-hidden">
                 <div className="absolute inset-0 bg-gradient-to-t from-[#050507] via-[#050507]/60 to-transparent" />
                 <div className="relative z-10 max-w-md">
                    <div className="h-14 w-14 rounded-2xl bg-violet-600/20 backdrop-blur-xl border border-violet-500/30 flex items-center justify-center mb-6">
                       <Crown className="text-violet-400 h-7 w-7" />
                    </div>
                    <h3 className="font-display text-3xl font-bold text-white mb-3">Premium Experience</h3>
                    <p className="text-zinc-300 text-lg">Relax in our luxurious, acoustically treated salon spaces while our masters transform your look with absolute precision.</p>
                 </div>
              </BentoBox>

              <BentoBox colSpan={1} className="bg-gradient-to-br from-violet-900/20 to-fuchsia-900/20 border-violet-500/20">
                 <div className="h-12 w-12 rounded-xl bg-white/10 flex items-center justify-center mb-4 border border-white/10">
                    <Clock className="text-fuchsia-400 h-6 w-6" />
                 </div>
                 <h3 className="font-display text-xl font-bold mb-2">Zero Wait Times</h3>
                 <p className="text-zinc-400 text-sm">Smart scheduling ensures your chair is ready the moment you walk through our doors.</p>
              </BentoBox>

              <BentoBox colSpan={1} className="bg-[#0d0d12]/80">
                 <div className="h-12 w-12 rounded-xl bg-white/10 flex items-center justify-center mb-4 border border-white/10">
                    <ShieldCheck className="text-emerald-400 h-6 w-6" />
                 </div>
                 <h3 className="font-display text-xl font-bold mb-2">Vetted Experts</h3>
                 <p className="text-zinc-400 text-sm">Every stylist undergoes rigorous testing and continuous education into the latest 2026 trends.</p>
              </BentoBox>
           </BentoGrid>
        </div>
      </section>

      {/* Services Highlight */}
      <section className="py-32 relative overflow-hidden">
        <div className="absolute inset-0 bg-fuchsia-900/5" />
        <div className="container mx-auto px-6 max-w-7xl relative z-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
            <div className="max-w-2xl">
              <h2 className="font-display text-4xl md:text-5xl font-bold mb-4">Curated Treatments</h2>
              <p className="text-xl text-zinc-400">Discover our signature services designed to elevate your personal aesthetic.</p>
            </div>
            <Button asChild variant="outline" className="rounded-full border-white/10">
               <Link href="/services">View Full Menu <ArrowRight className="ml-2 h-4 w-4" /></Link>
            </Button>
          </div>

          <BentoGrid columns={4}>
            {[
              { id: 'cut', name: 'Precision Architecture', price: 'From £45', desc: 'Structural cutting tailored to your bone structure.', icon: Scissors, span: 1 },
              { id: 'color', name: 'Luminosity Colouring', price: 'From £85', desc: 'Multi-dimensional balayage and vivids using organic bonded colors.', icon: Sparkles, span: 2 },
              { id: 'treat', name: 'Molecular Repair', price: 'From £60', desc: 'Cellular level hair restoration.', icon: Heart, span: 1 },
            ].map((srv) => (
              <BentoBox key={srv.id} colSpan={srv.span as any} className="group relative">
                <div className="flex items-start justify-between mb-12">
                   <div className="h-14 w-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center transition-transform group-hover:scale-110">
                     <srv.icon className="h-6 w-6 text-violet-400" />
                   </div>
                   <span className="font-display text-2xl font-bold text-zinc-300 group-hover:text-violet-300 transition-colors">{srv.price}</span>
                </div>
                <h3 className="font-display text-2xl font-bold mb-2">{srv.name}</h3>
                <p className="text-sm text-zinc-400">{srv.desc}</p>
                <Link href={`/services?category=${srv.id}`} className="absolute inset-0 z-20" aria-label={`View ${srv.name}`} />
              </BentoBox>
            ))}
          </BentoGrid>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 relative">
        <div className="container mx-auto px-6 max-w-5xl">
           <motion.div 
             initial={{ opacity: 0, scale: 0.9 }}
             whileInView={{ opacity: 1, scale: 1 }}
             viewport={{ once: true, margin: "-100px" }}
             transition={{ duration: 0.7 }}
             className="relative rounded-[3rem] overflow-hidden bg-gradient-to-tr from-violet-600 to-fuchsia-600 p-16 md:p-24 text-center shadow-2xl shadow-violet-500/20"
           >
              <div className="absolute inset-0 bg-[url('/noise.png')] opacity-10 mix-blend-overlay" />
              <div className="relative z-10">
                 <h2 className="font-display text-4xl md:text-6xl font-bold text-white mb-6">Ready to reinvent yourself?</h2>
                 <p className="text-white/80 text-xl font-medium mb-10 max-w-2xl mx-auto">Join the new era of salon bookings. Secure your spot in just three clicks.</p>
                 <Button asChild size="lg" className="rounded-full bg-[#050507] text-white hover:bg-zinc-900 border border-white/10 px-10 py-8 text-lg font-bold">
                    <Link href="/sign-up">Access the Booking Portal</Link>
                 </Button>
              </div>
           </motion.div>
        </div>
      </section>
    </div>
  );
}