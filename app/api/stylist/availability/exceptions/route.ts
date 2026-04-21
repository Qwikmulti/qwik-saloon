import { NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';
import { connectDB } from '@/lib/mongodb/connection';
import { AvailabilityException, User, Stylist } from '@/models';

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

    const stylist = await Stylist.findOne({ userId: user._id });
    if (!stylist) {
      return NextResponse.json({ error: 'Stylist not found' }, { status: 404 });
    }

    const body = await request.json();
    const { date, startTime, endTime, isAvailable, reason } = body;

    const exception = new AvailabilityException({
      stylistId: stylist._id,
      date: new Date(date),
      startTime,
      endTime,
      isAvailable,
      reason,
    });

    await exception.save();

    return NextResponse.json({ exception });
  } catch (error) {
    console.error('Error creating exception:', error);
    return NextResponse.json({ error: 'Failed to create exception' }, { status: 500 });
  }
}

export async function DELETE(
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

    await AvailabilityException.findOneAndDelete({
      _id: id,
      stylistId: stylist._id,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting exception:', error);
    return NextResponse.json({ error: 'Failed to delete exception' }, { status: 500 });
  }
}