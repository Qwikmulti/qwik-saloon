import mongoose, { Schema, Document, Model } from 'mongoose';

export interface ISetting extends Document {
  key: string;
  value: unknown;
  description?: string;
  updatedAt: Date;
}

const SettingSchema = new Schema<ISetting>(
  {
    key: { type: String, required: true, unique: true },
    value: { type: Schema.Types.Mixed, required: true },
    description: { type: String },
  },
  { timestamps: true, updatedAt: true }
);

SettingSchema.index({ key: 1 });

export const Setting: Model<ISetting> =
  mongoose.models.Setting || mongoose.model<ISetting>('Setting', SettingSchema);