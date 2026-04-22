'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { Card, Badge, Button, BentoGrid, BentoBox } from '@/components/ui';
import { Calendar, Users, DollarSign, TrendingUp, Clock, Scissors, Star, Settings, ChevronRight, Activity } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const stats = [
  { label: 'Total Bookings', value: '1,247', change: '+18%', trend: 'up', icon: Calendar, color: 'text-violet-400' },
  { label: 'Active Stylists', value: '8', change: '+2', trend: 'up', icon: Users, color: 'text-fuchsia-400' },
  { label: 'Revenue (MTD)', value: '£12,450', change: '+24%', trend: 'up', icon: DollarSign, color: 'text-emerald-400' },
  { label: 'Avg Rating', value: '4.8', change: '+0.2', trend: 'up', icon: Star, color: 'text-amber-400' },
];

const recentBookings = [
  { id: '1', service: 'Precision Cut', client: 'Sarah M.', stylist: 'Alexandra C.', date: 'Today, 2:00 PM', status: 'confirmed' },
  { id: '2', service: 'Full Colour', client: 'Emma L.', stylist: 'Sofia R.', date: 'Today, 3:30 PM', status: 'confirmed' },
  { id: '3', service: 'Highlights', client: 'James T.', stylist: 'Alexandra C.', date: 'Tomorrow, 10:00 AM', status: 'pending' },
  { id: '4', service: 'Deep Treatment', client: 'Michael B.', stylist: 'Marcus T.', date: 'Tomorrow, 1:00 PM', status: 'pending' },
];

const topServices = [
  { name: 'Precision Cut', bookings: 342, revenue: '£11,970' },
  { name: 'Full Colour', bookings: 198, revenue: '£12,870' },
  { name: 'Highlights', bookings: 156, revenue: '£13,260' },
];

const revenueData = [
  { name: 'Mon', total: 1200 },
  { name: 'Tue', total: 2100 },
  { name: 'Wed', total: 1800 },
  { name: 'Thu', total: 2400 },
  { name: 'Fri', total: 3200 },
  { name: 'Sat', total: 3800 },
  { name: 'Sun', total: 2900 },
];

