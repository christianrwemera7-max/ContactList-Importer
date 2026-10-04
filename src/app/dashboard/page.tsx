
"use client";

import React from 'react';
import { useApp } from '@/lib/store';
import { 
  BookOpen, 
  Timer,
  GraduationCap,
  LayoutGrid,
  Trophy,
  Users,
  LogOut,
  Sparkles
} from 'lucide-react';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';

const EXPLORATION_WINDOWS = [
  { 
    name: 'Étude', 
    description: 'Vos notes et ressources de cours.',
    icon: BookOpen, 
    href: '/study', 
    color: 'bg-blue-500',
    shadow: 'shadow-blue-500/20'
  },
  { 
    name: 'Focus', 
    description: 'Sessions de révision chronométrées.',
    icon: Timer, 
    href: '/study-sessions', 
    color: 'bg-orange',
    shadow: 'shadow-orange/20'
  },
  { 
    name: 'Academy', 
    description: 'Quiz et évaluation de connaissances.',
    icon: Sparkles, 
    href: '/academy', 
    color: 'bg-primary',
    shadow: 'shadow-primary/20'
  },
  { 
    name: 'Communauté', 
    description: 'Groupes d\'étude et feed social.',
    icon: LayoutGrid, 
    href: '/community', 
    color: 'bg-pink-500',
    shadow: 'shadow-pink-500/20'
  },
  { 
    name: 'Défis', 
    description: 'Objectifs quotidiens et XP.',
    icon: Trophy, 
    href: '/challenges', 
    color: 'bg-yellow-500',
    shadow: 'shadow-yellow-500/20'
  },
  { 
    name: 'Partenaires', 
    description: 'Trouvez vos compagnons d\'étude.',
    icon: Users, 
    href: '/explorer', 
    color: 'bg-cyan-500',
    shadow: 'shadow-cyan-500/20'
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
        <div className="flex items-center gap-4">
          <Avatar className="w-14 h-14 border-4 border-white shadow-xl">
            <AvatarImage src={state.profile?.photo_url || ''} />
            <AvatarFallback className="bg-primary/10 text-primary font-bold text-xl">
              {state.profile?.first_name?.[0]}
            </AvatarFallback>
          </Avatar>
          <div>
            <h1 className="text-2xl font-display font-black leading-none">Exploration</h1>
            <p className="text-sm text-muted-foreground font-bold uppercase tracking-widest mt-1">
              Bonjour, {state.profile?.first_name}
            </p>
          </div>
        </div>
        
        <div className="flex items-center gap-3">
          <Button 
            asChild 
            variant="ghost" 
            size="icon" 
            className="rounded-full bg-white shadow-sm hover:bg-white/80"
          >
            <Link href="/profile"><LayoutGrid className="w-5 h-5 text-primary" /></Link>
          </Button>
          <Button 
            onClick={handleLogout}
            variant="ghost" 
            size="icon" 
            className="rounded-full bg-white shadow-sm hover:bg-destructive/5 hover:text-destructive"
          >
            <LogOut className="w-5 h-5" />
          </Button>
        </div>
      </header>

      {/* Grid de Fenêtres */}
      <main className="flex-1 max-w-6xl mx-auto w-full p-6 md:p-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 pb-10">
          {EXPLORATION_WINDOWS.map((window) => (
            <Link 
              key={window.name} 
              href={window.href}
              className="group relative"
            >
              <div className={cn(
                "h-64 rounded-[48px] bg-white p-8 flex flex-col justify-between transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl",
                window.shadow
              )}>
                <div className={cn(
                  "w-16 h-16 rounded-3xl flex items-center justify-center text-white transition-transform duration-500 group-hover:scale-110 group-hover:rotate-6",
                  window.color
                )}>
                  <window.icon className="w-8 h-8" />
                </div>
                
                <div className="space-y-2">
                  <h2 className="text-2xl font-display font-black text-foreground">{window.name}</h2>
                  <p className="text-sm text-muted-foreground font-medium leading-relaxed">
                    {window.description}
                  </p>
                </div>

                <div className="absolute top-8 right-8 opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center">
                    <ArrowRight className="w-5 h-5 text-foreground" />
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </main>

      {/* Footer minimaliste */}
      <footer className="p-10 text-center">
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-white rounded-full shadow-sm text-[10px] font-black uppercase tracking-widest text-muted-foreground">
          <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
          Mode Exploration Actif
        </div>
      </footer>
    </div>
  );
}
