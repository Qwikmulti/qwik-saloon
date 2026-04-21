import { motion } from 'framer-motion';
import { Card } from '@/components/ui';
import { Scissors, Award, Heart, Sparkles, Users, Clock, MapPin, Phone, Mail, Shield, Leaf } from 'lucide-react';

function ValueCard({ icon: Icon, title, description }: { icon: any; title: string; description: string }) {
  return (
    <motion.div
      whileHover={{ y: -4 }}
      className="group relative overflow-hidden rounded-2xl border border-white/5 bg-[#131316] p-8 transition-all duration-500 hover:border-violet-500/30"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-violet-600/5 to-fuchsia-600/5 opacity-0 transition-opacity group-hover:opacity-100" />
      <div className="relative">
        <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-violet-600 to-fuchsia-600 shadow-lg shadow-violet-500/25">
          <Icon className="h-7 w-7 text-white" />
        </div>
        <h3 className="mb-3 font-display text-xl font-semibold">{title}</h3>
        <p className="leading-relaxed text-zinc-400">{description}</p>
      </div>
    </motion.div>
  );
}

function TeamMemberCard({ name, role, bio }: { name: string; role: string; bio: string }) {
  return (
    <Card className="group relative overflow-hidden rounded-2xl border border-white/5 bg-[#131316] p-6 transition-all duration-500 hover:border-violet-500/30">
      <div className="absolute inset-0 bg-gradient-to-br from-violet-600/10 to-fuchsia-600/10 opacity-0 transition-opacity group-hover:opacity-100" />
      <div className="relative">
        <div className="mb-4 flex h-24 w-24 items-center justify-center rounded-2xl bg-gradient-to-br from-violet-600 to-fuchsia-600 text-3xl font-bold">
          {name.charAt(0)}
        </div>
        <h3 className="mb-1 font-display text-lg font-semibold">{name}</h3>
        <p className="mb-3 text-sm font-medium text-violet-400">{role}</p>
        <p className="line-clamp-3 text-sm leading-relaxed text-zinc-400">{bio}</p>
      </div>
    </Card>
  );
}

export default function AboutPage() {
  const values = [
    { icon: Shield, title: 'Quality First', description: 'We never compromise on quality. Every service, every time. Our stylists use only premium products and the latest techniques.' },
    { icon: Heart, title: 'Client Focused', description: 'Your satisfaction is our priority. We listen carefully and deliver results that exceed expectations.' },
    { icon: Users, title: 'Inclusive', description: 'We celebrate diversity and welcome everyone. Our services are tailored to all hair types, textures, and styles.' },
    { icon: Leaf, title: 'Sustainable', description: 'Committed to environmentally responsible practices. We use eco-friendly products and minimise waste.' },
  ];

  const team = [
    { name: 'Alexandra Chen', role: 'Creative Director', bio: '15 years of experience in colour artistry and precision cutting. Trained at Vidal Sassoon Academy.' },
    { name: 'Marcus Thompson', role: 'Senior Stylist', bio: 'Specialist in textured hair and protective styling. Known for transformative makeovers.' },
    { name: 'Sofia Rodriguez', role: 'Colour Specialist', bio: 'Balayage and colour expert trained in Paris and Milan. Creating lived-in, effortless looks.' },
    { name: 'James Park', role: 'Men\'s Grooming', bio: 'Contemporary men\'s grooming specialist. Precision cuts with modern finishing techniques.' },
  ];

  return (
    <div className="min-h-screen py-32">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-24 text-center"
        >
          <span className="mb-4 inline-block text-sm font-medium uppercase tracking-wider text-violet-400">
            Our Story
          </span>
          <h1 className="font-display text-4xl font-bold sm:text-5xl lg:text-6xl">
            About Qwik Salon
          </h1>
          <p className="mx-auto mt-6 max-w-3xl text-xl leading-relaxed text-zinc-400">
            Where style meets artistry. We believe everyone deserves to look and feel their best,
            which is why we&apos;ve created a space where premium services meet approachable expertise.
          </p>
        </motion.div>

        <div className="mb-24 grid gap-8 lg:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative overflow-hidden rounded-3xl border border-white/5 bg-gradient-to-br from-violet-600/20 to-fuchsia-600/20 p-12 lg:p-16"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-violet-600/10 to-fuchsia-600/10" />
            <div className="relative">
              <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-white/10">
                <Scissors className="h-8 w-8" />
              </div>
              <h2 className="mb-4 font-display text-2xl font-bold">Our Story</h2>
              <div className="space-y-4 text-zinc-300">
                <p>
                  Founded in 2020, Qwik Salon was born from a simple belief: premium hair
                  and beauty services should be accessible to everyone.
                </p>
                <p>
                  What started as a vision for seamless booking has grown into a beloved destination
                  where clients across the UK discover their best selves.
                </p>
                <p>
                  Today, we&apos;re proud to be a unisex salon that celebrates diversity, champions
                  sustainability, and delivers exceptional results every visit.
                </p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative overflow-hidden rounded-3xl border border-white/5 bg-[#131316] p-12 lg:p-16"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-violet-600/5 to-fuchsia-600/5" />
            <div className="relative">
              <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl border border-white/10 bg-white/5">
                <Award className="h-8 w-8 text-violet-400" />
              </div>
              <h2 className="mb-4 font-display text-2xl font-bold">Our Standards</h2>
              <div className="space-y-4 text-zinc-300">
                <p>
                  Our team of trained professionals uses only the highest quality products
                  from trusted brands like Olaplex, Wella, and Schwarzkopf.
                </p>
                <p>
                  We continuously invest in training, attending international seminars and staying
                  ahead of the latest trends and techniques.
                </p>
                <p>
                  Every service is backed by our satisfaction guarantee because your happiness is our
                  ultimate measure of success.
                </p>
              </div>
            </div>
          </motion.div>
        </div>

        <section className="mb-24">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12 text-center font-display text-3xl font-bold"
          >
            Our Values
          </motion.h2>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {values.map((value, i) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <ValueCard {...value} />
              </motion.div>
            ))}
          </div>
        </section>

        <section className="mb-24">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12 text-center font-display text-3xl font-bold"
          >
            Meet Our Team
          </motion.h2>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {team.map((member, i) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <TeamMemberCard {...member} />
              </motion.div>
            ))}
          </div>
        </section>

        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="rounded-3xl border border-white/5 bg-gradient-to-br from-violet-600/10 to-fuchsia-600/10 p-12 text-center"
        >
          <div className="mx-auto max-w-2xl">
            <h2 className="mb-4 font-display text-3xl font-bold">Visit Us Today</h2>
            <p className="mb-8 text-zinc-400">
              Experience the Qwik Salon difference for yourself. We can&apos;t wait to meet you.
            </p>
            <div className="flex flex-wrap justify-center gap-6 text-sm">
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-violet-400" />
                <span>123 High Street, London EC1A 1BB</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-violet-400" />
                <span>+44 20 1234 5678</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-violet-400" />
                <span>hello@qwiksalon.co.uk</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-violet-400" />
                <span>Mon-Sat: 9am - 7pm</span>
              </div>
            </div>
          </div>
        </motion.section>
      </div>
    </div>
  );
}