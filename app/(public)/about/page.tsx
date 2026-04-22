import type { Metadata } from "next";
import { AboutHero } from "@/components/about/about-hero";
import { AboutTimeline } from "@/components/about/about-timeline";
import { AboutValues } from "@/components/about/about-values";
import { AboutTeam } from "@/components/about/about-team";

/* ─────────────────────────────────────────────────────────
   SEO Metadata — rendered as static HTML by Next.js
   (This file has NO "use client" — it is a Server Component)
───────────────────────────────────────────────────────── */
export const metadata: Metadata = {
  title: "About Us | Qwik Saloon London",
  description:
    "Discover the story behind Qwik Saloon. We are redefining the salon experience with uncompromising quality, deep care, inclusivity, and sustainable practices.",
  keywords: [
    "about Qwik Saloon",
    "salon philosophy",
    "sustainable salon London",
    "expert stylists London",
    "premium hair salon",
    "zero waste salon",
  ],
  openGraph: {
    title: "Our Story — Qwik Saloon",
    description:
      "A sanctuary where artistry meets precision. Founded on the belief that premium beauty should be frictionless, transparent, and eco-conscious.",
    url: "https://qwiksaloon.co.uk/about",
    siteName: "Qwik Saloon",
    images: [
      {
        url: "https://images.unsplash.com/photo-1542038380854-c923f7736e4b?q=80&w=1200&auto=format&fit=crop",
        width: 1200,
        height: 630,
        alt: "Qwik Saloon Team and Interior",
      },
    ],
    locale: "en_GB",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Our Story — Qwik Saloon",
    description:
      "Redefining the salon experience with uncompromising quality and sustainable practices. Meet the artisans.",
    images: [
      "https://images.unsplash.com/photo-1542038380854-c923f7736e4b?q=80&w=1200&auto=format&fit=crop",
    ],
  },
  alternates: {
    canonical: "https://qwiksaloon.co.uk/about",
  },
};

/* ─────────────────────────────────────────────────────────
   About Page — Server Component.
───────────────────────────────────────────────────────── */
export default function AboutPage() {
  return (
    <main className="flex flex-col bg-[#050507]">
      {/* 1. Cinematic Hero */}
      <AboutHero />

      {/* 2. Bento Grid Timeline & Story */}
      <AboutTimeline />

      {/* 3. Core Values Grid */}
      <AboutValues />

      {/* 4. Team Showcase */}
      <AboutTeam />
    </main>
  );
}