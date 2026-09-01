
'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { Compass, Users, Rocket, Library, UserCircle2 } from 'lucide-react';

const navigation = [
  { name: 'Feed', href: '/dashboard', icon: Compass },
  { name: 'Match', href: '/explorer', icon: Users },
  { name: 'Projets', href: '/opportunities?tab=projects', icon: Rocket },
  { name: 'Biblio', href: '/academy', icon: Library },
  { name: 'Profil', href: '/profile', icon: UserCircle2 },
];

export function BottomNav() {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-0 left-0 right-0 h-20 bg-white/95 backdrop-blur-xl border-t border-border z-50 md:hidden flex items-center justify-around px-2 shadow-lg">
      {navigation.map((item) => {
        const isActive = pathname === item.href || (item.href.includes('?') && pathname === item.href.split('?')[0]);
        return (
          <Link
            key={item.name}
            href={item.href}
            className={cn(
              "flex flex-col items-center gap-1 w-14 transition-all duration-300",
              isActive ? "text-primary scale-110" : "text-muted-foreground"
            )}
          >
            <item.icon className={cn("w-5 h-5", isActive ? "stroke-[2.5px]" : "stroke-[1.5px]")} />
            <span className="text-[9px] font-bold uppercase tracking-widest">{item.name}</span>
            <div className={cn(
              "w-1 h-1 rounded-full bg-primary transition-opacity mt-1",
              isActive ? "opacity-100" : "opacity-0"
            )} />
          </Link>
        );
      })}
    </nav>
  );
}
