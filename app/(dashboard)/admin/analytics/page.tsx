'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Calendar, Users, DollarSign, TrendingUp, Star, 
  ArrowUpRight, ArrowDownRight, Clock, Scissors 
} from 'lucide-react';
import { Card, Badge, Button } from '@/components/ui';

interface Stats {
  totalBookings: number;
  totalRevenue: number;
  totalStylists: number;
  averageRating: number;
  todayBookings: number;
  weekBookings: number;
  monthRevenue: number;
}

interface RecentBooking {
  _id: string;
  serviceInfo: { name: string };
  customerInfo: { name: string };
  stylistInfo: { name: string };
  bookingDate: string;
  startTime: string;
  status: string;
  totalPrice: number;
}

export default function AdminAnalyticsPage() {
  const [stats, setStats] = useState<Stats>({
    totalBookings: 0,
    totalRevenue: 0,
    totalStylists: 0,
    averageRating: 0,
    todayBookings: 0,
    weekBookings: 0,
    monthRevenue: 0,
  });
  const [recentBookings, setRecentBookings] = useState<RecentBooking[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAnalytics = async () => {
      setLoading(true);
      try {
        const res = await fetch('/api/admin/analytics');
        const data = await res.json();
        setStats(data.stats);
        setRecentBookings(data.recentBookings || []);
      } catch (error) {
        console.error('Error fetching analytics:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchAnalytics();
  }, []);

  const statCards = [
    { 
      label: 'Total Bookings', 
      value: stats.totalBookings.toLocaleString(), 
      change: '+12%', 
      trend: 'up',
      icon: Calendar 
    },
    { 
      label: 'Revenue (MTD)', 
      value: `£${stats.monthRevenue.toLocaleString()}`, 
      change: '+18%', 
      trend: 'up',
      icon: DollarSign 
    },
    { 
      label: 'Active Stylists', 
      value: stats.totalStylists.toString(), 
      change: '+2', 
      trend: 'up',
      icon: Users 
    },
    { 
      label: 'Average Rating', 
      value: stats.averageRating.toFixed(1), 
      change: '+0.2', 
      trend: 'up',
      icon: Star 
    },
  ];

  const statusColors: Record<string, string> = {
    pending: 'bg-amber-500/20 text-amber-400',
    confirmed: 'bg-violet-500/20 text-violet-400',
    completed: 'bg-emerald-500/20 text-emerald-400',
    cancelled: 'bg-red-500/20 text-red-400',
  };

  return (
    <div className="space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="font-display text-3xl font-bold">Analytics</h1>
        <p className="text-zinc-400 mt-2">Track your salon performance</p>
      </motion.div>

      <div className="grid gap-4 md:grid-cols-4">
        {statCards.map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
          >
            <Card className="relative overflow-hidden rounded-2xl border border-white/5 bg-[#131316] p-6">
              <div className="absolute inset-0 bg-gradient-to-br from-violet-600/5 to-fuchsia-600/5 opacity-0 transition-opacity hover:opacity-100" />
              <div className="relative">
                <div className="flex items-start justify-between">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-white/10 bg-white/5">
                    <stat.icon className="h-6 w-6 text-violet-400" />
                  </div>
                  <Badge variant="default" className="bg-emerald-500/20 text-emerald-400 border-0">
                    {stat.trend === 'up' ? (
                      <ArrowUpRight className="mr-1 h-3 w-3" />
                    ) : (
                      <ArrowDownRight className="mr-1 h-3 w-3" />
                    )}
                    {stat.change}
                  </Badge>
                </div>
                <div className="mt-4">
                  <p className="font-display text-3xl font-bold">{stat.value}</p>
                  <p className="text-sm text-zinc-500">{stat.label}</p>
                </div>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <Card className="border-white/5 bg-[#131316] p-6 lg:col-span-2">
          <h2 className="font-display text-lg font-semibold mb-6">Recent Bookings</h2>
          <div className="space-y-3">
            {recentBookings.length === 0 ? (
              <p className="text-center text-zinc-500 py-8">No recent bookings</p>
            ) : (
              recentBookings.slice(0, 5).map((booking) => (
                <div
                  key={booking._id}
                  className="flex items-center justify-between rounded-xl border border-white/5 bg-white/5 p-4"
                >
                  <div className="flex items-center gap-4">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-white/10 bg-white/5">
                      <Scissors className="h-5 w-5 text-violet-400" />
                    </div>
                    <div>
                      <p className="font-medium">{booking.serviceInfo.name}</p>
                      <p className="text-sm text-zinc-500">
                        {booking.customerInfo.name} with {booking.stylistInfo.name}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      <p className="text-sm text-zinc-400">
                        {new Date(booking.bookingDate).toLocaleDateString('en-GB')} at {booking.startTime}
                      </p>
                      <p className="font-medium text-violet-400">£{booking.totalPrice}</p>
                    </div>
                    <Badge className={statusColors[booking.status] || 'bg-white/10'}>
                      {booking.status}
                    </Badge>
                  </div>
                </div>
              ))
            )}
          </div>
        </Card>

        <Card className="border-white/5 bg-[#131316] p-6">
          <h2 className="font-display text-lg font-semibold mb-6">Quick Stats</h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 rounded-xl border border-white/5 bg-white/5">
              <div className="flex items-center gap-3">
                <Calendar className="h-5 w-5 text-violet-400" />
                <span className="text-sm">Today</span>
              </div>
              <span className="font-display text-xl font-bold">{stats.todayBookings}</span>
            </div>
            <div className="flex items-center justify-between p-4 rounded-xl border border-white/5 bg-white/5">
              <div className="flex items-center gap-3">
                <TrendingUp className="h-5 w-5 text-violet-400" />
                <span className="text-sm">This Week</span>
              </div>
              <span className="font-display text-xl font-bold">{stats.weekBookings}</span>
            </div>
            <div className="flex items-center justify-between p-4 rounded-xl border border-white/5 bg-white/5">
              <div className="flex items-center gap-3">
                <DollarSign className="h-5 w-5 text-emerald-400" />
                <span className="text-sm">This Month</span>
              </div>
              <span className="font-display text-xl font-bold text-emerald-400">
                £{stats.monthRevenue.toLocaleString()}
              </span>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}