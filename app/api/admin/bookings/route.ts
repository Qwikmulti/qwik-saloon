import { NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';
import { connectDB } from '@/lib/mongodb/connection';
import { Booking } from '@/models';

export async function GET() {
  const { userId } = await auth();
  
  if (!userId) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    await connectDB();

    const bookings = await Booking.find({})
      .sort({ bookingDate: -1, startTime: -1 })
      .limit(100);

    return NextResponse.json({ bookings });
  } catch (error) {
    console.error('Error fetching all bookings:', error);
    return NextResponse.json({ error: 'Failed to fetch bookings' }, { status: 500 });
  }
}