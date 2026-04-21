import { auth, clerkClient } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';
import type { UserRole } from '@/types';

export async function requireAuth() {
  const { userId } = await auth();
  
  if (!userId) {
    throw new Error('Unauthorized');
  }
  
  return userId;
}

export async function requireRole(allowedRoles: UserRole[]) {
  const userId = await requireAuth();
  const clerk = await clerkClient();
  const user = await clerk.users.getUser(userId);
  const role = user.publicMetadata.role as UserRole;
  
  if (!allowedRoles.includes(role)) {
    throw new Error('Forbidden');
  }
  
  return { userId, role };
}

export async function getCurrentUser() {
  const { userId } = await auth();
  
  if (!userId) return null;
  
  const clerk = await clerkClient();
  const user = await clerk.users.getUser(userId);
  
  return {
    userId,
    email: user.emailAddresses[0]?.emailAddress || '',
    fullName: `${user.firstName || ''} ${user.lastName || ''}`.trim(),
    role: user.publicMetadata.role as UserRole || 'customer',
    avatarUrl: user.imageUrl,
    phone: user.phoneNumbers[0]?.phoneNumber,
  };
}

export async function setUserRole(role: UserRole) {
  const userId = await requireAuth();
  const clerk = await clerkClient();
  
  await clerk.users.updateUserMetadata(userId, {
    publicMetadata: { role, onboardingComplete: true },
  });
  
  return { userId, role };
}