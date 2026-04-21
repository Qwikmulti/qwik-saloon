'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { format, startOfWeek, addDays, isSameDay } from 'date-fns';
import { Calendar, Clock, Check, X, User, ChevronLeft, ChevronRight } from 'lucide-react';
import { Card, Badge, Button } from '@/components/ui';

interface Booking {
  _id: string;
  serviceInfo: { name: string; duration: number };
  customerInfo: { name: string; phone?: string };
  bookingDate: string;
  startTime: string;
  endTime: string;
  status: string;
  totalPrice: number;
}

interface DaySchedule {
  date: Date;
  bookings: Booking[];
}

export default function StylistSchedulePage() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);

  const weekStart = startOfWeek(currentDate, { weekStartsOn: 1 });
  const weekDays = Array.from({ length: 7 }, (_, i) => addDays(weekStart, i));

  useEffect(() => {
    const fetchBookings = async () => {
      setLoading(true);
      try {
        const res = await fetch('/api/stylist/bookings');
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

  const getBookingsForDay = (date: Date): Booking[] => {
    return bookings.filter(b => isSameDay(new Date(b.bookingDate), date));
  };

  const handlePrevWeek = () => {
    setCurrentDate(prev => new Date(prev.setDate(prev.getDate() - 7)));
  };

  const handleNextWeek = () => {
    setCurrentDate(prev => new Date(prev.setDate(prev.getDate() + 7)));
  };

  const handleStatusUpdate = async (bookingId: string, status: string) => {
    try {
      const res = await fetch(`/api/stylist/bookings/${bookingId}/status`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status }),
      });
      if (res.ok) {
        setBookings(bookings.map(b => 
          b._id === bookingId ? { ...b, status } : b
        ));
      }
    } catch (error) {
      console.error('Error updating status:', error);
    }
  };

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
          <h1 className="font-display text-3xl font-bold">My Schedule</h1>
          <p className="text-zinc-400">Manage your appointments and availability</p>
        </div>
        <Button asChild className="gap-2 bg-gradient-to-r from-violet-600 to-fuchsia-600">
          <a href="/stylist/availability">
            <Calendar className="h-4 w-4" />
            Set Availability
          </a>
        </Button>
      </motion.div>

      <Card className="border-white/5 bg-[#131316] p-6">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="font-display text-xl font-semibold">
            {format(weekStart, 'MMMM yyyy')}
          </h2>
          <div className="flex gap-2">
            <Button variant="outline" size="icon" onClick={handlePrevWeek} className="border-white/10">
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="icon" onClick={handleNextWeek} className="border-white/10">
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {loading ? (
          <div className="py-12 text-center">
            <div className="h-8 w-8 animate-spin rounded-full border-4 border-violet-500 border-t-transparent mx-auto" />
          </div>
        ) : (
          <div className="grid gap-4">
            {weekDays.map((day) => {
              const dayBookings = getBookingsForDay(day);
              const isToday = isSameDay(day, new Date());
              
              return (
                <motion.div
                  key={day.toISOString()}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`rounded-xl border p-4 ${
                    isToday 
                      ? 'border-violet-500/30 bg-violet-600/5' 
                      : 'border-white/5 bg-white/5'
                  }`}
                >
                  <div className="mb-3 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <span className="font-display text-lg font-semibold">
                        {format(day, 'EEE')}
                      </span>
                      <span className="text-2xl font-bold">{format(day, 'd')}</span>
                    </div>
                    <Badge variant="outline" className="text-xs">
                      {dayBookings.length} appointment{dayBookings.length !== 1 ? 's' : ''}
                    </Badge>
                  </div>

                  {dayBookings.length === 0 ? (
                    <p className="text-sm text-zinc-500">No appointments</p>
                  ) : (
                    <div className="space-y-2">
                      {dayBookings.map((booking) => (
                        <div
                          key={booking._id}
                          className="flex items-center justify-between rounded-lg border border-white/10 bg-white/5 p-3"
                        >
                          <div className="flex items-center gap-3">
                            <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-white/10 bg-white/5">
                              <Clock className="h-4 w-4 text-violet-400" />
                            </div>
                            <div>
                              <p className="font-medium">{booking.serviceInfo.name}</p>
                              <p className="text-sm text-zinc-500">
                                {booking.customerInfo.name} • {booking.startTime} - {booking.endTime}
                              </p>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <Badge variant="outline" className={statusColors[booking.status]}>
                              {booking.status}
                            </Badge>
                            {booking.status === 'pending' && (
                              <>
                                <Button
                                  size="sm"
                                  variant="outline"
                                  onClick={() => handleStatusUpdate(booking._id, 'confirmed')}
                                  className="h-8 w-8 border-emerald-500/30 text-emerald-400 hover:bg-emerald-500/10"
                                >
                                  <Check className="h-4 w-4" />
                                </Button>
                                <Button
                                  size="sm"
                                  variant="outline"
                                  onClick={() => handleStatusUpdate(booking._id, 'cancelled')}
                                  className="h-8 w-8 border-red-500/30 text-red-400 hover:bg-red-500/10"
                                >
                                  <X className="h-4 w-4" />
                                </Button>
                              </>
                            )}
                            {booking.status === 'confirmed' && (
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => handleStatusUpdate(booking._id, 'completed')}
                                className="border-emerald-500/30 text-emerald-400 hover:bg-emerald-500/10"
                              >
                                Complete
                              </Button>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </motion.div>
              );
            })}
          </div>
        )}
      </Card>
    </div>
  );
}