import { connectDB } from '@/lib/mongodb/connection';
import { User, Stylist, Service, Booking, Review, Setting, AvailabilityTemplate, AvailabilityException } from '@/models';
import mongoose from 'mongoose';

async function seedUsers() {
  const users = [
    {
      clerkId: 'demo_admin_001',
      email: 'admin@qwiksalon.co.uk',
      fullName: 'Sarah Mitchell',
      phone: '+447911123456',
      role: 'admin',
      avatarUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop',
    },
    {
      clerkId: 'demo_stylist_001',
      email: 'alexandra@qwiksalon.co.uk',
      fullName: 'Alexandra Chen',
      phone: '+447911123457',
      role: 'stylist',
      avatarUrl: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=200&h=200&fit=crop',
    },
    {
      clerkId: 'demo_stylist_002',
      email: 'sofia@qwiksalon.co.uk',
      fullName: 'Sofia Rodriguez',
      phone: '+447911123458',
      role: 'stylist',
      avatarUrl: 'https://images.unsplash.com/photo-1594744803329-e58b31de8bf5?w=200&h=200&fit=crop',
    },
    {
      clerkId: 'demo_stylist_003',
      email: 'james@qwiksalon.co.uk',
      fullName: 'James Thompson',
      phone: '+447911123459',
      role: 'stylist',
      avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop',
    },
    {
      clerkId: 'demo_stylist_004',
      email: 'emma@qwiksalon.co.uk',
      fullName: 'Emma Laurent',
      phone: '+447911123460',
      role: 'stylist',
      avatarUrl: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d84?w=200&h=200&fit=crop',
    },
    {
      clerkId: 'demo_stylist_005',
      email: 'michael@qwiksalon.co.uk',
      fullName: 'Michael Brown',
      phone: '+447911123461',
      role: 'stylist',
      avatarUrl: 'https://images.unsplash.com/photo-1500648767791-00bcc5c71db2?w=200&h=200&fit=crop',
    },
    {
      clerkId: 'demo_customer_001',
      email: 'john.doe@email.com',
      fullName: 'John Doe',
      phone: '+447911123462',
      role: 'customer',
      avatarUrl: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop',
    },
    {
      clerkId: 'demo_customer_002',
      email: 'jane.wilson@email.com',
      fullName: 'Jane Wilson',
      phone: '+447911123463',
      role: 'customer',
      avatarUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200&h=200&fit=crop',
    },
    {
      clerkId: 'demo_customer_003',
      email: 'robert.taylor@email.com',
      fullName: 'Robert Taylor',
      phone: '+447911123464',
      role: 'customer',
      avatarUrl: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=200&h=200&fit=crop',
    },
    {
      clerkId: 'demo_customer_004',
      email: 'emily.davis@email.com',
      fullName: 'Emily Davis',
      phone: '+447911123465',
      role: 'customer',
      avatarUrl: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=200&h=200&fit=crop',
    },
    {
      clerkId: 'demo_customer_005',
      email: 'david.martinez@email.com',
      fullName: 'David Martinez',
      phone: '+447911123466',
      role: 'customer',
      avatarUrl: 'https://images.unsplash.com/photo-1463453091185-61582044dbf3?w=200&h=200&fit=crop',
    },
    {
      clerkId: 'demo_customer_006',
      email: 'sarah.johnson@email.com',
      fullName: 'Sarah Johnson',
      phone: '+447911123467',
      role: 'customer',
      avatarUrl: 'https://images.unsplash.com/photo-1489424731084-a5d8edf01fb9?w=200&h=200&fit=crop',
    },
  ];

  const createdUsers = [];
  for (const userData of users) {
    const user = await User.findOneAndUpdate(
      { email: userData.email },
      userData,
      { upsert: true, new: true }
    );
    createdUsers.push(user);
  }

  console.log(`Created ${createdUsers.length} users`);
  return createdUsers;
}

