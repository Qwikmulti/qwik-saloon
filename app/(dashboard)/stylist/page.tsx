'use client';

import { motion } from 'framer-motion';
import { Calendar, Clock, DollarSign, TrendingUp, Users, Star, ArrowUpRight, ArrowDownRight, Settings } from 'lucide-react';
import { Card, Badge, Button } from '@/components/ui';

const todaySchedule = [
  { id: '1', time: '09:00', service: 'Precision Cut', client: 'Sarah M.', status: 'completed' },
  { id: '2', time: '10:30', service: 'Full Colour', client: 'Emma L.', status: 'confirmed' },
  { id: '3', time: '13:00', service: 'Highlights', client: 'James T.', status: 'confirmed' },
  { id: '4', time: '15:30', service: 'Treatment', client: 'Michael B.', status: 'pending' },
];

const weekStats = [
  { label: 'This Week', value: '12', change: '+3', trend: 'up' },
  { label: 'Revenue', value: '£485', change: '+12%', trend: 'up' },
  { label: 'Rating', value: '4.9', change: '+0.1', trend: 'up' },
  { label: 'Hours', value: '32', change: '-2', trend: 'down' },
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

export default function StylistDashboardPage() {
  return (
    <div className="space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between"
      >
        <div>
          <h1 className="font-display text-3xl font-bold">Stylist Dashboard</h1>
          <p className="text-zinc-400">Manage your appointments and availability</p>
        </div>
        <Button variant="outline" className="gap-2 border-white/10">
          <Settings className="h-4 w-4" />
          Settings
        </Button>
      </motion.div>

      <div className="grid gap-4 md:grid-cols-4">
        {weekStats.map((stat, i) => (
          <BentoCard key={stat.label} delay={i * 0.1} className="p-6">
            <div className="flex items-start justify-between">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/5">
                {stat.label === 'This Week' ? <Calendar className="h-5 w-5 text-violet-400" /> :
                 stat.label === 'Revenue' ? <DollarSign className="h-5 w-5 text-emerald-400" /> :
                 stat.label === 'Rating' ? <Star className="h-5 w-5 text-amber-400" /> :
                 <Clock className="h-5 w-5 text-blue-400" />}
              </div>
              <Badge variant={stat.trend === 'up' ? 'default' : 'destructive'} className="text-xs">
                {stat.trend === 'up' ? <ArrowUpRight className="mr-1 h-3 w-3" /> : <ArrowDownRight className="mr-1 h-3 w-3" />}
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
            <h2 className="font-display text-lg font-semibold">Today&apos;s Schedule</h2>
            <Badge variant="outline" className="text-xs">
              {todaySchedule.filter(s => s.status === 'confirmed' || s.status === 'pending').length} appointments
            </Badge>
          </div>
          
          <div className="space-y-3">
            {todaySchedule.map((appointment) => (
              <div
                key={appointment.id}
                className="flex items-center justify-between rounded-xl border border-white/5 bg-white/5 p-4"
              >
                <div className="flex items-center gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-white/10 bg-white/5">
                    <Clock className="h-5 w-5 text-violet-400" />
                  </div>
                  <div>
                    <p className="font-medium">{appointment.service}</p>
                    <p className="text-sm text-zinc-500">{appointment.client}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <span className="font-mono text-sm">{appointment.time}</span>
                  <Badge 
                    variant={appointment.status === 'completed' ? 'default' : 
                           appointment.status === 'confirmed' ? 'secondary' : 'outline'}
                    className="capitalize"
                  >
                    {appointment.status}
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
              <Calendar className="h-4 w-4" />
              Set Availability
            </Button>
            <Button variant="outline" className="w-full justify-start gap-3 border-white/10">
              <Settings className="h-4 w-4" />
              Edit Profile
            </Button>
            <Button variant="outline" className="w-full justify-start gap-3 border-white/10">
              <TrendingUp className="h-4 w-4" />
              View Analytics
            </Button>
          </div>
        </BentoCard>
      </div>

      <BentoCard delay={0.6} className="p-6">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="font-display text-lg font-semibold">This Week</h2>
          <Button variant="ghost" size="sm" className="text-violet-400">
            View Calendar
          </Button>
        </div>
        
        <div className="grid gap-4 md:grid-cols-7">
          {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day, i) => {
            const hasAppointments = i < 5;
            const count = hasAppointments ? Math.floor(Math.random() * 4) + 1 : 0;
            return (
              <div
                key={day}
                className={`rounded-xl border p-4 text-center ${
                  hasAppointments 
                    ? 'border-violet-500/30 bg-violet-600/10' 
                    : 'border-white/5 bg-white/5'
                }`}
              >
                <p className="text-xs text-zinc-500">{day}</p>
                <p className={`font-display text-2xl font-bold ${hasAppointments ? 'text-violet-400' : 'text-zinc-600'}`}>
                  {count}
                </p>
                <p className="text-xs text-zinc-500">appointments</p>
              </div>
            );
          })}
        </div>
      </BentoCard>
    </div>
  );
}