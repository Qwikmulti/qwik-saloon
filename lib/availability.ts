/* eslint-disable @typescript-eslint/no-explicit-any */
import { connectDB } from '@/lib/mongodb/connection';
import { Booking, Stylist, Service, User, AvailabilityTemplate, AvailabilityException } from '@/models';
import { timeToMinutes, minutesToTime, calculateEndTime, doTimesOverlap } from '@/lib/utils';
import type { TimeSlot, BookingStatus } from '@/types';
import mongoose from 'mongoose';

const BUSINESS_START = 9 * 60;
const BUSINESS_END = 19 * 60;
const SLOT_INTERVAL = 30;

export async function getAvailableSlotsForDate(
  stylistId: string,
  date: Date,
  serviceDuration: number
): Promise<TimeSlot[]> {
  await connectDB();

  const stylist = await Stylist.findById(stylistId).populate('userId');
  if (!stylist || !stylist.isActive) {
    return [];
  }

  const dayOfWeek = date.getDay();
  const dateStr = new Date(date.toDateString());
  dateStr.setHours(0, 0, 0, 0);

  const [template, exception, existingBookings] = await Promise.all([
    AvailabilityTemplate.findOne({ stylistId }),
    AvailabilityException.findOne({
      stylistId,
      date: dateStr,
    }),
    Booking.find({
      stylistId: new mongoose.Types.ObjectId(stylistId),
      bookingDate: dateStr,
      status: { $in: ['pending', 'confirmed'] },
    }),
  ]);

  let startMins = BUSINESS_START;
  let endMins = BUSINESS_END;
  let isDayOff = false;

  if (exception) {
    isDayOff = !exception.isAvailable;
    if (exception.startTime && exception.endTime) {
      startMins = timeToMinutes(exception.startTime);
      endMins = timeToMinutes(exception.endTime);
    }
  } else if (template) {
    const daySchedule = template.schedules.find((s: any) => s.dayOfWeek === dayOfWeek);
    if (daySchedule && daySchedule.isAvailable) {
      startMins = timeToMinutes(daySchedule.startTime);
      endMins = timeToMinutes(daySchedule.endTime);
    } else if (daySchedule && !daySchedule.isAvailable) {
      isDayOff = true;
    }
  }

  if (isDayOff) {
    return [];
  }

  const bookedSlots = existingBookings.map((b: any) => ({
    start: b.startTime,
    end: b.endTime,
  }));

  const slots: TimeSlot[] = [];
  
  for (let mins = startMins; mins + serviceDuration <= endMins; mins += SLOT_INTERVAL) {
    const time = minutesToTime(mins);
    const endTime = calculateEndTime(time, serviceDuration);
    
    const isBooked = bookedSlots.some((booked) =>
      doTimesOverlap(time, endTime, booked.start, booked.end)
    );

    slots.push({
      time,
      available: !isBooked,
    });
  }

  return slots;
}

export async function getAvailableStylistsForService(
  serviceId: string,
  date: Date,
  time: string,
  duration: number
): Promise<string[]> {
  await connectDB();

  const service = await Service.findById(serviceId);
  if (!service || !service.isActive) {
    return [];
  }

  const endTime = calculateEndTime(time, duration);
  const dateStr = new Date(date.toDateString());
  dateStr.setHours(0, 0, 0, 0);
  const dayOfWeek = date.getDay();

  const stylists = await Stylist.find({
    isActive: true,
    'services.serviceId': new mongoose.Types.ObjectId(serviceId),
    'services.isAvailable': true,
  }).populate('userId');

  const availableIds: string[] = [];

  for (const stylist of stylists) {
    const hasTemplate = await AvailabilityTemplate.findOne({
      stylistId: stylist._id,
      'schedules.dayOfWeek': dayOfWeek,
      'schedules.isAvailable': true,
    });

    if (!hasTemplate) continue;

    const hasException = await AvailabilityException.findOne({
      stylistId: stylist._id,
      date: dateStr,
    });

    if (hasException && !hasException.isAvailable) continue;

    const conflictingBooking = await Booking.findOne({
      stylistId: stylist._id,
      bookingDate: dateStr,
      startTime: time,
      status: { $in: ['pending', 'confirmed'] },
    });

    if (!conflictingBooking) {
      availableIds.push(stylist._id.toString());
    }
  }

  return availableIds;
}

export async function getAvailableDatesForMonth(
  stylistId: string,
  serviceId: string,
  year: number,
  month: number
): Promise<number[]> {
  await connectDB();

  const service = await Service.findById(serviceId);
  if (!service) return [];

  const availableDates: number[] = [];
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const daysInMonth = new Date(year, month + 1, 0).getDate();

  for (let day = 1; day <= daysInMonth; day++) {
    const date = new Date(year, month, day);
    date.setHours(0, 0, 0, 0);

    if (date < today) continue;

    const slots = await getAvailableSlotsForDate(stylistId, date, service.durationMinutes);
    if (slots.some((s) => s.available)) {
      availableDates.push(day);
    }
  }

  return availableDates;
}