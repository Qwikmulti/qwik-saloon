import { NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';
import { connectDB } from '@/lib/mongodb/connection';
import { Booking, User, Stylist } from '@/models';
import mongoose from 'mongoose';

export async function GET() {
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

    const stylist = await Stylist.findOne({ userId: user._id });
    if (!stylist) {
      return NextResponse.json({ error: 'Stylist not found' }, { status: 404 });
    }

    const thirtyDaysFromNow = new Date();
    thirtyDaysFromNow.setDate(thirtyDaysFromNow.getDate() + 30);

    const bookings = await Booking.find({
      stylistId: stylist._id,
      bookingDate: { $gte: new Date(), $lte: thirtyDaysFromNow },
    })
      .sort({ bookingDate: 1, startTime: 1 })
      .limit(100);

    return NextResponse.json({ bookings });
  } catch (error) {
    console.error('Error fetching stylist bookings:', error);
    return NextResponse.json({ error: 'Failed to fetch bookings' }, { status: 500 });
  }
}