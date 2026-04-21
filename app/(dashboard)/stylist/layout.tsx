'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import { SignedIn, SignedOut, UserButton } from '@clerk/nextjs';
import { Calendar, Clock, Settings, Home, TrendingUp, Users, Scissors } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function StylistLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  
  const navItems = [
    { href: '/stylist', label: 'Dashboard', icon: Home },
    { href: '/stylist/schedule', label: 'Schedule', icon: Calendar },
    { href: '/stylist/profile', label: 'Profile', icon: Settings },
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
            <h2 className="mb-6 font-display text-sm font-semibold uppercase tracking-wider text-zinc-500">
              Stylist Portal
            </h2>
            <nav className="space-y-1">
              {navItems.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <Link key={item.href} href={item.href}>
                    <motion.div
                      whileHover={{ x: 4 }}
                      className={cn(
                        'flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-colors',
                        isActive
                          ? 'bg-gradient-to-r from-violet-600/20 to-fuchsia-600/20 text-white'
                          : 'text-zinc-400 hover:bg-white/5 hover:text-white'
                      )}
                    >
                      <item.icon className={cn('h-5 w-5', isActive ? 'text-violet-400' : '')} />
                      {item.label}
                    </motion.div>
                  </Link>
                );
              })}
            </nav>
          </div>
          
          <div className="mt-auto border-t border-white/5 p-6">
            <div className="flex items-center gap-4">
              <SignedIn>
                <UserButton />
              </SignedIn>
              <div className="flex-1">
                <p className="text-sm font-medium">My Account</p>
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