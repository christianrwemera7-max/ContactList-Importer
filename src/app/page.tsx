
'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { ArrowRight, Sparkles } from 'lucide-react';

export default function LandingPage() {
  return (
    <div className="min-h-screen relative overflow-hidden bg-ink text-text selection:bg-primary/30">
      {/* Immersive Background - Neuro Connection */}
      <div className="absolute inset-0 z-0">
        <Image 
          src="https://picsum.photos/seed/neuro1/1920/1080" 
          alt="KONEKT Neuro Connections" 
          fill 
          className="object-cover opacity-20 grayscale-[0.3] brightness-[0.8]"
          priority
          data-ai-hint="neural network dark"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-ink via-ink/40 to-ink" />
      </div>

      {/* Navigation - Minimalist */}
      <nav className="fixed top-0 w-full z-50 bg-ink/40 backdrop-blur-xl border-b border-white/5">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center font-display font-bold text-white shadow-lg shadow-primary/20 text-xl">K</div>
            <span className="font-display font-bold text-xl tracking-tighter text-white">KONEKT</span>
          </div>
          <div className="flex items-center gap-4">
            <Button asChild variant="ghost" className="text-white hover:text-primary font-bold">
              <Link href="/login">Se connecter</Link>
            </Button>
            <Button asChild className="rounded-xl font-bold px-6 bg-primary text-white hover:bg-primary/90 shadow-xl shadow-primary/20">
              <Link href="/join">Rejoindre</Link>
            </Button>
          </div>
        </div>
      </nav>

      {/* Hero Content - Simple & Powerful */}
      <section className="relative z-10 pt-44 pb-32 px-6 flex flex-col items-center justify-center min-h-screen text-center">
        <div className="max-w-4xl mx-auto space-y-12">
          
          <div className="inline-flex items-center gap-2 px-6 py-2 rounded-full glass-card text-primary border-primary/20 text-[10px] font-black uppercase tracking-[0.5em] animate-in fade-in slide-in-from-top-6 duration-1000">
            <Sparkles className="w-3.5 h-3.5" /> Une génération connectée
          </div>

          <div className="space-y-6">
            <h1 className="text-5xl md:text-8xl font-display font-bold tracking-tighter leading-tight text-white animate-in fade-in slide-in-from-bottom-6 duration-1000 delay-200 uppercase">
              LIBÉRER VOTRE <br />
              <span className="text-primary italic">POTENTIEL</span>.
            </h1>
            <p className="text-lg md:text-xl text-muted-2 leading-relaxed max-w-xl mx-auto font-medium animate-in fade-in duration-1000 delay-500">
              L'écosystème numérique pour bâtir, apprendre et entreprendre ensemble.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row justify-center gap-6 pt-10 animate-in fade-in slide-in-from-bottom-10 duration-1000 delay-700">
            <Button asChild size="lg" className="h-16 px-12 rounded-2xl text-lg font-bold bg-primary text-white hover:bg-primary/90 shadow-2xl shadow-primary/30 transition-all">
              <Link href="/join" className="flex items-center">
                S'inscrire <ArrowRight className="ml-3 w-5 h-5" />
              </Link>
            </Button>
            
            <Button asChild variant="outline" size="lg" className="h-16 px-12 rounded-2xl text-lg font-bold glass-card border-white/10 text-white hover:bg-white/5 transition-all">
              <Link href="/vision">
                La Vision
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
