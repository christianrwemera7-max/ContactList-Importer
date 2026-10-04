'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { Compass, BookOpen, UserCircle2, Trophy, LayoutGrid } from 'lucide-react';

const navigation = [
  { name: 'Feed', href: '/dashboard', icon: Compass },
  { name: 'Étude', href: '/study', icon: BookOpen },
  { name: 'Défis', href: '/challenges', icon: Trophy },
  { name: 'Profil', href: '/profile', icon: UserCircle2 },
];

export function BottomNav() {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-0 left-0 right-0 h-24 bg-primary z-50 md:hidden flex items-center justify-around px-4 rounded-t-[40px] shadow-[0_-10px_40px_rgba(108,43,255,0.15)]">
      {navigation.map((item) => {
        const isActive = pathname === item.href || (item.href.includes('?') && pathname === item.href.split('?')[0]);
        return (
          <Link
            key={item.name}
            href={item.href}
            className={cn(
              "flex flex-col items-center gap-1 transition-all duration-300",
              isActive ? "text-white scale-110" : "text-white/40 hover:text-white/60"
            )}
          >
            <item.icon className={cn("w-6 h-6", isActive ? "stroke-[2.5px]" : "stroke-[1.5px]")} />
            <span className={cn("text-[9px] font-black uppercase tracking-widest", isActive ? "opacity-100" : "opacity-0")}>{item.name}</span>
          </Link>
        );
      })}
    </nav>
  );
}
