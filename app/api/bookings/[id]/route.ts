import { NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';
import { connectDB } from '@/lib/mongodb/connection';
import { Booking, User } from '@/models';
import { cancelBooking } from '@/actions/booking-actions';

export async function POST(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { userId } = await auth();
  const { id } = await params;
  
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
    const { reason } = body;

    const booking = await Booking.findById(id);
    if (!booking) {
      return NextResponse.json({ error: 'Booking not found' }, { status: 404 });
    }

    if (booking.customerId.toString() !== user._id.toString()) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });
    }

    const bookingDate = new Date(booking.bookingDate);
    const now = new Date();
    const hoursUntilAppointment = (bookingDate.getTime() - now.getTime()) / (1000 * 60 * 60);

    if (hoursUntilAppointment < 24 && booking.status !== 'pending') {
      return NextResponse.json(
        { error: 'Bookings can only be cancelled at least 24 hours in advance' },
        { status: 400 }
      );
    }

    booking.status = 'cancelled';
    booking.cancellationReason = reason;
    booking.cancelledAt = new Date();
    await booking.save();

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error cancelling booking:', error);
    return NextResponse.json({ error: 'Failed to cancel booking' }, { status: 500 });
  }
}