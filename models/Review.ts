import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IReview extends Document {
  bookingId: mongoose.Types.ObjectId;
  customerId: mongoose.Types.ObjectId;
  stylistId: mongoose.Types.ObjectId;
  rating: number;
  comment?: string;
  createdAt: Date;
}

const ReviewSchema = new Schema<IReview>(
  {
    bookingId: { type: Schema.Types.ObjectId, ref: 'Booking', required: true, unique: true },
    customerId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    stylistId: { type: Schema.Types.ObjectId, ref: 'Stylist', required: true },
    rating: { type: Number, required: true, min: 1, max: 5 },
    comment: { type: String },
  },
  { timestamps: true, createdAt: true, updatedAt: false }
);

ReviewSchema.index({ stylistId: 1, createdAt: -1 });
ReviewSchema.index({ customerId: 1 });

export const Review: Model<IReview> =
  mongoose.models.Review || mongoose.model<IReview>('Review', ReviewSchema);