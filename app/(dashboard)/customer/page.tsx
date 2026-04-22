'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { Calendar, Clock, DollarSign, Star, ArrowRight, Sparkles, Plus, History } from 'lucide-react';
import { Button, Badge, BentoGrid, BentoBox } from '@/components/ui';

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

export default function CustomerDashboardPage() {
  return (
    <div className="space-y-8 pb-12">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between"
      >
        <div>
          <h1 className="font-display text-4xl font-bold tracking-tight">Welcome Back</h1>
          <p className="mt-1 text-zinc-400">Manage your appointments and discover new services</p>
        </div>
        <Button asChild className="gap-2 bg-gradient-to-r from-violet-600 to-fuchsia-600 shadow-lg shadow-violet-500/25 transition-all hover:scale-105">
          <Link href="/services">
            <Plus className="h-4 w-4" />
            Book New
          </Link>
        </Button>
      </motion.div>

      <BentoGrid columns={4}>
        {/* Top Stat Cards */}
        <BentoBox colSpan={1} className="flex flex-col justify-between">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-violet-500/10 text-violet-400">
            <Calendar className="h-6 w-6" />
          </div>
          <div className="mt-6">
            <h3 className="text-sm font-medium text-zinc-500 uppercase tracking-wider">Upcoming</h3>
            <p className="mt-2 font-display text-4xl font-bold">2</p>
          </div>
        </BentoBox>
        <BentoBox colSpan={1} className="flex flex-col justify-between">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-500/10 text-emerald-400">
            <DollarSign className="h-6 w-6" />
          </div>
          <div className="mt-6">
            <h3 className="text-sm font-medium text-zinc-500 uppercase tracking-wider">Total Spent</h3>
            <p className="mt-2 font-display text-4xl font-bold">£245</p>
          </div>
        </BentoBox>
        <BentoBox colSpan={1} className="flex flex-col justify-between">
          <div className="flex items-start justify-between">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-amber-500/10 text-amber-400">
              <Star className="h-6 w-6" />
            </div>
            <Badge variant="outline" className="border-amber-400/30 text-amber-400 bg-amber-400/10 text-xs">
              +2 this month
            </Badge>
          </div>
          <div className="mt-6">
            <h3 className="text-sm font-medium text-zinc-500 uppercase tracking-wider">Visits</h3>
            <p className="mt-2 font-display text-4xl font-bold">8</p>
          </div>
        </BentoBox>
        <BentoBox colSpan={1} className="flex flex-col justify-between">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-fuchsia-500/10 text-fuchsia-400">
            <Clock className="h-6 w-6" />
          </div>
          <div className="mt-6">
            <h3 className="text-sm font-medium text-zinc-500 uppercase tracking-wider">Member Since</h3>
            <p className="mt-2 font-display text-2xl font-bold">Jan &apos;26</p>
          </div>
        </BentoBox>

        {/* Upcoming Appointments (Spans 2 columns, 2 rows) */}
        <BentoBox colSpan={2} rowSpan={2} className="flex flex-col">
          <div className="mb-6 flex items-center justify-between">
            <h2 className="font-display text-xl font-semibold">Upcoming Appointments</h2>
            <Link href="/customer/bookings" className="text-sm font-medium text-violet-400 hover:text-violet-300">
              View All
            </Link>
          </div>
          <div className="flex flex-1 flex-col gap-4">
            {upcomingBookings.map((booking, idx) => (
              <div
                key={booking.id}
                className="group relative overflow-hidden rounded-2xl border border-violet-500/20 bg-violet-500/5 p-5 transition-all hover:bg-violet-500/10"
              >
                <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-violet-500 to-fuchsia-500 opacity-60" />
                <div className="flex items-center justify-between">
                  <div className="flex gap-4">
                    <div className="flex flex-col items-center justify-center rounded-xl bg-black/40 px-3 py-2 text-center border border-white/5">
                      <span className="text-xs font-semibold text-zinc-400 uppercase">{booking.date === 'Tomorrow' ? 'TMR' : booking.date.split(' ')[0]}</span>
                      <span className="font-display text-lg font-bold text-violet-300">{booking.date === 'Tomorrow' ? 'W' : booking.date.split(' ')[1]}</span>
                    </div>
                    <div>
                      <p className="font-semibold text-zinc-100">{booking.service}</p>
                      <p className="text-sm text-zinc-400">with {booking.stylist}</p>
                      <div className="mt-1 flex items-center gap-2 text-xs font-medium text-zinc-500">
                        <Clock className="h-3 w-3" /> {booking.time}
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-violet-400">£{booking.price}</p>
                    <Button variant="ghost" size="sm" className="mt-2 h-8 px-2 text-xs">
                      Reschedule
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </BentoBox>

        {/* Quick Book (Spans 2 columns) */}
        <BentoBox colSpan={2} className="flex flex-col">
          <div className="mb-5 flex items-center justify-between">
             <h2 className="font-display text-xl font-semibold">Quick Book</h2>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            {services.map((service) => (
              <Link key={service.id} href={`/services?category=${service.id}`}>
                <div className="group flex h-full flex-col justify-between rounded-2xl border border-white/10 bg-white/5 p-4 transition-all hover:border-violet-500/40 hover:bg-violet-500/10">
                  <div className="flex items-start justify-between">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-violet-500/20 text-violet-400 transition-transform group-hover:scale-110">
                      <service.icon className="h-5 w-5" />
                    </div>
                    <ArrowRight className="h-5 w-5 text-zinc-600 transition-colors group-hover:text-violet-400" />
                  </div>
                  <div className="mt-4">
                    <p className="font-medium text-zinc-200">{service.name}</p>
                    <p className="text-xs text-zinc-500">{service.price}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </BentoBox>

        {/* History (Spans 2 columns) */}
        <BentoBox colSpan={2} className="flex flex-col">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="font-display text-lg font-semibold flex items-center gap-2">
              <History className="h-5 w-5 text-zinc-500" /> Recent Services
            </h2>
          </div>
          <div className="overflow-hidden rounded-xl border border-white/5 bg-black/20">
            <table className="w-full text-sm">
              <tbody className="divide-y divide-white/5">
                {pastServices.map((service) => (
                  <tr key={service.id} className="transition-colors hover:bg-white/5 hover:cursor-pointer">
                    <td className="p-4 font-medium text-zinc-300">{service.service}</td>
                    <td className="p-4 text-zinc-500">{service.date}</td>
                    <td className="p-4 text-right font-medium text-zinc-400">£{service.price}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </BentoBox>
      </BentoGrid>
    </div>
  );
}