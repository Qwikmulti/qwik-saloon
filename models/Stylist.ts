import mongoose, { Schema, Document, Model, Types } from 'mongoose';

export interface ServiceOffering {
  serviceId: Types.ObjectId;
  customPrice?: number;
  isAvailable: boolean;
}

export interface IStylist extends Document {
  userId: Types.ObjectId;
  bio?: string;
  specialties: string[];
  yearsExperience: number;
  profileImage?: string;
  portfolioImages: string[];
  isActive: boolean;
  rating?: number;
  totalReviews: number;
  services: ServiceOffering[];
  createdAt: Date;
  updatedAt: Date;
}

const ServiceOfferingSchema = new Schema<ServiceOffering>(
  {
    serviceId: { type: Schema.Types.ObjectId, ref: 'Service', required: true },
    customPrice: { type: Number },
    isAvailable: { type: Boolean, default: true },
  },
  { _id: false }
);

const StylistSchema = new Schema<IStylist>(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true, unique: true },
    bio: { type: String },
    specialties: [{ type: String }],
    yearsExperience: { type: Number, default: 0 },
    profileImage: { type: String },
    portfolioImages: [{ type: String }],
    isActive: { type: Boolean, default: true },
    rating: { type: Number },
    totalReviews: { type: Number, default: 0 },
    services: [ServiceOfferingSchema],
  },
  { timestamps: true }
);

StylistSchema.index({ userId: 1 }, { unique: true });
StylistSchema.index({ isActive: 1 });
StylistSchema.index({ specialties: 1 });

export const Stylist: Model<IStylist> =
  mongoose.models.Stylist || mongoose.model<IStylist>('Stylist', StylistSchema);