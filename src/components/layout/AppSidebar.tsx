
"use client"

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { 
  LayoutDashboard, 
  Users, 
  GraduationCap, 
  Briefcase, 
  ShieldCheck, 
  UserCircle,
  Settings,
  LogOut
} from 'lucide-react';
import { APP_NAME } from '@/lib/constants';

const navigation = [
  { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
  { name: 'Ma Cellule', href: '/cells', icon: Users },
  { name: 'Academy', href: '/academy', icon: GraduationCap },
  { name: 'Opportunités', href: '/opportunities', icon: Briefcase },
  { name: 'Gouvernance', href: '/governance', icon: ShieldCheck },
];

export function AppSidebar() {
  const pathname = usePathname();

  return (
    <div className="hidden md:flex flex-col w-64 bg-white border-r h-screen fixed left-0 top-0">
      <div className="p-6">
        <h1 className="text-2xl font-black tracking-tighter text-primary">
          {APP_NAME}
        </h1>
      </div>
      
      <nav className="flex-1 px-4 space-y-1">
        {navigation.map((item) => {
          const isActive = pathname.startsWith(item.href);
          return (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                "flex items-center gap-3 px-4 py-3 rounded-2xl text-sm font-medium transition-all",
                isActive 
                  ? "bg-primary text-white shadow-lg shadow-primary/20" 
                  : "text-muted-foreground hover:bg-secondary hover:text-foreground"
              )}
            >
              <item.icon className="w-5 h-5" />
              {item.name}
            </Link>
          );
        })}
      </nav>

      <div className="p-4 border-t space-y-1">
        <Link
          href="/profile"
          className="flex items-center gap-3 px-4 py-3 rounded-2xl text-sm font-medium text-muted-foreground hover:bg-secondary hover:text-foreground"
        >
          <UserCircle className="w-5 h-5" />
          Mon Profil
        </Link>
        <button className="w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-sm font-medium text-destructive hover:bg-destructive/5 transition-colors text-left">
          <LogOut className="w-5 h-5" />
          Déconnexion
        </button>
      </div>
    </div>
  );
}
