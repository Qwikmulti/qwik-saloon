import { z } from 'zod';

export const userSchema = z.object({
  fullName: z.string().min(2, 'Name must be at least 2 characters'),
  phone: z.string().optional(),
  role: z.enum(['customer', 'stylist', 'admin']),
});

export const stylistProfileSchema = z.object({
  bio: z.string().max(500, 'Bio must be under 500 characters').optional(),
  specialties: z.array(z.string()).max(10, 'Maximum 10 specialties'),
  yearsExperience: z.number().min(0).max(50),
  profileImage: z.string().url().optional(),
  portfolioImages: z.array(z.string().url()).max(10, 'Maximum 10 images'),
});

export const serviceSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  description: z.string().max(500).optional(),
  category: z.enum(['haircut', 'coloring', 'treatment', 'styling', 'other']),
  durationMinutes: z.number().min(15).max(240),
  basePrice: z.number().min(0),
  imageUrl: z.string().url().optional(),
});

export const availabilityTemplateSchema = z.object({
  schedules: z.array(
    z.object({
      dayOfWeek: z.number().min(0).max(6),
      startTime: z.string().regex(/^([01]\d|2[0-3]):([0-5]\d)$/, 'Invalid time format (HH:mm)'),
      endTime: z.string().regex(/^([01]\d|2[0-3]):([0-5]\d)$/, 'Invalid time format (HH:mm)'),
      isAvailable: z.boolean(),
    })
  ),
});

export const availabilityExceptionSchema = z.object({
  date: z.string().datetime(),
  startTime: z.string().regex(/^([01]\d|2[0-3]):([0-5]\d)$/, 'Invalid time format (HH:mm)').optional(),
  endTime: z.string().regex(/^([01]\d|2[0-3]):([0-5]\d)$/, 'Invalid time format (HH:mm)').optional(),
  isAvailable: z.boolean(),
  reason: z.string().max(100).optional(),
});

export const bookingSchema = z.object({
  stylistId: z.string().min(1, 'Please select a stylist'),
  serviceId: z.string().min(1, 'Please select a service'),
  bookingDate: z.string().datetime(),
  startTime: z.string().regex(/^([01]\d|2[0-3]):([0-5]\d)$/, 'Invalid time format (HH:mm)'),
  notes: z.string().max(500).optional(),
});

export const reviewSchema = z.object({
  bookingId: z.string().min(1),
  rating: z.number().min(1).max(5),
  comment: z.string().max(500).optional(),
});

export const contactSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  subject: z.string().min(5).max(100),
  message: z.string().min(10).max(1000),
});

export type UserInput = z.infer<typeof userSchema>;
export type StylistProfileInput = z.infer<typeof stylistProfileSchema>;
export type ServiceInput = z.infer<typeof serviceSchema>;
export type AvailabilityTemplateInput = z.infer<typeof availabilityTemplateSchema>;
export type AvailabilityExceptionInput = z.infer<typeof availabilityExceptionSchema>;
export type BookingInput = z.infer<typeof bookingSchema>;
export type ReviewInput = z.infer<typeof reviewSchema>;
export type ContactInput = z.infer<typeof contactSchema>;