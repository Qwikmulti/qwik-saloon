import { NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';
import { connectDB } from '@/lib/mongodb/connection';
import { Stylist, User } from '@/models';

export async function GET() {
  const { userId } = await auth();
  
  if (!userId) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    await connectDB();
    const stylists = await Stylist.find({})
      .populate('userId')
      .sort({ createdAt: -1 });

    const formattedStylists = stylists.map((stylist) => {
      const user = stylist.userId as any;
      return {
        _id: stylist._id,
        name: user?.fullName || '',
        email: user?.email || '',
        bio: stylist.bio || '',
        specialties: stylist.specialties || [],
        yearsExperience: stylist.yearsExperience || 0,
        profileImage: stylist.profileImage || user?.avatarUrl,
        rating: stylist.rating || 0,
        totalReviews: stylist.totalReviews || 0,
        isActive: stylist.isActive,
        servicesCount: stylist.services?.length || 0,
      };
    });

    return NextResponse.json({ stylists: formattedStylists });
  } catch (error) {
    console.error('Error fetching stylists:', error);
    return NextResponse.json({ error: 'Failed to fetch stylists' }, { status: 500 });
  }
}