async function seedServices() {
  const services = [
    { name: 'Precision Cut', description: 'Expert cut tailored to your face shape and lifestyle', category: 'haircut', durationMinutes: 45, basePrice: 35, isActive: true },
    { name: 'Haircut & Style', description: 'Complete haircut service with wash, cut, and styling', category: 'haircut', durationMinutes: 60, basePrice: 45, isActive: true },
    { name: "Men's Cut", description: 'Modern cut for men including wash and finish', category: 'haircut', durationMinutes: 30, basePrice: 25, isActive: true },
    { name: 'Full Head Colour', description: 'Complete colour application for a bold new look', category: 'coloring', durationMinutes: 120, basePrice: 65, isActive: true },
    { name: 'Highlights (Foil)', description: 'Classic foil highlights for dimension and depth', category: 'coloring', durationMinutes: 150, basePrice: 85, isActive: true },
    { name: 'Balayage', description: 'Hand-painted highlights for a natural, sun-kissed look', category: 'coloring', durationMinutes: 180, basePrice: 120, isActive: true },
    { name: 'Colour Correction', description: 'Professional colour correction', category: 'coloring', durationMinutes: 180, basePrice: 150, isActive: true },
    { name: 'Deep Conditioning', description: 'Intensive moisture treatment', category: 'treatment', durationMinutes: 45, basePrice: 35, isActive: true },
    { name: 'Keratin Treatment', description: 'Smoothing treatment that eliminates frizz', category: 'treatment', durationMinutes: 120, basePrice: 120, isActive: true },
    { name: 'Scalp Treatment', description: 'Deep cleansing for scalp health', category: 'treatment', durationMinutes: 45, basePrice: 40, isActive: true },
    { name: 'Blow Dry', description: 'Professional blow dry with styling', category: 'styling', durationMinutes: 45, basePrice: 30, isActive: true },
    { name: 'Bridal Styling', description: 'Complete bridal hair styling', category: 'styling', durationMinutes: 90, basePrice: 120, isActive: true },
    { name: 'Special Occasion', description: 'Elegant styling for events', category: 'styling', durationMinutes: 60, basePrice: 55, isActive: true },
  ];

  const createdServices = [];
  for (const service of services) {
    const svc = await Service.findOneAndUpdate(
      { name: service.name },
      service,
      { upsert: true, new: true }
    );
    createdServices.push(svc);
  }

  console.log(`Created ${createdServices.length} services`);
  return createdServices;
}

async function seedStylists(users: any[], services: any[]) {
  const stylistUsers = users.filter(u => u.role === 'stylist');
  
  const stylistsData = [
    {
      userId: stylistUsers[0]._id,
      bio: 'Senior stylist with 12 years of experience specializing in precision cuts and colour transformations. Trained in Milan and London.',
      specialties: ['Precision Cuts', 'Colour', 'Balayage'],
      yearsExperience: 12,
      profileImage: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&h=400&fit=crop',
      isActive: true,
      rating: 4.9,
      totalReviews: 156,
    },
    {
      userId: stylistUsers[1]._id,
      bio: 'Colour specialist with a passion for creative, vibrant colours. Known for stunning balayage and creative colour work.',
      specialties: ['Colour', 'Balayage', 'Creative Colour'],
      yearsExperience: 8,
      profileImage: 'https://images.unsplash.com/photo-1594744803329-e58b31de8bf5?w=400&h=400&fit=crop',
      isActive: true,
      rating: 4.8,
      totalReviews: 98,
    },
    {
      userId: stylistUsers[2]._id,
      bio: 'Master barber and men\'s specialist. Expert in fades, beard grooming and contemporary men\'s styles.',
      specialties: ['Men\'s Cuts', 'Fades', 'Beard Styling'],
      yearsExperience: 10,
      profileImage: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop',
      isActive: true,
      rating: 4.9,
      totalReviews: 234,
    },
    {
      userId: stylistUsers[3]._id,
      bio: 'Bridal and occasion specialist. Creating stunning looks for weddings and special events for over 6 years.',
      specialties: ['Bridal Styling', 'Special Occasion', 'Updos'],
      yearsExperience: 6,
      profileImage: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d84?w=400&h=400&fit=crop',
      isActive: true,
      rating: 5.0,
      totalReviews: 87,
    },
    {
      userId: stylistUsers[4]._id,
      bio: 'Treatment expert specializing in keratin and restorative treatments. Hair health is my priority.',
      specialties: ['Keratin', 'Treatments', 'Hair Recovery'],
      yearsExperience: 7,
      profileImage: 'https://images.unsplash.com/photo-1500648767791-00bcc5c71db2?w=400&h=400&fit=crop',
      isActive: true,
      rating: 4.7,
      totalReviews: 76,
    },
  ];

  const createdStylists = [];
  for (const stylistData of stylistsData) {
    const serviceOfferings = services.slice(0, Math.floor(Math.random() * 5) + 5).map(s => ({
      serviceId: s._id,
      isAvailable: true,
      customPrice: s.basePrice,
    }));
    
    const stylist = await Stylist.findOneAndUpdate(
      { userId: stylistData.userId },
      { ...stylistData, services: serviceOfferings },
      { upsert: true, new: true }
    );
    createdStylists.push(stylist);
  }

  console.log(`Created ${createdStylists.length} stylists`);
  return createdStylists;
}