export default function AdminDashboardPage() {
  return (
    <div className="space-y-8 pb-12">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between"
      >
        <div>
          <h1 className="font-display text-4xl font-bold tracking-tight">System Overview</h1>
          <p className="mt-1 text-zinc-400">Manage your salon operations and track performance.</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" className="gap-2 border-white/10 bg-white/5 backdrop-blur-xl">
            <Settings className="h-4 w-4" />
            Settings
          </Button>
        </div>
      </motion.div>

      <BentoGrid columns={4}>
        {/* Top Stat Cards */}
        {stats.map((stat, i) => (
          <BentoBox key={stat.label} colSpan={1} className="flex flex-col justify-between">
            <div className="flex items-start justify-between">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 bg-white/5 shadow-inner shadow-white/5">
                <stat.icon className={`h-6 w-6 ${stat.color}`} />
              </div>
              <Badge variant="outline" className="border-emerald-500/20 bg-emerald-500/10 text-emerald-400">
                {stat.change}
              </Badge>
            </div>
            <div className="mt-6">
              <h3 className="text-sm font-medium text-zinc-400 uppercase tracking-wider">{stat.label}</h3>
              <p className="mt-2 font-display text-4xl font-bold tracking-tight">{stat.value}</p>
            </div>
          </BentoBox>
        ))}

        {/* Revenue Chart (Spans 2 columns, 2 rows) */}
        <BentoBox colSpan={2} rowSpan={2} className="flex flex-col">
          <div className="mb-6 flex items-center justify-between">
            <div>
              <h2 className="font-display text-xl font-semibold">Revenue Overview</h2>
              <p className="text-sm text-zinc-400">Performance for the current week</p>
            </div>
            <Button variant="ghost" size="sm" className="gap-2 text-violet-400 hover:text-violet-300">
              <Activity className="h-4 w-4" />
              Detailed Report
            </Button>
          </div>
          <div className="h-[300px] w-full flex-1">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={revenueData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorTotal" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <XAxis dataKey="name" stroke="#52525b" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="#52525b" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `£${value}`} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#131316', borderColor: '#27272a', borderRadius: '12px', color: '#fff' }}
                  itemStyle={{ color: '#8b5cf6' }}
                />
                <Area type="monotone" dataKey="total" stroke="#8b5cf6" strokeWidth={3} fillOpacity={1} fill="url(#colorTotal)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </BentoBox>

        {/* Recent Bookings (Spans 2 columns) */}
        <BentoBox colSpan={2} rowSpan={2} className="flex flex-col">
          <div className="mb-6 flex items-center justify-between">
            <h2 className="font-display text-xl font-semibold">Live Bookings</h2>
            <Link href="/admin/bookings" className="group flex items-center text-sm font-medium text-violet-400 hover:text-violet-300">
              View All <ChevronRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
          <div className="flex flex-1 flex-col justify-between gap-3 overflow-y-auto pr-2">
            {recentBookings.map((booking) => (
              <div
                key={booking.id}
                className="group flex items-center justify-between rounded-2xl border border-white/5 bg-white/5 p-4 transition-all hover:bg-white/10"
              >
                <div className="flex items-center gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-violet-500/20 text-violet-400">
                    <Clock className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="font-medium text-zinc-100">{booking.service}</p>
                    <p className="text-sm text-zinc-400">{booking.client} · <span className="text-violet-300/80">{booking.stylist}</span></p>
                  </div>
                </div>
                <div className="flex flex-col items-end gap-2 text-right">
                  <span className="text-sm font-medium text-zinc-300">{booking.date}</span>
                  <Badge 
                    variant="outline"
                    className={`border-transparent px-2.5 py-0.5 text-[11px] font-semibold uppercase tracking-wider ${
                      booking.status === 'confirmed' 
                        ? 'bg-emerald-500/10 text-emerald-400' 
                        : 'bg-amber-500/10 text-amber-400'
                    }`}
                  >
                    {booking.status}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </BentoBox>

        {/* Top Services (Spans 2 columns) */}
        <BentoBox colSpan={2} className="flex flex-col justify-between">
          <div className="mb-6 flex items-center justify-between">
            <h2 className="font-display text-lg font-semibold">Top Services</h2>
          </div>
          <div className="space-y-4">
            {topServices.map((service, i) => (
              <div key={service.name} className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-white/5 font-display text-sm font-bold text-zinc-400 shadow-inner">
                    {i + 1}
                  </span>
                  <span className="font-medium text-zinc-200">{service.name}</span>
                </div>
                <div className="flex items-center gap-6 text-sm">
                  <span className="text-zinc-500">{service.bookings} bookings</span>
                  <span className="font-semibold text-emerald-400">{service.revenue}</span>
                </div>
              </div>
            ))}
          </div>
        </BentoBox>

        {/* Quick Actions (Spans 2 columns) */}
        <BentoBox colSpan={2} className="flex flex-col justify-center">
          <h2 className="mb-5 font-display text-lg font-semibold">Quick Actions</h2>
          <div className="grid grid-cols-2 gap-3">
            <Button variant="outline" className="h-auto flex-col items-start gap-2 border-white/10 bg-white/5 p-4 hover:border-violet-500/30 hover:bg-violet-500/10">
              <Users className="h-5 w-5 text-violet-400" />
              <span className="font-medium">Staff Roster</span>
            </Button>
            <Button variant="outline" className="h-auto flex-col items-start gap-2 border-white/10 bg-white/5 p-4 hover:border-violet-500/30 hover:bg-violet-500/10">
              <Scissors className="h-5 w-5 text-violet-400" />
              <span className="font-medium">Menu & Pricing</span>
            </Button>
          </div>
        </BentoBox>

      </BentoGrid>
    </div>
  );
}