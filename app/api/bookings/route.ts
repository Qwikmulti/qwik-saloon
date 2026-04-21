import { NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';
import { connectDB } from '@/lib/mongodb/connection';
import { Booking, User } from '@/models';
import { createBooking as createBookingAction, cancelBooking } from '@/actions/booking-actions';
import mongoose from 'mongoose';

export async function GET(request: Request) {
  const { userId } = await auth();
  
  if (!userId) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    await connectDB();
    const user = await User.findOne({ clerkId: userId });
    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    const bookings = await Booking.find({ customerId: user._id })
      .sort({ bookingDate: -1 })
      .limit(50);

    return NextResponse.json({ bookings });
  } catch (error) {
    console.error('Error fetching bookings:', error);
    return NextResponse.json({ error: 'Failed to fetch bookings' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  const { userId } = await auth();
  
  if (!userId) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    await connectDB();
    const user = await User.findOne({ clerkId: userId });
    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    const body = await request.json();
    const { serviceId, stylistId, bookingDate, startTime, notes } = body;

    if (!serviceId || !stylistId || !bookingDate || !startTime) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const result = await createBookingAction({
      serviceId,
      stylistId,
      bookingDate,
      startTime,
      notes,
    });

    if (result.error) {
      return NextResponse.json({ error: result.error }, { status: 400 });
    }

    return NextResponse.json({ success: true, bookingId: result.bookingId });
  } catch (error) {
    console.error('Error creating booking:', error);
    return NextResponse.json({ error: 'Failed to create booking' }, { status: 500 });
  }
}