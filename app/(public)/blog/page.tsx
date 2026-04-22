'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { format } from 'date-fns';
import { ArrowRight, Clock, Star, TrendingUp } from 'lucide-react';
import { BentoGrid, BentoBox, Badge } from '@/components/ui';

// Mock Blog Data
const blogPosts = [
  {
    id: 1,
    title: 'The Evolution of Balayage in 2026',
    category: 'Trends',
    img: 'https://images.unsplash.com/photo-1595476108010-b4d1f10d5e43?q=80&w=1587&auto=format&fit=crop',
    excerpt: 'Discover why multidimensional, organic color is still reigning supreme and how bonding tech changed everything.',
    date: new Date('2026-03-15'),
    readTime: '4 min',
    featured: true,
  },
  {
    id: 2,
    title: 'Protecting Your Scalp This Winter',
    category: 'Care',
    img: 'https://images.unsplash.com/photo-1522337660859-02fbefca4702?q=80&w=1469&auto=format&fit=crop',
    excerpt: 'Winter demands more than just deep conditioning. Learn to care for the literal root of the issue.',
    date: new Date('2026-02-28'),
    readTime: '6 min',
    featured: false,
  },
  {
    id: 3,
    title: 'Precision Architectures: Men\'s Cuts',
    category: 'Styling',
    img: 'https://images.unsplash.com/photo-1622286342621-4bd786c2447c?q=80&w=1470&auto=format&fit=crop',
    excerpt: 'Structural geometry is taking over modern grooming. Heres how to talk to your barber.',
    date: new Date('2026-04-05'),
    readTime: '5 min',
    featured: false,
  },
  {
     id: 4,
     title: 'Sulphate-Free: What it Really Means',
     category: 'Products',
     img: 'https://images.unsplash.com/photo-1556228578-0d85b1a4d571?q=80&w=1587&auto=format&fit=crop',
     excerpt: 'Cutting through the marketing speak to understand what ingredients your hair actually needs.',
     date: new Date('2026-01-10'),
     readTime: '8 min',
     featured: false,
   }
];

