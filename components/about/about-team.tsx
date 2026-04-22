"use client";

import { motion } from "framer-motion";

const team = [
  {
    name: "Alexandra Chen",
    role: "Creative Director",
    img: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=687&auto=format&fit=crop",
  },
  {
    name: "Marcus Thompson",
    role: "Senior Stylist",
    img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=687&auto=format&fit=crop",
  },
  {
    name: "Sofia Rodriguez",
    role: "Colour Specialist",
    img: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=764&auto=format&fit=crop",
  },
  {
    name: "James Park",
    role: "Men's Grooming",
    img: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=687&auto=format&fit=crop",
  },
];

export function AboutTeam() {
  return (
    <section className="py-32" aria-labelledby="team-heading">
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="mb-16 flex flex-col items-center text-center">
          <span className="mb-3 block text-xs font-bold uppercase tracking-[0.25em] text-violet-400">
            The Collective
          </span>
          <h2
            id="team-heading"
            className="font-display text-4xl font-bold tracking-tight lg:text-5xl"
          >
            Meet the Artisans
          </h2>
          <p className="mt-4 max-w-2xl text-lg text-zinc-400">
            Our team comprises industry leaders, hand-picked not just for their
            technical mastery, but for their ability to listen and translate vision
            into reality.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {team.map((t, i) => (
            <motion.article
              key={i}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: i * 0.1, duration: 0.6 }}
              whileHover={{ y: -10 }}
              className="group relative h-[450px] overflow-hidden rounded-[2rem] border border-white/10 bg-[#131316] transition-shadow hover:shadow-2xl hover:shadow-violet-500/20"
            >
              <div className="absolute inset-0 z-10 bg-gradient-to-t from-[#050507] via-[#050507]/20 to-transparent transition-opacity duration-500 group-hover:opacity-80" />
              
              <img
                src={t.img}
                alt={`${t.name}, ${t.role}`}
                className="absolute inset-0 h-full w-full object-cover grayscale transition-all duration-700 group-hover:scale-105 group-hover:grayscale-0"
              />

              <div className="absolute bottom-0 left-0 right-0 z-20 p-8">
                <h3 className="font-display text-2xl font-bold text-white transition-colors group-hover:text-violet-300">
                  {t.name}
                </h3>
                <p className="mt-2 text-xs font-medium uppercase tracking-wider text-fuchsia-400">
                  {t.role}
                </p>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
