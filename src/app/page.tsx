
"use client";

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useApp } from '@/lib/store';
import { Loader2, GraduationCap } from 'lucide-react';

export default function Home() {
  const { state } = useApp();
  const router = useRouter();

  useEffect(() => {
    if (!state.isLoading) {
      if (state.user) {
        router.push('/dashboard');
      } else {
        router.push('/login');
      }
    }
  }, [state.user, state.isLoading, router]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-muted/30">
      <div className="text-center space-y-4">
        <div className="p-4 bg-primary rounded-3xl inline-block shadow-2xl animate-bounce">
          <GraduationCap className="w-12 h-12 text-white" />
        </div>
        <h1 className="text-2xl font-display font-bold tracking-tighter">NEOSTUD</h1>
        <div className="flex items-center justify-center gap-2 text-muted-foreground">
          <Loader2 className="w-4 h-4 animate-spin" />
          <span className="text-sm font-medium">Initialisation...</span>
        </div>
      </div>
    </div>
  );
}
