
"use client"

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { useApp } from '@/lib/store';
import { useRouter } from 'next/navigation';

const navigation = [
  { name: 'Feed', href: '/dashboard' },
  { name: 'Étudier', href: '/study' },
  { name: 'Sessions', href: '/study-sessions' },
  { name: 'Tâches', href: '/tasks' },
  { name: 'Documents', href: '/documents' },
  { name: 'Academy', href: '/academy' },
  { name: 'Défis', href: '/challenges' },
  { name: 'Match', href: '/explorer' },
  { name: 'Communauté', href: '/community' },
  { name: 'Mon espace', href: '/profile' },
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
      <div className="p-10">
        <Link href="/" className="group inline-block mb-12">
          <div className="flex items-center gap-1">
            <span className="text-2xl font-sans font-bold tracking-tighter text-foreground">
              neostud
            </span>
            <svg width="20" height="20" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="70" cy="30" r="8" fill="#FF0000" />
              <path d="M70 42C70 42 60 45 60 60V85H70V65H80V85H90V60C90 45 80 42 80 42H70Z" fill="#FF0000" />
              <path d="M85 45L95 40L95 60L85 65V45Z" fill="#FF0000" />
            </svg>
          </div>
        </Link>

        {user && (
          <div className="space-y-1 mb-8">
            <p className="text-[9px] font-black text-primary/40 uppercase tracking-[0.3em] leading-none">
              Niveau {profile?.study_level || 'Membre'}
            </p>
            <p className="text-sm font-black text-foreground truncate">
              {profile?.first_name} {profile?.last_name}
            </p>
          </div>
        )}
      </div>
      
      <nav className="flex-1 px-6 space-y-1 overflow-y-auto no-scrollbar">
        {navigation.map((item) => {
          const isActive = pathname === item.href || (item.href.includes('?') && pathname === item.href.split('?')[0]);
          return (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                "flex items-center px-6 py-4 rounded-[24px] text-[11px] font-black uppercase tracking-[0.2em] transition-all group",
                isActive 
                  ? "bg-primary text-white shadow-lg shadow-primary/20" 
                  : "text-muted-foreground hover:bg-primary/5 hover:text-primary"
              )}
            >
              {item.name}
            </Link>
          );
        })}
      </nav>

      <div className="p-8 border-t border-border/50">
        <button 
          onClick={handleLogout}
          className="w-full text-left px-6 py-4 rounded-[24px] text-[11px] font-black uppercase tracking-[0.2em] text-muted-foreground hover:bg-destructive/5 hover:text-destructive transition-colors"
        >
          Déconnexion
        </button>
      </div>
    </div>
  );
}
