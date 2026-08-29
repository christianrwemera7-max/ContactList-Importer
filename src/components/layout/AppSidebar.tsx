
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
  UserCircle,
  LogOut,
  Rocket,
  Zap,
  Search
} from 'lucide-react';
import { APP_NAME } from '@/lib/constants';

const navigation = [
  { name: 'KONEKT Flow', href: '/dashboard', icon: LayoutDashboard },
  { name: 'Explorer', href: '/explorer', icon: Search },
  { name: 'Cellules', href: '/community', icon: Users },
  { name: 'KONEKT Academy', href: '/academy', icon: GraduationCap },
  { name: 'Opportunités', href: '/opportunities', icon: Briefcase },
  { name: 'Project Lab', href: '/opportunities?tab=projects', icon: Rocket },
  { name: 'Gouvernance', href: '/governance', icon: ShieldCheck },
];

export function AppSidebar() {
  const pathname = usePathname();

  return (
    <div className="hidden md:flex flex-col w-72 bg-ink border-r border-border h-screen fixed left-0 top-0 z-50 connected-nodes">
      <div className="p-8">
        <Link href="/" className="flex items-center gap-3 mb-10 group">
          <KonektLogo />
          <h1 className="text-2xl font-display font-bold tracking-tighter group-hover:text-primary transition-colors">
            {APP_NAME}
          </h1>
        </Link>

        <div className="glass-card p-6 rounded-[2rem] border-primary/20 relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:rotate-12 transition-transform">
            <Zap className="w-12 h-12 text-primary" />
          </div>
          <div className="relative z-10 space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-[10px] font-mono text-muted uppercase tracking-widest">KONEKT Score</span>
              <span className="text-sm font-bold text-orange">850</span>
            </div>
            <div className="h-1.5 w-full bg-surface-3 rounded-full overflow-hidden">
              <div className="h-full bg-primary w-[75%]" />
            </div>
            <p className="text-[9px] text-muted leading-tight">Prochaine étape : Leader Expérimenté</p>
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
                "flex items-center gap-4 px-5 py-3.5 rounded-2xl text-sm font-bold transition-all group",
                isActive 
                  ? "bg-blue/10 text-blue-bright border border-blue/20" 
                  : "text-muted hover:bg-surface-2 hover:text-text"
              )}
            >
              <item.icon className={cn("w-5 h-5 transition-colors", isActive ? "text-blue-bright" : "text-muted group-hover:text-text")} />
              {item.name}
            </Link>
          );
        })}
      </nav>

      <div className="p-6 border-t border-border space-y-2">
        <Link
          href="/profile"
          className="flex items-center gap-4 px-5 py-4 rounded-2xl text-sm font-bold text-muted hover:bg-surface-2 hover:text-text transition-all"
        >
          <div className="w-8 h-8 rounded-lg bg-surface-3 flex items-center justify-center font-display text-xs border border-border text-blue-bright">JK</div>
          Mon KONEKT ID
        </Link>
        <button className="w-full flex items-center gap-4 px-5 py-3.5 rounded-2xl text-sm font-bold text-destructive hover:bg-destructive/5 transition-colors text-left">
          <LogOut className="w-5 h-5" />
          Déconnexion
        </button>
      </div>
    </div>
  );
}

function KonektLogo() {
  return (
    <svg width="28" height="28" viewBox="0 0 34 34" fill="none">
      <circle cx="8" cy="8" r="3.4" fill="#3B82F6"/>
      <circle cx="8" cy="26" r="3.4" fill="#3B82F6"/>
      <circle cx="26" cy="17" r="3.6" fill="#FF6B00"/>
      <line x1="8" y1="8" x2="26" y2="17" stroke="#1E3A8A" strokeWidth="1.6"/>
      <line x1="8" y1="26" x2="26" y2="17" stroke="#1E3A8A" strokeWidth="1.6"/>
      <line x1="8" y1="8" x2="8" y2="26" stroke="#1E3A8A" strokeWidth="1.6"/>
    </svg>
  );
}
