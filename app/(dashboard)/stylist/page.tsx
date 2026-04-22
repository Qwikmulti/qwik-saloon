'use client';

import { motion } from 'framer-motion';
import { Calendar, Clock, DollarSign, TrendingUp, Users, Star, ArrowUpRight, ArrowDownRight, Settings, CheckCircle2 } from 'lucide-react';
import { Badge, Button, BentoGrid, BentoBox } from '@/components/ui';

const todaySchedule = [
  { id: '1', time: '09:00 AM', service: 'Precision Cut', client: 'Sarah M.', status: 'completed' },
  { id: '2', time: '10:30 AM', service: 'Full Colour', client: 'Emma L.', status: 'confirmed' },
  { id: '3', time: '01:00 PM', service: 'Highlights', client: 'James T.', status: 'confirmed' },
  { id: '4', time: '03:30 PM', service: 'Treatment', client: 'Michael B.', status: 'pending' },
];

const weekStats = [
  { label: 'This Week', value: '12', change: '+3', trend: 'up', icon: Calendar, color: 'text-violet-400', bg: 'bg-violet-500/10' },
  { label: 'Revenue', value: '£485', change: '+12%', trend: 'up', icon: DollarSign, color: 'text-emerald-400', bg: 'bg-emerald-500/10' },
  { label: 'Rating', value: '4.9', change: '+0.1', trend: 'up', icon: Star, color: 'text-amber-400', bg: 'bg-amber-500/10' },
  { label: 'Hours', value: '32', change: '-2', trend: 'down', icon: Clock, color: 'text-rose-400', bg: 'bg-rose-500/10' },
];

