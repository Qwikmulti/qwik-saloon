"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Star, ChevronRight } from "lucide-react";

const stylists = [
  {
    name: "Alexandra Chen",
    role: "Creative Director",
    specialty: "Colour & Balayage",
    rating: 4.9,
    reviews: 312,
    img: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=687&auto=format&fit=crop",
  },
  {
    name: "Marcus Thompson",
    role: "Senior Stylist",
    specialty: "Textured & Natural Hair",
    rating: 4.8,
    reviews: 198,
    img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=687&auto=format&fit=crop",
  },
  {
    name: "Sofia Rodriguez",
    role: "Colour Specialist",
    specialty: "Vivids & Fashion Colour",
    rating: 5.0,
    reviews: 241,
    img: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=764&auto=format&fit=crop",
  },
];

export function StylistsSection() {
  return (
    <section
      className="overflow-hidden py-28"
      aria-labelledby="stylists-heading"
    >
      <div className="container mx-auto px-8 sm:px-10">
        <div className="mb-14 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <span className="mb-3 block text-xs font-bold uppercase tracking-[0.25em] text-violet-400">
              The Artisans
            </span>
            <h2
              id="stylists-heading"
              className="font-display text-4xl font-bold tracking-tight lg:text-5xl"
            >
              Meet your next
              <br />
              <span className="text-zinc-500">favourite stylist.</span>
            </h2>
          </div>
          <Link href="/stylists">
            <button className="group flex shrink-0 items-center gap-2 rounded-full border border-white/10 px-5 py-2.5 text-sm font-semibold text-zinc-400 transition hover:border-violet-500/40 hover:text-white">
              View All Stylists
              <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </button>
          </Link>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {stylists.map((stylist, i) => (
            <motion.article
              key={stylist.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: i * 0.1, duration: 0.6 }}
              whileHover={{ y: -8 }}
              className="group relative overflow-hidden rounded-3xl border border-white/10 bg-[#131316] transition-shadow duration-500 hover:shadow-2xl hover:shadow-violet-500/10"
            >
              {/* Photo */}
              <div className="relative h-72 overflow-hidden">
                <img
                  src={stylist.img}
                  alt={`${stylist.name}, ${stylist.role} at Qwik Saloon`}
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  width={400}
                  height={288}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#131316] via-transparent to-transparent" />
                {/* Rating badge */}
                <div
                  className="absolute right-4 top-4 flex items-center gap-1 rounded-full border border-white/10 bg-black/60 px-3 py-1.5 text-xs font-bold backdrop-blur-md"
                  aria-label={`Rating: ${stylist.rating} from ${stylist.reviews} reviews`}
                >
                  <Star className="h-3 w-3 fill-amber-400 text-amber-400" aria-hidden="true" />
                  <span className="text-white">{stylist.rating}</span>
                  <span className="text-zinc-500">({stylist.reviews})</span>
                </div>
              </div>

              {/* Info */}
              <div className="p-6">
                <h3 className="font-display text-xl font-bold text-white">
                  {stylist.name}
                </h3>
                <p className="mt-0.5 text-xs font-semibold uppercase tracking-wider text-violet-400">
                  {stylist.role}
                </p>
                <p className="mt-3 text-sm text-zinc-500">{stylist.specialty}</p>

                <Link href="/sign-up">
                  <button className="mt-5 w-full rounded-2xl border border-white/10 bg-white/5 py-3 text-sm font-semibold text-zinc-300 transition-all hover:border-violet-500/40 hover:bg-violet-500/10 hover:text-white">
                    Book with {stylist.name.split(" ")[0]}
                  </button>
                </Link>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
