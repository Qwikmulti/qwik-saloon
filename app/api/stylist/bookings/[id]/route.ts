import { NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';
import { connectDB } from '@/lib/mongodb/connection';
import { Booking, User, Stylist } from '@/models';

export async function PATCH(
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

    const stylist = await Stylist.findOne({ userId: user._id });
    if (!stylist) {
      return NextResponse.json({ error: 'Stylist not found' }, { status: 404 });
    }

    const body = await request.json();
    const { status } = body;

    const booking = await Booking.findById(id);
    if (!booking) {
      return NextResponse.json({ error: 'Booking not found' }, { status: 404 });
    }

    if (booking.stylistId.toString() !== stylist._id.toString()) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });
    }

    booking.status = status;
    await booking.save();

    return NextResponse.json({ success: true, booking });
  } catch (error) {
    console.error('Error updating booking status:', error);
    return NextResponse.json({ error: 'Failed to update booking' }, { status: 500 });
  }
}