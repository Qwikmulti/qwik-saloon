'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { Card, Badge, Button } from '@/components/ui';
import { Calendar, Users, DollarSign, TrendingUp, Clock, Scissors, Star, Settings, ChevronRight } from 'lucide-react';

const stats = [
  { label: 'Total Bookings', value: '1,247', change: '+18%', trend: 'up', icon: Calendar },
  { label: 'Active Stylists', value: '8', change: '+2', trend: 'up', icon: Users },
  { label: 'Revenue (MTD)', value: '£12,450', change: '+24%', trend: 'up', icon: DollarSign },
  { label: 'Avg Rating', value: '4.8', change: '+0.2', trend: 'up', icon: Star },
];

const recentBookings = [
  { id: '1', service: 'Precision Cut', client: 'Sarah M.', stylist: 'Alexandra C.', date: 'Today, 2:00 PM', status: 'confirmed' },
  { id: '2', service: 'Full Colour', client: 'Emma L.', stylist: 'Sofia R.', date: 'Today, 3:30 PM', status: 'confirmed' },
  { id: '3', service: 'Highlights', client: 'James T.', stylist: 'Alexandra C.', date: 'Tomorrow, 10:00 AM', status: 'pending' },
];

const topServices = [
  { name: 'Precision Cut', bookings: 342, revenue: '£11,970' },
  { name: 'Full Colour', bookings: 198, revenue: '£12,870' },
  { name: 'Highlights', bookings: 156, revenue: '£13,260' },
  { name: 'Deep Treatment', bookings: 124, revenue: '£5,580' },
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

export default function AdminDashboardPage() {
  return (
    <div className="space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between"
      >
        <div>
          <h1 className="font-display text-3xl font-bold">Admin Dashboard</h1>
          <p className="text-zinc-400">Manage your salon operations</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" className="gap-2 border-white/10">
            <Settings className="h-4 w-4" />
            Settings
          </Button>
        </div>
      </motion.div>

      <div className="grid gap-4 md:grid-cols-4">
        {stats.map((stat, i) => (
          <BentoCard key={stat.label} delay={i * 0.1} className="p-6">
            <div className="flex items-start justify-between">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-white/10 bg-white/5">
                <stat.icon className="h-6 w-6 text-violet-400" />
              </div>
              <Badge variant="default" className="text-xs bg-emerald-500/20 text-emerald-400">
                {stat.change}
              </Badge>
            </div>
            <div className="mt-4">
              <p className="font-display text-3xl font-bold">{stat.value}</p>
              <p className="text-sm text-zinc-500">{stat.label}</p>
            </div>
          </BentoCard>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <BentoCard delay={0.4} className="lg:col-span-2 p-6">
          <div className="mb-6 flex items-center justify-between">
            <h2 className="font-display text-lg font-semibold">Recent Bookings</h2>
            <Link href="/admin/bookings" className="text-sm text-violet-400 hover:text-violet-300">
              View all
            </Link>
          </div>
          
          <div className="space-y-3">
            {recentBookings.map((booking) => (
              <div
                key={booking.id}
                className="flex items-center justify-between rounded-xl border border-white/5 bg-white/5 p-4"
              >
                <div className="flex items-center gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-white/10 bg-white/5">
                    <Scissors className="h-5 w-5 text-violet-400" />
                  </div>
                  <div>
                    <p className="font-medium">{booking.service}</p>
                    <p className="text-sm text-zinc-500">{booking.client} with {booking.stylist}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <span className="text-sm text-zinc-400">{booking.date}</span>
                  <Badge 
                    variant={booking.status === 'confirmed' ? 'default' : 'outline'}
                    className={booking.status === 'confirmed' ? 'bg-violet-500/20 text-violet-400' : ''}
                  >
                    {booking.status}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </BentoCard>

        <BentoCard delay={0.5} className="p-6">
          <h2 className="mb-6 font-display text-lg font-semibold">Quick Actions</h2>
          <div className="space-y-3">
            <Button variant="outline" className="w-full justify-start gap-3 border-white/10">
              <Users className="h-4 w-4" />
              Manage Stylists
            </Button>
            <Button variant="outline" className="w-full justify-start gap-3 border-white/10">
              <Scissors className="h-4 w-4" />
              Manage Services
            </Button>
            <Button variant="outline" className="w-full justify-start gap-3 border-white/10">
              <TrendingUp className="h-4 w-4" />
              View Analytics
            </Button>
            <Button variant="outline" className="w-full justify-start gap-3 border-white/10">
              <Settings className="h-4 w-4" />
              Settings
            </Button>
          </div>
        </BentoCard>
      </div>

      <BentoCard delay={0.6} className="p-6">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="font-display text-lg font-semibold">Top Services This Month</h2>
          <Link href="/admin/services" className="text-sm text-violet-400 hover:text-violet-300">
            Manage Services
          </Link>
        </div>
        
        <div className="space-y-4">
          {topServices.map((service, i) => (
            <div key={service.name} className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/5 text-sm font-medium">
                  {i + 1}
                </span>
                <span className="font-medium">{service.name}</span>
              </div>
              <div className="flex items-center gap-8 text-sm text-zinc-400">
                <span>{service.bookings} bookings</span>
                <span className="font-medium text-violet-400">{service.revenue}</span>
              </div>
            </div>
          ))}
        </div>
      </BentoCard>
    </div>
  );
}