export default function StylistDashboardPage() {
  return (
    <div className="space-y-8 pb-12">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between"
      >
        <div>
          <h1 className="font-display text-4xl font-bold tracking-tight">Stylist Dashboard</h1>
          <p className="mt-1 text-zinc-400">Manage your schedule, clients, and earnings.</p>
        </div>
        <Button variant="outline" className="gap-2 border-white/10 bg-white/5 backdrop-blur-xl">
          <Settings className="h-4 w-4" />
          Settings
        </Button>
      </motion.div>

      <BentoGrid columns={4}>
        {/* Top Gen Stats */}
        {weekStats.map((stat, i) => (
          <BentoBox key={stat.label} colSpan={1} className="flex flex-col justify-between">
            <div className="flex items-start justify-between">
              <div className={`flex h-12 w-12 items-center justify-center rounded-2xl ${stat.bg}`}>
                <stat.icon className={`h-6 w-6 ${stat.color}`} />
              </div>
              <Badge 
                variant="outline" 
                className={stat.trend === 'up' ? "border-emerald-500/30 text-emerald-400 bg-emerald-500/10" : "border-rose-500/30 text-rose-400 bg-rose-500/10"}
              >
                {stat.trend === 'up' ? <ArrowUpRight className="mr-1 h-3 w-3" /> : <ArrowDownRight className="mr-1 h-3 w-3" />}
                {stat.change}
              </Badge>
            </div>
            <div className="mt-6">
              <h3 className="text-sm font-medium text-zinc-500 uppercase tracking-wider">{stat.label}</h3>
              <p className="mt-2 font-display text-4xl font-bold">{stat.value}</p>
            </div>
          </BentoBox>
        ))}

        {/* Today's Schedule (Spans 2 columns, 2 rows) */}
        <BentoBox colSpan={2} rowSpan={2} className="flex flex-col">
          <div className="mb-6 flex items-center justify-between">
            <div>
              <h2 className="font-display text-xl font-semibold">Today&apos;s Schedule</h2>
              <p className="text-sm text-zinc-400">Your appointments for today</p>
            </div>
            <Badge variant="outline" className="border-violet-500/30 bg-violet-500/10 text-violet-400 gap-1 px-3 py-1">
              {todaySchedule.filter(s => s.status !== 'completed').length} Left
            </Badge>
          </div>
          
          <div className="flex flex-1 flex-col justify-between gap-4 overflow-y-auto pr-2">
            {todaySchedule.map((appointment) => (
              <div
                key={appointment.id}
                className={`group relative flex items-center justify-between rounded-2xl border p-4 transition-all ${
                  appointment.status === 'completed'
                    ? 'border-white/5 bg-black/40 opacity-75'
                    : 'border-white/10 bg-white/5 hover:border-violet-500/30 hover:bg-violet-500/5'
                }`}
              >
                {/* Timeline Connector Line */}
                <div className="absolute -left-[1px] top-1/2 h-1/2 w-[3px] -translate-y-1/2 rounded-full bg-violet-500 opacity-0 transition-opacity group-hover:opacity-100" />
                
                <div className="flex items-center gap-4">
                  <div className="min-w-[70px] text-center">
                    <span className="font-display text-lg font-bold text-zinc-200">
                      {appointment.time.split(' ')[0]}
                    </span>
                    <span className="ml-1 text-xs font-semibold uppercase text-zinc-500">
                      {appointment.time.split(' ')[1]}
                    </span>
                  </div>
                  <div className="h-10 w-px bg-white/10" />
                  <div>
                    <p className={`font-medium ${appointment.status === 'completed' ? 'text-zinc-500 line-through decoration-zinc-600' : 'text-zinc-100'}`}>
                      {appointment.service}
                    </p>
                    <p className="text-sm text-zinc-400">{appointment.client}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  {appointment.status === 'completed' ? (
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-500/20 text-emerald-400">
                      <CheckCircle2 className="h-5 w-5" />
                    </div>
                  ) : (
                    <Badge 
                      variant="outline"
                      className={`uppercase tracking-wider text-[10px] font-bold ${
                        appointment.status === 'confirmed' ? 'border-violet-500/30 text-violet-400 bg-violet-500/10' : 'border-amber-500/30 text-amber-400 bg-amber-500/10'
                      }`}
                    >
                      {appointment.status}
                    </Badge>
                  )}
                </div>
              </div>
            ))}
          </div>
        </BentoBox>

        {/* Quick Actions (Spans 2 columns) */}
        <BentoBox colSpan={2} className="flex flex-col justify-center">
          <h2 className="mb-5 font-display text-lg font-semibold">Quick Actions</h2>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-2">
            <Button variant="outline" className="h-auto flex-col items-start gap-2 border-white/10 bg-white/5 p-4 hover:border-violet-500/30 hover:bg-violet-500/10">
              <Calendar className="h-5 w-5 text-violet-400" />
              <span className="font-medium text-zinc-200">Set Availability</span>
            </Button>
            <Button variant="outline" className="h-auto flex-col items-start gap-2 border-white/10 bg-white/5 p-4 hover:border-fuchsia-500/30 hover:bg-fuchsia-500/10">
              <TrendingUp className="h-5 w-5 text-fuchsia-400" />
              <span className="font-medium text-zinc-200">View Analytics</span>
            </Button>
            <Button variant="outline" className="h-auto flex-col items-start gap-2 border-white/10 bg-white/5 p-4 md:col-span-2 hover:border-emerald-500/30 hover:bg-emerald-500/10 mt-2">
               <Settings className="h-5 w-5 text-emerald-400" />
               <span className="font-medium text-zinc-200">Edit Profile & Services</span>
            </Button>
          </div>
        </BentoBox>

        {/* This Week Calendar view (Spans 2 columns) */}
        <BentoBox colSpan={2} className="flex flex-col justify-between">
          <div className="mb-5 flex items-center justify-between">
            <h2 className="font-display text-lg font-semibold border-b border-white/5 pb-2">Week Outlook</h2>
          </div>
          <div className="grid grid-cols-7 gap-2">
            {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day, i) => {
              const hasAppointments = i < 5;
              const count = hasAppointments ? Math.floor(Math.random() * 4) + 1 : 0;
              const isToday = day === 'Tue'; // mock today
              
              return (
                <div
                  key={day}
                  className={`flex flex-col items-center justify-center rounded-xl py-3 transition-all ${
                    isToday
                      ? 'bg-gradient-to-br from-violet-600 to-fuchsia-600 text-white shadow-lg shadow-violet-500/25 scale-105 border border-violet-400/50'
                      : hasAppointments 
                        ? 'border border-violet-500/10 bg-violet-500/5 hover:bg-violet-500/10 cursor-pointer' 
                        : 'border border-white/5 bg-black/20 opacity-50'
                  }`}
                >
                  <span className={`text-[10px] font-bold uppercase tracking-wider ${isToday ? 'text-white/80' : 'text-zinc-500'}`}>{day}</span>
                  <span className={`mt-1 font-display text-xl font-bold ${isToday ? 'text-white' : hasAppointments ? 'text-violet-400' : 'text-zinc-600'}`}>
                    {count}
                  </span>
                </div>
              );
            })}
          </div>
        </BentoBox>
      </BentoGrid>
    </div>
  );
}