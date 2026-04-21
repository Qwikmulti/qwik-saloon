import { NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';
import { connectDB } from '@/lib/mongodb/connection';
import { User, Stylist } from '@/models';

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

    const stylist = await Stylist.findOne({ userId: user._id }).populate('userId');
    if (!stylist) {
      return NextResponse.json({ error: 'Stylist not found' }, { status: 404 });
    }

    const userPopulated = stylist.userId as any;
    
    return NextResponse.json({
      profile: {
        name: userPopulated?.fullName || '',
        bio: stylist.bio || '',
        specialties: stylist.specialties || [],
        yearsExperience: stylist.yearsExperience || 0,
        profileImage: stylist.profileImage || userPopulated?.avatarUrl,
      },
    });
  } catch (error) {
    console.error('Error fetching stylist profile:', error);
    return NextResponse.json({ error: 'Failed to fetch profile' }, { status: 500 });
  }
}

export async function PATCH(request: Request) {
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
    const { name, bio, specialties, yearsExperience, profileImage } = body;

    if (name && user) {
      user.fullName = name;
      await user.save();
    }

    if (bio !== undefined) stylist.bio = bio;
    if (specialties) stylist.specialties = specialties;
    if (yearsExperience !== undefined) stylist.yearsExperience = yearsExperience;
    if (profileImage) stylist.profileImage = profileImage;

    await stylist.save();

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error updating stylist profile:', error);
    return NextResponse.json({ error: 'Failed to update profile' }, { status: 500 });
  }
}