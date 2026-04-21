import mongoose, { Schema, Document, Model } from 'mongoose';

export interface ScheduleSlot {
  dayOfWeek: number;
  startTime: string;
  endTime: string;
  isAvailable: boolean;
}

export interface IAvailabilityTemplate extends Document {
  stylistId: mongoose.Types.ObjectId;
  schedules: ScheduleSlot[];
  createdAt: Date;
  updatedAt: Date;
}

const ScheduleSlotSchema = new Schema<ScheduleSlot>(
  {
    dayOfWeek: { type: Number, required: true, min: 0, max: 6 },
    startTime: { type: String, required: true },
    endTime: { type: String, required: true },
    isAvailable: { type: Boolean, default: true },
  },
  { _id: false }
);

const AvailabilityTemplateSchema = new Schema<IAvailabilityTemplate>(
  {
    stylistId: { type: Schema.Types.ObjectId, ref: 'Stylist', required: true },
    schedules: [ScheduleSlotSchema],
  },
  { timestamps: true }
);

AvailabilityTemplateSchema.index({ stylistId: 1, 'schedules.dayOfWeek': 1 });

export const AvailabilityTemplate: Model<IAvailabilityTemplate> =
  mongoose.models.AvailabilityTemplate ||
  mongoose.model<IAvailabilityTemplate>(
    'AvailabilityTemplate',
    AvailabilityTemplateSchema
  );