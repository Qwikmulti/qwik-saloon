'use client';

import { motion } from 'framer-motion';
import { LucideIcon } from 'lucide-react';
import { Button } from '@/components/ui';

interface EmptyStateProps {
  icon: LucideIcon;
  title: string;
  description?: string;
  action?: {
    label: string;
    href?: string;
    onClick?: () => void;
  };
}

export function EmptyState({ icon: Icon, title, description, action }: EmptyStateProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col items-center justify-center py-16 px-4"
    >
      <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-2xl border border-white/10 bg-white/5">
        <Icon className="h-10 w-10 text-zinc-500" />
      </div>
      <h3 className="font-display text-xl font-semibold mb-2">{title}</h3>
      {description && (
        <p className="text-zinc-500 text-center max-w-sm mb-6">{description}</p>
      )}
      {action && (
        action.href ? (
          <Button asChild className="bg-gradient-to-r from-violet-600 to-fuchsia-600">
            <a href={action.href}>{action.label}</a>
          </Button>
        ) : (
          <Button onClick={action.onClick} className="bg-gradient-to-r from-violet-600 to-fuchsia-600">
            {action.label}
          </Button>
        )
      )}
    </motion.div>
  );
}

export function LoadingSpinner({ size = 'md' }: { size?: 'sm' | 'md' | 'lg' }) {
  const sizes = {
    sm: 'h-4 w-4',
    md: 'h-8 w-8',
    lg: 'h-12 w-12',
  };
  
  return (
    <div className={`${sizes[size]} animate-spin rounded-full border-4 border-violet-500/30 border-t-violet-500`} />
  );
}

export function PageLoader() {
  return (
    <div className="flex min-h-[60vh] items-center justify-center">
      <LoadingSpinner size="lg" />
    </div>
  );
}