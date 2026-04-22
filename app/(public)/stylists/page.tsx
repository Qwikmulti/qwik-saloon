import Link from 'next/link';
import { motion } from 'framer-motion';
import { connectDB } from '@/lib/mongodb/connection';
import { Stylist } from '@/models';
import { Card, Badge, Avatar, AvatarImage, AvatarFallback, Button } from '@/components/ui';
import { Star, MapPin, ArrowRight, Sparkles } from 'lucide-react';

export default async function StylistsPage() {
  await connectDB();

  const stylists = await Stylist.find({ isActive: true })
    .populate('userId')
    .exec();

  return (
    <div className="min-h-screen py-32">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-16 text-center"
        >
          <span className="mb-4 inline-block text-sm font-medium uppercase tracking-wider text-violet-400">
            Our Team
          </span>
          <h1 className="font-display text-4xl font-bold sm:text-5xl lg:text-6xl">
            Expert Stylists
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-zinc-400">
            Meet our talented team of professionals dedicated to bringing your vision to life.
          </p>
        </motion.div>

        {stylists.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="py-24 text-center"
          >
            <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-2xl border border-white/10 bg-white/5">
              <Sparkles className="h-10 w-10 text-zinc-500" />
            </div>
            <h3 className="mb-2 font-display text-xl font-semibold">Coming Soon</h3>
            <p className="text-zinc-400">Our team profiles are being prepared.</p>
          </motion.div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {stylists.map((stylist, i) => {
              const user = stylist.userId as unknown as any;
              return (
                <motion.div
                  key={stylist._id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  whileHover={{ y: -8, scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Card className="group relative overflow-hidden rounded-2xl border border-white/5 bg-[#131316] transition-all duration-500 hover:border-violet-500/30">
                    <div className="absolute inset-0 bg-gradient-to-br from-violet-600/10 to-fuchsia-600/10 opacity-0 transition-opacity group-hover:opacity-100" />
                    <div className="relative p-6">
                      <div className="mb-6 flex items-center gap-4">
                        <div className="relative">
                          <Avatar className="h-20 w-20">
                            <AvatarImage src={stylist.profileImage} alt={user?.fullName} />
                            <AvatarFallback className="bg-gradient-to-br from-violet-600 to-fuchsia-600 text-xl font-bold">
                              {user?.fullName?.charAt(0) || 'S'}
                            </AvatarFallback>
                          </Avatar>
                          {stylist.isActive && (
                            <div className="absolute -bottom-1 -right-1 flex h-6 w-6 items-center justify-center rounded-full border-2 border-[#131316] bg-emerald-500">
                              <div className="h-2 w-2 rounded-full bg-white" />
                            </div>
                          )}
                        </div>
                        <div>
                          <h3 className="font-display text-lg font-semibold">
                            {user?.fullName || 'Stylist'}
                          </h3>
                          <p className="text-sm text-zinc-500">
                            {stylist.yearsExperience} years experience
                          </p>
                        </div>
                      </div>

                      {stylist.bio && (
                        <p className="mb-4 line-clamp-3 text-sm leading-relaxed text-zinc-400">
                          {stylist.bio}
                        </p>
                      )}

                      {stylist.specialties && stylist.specialties.length > 0 && (
                        <div className="mb-4 flex flex-wrap gap-2">
                          {stylist.specialties.slice(0, 4).map((specialty: string) => (
                            <Badge
                              key={specialty}
                              variant="outline"
                              className="rounded-full text-xs"
                            >
                              {specialty}
                            </Badge>
                          ))}
                        </div>
                      )}

                      <div className="mb-6 flex items-center gap-4 text-sm">
                        {stylist.rating && (
                          <div className="flex items-center gap-1">
                            <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
                            <span className="font-semibold">{stylist.rating.toFixed(1)}</span>
                            <span className="text-zinc-500">
                              ({stylist.totalReviews})
                            </span>
                          </div>
                        )}
                      </div>

                      <Link href={`/stylists/${stylist._id}`}>
                        <Button variant="outline" className="w-full gap-2 border-white/10">
                          View Profile <ArrowRight className="h-4 w-4" />
                        </Button>
                      </Link>
                    </div>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}