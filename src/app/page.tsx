
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
      "min-h-screen transition-colors duration-1000 flex items-center justify-center overflow-hidden relative",
      step < 5 ? "bg-splash-gradient" : "bg-black"
    )}>
      {/* Background Glows during Splash */}
      {step < 5 && (
        <div className="absolute inset-0 opacity-20 pointer-events-none overflow-hidden">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/30 rounded-full blur-[160px] animate-pulse" />
        </div>
      )}

      {/* Full Screen Image Background for Hero */}
      {step === 5 && heroImage && (
        <div className="absolute inset-0 z-0 animate-in fade-in duration-1000">
          <Image 
            src={heroImage.imageUrl}
            alt={heroImage.description}
            fill
            className="object-cover"
            priority
            data-ai-hint={heroImage.imageHint}
          />
          {/* Subtle Overlay to make text pop */}
          <div className="absolute inset-0 bg-black/50 backdrop-blur-[1px]" />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/40" />
        </div>
      )}

      <div className={cn(
        "relative z-10 w-full transition-all duration-1000",
        step === 5 ? "max-w-4xl px-6" : "max-w-xl text-center"
      )}>
        {/* Splash Sequence: Words in vibrant Mauve */}
        {step < 4 && (
          <p 
            className={cn(
              "text-primary text-4xl md:text-7xl font-display font-black tracking-tight transition-all duration-1000",
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
                <svg width="600" height="160" viewBox="0 0 600 160" fill="none" xmlns="http://www.w3.org/2000/svg" className="drop-shadow-[0_0_50px_rgba(108,43,255,0.6)]">
                  <defs>
                    <filter id="liquid" x="-20%" y="-20%" width="140%" height="140%">
                      <feGaussianBlur in="SourceGraphic" stdDeviation="3" result="blur" />
                      <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 20 -8" result="liquid" />
                    </filter>
                  </defs>
                  <g filter="url(#liquid)">
                    <text x="50%" y="55%" dominantBaseline="middle" textAnchor="middle" className="fill-primary font-display font-black text-8xl lowercase" style={{ letterSpacing: '0.15em' }}>
                      neostud
                    </text>
                  </g>
                </svg>
             </div>
             {/* Subtitle Premium appearing under the logo */}
             <div className="mt-4 text-primary/60 text-[10px] font-black uppercase tracking-[1em] animate-in fade-in slide-in-from-top-2 duration-1000 delay-500">
               Premium
             </div>
          </div>
        )}

        {/* Hero Section Immersive & Centered */}
        {step === 5 && (
          <div className="flex flex-col items-center text-center space-y-12 animate-in fade-in zoom-in-95 duration-1000">
            <div className="space-y-6">
              <div className="inline-flex items-center gap-3 px-6 py-3 bg-white/10 backdrop-blur-xl border border-white/20 rounded-full text-white text-[12px] font-black uppercase tracking-[0.3em]">
                <Sparkles className="w-4 h-4 text-primary" />
                L'éducation réinventée — Premium
              </div>
              <h2 className="text-6xl md:text-9xl font-display font-black text-white tracking-tighter leading-none">
                Ton avenir <br/> commence <span className="text-primary">ici.</span>
              </h2>
              <p className="text-white/80 text-xl md:text-2xl font-medium leading-relaxed max-w-2xl mx-auto">
                Neostud t'accompagne pour apprendre, progresser et construire ton parcours avec brio.
              </p>
            </div>
            
            <div className="w-full max-w-sm mx-auto">
              <Button 
                onClick={handleStart}
                size="lg"
                className="h-24 w-full rounded-[40px] bg-primary text-white hover:bg-primary/90 text-2xl font-bold shadow-2xl shadow-primary/40 gap-5 group transition-all active:scale-95"
              >
                Explorer Neostud
                <ArrowRight className="w-7 h-7 group-hover:translate-x-2 transition-transform" />
              </Button>
            </div>
          </div>
        )}
      </div>

      {/* Persistent Footer Credit */}
      <div className="absolute bottom-10 left-0 right-0 flex justify-center pointer-events-none z-20">
        <div className={cn(
          "text-[10px] font-black uppercase tracking-[0.5em] transition-opacity duration-1000",
          step < 5 ? "text-primary/40" : "text-white/20"
        )}>
          NeoStud — EdTech Premium
        </div>
      </div>
    </div>
  );
}
