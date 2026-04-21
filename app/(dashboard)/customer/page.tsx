'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { Calendar, Clock, DollarSign, Star, ArrowRight, Sparkles, Plus, History } from 'lucide-react';
import { Card, Button, Badge } from '@/components/ui';

const upcomingBookings = [
  { id: '1', service: 'Precision Cut & Style', stylist: 'Alexandra C.', date: 'Tomorrow', time: '2:00 PM', price: 55 },
  { id: '2', service: 'Full Head Highlights', stylist: 'Sofia R.', date: 'Feb 15', time: '10:00 AM', price: 120 },
];

const pastServices = [
  { id: '1', service: 'Haircut & Styling', date: 'Jan 20', price: 45 },
  { id: '2', service: 'Deep Conditioning', date: 'Jan 5', price: 35 },
  { id: '3', service: 'Colour Touch-up', date: 'Dec 18', price: 65 },
];

const services = [
  { id: 'haircut', name: 'Precision Cuts', price: 'From £35', icon: Sparkles },
  { id: 'color', name: 'Colour & Highlights', price: 'From £65', icon: Star },
  { id: 'treatment', name: 'Treatments', price: 'From £45', icon: Sparkles },
];

function BentoCard({ children, className = '', delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay }}
      className={`relative overflow-hidden rounded-2xl border border-white/5 bg-[#131316] ${className}`}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-violet-600/5 to-fuchsia-600/5 opacity-0 transition-opacity hover:opacity-100" />
      <div className="relative h-full">{children}</div>
    </motion.div>
  );
}

function StatCard({ icon: Icon, label, value, trend, delay = 0 }: { icon: any; label: string; value: string; trend?: string; delay?: number }) {
  return (
    <BentoCard delay={delay} className="p-6">
      <div className="flex items-start justify-between">
        <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-white/10 bg-white/5">
          <Icon className="h-6 w-6 text-violet-400" />
        </div>
        {trend && (
          <Badge variant="outline" className="text-xs text-emerald-400 border-emerald-400/30">
            {trend}
          </Badge>
        )}
      </div>
      <div className="mt-4">
        <p className="font-display text-3xl font-bold">{value}</p>
        <p className="text-sm text-zinc-500">{label}</p>
      </div>
    </BentoCard>
  );
}

export default function CustomerDashboardPage() {
  return (
    <div className="space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between"
      >
        <div>
          <h1 className="font-display text-3xl font-bold">Welcome Back</h1>
          <p className="text-zinc-400">Manage your appointments and discover new services</p>
        </div>
        <Button asChild className="gap-2 bg-gradient-to-r from-violet-600 to-fuchsia-600">
          <Link href="/services">
            <Plus className="h-4 w-4" />
            Book New
          </Link>
        </Button>
      </motion.div>

      <div className="grid gap-4 md:grid-cols-4">
        <StatCard icon={Calendar} label="Upcoming" value="2" delay={0.1} />
        <StatCard icon={DollarSign} label="Total Spent" value="£245" delay={0.2} />
        <StatCard icon={Star} label="Visits" value="8" trend="+2 this month" delay={0.3} />
        <StatCard icon={Clock} label="Member Since" value="Jan '26" delay={0.4} />
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <BentoCard delay={0.2} className="lg:col-span-2 p-6">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="font-display text-lg font-semibold">Upcoming Appointments</h2>
            <Link href="/customer/bookings" className="text-sm text-violet-400 hover:text-violet-300">
              View all
            </Link>
          </div>
          <div className="space-y-4">
            {upcomingBookings.map((booking) => (
              <div
                key={booking.id}
                className="flex items-center justify-between rounded-xl border border-white/5 bg-white/5 p-4"
              >
                <div className="flex items-center gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-white/10 bg-white/5">
                    <Calendar className="h-6 w-6 text-violet-400" />
                  </div>
                  <div>
                    <p className="font-medium">{booking.service}</p>
                    <p className="text-sm text-zinc-500">{booking.stylist}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-medium">{booking.date}</p>
                  <p className="text-sm text-zinc-500">{booking.time}</p>
                </div>
              </div>
            ))}
            {upcomingBookings.length === 0 && (
              <div className="py-8 text-center">
                <p className="text-zinc-500">No upcoming appointments</p>
              </div>
            )}
          </div>
        </BentoCard>

        <BentoCard delay={0.3} className="p-6">
          <h2 className="mb-4 font-display text-lg font-semibold">Quick Book</h2>
          <div className="space-y-3">
            {services.map((service) => (
              <Link key={service.id} href={`/services?category=${service.id}`}>
                <motion.div
                  whileHover={{ x: 4 }}
                  className="flex items-center justify-between rounded-xl border border-white/5 bg-white/5 p-3 transition-colors hover:border-violet-500/30"
                >
                  <div className="flex items-center gap-3">
                    <service.icon className="h-5 w-5 text-violet-400" />
                    <span className="text-sm">{service.name}</span>
                  </div>
                  <ArrowRight className="h-4 w-4 text-zinc-500" />
                </motion.div>
              </Link>
            ))}
          </div>
        </BentoCard>
      </div>

      <BentoCard delay={0.4} className="p-6">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="font-display text-lg font-semibold">Recent Services</h2>
          <Link href="/customer/bookings" className="text-sm text-violet-400 hover:text-violet-300">
            View history
          </Link>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-white/5">
                <th className="pb-3 text-left text-xs font-medium uppercase tracking-wider text-zinc-500">Service</th>
                <th className="pb-3 text-left text-xs font-medium uppercase tracking-wider text-zinc-500">Date</th>
                <th className="pb-3 text-right text-xs font-medium uppercase tracking-wider text-zinc-500">Price</th>
              </tr>
            </thead>
            <tbody>
              {pastServices.map((service) => (
                <tr key={service.id} className="border-b border-white/5 last:border-0">
                  <td className="py-4">{service.service}</td>
                  <td className="py-4 text-zinc-400">{service.date}</td>
                  <td className="py-4 text-right font-medium">£{service.price}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </BentoCard>
    </div>
  );
}