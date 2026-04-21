'use client';

import { useRouter } from 'next/navigation';
import { useUser } from '@clerk/nextjs';
import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { User, Scissors, Settings } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, Button } from '@/components/ui';
import { cn } from '@/lib/utils';

const roles = [
  {
    value: 'customer',
    label: 'Customer',
    description: 'Book appointments and manage your bookings',
    icon: User,
  },
  {
    value: 'stylist',
    label: 'Stylist',
    description: 'Manage your schedule and appointments',
    icon: Scissors,
  },
  {
    value: 'admin',
    label: 'Admin',
    description: 'Manage the salon and all bookings',
    icon: Settings,
  },
] as const;

export default function OnboardingPage() {
  const router = useRouter();
  const { user, isLoaded } = useUser();

  useEffect(() => {
    if (isLoaded && user?.publicMetadata?.onboardingComplete) {
      const role = user.publicMetadata.role as string;
      router.push(`/${role}`);
    }
  }, [isLoaded, user, router]);

  const handleRoleSelect = async (role: 'customer' | 'stylist' | 'admin') => {
    try {
      const response = await fetch('/api/onboarding', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ role }),
      });

      if (response.ok) {
        router.push(`/${role}`);
      }
    } catch (error) {
      console.error('Failed to set role:', error);
    }
  };

  if (!isLoaded) {
    return (
      <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
      </div>
    );
  }

  return (
    <div className="container mx-auto flex min-h-[calc(100vh-4rem)] items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-2xl space-y-8"
      >
        <div className="text-center">
          <h1 className="text-3xl font-bold">Welcome to Qwik Salon</h1>
          <p className="mt-2 text-muted-foreground">
            Please select your role to continue
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          {roles.map((role) => {
            const Icon = role.icon;
            const isDisabled = role.value === 'admin' && user?.publicMetadata?.role !== 'admin';

            return (
              <Card
                key={role.value}
                className={cn(
                  'relative cursor-pointer transition-all hover:border-primary/50',
                  isDisabled && 'cursor-not-allowed opacity-50'
                )}
                onClick={() => !isDisabled && handleRoleSelect(role.value)}
              >
                <CardHeader className="pb-2">
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                    <Icon className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle>{role.label}</CardTitle>
                  <CardDescription>{role.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button
                    variant="outline"
                    className="w-full"
                    disabled={isDisabled}
                  >
                    Select {role.label}
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </motion.div>
    </div>
  );
}