import Link from 'next/link';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { ArrowRight, Clock, MapPin, Star, Users, Scissors, Sparkles, Crown, Heart, Award } from 'lucide-react';
import { Button, Card } from '@/components/ui';

function AnimatedCounter({ value, label, suffix = '' }: { value: number; label: string; suffix?: string }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  
  return (
    <div ref={ref} className="text-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.5 }}
        animate={isInView ? { opacity: 1, scale: 1 } : {}}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="font-display text-5xl font-bold lg:text-6xl"
      >
        {value.toLocaleString()}{suffix}
      </motion.div>
      <p className="mt-2 text-sm uppercase tracking-wider text-zinc-500">{label}</p>
    </div>
  );
}

function FeatureCard({ icon: Icon, title, description }: { icon: any; title: string; description: string }) {
  return (
    <motion.div
      whileHover={{ y: -4 }}
      className="group relative overflow-hidden rounded-2xl border border-white/5 bg-[#131316] p-6 transition-all duration-500 hover:border-violet-500/30 hover:shadow-lg hover:shadow-violet-500/10"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-violet-600/5 to-fuchsia-600/5 opacity-0 transition-opacity group-hover:opacity-100" />
      <div className="relative">
        <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-violet-600 to-fuchsia-600 shadow-lg shadow-violet-500/25">
          <Icon className="h-6 w-6 text-white" />
        </div>
        <h3 className="mb-2 font-display text-lg font-semibold">{title}</h3>
        <p className="text-sm leading-relaxed text-zinc-400">{description}</p>
      </div>
    </motion.div>
  );
}

