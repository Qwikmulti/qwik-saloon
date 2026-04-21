import { connectDB } from '@/lib/mongodb/connection';
import { Service, User, Stylist, Setting } from '@/models';
import mongoose from 'mongoose';

async function seedServices() {
  const services = [
    {
      name: 'Precision Cut',
      description: 'Expert cut tailored to your face shape and lifestyle. Includes consultation and styling.',
      category: 'haircut',
      durationMinutes: 45,
      basePrice: 35,
      isActive: true,
    },
    {
      name: 'Haircut & Style',
      description: 'Complete haircut service with wash, cut, and professional styling.',
      category: 'haircut',
      durationMinutes: 60,
      basePrice: 45,
      isActive: true,
    },
    {
      name: 'Men\'s Cut',
      description: 'Modern cut for men including wash and finish.',
      category: 'haircut',
      durationMinutes: 30,
      basePrice: 25,
      isActive: true,
    },
    {
      name: 'Full Head Colour',
      description: 'Complete colour application for a bold new look.',
      category: 'coloring',
      durationMinutes: 120,
      basePrice: 65,
      isActive: true,
    },
    {
      name: 'Highlights (Foil)',
      description: 'Classic foil highlights for dimension and depth.',
      category: 'coloring',
      durationMinutes: 150,
      basePrice: 85,
      isActive: true,
    },
    {
      name: 'Balayage',
      description: 'Hand-painted highlights for a natural, sun-kissed look.',
      category: 'coloring',
      durationMinutes: 180,
      basePrice: 120,
      isActive: true,
    },
    {
      name: 'Colour Correction',
      description: 'Professional colour correction for damaged or mismatched colour.',
      category: 'coloring',
      durationMinutes: 180,
      basePrice: 150,
      isActive: true,
    },
    {
      name: 'Deep Conditioning',
      description: 'Intensive moisture treatment for dry, damaged hair.',
      category: 'treatment',
      durationMinutes: 45,
      basePrice: 35,
      isActive: true,
    },
    {
      name: 'Keratin Treatment',
      description: 'Smoothing treatment that eliminates frizz and adds shine.',
      category: 'treatment',
      durationMinutes: 120,
      basePrice: 120,
      isActive: true,
    },
    {
      name: 'Scalp Treatment',
      description: 'Deep cleansing and nourishing treatment for scalp health.',
      category: 'treatment',
      durationMinutes: 45,
      basePrice: 40,
      isActive: true,
    },
    {
      name: 'Blow Dry',
      description: 'Professional blow dry with styling.',
      category: 'styling',
      durationMinutes: 45,
      basePrice: 30,
      isActive: true,
    },
    {
      name: 'Bridal Styling',
      description: 'Complete bridal hair styling for your special day.',
      category: 'styling',
      durationMinutes: 90,
      basePrice: 120,
      isActive: true,
    },
    {
      name: 'Special Occasion',
      description: 'Elegant styling for parties, proms, and events.',
      category: 'styling',
      durationMinutes: 60,
      basePrice: 55,
      isActive: true,
    },
  ];

  for (const service of services) {
    await Service.findOneAndUpdate(
      { name: service.name },
      service,
      { upsert: true, new: true }
    );
  }

  console.log('Services seeded successfully');
}

async function seedSettings() {
  const settings = [
    { key: 'business_hours', value: { open: '09:00', close: '19:00' }, description: 'Standard business hours' },
    { key: 'booking_window', value: { minDays: 1, maxDays: 60 }, description: 'How far in advance bookings can be made' },
    { key: 'buffer_minutes', value: 15, description: 'Buffer time between appointments' },
    { key: 'cancellation_hours', value: 24, description: 'Hours before appointment for free cancellation' },
  ];

  for (const setting of settings) {
    await Setting.findOneAndUpdate(
      { key: setting.key },
      setting,
      { upsert: true, new: true }
    );
  }

  console.log('Settings seeded successfully');
}

async function seed() {
  try {
    await connectDB();
    console.log('Connected to MongoDB');

    await seedServices();
    await seedSettings();

    console.log('Seed completed successfully');
  } catch (error) {
    console.error('Seed error:', error);
  } finally {
    process.exit(0);
  }
}

seed();