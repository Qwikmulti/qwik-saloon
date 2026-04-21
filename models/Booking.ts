import mongoose, { Schema, Document, Model } from 'mongoose';
import { BookingStatus } from '@/types';

export interface CustomerInfo {
  name: string;
  email: string;
  phone?: string;
}

export interface StylistInfo {
  name: string;
  profileImage?: string;
}

export interface ServiceInfo {
  name: string;
  duration: number;
}

export interface IBooking extends Document {
  customerId: mongoose.Types.ObjectId;
  stylistId: mongoose.Types.ObjectId;
  serviceId: mongoose.Types.ObjectId;
  bookingDate: Date;
  startTime: string;
  endTime: string;
  status: BookingStatus;
  totalPrice: number;
  notes?: string;
  cancellationReason?: string;
  cancelledAt?: Date;
  customerInfo: CustomerInfo;
  stylistInfo: StylistInfo;
  serviceInfo: ServiceInfo;
  createdAt: Date;
  updatedAt: Date;
}

const BookingSchema = new Schema<IBooking>(
  {
    customerId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    stylistId: { type: Schema.Types.ObjectId, ref: 'Stylist', required: true },
    serviceId: { type: Schema.Types.ObjectId, ref: 'Service', required: true },
    bookingDate: { type: Date, required: true },
    startTime: { type: String, required: true },
    endTime: { type: String, required: true },
    status: {
      type: String,
      enum: ['pending', 'confirmed', 'completed', 'cancelled', 'no_show'],
      default: 'pending',
    },
    totalPrice: { type: Number, required: true },
    notes: { type: String },
    cancellationReason: { type: String },
    cancelledAt: { type: Date },
    customerInfo: {
      name: { type: String, required: true },
      email: { type: String, required: true },
      phone: { type: String },
    },
    stylistInfo: {
      name: { type: String, required: true },
      profileImage: { type: String },
    },
    serviceInfo: {
      name: { type: String, required: true },
      duration: { type: Number, required: true },
    },
  },
  { timestamps: true }
);

BookingSchema.index({ stylistId: 1, bookingDate: 1, startTime: 1 });
BookingSchema.index({ customerId: 1, bookingDate: -1 });
BookingSchema.index({ bookingDate: 1, status: 1 });

export const Booking: Model<IBooking> =
  mongoose.models.Booking || mongoose.model<IBooking>('Booking', BookingSchema);