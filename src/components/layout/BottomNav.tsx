
'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { Home, Search, PlusCircle, Users, User } from 'lucide-react';

const navigation = [
  { name: 'Accueil', href: '/dashboard', icon: Home },
  { name: 'Explorer', href: '/explorer', icon: Search },
  { name: 'Créer', href: '/create', icon: PlusCircle, special: true },
  { name: 'Communauté', href: '/community', icon: Users },
  { name: 'Profil', href: '/profile', icon: User },
];

export function BottomNav() {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-0 left-0 right-0 h-20 bg-ink/95 backdrop-blur-xl border-t border-border z-50 md:hidden flex items-center justify-around px-2">
      {navigation.map((item) => {
        const isActive = pathname === item.href;
        if (item.special) {
          return (
            <Link
              key={item.name}
              href={item.href}
              className="flex flex-col items-center justify-center -mt-8"
            >
              <div className="w-14 h-14 rounded-full bg-orange flex items-center justify-center shadow-lg shadow-orange/20 border-4 border-ink">
                <item.icon className="w-7 h-7 text-ink" />
              </div>
              <span className="text-[10px] font-bold mt-1 text-orange">{item.name}</span>
            </Link>
          );
        }
        return (
          <Link
            key={item.name}
            href={item.href}
            className={cn(
              "flex flex-col items-center gap-1 w-14 transition-all duration-300",
              isActive ? "text-cyan scale-110" : "text-muted-2"
            )}
          >
            <item.icon className={cn("w-5 h-5", isActive ? "stroke-[2.5px]" : "stroke-[1.5px]")} />
            <span className="text-[9px] font-bold uppercase tracking-tighter">{item.name}</span>
            <div className={cn(
              "w-1 h-1 rounded-full bg-cyan transition-opacity",
              isActive ? "opacity-100" : "opacity-0"
            )} />
          </Link>
        );
      })}
    </nav>
  );
}
