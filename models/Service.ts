import mongoose, { Schema, Document, Model, Types } from 'mongoose';
import type { ServiceCategory } from '@/types';

export interface IService extends Document {
  name: string;
  description?: string;
  category: ServiceCategory;
  durationMinutes: number;
  basePrice: number;
  imageUrl?: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const ServiceSchema = new Schema<IService>(
  {
    name: { type: String, required: true },
    description: { type: String },
    category: {
      type: String,
      enum: ['haircut', 'coloring', 'treatment', 'styling', 'other'],
      required: true,
    },
    durationMinutes: { type: Number, required: true },
    basePrice: { type: Number, required: true },
    imageUrl: { type: String },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

ServiceSchema.index({ category: 1, isActive: 1 });
ServiceSchema.index({ name: 'text', description: 'text' });

export const Service: Model<IService> =
  mongoose.models.Service || mongoose.model<IService>('Service', ServiceSchema);