import type { Metadata } from "next";
import { connectDB } from "@/lib/mongodb/connection";
import { Service } from "@/models";
import { ServicesHero } from "@/components/services/services-hero";
import {
  ServicesGrid,
  type SerializedService,
} from "@/components/services/services-grid";

export const metadata: Metadata = {
  title: "Services & Treatments | Qwik Saloon London",
  description:
    "Browse our full menu of premium hair services — precision cuts, balayage, colour, keratin treatments, bridal styling and more. Transparent pricing, no hidden fees. Book online instantly.",
  keywords: [
    "salon services London",
    "hair treatment menu",
    "balayage price London",
    "precision haircut booking",
    "keratin treatment",
    "bridal hair styling London",
    "salon price list",
    "qwik saloon services",
  ],
  openGraph: {
    title: "Services & Pricing — Qwik Saloon London",
    description:
      "Explore Qwik Saloon's curated treatments with transparent pricing and instant online booking. Precision cuts, luminous colour, molecular repair and more.",
    url: "https://qwiksaloon.co.uk/services",
    siteName: "Qwik Saloon",
    images: [
      {
        url: "https://images.unsplash.com/photo-1560066984-138dadb4c035?q=80&w=1200&auto=format&fit=crop",
        width: 1200,
        height: 630,
        alt: "Qwik Saloon Hair Services",
      },
    ],
    locale: "en_GB",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Services & Pricing — Qwik Saloon",
    description:
      "Premium hair services with transparent pricing. Precision cuts from £45, colour from £85, treatments from £60. Book online.",
    images: [
      "https://images.unsplash.com/photo-1560066984-138dadb4c035?q=80&w=1200&auto=format&fit=crop",
    ],
  },
  alternates: {
    canonical: "https://qwiksaloon.co.uk/services",
  },
};

/* ─────────────────────────────────────────────────────────
   Server Component — fetches from MongoDB, serialises,
   and passes clean data to client components.
   Wrapped in try-catch so a DB outage doesn't crash the page.
───────────────────────────────────────────────────────── */
export default async function ServicesPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string }>;
}) {
  const params = await searchParams;

  let services: SerializedService[] = [];

  try {
    await connectDB();

    // Build query filter
    const filter: Record<string, unknown> = { isActive: true };
    if (params.category) filter.category = params.category;

    // Fetch from DB — .lean() returns plain JS objects (no Mongoose overhead)
    const rawServices = await Service.find(filter)
      .sort({ category: 1, name: 1 })
      .lean();

    // Serialize to plain JSON-safe objects for the client boundary
    services = rawServices.map((doc) => ({
      _id: String(doc._id),
      name: doc.name,
      description: doc.description,
      category: doc.category,
      durationMinutes: doc.durationMinutes,
      basePrice: doc.basePrice,
      imageUrl: doc.imageUrl,
    }));
  } catch (error) {
    // Log on server, render graceful fallback on client
    console.error("[ServicesPage] Failed to fetch services:", error);
  }

  return (
    <main className="min-h-screen bg-[#050507]">
      {/* 1. Animated hero heading */}
      <ServicesHero />

      {/* 2. Interactive filtered service grid */}
      <ServicesGrid
        services={services}
        activeCategory={params.category || null}
      />
    </main>
  );
}