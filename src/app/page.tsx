
"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useApp } from '@/lib/store';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
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
      await new Promise(r => setTimeout(r, 1200));
      
      for (let i = 0; i < INTRO_WORDS.length; i++) {
        setStep(i);
        setIsVisible(true);
        await new Promise(r => setTimeout(r, 2500));
        setIsVisible(false);
        await new Promise(r => setTimeout(r, 1000));
      }

      setStep(4);
      setIsVisible(true);
      await new Promise(r => setTimeout(r, 4000));
      setIsVisible(false);
      await new Promise(r => setTimeout(r, 1200));
      
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
      "min-h-screen transition-colors duration-[2000ms] flex items-center justify-center overflow-hidden relative",
      step < 5 ? "bg-[#05030A]" : "bg-black"
    )}>
      {/* Background Glows during Splash */}
      {step < 5 && (
        <div className="absolute inset-0 opacity-10 pointer-events-none overflow-hidden">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/20 rounded-full blur-[160px] animate-pulse" />
        </div>
      )}

      {/* Full Screen Image Background for Hero - Immersif et sans déformation */}
      {step === 5 && heroImage && (
        <div className="absolute inset-0 z-0 animate-in fade-in duration-[2000ms]">
          <Image 
            src={heroImage.imageUrl}
            alt={heroImage.description}
            fill
            className="object-cover object-center"
            priority
            quality={100}
            data-ai-hint={heroImage.imageHint}
          />
          <div className="absolute inset-0 bg-black/40" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20" />
        </div>
      )}

      <div className={cn(
        "relative z-10 w-full transition-all duration-[1500ms]",
        step === 5 ? "max-w-md px-6" : "max-w-xl text-center"
      )}>
        {/* Splash Sequence */}
        {step < 4 && (
          <p 
            className={cn(
              "text-primary text-4xl md:text-7xl font-display font-black tracking-tight transition-all duration-[1500ms]",
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            )}
          >
            {INTRO_WORDS[step]}
          </p>
        )}

        {/* Logo Signature NEOSTUD */}
        {step === 4 && (
          <div className={cn(
            "flex flex-col items-center transition-all duration-[2000ms]",
            isVisible ? "opacity-100 scale-100" : "opacity-0 scale-95"
          )}>
             <div className="flex items-center gap-3">
                <span className="text-white font-sans font-medium text-6xl md:text-7xl tracking-tighter">
                  neostud
                </span>
                <svg width="60" height="60" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="mt-2">
                  <circle cx="70" cy="30" r="8" fill="#FF0000" />
                  <path d="M70 42C70 42 60 45 60 60V85H70V65H80V85H90V60C90 45 80 42 80 42H70Z" fill="#FF0000" />
                  <path d="M85 45L95 40L95 60L85 65V45Z" fill="#FF0000" />
                </svg>
             </div>
          </div>
        )}

        {/* Hero Hub - Minimalisme total */}
        {step === 5 && (
          <div className="flex flex-col items-center justify-center min-h-screen animate-in fade-in zoom-in-95 duration-[2000ms]">
            <Button 
              onClick={handleStart}
              size="lg"
              className="h-24 w-full rounded-[40px] bg-primary text-white hover:bg-primary/90 text-2xl font-bold shadow-2xl shadow-primary/40 transition-all active:scale-95 border-none"
            >
              Explorer Neostud
            </Button>
          </div>
        )}
      </div>

      {/* Persistent Footer Credit */}
      <div className="absolute bottom-10 left-0 right-0 flex justify-center pointer-events-none z-20">
        <div className={cn(
          "text-[10px] font-black uppercase tracking-[0.5em] transition-opacity duration-[2000ms]",
          step < 5 ? "text-white/10" : "text-white/20"
        )}>
          NeoStud
        </div>
      </div>
    </div>
  );
}