export default function BlogPage() {
  const featuredPost = blogPosts.find(p => p.featured) || blogPosts[0];
  const standardPosts = blogPosts.filter(p => !p.featured);

  return (
    <div className="min-h-screen py-32 bg-[#050507]">
      <div className="container mx-auto px-6 max-w-7xl">
        <motion.div
           initial={{ opacity: 0, y: 20 }}
           animate={{ opacity: 1, y: 0 }}
           className="mb-16 border-b border-white/10 pb-16"
        >
           <span className="mb-4 inline-block text-sm font-semibold uppercase tracking-[0.2em] text-violet-400">
             The Journal
           </span>
           <h1 className="font-display text-5xl font-bold tracking-tight sm:text-6xl lg:text-7xl">
             Chronicles of <span className="bg-gradient-to-r from-violet-400 to-fuchsia-400 bg-clip-text text-transparent">Style</span>
           </h1>
           <p className="mt-8 text-xl leading-relaxed text-zinc-400 max-w-2xl">
             An editorial exploration into the modern world of hair, grooming, product science, and aesthetic expression.
           </p>
        </motion.div>

        {/* Featured Post via Bento Grid */}
        <BentoGrid columns={3} className="mb-12">
           <BentoBox colSpan={2} className="group min-h-[500px] flex flex-col justify-end p-0 overflow-hidden relative cursor-pointer">
              <div className={`absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105`} style={{ backgroundImage: `url(${featuredPost.img})`}} />
              <div className="absolute inset-0 bg-gradient-to-t from-[#050507] via-[#050507]/80 to-transparent z-10" />
              
              <div className="relative z-20 p-10 md:p-14 w-full">
                 <div className="flex gap-3 mb-6">
                    <Badge className="bg-violet-500 text-white border-none">{featuredPost.category}</Badge>
                    <Badge variant="outline" className="border-white/20 bg-black/40 backdrop-blur-md text-white gap-2 text-xs py-1">
                       <Star className="h-3 w-3 text-amber-400 fill-amber-400" /> Featured
                    </Badge>
                 </div>
                 <h2 className="font-display text-4xl md:text-5xl font-bold text-white mb-4 line-clamp-2">
                    {featuredPost.title}
                 </h2>
                 <p className="text-zinc-300 text-lg mb-8 max-w-xl line-clamp-2">
                    {featuredPost.excerpt}
                 </p>
                 <div className="flex items-center gap-6 text-sm font-semibold tracking-wider uppercase text-zinc-400">
                    <span>{format(featuredPost.date, 'MMM do, yyyy')}</span>
                    <span className="flex items-center gap-1.5"><Clock className="h-4 w-4" /> {featuredPost.readTime}</span>
                 </div>
              </div>
           </BentoBox>

           <BentoBox colSpan={1} className="bg-gradient-to-br from-[#0d0d12] to-violet-900/10 flex flex-col justify-between">
              <div>
                 <h3 className="font-display text-2xl font-bold mb-6 flex items-center gap-2">
                    <TrendingUp className="h-6 w-6 text-violet-400" /> Topic Index
                 </h3>
                 <div className="space-y-4">
                    {['Trends', 'Care', 'Styling', 'Products', 'Culture'].map(cat => (
                       <button key={cat} className="w-full flex items-center justify-between text-left p-4 rounded-xl border border-white/5 bg-white/5 hover:border-violet-500/30 hover:bg-violet-500/10 transition-all group">
                          <span className="font-semibold text-zinc-300 group-hover:text-violet-300">{cat}</span>
                          <ArrowRight className="h-4 w-4 text-zinc-600 group-hover:translate-x-1 group-hover:text-violet-400 transition-all" />
                       </button>
                    ))}
                 </div>
              </div>
              <div className="mt-8 pt-8 border-t border-white/5">
                 <p className="text-sm text-zinc-500 mb-4">Subscribe to our dispatch for early access to styling events and product drops.</p>
                 <div className="flex gap-2">
                    <input type="email" placeholder="Your email..." className="flex-1 bg-black/40 border border-white/10 rounded-lg px-4 text-sm outline-none focus:border-violet-500" />
                    <button className="bg-white text-black font-bold px-4 py-2 rounded-lg text-sm hover:bg-zinc-200">Join</button>
                 </div>
              </div>
           </BentoBox>
        </BentoGrid>

        {/* Standard Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
           {standardPosts.map(post => (
              <motion.div 
               key={post.id} 
               whileHover={{ y: -8 }}
               className="group flex flex-col bg-[#131316] border border-white/10 rounded-[2rem] overflow-hidden cursor-pointer hover:border-violet-500/30 hover:shadow-xl hover:shadow-violet-500/10 transition-all duration-300"
              >
                 <div className="h-64 w-full relative overflow-hidden">
                    <div className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110" style={{ backgroundImage: `url(${post.img})`}} />
                 </div>
                 <div className="p-8 flex-1 flex flex-col">
                    <div className="mb-4">
                       <span className="text-xs font-bold uppercase tracking-wider text-violet-400 bg-violet-400/10 px-3 py-1.5 rounded-full">{post.category}</span>
                    </div>
                    <h3 className="font-display text-2xl font-bold text-white mb-3 line-clamp-2 group-hover:text-violet-300 transition-colors">
                       {post.title}
                    </h3>
                    <p className="text-zinc-400 text-sm leading-relaxed mb-6 line-clamp-3">
                       {post.excerpt}
                    </p>
                    <div className="mt-auto pt-6 border-t border-white/10 flex items-center justify-between text-xs font-semibold tracking-wider uppercase text-zinc-500">
                       <span>{format(post.date, 'MMM do, yyyy')}</span>
                       <span>{post.readTime}</span>
                    </div>
                 </div>
              </motion.div>
           ))}
        </div>

      </div>
    </div>
  );
}
