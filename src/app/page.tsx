
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
      // Pause initiale plus longue
      await new Promise(r => setTimeout(r, 2000));
      
      for (let i = 0; i < INTRO_WORDS.length; i++) {
        setStep(i);
        setIsVisible(true);
        // Affichage du mot pendant 3 secondes
        await new Promise(r => setTimeout(r, 3000));
        setIsVisible(false);
        // Pause entre les mots de 1.2 seconde
        await new Promise(r => setTimeout(r, 1200));
      }

      // Étape du Logo Officiel
      setStep(4);
      setIsVisible(true);
      // Le logo reste affiché 5 secondes pour bien marquer l'esprit
      await new Promise(r => setTimeout(r, 5000));
      setIsVisible(false);
      // Pause de transition vers le Hero
      await new Promise(r => setTimeout(r, 2000));
      
      // Étape Hero Finale
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
      {/* Background Glows during Splash */}
      {step < 5 && (
        <div className="absolute inset-0 opacity-10 pointer-events-none overflow-hidden">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/20 rounded-full blur-[160px] animate-pulse" />
        </div>
      )}

      {/* Full Screen Image Background for Hero (HD Cloudinary) */}
      {step === 5 && heroImage && (
        <div className="absolute inset-0 z-0 animate-in fade-in duration-[3000ms]">
          <Image 
            src={heroImage.imageUrl}
            alt={heroImage.description}
            fill
            className="object-cover object-center"
            priority
            quality={100}
          />
          {/* Overlay subtil pour la lisibilité du bouton */}
          <div className="absolute inset-0 bg-black/30" />
        </div>
      )}

      <div className={cn(
        "relative z-10 w-full transition-all duration-[2500ms]",
        step === 5 ? "max-w-md px-6" : "max-w-xl text-center"
      )}>
        {/* Splash Sequence - Mots Mauves sur fond Mort */}
        {step < 4 && (
          <p 
            className={cn(
              "text-primary text-4xl md:text-7xl font-display font-black tracking-tighter transition-all duration-[2000ms] italic",
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            )}
          >
            {INTRO_WORDS[step]}
          </p>
        )}

        {/* Logo Officiel NEOSTUD - Version Cloudinary */}
        {step === 4 && logoImage && (
          <div className={cn(
            "flex flex-col items-center transition-all duration-[3000ms]",
            isVisible ? "opacity-100 scale-100" : "opacity-0 scale-95"
          )}>
             <div className="relative w-80 h-44 md:w-[500px] md:h-[250px]">
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

        {/* Hero Hub - Explorer Neostud au centre de l'image */}
        {step === 5 && (
          <div className="flex flex-col items-center justify-center min-h-screen animate-in fade-in zoom-in-95 duration-[3000ms]">
            <Button 
              onClick={handleStart}
              size="lg"
              className="h-24 w-full rounded-[40px] bg-primary text-white hover:bg-primary/90 text-2xl font-black uppercase tracking-widest shadow-2xl shadow-primary/40 transition-all active:scale-95 border-none"
            >
              Explorer Neostud
            </Button>
          </div>
        )}
      </div>

      {/* Persistent Footer Credit */}
      <div className="absolute bottom-10 left-0 right-0 flex justify-center pointer-events-none z-20">
        <div className={cn(
          "text-[10px] font-black uppercase tracking-[0.6em] transition-opacity duration-[3000ms]",
          step < 5 ? "text-white/10" : "text-white/20"
        )}>
          NeoStud
        </div>
      </div>
    </div>
  );
}