async function seedAvailability(stylists: any[]) {
  const defaultSchedules = [
    { dayOfWeek: 1, startTime: '09:00', endTime: '17:00', isAvailable: true },
    { dayOfWeek: 2, startTime: '09:00', endTime: '17:00', isAvailable: true },
    { dayOfWeek: 3, startTime: '09:00', endTime: '17:00', isAvailable: true },
    { dayOfWeek: 4, startTime: '09:00', endTime: '17:00', isAvailable: true },
    { dayOfWeek: 5, startTime: '09:00', endTime: '18:00', isAvailable: true },
    { dayOfWeek: 6, startTime: '09:00', endTime: '16:00', isAvailable: true },
  ];

  for (const stylist of stylists) {
    const existing = await AvailabilityTemplate.findOne({ stylistId: stylist._id });
    if (!existing) {
      await AvailabilityTemplate.create({
        stylistId: stylist._id,
        schedules: defaultSchedules,
      });
    }
  }

  console.log('Created availability templates');
}

async function seedBookings(users: any[], stylists: any[], services: any[]) {
  const customerUsers = users.filter(u => u.role === 'customer');
  
  const now = new Date();
  const bookings = [];

  const pastDates = [
    new Date(now.getTime() - 2 * 24 * 60 * 60 * 1000),
    new Date(now.getTime() - 5 * 24 * 60 * 60 * 1000),
    new Date(now.getTime() - 8 * 24 * 60 * 60 * 1000),
    new Date(now.getTime() - 12 * 24 * 60 * 60 * 1000),
    new Date(now.getTime() - 15 * 24 * 60 * 60 * 1000),
  ];

  const upcomingDates = [
    new Date(now.getTime() + 1 * 24 * 60 * 60 * 1000),
    new Date(now.getTime() + 3 * 24 * 60 * 60 * 1000),
    new Date(now.getTime() + 5 * 24 * 60 * 60 * 1000),
    new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000),
  ];

  const timeSlots = ['09:00', '10:00', '11:00', '13:00', '14:00', '15:00', '16:00'];

  for (let i = 0; i < 15; i++) {
    const customer = customerUsers[i % customerUsers.length];
    const stylist = stylists[i % stylists.length];
    const service = services[i % services.length];
    const isPast = i < 10;
    const bookingDate = isPast 
      ? pastDates[i % pastDates.length] 
      : upcomingDates[i % upcomingDates.length];
    const startTime = timeSlots[i % timeSlots.length];
    const endMinutes = parseInt(startTime.split(':')[0]) * 60 + parseInt(startTime.split(':')[1]) + service.durationMinutes;
    const endTime = `${Math.floor(endMinutes / 60).toString().padStart(2, '0')}:${(endMinutes % 60).toString().padStart(2, '0')}`;
    
    const status = isPast 
      ? (i % 5 === 0 ? 'cancelled' : 'completed')
      : (i % 3 === 0 ? 'confirmed' : 'pending');

    const stylistUser = await User.findById(stylist.userId);
    
    const booking = {
      customerId: customer._id,
      stylistId: stylist._id,
      serviceId: service._id,
      bookingDate,
      startTime,
      endTime,
      status,
      totalPrice: service.basePrice,
      customerInfo: {
        name: customer.fullName,
        email: customer.email,
        phone: customer.phone,
      },
      stylistInfo: {
        name: stylistUser.fullName,
        profileImage: stylistUser.avatarUrl,
      },
      serviceInfo: {
        name: service.name,
        duration: service.durationMinutes,
      },
      notes: i % 3 === 0 ? 'First time visit' : undefined,
      cancelledAt: status === 'cancelled' ? new Date(bookingDate.getTime() - 24 * 60 * 60 * 1000) : undefined,
      cancellationReason: status === 'cancelled' ? 'Customer requested' : undefined,
    };

    const b = await Booking.create(booking);
    bookings.push(b);
  }

  console.log(`Created ${bookings.length} bookings`);
  return bookings;
}

