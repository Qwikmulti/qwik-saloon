import mongoose, { Schema, Document, Model } from 'mongoose';
import { UserRole } from '@/types';

export interface IUser extends Document {
  clerkId: string;
  email: string;
  fullName: string;
  phone?: string;
  role: UserRole;
  avatarUrl?: string;
  createdAt: Date;
  updatedAt: Date;
}

const UserSchema = new Schema<IUser>(
  {
    clerkId: { type: String, required: true, unique: true, index: true },
    email: { type: String, required: true, unique: true, index: true },
    fullName: { type: String, required: true },
    phone: { type: String },
    role: { type: String, enum: ['customer', 'stylist', 'admin'], default: 'customer' },
    avatarUrl: { type: String },
  },
  { timestamps: true }
);

export const User: Model<IUser> = mongoose.models.User || mongoose.model<IUser>('User', UserSchema);