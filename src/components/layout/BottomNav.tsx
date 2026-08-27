
'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { Home, Users, GraduationCap, Briefcase, User } from 'lucide-react';

const navigation = [
  { name: 'Accueil', href: '/dashboard', icon: Home },
  { name: 'Cellules', href: '/cells', icon: Users },
  { name: 'Académie', href: '/academy', icon: GraduationCap },
  { name: 'Opportun.', href: '/opportunities', icon: Briefcase },
  { name: 'Profil', href: '/profile', icon: User },
];

export function BottomNav() {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-0 left-0 right-0 h-20 bg-ink/90 backdrop-blur-lg border-t border-border z-50 md:hidden flex items-center justify-around px-2">
      {navigation.map((item) => {
        const isActive = pathname === item.href;
        return (
          <Link
            key={item.name}
            href={item.href}
            className={cn(
              "flex flex-col items-center gap-1 w-14 transition-colors",
              isActive ? "text-primary" : "text-muted"
            )}
          >
            <item.icon className="w-5 h-5" />
            <span className="text-[10px] font-medium">{item.name}</span>
            <div className={cn(
              "w-1 h-1 rounded-full bg-primary transition-opacity",
              isActive ? "opacity-100" : "opacity-0"
            )} />
          </Link>
        );
      })}
    </nav>
  );
}
