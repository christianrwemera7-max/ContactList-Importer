
'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { Compass, Users, BookOpen, UserCircle2, Trophy } from 'lucide-react';

const navigation = [
  { name: 'Feed', href: '/dashboard', icon: Compass },
  { name: 'Étude', href: '/study', icon: BookOpen },
  { name: 'Défis', href: '/challenges', icon: Trophy },
  { name: 'Profil', href: '/profile', icon: UserCircle2 },
];

export function BottomNav() {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-0 left-0 right-0 h-20 bg-white/80 backdrop-blur-xl border-t border-border/50 z-50 md:hidden flex items-center justify-around px-4">
      {navigation.map((item) => {
        const isActive = pathname === item.href || (item.href.includes('?') && pathname === item.href.split('?')[0]);
        return (
          <Link
            key={item.name}
            href={item.href}
            className={cn(
              "flex flex-col items-center gap-1.5 px-3 py-2 rounded-xl transition-all duration-300",
              isActive ? "text-primary bg-primary/5" : "text-muted-foreground hover:text-primary"
            )}
          >
            <item.icon className={cn("w-5.5 h-5.5", isActive ? "stroke-[2.5px]" : "stroke-[1.5px]")} />
            <span className="text-[10px] font-black uppercase tracking-widest">{item.name}</span>
          </Link>
        );
      })}
    </nav>
  );
}
