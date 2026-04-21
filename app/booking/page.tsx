'use client';

import { useState, useEffect, useCallback } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { format, addDays, startOfDay } from 'date-fns';
import { ArrowLeft, ArrowRight, Check, Calendar, Clock, User, Scissors, Sparkles, Loader2 } from 'lucide-react';
import { Button, Card, Badge, Input } from '@/components/ui';
import { useBookingStore } from '@/store';
import { createBooking } from '@/actions/booking-actions';

interface Service {
  _id: string;
  name: string;
  description: string;
  category: string;
  durationMinutes: number;
  basePrice: number;
}

interface Stylist {
  _id: string;
  name: string;
  specialties: string[];
  profileImage?: string;
  rating?: number;
}

interface TimeSlot {
  time: string;
  available: boolean;
}

interface StepProps {
  onNext?: () => void;
  onBack?: () => void;
}

const STEPS = [
  { id: 'service', label: 'Service', icon: Scissors },
  { id: 'stylist', label: 'Stylist', icon: User },
  { id: 'datetime', label: 'Date & Time', icon: Calendar },
  { id: 'confirm', label: 'Confirm', icon: Check },
];

export default function BookingWizard() {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  const [step, setStep] = useState(0);
  const [loading, setLoading] = useState(false);
  const [services, setServices] = useState<Service[]>([]);
  const [stylists, setStylists] = useState<Stylist[]>([]);
  const [timeSlots, setTimeSlots] = useState<TimeSlot[]>([]);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [slotsLoading, setSlotsLoading] = useState(false);
  
  const store = useBookingStore();

  useEffect(() => {
    const fetchServices = async () => {
      const res = await fetch('/api/services');
      const data = await res.json();
      setServices(data.services || []);
    };
    fetchServices();
  }, []);

  useEffect(() => {
    if (store.selectedService && selectedDate) {
      const fetchSlots = async () => {
        setSlotsLoading(true);
        const service = services.find(s => s._id === store.selectedService);
        if (!service) return;
        
        const res = await fetch(
          `/api/availability?stylistId=${store.selectedStylist || ''}&date=${selectedDate.toISOString()}&duration=${service.durationMinutes}`
        );
        const data = await res.json();
        setTimeSlots(data.slots || []);
        setSlotsLoading(false);
      };
      fetchSlots();
    }
  }, [store.selectedService, store.selectedStylist, selectedDate, services]);

  useEffect(() => {
    const fetchStylists = async () => {
      if (!store.selectedService) return;
      const res = await fetch('/api/stylists');
      const data = await res.json();
      setStylists(data.stylists || []);
    };
    fetchStylists();
  }, [store.selectedService]);

  const handleNext = () => {
    if (step < STEPS.length - 1) {
      setStep(step + 1);
    }
  };

  const handleBack = () => {
    if (step > 0) {
      setStep(step - 1);
    }
  };

  const handleServiceSelect = (serviceId: string) => {
    store.setSelectedService(serviceId);
    store.setSelectedStylist(null);
    store.setSelectedDate(null);
    store.setSelectedTime(null);
  };

  const handleStylistSelect = (stylistId: string) => {
    store.setSelectedStylist(stylistId);
    store.setSelectedDate(null);
    store.setSelectedTime(null);
  };

  const handleDateSelect = (date: Date) => {
    setSelectedDate(date);
    store.setSelectedDate(date.toISOString());
    store.setSelectedTime(null);
  };

  const handleTimeSelect = (time: string) => {
    store.setSelectedTime(time);
  };

  const handleSubmit = async () => {
    if (!store.selectedService || !store.selectedStylist || !store.selectedDate || !store.selectedTime) {
      return;
    }

    setLoading(true);
    const result = await createBooking({
      serviceId: store.selectedService,
      stylistId: store.selectedStylist,
      bookingDate: store.selectedDate,
      startTime: store.selectedTime,
      notes: store.customerInfo.notes,
    });

    setLoading(false);

    if (result.success) {
      router.push('/customer/bookings?success=true');
      store.reset();
    } else {
      alert(result.error || 'Booking failed');
    }
  };

  const selectedService = services.find(s => s._id === store.selectedService);
  const selectedStylist = stylists.find(s => s._id === store.selectedStylist);

  const today = new Date();
  const dates = Array.from({ length: 14 }, (_, i) => addDays(startOfDay(today), i));

  return (
    <div className="min-h-screen bg-[#0a0a0b] py-32">
      <div className="container mx-auto max-w-4xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="font-display text-3xl font-bold">Book Appointment</h1>
          <p className="mt-2 text-zinc-400">Follow the steps below to book your appointment</p>
        </motion.div>

        <div className="mb-8 flex items-center justify-between overflow-x-auto pb-2">
          {STEPS.map((s, i) => (
            <div key={s.id} className="flex items-center">
              <div className="flex items-center gap-3">
                <div
                  className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full border-2 transition-colors ${
                    i <= step
                      ? 'border-violet-500 bg-violet-500 text-white'
                      : 'border-white/10 bg-white/5 text-zinc-500'
                  }`}
                >
                  {i < step ? <Check className="h-4 w-4" /> : <s.icon className="h-4 w-4" />}
                </div>
                <span
                  className={`hidden whitespace-nowrap text-sm font-medium sm:block ${
                    i <= step ? 'text-white' : 'text-zinc-500'
                  }`}
                >
                  {s.label}
                </span>
              </div>
              {i < STEPS.length - 1 && (
                <div
                  className={`mx-2 h-0.5 w-8 sm:w-16 ${
                    i < step ? 'bg-violet-500' : 'bg-white/10'
                  }`}
                />
              )}
            </div>
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
          >
            <Card className="border-white/5 bg-[#131316] p-8">
              {step === 0 && (
                <ServiceStep 
                  services={services} 
                  selectedId={store.selectedService}
                  onSelect={handleServiceSelect}
                />
              )}
              {step === 1 && (
                <StylistStep 
                  stylists={stylists}
                  selectedId={store.selectedStylist}
                  onSelect={handleStylistSelect}
                />
              )}
              {step === 2 && (
                <DateTimeStep 
                  dates={dates}
                  timeSlots={timeSlots}
                  slotsLoading={slotsLoading}
                  selectedDate={selectedDate}
                  selectedTime={store.selectedTime}
                  onDateSelect={handleDateSelect}
                  onTimeSelect={handleTimeSelect}
                />
              )}
              {step === 3 && (
                <ConfirmStep 
                  service={selectedService}
                  stylist={selectedStylist}
                  date={selectedDate}
                  time={store.selectedTime}
                  notes={store.customerInfo.notes}
                  onNotesChange={(notes) => store.setCustomerInfo({ notes })}
                  onSubmit={handleSubmit}
                  loading={loading}
                />
              )}
            </Card>
          </motion.div>
        </AnimatePresence>

        <div className="mt-8 flex justify-between">
          <Button
            variant="outline"
            onClick={handleBack}
            disabled={step === 0}
            className="border-white/10"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back
          </Button>
          
          {step < STEPS.length - 1 ? (
            <Button
              onClick={handleNext}
              disabled={
                (step === 0 && !store.selectedService) ||
                (step === 1 && !store.selectedStylist) ||
                (step === 2 && (!store.selectedDate || !store.selectedTime))
              }
              className="bg-gradient-to-r from-violet-600 to-fuchsia-600"
            >
              Continue
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          ) : null}
        </div>
      </div>
    </div>
  );
}

function ServiceStep({ services, selectedId, onSelect }: { 
  services: Service[]; 
  selectedId: string | null; 
  onSelect: (id: string) => void;
}) {
  const categories = [...new Set(services.map(s => s.category))];
  const [filter, setFilter] = useState<string>('');

  const filtered = filter 
    ? services.filter(s => s.category === filter)
    : services;

  return (
    <div className="space-y-6">
      <div>
        <h2 className="font-display text-xl font-semibold">Select a Service</h2>
        <p className="text-sm text-zinc-500">Choose the service you&apos;d like to book</p>
      </div>
      
      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => setFilter('')}
          className={`rounded-full px-4 py-2 text-sm transition-colors ${
            !filter ? 'bg-violet-600 text-white' : 'border border-white/10 bg-white/5'
          }`}
        >
          All
        </button>
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => setFilter(cat)}
            className={`rounded-full px-4 py-2 text-sm transition-colors capitalize ${
              filter === cat ? 'bg-violet-600 text-white' : 'border border-white/10 bg-white/5'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>
      
      <div className="grid gap-4 md:grid-cols-2">
        {filtered.map((service) => (
          <motion.div
            key={service._id}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => onSelect(service._id)}
            className={`cursor-pointer rounded-xl border p-4 transition-colors ${
              selectedId === service._id
                ? 'border-violet-500 bg-violet-600/10'
                : 'border-white/10 bg-white/5 hover:border-violet-500/50'
            }`}
          >
            <div className="flex items-start justify-between">
              <div>
                <h3 className="font-semibold">{service.name}</h3>
                <p className="text-sm text-zinc-500 line-clamp-2">{service.description}</p>
              </div>
              <div className="text-right">
                <p className="font-display text-lg font-bold text-violet-400">£{service.basePrice}</p>
                <p className="text-xs text-zinc-500">{service.durationMinutes} min</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

function StylistStep({ stylists, selectedId, onSelect }: { 
  stylists: Stylist[];
  selectedId: string | null;
  onSelect: (id: string) => void;
}) {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="font-display text-xl font-semibold">Choose Your Stylist</h2>
        <p className="text-sm text-zinc-500">Select your preferred stylist</p>
      </div>
      
      <div className="grid gap-4 md:grid-cols-2">
        {stylists.length === 0 ? (
          <div className="col-span-2 py-8 text-center text-zinc-500">
            <p>No stylists available for this service</p>
          </div>
        ) : (
          stylists.map((stylist) => (
            <motion.div
              key={stylist._id}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => onSelect(stylist._id)}
              className={`cursor-pointer rounded-xl border p-4 transition-colors ${
                selectedId === stylist._id
                  ? 'border-violet-500 bg-violet-600/10'
                  : 'border-white/10 bg-white/5 hover:border-violet-500/50'
              }`}
            >
              <div className="flex items-center gap-4">
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-violet-600 to-fuchsia-600 font-bold text-xl">
                  {stylist.name.charAt(0)}
                </div>
                <div>
                  <h3 className="font-semibold">{stylist.name}</h3>
                  {stylist.specialties && stylist.specialties.length > 0 && (
                    <div className="mt-1 flex flex-wrap gap-1">
                      {stylist.specialties.slice(0, 3).map(s => (
                        <Badge key={s} variant="outline" className="text-xs">
                          {s}
                        </Badge>
                      ))}
                    </div>
                  )}
                  {stylist.rating && (
                    <p className="mt-1 text-sm text-amber-400">★ {stylist.rating.toFixed(1)}</p>
                  )}
                </div>
              </div>
            </motion.div>
          ))
        )}
      </div>
    </div>
  );
}

function DateTimeStep({ 
  dates, 
  timeSlots, 
  slotsLoading,
  selectedDate, 
  selectedTime, 
  onDateSelect, 
  onTimeSelect 
}: { 
  dates: Date[];
  timeSlots: TimeSlot[];
  slotsLoading: boolean;
  selectedDate: Date | null;
  selectedTime: string | null;
  onDateSelect: (date: Date) => void;
  onTimeSelect: (time: string) => void;
}) {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="font-display text-xl font-semibold">Select Date & Time</h2>
        <p className="text-sm text-zinc-500">Choose your preferred date and time slot</p>
      </div>
      
      <div>
        <h3 className="mb-3 text-sm font-medium">Select Date</h3>
        <div className="flex gap-2 overflow-x-auto pb-2">
          {dates.map((date) => {
            const isSelected = selectedDate?.toDateString() === date.toDateString();
            return (
              <button
                key={date.toISOString()}
                onClick={() => onDateSelect(date)}
                className={`flex min-w-[70px] flex-col items-center rounded-xl border p-3 transition-colors ${
                  isSelected
                    ? 'border-violet-500 bg-violet-600/10'
                    : 'border-white/10 bg-white/5 hover:border-violet-500/50'
                }`}
              >
                <span className="text-xs text-zinc-500">{format(date, 'EEE')}</span>
                <span className="font-display text-xl font-bold">{format(date, 'd')}</span>
                <span className="text-xs text-zinc-500">{format(date, 'MMM')}</span>
              </button>
            );
          })}
        </div>
      </div>
      
      {selectedDate && (
        <div>
          <h3 className="mb-3 text-sm font-medium">Available Times</h3>
          {slotsLoading ? (
            <div className="flex items-center gap-2 py-8 text-zinc-500">
              <Loader2 className="h-5 w-5 animate-spin" />
              Loading available times...
            </div>
          ) : timeSlots.filter(s => s.available).length === 0 ? (
            <div className="py-8 text-center text-zinc-500">
              No available times for this date
            </div>
          ) : (
            <div className="grid grid-cols-4 gap-2 sm:grid-cols-6">
              {timeSlots.filter(s => s.available).map((slot) => (
                <button
                  key={slot.time}
                  onClick={() => onTimeSelect(slot.time)}
                  className={`rounded-lg border p-2 text-sm transition-colors ${
                    selectedTime === slot.time
                      ? 'border-violet-500 bg-violet-600 text-white'
                      : 'border-white/10 bg-white/5 hover:border-violet-500/50'
                  }`}
                >
                  {slot.time}
                </button>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

function ConfirmStep({ 
  service, 
  stylist, 
  date, 
  time, 
  notes,
  onNotesChange,
  onSubmit, 
  loading 
}: { 
  service?: Service;
  stylist?: Stylist;
  date: Date | null;
  time: string | null;
  notes: string;
  onNotesChange: (notes: string) => void;
  onSubmit: () => void;
  loading: boolean;
}) {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="font-display text-xl font-semibold">Confirm Your Booking</h2>
        <p className="text-sm text-zinc-500">Review your appointment details</p>
      </div>
      
      <div className="rounded-xl border border-white/10 bg-white/5 p-6">
        <div className="space-y-4">
          <div className="flex justify-between">
            <span className="text-zinc-500">Service</span>
            <span className="font-medium">{service?.name || '-'}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-zinc-500">Duration</span>
            <span className="font-medium">{service?.durationMinutes} minutes</span>
          </div>
          <div className="flex justify-between">
            <span className="text-zinc-500">Stylist</span>
            <span className="font-medium">{stylist?.name || '-'}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-zinc-500">Date</span>
            <span className="font-medium">{date ? format(date, 'EEEE, MMMM d, yyyy') : '-'}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-zinc-500">Time</span>
            <span className="font-medium">{time || '-'}</span>
          </div>
          <div className="border-t border-white/10 pt-4">
            <div className="flex justify-between">
              <span className="font-medium">Total</span>
              <span className="font-display text-xl font-bold text-violet-400">
                £{service?.basePrice || 0}
              </span>
            </div>
          </div>
        </div>
      </div>

      <div>
        <label className="mb-2 block text-sm font-medium">Notes (optional)</label>
        <textarea
          value={notes}
          onChange={(e) => onNotesChange(e.target.value)}
          placeholder="Any special requests or information we should know?"
          className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 focus:border-violet-500 focus:outline-none"
          rows={3}
        />
      </div>
      
      <Button
        onClick={onSubmit}
        disabled={loading}
        className="w-full bg-gradient-to-r from-violet-600 to-fuchsia-600"
      >
        {loading ? (
          <div className="flex items-center gap-2">
            <Loader2 className="h-4 w-4 animate-spin" />
            Processing...
          </div>
        ) : (
          'Confirm Booking'
        )}
      </Button>
    </div>
  );
}