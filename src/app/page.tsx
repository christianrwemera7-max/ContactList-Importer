"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useApp } from '@/lib/store';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

const INTRO_WORDS = [
  "Apprendre.",
  "Comprendre.",
  "Progresser.",
  "Construire son avenir."
];

export default function SplashPage() {
  const { state } = useApp();
  const router = useRouter();
  const [step, setStep] = useState(0); // 0-3: Words, 4: NEOSTUD, 5: Start Button
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Séquence d'introduction
    const sequence = async () => {
      // Attendre un peu avant de commencer
      await new Promise(r => setTimeout(r, 1000));
      
      // Cycle à travers les mots
      for (let i = 0; i < INTRO_WORDS.length; i++) {
        setStep(i);
        setIsVisible(true);
        await new Promise(r => setTimeout(r, 2000)); // Temps d'affichage
        setIsVisible(false);
        await new Promise(r => setTimeout(r, 800));  // Temps de transition
      }

      // Étape NEOSTUD
      setStep(4);
      setIsVisible(true);
      await new Promise(r => setTimeout(r, 3000));
      
      // Étape finale : bouton
      setStep(5);
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

  return (
    <div className="min-h-screen bg-splash-gradient flex items-center justify-center overflow-hidden relative">
      {/* Halo de lumière en arrière-plan */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-white rounded-full blur-[120px] animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-lavender-400 rounded-full blur-[120px] animate-pulse" />
      </div>

      <div className="relative z-10 text-center px-6 max-w-lg w-full">
        {step < 4 && (
          <p 
            className={cn(
              "text-white text-xl md:text-2xl font-display font-medium tracking-tight transition-all duration-1000",
              isVisible ? "opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-4 scale-95"
            )}
          >
            {INTRO_WORDS[step]}
          </p>
        )}

        {step === 4 && (
          <div className="flex flex-col items-center gap-6">
             <div className="w-16 h-16 bg-white rounded-[24px] flex items-center justify-center shadow-2xl animate-bounce">
                <svg width="32" height="32" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 28V12L28 28V12" stroke="#6C2BFF" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
             </div>
             <h1 
              className={cn(
                "text-5xl md:text-6xl font-display font-black text-white tracking-tighter transition-all duration-1000",
                isVisible ? "opacity-100 scale-100" : "opacity-0 scale-90"
              )}
            >
              NEOSTUD
            </h1>
          </div>
        )}

        {step === 5 && (
          <div className="space-y-12 animate-in fade-in zoom-in duration-1000">
            <div className="space-y-4">
              <h2 className="text-4xl md:text-5xl font-display font-black text-white tracking-tighter">
                Réussis tes études avec brio.
              </h2>
              <p className="text-white/70 text-lg font-medium leading-relaxed">
                Le compagnon numérique tout-en-un pour organiser, réviser et collaborer.
              </p>
            </div>
            
            <Button 
              onClick={handleStart}
              size="lg"
              className="w-full h-16 rounded-[24px] bg-white text-primary hover:bg-white/90 text-lg font-bold shadow-2xl gap-3 group transition-all active:scale-95"
            >
              Commencer l'expérience
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>
        )}
      </div>

      {/* Texte de bas de page discret */}
      {step === 5 && (
        <div className="absolute bottom-10 text-white/40 text-[10px] font-black uppercase tracking-[0.3em] animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-500">
          NeoStud — EdTech Premium
        </div>
      )}
    </div>
  );
}
