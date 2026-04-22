'use client';

import { motion } from 'framer-motion';
import { Scissors, Award, Heart, Sparkles, Users, Clock, Leaf, Globe } from 'lucide-react';
import { BentoGrid, BentoBox } from '@/components/ui';

export default function AboutPage() {
  const values = [
    { icon: Award, title: 'Uncompromising Quality', description: 'Premium products and precise techniques.' },
    { icon: Heart, title: 'Deep Care', description: 'Every client is treated as our most important guest.' },
    { icon: Globe, title: 'Inclusivity', description: 'Mastery over all hair textures and styles.' },
    { icon: Leaf, title: 'Sustainability', description: 'Eco-conscious practices and zero waste initiatives.' },
  ];

  const team = [
    { name: 'Alexandra Chen', role: 'Creative Director', img: 'AC' },
    { name: 'Marcus Thompson', role: 'Senior Stylist', img: 'MT' },
    { name: 'Sofia Rodriguez', role: 'Colour Specialist', img: 'SR' },
    { name: 'James Park', role: 'Men\'s Grooming', img: 'JP' },
  ];

  return (
    <div className="min-h-screen py-32 bg-[#050507]">
      <div className="container mx-auto px-6 max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-24 text-center max-w-3xl mx-auto"
        >
          <span className="mb-6 inline-block text-sm font-semibold uppercase tracking-[0.2em] text-violet-400">
            Our Story & Philosophy
          </span>
          <h1 className="font-display text-5xl font-bold tracking-tight sm:text-6xl lg:text-7xl">
            Redefining the <br/><span className="bg-gradient-to-r from-violet-400 to-fuchsia-400 bg-clip-text text-transparent">salon experience.</span>
          </h1>
          <p className="mt-8 text-xl leading-relaxed text-zinc-400">
            Qwik Saloon is a sanctuary where artistry meets precision. Founded on the belief that premium beauty should be frictionless, we integrate advanced booking technology with world-class aesthetics carefully designed for your comfort.
          </p>
        </motion.div>

        {/* Our Story Timeline via Bento Grid */}
        <BentoGrid columns={3} className="mb-32">
          <BentoBox colSpan={2} className="min-h-[300px] flex flex-col justify-center bg-gradient-to-br from-violet-900/20 to-[#050507]">
             <h2 className="font-display text-3xl font-bold mb-4">Born from Frustration, Built for Luxury</h2>
             <p className="text-zinc-400 text-lg leading-relaxed max-w-2xl">
                We noticed an industry stuck in the past—hidden wait times, obscure pricing, and rushed services. In 2026, Qwik Salon emerged as the antithesis. A fully transparent, luxuriously accommodating space where your time is respected as much as your style.
             </p>
          </BentoBox>
          <BentoBox colSpan={1} className="bg-gradient-to-tl from-zinc-900/50 flex flex-col items-center justify-center text-center">
             <div className="h-20 w-20 rounded-full border border-violet-500/30 bg-violet-500/10 flex items-center justify-center mb-6">
                <span className="font-display text-2xl font-bold text-violet-400">01</span>
             </div>
             <h3 className="font-display text-xl font-bold">Inception</h3>
             <p className="text-zinc-500 mt-2">Founded in London to elevate grooming standards.</p>
          </BentoBox>
          <BentoBox colSpan={1} className="bg-gradient-to-tl from-zinc-900/50 flex flex-col items-center justify-center text-center">
             <div className="h-20 w-20 rounded-full border border-fuchsia-500/30 bg-fuchsia-500/10 flex items-center justify-center mb-6">
                <span className="font-display text-2xl font-bold text-fuchsia-400">02</span>
             </div>
             <h3 className="font-display text-xl font-bold">Expansion</h3>
             <p className="text-zinc-500 mt-2">Integrating tech for zero-wait appointments.</p>
          </BentoBox>
          <BentoBox colSpan={2} className="min-h-[300px] flex flex-col justify-center bg-gradient-to-bl from-emerald-900/20 to-[#050507]">
             <h2 className="font-display text-3xl font-bold mb-4">Sustainability at our Core</h2>
             <p className="text-zinc-400 text-lg leading-relaxed max-w-2xl">
                Beyond beauty, we care for the planet. We operate a 95% zero-waste model, ethically sourcing clean, vegan products, and using 100% renewable energy across our locations.
             </p>
          </BentoBox>
        </BentoGrid>

        {/* Values */}
        <div className="mb-32">
           <h2 className="font-display text-4xl font-bold mb-12 text-center">Our Core Values</h2>
           <BentoGrid columns={4}>
              {values.map((v, i) => (
                 <BentoBox key={i} colSpan={1} className="text-center flex flex-col items-center">
                    <div className="h-16 w-16 rounded-2xl bg-white/5 border border-white/10 flex flex-col items-center justify-center mb-6 text-violet-400">
                       <v.icon className="h-8 w-8" />
                    </div>
                    <h3 className="font-display text-xl font-bold mb-3">{v.title}</h3>
                    <p className="text-zinc-400">{v.description}</p>
                 </BentoBox>
              ))}
           </BentoGrid>
        </div>

        {/* Team Array */}
        <div>
           <h2 className="font-display text-4xl font-bold mb-12 text-center">Meet the Artisans</h2>
           <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {team.map((t, i) => (
                 <motion.div 
                   key={i}
                   whileHover={{ y: -10 }}
                   className="group relative h-[400px] rounded-[2rem] overflow-hidden border border-white/10 bg-[#131316]/50"
                 >
                    <div className="absolute inset-0 bg-gradient-to-t from-[#050507] via-[#050507]/20 to-transparent z-10" />
                    {/* Placeholder image representation */}
                    <div className="absolute inset-0 bg-zinc-800 animate-pulse" />
                    <div className="absolute inset-0 flex items-center justify-center z-0">
                       <span className="text-6xl font-display font-bold text-zinc-700">{t.img}</span>
                    </div>

                    <div className="absolute bottom-0 left-0 right-0 p-8 z-20">
                       <h3 className="font-display text-2xl font-bold text-white group-hover:text-violet-300 transition-colors">{t.name}</h3>
                       <p className="text-fuchsia-400 font-medium uppercase tracking-wider text-xs mt-2">{t.role}</p>
                    </div>
                 </motion.div>
              ))}
           </div>
        </div>

      </div>
    </div>
  );
}