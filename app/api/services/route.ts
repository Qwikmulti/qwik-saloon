import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb/connection';
import { Service } from '@/models';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const category = searchParams.get('category');
  const active = searchParams.get('active');

  try {
    await connectDB();

    const filter: Record<string, any> = {};
    
    if (category) {
      filter.category = category;
    }
    
    if (active !== 'false') {
      filter.isActive = true;
    }

    const services = await Service.find(filter).sort({ name: 1 });

    return NextResponse.json({ services });
  } catch (error) {
    console.error('Error fetching services:', error);
    return NextResponse.json(
      { error: 'Failed to fetch services' },
      { status: 500 }
    );
  }
}