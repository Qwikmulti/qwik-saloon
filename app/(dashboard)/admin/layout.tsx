'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { SignedIn, SignedOut, UserButton } from '@clerk/nextjs';
import { Calendar, Clock, Settings, Home, Users, Scissors, BarChart3, Bell } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const navItems = [
    { href: '/admin', label: 'Dashboard', icon: Home },
    { href: '/admin/bookings', label: 'Bookings', icon: Calendar },
    { href: '/admin/stylists', label: 'Stylists', icon: Users },
    { href: '/admin/services', label: 'Services', icon: Scissors },
    { href: '/admin/analytics', label: 'Analytics', icon: BarChart3 },
  ];

  return (
    <div className="flex min-h-screen bg-[#0a0a0b]">
      <motion.aside
        initial={{ x: -100 }}
        animate={{ x: 0 }}
        className="fixed inset-y-0 left-0 z-40 w-72 border-r border-white/5 bg-[#0a0a0b] pt-20"
      >
        <div className="flex h-full flex-col">
          <div className="px-6 py-4">
            <div className="mb-6 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-violet-600 to-fuchsia-600">
                <Scissors className="h-5 w-5 text-white" />
              </div>
              <span className="font-display font-bold">Admin Panel</span>
            </div>
            <nav className="space-y-1">
              {navItems.map((item) => (
                <Link key={item.href} href={item.href}>
                  <div className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-zinc-400 transition-colors hover:bg-white/5 hover:text-white">
                    <item.icon className="h-5 w-5" />
                    {item.label}
                  </div>
                </Link>
              ))}
            </nav>
          </div>
          
          <div className="mt-auto border-t border-white/5 p-6">
            <div className="flex items-center gap-4">
              <SignedIn>
                <UserButton />
              </SignedIn>
              <div className="flex-1">
                <p className="text-sm font-medium">Admin Account</p>
                <Link href="/" className="text-xs text-zinc-500 hover:text-violet-400">
                  Back to home
                </Link>
              </div>
            </div>
          </div>
        </div>
      </motion.aside>

      <main className="flex-1 pl-72 pt-20">
        <div className="p-8">{children}</div>
      </main>
    </div>
  );
}