async function seedReviews(bookings: any[], stylists: any[]) {
  const completedBookings = bookings.filter(b => b.status === 'completed');
  
  const reviewData = [
    { rating: 5, comment: 'Absolutely loved my hair! Alexandra did an amazing job on my balayage. Will definitely be back!' },
    { rating: 5, comment: 'Best salon experience ever. The team is so talented and professional.' },
    { rating: 4, comment: 'Great cut and styling. Very happy with the results.' },
    { rating: 5, comment: 'Sofia is amazing! She understood exactly what I wanted and delivered beyond expectations.' },
    { rating: 5, comment: 'James gave me the best fade I\'ve ever had. Highly recommend!' },
    { rating: 5, comment: 'Perfect bridal styling for my wedding. Got so many compliments!' },
    { rating: 4, comment: 'Great colour correction. My hair looks so much healthier now.' },
    { rating: 5, comment: 'The keratin treatment was worth every penny. My hair is so smooth!' },
    { rating: 5, comment: 'Excellent service from start to finish. Love this salon!' },
    { rating: 4, comment: 'Very professional and skilled stylists. Will return for more treatments.' },
  ];

  const createdReviews = [];
  for (let i = 0; i < Math.min(completedBookings.length, reviewData.length); i++) {
    const booking = completedBookings[i];
    const existingReview = await Review.findOne({ bookingId: booking._id });
    
    if (!existingReview) {
      const review = await Review.create({
        bookingId: booking._id,
        customerId: booking.customerId,
        stylistId: booking.stylistId,
        rating: reviewData[i].rating,
        comment: reviewData[i].comment,
      });
      createdReviews.push(review);
    }
  }

  await Stylist.updateMany(
    {},
    {
      $inc: { totalReviews: createdReviews.length },
      $set: { rating: 4.8 + Math.random() * 0.2 },
    }
  );

  console.log(`Created ${createdReviews.length} reviews`);
  return createdReviews;
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

  console.log('Created settings');
}

async function seed() {
  try {
    await connectDB();
    console.log('Connected to MongoDB');

    console.log('\n--- Seeding Users ---');
    const users = await seedUsers();

    console.log('\n--- Seeding Services ---');
    const services = await seedServices();

    console.log('\n--- Seeding Stylists ---');
    const stylists = await seedStylists(users, services);

    console.log('\n--- Seeding Availability ---');
    await seedAvailability(stylists);

    console.log('\n--- Seeding Bookings ---');
    const bookings = await seedBookings(users, stylists, services);

    console.log('\n--- Seeding Reviews ---');
    await seedReviews(bookings, stylists);

    console.log('\n--- Seeding Settings ---');
    await seedSettings();

    console.log('\n✅ Seed completed successfully!');
    console.log(`
Summary:
- ${users.length} users (1 admin, ${users.filter(u => u.role === 'stylist').length} stylists, ${users.filter(u => u.role === 'customer').length} customers)
- ${services.length} services
- ${stylists.length} stylists
- ${bookings.length} bookings
    `);
  } catch (error) {
    console.error('Seed error:', error);
  } finally {
    process.exit(0);
  }
}

seed();