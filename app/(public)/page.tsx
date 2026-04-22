import type { Metadata } from "next";
import { HeroSection } from "@/components/home/hero-section";
import { MarqueeTicker } from "@/components/home/marquee-ticker";
import { StatsSection } from "@/components/home/stats-section";
import { ServicesSection } from "@/components/home/services-section";
import { StylistsSection } from "@/components/home/stylists-section";
import { TestimonialsSection } from "@/components/home/testimonials-section";
import { CtaSection } from "@/components/home/cta-section";

/* ─────────────────────────────────────────────────────────
   SEO Metadata — rendered as static HTML by Next.js
   (This file has NO "use client" — it is a Server Component)
───────────────────────────────────────────────────────── */
export const metadata: Metadata = {
  title: "Qwik Saloon | London's Premier Hair Salon — Book Online",
  description:
    "Award-winning hair salon in London offering precision cuts, balayage, colour, and advanced hair treatments. Book your appointment online in seconds. Zero wait times, expert stylists.",
  keywords: [
    "hair salon London",
    "book hair appointment online",
    "balayage London",
    "precision haircut",
    "colour specialist",
    "luxury salon",
    "qwik saloon",
  ],
  openGraph: {
    title: "Qwik Saloon — Where Hair Becomes Art",
    description:
      "Hyper-modern hair salon with frictionless online booking. Precision cuts, luminous colour, and molecular repair treatments from London's finest stylists.",
    url: "https://qwiksaloon.co.uk",
    siteName: "Qwik Saloon",
    images: [
      {
        url: "https://images.unsplash.com/photo-1562322140-8baeececf3df?q=80&w=1200&auto=format&fit=crop",
        width: 1200,
        height: 630,
        alt: "Qwik Saloon — London's Premier Hair Salon",
      },
    ],
    locale: "en_GB",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Qwik Saloon — Where Hair Becomes Art",
    description:
      "Award-winning hair salon with frictionless online booking. Precision cuts, colour & treatments from London's finest stylists.",
    images: [
      "https://images.unsplash.com/photo-1562322140-8baeececf3df?q=80&w=1200&auto=format&fit=crop",
    ],
  },
  alternates: {
    canonical: "https://qwiksaloon.co.uk",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function HomePage() {
  return (
    <main className="flex flex-col bg-[#050507]">
      <HeroSection />

      <MarqueeTicker />

      <StatsSection />

      <ServicesSection />

      <StylistsSection />

      <TestimonialsSection />
      <CtaSection />
    </main>
  );
}
