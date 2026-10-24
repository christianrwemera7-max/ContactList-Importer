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
    <div className="min-h-screen bg-[#F8F7FC] flex flex-col no-scrollbar">
      {/* Header Hub Épuré */}
      <header className="p-8 md:p-12 flex items-center justify-between">
        <div className="flex items-center gap-8">
          <div className="relative">
            <Avatar className="w-20 h-20 border-4 border-white shadow-2xl">
              <AvatarImage src={state.profile?.photo_url || ''} />
              <AvatarFallback className="bg-primary/10 text-primary font-black text-3xl">
                {state.profile?.first_name?.[0]}
              </AvatarFallback>
            </Avatar>
            <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-500 border-4 border-white rounded-full" />
          </div>
          <div>
            <h1 className="text-4xl font-display font-black leading-none tracking-tight text-foreground uppercase italic">Exploration</h1>
            <p className="text-[11px] text-muted-foreground font-black uppercase tracking-[0.4em] mt-3">
              Session active : {state.profile?.first_name} {state.profile?.last_name}
            </p>
          </div>
        </div>
        
        <div className="flex items-center gap-6">
          <Button 
            asChild 
            variant="ghost" 
            className="rounded-full bg-white shadow-sm hover:bg-white/80 px-8 h-12 font-black uppercase tracking-widest text-[11px] border-none"
          >
            <Link href="/profile">Profil</Link>
          </Button>
          <Button 
            onClick={handleLogout}
            variant="ghost" 
            className="rounded-full bg-white shadow-sm hover:bg-destructive/5 hover:text-destructive px-8 h-12 font-black uppercase tracking-widest text-[11px] border-none"
          >
            Quitter
          </Button>
        </div>
      </header>

      {/* Grid de Fenêtres Géantes */}
      <main className="flex-1 max-w-7xl mx-auto w-full p-8 md:p-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12 pb-20">
          {EXPLORATION_WINDOWS.map((window) => (
            <Link 
              key={window.name} 
              href={window.href}
              className="group relative"
            >
              <div className={cn(
                "h-80 rounded-[64px] bg-white p-12 flex flex-col justify-between transition-all duration-700 hover:-translate-y-6 hover:shadow-[0_40px_80px_rgba(0,0,0,0.06)]",
                window.shadow
              )}>
                <div className="flex justify-between items-start">
                  <div className={cn(
                    "px-6 py-2 rounded-full text-white font-black uppercase tracking-[0.2em] text-[10px]",
                    window.color
                  )}>
                    {window.tag}
                  </div>
                  <div className="w-2 h-2 rounded-full bg-muted group-hover:bg-primary transition-colors duration-500" />
                </div>
                
                <div className="space-y-4">
                  <h2 className="text-4xl font-display font-black text-foreground tracking-tighter uppercase">{window.name}</h2>
                  <p className="text-sm text-muted-foreground font-bold leading-relaxed opacity-60 max-w-[200px]">
                    {window.description}
                  </p>
                </div>

                <div className="flex items-center gap-4">
                  <span className="text-[11px] font-black uppercase tracking-[0.3em] text-primary opacity-0 group-hover:opacity-100 transition-all translate-x-[-20px] group-hover:translate-x-0 duration-700">
                    Entrer
                  </span>
                  <div className="h-[1px] flex-1 bg-muted group-hover:bg-primary/20 transition-colors duration-700" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </main>

      {/* Footer minimaliste */}
      <footer className="p-12 text-center">
        <div className="inline-flex items-center gap-4 px-8 py-4 bg-white rounded-full shadow-sm text-[10px] font-black uppercase tracking-[0.5em] text-muted-foreground/40">
          <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
          Protocole NeoStud Actif
        </div>
      </footer>
    </div>
  );
}