'use client';

import { motion } from 'framer-motion';
import { MapPin, Phone, Mail, Clock, Send, ArrowRight, MessageCircle, Instagram, Facebook, Twitter } from 'lucide-react';
import { useState } from 'react';
import { BentoGrid, BentoBox, Button } from '@/components/ui';

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
    <div className="min-h-screen py-32 bg-[#050507]">
      <div className="container mx-auto px-6 max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-20 text-center max-w-3xl mx-auto"
        >
          <span className="mb-4 inline-block text-sm font-semibold uppercase tracking-[0.2em] text-violet-400">
            Communicate
          </span>
          <h1 className="font-display text-5xl font-bold tracking-tight sm:text-6xl lg:text-7xl">
            Get in <span className="bg-gradient-to-r from-violet-400 to-fuchsia-400 bg-clip-text text-transparent">Touch</span>
          </h1>
          <p className="mt-8 text-xl leading-relaxed text-zinc-400">
            For bespoke inquiries, support with bookings, or simple feedback, our concierges are available across all channels to assist you.
          </p>
        </motion.div>

        <BentoGrid columns={2} className="gap-8">
          {/* Left Form Side */}
          <BentoBox colSpan={1} className="!p-10 border border-white/10 bg-[#0d0d12]">
             <h2 className="font-display text-3xl font-bold mb-8">Send a Dispatch</h2>
            
             {submitted ? (
               <motion.div
                 initial={{ opacity: 0, scale: 0.95 }}
                 animate={{ opacity: 1, scale: 1 }}
                 className="py-16 text-center"
               >
                 <div className="mx-auto mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-emerald-500/10 border border-emerald-500/20">
                   <Send className="h-10 w-10 text-emerald-400" />
                 </div>
                 <h3 className="mb-3 font-display text-3xl font-bold">Transmission Secured</h3>
                 <p className="text-lg text-zinc-400">Our concierge will contact you within 24 hours.</p>
                 <Button onClick={() => setSubmitted(false)} variant="outline" className="mt-8 rounded-full border-white/10">
                   Send Another
                 </Button>
               </motion.div>
             ) : (
               <form onSubmit={handleSubmit} className="space-y-6">
                 <div className="grid gap-6 md:grid-cols-2">
                   <div className="space-y-2">
                     <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-500">Name</label>
                     <input
                       type="text"
                       value={formState.name}
                       onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                       className="w-full rounded-2xl border border-white/10 bg-white/5 px-5 py-4 text-zinc-100 transition-all focus:border-violet-500 focus:bg-white/10 focus:outline-none"
                       placeholder="Jane Doe"
                       required
                     />
                   </div>
                   <div className="space-y-2">
                     <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-500">Email</label>
                     <input
                       type="email"
                       value={formState.email}
                       onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                       className="w-full rounded-2xl border border-white/10 bg-white/5 px-5 py-4 text-zinc-100 transition-all focus:border-violet-500 focus:bg-white/10 focus:outline-none"
                       placeholder="jane@example.com"
                       required
                     />
                   </div>
                 </div>
                 <div className="space-y-2">
                   <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-500">Subject</label>
                   <input
                     type="text"
                     value={formState.subject}
                     onChange={(e) => setFormState({ ...formState, subject: e.target.value })}
                     className="w-full rounded-2xl border border-white/10 bg-white/5 px-5 py-4 text-zinc-100 transition-all focus:border-violet-500 focus:bg-white/10 focus:outline-none"
                     placeholder="Inquiry Topic"
                     required
                   />
                 </div>
                 <div className="space-y-2">
                   <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-500">Message</label>
                   <textarea
                     value={formState.message}
                     onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                     className="min-h-[160px] w-full rounded-2xl border border-white/10 bg-white/5 px-5 py-4 text-zinc-100 transition-all focus:border-violet-500 focus:bg-white/10 focus:outline-none resize-none"
                     placeholder="How can we assist you?"
                     required
                   />
                 </div>
                 <Button
                   type="submit"
                   disabled={isSubmitting}
                   className="w-full rounded-2xl bg-white px-8 py-7 text-lg font-bold text-[#050507] transition-all hover:bg-zinc-200 hover:scale-[1.02]"
                 >
                   {isSubmitting ? (
                     <div className="h-6 w-6 animate-spin rounded-full border-2 border-[#050507]/30 border-t-[#050507]" />
                   ) : (
                     <>
                       Dispatch Transmission <Send className="ml-2 h-5 w-5" />
                     </>
                   )}
                 </Button>
               </form>
             )}
          </BentoBox>

          {/* Right Info Side */}
          <BentoBox colSpan={1} className="!p-0 border-none bg-transparent">
             <div className="flex flex-col gap-6 h-full">
                <BentoBox className="flex-1 bg-gradient-to-br from-violet-900/10 to-[#0d0d12]">
                   <h2 className="font-display text-2xl font-bold mb-8">Directories</h2>
                   <div className="space-y-8">
                      {contactInfo.map((info) => (
                         <div key={info.title} className="flex gap-5 group">
                            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-white/5 border border-white/10 transition-colors group-hover:border-violet-500/50">
                               <info.icon className="h-6 w-6 text-violet-400" />
                            </div>
                            <div>
                               <p className="mb-1 text-sm font-semibold uppercase tracking-wider text-zinc-300">{info.title}</p>
                               {info.lines.map((line, i) => (
                                 <p key={i} className="text-zinc-500 text-lg leading-snug">{line}</p>
                               ))}
                            </div>
                         </div>
                      ))}
                   </div>
                </BentoBox>

                <div className="grid grid-cols-2 gap-6 h-1/3">
                   <BentoBox className="flex flex-col justify-center bg-white/5 border border-white/10">
                      <h3 className="font-display text-xl font-bold mb-4">Connect</h3>
                      <div className="flex gap-3">
                         {socialLinks.map((social) => (
                           <a key={social.label} href={social.href} className="flex h-12 w-12 items-center justify-center rounded-xl bg-black/40 border border-white/10 text-zinc-400 hover:text-white transition-all hover:scale-110 hover:border-violet-500/50">
                              <social.icon className="h-5 w-5" />
                           </a>
                         ))}
                      </div>
                   </BentoBox>
                   <BentoBox className="flex flex-col justify-center bg-gradient-to-br from-fuchsia-600/20 to-violet-600/20 border-violet-500/30 group cursor-pointer" onClick={() => window.location.href='/sign-up'}>
                      <h3 className="font-display text-xl font-bold mb-2">Book Direct</h3>
                      <p className="text-sm text-zinc-400 mb-4">Skip the form.</p>
                      <ArrowRight className="h-8 w-8 text-white group-hover:translate-x-2 transition-transform" />
                   </BentoBox>
                </div>
             </div>
          </BentoBox>
        </BentoGrid>
      </div>
    </div>
  );
}