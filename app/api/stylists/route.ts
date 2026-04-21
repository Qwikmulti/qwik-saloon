import { NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';
import { connectDB } from '@/lib/mongodb/connection';
import { Stylist, User } from '@/models';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const active = searchParams.get('active');

  try {
    await connectDB();

    const filter: Record<string, any> = {};
    
    if (active !== 'false') {
      filter.isActive = true;
    }

    const stylists = await Stylist.find(filter)
      .populate('userId')
      .sort({ createdAt: -1 });

    const formattedStylists = stylists.map((stylist) => {
      const user = stylist.userId as any;
      return {
        id: stylist._id,
        name: user?.fullName || 'Stylist',
        bio: stylist.bio,
        specialties: stylist.specialties,
        yearsExperience: stylist.yearsExperience,
        profileImage: stylist.profileImage || user?.avatarUrl,
        rating: stylist.rating,
        totalReviews: stylist.totalReviews,
        isActive: stylist.isActive,
      };
    });

    return NextResponse.json({ stylists: formattedStylists });
  } catch (error) {
    console.error('Error fetching stylists:', error);
    return NextResponse.json(
      { error: 'Failed to fetch stylists' },
      { status: 500 }
    );
  }
}