import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IAvailabilityException extends Document {
  stylistId: mongoose.Types.ObjectId;
  date: Date;
  startTime?: string;
  endTime?: string;
  isAvailable: boolean;
  reason?: string;
  createdAt: Date;
}

const AvailabilityExceptionSchema = new Schema<IAvailabilityException>(
  {
    stylistId: { type: Schema.Types.ObjectId, ref: 'Stylist', required: true },
    date: { type: Date, required: true },
    startTime: { type: String },
    endTime: { type: String },
    isAvailable: { type: Boolean, required: true },
    reason: { type: String },
  },
  { timestamps: true, createdAt: true, updatedAt: false }
);

AvailabilityExceptionSchema.index({ stylistId: 1, date: 1 });

export const AvailabilityException: Model<IAvailabilityException> =
  mongoose.models.AvailabilityException ||
  mongoose.model<IAvailabilityException>(
    'AvailabilityException',
    AvailabilityExceptionSchema
  );