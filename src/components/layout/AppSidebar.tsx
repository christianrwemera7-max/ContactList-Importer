"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { 
  LayoutDashboard, 
  Table2, 
  GitBranch, 
  Users2, 
  Trophy, 
  Gamepad2, 
  DollarSign, 
  FileCheck2,
  Menu
} from "lucide-react"
import { useCompetition } from "@/lib/store"

const menuItems = [
  { icon: LayoutDashboard, label: "Accueil", href: "/" },
  { icon: Table2, label: "Phase de Poules", href: "/groups" },
  { icon: GitBranch, label: "Phase Finale", href: "/bracket" },
  { icon: Users2, label: "Écoles Participant", href: "/teams" },
  { icon: Trophy, label: "Top Joueurs", href: "/players" },
  { icon: Gamepad2, label: "Saisie des Matchs", href: "/matches" },
  { icon: DollarSign, label: "Cagnotte 1000$", href: "/prizes" },
  { icon: FileCheck2, label: "Bilan Complet", href: "/summary" },
]

export function AppSidebar() {
  const pathname = usePathname()
  const { state } = useCompetition()
  
  const playedCount = state.matches.filter(m => m.played).length;
  const totalCount = state.matches.length;
  const percentage = (playedCount / totalCount) * 100;

  return (
    <div className="fixed inset-y-0 left-0 w-64 bg-sidebar border-r border-sidebar-border hidden md:flex flex-col z-50">
      <div className="p-8">
        <div className="flex items-center gap-3 mb-1">
          <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center text-white shadow-lg shadow-primary/20">
            <Trophy className="w-5 h-5" />
          </div>
          <h1 className="text-xl font-headline font-black text-white tracking-tighter">
            ONE <span className="text-primary">CUP</span>
          </h1>
        </div>
        <p className="text-[10px] text-muted-foreground uppercase tracking-[0.3em] font-black opacity-60">Kinshasa 2026</p>
      </div>

      <nav className="flex-1 px-4 space-y-1.5 mt-2 overflow-y-auto">
        {menuItems.map((item) => {
          const isActive = pathname === item.href
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-4 px-4 py-3.5 rounded-2xl transition-all duration-300 group",
                isActive 
                  ? "bg-primary text-primary-foreground shadow-xl shadow-primary/15" 
                  : "text-muted-foreground hover:bg-white/5 hover:text-white"
              )}
            >
              <item.icon className={cn("w-5 h-5 transition-transform group-hover:scale-110", isActive ? "text-white" : "text-muted-foreground group-hover:text-primary")} />
              <span className="font-bold text-xs uppercase tracking-wider">{item.label}</span>
              {isActive && (
                <div className="ml-auto w-1.5 h-1.5 rounded-full bg-white shadow-sm" />
              )}
            </Link>
          )
        })}
      </nav>

      <div className="p-6">
        <div className="bg-white/5 rounded-3xl p-5 border border-white/5 relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-4 opacity-5 pointer-events-none group-hover:scale-125 transition-transform">
             <Trophy className="w-12 h-12 text-white" />
          </div>
          <p className="text-[10px] text-muted-foreground uppercase font-black tracking-widest mb-3">Progression</p>
          <div className="flex items-center justify-between text-xs font-black mb-3">
            <span className="text-white">{playedCount} Matchs</span>
            <span className="text-primary">{Math.round(percentage)}%</span>
          </div>
          <div className="w-full bg-white/10 rounded-full h-2 shadow-inner overflow-hidden">
            <div 
              className="bg-primary h-full rounded-full transition-all duration-1000 ease-out" 
              style={{ width: `${percentage}%` }} 
            />
          </div>
        </div>
      </div>
    </div>
  )
}
