'use client';

import { motion } from 'framer-motion';
import { Card } from '@/components/ui';
import { MapPin, Phone, Mail, Clock, Send, ArrowRight, MessageCircle, Instagram, Facebook, Twitter } from 'lucide-react';
import { useState } from 'react';

export default function ContactPage() {
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setSubmitted(true);
    setIsSubmitting(false);
  };

  const contactInfo = [
    {
      icon: MapPin,
      title: 'Location',
      lines: ['123 High Street', 'London, EC1A 1BB', 'United Kingdom'],
    },
    {
      icon: Phone,
      title: 'Phone',
      lines: ['+44 20 1234 5678'],
    },
    {
      icon: Mail,
      title: 'Email',
      lines: ['hello@qwiksalon.co.uk'],
    },
    {
      icon: Clock,
      title: 'Hours',
      lines: ['Monday - Friday: 9am - 7pm', 'Saturday: 9am - 6pm', 'Sunday: Closed'],
    },
  ];

  const socialLinks = [
    { icon: Instagram, label: 'Instagram', href: '#' },
    { icon: Facebook, label: 'Facebook', href: '#' },
    { icon: Twitter, label: 'Twitter', href: '#' },
    { icon: MessageCircle, label: 'WhatsApp', href: '#' },
  ];

  return (
    <div className="min-h-screen py-32">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-16 text-center"
        >
          <span className="mb-4 inline-block text-sm font-medium uppercase tracking-wider text-violet-400">
            Get in Touch
          </span>
          <h1 className="font-display text-4xl font-bold sm:text-5xl lg:text-6xl">
            Contact Us
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-zinc-400">
            Have a question or want to learn more? We&apos;d love to hear from you.
          </p>
        </motion.div>

        <div className="grid gap-8 lg:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
          >
            <Card className="relative overflow-hidden rounded-2xl border border-white/5 bg-[#131316] p-8">
              <div className="absolute inset-0 bg-gradient-to-br from-violet-600/5 to-fuchsia-600/5" />
              <div className="relative">
                <h2 className="mb-6 font-display text-xl font-semibold">Send us a Message</h2>
                
                {submitted ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="py-12 text-center"
                  >
                    <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-violet-600 to-fuchsia-600">
                      <Send className="h-8 w-8" />
                    </div>
                    <h3 className="mb-2 font-display text-xl font-semibold">Message Sent!</h3>
                    <p className="text-zinc-400">We&apos;ll get back to you within 24 hours.</p>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid gap-6 md:grid-cols-2">
                      <div>
                        <label className="mb-2 block text-sm font-medium">Name</label>
                        <input
                          type="text"
                          value={formState.name}
                          onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                          className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 transition-colors focus:border-violet-500 focus:outline-none"
                          placeholder="Your name"
                          required
                        />
                      </div>
                      <div>
                        <label className="mb-2 block text-sm font-medium">Email</label>
                        <input
                          type="email"
                          value={formState.email}
                          onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                          className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 transition-colors focus:border-violet-500 focus:outline-none"
                          placeholder="your@email.com"
                          required
                        />
                      </div>
                    </div>
                    <div>
                      <label className="mb-2 block text-sm font-medium">Subject</label>
                      <input
                        type="text"
                        value={formState.subject}
                        onChange={(e) => setFormState({ ...formState, subject: e.target.value })}
                        className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 transition-colors focus:border-violet-500 focus:outline-none"
                        placeholder="How can we help?"
                        required
                      />
                    </div>
                    <div>
                      <label className="mb-2 block text-sm font-medium">Message</label>
                      <textarea
                        value={formState.message}
                        onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                        className="min-h-[160px] w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 transition-colors focus:border-violet-500 focus:outline-none"
                        placeholder="Your message..."
                        required
                      />
                    </div>
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-violet-600 to-fuchsia-600 px-6 py-3 font-medium transition-all hover:opacity-90 disabled:opacity-50"
                    >
                      {isSubmitting ? (
                        <div className="h-5 w-5 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                      ) : (
                        <>
                          Send Message <Send className="h-4 w-4" />
                        </>
                      )}
                    </button>
                  </form>
                )}
              </div>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="space-y-6"
          >
            <Card className="relative overflow-hidden rounded-2xl border border-white/5 bg-[#131316] p-8">
              <div className="absolute inset-0 bg-gradient-to-br from-violet-600/5 to-fuchsia-600/5" />
              <div className="relative space-y-6">
                <h2 className="font-display text-xl font-semibold">Contact Information</h2>
                {contactInfo.map((info) => (
                  <div key={info.title} className="flex items-start gap-4">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white/5">
                      <info.icon className="h-5 w-5 text-violet-400" />
                    </div>
                    <div>
                      <p className="mb-1 font-medium">{info.title}</p>
                      {info.lines.map((line, i) => (
                        <p key={i} className="text-sm text-zinc-400">{line}</p>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            <Card className="relative overflow-hidden rounded-2xl border border-white/5 bg-[#131316] p-8">
              <div className="absolute inset-0 bg-gradient-to-br from-violet-600/5 to-fuchsia-600/5" />
              <div className="relative">
                <h2 className="mb-4 font-display text-xl font-semibold">Connect With Us</h2>
                <div className="flex gap-3">
                  {socialLinks.map((social) => (
                    <motion.a
                      key={social.label}
                      href={social.href}
                      whileHover={{ scale: 1.1, y: -2 }}
                      className="flex h-12 w-12 items-center justify-center rounded-xl border border-white/10 bg-white/5 transition-colors hover:border-violet-500/50 hover:bg-violet-600/10"
                    >
                      <social.icon className="h-5 w-5" />
                    </motion.a>
                  ))}
                </div>
              </div>
            </Card>

            <Card className="relative overflow-hidden rounded-2xl border border-white/5 bg-gradient-to-br from-violet-600/20 to-fuchsia-600/20 p-8">
              <div className="absolute inset-0 bg-gradient-to-br from-violet-600/10 to-fuchsia-600/10" />
              <div className="relative">
                <h2 className="mb-2 font-display text-xl font-semibold">Ready to Book?</h2>
                <p className="mb-6 text-sm text-zinc-400">
                  Skip the contact form and book your appointment directly online.
                </p>
                <a
                  href="/sign-up"
                  className="inline-flex items-center gap-2 rounded-xl bg-white px-6 py-3 font-medium text-[#0a0a0b] transition-all hover:bg-zinc-200"
                >
                  Book Appointment <ArrowRight className="h-4 w-4" />
                </a>
              </div>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
}