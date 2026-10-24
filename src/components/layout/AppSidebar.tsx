"use client"

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { useApp } from '@/lib/store';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import placeholderData from '@/app/lib/placeholder-images.json';

const navigation = [
  { name: 'HUB', href: '/dashboard' },
  { name: 'ÉTUDIER', href: '/study' },
  { name: 'FOCUS', href: '/study-sessions' },
  { name: 'ACADEMY', href: '/academy' },
  { name: 'COMMUNAUTÉ', href: '/community' },
  { name: 'EXPLORER', href: '/explorer' },
];

export function AppSidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const { state, logout } = useApp();
  const user = state.user;

  // Sur le HUB, la sidebar est masquée pour laisser place aux fenêtres d'exploration
  if (pathname === '/dashboard' || pathname === '/') return null;

  const logoImage = placeholderData.placeholderImages.find(img => img.id === 'official-logo');

  const handleLogout = async () => {
    await logout();
    router.push('/login');
  };

  return (
    <div className="hidden md:flex flex-col w-80 bg-white border-r border-border/40 h-screen fixed left-0 top-0 z-50 animate-in slide-in-from-left duration-700">
      <div className="p-10">
        <Link href="/dashboard" className="group inline-block mb-12">
          <div className="relative w-44 h-20">
            {logoImage ? (
              <Image 
                src={logoImage.imageUrl}
                alt="neostud"
                fill
                className="object-contain brightness-0"
                priority
              />
            ) : (
              <span className="text-3xl font-display font-black tracking-tighter text-foreground uppercase italic">
                neostud
              </span>
            )}
          </div>
        </Link>

        {user && (
          <div className="space-y-2 mb-10 pl-2">
            <p className="text-[10px] font-black text-primary uppercase tracking-[0.4em] leading-none">
              Utilisateur Premium
            </p>
            <p className="text-lg font-black text-foreground truncate uppercase tracking-tighter">
              {state.profile?.first_name}
            </p>
          </div>
        )}
      </div>
      
      <nav className="flex-1 px-8 space-y-2 overflow-y-auto no-scrollbar">
        {navigation.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                "flex items-center px-8 py-5 rounded-[32px] text-[11px] font-black uppercase tracking-[0.3em] transition-all duration-500 group",
                isActive 
                  ? "bg-primary text-white shadow-2xl shadow-primary/30" 
                  : "text-muted-foreground hover:bg-primary/5 hover:text-primary"
              )}
            >
              {item.name}
            </Link>
          );
        })}
      </nav>

      <div className="p-10 border-t border-border/40">
        <button 
          onClick={handleLogout}
          className="w-full text-left px-8 py-5 rounded-[32px] text-[11px] font-black uppercase tracking-[0.3em] text-muted-foreground hover:bg-destructive/5 hover:text-destructive transition-all duration-500"
        >
          Déconnexion
        </button>
      </div>
    </div>
  );
}