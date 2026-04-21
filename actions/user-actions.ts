import { User } from '@/models';
import { connectDB } from '@/lib/mongodb/connection';

export async function syncUserFromClerk(clerkId: string, data: {
  email: string;
  fullName: string;
  avatarUrl?: string;
  phone?: string;
}) {
  await connectDB();
  
  const existingUser = await User.findOne({ clerkId });
  
  if (existingUser) {
    Object.assign(existingUser, data);
    await existingUser.save();
    return existingUser;
  }
  
  const newUser = new User({
    ...data,
    clerkId,
    role: 'customer',
  });
  
  await newUser.save();
  return newUser;
}

export async function getUserByClerkId(clerkId: string) {
  await connectDB();
  return User.findOne({ clerkId });
}

export async function updateUserRole(clerkId: string, role: 'customer' | 'stylist' | 'admin') {
  await connectDB();
  return User.findOneAndUpdate(
    { clerkId },
    { role },
    { new: true }
  );
}