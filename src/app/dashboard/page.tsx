
"use client";

import React from 'react';
import { useApp } from '@/lib/store';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';

const EXPLORATION_WINDOWS = [
  { 
    name: 'Étude', 
    description: 'Vos notes et ressources de cours.',
    href: '/study', 
    color: 'bg-blue-500',
    shadow: 'shadow-blue-500/20',
    tag: 'Portail'
  },
  { 
    name: 'Focus', 
    description: 'Sessions de révision chronométrées.',
    href: '/study-sessions', 
    color: 'bg-orange',
    shadow: 'shadow-orange/20',
    tag: 'Timer'
  },
  { 
    name: 'Academy', 
    description: 'Quiz et évaluation de connaissances.',
    href: '/academy', 
    color: 'bg-primary',
    shadow: 'shadow-primary/20',
    tag: 'Quiz'
  },
  { 
    name: 'Communauté', 
    description: 'Groupes d\'étude et feed social.',
    href: '/community', 
    color: 'bg-pink-500',
    shadow: 'shadow-pink-500/20',
    tag: 'Social'
  },
  { 
    name: 'Défis', 
    description: 'Objectifs quotidiens et XP.',
    href: '/challenges', 
    color: 'bg-yellow-500',
    shadow: 'shadow-yellow-500/20',
    tag: 'Succès'
  },
  { 
    name: 'Partenaires', 
    description: 'Trouvez vos compagnons d\'étude.',
    href: '/explorer', 
    color: 'bg-cyan-500',
    shadow: 'shadow-cyan-500/20',
    tag: 'Match'
  },
];

export default function DashboardHubPage() {
  const { state, logout } = useApp();
  const router = useRouter();

  const handleLogout = async () => {
    await logout();
    router.push('/login');
  };

  return (
    <div className="min-h-screen bg-[#F8F7FC] flex flex-col">
      {/* Header Hub */}
      <header className="p-6 md:p-10 flex items-center justify-between">
        <div className="flex items-center gap-6">
          <Avatar className="w-16 h-16 border-4 border-white shadow-xl">
            <AvatarImage src={state.profile?.photo_url || ''} />
            <AvatarFallback className="bg-primary/10 text-primary font-bold text-2xl">
              {state.profile?.first_name?.[0]}
            </AvatarFallback>
          </Avatar>
          <div>
            <h1 className="text-3xl font-display font-black leading-none tracking-tight">Exploration</h1>
            <p className="text-[10px] text-muted-foreground font-black uppercase tracking-[0.3em] mt-2">
              Utilisateur : {state.profile?.first_name}
            </p>
          </div>
        </div>
        
        <div className="flex items-center gap-4">
          <Button 
            asChild 
            variant="ghost" 
            className="rounded-full bg-white shadow-sm hover:bg-white/80 px-6 font-black uppercase tracking-widest text-[10px]"
          >
            <Link href="/profile">Profil</Link>
          </Button>
          <Button 
            onClick={handleLogout}
            variant="ghost" 
            className="rounded-full bg-white shadow-sm hover:bg-destructive/5 hover:text-destructive px-6 font-black uppercase tracking-widest text-[10px]"
          >
            Quitter
          </Button>
        </div>
      </header>

      {/* Grid de Fenêtres */}
      <main className="flex-1 max-w-6xl mx-auto w-full p-6 md:p-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 pb-10">
          {EXPLORATION_WINDOWS.map((window) => (
            <Link 
              key={window.name} 
              href={window.href}
              className="group relative"
            >
              <div className={cn(
                "h-72 rounded-[64px] bg-white p-10 flex flex-col justify-between transition-all duration-500 hover:-translate-y-4 hover:shadow-2xl",
                window.shadow
              )}>
                <div className="flex justify-between items-start">
                  <div className={cn(
                    "px-4 py-1 rounded-full text-white font-black uppercase tracking-widest text-[9px]",
                    window.color
                  )}>
                    {window.tag}
                  </div>
                  <div className="w-1.5 h-1.5 rounded-full bg-muted group-hover:bg-primary transition-colors" />
                </div>
                
                <div className="space-y-3">
                  <h2 className="text-3xl font-display font-black text-foreground tracking-tight">{window.name}</h2>
                  <p className="text-xs text-muted-foreground font-bold leading-relaxed opacity-60">
                    {window.description}
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-black uppercase tracking-widest text-primary opacity-0 group-hover:opacity-100 transition-opacity translate-x-[-10px] group-hover:translate-x-0 duration-500">
                    Entrer
                  </span>
                  <div className="h-[1px] flex-1 bg-muted group-hover:bg-primary/20 transition-colors" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </main>

      {/* Footer minimaliste */}
      <footer className="p-10 text-center">
        <div className="inline-flex items-center gap-3 px-6 py-3 bg-white rounded-full shadow-sm text-[9px] font-black uppercase tracking-[0.4em] text-muted-foreground">
          <div className="w-1.5 h-1.5 rounded-full bg-green-500" />
          Accès Premium Actif
        </div>
      </footer>
    </div>
  );
}
