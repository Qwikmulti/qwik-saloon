import { NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';
import { connectDB } from '@/lib/mongodb/connection';
import { AvailabilityTemplate, AvailabilityException, User, Stylist } from '@/models';

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

    const template = await AvailabilityTemplate.findOne({ stylistId: stylist._id });
    const exceptions = await AvailabilityException.find({ 
      stylistId: stylist._id,
      date: { $gte: new Date() },
    }).sort({ date: 1 });

    return NextResponse.json({ template, exceptions });
  } catch (error) {
    console.error('Error fetching stylist availability:', error);
    return NextResponse.json({ error: 'Failed to fetch availability' }, { status: 500 });
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

    const stylist = await Stylist.findOne({ userId: user._id });
    if (!stylist) {
      return NextResponse.json({ error: 'Stylist not found' }, { status: 404 });
    }

    const body = await request.json();
    const { schedules } = body;

    const template = await AvailabilityTemplate.findOneAndUpdate(
      { stylistId: stylist._id },
      { schedules },
      { upsert: true, new: true }
    );

    return NextResponse.json({ template });
  } catch (error) {
    console.error('Error saving stylist availability:', error);
    return NextResponse.json({ error: 'Failed to save availability' }, { status: 500 });
  }
}