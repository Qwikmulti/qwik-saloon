'use client';

import { motion } from 'framer-motion';
import { AlertTriangle, RefreshCw, Home } from 'lucide-react';
import { Button } from '@/components/ui';

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html>
      <body className="bg-[#0a0a0b] text-[#fafafa]">
        <div className="min-h-screen flex items-center justify-center p-8">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="max-w-md w-full text-center"
          >
            <div className="rounded-2xl border border-red-500/20 bg-red-500/5 p-8">
              <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-red-500/10">
                <AlertTriangle className="h-8 w-8 text-red-400" />
              </div>
              <h1 className="font-display text-2xl font-bold mb-2">
                Application Error
              </h1>
              <p className="text-zinc-400 mb-6">
                We encountered a critical error. Please try again.
              </p>
              {error?.message && (
                <p className="text-xs text-zinc-500 mb-6 p-3 rounded-lg bg-white/5">
                  {error.message}
                </p>
              )}
              <div className="flex gap-3 justify-center">
                <Button
                  onClick={reset}
                  className="gap-2 bg-gradient-to-r from-violet-600 to-fuchsia-600"
                >
                  <RefreshCw className="h-4 w-4" />
                  Try Again
                </Button>
                <Button
                  onClick={() => window.location.href = '/'}
                  variant="outline"
                  className="gap-2 border-white/10"
                >
                  <Home className="h-4 w-4" />
                  Go Home
                </Button>
              </div>
            </div>
          </motion.div>
        </div>
      </body>
    </html>
  );
}