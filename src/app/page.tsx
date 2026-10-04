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
        await new Promise(r => setTimeout(r, 1600));
        setIsVisible(false);
        await new Promise(r => setTimeout(r, 600));
      }

      setStep(4);
      setIsVisible(true);
      await new Promise(r => setTimeout(r, 3500));
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
      {/* Subtle floating light during splash */}
      {step < 5 && (
        <div className="absolute inset-0 opacity-20 pointer-events-none overflow-hidden">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/30 rounded-full blur-[160px] animate-pulse" />
        </div>
      )}

      <div className={cn(
        "relative z-10 w-full transition-all duration-1000",
        step === 5 ? "max-w-6xl px-6" : "max-w-xl text-center"
      )}>
        {/* Splash Sequence: Words in vibrant Mauve */}
        {step < 4 && (
          <p 
            className={cn(
              "text-primary text-3xl md:text-5xl font-display font-black tracking-tight transition-all duration-1000",
              isVisible ? "opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-4 scale-95"
            )}
          >
            {INTRO_WORDS[step]}
          </p>
        )}

        {/* Splash Sequence: Agrandissement et Espacement du wordmark "neostud" */}
        {step === 4 && (
          <div className={cn(
            "flex flex-col items-center transition-all duration-2000",
            isVisible ? "opacity-100 scale-110" : "opacity-0 scale-90"
          )}>
             <div className="relative group">
                <svg width="480" height="120" viewBox="0 0 480 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="drop-shadow-[0_0_30px_rgba(108,43,255,0.4)]">
                  <defs>
                    <filter id="liquid" x="-20%" y="-20%" width="140%" height="140%">
                      <feGaussianBlur in="SourceGraphic" stdDeviation="2.5" result="blur" />
                      <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -7" result="liquid" />
                    </filter>
                  </defs>
                  <g filter="url(#liquid)">
                    <text x="50%" y="55%" dominantBaseline="middle" textAnchor="middle" className="fill-primary font-display font-black text-7xl lowercase" style={{ letterSpacing: '0.05em' }}>
                      neostud
                    </text>
                  </g>
                </svg>
                {/* Halo focal */}
                <div className="absolute inset-0 bg-primary/20 blur-[100px] rounded-full opacity-30 -z-10" />
             </div>
          </div>
        )}

        {/* Hero Section Immersive */}
        {step === 5 && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center py-12 md:py-20 animate-in fade-in slide-in-from-bottom-8 duration-1000">
            <div className="space-y-10 order-2 lg:order-1">
              <div className="space-y-6">
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full text-primary text-[10px] font-black uppercase tracking-[0.2em]">
                  <Sparkles className="w-3.5 h-3.5" />
                  EdTech Premium
                </div>
                <h2 className="text-6xl md:text-8xl font-display font-black text-foreground tracking-tighter leading-[0.85]">
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
                  className="h-20 rounded-[32px] bg-primary text-white hover:bg-primary/90 text-xl font-bold shadow-2xl shadow-primary/30 gap-4 group transition-all active:scale-95 px-12"
                >
                  Explorer Neostud
                  <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform" />
                </Button>
                <Button 
                  onClick={handleStart}
                  variant="outline"
                  size="lg"
                  className="h-20 rounded-[32px] border-2 border-border bg-white text-foreground hover:bg-muted text-xl font-bold transition-all active:scale-95 px-12"
                >
                  Commencer
                </Button>
              </div>
            </div>

            <div className="relative order-1 lg:order-2 group">
              <div className="relative aspect-square md:aspect-[4/3] w-full rounded-[64px] overflow-hidden shadow-2xl border-[12px] border-white transition-transform duration-700 group-hover:scale-[1.02]">
                {heroImage && (
                  <Image 
                    src={heroImage.imageUrl}
                    alt={heroImage.description}
                    fill
                    className="object-cover transition-transform duration-10000 group-hover:scale-110"
                    priority
                    data-ai-hint={heroImage.imageHint}
                  />
                )}
                {/* Visual accents */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
                <div className="absolute top-10 left-10 p-5 bg-white/95 backdrop-blur-md rounded-[32px] shadow-2xl flex items-center gap-4 animate-bounce duration-[3000ms]">
                  <div className="w-12 h-12 rounded-[20px] bg-primary flex items-center justify-center text-white">
                    <Sparkles className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="text-[11px] font-black uppercase text-muted-foreground leading-none tracking-widest">Orientation</p>
                    <p className="text-base font-black text-foreground">Objectif Réussite</p>
                  </div>
                </div>
              </div>
              {/* Decorative elements */}
              <div className="absolute -bottom-10 -right-10 w-48 h-48 bg-primary/20 rounded-full blur-[100px] -z-10 group-hover:opacity-100 transition-opacity" />
              <div className="absolute -top-10 -left-10 w-48 h-48 bg-primary/10 rounded-full blur-[100px] -z-10" />
            </div>
          </div>
        )}
      </div>

      {/* Persistent Footer Credit */}
      <div className="absolute bottom-10 left-0 right-0 flex justify-center pointer-events-none">
        <div className={cn(
          "text-[10px] font-black uppercase tracking-[0.4em] transition-opacity duration-1000",
          step < 5 ? "text-primary/40" : "text-muted-foreground/20"
        )}>
          NeoStud — EdTech Premium
        </div>
      </div>
    </div>
  );
}