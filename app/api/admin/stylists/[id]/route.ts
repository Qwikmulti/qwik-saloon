import { NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';
import { connectDB } from '@/lib/mongodb/connection';
import { Stylist } from '@/models';

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  
  try {
    await connectDB();
    const body = await request.json();
    const stylist = await Stylist.findByIdAndUpdate(id, body, { new: true });
    return NextResponse.json({ stylist });
  } catch (error) {
    console.error('Error updating stylist:', error);
    return NextResponse.json({ error: 'Failed to update stylist' }, { status: 500 });
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  
  try {
    await connectDB();
    await Stylist.findByIdAndDelete(id);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting stylist:', error);
    return NextResponse.json({ error: 'Failed to delete stylist' }, { status: 500 });
  }
}