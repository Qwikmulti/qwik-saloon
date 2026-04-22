'use client';

import { motion } from 'framer-motion';

export function Skeleton({ className = '' }: { className?: string }) {
  return (
    <div className={`animate-pulse rounded-lg bg-white/5 ${className}`} />
  );
}

export function CardSkeleton() {
  return (
    <div className="rounded-2xl border border-white/5 bg-[#131316] p-6">
      <Skeleton className="h-12 w-12 mb-4" />
      <Skeleton className="h-6 w-3/4 mb-2" />
      <Skeleton className="h-4 w-1/2 mb-4" />
      <Skeleton className="h-10 w-full" />
    </div>
  );
}

export function TableRowSkeleton() {
  return (
    <div className="flex items-center gap-4 border-b border-white/5 p-4">
      <Skeleton className="h-10 w-10 rounded-full" />
      <div className="flex-1 space-y-2">
        <Skeleton className="h-4 w-1/3" />
        <Skeleton className="h-3 w-1/4" />
      </div>
      <Skeleton className="h-6 w-20" />
      <Skeleton className="h-6 w-16" />
    </div>
  );
}

export function BookingCardSkeleton() {
  return (
    <div className="rounded-2xl border border-white/5 bg-[#131316] p-6">
      <div className="flex items-start justify-between mb-4">
        <Skeleton className="h-6 w-24" />
        <Skeleton className="h-6 w-20" />
      </div>
      <Skeleton className="h-5 w-1/2 mb-2" />
      <Skeleton className="h-4 w-1/3 mb-4" />
      <div className="flex gap-4">
        <Skeleton className="h-4 w-24" />
        <Skeleton className="h-4 w-20" />
      </div>
    </div>
  );
}

export function StylistCardSkeleton() {
  return (
    <div className="rounded-2xl border border-white/5 bg-[#131316] p-6">
      <div className="flex items-center gap-4 mb-4">
        <Skeleton className="h-20 w-20 rounded-full" />
        <div className="space-y-2">
          <Skeleton className="h-5 w-32" />
          <Skeleton className="h-4 w-24" />
        </div>
      </div>
      <Skeleton className="h-4 w-full mb-2" />
      <Skeleton className="h-4 w-2/3 mb-4" />
      <div className="flex gap-2 mb-4">
        <Skeleton className="h-6 w-16 rounded-full" />
        <Skeleton className="h-6 w-20 rounded-full" />
      </div>
      <Skeleton className="h-10 w-full" />
    </div>
  );
}

export function StatCardSkeleton() {
  return (
    <div className="rounded-2xl border border-white/5 bg-[#131316] p-6">
      <div className="flex items-start justify-between mb-4">
        <Skeleton className="h-12 w-12 rounded-xl" />
        <Skeleton className="h-6 w-12" />
      </div>
      <Skeleton className="h-8 w-24 mb-2" />
      <Skeleton className="h-4 w-16" />
    </div>
  );
}

export function ServiceCardSkeleton() {
  return (
    <div className="rounded-2xl border border-white/5 bg-[#131316] p-6">
      <div className="flex items-start justify-between mb-4">
        <Skeleton className="h-6 w-32" />
        <Skeleton className="h-8 w-20" />
      </div>
      <Skeleton className="h-4 w-full mb-2" />
      <Skeleton className="h-4 w-2/3 mb-4" />
      <Skeleton className="h-10 w-full" />
    </div>
  );
}

export function CalendarDaySkeleton() {
  return (
    <div className="rounded-xl border border-white/5 bg-white/5 p-4">
      <Skeleton className="h-4 w-12 mb-2" />
      <Skeleton className="h-8 w-8 mx-auto mb-2" />
      <Skeleton className="h-3 w-16 mx-auto" />
    </div>
  );
}