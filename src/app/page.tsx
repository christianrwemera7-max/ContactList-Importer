
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
  const [step, setStep] = useState(0); 
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
        step === 5 ? "max-w-7xl px-6 md:px-12" : "max-w-xl text-center"
      )}>
        {/* Splash Sequence: Words in vibrant Mauve */}
        {step < 4 && (
          <p 
            className={cn(
              "text-primary text-3xl md:text-6xl font-display font-black tracking-tight transition-all duration-1000",
              isVisible ? "opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-4 scale-95"
            )}
          >
            {INTRO_WORDS[step]}
          </p>
        )}

        {/* Wordmark "neostud" Liquide Magnifié */}
        {step === 4 && (
          <div className={cn(
            "flex flex-col items-center transition-all duration-2000",
            isVisible ? "opacity-100 scale-110" : "opacity-0 scale-90"
          )}>
             <div className="relative group">
                <svg width="600" height="160" viewBox="0 0 600 160" fill="none" xmlns="http://www.w3.org/2000/svg" className="drop-shadow-[0_0_50px_rgba(108,43,255,0.5)]">
                  <defs>
                    <filter id="liquid" x="-20%" y="-20%" width="140%" height="140%">
                      <feGaussianBlur in="SourceGraphic" stdDeviation="3" result="blur" />
                      <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 20 -8" result="liquid" />
                    </filter>
                  </defs>
                  <g filter="url(#liquid)">
                    <text x="50%" y="55%" dominantBaseline="middle" textAnchor="middle" className="fill-primary font-display font-black text-8xl lowercase" style={{ letterSpacing: '0.1em' }}>
                      neostud
                    </text>
                  </g>
                </svg>
                <div className="absolute inset-0 bg-primary/20 blur-[120px] rounded-full opacity-40 -z-10" />
             </div>
          </div>
        )}

        {/* Hero Section Massive & Immersive */}
        {step === 5 && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center py-12 md:py-16 animate-in fade-in slide-in-from-bottom-12 duration-1000">
            {/* Colonne Texte : 5/12 */}
            <div className="lg:col-span-5 space-y-12 order-2 lg:order-1">
              <div className="space-y-8">
                <div className="inline-flex items-center gap-3 px-5 py-2.5 bg-primary/10 rounded-full text-primary text-[11px] font-black uppercase tracking-[0.25em]">
                  <Sparkles className="w-4 h-4" />
                  L'éducation réinventée
                </div>
                <h2 className="text-6xl md:text-8xl font-display font-black text-foreground tracking-tighter leading-[0.82] lg:pr-10">
                  Ton avenir <br/> commence <br/> <span className="text-primary">ici.</span>
                </h2>
                <p className="text-muted-foreground text-xl md:text-2xl font-medium leading-relaxed max-w-md">
                  Neostud t'accompagne pour apprendre, progresser et construire ton parcours avec brio.
                </p>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-5 pt-4">
                <Button 
                  onClick={handleStart}
                  size="lg"
                  className="h-24 rounded-[40px] bg-primary text-white hover:bg-primary/90 text-2xl font-bold shadow-2xl shadow-primary/30 gap-5 group transition-all active:scale-95 px-14"
                >
                  Explorer Neostud
                  <ArrowRight className="w-7 h-7 group-hover:translate-x-2 transition-transform" />
                </Button>
                <Button 
                  onClick={handleStart}
                  variant="outline"
                  size="lg"
                  className="h-24 rounded-[40px] border-2 border-border bg-white text-foreground hover:bg-muted text-2xl font-bold transition-all active:scale-95 px-14"
                >
                  Commencer
                </Button>
              </div>
            </div>

            {/* Colonne Image Portrait : 7/12 */}
            <div className="lg:col-span-7 relative order-1 lg:order-2">
              <div className="relative aspect-[3/4] md:aspect-[4/5] lg:aspect-[3/4] w-full max-w-[600px] mx-auto rounded-[80px] overflow-hidden shadow-[0_40px_100px_rgba(0,0,0,0.1)] border-[16px] border-white transition-transform duration-700 hover:scale-[1.01]">
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
                
                {/* Visual Overlays */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />
                
                {/* Badge Flottant Premium */}
                <div className="absolute top-12 right-12 p-6 bg-white/95 backdrop-blur-md rounded-[40px] shadow-2xl flex items-center gap-5 animate-bounce duration-[4000ms]">
                  <div className="w-14 h-14 rounded-[24px] bg-primary flex items-center justify-center text-white shadow-lg shadow-primary/20">
                    <Sparkles className="w-8 h-8" />
                  </div>
                  <div className="pr-2">
                    <p className="text-[12px] font-black uppercase text-muted-foreground leading-none tracking-[0.15em] mb-1">Objectif</p>
                    <p className="text-lg font-black text-foreground">Réussite 2024</p>
                  </div>
                </div>

                {/* Badge Stats Flottant */}
                <div className="absolute bottom-12 left-12 p-6 bg-primary/95 backdrop-blur-md rounded-[40px] shadow-2xl flex items-center gap-5 text-white">
                  <div className="w-14 h-14 rounded-[24px] bg-white/20 flex items-center justify-center">
                    <div className="text-xl font-black">98%</div>
                  </div>
                  <div>
                    <p className="text-[12px] font-black uppercase opacity-60 leading-none tracking-[0.15em] mb-1">Taux de</p>
                    <p className="text-lg font-black">Progression</p>
                  </div>
                </div>
              </div>

              {/* Decorative Glows */}
              <div className="absolute -bottom-20 -right-20 w-80 h-80 bg-primary/20 rounded-full blur-[140px] -z-10" />
              <div className="absolute -top-20 -left-20 w-60 h-60 bg-primary/10 rounded-full blur-[100px] -z-10" />
            </div>
          </div>
        )}
      </div>

      {/* Persistent Footer Credit */}
      <div className="absolute bottom-10 left-0 right-0 flex justify-center pointer-events-none">
        <div className={cn(
          "text-[10px] font-black uppercase tracking-[0.5em] transition-opacity duration-1000",
          step < 5 ? "text-primary/40" : "text-muted-foreground/20"
        )}>
          NeoStud — EdTech Premium
        </div>
      </div>
    </div>
  );
}
