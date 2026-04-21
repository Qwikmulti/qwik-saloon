'use server';

import { auth } from '@clerk/nextjs/server';
import { connectDB } from '@/lib/mongodb/connection';
import { Booking, Stylist, Service, User } from '@/models';
import { calculateEndTime, doTimesOverlap } from '@/lib/utils';
import { revalidatePath } from 'next/cache';
import mongoose from 'mongoose';

export interface CreateBookingInput {
  serviceId: string;
  stylistId: string;
  bookingDate: string;
  startTime: string;
  notes?: string;
}

export async function createBooking(input: CreateBookingInput) {
  const { userId } = await auth();
  
  if (!userId) {
    return { error: 'You must be logged in to book an appointment' };
  }

  await connectDB();

  const user = await User.findOne({ clerkId: userId });
  if (!user) {
    return { error: 'User not found' };
  }

  const service = await Service.findById(input.serviceId);
  if (!service || !service.isActive) {
    return { error: 'Service not found or unavailable' };
  }

  const stylist = await Stylist.findById(input.stylistId).populate('userId');
  if (!stylist || !stylist.isActive) {
    return { error: 'Stylist not found or unavailable' };
  }

  const bookingDate = new Date(input.bookingDate);
  const dateStart = new Date(bookingDate);
  dateStart.setHours(0, 0, 0, 0);
  const dateEnd = new Date(bookingDate);
  dateEnd.setHours(23, 59, 59, 999);

  const endTime = calculateEndTime(input.startTime, service.durationMinutes);

  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const existingBooking = await Booking.findOne({
      stylistId: new mongoose.Types.ObjectId(input.stylistId),
      bookingDate: { $gte: dateStart, $lte: dateEnd },
      startTime: input.startTime,
      status: { $in: ['pending', 'confirmed'] },
    }).session(session);

    if (existingBooking) {
      await session.abortTransaction();
      return { error: 'This time slot is no longer available. Please choose another time.' };
    }

    const stylistUser = stylist.userId as any;
    
    const booking = new Booking({
      customerId: user._id,
      stylistId: stylist._id,
      serviceId: service._id,
      bookingDate: bookingDate,
      startTime: input.startTime,
      endTime,
      status: 'pending',
      totalPrice: service.basePrice,
      notes: input.notes,
      customerInfo: {
        name: user.fullName,
        email: user.email,
        phone: user.phone,
      },
      stylistInfo: {
        name: stylistUser?.fullName || 'Stylist',
        profileImage: stylist.profileImage,
      },
      serviceInfo: {
        name: service.name,
        duration: service.durationMinutes,
      },
    });

    await booking.save({ session });
    await session.commitTransaction();

    revalidatePath('/customer/bookings');
    revalidatePath('/stylist/schedule');
    
    return { success: true, bookingId: booking._id };
  } catch (error) {
    await session.abortTransaction();
    console.error('Booking creation error:', error);
    return { error: 'Failed to create booking. Please try again.' };
  } finally {
    session.endSession();
  }
}

export async function cancelBooking(bookingId: string, reason?: string) {
  const { userId } = await auth();
  
  if (!userId) {
    return { error: 'You must be logged in' };
  }

  await connectDB();

  const user = await User.findOne({ clerkId: userId });
  if (!user) {
    return { error: 'User not found' };
  }

  const booking = await Booking.findById(bookingId);
  if (!booking) {
    return { error: 'Booking not found' };
  }

  if (booking.customerId.toString() !== user._id.toString()) {
    const stylist = await Stylist.findOne({ userId: user._id });
    if (!stylist || booking.stylistId.toString() !== stylist._id.toString()) {
      return { error: 'Unauthorized' };
    }
  }

  const bookingDate = new Date(booking.bookingDate);
  const now = new Date();
  const hoursUntilAppointment = (bookingDate.getTime() - now.getTime()) / (1000 * 60 * 60);

  if (hoursUntilAppointment < 24 && booking.status !== 'pending') {
    return { error: 'Bookings can only be cancelled at least 24 hours in advance' };
  }

  booking.status = 'cancelled';
  booking.cancellationReason = reason;
  booking.cancelledAt = new Date();
  
  await booking.save();

  revalidatePath('/customer/bookings');
  revalidatePath('/stylist/schedule');
  
  return { success: true };
}

export async function updateBookingStatus(
  bookingId: string,
  status: 'confirmed' | 'completed' | 'no_show'
) {
  const { userId } = await auth();
  
  if (!userId) {
    return { error: 'You must be logged in' };
  }

  await connectDB();

  const user = await User.findOne({ clerkId: userId });
  if (!user) {
    return { error: 'User not found' };
  }

  const booking = await Booking.findById(bookingId);
  if (!booking) {
    return { error: 'Booking not found' };
  }

  const stylist = await Stylist.findOne({ userId: user._id });
  
  if (user.role !== 'admin' && booking.stylistId.toString() !== stylist?._id.toString()) {
    return { error: 'Unauthorized' };
  }

  booking.status = status;
  await booking.save();

  revalidatePath('/stylist/schedule');
  revalidatePath('/customer/bookings');
  
  return { success: true };
}