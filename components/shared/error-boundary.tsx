'use client';

import { Component, ReactNode } from 'react';
import { motion } from 'framer-motion';
import { AlertTriangle, RefreshCw, Home } from 'lucide-react';
import { Button } from '@/components/ui';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: any) {
    console.error('Error boundary caught:', error, errorInfo);
  }

  handleReload = () => {
    window.location.reload();
  };

  handleGoHome = () => {
    window.location.href = '/';
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-[60vh] flex items-center justify-center p-8">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="max-w-md w-full"
          >
            <div className="rounded-2xl border border-red-500/20 bg-red-500/5 p-8 text-center">
              <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-red-500/10">
                <AlertTriangle className="h-8 w-8 text-red-400" />
              </div>
              <h1 className="font-display text-2xl font-bold mb-2">
                Something went wrong
              </h1>
              <p className="text-zinc-400 mb-6">
                We encountered an unexpected error. Please try again.
              </p>
              {this.state.error && (
                <p className="text-xs text-zinc-500 mb-6 p-3 rounded-lg bg-white/5">
                  {this.state.error.message}
                </p>
              )}
              <div className="flex gap-3 justify-center">
                <Button
                  onClick={this.handleReload}
                  className="gap-2 bg-gradient-to-r from-violet-600 to-fuchsia-600"
                >
                  <RefreshCw className="h-4 w-4" />
                  Reload
                </Button>
                <Button
                  onClick={this.handleGoHome}
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
      );
    }

    return this.props.children;
  }
}