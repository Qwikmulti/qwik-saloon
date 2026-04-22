<!-- BEGIN:nextjs-agent-rules -->
# Next.js Agent Rules

This project uses Next.js 16 with breaking changes. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code.
<!-- END:nextjs-agent-rules -->

# Project Overview

Qwik Salon is a full-stack salon booking platform with:
- Three user roles: Customer, Stylist, Admin
- MongoDB database with Mongoose ODM
- Clerk authentication
- 2026 design with dark mode, glassmorphism, Framer Motion

# Tech Stack

- Next.js 16+ (App Router)
- MongoDB + Mongoose
- Clerk Auth
- Tailwind CSS v4
- Framer Motion
- Zustand
- Zod validation
- date-fns

# Key Directories

- `app/` - Next.js routes and pages
- `app/(public)/` - Public pages (home, services, stylists, about, contact)
- `app/(dashboard)/` - Dashboard pages (customer, stylist, admin)
- `app/(auth)/` - Auth pages (sign-in, sign-up, onboarding)
- `app/api/` - API routes
- `components/ui/` - Base UI components
- `models/` - Mongoose schemas
- `actions/` - Server actions
- `lib/` - Utilities and helpers

# Database Collections

1. `users` - User profiles synced with Clerk
2. `stylists` - Stylist data with services
3. `services` - Service offerings
4. `bookings` - Appointments
5. `availability_templates` - Weekly schedules
6. `availability_exceptions` - Date overrides
7. `reviews` - Client reviews
8. `settings` - App configuration

# Environment Variables Required

```
MONGODB_URI=mongodb+srv://...
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_...
CLERK_SECRET_KEY=sk_test_...
CLERK_WEBHOOK_SECRET=whsec_...
UPLOADTHING_TOKEN=...
```

# Running the Project

```bash
npm install
npm run dev
npm run build
```

# Seed Data

Run seed script to populate services:
```bash
npx ts-node lib/seed.ts
```

# Design System

- Dark mode default (#0a0a0b background)
- Violet/Fuchsia accent colors
- Space Grotesk + Inter fonts
- Glassmorphism with backdrop-blur
- Bento grid layouts
- 2026 trends