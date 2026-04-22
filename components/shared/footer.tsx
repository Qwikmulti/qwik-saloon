"use client";

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Scissors, Sparkles, Mail, MapPin, Phone, Clock, Instagram, Facebook, Twitter } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  
  const quickLinks = [
    { href: '/services', label: 'Services' },
    { href: '/stylists', label: 'Stylists' },
    { href: '/about', label: 'About Us' },
    { href: '/contact', label: 'Contact' },
    { href: '/sign-up', label: 'Book Now' },
  ];

  const services = [
    'Haircuts & Styling',
    'Colouring & Highlights',
    'Hair Treatments',
    'Bridal Styling',
    'Men\'s Grooming',
    'Extensions',
  ];

  const socialLinks = [
    { href: '#', label: 'Instagram', icon: Instagram },
    { href: '#', label: 'Facebook', icon: Facebook },
    { href: '#', label: 'Twitter', icon: Twitter },
  ];

  return (
    <footer className="relative border-t border-white/5 bg-[#0a0a0b]">
      <div className="absolute inset-0 bg-gradient-to-b from-violet-600/5 to-transparent" />
      
      <div className="container relative mx-auto px-6 py-16 lg:py-24">
        <div className="grid gap-12 lg:grid-cols-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <Link href="/" className="group flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-violet-600 to-fuchsia-600 shadow-lg shadow-violet-500/25">
                <Scissors className="h-6 w-6 text-white" />
              </div>
              <span className="font-display text-xl font-bold">Qwik Salon</span>
            </Link>
            <p className="text-sm leading-relaxed text-zinc-400">
              Premium hair and beauty services for everyone. Where style meets artistry, and every visit transforms you into your best self.
            </p>
            <div className="flex gap-3">
              {socialLinks.map((social) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  whileHover={{ scale: 1.1, y: -2 }}
                  className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/5 transition-colors hover:border-violet-500/50 hover:bg-violet-600/10"
                >
                  <social.icon className="h-4 w-4" />
                </motion.a>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="space-y-4"
          >
            <h3 className="font-display text-sm font-semibold uppercase tracking-wider text-violet-400">Quick Links</h3>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="group flex items-center gap-2 text-sm text-zinc-400 transition-colors hover:text-white">
                    <span className="h-1 w-1 rounded-full bg-violet-500/50 opacity-0 transition-opacity group-hover:opacity-100" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="space-y-4"
          >
            <h3 className="font-display text-sm font-semibold uppercase tracking-wider text-violet-400">Services</h3>
            <ul className="space-y-3">
              {services.map((service) => (
                <li key={service}>
                  <Link href="/services" className="group flex items-center gap-2 text-sm text-zinc-400 transition-colors hover:text-white">
                    <Sparkles className="h-3 w-3 opacity-50 transition-opacity group-hover:opacity-100" />
                    {service}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="space-y-4"
          >
            <h3 className="font-display text-sm font-semibold uppercase tracking-wider text-violet-400">Visit Us</h3>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white/5">
                  <MapPin className="h-4 w-4 text-violet-400" />
                </div>
                <div className="text-sm text-zinc-400">
                  <p>123 High Street</p>
                  <p>London, EC1A 1BB</p>
                  <p>United Kingdom</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white/5">
                  <Phone className="h-4 w-4 text-violet-400" />
                </div>
                <p className="text-sm text-zinc-400">+44 20 1234 5678</p>
              </div>
              
              <div className="flex items-start gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white/5">
                  <Mail className="h-4 w-4 text-violet-400" />
                </div>
                <p className="text-sm text-zinc-400">hello@qwiksalon.co.uk</p>
              </div>
              
              <div className="flex items-start gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white/5">
                  <Clock className="h-4 w-4 text-violet-400" />
                </div>
                <div className="text-sm text-zinc-400">
                  <p>Mon-Fri: 9am - 7pm</p>
                  <p>Saturday: 9am - 6pm</p>
                  <p>Sunday: Closed</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="mt-16 flex flex-col items-center justify-between gap-4 border-t border-white/5 pt-8 text-center sm:flex-row"
        >
          <p className="text-sm text-zinc-500">
            &copy; {currentYear} Qwik Salon. All rights reserved.
          </p>
          <div className="flex gap-6 text-sm text-zinc-500">
            <Link href="#" className="transition-colors hover:text-white">Privacy Policy</Link>
            <Link href="#" className="transition-colors hover:text-white">Terms of Service</Link>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}