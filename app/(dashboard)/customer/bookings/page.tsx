'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { format } from 'date-fns';
import { Calendar, Clock, X, RefreshCw, Plus, ArrowRight, PlusCircle, History, Star, AlertCircle } from 'lucide-react';
import { Card, Badge, Button } from '@/components/ui';

interface Booking {
  _id: string;
  serviceInfo: { name: string; duration: number };
  stylistInfo: { name: string };
  bookingDate: string;
  startTime: string;
  endTime: string;
  status: string;
  totalPrice: number;
  notes?: string;
}

function BookingCard({ booking, onCancel }: { booking: Booking; onCancel: (id: string) => void }) {
  const statusColors: Record<string, string> = {
    pending: 'bg-amber-500/20 text-amber-400 border-amber-500/30',
    confirmed: 'bg-violet-500/20 text-violet-400 border-violet-500/30',
    completed: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30',
    cancelled: 'bg-red-500/20 text-red-400 border-red-500/30',
    no_show: 'bg-zinc-500/20 text-zinc-400 border-zinc-500/30',
  };

  const isUpcoming = new Date(booking.bookingDate) >= new Date() && booking.status !== 'cancelled';
  const canCancel = booking.status === 'pending' || booking.status === 'confirmed';

  return (
    <Card className="overflow-hidden rounded-2xl border border-white/5 bg-[#131316]">
      <div className="relative p-6">
        <div className="absolute inset-0 bg-gradient-to-br from-violet-600/5 to-fuchsia-600/5 opacity-0 transition-opacity hover:opacity-100" />
        <div className="relative">
          <div className="mb-4 flex items-start justify-between">
            <div>
              <Badge variant="outline" className={statusColors[booking.status] || 'bg-white/5'}>
                {booking.status}
              </Badge>
            </div>
            {canCancel && (
              <button
                onClick={() => onCancel(booking._id)}
                className="text-sm text-red-400 hover:text-red-300"
              >
                Cancel
              </button>
            )}
          </div>

          <h3 className="font-display text-lg font-semibold">{booking.serviceInfo.name}</h3>
          <p className="text-sm text-zinc-500">with {booking.stylistInfo.name}</p>

          <div className="mt-4 flex items-center gap-4 text-sm">
            <div className="flex items-center gap-1 text-zinc-400">
              <Calendar className="h-4 w-4" />
              {format(new Date(booking.bookingDate), 'MMM d, yyyy')}
            </div>
            <div className="flex items-center gap-1 text-zinc-400">
              <Clock className="h-4 w-4" />
              {booking.startTime} - {booking.endTime}
            </div>
          </div>

          {booking.notes && (
            <p className="mt-3 text-sm text-zinc-500 italic">&ldquo;{booking.notes}&rdquo;</p>
          )}

          <div className="mt-4 flex items-center justify-between">
            <span className="font-display text-xl font-bold text-violet-400">£{booking.totalPrice}</span>
            {isUpcoming && (
              <Button size="sm" variant="outline" asChild className="gap-1">
                <Link href={`/booking?reschedule=${booking._id}`}>
                  Reschedule <ArrowRight className="h-3 w-3" />
                </Link>
              </Button>
            )}
          </div>
        </div>
      </div>
    </Card>
  );
}

export default function CustomerBookingsPage() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<'upcoming' | 'past'>('upcoming');

  useEffect(() => {
    const fetchBookings = async () => {
      setLoading(true);
      try {
        const res = await fetch('/api/bookings');
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

  const handleCancel = async (bookingId: string) => {
    if (!confirm('Are you sure you want to cancel this booking?')) return;
    
    try {
      const res = await fetch(`/api/bookings/${bookingId}/cancel`, {
        method: 'POST',
      });
      if (res.ok) {
        setBookings(bookings.map(b => 
          b._id === bookingId ? { ...b, status: 'cancelled' } : b
        ));
      }
    } catch (error) {
      console.error('Error cancelling booking:', error);
    }
  };

  const now = new Date();
  const upcomingBookings = bookings.filter(b => 
    new Date(b.bookingDate) >= now && b.status !== 'cancelled'
  );
  const pastBookings = bookings.filter(b => 
    new Date(b.bookingDate) < now || b.status === 'cancelled' || b.status === 'completed'
  );
  const displayedBookings = filter === 'upcoming' ? upcomingBookings : pastBookings;

  return (
    <div className="space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between"
      >
        <div>
          <h1 className="font-display text-3xl font-bold">My Bookings</h1>
          <p className="text-zinc-400">Manage your appointments</p>
        </div>
        <Button asChild className="gap-2 bg-gradient-to-r from-violet-600 to-fuchsia-600">
          <Link href="/booking">
            <PlusCircle className="h-4 w-4" />
            Book New
          </Link>
        </Button>
      </motion.div>

      <div className="flex gap-2">
        <button
          onClick={() => setFilter('upcoming')}
          className={`rounded-xl px-4 py-2 text-sm font-medium transition-colors ${
            filter === 'upcoming'
              ? 'bg-violet-600 text-white'
              : 'border border-white/10 bg-white/5'
          }`}
        >
          Upcoming ({upcomingBookings.length})
        </button>
        <button
          onClick={() => setFilter('past')}
          className={`rounded-xl px-4 py-2 text-sm font-medium transition-colors ${
            filter === 'past'
              ? 'bg-violet-600 text-white'
              : 'border border-white/10 bg-white/5'
          }`}
        >
          Past ({pastBookings.length})
        </button>
      </div>

      {loading ? (
        <div className="py-12 text-center">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-violet-500 border-t-transparent mx-auto" />
        </div>
      ) : displayedBookings.length === 0 ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="py-16 text-center"
        >
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full border border-white/10 bg-white/5">
            <Calendar className="h-8 w-8 text-zinc-500" />
          </div>
          <h3 className="font-display text-xl font-semibold">
            No {filter} bookings
          </h3>
          <p className="mb-6 text-zinc-500 mt-2">
            {filter === 'upcoming' 
              ? "You don't have any upcoming appointments"
              : "You don't have any past appointments"
            }
          </p>
          {filter === 'upcoming' && (
            <Button asChild className="bg-gradient-to-r from-violet-600 to-fuchsia-600">
              <Link href="/booking">
                Book Your First Appointment
              </Link>
            </Button>
          )}
        </motion.div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2">
          {displayedBookings.map((booking) => (
            <motion.div
              key={booking._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <BookingCard booking={booking} onCancel={handleCancel} />
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}