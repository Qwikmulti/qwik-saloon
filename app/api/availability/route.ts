import { NextResponse } from 'next/server';
import { getAvailableSlotsForDate } from '@/lib/availability';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const stylistId = searchParams.get('stylistId');
  const date = searchParams.get('date');
  const duration = searchParams.get('duration');

  if (!stylistId || !date || !duration) {
    return NextResponse.json(
      { error: 'Missing required parameters: stylistId, date, duration' },
      { status: 400 }
    );
  }

  try {
    const slots = await getAvailableSlotsForDate(
      stylistId,
      new Date(date),
      parseInt(duration)
    );

    return NextResponse.json({ slots });
  } catch (error) {
    console.error('Error fetching slots:', error);
    return NextResponse.json(
      { error: 'Failed to fetch available slots' },
      { status: 500 }
    );
  }
}