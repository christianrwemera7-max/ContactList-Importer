
"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useApp } from '@/lib/store';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
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
      "min-h-screen transition-colors duration-1000 flex items-center justify-center overflow-hidden relative",
      step < 5 ? "bg-[#05030A]" : "bg-black"
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
          <div className="absolute inset-0 bg-black/30 backdrop-blur-[1px]" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20" />
        </div>
      )}

      <div className={cn(
        "relative z-10 w-full transition-all duration-1000",
        step === 5 ? "max-w-md px-6" : "max-w-xl text-center"
      )}>
        {/* Splash Sequence */}
        {step < 4 && (
          <p 
            className={cn(
              "text-primary text-4xl md:text-7xl font-display font-black tracking-tight transition-all duration-1000",
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            )}
          >
            {INTRO_WORDS[step]}
          </p>
        )}

        {/* Wordmark "neostud" Liquide */}
        {step === 4 && (
          <div className={cn(
            "flex flex-col items-center transition-all duration-2000",
            isVisible ? "opacity-100 scale-100" : "opacity-0 scale-95"
          )}>
             <div className="relative">
                <svg width="500" height="120" viewBox="0 0 500 120" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <defs>
                    <filter id="liquid" x="-20%" y="-20%" width="140%" height="140%">
                      <feGaussianBlur in="SourceGraphic" stdDeviation="3" result="blur" />
                      <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 20 -8" result="liquid" />
                    </filter>
                  </defs>
                  <g filter="url(#liquid)">
                    <text x="50%" y="55%" dominantBaseline="middle" textAnchor="middle" className="fill-primary font-display font-black text-7xl lowercase" style={{ letterSpacing: '0.2em' }}>
                      neostud
                    </text>
                  </g>
                </svg>
             </div>
          </div>
        )}

        {/* Hero Hub - Ultra Minimalist */}
        {step === 5 && (
          <div className="flex flex-col items-center justify-center min-h-screen animate-in fade-in zoom-in-95 duration-1000">
            <Button 
              onClick={handleStart}
              size="lg"
              className="h-24 w-full rounded-[40px] bg-primary text-white hover:bg-primary/90 text-2xl font-bold shadow-2xl shadow-primary/40 gap-5 transition-all active:scale-95"
            >
              Explorer Neostud
              <ArrowRight className="w-7 h-7" />
            </Button>
          </div>
        )}
      </div>

      {/* Persistent Footer Credit */}
      <div className="absolute bottom-10 left-0 right-0 flex justify-center pointer-events-none z-20">
        <div className={cn(
          "text-[10px] font-black uppercase tracking-[0.5em] transition-opacity duration-1000",
          step < 5 ? "text-primary/40" : "text-white/20"
        )}>
          NeoStud
        </div>
      </div>
    </div>
  );
}
