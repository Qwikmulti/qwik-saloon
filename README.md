# Qwik Salon - Premium Unisex Salon Booking Platform

A modern full-stack salon booking system built with Next.js 16+, MongoDB, and Clerk authentication.

## Features

### Customer Features
- Browse services with categories
- View stylist profiles
- 4-step booking wizard
- View/manage bookings
- Cancel appointments

### Stylist Features
- Dashboard with earnings
- Weekly schedule view
- Appointment management
- Availability templates
- Exception dates (holidays)
- Profile customization

### Admin Features
- Analytics dashboard
- Booking oversight
- Service management (CRUD)
- Stylist management

## Tech Stack

- **Framework**: Next.js 16+ (App Router)
- **Database**: MongoDB with Mongoose
- **Auth**: Clerk Authentication
- **Styling**: Tailwind CSS v4
- **Animations**: Framer Motion
- **Forms**: React Hook Form + Zod
- **State**: Zustand
- **TypeScript**: Strict mode

## Getting Started

### Prerequisites

- Node.js 18+
- MongoDB Atlas account
- Clerk account

### Environment Variables

Create a `.env` file with:

```env
# MongoDB
MONGODB_URI=mongodb+srv://your-cluster-url

# Clerk
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_xxx
CLERK_SECRET_KEY=sk_test_xxx
CLERK_WEBHOOK_SECRET=whsec_xxx

# Uploadthing
UPLOADTHING_TOKEN=your-token
```

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

Visit http://localhost:3000

### Seed Data

```bash
npx ts-node lib/seed.ts
```

## Project Structure

```
├── app/                    # Next.js App Router
│   ├── (auth)/            # Authentication pages
│   ├── (public)/           # Public pages
│   ├── (dashboard)/        # Dashboard pages
│   ├── booking/            # Booking wizard
│   └── api/                # API routes
├── components/             # React components
│   ├── ui/                # Base UI components
│   └── shared/             # Shared components
├── lib/                   # Utilities
├── models/                 # Mongoose models
├── actions/               # Server actions
└── store/                 # Zustand stores
```

## Database Collections

- `users` - User profiles
- `stylists` - Stylist data
- `services` - Service offerings
- `bookings` - Appointments
- `availability_templates` - Weekly schedules
- `availability_exceptions` - Date overrides
- `reviews` - Client reviews
- `settings` - App configuration

## API Routes

### Public
- `GET /api/services` - List services
- `GET /api/stylists` - List stylists
- `GET /api/availability` - Get time slots

### Booking
- `POST /api/bookings` - Create booking
- `POST /api/bookings/[id]/cancel` - Cancel booking

### Stylist
- `GET /api/stylist/bookings` - Get stylist bookings
- `PATCH /api/stylist/bookings/[id]/status` - Update status
- `GET/POST /api/stylist/availability` - Manage availability
- `GET/PATCH /api/stylist/profile` - Manage profile

### Admin
- `GET /api/admin/analytics` - Dashboard stats
- `GET /api/admin/bookings` - All bookings
- `GET/POST /api/admin/services` - Manage services
- `GET /api/admin/stylists` - Manage stylists

## Design

- Dark mode default with violet/fuchsia accents
- Glassmorphism effects
- Smooth animations with Framer Motion
- Bento grid layouts
- 2026 design trends

## Business Rules

- Booking window: 1-60 days in advance
- Cancellation: 24 hours before
- Business hours: 9 AM - 7 PM
- Slot intervals: 30 minutes

## License

MIT