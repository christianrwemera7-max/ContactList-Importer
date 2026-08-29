
"use client"

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { 
  Compass, 
  Users, 
  Rocket, 
  Library, 
  UserCircle2, 
  ShieldCheck, 
  LogOut,
  Zap
} from 'lucide-react';
import { HexFrame } from '@/components/ui/HexFrame';
import { useKonekt } from '@/lib/store';

const navigation = [
  { name: 'Feed', href: '/dashboard', icon: Compass },
  { name: 'Match', href: '/explorer', icon: Users },
  { name: 'Projets', href: '/opportunities?tab=projects', icon: Rocket },
  { name: 'Espace perso', href: '/profile', icon: UserCircle2 },
  { name: 'Bibliothèque', href: '/academy', icon: Library },
  { name: 'Gouvernance', href: '/governance', icon: ShieldCheck },
];

export function AppSidebar() {
  const pathname = usePathname();
  const { state } = useKonekt();
  const user = state.currentUser;

  return (
    <div className="hidden md:flex flex-col w-72 bg-ink border-r border-line h-screen fixed left-0 top-0 z-50">
      <div className="p-8">
        <Link href="/" className="flex items-center gap-3 mb-10 group">
          <KonektLogo />
          <h1 className="text-2xl font-display font-bold tracking-tighter text-text group-hover:text-gold transition-colors">
            KONEKT
          </h1>
        </Link>

        {user && (
          <div className="bg-surface p-5 rounded-[2rem] border border-line relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:rotate-12 transition-transform">
              <Zap className="w-12 h-12 text-teal" />
            </div>
            <div className="relative z-10 space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-[9px] font-mono text-muted uppercase tracking-[0.2em] font-black">Score Valeur</span>
                <span className="text-sm font-bold text-teal">{user.score}</span>
              </div>
              <div className="h-1.5 w-full bg-line rounded-full overflow-hidden">
                <div 
                  className="h-full bg-teal transition-all duration-1000" 
                  style={{ width: `${Math.min(100, (user.score / 1000) * 100)}%` }} 
                />
              </div>
              <p className="text-[9px] text-muted leading-tight font-medium uppercase tracking-widest">
                {state.currentCell?.name || 'Sans Cellule'}
              </p>
            </div>
          </div>
        )}
      </div>
      
      <nav className="flex-1 px-4 space-y-1 overflow-y-auto no-scrollbar">
        {navigation.map((item) => {
          const isActive = pathname === item.href || (item.href.includes('?') && pathname === item.href.split('?')[0]);
          return (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                "flex items-center gap-4 px-5 py-3.5 rounded-2xl text-xs font-bold uppercase tracking-[0.15em] transition-all group",
                isActive 
                  ? "bg-surface-2 text-gold border border-line" 
                  : "text-muted hover:bg-surface/50 hover:text-text"
              )}
            >
              <item.icon className={cn("w-4 h-4 transition-colors", isActive ? "text-gold" : "text-muted group-hover:text-text")} />
              {item.name}
            </Link>
          );
        })}
      </nav>

      <div className="p-6 border-t border-line space-y-3">
        {user && (
          <Link
            href="/profile"
            className="flex items-center gap-4 px-5 py-3 rounded-2xl text-[10px] font-bold uppercase tracking-widest text-muted hover:bg-surface-2 hover:text-text transition-all"
          >
            <HexFrame size={32} color={user.tier === 'PRO' ? '#E8A83C' : '#35C29B'}>
              {user.name[0]}
            </HexFrame>
            Mon ID KONEKT
          </Link>
        )}
        <button className="w-full flex items-center gap-4 px-5 py-3.5 rounded-2xl text-xs font-bold uppercase tracking-widest text-destructive hover:bg-destructive/10 transition-colors text-left">
          <LogOut className="w-4 h-4" />
          Déconnexion
        </button>
      </div>
    </div>
  );
}

function KonektLogo() {
  return (
    <svg width="28" height="28" viewBox="0 0 34 34" fill="none">
      <polygon points="17,1 33,9.5 33,26.5 17,35 1,26.5 1,9.5" fill="none" stroke="#E8A83C" strokeWidth="2.5"/>
      <polygon points="17,12 24,16.5 24,24.5 17,29 10,24.5 10,16.5" fill="#35C29B"/>
    </svg>
  );
}
