'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { format } from 'date-fns';
import { Calendar, Clock, Search, Filter, Plus, MoreHorizontal } from 'lucide-react';
import { Card, Badge, Button, Input } from '@/components/ui';

interface Booking {
  _id: string;
  serviceInfo: { name: string };
  customerInfo: { name: string; email: string; phone?: string };
  stylistInfo: { name: string };
  bookingDate: string;
  startTime: string;
  endTime: string;
  status: string;
  totalPrice: number;
}

export default function AdminBookingsPage() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');
  const [search, setSearch] = useState('');

  useEffect(() => {
    const fetchBookings = async () => {
      setLoading(true);
      try {
        const res = await fetch('/api/admin/bookings');
        const data = await res.json();
        setBookings(data.bookings || []);
      } catch (error) {
        console.error('Error fetching bookings:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchBookings();
  }, []);

  const filteredBookings = bookings.filter(b => {
    if (filter !== 'all' && b.status !== filter) return false;
    if (search) {
      const searchLower = search.toLowerCase();
      return (
        b.customerInfo.name.toLowerCase().includes(searchLower) ||
        b.stylistInfo.name.toLowerCase().includes(searchLower) ||
        b.serviceInfo.name.toLowerCase().includes(searchLower)
      );
    }
    return true;
  });

  const statusColors: Record<string, string> = {
    pending: 'bg-amber-500/20 text-amber-400 border-amber-500/30',
    confirmed: 'bg-violet-500/20 text-violet-400 border-violet-500/30',
    completed: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30',
    cancelled: 'bg-red-500/20 text-red-400 border-red-500/30',
    no_show: 'bg-zinc-500/20 text-zinc-400 border-zinc-500/30',
  };

  return (
    <div className="space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between"
      >
        <div>
          <h1 className="font-display text-3xl font-bold">All Bookings</h1>
          <p className="text-zinc-400 mt-2">View and manage all appointments</p>
        </div>
        <Button className="gap-2 bg-gradient-to-r from-violet-600 to-fuchsia-600">
          <Plus className="h-4 w-4" />
          New Booking
        </Button>
      </motion.div>

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex gap-2">
          {['all', 'pending', 'confirmed', 'completed', 'cancelled'].map((status) => (
            <button
              key={status}
              onClick={() => setFilter(status)}
              className={`rounded-lg px-4 py-2 text-sm font-medium transition-colors capitalize ${
                filter === status
                  ? 'bg-violet-600 text-white'
                  : 'border border-white/10 bg-white/5'
              }`}
            >
              {status}
            </button>
          ))}
        </div>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-500" />
          <Input
            type="search"
            placeholder="Search bookings..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full border-white/10 bg-white/5 pl-10 sm:w-64"
          />
        </div>
      </div>

      <Card className="border-white/5 bg-[#131316] overflow-hidden">
        {loading ? (
          <div className="py-12 text-center">
            <div className="h-8 w-8 animate-spin rounded-full border-4 border-violet-500 border-t-transparent mx-auto" />
          </div>
        ) : filteredBookings.length === 0 ? (
          <div className="py-12 text-center text-zinc-500">
            <Calendar className="h-12 w-12 mx-auto mb-4 opacity-50" />
            <p>No bookings found</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-white/5">
                  <th className="px-6 py-4 text-left text-xs font-medium uppercase tracking-wider text-zinc-500">
                    Customer
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium uppercase tracking-wider text-zinc-500">
                    Service
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium uppercase tracking-wider text-zinc-500">
                    Stylist
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium uppercase tracking-wider text-zinc-500">
                    Date & Time
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium uppercase tracking-wider text-zinc-500">
                    Status
                  </th>
                  <th className="px-6 py-4 text-right text-xs font-medium uppercase tracking-wider text-zinc-500">
                    Price
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredBookings.map((booking) => (
                  <tr key={booking._id} className="border-b border-white/5 hover:bg-white/5">
                    <td className="px-6 py-4">
                      <div>
                        <p className="font-medium">{booking.customerInfo.name}</p>
                        <p className="text-sm text-zinc-500">{booking.customerInfo.email}</p>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <p className="font-medium">{booking.serviceInfo.name}</p>
                    </td>
                    <td className="px-6 py-4">
                      <p className="font-medium">{booking.stylistInfo.name}</p>
                    </td>
                    <td className="px-6 py-4">
                      <p className="text-sm">
                        {format(new Date(booking.bookingDate), 'MMM d, yyyy')}
                      </p>
                      <p className="text-sm text-zinc-500">
                        {booking.startTime} - {booking.endTime}
                      </p>
                    </td>
                    <td className="px-6 py-4">
                      <Badge variant="outline" className={statusColors[booking.status]}>
                        {booking.status}
                      </Badge>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <p className="font-display font-bold text-violet-400">
                        £{booking.totalPrice}
                      </p>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </Card>
    </div>
  );
}