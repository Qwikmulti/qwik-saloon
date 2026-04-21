'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { format } from 'date-fns';
import { Clock, Plus, Trash2, Save, Calendar, X } from 'lucide-react';
import { Card, Badge, Button, Input } from '@/components/ui';

interface ScheduleDay {
  dayOfWeek: number;
  dayName: string;
  startTime: string;
  endTime: string;
  isAvailable: boolean;
}

interface Exception {
  _id: string;
  date: string;
  startTime?: string;
  endTime?: string;
  isAvailable: boolean;
  reason?: string;
}

const DAYS = [
  { value: 0, name: 'Sunday' },
  { value: 1, name: 'Monday' },
  { value: 2, name: 'Tuesday' },
  { value: 3, name: 'Wednesday' },
  { value: 4, name: 'Thursday' },
  { value: 5, name: 'Friday' },
  { value: 6, name: 'Saturday' },
];

const TIME_OPTIONS = [
  '08:00', '08:30', '09:00', '09:30', '10:00', '10:30', '11:00', '11:30',
  '12:00', '12:30', '13:00', '13:30', '14:00', '14:30', '15:00', '15:30',
  '16:00', '16:30', '17:00', '17:30', '18:00', '18:30', '19:00', '19:30',
];

export default function StylistAvailabilityPage() {
  const [schedules, setSchedules] = useState<ScheduleDay[]>(
    DAYS.map(d => ({
      dayOfWeek: d.value,
      dayName: d.name,
      startTime: '09:00',
      endTime: '17:00',
      isAvailable: d.value !== 0,
    }))
  );
  const [exceptions, setExceptions] = useState<Exception[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [showAddException, setShowAddException] = useState(false);
  const [newException, setNewException] = useState({
    date: '',
    startTime: '09:00',
    endTime: '17:00',
    isAvailable: false,
    reason: '',
  });

  useEffect(() => {
    const fetchAvailability = async () => {
      setLoading(true);
      try {
        const res = await fetch('/api/stylist/availability');
        const data = await res.json();
        if (data.template?.schedules) {
          setSchedules(prev => prev.map(day => {
            const template = data.template.schedules.find((s: any) => s.dayOfWeek === day.dayOfWeek);
            return template ? { ...day, ...template } : day;
          }));
        }
        if (data.exceptions) {
          setExceptions(data.exceptions);
        }
      } catch (error) {
        console.error('Error fetching availability:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchAvailability();
  }, []);

  const handleScheduleChange = (dayOfWeek: number, field: string, value: any) => {
    setSchedules(prev => prev.map(day => 
      day.dayOfWeek === dayOfWeek ? { ...day, [field]: value } : day
    ));
  };

  const handleSaveSchedule = async () => {
    setSaving(true);
    try {
      const res = await fetch('/api/stylist/availability', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ schedules }),
      });
      if (res.ok) {
        alert('Availability saved successfully!');
      }
    } catch (error) {
      console.error('Error saving availability:', error);
    } finally {
      setSaving(false);
    }
  };

  const handleAddException = async () => {
    if (!newException.date) return;
    
    try {
      const res = await fetch('/api/stylist/availability/exceptions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newException),
      });
      if (res.ok) {
        const data = await res.json();
        setExceptions([...exceptions, data.exception]);
        setShowAddException(false);
        setNewException({
          date: '',
          startTime: '09:00',
          endTime: '17:00',
          isAvailable: false,
          reason: '',
        });
      }
    } catch (error) {
      console.error('Error adding exception:', error);
    }
  };

  const handleDeleteException = async (id: string) => {
    try {
      await fetch(`/api/stylist/availability/exceptions/${id}`, { method: 'DELETE' });
      setExceptions(exceptions.filter(e => e._id !== id));
    } catch (error) {
      console.error('Error deleting exception:', error);
    }
  };

  return (
    <div className="space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="font-display text-3xl font-bold">Availability</h1>
        <p className="text-zinc-400 mt-2">Set your weekly schedule and manage exceptions</p>
      </motion.div>

      <Card className="border-white/5 bg-[#131316] p-6">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="font-display text-xl font-semibold">Weekly Schedule</h2>
          <Button 
            onClick={handleSaveSchedule} 
            disabled={saving}
            className="gap-2 bg-gradient-to-r from-violet-600 to-fuchsia-600"
          >
            <Save className="h-4 w-4" />
            {saving ? 'Saving...' : 'Save Changes'}
          </Button>
        </div>

        {loading ? (
          <div className="py-12 text-center">
            <div className="h-8 w-8 animate-spin rounded-full border-4 border-violet-500 border-t-transparent mx-auto" />
          </div>
        ) : (
          <div className="space-y-4">
            {schedules.map((day) => (
              <div
                key={day.dayOfWeek}
                className={`rounded-xl border p-4 transition-colors ${
                  day.isAvailable ? 'border-white/10 bg-white/5' : 'border-white/5 bg-white/0'
                }`}
              >
                <div className="flex items-center justify-between gap-4">
                  <div className="flex items-center gap-4">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={day.isAvailable}
                        onChange={(e) => handleScheduleChange(day.dayOfWeek, 'isAvailable', e.target.checked)}
                        className="h-5 w-5 rounded border-white/20 bg-white/5 text-violet-600 focus:ring-violet-500"
                      />
                      <span className="font-medium w-28">{day.dayName}</span>
                    </label>
                  </div>
                  
                  {day.isAvailable && (
                    <div className="flex items-center gap-2">
                      <select
                        value={day.startTime}
                        onChange={(e) => handleScheduleChange(day.dayOfWeek, 'startTime', e.target.value)}
                        className="rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm"
                      >
                        {TIME_OPTIONS.map(t => (
                          <option key={t} value={t}>{t}</option>
                        ))}
                      </select>
                      <span className="text-zinc-500">to</span>
                      <select
                        value={day.endTime}
                        onChange={(e) => handleScheduleChange(day.dayOfWeek, 'endTime', e.target.value)}
                        className="rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm"
                      >
                        {TIME_OPTIONS.map(t => (
                          <option key={t} value={t}>{t}</option>
                        ))}
                      </select>
                    </div>
                  )}
                  
                  {!day.isAvailable && (
                    <span className="text-sm text-zinc-500">Day off</span>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </Card>

      <Card className="border-white/5 bg-[#131316] p-6">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="font-display text-xl font-semibold">Exceptions</h2>
          <Button 
            variant="outline" 
            onClick={() => setShowAddException(true)}
            className="gap-2 border-white/10"
          >
            <Plus className="h-4 w-4" />
            Add Exception
          </Button>
        </div>

        {exceptions.length === 0 ? (
          <div className="py-8 text-center text-zinc-500">
            <Calendar className="h-12 w-12 mx-auto mb-4 opacity-50" />
            <p>No exceptions set</p>
            <p className="text-sm">Add specific date overrides for holidays or special hours</p>
          </div>
        ) : (
          <div className="space-y-3">
            {exceptions.map((exception) => (
              <div
                key={exception._id}
                className="flex items-center justify-between rounded-lg border border-white/10 bg-white/5 p-4"
              >
                <div>
                  <p className="font-medium">{format(new Date(exception.date), 'EEEE, MMMM d, yyyy')}</p>
                  <p className="text-sm text-zinc-500">
                    {exception.isAvailable 
                      ? `${exception.startTime} - ${exception.endTime}`
                      : 'Unavailable'
                    }
                    {exception.reason && ` • ${exception.reason}`}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant={exception.isAvailable ? 'default' : 'destructive'}>
                    {exception.isAvailable ? 'Custom hours' : 'Day off'}
                  </Badge>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => handleDeleteException(exception._id)}
                    className="text-red-400 hover:text-red-300"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}

        {showAddException && (
          <div className="mt-6 rounded-xl border border-white/10 bg-white/5 p-4">
            <h3 className="font-medium mb-4">Add New Exception</h3>
            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <label className="block text-sm text-zinc-500 mb-2">Date</label>
                <input
                  type="date"
                  value={newException.date}
                  onChange={(e) => setNewException({ ...newException, date: e.target.value })}
                  className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-2"
                />
              </div>
              <div>
                <label className="block text-sm text-zinc-500 mb-2">Type</label>
                <select
                  value={newException.isAvailable ? 'available' : 'unavailable'}
                  onChange={(e) => setNewException({ ...newException, isAvailable: e.target.value === 'available' })}
                  className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-2"
                >
                  <option value="unavailable">Day off</option>
                  <option value="available">Custom hours</option>
                </select>
              </div>
              {newException.isAvailable && (
                <>
                  <div>
                    <label className="block text-sm text-zinc-500 mb-2">Start Time</label>
                    <select
                      value={newException.startTime}
                      onChange={(e) => setNewException({ ...newException, startTime: e.target.value })}
                      className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-2"
                    >
                      {TIME_OPTIONS.map(t => (
                        <option key={t} value={t}>{t}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm text-zinc-500 mb-2">End Time</label>
                    <select
                      value={newException.endTime}
                      onChange={(e) => setNewException({ ...newException, endTime: e.target.value })}
                      className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-2"
                    >
                      {TIME_OPTIONS.map(t => (
                        <option key={t} value={t}>{t}</option>
                      ))}
                    </select>
                  </div>
                </>
              )}
              <div className="md:col-span-2">
                <label className="block text-sm text-zinc-500 mb-2">Reason (optional)</label>
                <input
                  type="text"
                  value={newException.reason}
                  onChange={(e) => setNewException({ ...newException, reason: e.target.value })}
                  placeholder="e.g., Holiday, Training day"
                  className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-2"
                />
              </div>
            </div>
            <div className="mt-4 flex gap-2">
              <Button onClick={handleAddException} className="bg-gradient-to-r from-violet-600 to-fuchsia-600">
                Add Exception
              </Button>
              <Button variant="outline" onClick={() => setShowAddException(false)} className="border-white/10">
                Cancel
              </Button>
            </div>
          </div>
        )}
      </Card>
    </div>
  );
}