import { NextResponse } from 'next/server';
import { auth, clerkClient } from '@clerk/nextjs/server';
import { updateUserRole } from '@/actions/user-actions';

export async function POST(req: Request) {
  try {
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { role } = await req.json();
    if (!['customer', 'stylist', 'admin'].includes(role)) {
      return NextResponse.json({ error: 'Invalid role' }, { status: 400 });
    }

    const clerk = await clerkClient();
    await clerk.users.updateUserMetadata(userId, {
      publicMetadata: { role, onboardingComplete: true },
    });

    await updateUserRole(userId, role);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Onboarding error:', error);
    return NextResponse.json({ error: 'Failed to update role' }, { status: 500 });
  }
}