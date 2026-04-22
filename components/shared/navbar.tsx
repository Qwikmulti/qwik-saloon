'use client';

import * as React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { SignedIn, SignedOut, UserButton } from '@clerk/nextjs';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Scissors, Moon, Sun, Sparkles, Calendar } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui';
import { useTheme } from 'next-themes';
import { useUIStore } from '@/store';

export function Navbar() {
  const pathname = usePathname();
  const { theme, setTheme } = useTheme();
  const { isMobileMenuOpen, toggleMobileMenu } = useUIStore();

  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/services', label: 'Services' },
    { href: '/stylists', label: 'Stylists' },
    { href: '/about', label: 'About' },
    { href: '/contact', label: 'Contact' },
  ];

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className="fixed top-0 left-0 right-0 z-50 border-b border-white/5 bg-[#0a0a0b]/50 backdrop-blur-xl"
      >
        <nav className="container mx-auto flex h-20 items-center justify-between px-6">
          <Link href="/" className="group flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-violet-600 to-fuchsia-600 shadow-lg shadow-violet-500/25">
              <Scissors className="h-5 w-5 text-white" />
            </div>
            <div>
              <span className="font-display text-xl font-bold tracking-tight">Qwik Salon</span>
              <span className="hidden text-[10px] uppercase tracking-widest text-violet-400 sm:block">Premium Styling</span>
            </div>
          </Link>

          <div className="hidden items-center gap-1 lg:flex">
            {navLinks.map((link) => (
              <Link key={link.href} href={link.href}>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className={cn(
                    'relative rounded-xl px-4 py-2.5 text-sm font-medium transition-colors',
                    pathname === link.href 
                      ? 'text-white bg-white/5' 
                      : 'text-zinc-400 hover:text-white'
                  )}
                >
                  {link.label}
                </motion.button>
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-3">
            <SignedIn>
              <UserButton />
            </SignedIn>

            <SignedOut>
              <Button asChild size="sm" className="hidden bg-gradient-to-r from-violet-600 to-fuchsia-600 px-6 sm:flex">
                <Link href="/sign-up">Book Now</Link>
              </Button>
            </SignedOut>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={toggleMobileMenu}
              className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/5 lg:hidden"
            >
              {isMobileMenuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
            </motion.button>
          </div>
        </nav>
      </motion.header>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-x-0 top-20 z-40 border-b border-white/5 bg-[#0a0a0b]/95 backdrop-blur-xl lg:hidden"
          >
            <div className="container flex flex-col gap-2 p-6">
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                >
                  <Link href={link.href} onClick={toggleMobileMenu}>
                    <div className={cn(
                      'rounded-xl px-4 py-3 text-sm font-medium transition-colors',
                      pathname === link.href 
                        ? 'bg-white/5 text-white' 
                        : 'text-zinc-400'
                    )}>
                      {link.label}
                    </div>
                  </Link>
                </motion.div>
              ))}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: navLinks.length * 0.05 }}
              >
                <Button asChild className="w-full bg-gradient-to-r from-violet-600 to-fuchsia-600">
                  <Link href="/sign-up" onClick={toggleMobileMenu}>
                    <Calendar className="mr-2 h-4 w-4" />
                    Book Appointment
                  </Link>
                </Button>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}