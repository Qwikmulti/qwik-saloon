export type UserRole = 'customer' | 'stylist' | 'admin';

export type BookingStatus = 'pending' | 'confirmed' | 'completed' | 'cancelled' | 'no_show';

export type ServiceCategory = 'haircut' | 'coloring' | 'treatment' | 'styling' | 'other';

export interface User {
  _id: string;
  clerkId: string;
  email: string;
  fullName: string;
  phone?: string;
  role: UserRole;
  avatarUrl?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface ServiceOffering {
  serviceId: string;
  customPrice?: number;
  isAvailable: boolean;
}

export interface Stylist {
  _id: string;
  userId: string;
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
  user?: User;
}

export interface Service {
  _id: string;
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

export interface ScheduleSlot {
  dayOfWeek: number;
  startTime: string;
  endTime: string;
  isAvailable: boolean;
}

export interface AvailabilityTemplate {
  _id: string;
  stylistId: string;
  schedules: ScheduleSlot[];
  createdAt: Date;
  updatedAt: Date;
}

export interface AvailabilityException {
  _id: string;
  stylistId: string;
  date: Date;
  startTime?: string;
  endTime?: string;
  isAvailable: boolean;
  reason?: string;
  createdAt: Date;
}

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

export interface Booking {
  _id: string;
  customerId: string;
  stylistId: string;
  serviceId: string;
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

export interface Review {
  _id: string;
  bookingId: string;
  customerId: string;
  stylistId: string;
  rating: number;
  comment?: string;
  createdAt: Date;
  customer?: User;
}

export interface Setting {
  _id: string;
  key: string;
  value: unknown;
  description?: string;
  updatedAt: Date;
}

export interface TimeSlot {
  time: string;
  available: boolean;
}

export interface DashboardStats {
  totalBookings: number;
  todayBookings: number;
  weekBookings: number;
  monthRevenue: number;
  averageRating: number;
}

export interface BookingWithDetails extends Booking {
  customer?: User;
  stylist?: Stylist;
  service?: Service;
}