'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { User, Camera, Save, Sparkles, MapPin, Phone, Mail, Clock } from 'lucide-react';
import { Card, Badge, Button, Input, Textarea } from '@/components/ui';

interface StylistProfile {
  name: string;
  bio: string;
  specialties: string[];
  yearsExperience: number;
  profileImage?: string;
}

const SPECIALTY_OPTIONS = [
  'Precision Cuts', 'Colour Expert', 'Highlights', 'Balayage', 'Bridal Styling',
  'Men\'s Grooming', 'Textured Hair', 'Curly Hair', 'Treatments', 'Extensions',
];

export default function StylistProfilePage() {
  const [profile, setProfile] = useState<StylistProfile>({
    name: '',
    bio: '',
    specialties: [],
    yearsExperience: 0,
    profileImage: '',
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const fetchProfile = async () => {
      setLoading(true);
      try {
        const res = await fetch('/api/stylist/profile');
        const data = await res.json();
        if (data.profile) {
          setProfile(data.profile);
        }
      } catch (error) {
        console.error('Error fetching profile:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);

  const handleSpecialtyToggle = (specialty: string) => {
    setProfile(prev => ({
      ...prev,
      specialties: prev.specialties.includes(specialty)
        ? prev.specialties.filter(s => s !== specialty)
        : [...prev.specialties, specialty],
    }));
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      const res = await fetch('/api/stylist/profile', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(profile),
      });
      if (res.ok) {
        alert('Profile saved successfully!');
      }
    } catch (error) {
      console.error('Error saving profile:', error);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="font-display text-3xl font-bold">My Profile</h1>
        <p className="text-zinc-400 mt-2">Manage your public profile</p>
      </motion.div>

      <div className="grid gap-8 lg:grid-cols-3">
        <div className="lg:col-span-1">
          <Card className="border-white/5 bg-[#131316] p-6">
            <div className="text-center">
              <div className="relative mx-auto mb-6 w-40 h-40">
                <div className="w-full h-full rounded-full bg-gradient-to-br from-violet-600 to-fuchsia-600 flex items-center justify-center text-5xl font-bold">
                  {profile.name?.charAt(0) || 'S'}
                </div>
                <button className="absolute bottom-2 right-2 flex h-12 w-12 items-center justify-center rounded-full border-4 border-[#131316] bg-violet-600 hover:bg-violet-700">
                  <Camera className="h-5 w-5" />
                </button>
              </div>
              <h2 className="font-display text-xl font-semibold">{profile.name || 'Your Name'}</h2>
              <p className="text-sm text-zinc-500">{profile.yearsExperience} years experience</p>
            </div>
          </Card>
        </div>

        <div className="lg:col-span-2 space-y-6">
          <Card className="border-white/5 bg-[#131316] p-6">
            <h2 className="font-display text-xl font-semibold mb-6">Basic Information</h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm text-zinc-500 mb-2">Display Name</label>
                <Input
                  value={profile.name}
                  onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                  placeholder="Your display name"
                  className="border-white/10 bg-white/5"
                />
              </div>
              
              <div>
                <label className="block text-sm text-zinc-500 mb-2">Years of Experience</label>
                <Input
                  type="number"
                  value={profile.yearsExperience}
                  onChange={(e) => setProfile({ ...profile, yearsExperience: parseInt(e.target.value) || 0 })}
                  className="border-white/10 bg-white/5"
                />
              </div>
              
              <div>
                <label className="block text-sm text-zinc-500 mb-2">Bio</label>
                <Textarea
                  value={profile.bio}
                  onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
                  placeholder="Tell clients about yourself..."
                  rows={5}
                  className="border-white/10 bg-white/5"
                />
              </div>
            </div>
          </Card>

          <Card className="border-white/5 bg-[#131316] p-6">
            <h2 className="font-display text-xl font-semibold mb-6">Specialties</h2>
            <p className="text-sm text-zinc-500 mb-4">Select your areas of expertise</p>
            
            <div className="flex flex-wrap gap-2">
              {SPECIALTY_OPTIONS.map((specialty) => (
                <button
                  key={specialty}
                  onClick={() => handleSpecialtyToggle(specialty)}
                  className={`rounded-full px-4 py-2 text-sm transition-colors ${
                    profile.specialties.includes(specialty)
                      ? 'bg-violet-600 text-white'
                      : 'border border-white/10 bg-white/5 hover:border-violet-500/50'
                  }`}
                >
                  {specialty}
                  {profile.specialties.includes(specialty) && (
                    <Sparkles className="ml-2 h-4 w-4 inline" />
                  )}
                </button>
              ))}
            </div>
          </Card>

          <Button 
            onClick={handleSave} 
            disabled={saving}
            className="w-full gap-2 bg-gradient-to-r from-violet-600 to-fuchsia-600"
          >
            <Save className="h-4 w-4" />
            {saving ? 'Saving...' : 'Save Profile'}
          </Button>
        </div>
      </div>
    </div>
  );
}