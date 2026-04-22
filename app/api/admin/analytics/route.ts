import { NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';
import { connectDB } from '@/lib/mongodb/connection';
import { Booking, Stylist, Service, User, Review } from '@/models';

export async function GET() {
  const { userId } = await auth();
  
  if (!userId) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    await connectDB();

    const now = new Date();
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    const startOfWeek = new Date(now);
    startOfWeek.setDate(now.getDate() - now.getDay());

    const [
      totalBookings,
      totalStylists,
      recentBookings,
      monthRevenueAgg,
      weekBookingsCount,
      todayBookingsCount,
      avgRatingAgg,
    ] = await Promise.all([
      Booking.countDocuments(),
      Stylist.countDocuments({ isActive: true }),
      Booking.find({})
        .sort({ bookingDate: -1 })
        .limit(10),
      Booking.aggregate([
        { $match: { bookingDate: { $gte: startOfMonth }, status: 'completed' } },
        { $group: { _id: null, total: { $sum: '$totalPrice' } } },
      ]),
      Booking.countDocuments({ bookingDate: { $gte: startOfWeek } }),
      Booking.countDocuments({
        bookingDate: {
          $gte: new Date(now.toDateString()),
          $lt: new Date(now.getDate() + 1),
        },
      }),
      Review.aggregate([{ $group: { _id: null, avg: { $avg: '$rating' } } }]),
    ]);

    const stats = {
      totalBookings,
      totalRevenue: monthRevenueAgg[0]?.total || 0,
      totalStylists,
      averageRating: avgRatingAgg[0]?.avg || 0,
      todayBookings: todayBookingsCount,
      weekBookings: weekBookingsCount,
      monthRevenue: monthRevenueAgg[0]?.total || 0,
    };

    return NextResponse.json({ stats, recentBookings });
  } catch (error) {
    console.error('Error fetching analytics:', error);
    return NextResponse.json({ error: 'Failed to fetch analytics' }, { status: 500 });
  }
}