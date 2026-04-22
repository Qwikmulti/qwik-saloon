'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Plus, Pencil, Trash2, Star, Users, MoreHorizontal, Award, Calendar } from 'lucide-react';
import { Card, Badge, Button, Avatar, AvatarFallback } from '@/components/ui';

interface Stylist {
  _id: string;
  name: string;
  email: string;
  bio: string;
  specialties: string[];
  yearsExperience: number;
  profileImage?: string;
  rating?: number;
  totalReviews: number;
  isActive: boolean;
  servicesCount: number;
}

export default function AdminStylistsPage() {
  const [stylists, setStylists] = useState<Stylist[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStylists();
  }, []);

  const fetchStylists = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/admin/stylists');
      const data = await res.json();
      setStylists(data.stylists || []);
    } catch (error) {
      console.error('Error fetching stylists:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleToggleActive = async (id: string, currentStatus: boolean) => {
    try {
      await fetch(`/api/admin/stylists/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ isActive: !currentStatus }),
      });
      fetchStylists();
    } catch (error) {
      console.error('Error toggling stylist:', error);
    }
  };

  return (
    <div className="space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between"
      >
        <div>
          <h1 className="font-display text-3xl font-bold">Stylists</h1>
          <p className="text-zinc-400 mt-2">Manage your team</p>
        </div>
        <Button className="gap-2 bg-gradient-to-r from-violet-600 to-fuchsia-600">
          <Plus className="h-4 w-4" />
          Add Stylist
        </Button>
      </motion.div>

      {loading ? (
        <div className="py-12 text-center">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-violet-500 border-t-transparent mx-auto" />
        </div>
      ) : stylists.length === 0 ? (
        <Card className="border-white/5 bg-[#131316] p-12 text-center">
          <Users className="h-16 w-16 mx-auto mb-4 text-zinc-500" />
          <h3 className="font-display text-xl font-semibold mb-2">No Stylists Yet</h3>
          <p className="text-zinc-500 mb-6">Add your first stylist to get started</p>
          <Button className="bg-gradient-to-r from-violet-600 to-fuchsia-600">
            <Plus className="h-4 w-4 mr-2" />
            Add Stylist
          </Button>
        </Card>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {stylists.map((stylist, i) => (
            <motion.div
              key={stylist._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
            >
              <Card className="border-white/5 bg-[#131316] overflow-hidden">
                <div className="relative h-20 bg-gradient-to-br from-violet-600/30 to-fuchsia-600/30">
                  <div className="absolute -bottom-10 left-6">
                    <Avatar className="h-20 w-20 border-4 border-[#131316]">
                      {stylist.profileImage ? (
                        <img src={stylist.profileImage} alt={stylist.name} className="h-full w-full object-cover" />
                      ) : (
                        <AvatarFallback className="bg-gradient-to-br from-violet-600 to-fuchsia-600 text-2xl font-bold">
                          {stylist.name.charAt(0)}
                        </AvatarFallback>
                      )}
                    </Avatar>
                  </div>
                  <div className="absolute top-4 right-4">
                    <Badge variant={stylist.isActive ? 'default' : 'secondary'}>
                      {stylist.isActive ? 'Active' : 'Inactive'}
                    </Badge>
                  </div>
                </div>
                
                <div className="pt-12 px-6 pb-6">
                  <h3 className="font-display text-lg font-semibold">{stylist.name}</h3>
                  <p className="text-sm text-zinc-500 mb-3">{stylist.email}</p>
                  
                  {stylist.bio && (
                    <p className="text-sm text-zinc-400 mb-4 line-clamp-2">{stylist.bio}</p>
                  )}

                  <div className="flex flex-wrap gap-1 mb-4">
                    {stylist.specialties?.slice(0, 3).map((specialty) => (
                      <Badge key={specialty} variant="outline" className="text-xs">
                        {specialty}
                      </Badge>
                    ))}
                  </div>

                  <div className="grid grid-cols-3 gap-2 mb-4 text-center">
                    <div className="rounded-lg bg-white/5 p-2">
                      <p className="font-display text-lg font-bold">{stylist.yearsExperience}</p>
                      <p className="text-xs text-zinc-500">Years</p>
                    </div>
                    <div className="rounded-lg bg-white/5 p-2">
                      <p className="font-display text-lg font-bold flex items-center justify-center gap-1">
                        {stylist.rating?.toFixed(1) || '-'}
                        {stylist.rating && <Star className="h-3 w-3 fill-amber-400 text-amber-400" />}
                      </p>
                      <p className="text-xs text-zinc-500">Rating</p>
                    </div>
                    <div className="rounded-lg bg-white/5 p-2">
                      <p className="font-display text-lg font-bold">{stylist.totalReviews}</p>
                      <p className="text-xs text-zinc-500">Reviews</p>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <Button 
                      size="sm" 
                      variant="outline" 
                      className="flex-1 border-white/10"
                      onClick={() => handleToggleActive(stylist._id, stylist.isActive)}
                    >
                      {stylist.isActive ? 'Deactivate' : 'Activate'}
                    </Button>
                    <Button size="sm" variant="outline" className="border-white/10">
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <Button size="sm" variant="outline" className="border-red-500/30 text-red-400 hover:bg-red-500/10">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}