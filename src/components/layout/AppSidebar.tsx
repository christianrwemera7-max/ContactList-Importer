
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
  Settings,
  LogOut,
  Rocket,
  Zap
} from 'lucide-react';
import { APP_NAME } from '@/lib/constants';

const navigation = [
  { name: 'KONEKT Flow', href: '/dashboard', icon: LayoutDashboard },
  { name: 'Cellules', href: '/cells', icon: Users },
  { name: 'KONEKT Academy', href: '/academy', icon: GraduationCap },
  { name: 'Opportunités', href: '/opportunities', icon: Briefcase },
  { name: 'Project Lab', href: '/projects', icon: Rocket },
  { name: 'Gouvernance', href: '/governance', icon: ShieldCheck },
];

export function AppSidebar() {
  const pathname = usePathname();

  return (
    <div className="hidden md:flex flex-col w-64 bg-ink border-r border-border h-screen fixed left-0 top-0 z-50">
      <div className="p-8">
        <div className="flex items-center gap-2 mb-8">
          <KonektLogo />
          <h1 className="text-xl font-display font-bold tracking-tight">
            {APP_NAME}
          </h1>
        </div>

        <div className="bg-gray-900 rounded-3xl p-6 relative overflow-hidden">
          <div className="absolute top-0 right-0 p-4 opacity-10">
            <Zap className="w-12 h-12 text-white" />
          </div>
          <div className="relative z-10 space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-[10px] font-mono text-muted-2 uppercase tracking-widest">KONEKT Score</span>
              <span className="text-xs font-bold text-gold">850</span>
            </div>
            <div className="h-1.5 w-full bg-surface-3 rounded-full overflow-hidden">
              <div className="h-full bg-gold w-[75%]" />
            </div>
            <p className="text-[9px] text-muted leading-tight">Prochain badge : Leader Expérimenté</p>
          </div>
        </div>
      </div>
      
      <nav className="flex-1 px-4 space-y-1">
        {navigation.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                "flex items-center gap-3 px-4 py-3 rounded-2xl text-sm font-medium transition-all group",
                isActive 
                  ? "bg-surface-2 text-primary border border-primary/20" 
                  : "text-muted hover:bg-surface-2 hover:text-text"
              )}
            >
              <item.icon className={cn("w-5 h-5 transition-colors", isActive ? "text-primary" : "text-muted-2 group-hover:text-text")} />
              {item.name}
            </Link>
          );
        })}
      </nav>

      <div className="p-4 border-t border-border space-y-1">
        <Link
          href="/profile"
          className="flex items-center gap-3 px-4 py-3 rounded-2xl text-sm font-medium text-muted hover:bg-surface-2 hover:text-text transition-all"
        >
          <UserCircle className="w-5 h-5 text-muted-2" />
          Mon KONEKT ID
        </Link>
        <button className="w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-sm font-medium text-destructive hover:bg-destructive/5 transition-colors text-left">
          <LogOut className="w-5 h-5" />
          Déconnexion
        </button>
      </div>
    </div>
  );
}

function KonektLogo() {
  return (
    <svg width="24" height="24" viewBox="0 0 34 34" fill="none">
      <circle cx="8" cy="8" r="3.4" fill="hsl(var(--accent))"/>
      <circle cx="8" cy="26" r="3.4" fill="hsl(var(--accent))"/>
      <circle cx="26" cy="17" r="3.6" fill="hsl(var(--primary))"/>
      <line x1="8" y1="8" x2="26" y2="17" stroke="hsl(var(--border))" strokeWidth="1.6"/>
      <line x1="8" y1="26" x2="26" y2="17" stroke="hsl(var(--border))" strokeWidth="1.6"/>
      <line x1="8" y1="8" x2="8" y2="26" stroke="hsl(var(--border))" strokeWidth="1.6"/>
    </svg>
  );
}
