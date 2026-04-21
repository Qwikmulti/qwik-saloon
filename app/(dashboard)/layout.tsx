import { redirect } from 'next/navigation';
import { auth } from '@clerk/nextjs/server';
import { User } from '@/models';
import { connectDB } from '@/lib/mongodb/connection';

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { userId } = await auth();

  if (!userId) {
    redirect('/sign-in');
  }

  await connectDB();
  const user = await User.findOne({ clerkId: userId });

  if (!user) {
    redirect('/sign-in');
  }

  if (!user.role) {
    redirect('/onboarding');
  }

  switch (user.role) {
    case 'customer':
      redirect('/customer');
    case 'stylist':
      redirect('/stylist');
    case 'admin':
      redirect('/admin');
    default:
      redirect('/');
  }

  return null;
}