'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';

const navigation = [
  { name: 'HUB', href: '/dashboard' },
  { name: 'ÉTUDE', href: '/study' },
  { name: 'DÉFIS', href: '/challenges' },
  { name: 'PROFIL', href: '/profile' },
];

export function BottomNav() {
  const pathname = usePathname();

  // Masquer sur les pages cinématiques
  if (pathname === '/' || pathname === '/dashboard') return null;

  return (
    <nav className="fixed bottom-0 left-0 right-0 h-28 bg-primary z-50 md:hidden flex items-center justify-around px-8 rounded-t-[56px] shadow-[0_-20px_60px_rgba(108,43,255,0.2)]">
      {navigation.map((item) => {
        const isActive = pathname === item.href;
        return (
          <Link
            key={item.name}
            href={item.href}
            className={cn(
              "flex flex-col items-center justify-center h-full px-4 transition-all duration-700",
              isActive ? "opacity-100 scale-110" : "opacity-40"
            )}
          >
            <span className="text-[11px] font-black uppercase tracking-[0.3em] text-white">
              {item.name}
            </span>
            {isActive && (
              <div className="w-2 h-2 bg-white rounded-full mt-3 shadow-glow" />
            )}
          </Link>
        );
      })}
    </nav>
  );
}