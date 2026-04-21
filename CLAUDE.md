@AGENTS.md


I need you to build a complete fullstack salon booking system using Next.js 16+ and MongoDB. 
I'll provide detailed requirements below. Build this step-by-step, asking for confirmation 
before moving to the next major section.

## PROJECT OVERVIEW
A unisex salon booking platform with three user roles: Customers, Stylists, and Admin. 
The system should follow 2026 design trends with modern UI/UX.

## TECH STACK (REQUIRED)
- **Framework:** Next.js 16+ (App Router)
- **Database:** MongoDB (MongoDB Atlas recommended)
- **ORM:** Mongoose (or Prisma with MongoDB)
- **Auth:** Clerk
- **Styling:** Tailwind CSS 
- **Animations:** Framer Motion
- **Forms:** React Hook Form + Zod validation
- **State Management:** Zustand or React Context
- **Date/Time:** date-fns
- **TypeScript:** Strict mode enabled
- **API Validation:** Zod for request/response validation

## DATABASE SCHEMA (MONGODB COLLECTIONS)

Create the following MongoDB collections with proper schemas using Mongoose:

### 1. users
Synced with Clerk - store extended user data:
```typescript
{
  _id: ObjectId,
  clerkId: String (unique, indexed), // Clerk user ID
  email: String (required, unique),
  fullName: String,
  phone: String (optional),
  role: Enum ['customer', 'stylist', 'admin'],
  avatarUrl: String (optional),
  createdAt: Date,
  updatedAt: Date
}
2. stylists
TypeScript

{
  _id: ObjectId,
  userId: ObjectId (ref: 'users', unique), // Reference to user
  bio: String (optional),
  specialties: [String], // Array of specialty tags
  yearsExperience: Number,
  profileImage: String (optional),
  portfolioImages: [String], // Array of image URLs
  isActive: Boolean (default: true),
  rating: Number (optional, calculated field),
  totalReviews: Number (default: 0),
  // Embedded services they offer
  services: [{
    serviceId: ObjectId (ref: 'services'),
    customPrice: Number (optional), // Override base price
    isAvailable: Boolean (default: true)
  }],
  createdAt: Date,
  updatedAt: Date
}
3. services
TypeScript

{
  _id: ObjectId,
  name: String (required),
  description: String,
  category: Enum ['haircut', 'coloring', 'treatment', 'styling', 'other'],
  durationMinutes: Number (required),
  basePrice: Number (required),
  imageUrl: String (optional),
  isActive: Boolean (default: true),
  createdAt: Date,
  updatedAt: Date
}
4. availability_templates
Weekly recurring schedules:

TypeScript

{
  _id: ObjectId,
  stylistId: ObjectId (ref: 'stylists', indexed),
  schedules: [{ // Array of weekly schedules
    dayOfWeek: Number (0-6, 0=Sunday),
    startTime: String (format: "HH:mm"),
    endTime: String (format: "HH:mm"),
    isAvailable: Boolean (default: true)
  }],
  createdAt: Date,
  updatedAt: Date
}
// Compound index on (stylistId, dayOfWeek)
5. availability_exceptions
Specific date overrides:

TypeScript

{
  _id: ObjectId,
  stylistId: ObjectId (ref: 'stylists', indexed),
  date: Date (indexed),
  startTime: String (format: "HH:mm", optional),
  endTime: String (format: "HH:mm", optional),
  isAvailable: Boolean, // false for day off, true for special hours
  reason: String (optional),
  createdAt: Date
}
// Compound index on (stylistId, date)
6. bookings
TypeScript

{
  _id: ObjectId,
  customerId: ObjectId (ref: 'users', indexed),
  stylistId: ObjectId (ref: 'stylists', indexed),
  serviceId: ObjectId (ref: 'services'),
  bookingDate: Date (indexed),
  startTime: String (format: "HH:mm"),
  endTime: String (format: "HH:mm"),
  status: Enum ['pending', 'confirmed', 'completed', 'cancelled', 'no_show'],
  totalPrice: Number,
  notes: String (optional),
  cancellationReason: String (optional),
  cancelledAt: Date (optional),
  // Embedded customer & stylist info for faster queries
  customerInfo: {
    name: String,
    email: String,
    phone: String
  },
  stylistInfo: {
    name: String,
    profileImage: String
  },
  serviceInfo: {
    name: String,
    duration: Number
  },
  createdAt: Date,
  updatedAt: Date
}
// Compound index on (stylistId, bookingDate, startTime) for overlap prevention
// Index on (customerId, bookingDate) for customer queries
7. reviews (optional for MVP, but include in schema)
TypeScript

{
  _id: ObjectId,
  bookingId: ObjectId (ref: 'bookings', unique),
  customerId: ObjectId (ref: 'users'),
  stylistId: ObjectId (ref: 'stylists', indexed),
  rating: Number (1-5, required),
  comment: String (optional),
  createdAt: Date
}
8. settings (app-wide configuration)
TypeScript

{
  _id: ObjectId,
  key: String (unique), // e.g., 'business_hours', 'booking_window'
  value: Mixed, // JSON value
  description: String,
  updatedAt: Date
}
MONGODB INDEXES
Create these indexes for performance:

users: { clerkId: 1 } (unique), { email: 1 } (unique)
stylists: { userId: 1 } (unique), { isActive: 1 }
bookings: { stylistId: 1, bookingDate: 1, startTime: 1 }, { customerId: 1, bookingDate: -1 }
availability_templates: { stylistId: 1, 'schedules.dayOfWeek': 1 }
availability_exceptions: { stylistId: 1, date: 1 }
AUTHORIZATION STRATEGY
Since MongoDB doesn't have Row Level Security like PostgreSQL, implement authorization in your API layer:

Middleware/Helper Functions:
TypeScript

// Authorization checks in API routes/Server Actions
- requireAuth() - ensure user is authenticated via Clerk
- requireRole(role) - check user has required role
- requireOwnership(resourceId, userId) - ensure user owns resource
- requireStylistAccess(stylistId, userId) - ensure user is the stylist
Authorization Rules:
Customers: Can only read/write their own bookings and profile
Stylists: Can read/write their own profile, availability, and assigned bookings
Admin: Full access to all resources
Public: Can read services and active stylists (for booking flow)
CLERK AUTHENTICATION SETUP
1. Clerk Configuration:
Sign up at clerk.com
Create new application
Enable email/password authentication
Enable Google OAuth (optional)
Set up custom claims for user roles
2. Clerk Metadata for Roles:
Store user role in Clerk's publicMetadata:

TypeScript

{
  publicMetadata: {
    role: 'customer' | 'stylist' | 'admin',
    onboardingComplete: boolean
  }
}
3. Webhook for User Sync:
Set up Clerk webhook to sync user creation to MongoDB
On user.created event, create user document in MongoDB
On user.updated event, sync changes to MongoDB
4. Middleware Protection:
Use Clerk's middleware to protect routes:

/dashboard/customer/* - require customer or admin role
/dashboard/stylist/* - require stylist or admin role
/dashboard/admin/* - require admin role
/api/* - protect API routes
CORE FEATURES & FUNCTIONALITY
A. AUTHENTICATION & AUTHORIZATION
Sign Up Flow:

Clerk sign-up form
After sign-up, show role selection page
Update Clerk metadata with role
Create user document in MongoDB
Redirect to appropriate dashboard
Sign In:

Clerk sign-in form
Check role from metadata
Redirect based on role
User Profile:

Display from Clerk + MongoDB data
Update profile (sync to both Clerk and MongoDB)
Protected Routes:

Use Clerk middleware for route protection
Role-based access control
Redirect unauthorized users
B. CUSTOMER FEATURES
Home Page:

Hero section with booking CTA
Featured stylists (from MongoDB)
Popular services
Testimonials
Stats (clients served, years in business, etc.)
Services Page:

Display all services from MongoDB
Filter by category
Show price, duration
"Book Now" button
Stylists Page:

Grid of stylist cards (aggregate data from stylists + users)
Filter by specialty
View stylist profile (bio, portfolio, reviews)
See services they offer
Booking Flow:

Step 1: Select service
Step 2: Choose stylist (or "first available")
Step 3: Pick date & time (query available slots)
Step 4: Confirm details & book
Real-time slot availability checking
Prevent double-booking with MongoDB transactions
Customer Dashboard:

View upcoming bookings (query with customerId)
View past bookings
Cancel/reschedule (with restrictions)
Favorite stylists (store in user document)
Profile management
About Page:

Salon story
Team introduction
Values/mission
Contact Page:

Contact form
Salon location (map)
Hours, phone, email
Blog Page (optional for MVP):

List of articles (separate collection if implemented)
Individual article view
C. STYLIST FEATURES
Stylist Dashboard:

Today's schedule (query bookings for today)
Upcoming appointments (calendar view)
Quick stats (aggregate bookings, calculate earnings)
Recent bookings
Availability Management:

Set weekly recurring schedule (update availability_templates)
Add exceptions (insert availability_exceptions)
Block specific time slots
Calendar interface for easy visualization
Appointments:

View appointment details (populate customer & service data)
Mark as completed/no-show (update booking status)
View customer notes
Profile Management:

Edit bio, specialties
Upload portfolio images (user Uploadthing)
Manage services offered (update embedded services array)
Set custom pricing per service
D. ADMIN FEATURES
Admin Dashboard:

Overview metrics (aggregate bookings, calculate revenue)
Charts (bookings over time, popular services)
Recent activity feed (query recent bookings)
Quick actions
Stylist Management:

View all stylists (with populated user data)
Add/edit/deactivate stylists
Assign services to stylists
View stylist performance (aggregate bookings & reviews)
Service Management:

CRUD operations for services
Set pricing and duration
Categorize services
Booking Management:

View all bookings (with pagination)
Filter by status, date, stylist
Manual booking creation
Cancel/modify bookings
Customer Management:

View all customers
View customer booking history (aggregate)
Customer analytics
TECHNICAL REQUIREMENTS
1. MongoDB Connection
Use MongoDB Atlas (cloud) or local MongoDB
Connection pooling with Mongoose
Error handling for connection issues
Environment variable for connection string
2. Time Slot Generation Logic
Algorithm to generate available slots:

TypeScript

async function getAvailableSlots(stylistId, date, serviceDuration) {
  // 1. Get stylist's template for that day of week
  // 2. Get any exceptions for that specific date
  // 3. Get all existing bookings for that stylist on that date
  // 4. Generate time slots based on service duration
  // 5. Filter out booked slots
  // 6. Return available slots
}
Use MongoDB aggregation pipeline for complex queries
Prevent overlapping bookings with unique indexes
Use MongoDB transactions for booking creation
Handle timezone properly (store UTC, display local)
3. Prevent Double Booking
TypeScript

// Use MongoDB transactions
const session = await mongoose.startSession();
session.startTransaction();
try {
  // Check if slot is still available
  // Create booking
  // Commit transaction
} catch (error) {
  // Rollback
  await session.abortTransaction();
}
4. Clerk Integration
Install @clerk/nextjs
Wrap app with <ClerkProvider>
Use auth() in Server Components
Use useAuth() in Client Components
Use useUser() for user data
Implement webhook handler for user sync
5. Form Validation
Client-side validation with Zod
Server-side validation in API routes
Proper error handling and user feedback
6. Error Handling
Try-catch blocks in server actions and API routes
User-friendly error messages
Loading states for all async operations
Toast notifications for success/error
7. Performance
Server components where possible
Client components only when needed (interactivity)
Optimize images (next/image)
MongoDB query optimization (use indexes, projection)
Implement pagination for large lists
Cache frequently accessed data (React cache, Next.js cache)
8. File Uploads
Use Uploadthing for image uploads
Store URLs in MongoDB
Optimize images before upload
9. Accessibility
Semantic HTML
ARIA labels where needed
Keyboard navigation
Focus management
Color contrast compliance
DESIGN REQUIREMENTS (2026 Trends)
Visual Style:
Modern & Clean: Generous whitespace, clear hierarchy
Glassmorphism: For modals, cards (subtle)
Smooth Animations: Page transitions, hover effects, micro-interactions
Bold Typography: Large headings, clear readability
Dark Mode: Implement toggle with system preference detection
Gradients: Subtle ambient backgrounds
Bento Grid: For dashboard layouts
Color Palette Suggestion:
Primary: Choose a sophisticated color (deep purple, sage green, or modern neutral)
Secondary: Complementary accent
Neutral: Grays for text and backgrounds
Success/Error/Warning: Standard semantic colors
Component Library:

Button, Input, Select, Textarea
Dialog, Sheet (for mobile menus)
Calendar, Popover
Card, Badge, Avatar
Dropdown Menu
Tabs, Accordion
Toast notifications
Form components
Animations:
Page transitions (Framer Motion)
Card hover effects
Button interactions
Loading skeletons (not spinners)
Smooth scrolling
Stagger animations for lists
PROJECT STRUCTURE
text

/app
  /(auth)
    /sign-in
    /sign-up
    /onboarding (role selection after sign-up)
  /(public)
    /page.tsx (home)
    /about
    /services
    /stylists
    /contact
    /blog
  /booking
    /[step]
  /(dashboard)
    /customer
    /stylist
    /admin
  /api
    /webhooks
      /clerk (user sync webhook)
    /bookings
    /services
    /stylists
    /availability

/components
  /ui (shadcn components)
  /shared (reusable components)
  /customer
  /stylist
  /admin
  /booking

/lib
  /mongodb (connection and models)
  /clerk (auth helpers)
  /utils
  /validations (zod schemas)
  /constants

/models (Mongoose schemas)
  /User.ts
  /Stylist.ts
  /Service.ts
  /Booking.ts
  /AvailabilityTemplate.ts
  /AvailabilityException.ts
  /Review.ts

/hooks
  (custom React hooks)

/types
  (TypeScript types/interfaces)

/store
  (Zustand stores if used)

/actions (Server Actions)
  /booking-actions.ts
  /stylist-actions.ts
  /user-actions.ts
STEP-BY-STEP BUILD PROCESS
Please build this in the following order, waiting for my approval before moving to the next step:

Phase 1: Foundation

Project setup (Next.js, Tailwind, TypeScript, dependencies)
MongoDB connection setup (Mongoose models)
Clerk authentication setup (sign up, sign in, middleware)
Clerk webhook for user sync to MongoDB
Role selection onboarding flow
Basic layouts (root, dashboard, public)
Authorization helpers (requireRole, requireAuth)
Phase 2: Core Booking Logic
9. Service management (admin CRUD with MongoDB)
10. Stylist profiles and services (MongoDB operations)
11. Availability system (templates + exceptions in MongoDB)
12. Time slot generation algorithm (MongoDB queries)
13. Booking creation flow with MongoDB transactions
14. Double-booking prevention

Phase 3: Customer Features
15. Public pages (home, about, services, stylists, contact)
16. Booking wizard (multi-step form)
17. Customer dashboard (MongoDB queries with Clerk user)
18. Booking management (cancel, reschedule)

Phase 4: Stylist Portal
19. Stylist dashboard (aggregated booking data)
20. Availability management UI (CRUD for templates/exceptions)
21. Appointment management
22. Profile customization (update MongoDB + file upload)

Phase 5: Admin Portal
23. Admin dashboard with metrics (MongoDB aggregation)
24. Stylist management (CRUD operations)
25. Service management (CRUD operations)
26. Booking oversight (queries with filters)

Phase 6: Polish
27. Animations and transitions (Framer Motion)
28. Dark mode implementation
29. Responsive design refinement
30. Error handling and edge cases
31. Performance optimization (query optimization, caching)
32. Testing authorization flows

ADDITIONAL REQUIREMENTS
Mobile-First: Design for mobile, enhance for desktop
SEO: Proper meta tags, semantic HTML
Environment Variables: Proper .env setup
text

MONGODB_URI=
CLERK_SECRET_KEY=
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
CLERK_WEBHOOK_SECRET=
UPLOADTHING_SECRET= (or Cloudinary credentials)
Type Safety: Proper TypeScript types for all MongoDB models
Comments: Add comments for complex logic
README: Include setup instructions
BUSINESS LOGIC RULES
Booking Window: Customers can book 1-60 days in advance
Cancellation: Allow cancellation up to 24 hours before appointment
Slot Duration: Slots based on service duration (30, 45, 60, 90, 120 min)
Buffer Time: Optional 15-min buffer between appointments (configurable)
Business Hours: Configurable salon opening hours (stored in settings collection)
Overlap Prevention: MongoDB unique index + transaction handling
MONGOOSE SCHEMA EXAMPLES
Provide schemas with:

Proper TypeScript types
Virtual fields (e.g., computed rating)
Instance methods (e.g., stylist.getAvailableSlots())
Static methods (e.g., Booking.findOverlapping())
Pre/post hooks (e.g., update stylist rating after review)
Indexes for performance
CLERK WEBHOOK HANDLER EXAMPLE
TypeScript

// app/api/webhooks/clerk/route.ts
// Handle user.created and user.updated events
// Verify webhook signature
// Sync user data to MongoDB
QUESTIONS TO ANSWER BEFORE STARTING
Before you begin coding, please ask me these clarifications:

Do you want payment integration (Stripe) in MVP?
Should customers require account or allow guest booking?
Email notifications needed? (If yes, which service: Resend, SendGrid?)
SMS notifications? (Twilio?)
Single salon location or multi-location support?
Specific brand colors or should I choose?
File upload service preference: Uploadthing or Cloudinary?
Any specific business hours or should I use defaults (9 AM - 7 PM)?
MongoDB Atlas (cloud) or local MongoDB for development?
DELIVERABLES
For each phase, provide:

Complete, working code
Mongoose models with proper TypeScript types
Brief explanation of what was built
Any important decisions made
Instructions to test the feature
Any known limitations or future improvements
Start with Phase 1 and wait for my confirmation before proceeding to Phase 2.
everything about this project is in the uk not nigeria so follow United Kingdom standard



2026 Design Trends to Consider
Bento grid layouts for dashboard
Glassmorphism for cards/modals
Micro-interactions and smooth animations (Framer Motion)
3D elements sparingly (Three.js/Spline)
Large typography with creative fonts
Immersive gradients and color transitions
Dark mode as default with light option
Voice/AI assistance for booking (optional advanced feature)
Spatial design - depth, shadows, layering
For Admin Dashboard:
"salon admin dashboard"
"booking system dashboard 2024/2025"
"appointment management UI"
"analytics dashboard dark mode"
"admin panel bento grid"
What to look for:

Bento grid layouts with different sized cards
Data visualization - charts showing bookings, revenue, peak hours
Quick action buttons - approve bookings, manage staff
Real-time indicators - live booking notifications
Color-coded calendar views
For Stylist Dashboard:
"stylist dashboard"
"calendar scheduling app"
"availability management UI"
"service provider dashboard"
"appointment calendar design"
What to look for:

Week/day view calendar as primary focus
Toggle switches for availability
Earning summaries - today, week, month
Upcoming appointments list view
Profile completion prompts
Client history quick access
For Customer Dashboard:
"booking app dashboard"
"user appointment dashboard"
"customer portal UI"
"my bookings page"
"salon app profile"
What to look for:

Upcoming appointments with countdown timers
Quick rebook button for repeat services
Favorite stylists saved section
Booking history with photos
Loyalty points/rewards display
One-tap cancel/reschedule
Design Concepts by Page
1. Home Page
Dribbble searches:

"salon website hero"
"beauty spa landing page"
"booking platform homepage"
"modern service landing"
2026 Design Elements:

Hero Section:

Full-screen video/image carousel of salon work
Floating "Book Now" CTA with glassmorphism
Subtle parallax scrolling
Large, bold typography (80-120px headings)
Social Proof Section:

Animated counter (1000+ happy clients)
Floating testimonial cards with profile images
Star ratings with micro-animations
Featured Stylists:

3D card hover effects
Stylist photos with gradient overlays
Specialty tags (Color Expert, Bridal, etc.)
Quick Booking Widget:

Sticky floating button
Progressive disclosure form
Smart defaults based on time of day
Color Palette Ideas:

Luxe: Deep purples, gold accents, black
Modern: Sage green, beige, cream, terracotta
Bold: Fuchsia, electric blue, white
Minimal: Black, white, single accent color
2. About Page
Dribbble searches:

"about us page design"
"salon story page"
"team page creative"
"brand story layout"
Key Sections:

Our Story: Timeline design with scroll animations
Meet the Team: Grid of stylists with hover reveal bios
Values/Mission: Icon-based cards with subtle animations
Salon Tour: 360° photos or image gallery with lightbox
Awards/Certifications: Badge display
Modern Touches:

Behind-the-scenes video integration
Founder's message with signature animation
Before/after slider showcasing transformations
Sustainability/inclusivity statement (important in 2026!)
3. Services Page
Dribbble searches:

"service menu design"
"pricing table creative"
"salon services page"
"beauty treatment menu"
Layout Options:

Option A - Card Grid:

Each service as an animated card
Hover reveals pricing, duration
"Book This" CTA on each card
Filter by category (Hair, Color, Treatment, etc.)
Option B - Split Screen:

Service list on left
Large imagery on right that changes on hover
Sticky pricing sidebar
Option C - Accordion/Tabs:

Categories as tabs
Expand to see service details
Compare services side-by-side
Must-Have Info Per Service:

Duration (45 min, 90 min, etc.)
Price range or starting at price
Who it's for (all hair types, curly hair, etc.)
What's included
Stylist recommendations
2026 Features:

AI Recommendation Quiz: "Find your perfect service"
AR Try-On: Hair color preview (advanced)
Video demos of each service
Add-ons builder: Build your custom package
4. Blog Page
Dribbble searches:

"blog layout minimal"
"magazine style blog"
"article grid design"
"content hub UI"
Layout Ideas:

Hero Featured Post:

Large image, category tag
Read time estimate
Author info with avatar
Post Grid:

Masonry or standard grid
Category color coding
Save for later functionality
Social share count
Categories:

Hair Care Tips
Style Trends
Stylist Spotlights
Behind the Scenes
Client Transformations
Modern Blog Features:

Table of contents for long posts (sticky sidebar)
Related posts with smart recommendations
Comment section with reactions (not just text)
Newsletter signup with inline forms
Reading progress indicator
Dark mode optimized reading experience
5. Contact Page
Dribbble searches:

"contact page design"
"location page UI"
"get in touch creative"
"contact form modern"
Essential Elements:

Split Layout:

Left: Contact form

Name, Email, Phone
Subject dropdown
Message
Preferred contact method
Best time to reach
Right: Information

Address with embedded map
Phone (click to call)
Email (click to email)
Social media links
Business hours
Enhanced Features:

Live chat widget (Intercom style)
FAQ accordion above form
"Or Book Directly" CTA linking to booking flow
Visit us section: Parking info, public transport
3D map or illustrated location marker
Micro-interactions:

Form field validation with smooth animations
Success state with confetti animation
Auto-fill detection
Keyboard shortcuts
Consistent Design System Across All Pages
Navigation:
Transparent header that fills on scroll
Mega menu for services
User avatar with dropdown (if logged in)
Shopping bag icon for cart (if selling products)
Footer:
Chunky footer with multiple columns
Quick links
Services
Recent blog posts
Newsletter signup
Social proof (reviews)
Back to top button with smooth scroll
Universal Components:
Booking CTA - always accessible (sticky or floating)
Testimonial ticker - rotating reviews
Trust badges - licensed, insured, verified
Loading states - skeleton screens, not spinners
Empty states - illustrated, helpful
cann you make sure each pages follows these