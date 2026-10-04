"use client"

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { 
  Compass, 
  Users, 
  Rocket, 
  UserCircle2, 
  LogOut,
  Zap,
  LayoutGrid,
  BookOpen,
  CheckSquare,
  FileText,
  Timer,
  GraduationCap,
  Trophy
} from 'lucide-react';
import { useApp } from '@/lib/store';
import { useRouter } from 'next/navigation';

const navigation = [
  { name: 'Feed', href: '/dashboard', icon: Compass },
  { name: 'Étudier', href: '/study', icon: BookOpen },
  { name: 'Sessions', href: '/study-sessions', icon: Timer },
  { name: 'Tâches', href: '/tasks', icon: CheckSquare },
  { name: 'Documents', href: '/documents', icon: FileText },
  { name: 'Academy', href: '/academy', icon: GraduationCap },
  { name: 'Défis', href: '/challenges', icon: Trophy },
  { name: 'Match', href: '/explorer', icon: Users },
  { name: 'Communauté', href: '/community', icon: LayoutGrid },
  { name: 'Mon espace', href: '/profile', icon: UserCircle2 },
];

export function AppSidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const { state, logout } = useApp();
  const user = state.user;
  const profile = state.profile;

  const handleLogout = async () => {
    try {
      await logout();
      router.push('/login');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  return (
    <div className="hidden md:flex flex-col w-72 bg-white border-r border-border/50 h-screen fixed left-0 top-0 z-50">
      <div className="p-8">
        <Link href="/" className="flex items-center gap-3 mb-10 group">
          <NeoStudLogo />
          <h1 className="text-xl font-display font-black tracking-tight text-foreground group-hover:text-primary transition-colors">
            NEOSTUD
          </h1>
        </Link>

        {user && (
          <div className="bg-primary/5 p-5 rounded-2xl border border-primary/10 relative overflow-hidden group">
            <div className="absolute -top-4 -right-4 w-16 h-16 bg-primary/10 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-500" />
            <div className="relative z-10 space-y-1">
              <p className="text-[10px] font-bold text-primary/60 uppercase tracking-widest">
                {profile?.study_level || 'MEMBRE'}
              </p>
              <div className="flex items-center gap-2">
                 <div className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                 <span className="text-xs font-black text-foreground truncate">
                   {profile?.first_name} {profile?.last_name}
                 </span>
              </div>
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
                "flex items-center gap-4 px-5 py-3 rounded-xl text-[13px] font-bold transition-all group",
                isActive 
                  ? "bg-primary text-white shadow-lg shadow-primary/20" 
                  : "text-muted-foreground hover:bg-primary/5 hover:text-primary"
              )}
            >
              <item.icon className={cn("w-4.5 h-4.5 transition-colors", isActive ? "text-white" : "text-muted-foreground group-hover:text-primary")} />
              {item.name}
            </Link>
          );
        })}
      </nav>

      <div className="p-6 border-t border-border/50 space-y-2">
        <button 
          onClick={handleLogout}
          className="w-full flex items-center gap-4 px-5 py-3 rounded-xl text-[13px] font-bold text-muted-foreground hover:bg-destructive/5 hover:text-destructive transition-colors text-left"
        >
          <LogOut className="w-4 h-4" />
          Déconnexion
        </button>
      </div>
    </div>
  );
}

function NeoStudLogo() {
  return (
    <svg width="32" height="32" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="40" height="40" rx="10" className="fill-primary" />
      <path d="M12 28V12L28 28V12" stroke="white" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="28" cy="12" r="3" className="fill-white" />
    </svg>
  );
}
