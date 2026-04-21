import Link from 'next/link';
import { motion } from 'framer-motion';
import { connectDB } from '@/lib/mongodb/connection';
import { Service } from '@/models';
import { Button, Card, Badge } from '@/components/ui';
import { ArrowRight, Clock, DollarSign, Sparkles, Scissors, Heart, Crown } from 'lucide-react';
import { formatCurrency } from '@/lib/utils';
import { SERVICE_CATEGORIES } from '@/lib/constants';

const categoryIcons: Record<string, any> = {
  haircut: Scissors,
  coloring: Sparkles,
  treatment: Heart,
  styling: Crown,
  other: Sparkles,
};

const categoryGradients: Record<string, string> = {
  haircut: 'from-violet-600 to-violet-700',
  coloring: 'from-fuchsia-600 to-fuchsia-700',
  treatment: 'from-emerald-600 to-emerald-700',
  styling: 'from-amber-600 to-amber-700',
  other: 'from-slate-600 to-slate-700',
};

export default async function ServicesPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string }>;
}) {
  const params = await searchParams;
  await connectDB();

  const filter: Record<string, any> = { isActive: true };
  if (params.category) filter.category = params.category;

  const services = await Service.find(filter).sort({ category: 1, name: 1 });
  const groupedServices = services.reduce((acc: Record<string, any[]>, service) => {
    const category = service.category;
    if (!acc[category]) acc[category] = [];
    acc[category].push(service);
    return acc;
  }, {} as Record<string, any[]>);

  return (
    <div className="min-h-screen py-32">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-16 text-center"
        >
          <span className="mb-4 inline-block text-sm font-medium uppercase tracking-wider text-violet-400">
            Our Services
          </span>
          <h1 className="font-display text-4xl font-bold sm:text-5xl lg:text-6xl">
            Premium Services
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-zinc-400">
            Professional hair and beauty services tailored to your unique style. Every visit is a step closer to your best self.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-12 flex flex-wrap justify-center gap-3"
        >
          <Link href="/services">
            <Button variant={!params.category ? 'default' : 'outline'} size="lg" className="rounded-full">
              All Services
            </Button>
          </Link>
          {SERVICE_CATEGORIES.map((cat) => {
            const Icon = categoryIcons[cat.value] || Sparkles;
            return (
              <Link key={cat.value} href={`/services?category=${cat.value}`}>
                <Button
                  variant={params.category === cat.value ? 'default' : 'outline'}
                  size="lg"
                  className="gap-2 rounded-full"
                >
                  <Icon className="h-4 w-4" />
                  {cat.label}
                </Button>
              </Link>
            );
          })}
        </motion.div>

        {Object.entries(groupedServices).map(([category, categoryServices]) => (
          <motion.div
            key={category}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mb-16"
          >
            <div className="mb-8 flex items-center gap-4">
              <div className={`flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br ${categoryGradients[category] || 'from-violet-600 to-fuchsia-600'} shadow-lg`}>
                {(() => {
                  const Icon = categoryIcons[category] || Sparkles;
                  return <Icon className="h-6 w-6 text-white" />;
                })()}
              </div>
              <div>
                <h2 className="font-display text-2xl font-bold capitalize">
                  {SERVICE_CATEGORIES.find((c) => c.value === category)?.label || category}
                </h2>
                <p className="text-sm text-zinc-500">
                  {categoryServices.length} service{categoryServices.length !== 1 ? 's' : ''}
                </p>
              </div>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {categoryServices.map((service, i) => (
                <motion.div
                  key={service._id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                  whileHover={{ y: -8, scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="group relative overflow-hidden rounded-2xl border border-white/5 bg-[#131316] transition-all duration-500 hover:border-violet-500/30"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-violet-600/10 to-fuchsia-600/10 opacity-0 transition-opacity group-hover:opacity-100" />
                  <div className="relative p-6">
                    <div className="mb-4 flex items-start justify-between">
                      <Badge variant="outline" className="text-xs">
                        {service.durationMinutes} min
                      </Badge>
                      <span className="font-display text-2xl font-bold text-violet-400">
                        {formatCurrency(service.basePrice)}
                      </span>
                    </div>
                    <h3 className="mb-2 font-display text-xl font-semibold">{service.name}</h3>
                    {service.description && (
                      <p className="mb-6 text-sm leading-relaxed text-zinc-400">
                        {service.description}
                      </p>
                    )}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4 text-sm text-zinc-500">
                        <span className="flex items-center gap-1">
                          <Clock className="h-4 w-4" />
                          {service.durationMinutes} min
                        </span>
                        <span className="flex items-center gap-1">
                          <DollarSign className="h-4 w-4" />
                          From {formatCurrency(service.basePrice)}
                        </span>
                      </div>
                    </div>
                    <Link href={`/booking?service=${service._id}`}>
                      <Button className="mt-4 w-full gap-2 bg-gradient-to-r from-violet-600 to-fuchsia-600">
                        Book Now <ArrowRight className="h-4 w-4" />
                      </Button>
                    </Link>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        ))}

        {services.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="py-24 text-center"
          >
            <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-2xl border border-white/10 bg-white/5">
              <Sparkles className="h-10 w-10 text-zinc-500" />
            </div>
            <h3 className="mb-2 font-display text-xl font-semibold">No Services Found</h3>
            <p className="mb-6 text-zinc-400">Check back soon for new services.</p>
            <Button asChild>
              <Link href="/services">View All Services</Link>
            </Button>
          </motion.div>
        )}
      </div>
    </div>
  );
}