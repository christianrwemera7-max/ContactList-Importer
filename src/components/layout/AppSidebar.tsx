
"use client"

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { 
  LayoutDashboard, 
  Users, 
  GraduationCap, 
  Briefcase, 
  ShieldCheck, 
  LogOut,
  Rocket,
  Zap,
  Search
} from 'lucide-react';
import { APP_NAME } from '@/lib/constants';

const navigation = [
  { name: 'KONEKT Flow', href: '/dashboard', icon: LayoutDashboard },
  { name: 'Explorer', href: '/explorer', icon: Search },
  { name: 'Ma Cellule', href: '/community', icon: Users },
  { name: 'Academy', href: '/academy', icon: GraduationCap },
  { name: 'Opportunités', href: '/opportunities', icon: Briefcase },
  { name: 'Project Lab', href: '/opportunities?tab=projects', icon: Rocket },
  { name: 'Gouvernance', href: '/governance', icon: ShieldCheck },
];

export function AppSidebar() {
  const pathname = usePathname();

  return (
    <div className="hidden md:flex flex-col w-72 bg-ink border-r border-white/5 h-screen fixed left-0 top-0 z-50">
      <div className="p-8">
        <Link href="/" className="flex items-center gap-3 mb-10 group">
          <KonektLogo />
          <h1 className="text-2xl font-display font-bold tracking-tighter text-white group-hover:text-orange transition-colors">
            {APP_NAME}
          </h1>
        </Link>

        <div className="glass-card p-6 rounded-[2rem] border-orange/20 relative overflow-hidden group bg-surface/40">
          <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:rotate-12 transition-transform">
            <Zap className="w-12 h-12 text-orange" />
          </div>
          <div className="relative z-10 space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-[9px] font-mono text-muted uppercase tracking-[0.2em] font-black">Score Valeur</span>
              <span className="text-sm font-bold text-orange">850</span>
            </div>
            <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
              <div className="h-full bg-orange w-[85%] transition-all duration-1000" />
            </div>
            <p className="text-[9px] text-muted leading-tight font-medium">Cellule Gombe #014</p>
          </div>
        </div>
      </div>
      
      <nav className="flex-1 px-4 space-y-2 overflow-y-auto no-scrollbar">
        {navigation.map((item) => {
          const isActive = pathname === item.href || (item.href.includes('?') && pathname === item.href.split('?')[0]);
          return (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                "flex items-center gap-4 px-5 py-3.5 rounded-2xl text-xs font-black uppercase tracking-widest transition-all group",
                isActive 
                  ? "bg-orange/10 text-orange border border-orange/20" 
                  : "text-muted hover:bg-white/5 hover:text-white"
              )}
            >
              <item.icon className={cn("w-4 h-4 transition-colors", isActive ? "text-orange" : "text-muted group-hover:text-white")} />
              {item.name}
            </Link>
          );
        })}
      </nav>

      <div className="p-6 border-t border-white/5 space-y-2">
        <Link
          href="/profile"
          className="flex items-center gap-4 px-5 py-4 rounded-2xl text-xs font-black uppercase tracking-widest text-muted hover:bg-white/5 hover:text-white transition-all"
        >
          <div className="w-8 h-8 rounded-lg bg-surface flex items-center justify-center font-display text-xs border border-white/5 text-orange">CR</div>
          Mon ID KONEKT
        </Link>
        <button className="w-full flex items-center gap-4 px-5 py-3.5 rounded-2xl text-xs font-black uppercase tracking-widest text-destructive hover:bg-destructive/5 transition-colors text-left">
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
      <circle cx="8" cy="8" r="3.4" fill="#FF6B00"/>
      <circle cx="8" cy="26" r="3.4" fill="#3B82F6"/>
      <circle cx="26" cy="17" r="3.6" fill="#FF6B00"/>
      <line x1="8" y1="8" x2="26" y2="17" stroke="rgba(255,255,255,0.1)" strokeWidth="1.6"/>
      <line x1="8" y1="26" x2="26" y2="17" stroke="rgba(255,255,255,0.1)" strokeWidth="1.6"/>
    </svg>
  );
}