function ServiceCard({ name, description, price, duration, icon: Icon }: { name: string; description: string; price: string; duration: string; icon: any }) {
  return (
    <motion.div
      whileHover={{ y: -8, scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className="group relative overflow-hidden rounded-2xl border border-white/5 bg-[#131316] transition-all duration-500 hover:border-violet-500/30"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-violet-600/10 via-transparent to-fuchsia-600/10 opacity-0 transition-opacity group-hover:opacity-100" />
      <div className="relative p-6">
        <div className="mb-4 flex items-start justify-between">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-white/10 bg-white/5 transition-colors group-hover:border-violet-500/30">
            <Icon className="h-7 w-7 text-violet-400" />
          </div>
          <span className="text-xs font-medium uppercase tracking-wider text-zinc-500">{duration}</span>
        </div>
        <h3 className="mb-2 font-display text-xl font-semibold">{name}</h3>
        <p className="mb-4 text-sm leading-relaxed text-zinc-400">{description}</p>
        <div className="flex items-center justify-between">
          <div>
            <span className="font-display text-2xl font-bold text-violet-400">{price}</span>
          </div>
          <Button asChild size="sm" variant="ghost" className="gap-2 opacity-0 transition-opacity group-hover:opacity-100">
            <Link href="/sign-up">
              Book <ArrowRight className="h-3 w-3" />
            </Link>
          </Button>
        </div>
      </div>
    </motion.div>
  );
}

function TestimonialCard({ name, text, rating }: { name: string; text: string; rating: number }) {
  return (
    <Card className="group relative overflow-hidden rounded-2xl border border-white/5 bg-[#131316] p-6 transition-all duration-500 hover:border-violet-500/30">
      <div className="absolute inset-0 bg-gradient-to-br from-violet-600/5 to-fuchsia-600/5 opacity-0 transition-opacity group-hover:opacity-100" />
      <div className="relative">
        <div className="mb-4 flex gap-1">
          {[...Array(rating)].map((_, i) => (
            <Star key={i} className="h-4 w-4 fill-amber-400 text-amber-400" />
          ))}
        </div>
        <p className="mb-6 leading-relaxed text-zinc-300">&ldquo;{text}&rdquo;</p>
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-violet-600 to-fuchsia-600 text-sm font-bold">
            {name.charAt(0)}
          </div>
          <p className="font-medium">{name}</p>
        </div>
      </div>
    </Card>
  );
}

export default function HomePage() {
  const stats = [
    { value: 2500, label: 'Happy Clients', suffix: '+' },
    { value: 15, label: 'Expert Stylists' },
    { value: 5, label: 'Years Experience' },
    { value: 4.9, label: 'Average Rating', suffix: '/5' },
  ];

  const features = [
    { icon: Clock, title: 'Instant Booking', description: 'Book your appointment in seconds with real-time availability and instant confirmation.' },
    { icon: Users, title: 'Expert Stylists', description: 'Our talented team brings years of experience to every appointment.' },
    { icon: MapPin, title: 'Central Location', description: 'Conveniently located in the heart of London with easy transport links.' },
    { icon: Crown, title: 'Premium Experience', description: 'Relax in our luxurious salon while we transform your look.' },
  ];

  const services = [
    { name: 'Precision Cuts', description: 'Expert cuts tailored to your face shape and lifestyle', price: 'From £35', duration: '45-60 min', icon: Scissors },
    { name: 'Colour Artistry', description: 'Full colour, highlights, balayage, and creative colour', price: 'From £65', duration: '90-180 min', icon: Sparkles },
    { name: 'Luxury Treatments', description: 'Deep conditioning, keratin, and restorative therapies', price: 'From £45', duration: '45-90 min', icon: Heart },
    { name: 'Bridal Styling', description: 'Stunning bridal looks for your special day', price: 'From £120', duration: '60-120 min', icon: Award },
  ];

  const testimonials = [
    { name: 'Sarah Mitchell', text: 'Best salon experience ever! The booking was seamless and my stylist absolutely understood what I wanted.', rating: 5 },
    { name: 'James Thompson', text: 'Professional service with amazing results every single time. My go-to salon for the past 3 years.', rating: 5 },
    { name: 'Emma Laurent', text: 'Love the atmosphere and the team. They always make me feel special and deliver beyond expectations.', rating: 5 },
  ];

  return (
    <div className="flex flex-col overflow-hidden">
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-violet-600/20 via-[#0a0a0b] to-fuchsia-600/20" />
        <div className="absolute left-1/4 top-1/4 h-96 w-96 rounded-full bg-violet-600/20 blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 h-96 w-96 rounded-full bg-fuchsia-600/20 blur-3xl" />
        
        <div className="container relative mx-auto px-6 py-24">
          <div className="mx-auto max-w-4xl text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="mb-6"
            >
              <span className="inline-flex items-center gap-2 rounded-full border border-violet-500/30 bg-violet-500/10 px-4 py-1.5 text-sm font-medium text-violet-400">
                <Sparkles className="h-4 w-4" />
                Premium Unisex Salon
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="font-display mb-6 text-5xl font-bold leading-[1.1] tracking-tight sm:text-6xl lg:text-7xl"
            >
              Your Style,{' '}
              <span className="bg-gradient-to-r from-violet-400 via-fuchsia-400 to-violet-400 bg-clip-text text-transparent">
                Your Way
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="mx-auto mb-10 max-w-2xl text-lg text-zinc-400 sm:text-xl"
            >
              Premium hair and beauty services crafted by expert stylists. Book your appointment in seconds and experience the difference.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="flex flex-col gap-4 sm:flex-row sm:justify-center"
            >
              <Button asChild size="lg" className="bg-gradient-to-r from-violet-600 to-fuchsia-600 px-8 shadow-lg shadow-violet-500/25">
                <Link href="/sign-up">
                  Book Appointment
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="border-white/10 hover:bg-white/5">
                <Link href="/services">
                  View Services
                </Link>
              </Button>
            </motion.div>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 1 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="flex flex-col items-center gap-2 text-xs text-zinc-500"
          >
            <span>Scroll to explore</span>
            <div className="h-8 w-5 rounded-full border border-zinc-700 p-1">
              <motion.div
                animate={{ y: [0, 12, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="h-1.5 rounded-full bg-zinc-500"
              />
            </div>
          </motion.div>
        </motion.div>
      </section>

      <section className="relative border-y border-white/5 bg-[#0a0a0b] py-20">
        <div className="container mx-auto px-6">
          <div className="grid gap-8 lg:grid-cols-4">
            {stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="relative"
              >
                <AnimatedCounter value={stat.value} label={stat.label} suffix={stat.suffix} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="relative py-24">
        <div className="container mx-auto px-6">
          <div className="mb-16 text-center">
            <motion.span
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="mb-4 inline-block text-sm font-medium uppercase tracking-wider text-violet-400"
            >
              Why Choose Us
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="font-display text-3xl font-bold sm:text-4xl"
            >
              Experience the Qwik Difference
            </motion.h2>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {features.map((feature, i) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <FeatureCard {...feature} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden py-24">
        <div className="absolute inset-0 bg-gradient-to-b from-violet-600/5 via-transparent to-fuchsia-600/5" />
        
        <div className="container relative mx-auto px-6">
          <div className="mb-16 flex items-end justify-between">
            <div>
              <motion.span
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                className="mb-4 inline-block text-sm font-medium uppercase tracking-wider text-violet-400"
              >
                Our Services
              </motion.span>
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="font-display text-3xl font-bold sm:text-4xl"
              >
                Premium Services
              </motion.h2>
            </div>
            <Button asChild variant="outline" className="hidden border-white/10 hover:bg-white/5 sm:flex">
              <Link href="/services">
                View All <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {services.map((service, i) => (
              <motion.div
                key={service.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <ServiceCard {...service} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="relative py-24">
        <div className="container mx-auto px-6">
          <div className="mb-16 text-center">
            <motion.span
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="mb-4 inline-block text-sm font-medium uppercase tracking-wider text-violet-400"
            >
              Testimonials
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="font-display text-3xl font-bold sm:text-4xl"
            >
              What Our Clients Say
            </motion.h2>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {testimonials.map((testimonial, i) => (
              <motion.div
                key={testimonial.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <TestimonialCard {...testimonial} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="relative py-24">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative overflow-hidden rounded-3xl border border-white/5 bg-gradient-to-br from-violet-600/20 to-fuchsia-600/20 p-12 text-center lg:p-16"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-violet-600/10 to-fuchsia-600/10" />
            <div className="relative mx-auto max-w-2xl">
              <h2 className="mb-4 font-display text-3xl font-bold sm:text-4xl">
                Ready to Transform Your Look?
              </h2>
              <p className="mb-8 text-lg text-zinc-400">
                Book your appointment today and experience premium hair and beauty services.
              </p>
              <Button asChild size="lg" className="bg-white px-8 text-[#0a0a0b] hover:bg-zinc-200">
                <Link href="/sign-up">
                  Book Your Appointment
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}