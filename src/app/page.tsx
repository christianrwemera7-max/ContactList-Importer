"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useApp } from '@/lib/store';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { ArrowRight, Sparkles } from 'lucide-react';
import Image from 'next/image';
import placeholderData from '@/app/lib/placeholder-images.json';

const INTRO_WORDS = [
  "Apprendre.",
  "Comprendre.",
  "Progresser.",
  "Construire son avenir."
];

export default function SplashPage() {
  const { state } = useApp();
  const router = useRouter();
  const [step, setStep] = useState(0); // 0-3: Words, 4: neostud liquid wordmark, 5: Hero Section
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const sequence = async () => {
      await new Promise(r => setTimeout(r, 800));
      
      for (let i = 0; i < INTRO_WORDS.length; i++) {
        setStep(i);
        setIsVisible(true);
        await new Promise(r => setTimeout(r, 1800));
        setIsVisible(false);
        await new Promise(r => setTimeout(r, 600));
      }

      setStep(4);
      setIsVisible(true);
      await new Promise(r => setTimeout(r, 3000));
      setIsVisible(false);
      await new Promise(r => setTimeout(r, 800));
      
      setStep(5);
      setIsVisible(true);
    };

    sequence();
  }, []);

  const handleStart = () => {
    if (state.user) {
      router.push('/dashboard');
    } else {
      router.push('/login');
    }
  };

  const heroImage = placeholderData.placeholderImages.find(img => img.id === 'hero-composition');

  return (
    <div className={cn(
      "min-h-screen transition-colors duration-1000 flex items-center justify-center overflow-x-hidden relative",
      step < 5 ? "bg-splash-gradient" : "bg-[#F8F7FC]"
    )}>
      {/* Background elements for splash steps */}
      {step < 5 && (
        <div className="absolute inset-0 opacity-30 pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-white rounded-full blur-[120px] animate-pulse" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-primary/20 rounded-full blur-[120px] animate-pulse" />
        </div>
      )}

      <div className={cn(
        "relative z-10 w-full transition-all duration-1000",
        step === 5 ? "max-w-6xl px-6" : "max-w-xl text-center"
      )}>
        {/* Splash Sequence: Words */}
        {step < 4 && (
          <p 
            className={cn(
              "text-white text-2xl md:text-3xl font-display font-medium tracking-tight transition-all duration-1000",
              isVisible ? "opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-4 scale-95"
            )}
          >
            {INTRO_WORDS[step]}
          </p>
        )}

        {/* Splash Sequence: neostud wordmark (Aesthetic inspired by 'fuse') */}
        {step === 4 && (
          <div className={cn(
            "flex flex-col items-center transition-all duration-2000",
            isVisible ? "opacity-100 scale-100" : "opacity-0 scale-90"
          )}>
             <div className="relative group">
                {/* SVG Liquid Wordmark approximation */}
                <svg width="280" height="80" viewBox="0 0 280 80" fill="none" xmlns="http://www.w3.org/2000/svg" className="drop-shadow-2xl">
                  <defs>
                    <filter id="liquid" x="-20%" y="-20%" width="140%" height="140%">
                      <feGaussianBlur in="SourceGraphic" stdDeviation="2" result="blur" />
                      <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -7" result="liquid" />
                    </filter>
                  </defs>
                  <g filter="url(#liquid)">
                    <text x="50%" y="55%" dominantBaseline="middle" textAnchor="middle" className="fill-white font-display font-black text-6xl lowercase tracking-[-0.08em]">
                      neostud
                    </text>
                  </g>
                </svg>
                {/* Subtle light effect behind the text */}
                <div className="absolute inset-0 bg-white/20 blur-3xl rounded-full opacity-50 -z-10 group-hover:opacity-100 transition-opacity" />
             </div>
          </div>
        )}

        {/* Hero Section */}
        {step === 5 && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center py-12 md:py-20 animate-in fade-in slide-in-from-bottom-8 duration-1000">
            <div className="space-y-8 order-2 lg:order-1">
              <div className="space-y-6">
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full text-primary text-xs font-black uppercase tracking-widest">
                  <Sparkles className="w-3.5 h-3.5" />
                  L'expérience EdTech Premium
                </div>
                <h2 className="text-5xl md:text-7xl font-display font-black text-foreground tracking-tighter leading-[0.9]">
                  Ton avenir <br/> commence ici.
                </h2>
                <p className="text-muted-foreground text-lg md:text-xl font-medium leading-relaxed max-w-md">
                  Neostud t'accompagne pour apprendre, progresser et construire ton parcours avec brio.
                </p>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <Button 
                  onClick={handleStart}
                  size="lg"
                  className="h-16 rounded-[24px] bg-primary text-white hover:bg-primary/90 text-lg font-bold shadow-xl shadow-primary/20 gap-3 group transition-all active:scale-95"
                >
                  Explorer Neostud
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Button>
                <Button 
                  onClick={handleStart}
                  variant="outline"
                  size="lg"
                  className="h-16 rounded-[24px] border-2 border-border bg-white text-foreground hover:bg-muted text-lg font-bold transition-all active:scale-95"
                >
                  Commencer
                </Button>
              </div>
            </div>

            <div className="relative order-1 lg:order-2">
              <div className="relative aspect-[4/3] w-full rounded-[40px] overflow-hidden shadow-2xl border-8 border-white">
                {heroImage && (
                  <Image 
                    src={heroImage.imageUrl}
                    alt={heroImage.description}
                    fill
                    className="object-cover transition-transform duration-10000 hover:scale-110"
                    priority
                    data-ai-hint={heroImage.imageHint}
                  />
                )}
                {/* Visual accents */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none" />
                <div className="absolute top-6 left-6 p-4 bg-white/90 backdrop-blur-md rounded-3xl shadow-xl flex items-center gap-3 animate-bounce">
                  <div className="w-10 h-10 rounded-2xl bg-primary flex items-center justify-center text-white">
                    <Sparkles className="w-5 h-5" />
                  </div>
                  <div className="pr-4">
                    <p className="text-[10px] font-black uppercase text-muted-foreground leading-none">Orientation</p>
                    <p className="text-sm font-bold text-foreground">Objectif Réussite</p>
                  </div>
                </div>
              </div>
              {/* Decorative elements */}
              <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-primary/10 rounded-full blur-3xl -z-10" />
              <div className="absolute -top-6 -left-6 w-32 h-32 bg-primary/5 rounded-full blur-3xl -z-10" />
            </div>
          </div>
        )}
      </div>

      {/* Footer text (only in splash steps) */}
      {step < 5 && (
        <div className="absolute bottom-10 text-white/40 text-[10px] font-black uppercase tracking-[0.3em] animate-pulse">
          NeoStud — EdTech Premium
        </div>
      )}
    </div>
  );
}
