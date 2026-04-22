import Link from 'next/link';
import { connectDB } from '@/lib/mongodb/connection';
import { Service } from '@/models';
import { Button, BentoGrid, BentoBox } from '@/components/ui';
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
    <div className="min-h-screen py-32 bg-[#050507]">
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="mb-20 text-center max-w-3xl mx-auto">
          <span className="mb-6 inline-block text-sm font-semibold uppercase tracking-[0.2em] text-violet-400">
            Our Menu
          </span>
          <h1 className="font-display text-5xl font-bold tracking-tight sm:text-6xl lg:text-7xl">
            Curated <span className="bg-gradient-to-r from-violet-400 to-fuchsia-400 bg-clip-text text-transparent">Treatments</span>
          </h1>
          <p className="mt-8 text-xl leading-relaxed text-zinc-400">
            Uncomplicated pricing. Transparent duration. Elite execution. Select your service category below to view our offerings.
          </p>
        </div>

        {/* Category Tabs (2026 style pills) */}
        <div className="mb-16 flex flex-wrap justify-center gap-3">
          <Link href="/services">
            <Button variant={!params.category ? 'default' : 'outline'} className={`rounded-full px-6 py-6 text-sm font-semibold tracking-wider uppercase transition-all ${!params.category ? 'bg-white text-black hover:bg-zinc-200' : 'border-white/10 bg-white/5 hover:bg-white/10 text-zinc-300'}`}>
              All Services
            </Button>
          </Link>
          {SERVICE_CATEGORIES.map((cat) => {
            const Icon = categoryIcons[cat.value] || Sparkles;
            const isActive = params.category === cat.value;
            return (
               <Link key={cat.value} href={`/services?category=${cat.value}`}>
                  <Button
                     variant={isActive ? 'default' : 'outline'}
                     className={`gap-3 rounded-full px-6 py-6 text-sm font-semibold tracking-wider uppercase transition-all ${isActive ? 'bg-gradient-to-r from-violet-600 to-fuchsia-600 border-none shadow-lg shadow-violet-500/25' : 'border-white/10 bg-white/5 hover:bg-white/10 text-zinc-300'}`}
                  >
                     <Icon className="h-4 w-4" />
                     {cat.label}
                  </Button>
               </Link>
            );
          })}
        </div>

        {Object.entries(groupedServices).map(([category, categoryServices]) => {
           const Icon = categoryIcons[category] || Sparkles;
           const catLabel = SERVICE_CATEGORIES.find((c) => c.value === category)?.label || category;

           return (
             <div key={category} className="mb-24">
               <div className="mb-10 flex items-center gap-4 border-b border-white/5 pb-4">
                 <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/5 border border-white/10">
                   <Icon className="h-6 w-6 text-violet-400" />
                 </div>
                 <h2 className="font-display text-3xl font-bold capitalize">{catLabel}</h2>
               </div>

               <BentoGrid columns={3}>
                 {categoryServices.map((service, i) => (
                   <BentoBox key={service._id} colSpan={1} className="flex flex-col group p-8">
                      <div className="mb-6 flex items-start justify-between">
                         <div className="flex flex-col">
                            <span className="font-display text-3xl font-bold bg-gradient-to-r from-violet-300 to-fuchsia-300 bg-clip-text text-transparent">
                               {formatCurrency(service.basePrice)}
                            </span>
                            <span className="text-xs uppercase tracking-widest text-zinc-500 mt-1">Starting Price</span>
                         </div>
                         <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-xs font-semibold text-zinc-300 tracking-wider">
                            <Clock className="h-3 w-3 text-emerald-400" />
                            {service.durationMinutes}m
                         </div>
                      </div>
                      
                      <h3 className="mb-3 font-display text-2xl font-bold text-zinc-100">{service.name}</h3>
                      {service.description && (
                         <p className="mb-8 text-sm leading-relaxed text-zinc-400 min-h-[60px]">
                            {service.description}
                         </p>
                      )}
                      
                      <div className="mt-auto pt-6 border-t border-white/5">
                         <Link href={`/booking?service=${service._id}`}>
                            <Button className="w-full gap-2 rounded-xl bg-white text-[#050507] hover:bg-zinc-200 transition-all font-semibold">
                               Select Treatment <ArrowRight className="h-4 w-4" />
                            </Button>
                         </Link>
                      </div>
                   </BentoBox>
                 ))}
               </BentoGrid>
             </div>
           );
        })}

        {services.length === 0 && (
          <div className="py-24 text-center border border-white/10 rounded-3xl bg-white/5 backdrop-blur-md max-w-2xl mx-auto">
             <Sparkles className="mx-auto h-12 w-12 text-zinc-500 mb-6 opacity-50" />
             <h3 className="font-display text-2xl font-bold mb-3">No Treatments Found</h3>
             <p className="text-zinc-400 mb-8">We couldn't locate services in this specific category.</p>
             <Button asChild className="rounded-full bg-violet-600">
                <Link href="/services">Clear Filters</Link>
             </Button>
          </div>
        )}
      </div>
    </div>
  );
}