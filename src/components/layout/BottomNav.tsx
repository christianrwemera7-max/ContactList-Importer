
'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';

const navigation = [
  { name: 'Feed', href: '/dashboard' },
  { name: 'Étude', href: '/study' },
  { name: 'Défis', href: '/challenges' },
  { name: 'Profil', href: '/profile' },
];

export function BottomNav() {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-0 left-0 right-0 h-24 bg-primary z-50 md:hidden flex items-center justify-around px-4 rounded-t-[48px] shadow-[0_-10px_40px_rgba(108,43,255,0.15)]">
      {navigation.map((item) => {
        const isActive = pathname === item.href || (item.href.includes('?') && pathname === item.href.split('?')[0]);
        return (
          <Link
            key={item.name}
            href={item.href}
            className={cn(
              "flex flex-col items-center justify-center h-full px-4 transition-all duration-300",
              isActive ? "opacity-100 scale-110" : "opacity-40"
            )}
          >
            <span className={cn(
              "text-[10px] font-black uppercase tracking-[0.2em] text-white",
              isActive ? "block" : "block"
            )}>
              {item.name}
            </span>
            {isActive && (
              <div className="w-1 h-1 bg-white rounded-full mt-2" />
            )}
          </Link>
        );
      })}
    </nav>
  );
}
