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
      // Temps de réflexion initial
      await new Promise(r => setTimeout(r, 2000));
      
      for (let i = 0; i < INTRO_WORDS.length; i++) {
        setStep(i);
        setIsVisible(true);
        // Chaque mot reste affiché 3 secondes pour la solennité
        await new Promise(r => setTimeout(r, 3000));
        setIsVisible(false);
        // Intervalle entre les mots
        await new Promise(r => setTimeout(r, 1200));
      }

      // Étape du Logo Officiel (Cloudinary)
      setStep(4);
      setIsVisible(true);
      await new Promise(r => setTimeout(r, 5000));
      setIsVisible(false);
      await new Promise(r => setTimeout(r, 2000));
      
      // Hero Hub Final
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
  const logoImage = placeholderData.placeholderImages.find(img => img.id === 'official-logo');

  return (
    <div className={cn(
      "min-h-screen transition-colors duration-[3000ms] flex items-center justify-center overflow-hidden relative",
      step < 5 ? "bg-[#05030A]" : "bg-black"
    )}>
      {/* Background Glows pendant le Splash */}
      {step < 5 && (
        <div className="absolute inset-0 opacity-20 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/10 rounded-full blur-[180px] animate-pulse" />
        </div>
      )}

      {/* Fond d'écran Immersif Cloudinary */}
      {step === 5 && heroImage && (
        <div className="absolute inset-0 z-0 animate-in fade-in duration-[4000ms]">
          <Image 
            src={heroImage.imageUrl}
            alt="Hero Neostud"
            fill
            className="object-cover object-center scale-105"
            priority
            quality={100}
          />
          <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px]" />
        </div>
      )}

      <div className={cn(
        "relative z-10 w-full transition-all duration-[3000ms]",
        step === 5 ? "max-w-md px-6" : "max-w-4xl text-center"
      )}>
        {/* Séquence des Mots */}
        {step < 4 && (
          <p 
            className={cn(
              "text-primary text-5xl md:text-8xl font-display font-black tracking-tighter transition-all duration-[2500ms] italic text-glow",
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
            )}
          >
            {INTRO_WORDS[step]}
          </p>
        )}

        {/* Logo Signature Cloudinary */}
        {step === 4 && logoImage && (
          <div className={cn(
            "flex flex-col items-center transition-all duration-[3000ms]",
            isVisible ? "opacity-100 scale-100" : "opacity-0 scale-95"
          )}>
             <div className="relative w-80 h-44 md:w-[600px] md:h-[300px]">
                <Image 
                  src={logoImage.imageUrl}
                  alt="neostud"
                  fill
                  className="object-contain"
                  priority
                />
             </div>
          </div>
        )}

        {/* Bouton d'Exploration Central */}
        {step === 5 && (
          <div className="flex flex-col items-center justify-center min-h-screen animate-in fade-in zoom-in-95 duration-[3000ms]">
            <Button 
              onClick={handleStart}
              className="h-28 w-full rounded-[48px] bg-primary text-white hover:bg-primary/90 text-3xl font-black uppercase tracking-[0.2em] shadow-2xl shadow-primary/40 border-none"
            >
              Explorer Neostud
            </Button>
          </div>
        )}
      </div>

      {/* Crédit de Marque */}
      <div className="absolute bottom-12 left-0 right-0 flex justify-center pointer-events-none z-20">
        <div className={cn(
          "text-[12px] font-black uppercase tracking-[0.8em] transition-opacity duration-[3000ms]",
          step < 5 ? "text-white/10" : "text-white/30"
        )}>
          NeoStud Premium
        </div>
      </div>
    </div>
  );
}