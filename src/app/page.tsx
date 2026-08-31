'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { ArrowRight, Sparkles, Network } from 'lucide-react';

export default function LandingPage() {
  return (
    <div className="min-h-screen relative overflow-hidden bg-background text-foreground">
      {/* Immersive Background */}
      <div className="absolute inset-0 z-0">
        <Image 
          src="https://picsum.photos/seed/neuro2/1920/1080" 
          alt="Neuro Connections" 
          fill 
          className="object-cover opacity-20"
          priority
          data-ai-hint="neural network"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background via-background/80 to-background" />
      </div>

      {/* Decorative Orbs */}
      <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-primary/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-accent/5 rounded-full blur-[120px] pointer-events-none" />

      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 border-b border-white/5 bg-background/60 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center font-display font-bold text-primary-foreground text-xl shadow-lg shadow-primary/20">K</div>
            <span className="font-display font-bold text-xl tracking-tighter text-white">KONEKT</span>
          </div>
          <div className="flex items-center gap-4">
            <Button asChild variant="ghost" className="text-white hover:text-primary">
              <Link href="/join">Se connecter</Link>
            </Button>
            <Button asChild className="rounded-xl font-bold px-6 bg-primary text-primary-foreground hover:bg-primary/90">
              <Link href="/join">Rejoindre</Link>
            </Button>
          </div>
        </div>
      </nav>

      {/* Hero Content */}
      <section className="relative z-10 pt-44 pb-32 px-6 flex flex-col items-center justify-center min-h-screen text-center">
        <div className="max-w-4xl mx-auto space-y-12">
          
          <div className="inline-flex items-center gap-2 px-6 py-2 rounded-full glass-card text-primary border-primary/20 text-[10px] font-black uppercase tracking-[0.4em] animate-in fade-in slide-in-from-top-6 duration-1000">
            <Sparkles className="w-3.5 h-3.5" /> L'intelligence Collective au service de vos projets
          </div>

          <div className="space-y-6">
            <h1 className="text-6xl md:text-8xl font-display font-bold tracking-tighter leading-[0.9] text-white animate-in fade-in slide-in-from-bottom-6 duration-1000 delay-200">
              Libérez votre <span className="text-primary">puissance</span> <br /> 
              entrepreneuriale.
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground leading-relaxed max-w-2xl mx-auto font-medium animate-in fade-in duration-1000 delay-500">
              Plus qu'un réseau, un écosystème de <span className="text-primary">neuro-connexions</span> humaines pour propulser vos idées vers le succès.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row justify-center gap-6 pt-8 animate-in fade-in slide-in-from-bottom-10 duration-1000 delay-700">
            <Button asChild size="lg" className="h-20 px-12 rounded-[2.5rem] text-xl font-bold bg-primary text-primary-foreground hover:bg-primary/90 shadow-2xl shadow-primary/30 group transition-all">
              <Link href="/join" className="flex items-center">
                Rejoindre le réseau <ArrowRight className="ml-3 w-6 h-6 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
            
            <Button asChild variant="outline" size="lg" className="h-20 px-12 rounded-[2.5rem] text-xl font-bold glass-card border-accent/30 text-accent hover:bg-accent/10 hover:border-accent/50 transition-all">
              <Link href="/vision" className="flex items-center gap-3">
                <Network className="w-6 h-6" /> La Vision
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}