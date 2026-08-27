
'use client';

import { Search, Bell, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { BottomNav } from '@/components/layout/BottomNav';

export default function Dashboard() {
  return (
    <div className="flex flex-col min-h-screen pb-24 md:pb-0">
      {/* App Header */}
      <header className="px-5 py-4 flex items-center justify-between sticky top-0 bg-background/50 backdrop-blur-md z-40">
        <div className="flex items-center gap-2">
          <KonektLogo />
          <span className="font-display font-bold text-xl tracking-tight">KONEKT</span>
        </div>
        <div className="flex gap-3">
          <button className="w-9 h-9 flex items-center justify-center rounded-xl bg-surface border border-border text-muted">
            <Search className="w-4 h-4" />
          </button>
          <button className="w-9 h-9 flex items-center justify-center rounded-xl bg-surface border border-border text-muted relative">
            <Bell className="w-4 h-4" />
            <div className="absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full bg-primary border-2 border-surface" />
          </button>
        </div>
      </header>

      <main className="px-5 space-y-8 max-w-2xl mx-auto w-full">
        {/* Cell Ring Row */}
        <section>
          <p className="font-mono text-[10px] uppercase tracking-widest text-muted mb-3">Ma cellule · Cocody #032</p>
          <div className="flex gap-4 overflow-x-auto pb-2 no-scrollbar">
            <RingItem initials="AK" label="Awa · Leader" isLeader />
            <RingItem initials="MT" label="Malick" />
            <RingItem initials="SD" label="Sarah" />
            <RingItem initials="JK" label="Junior" />
            <RingItem initials="+14" label="Voir tous" isMuted />
          </div>
        </section>

        {/* Today Section */}
        <section className="space-y-4">
          <p className="font-mono text-[10px] uppercase tracking-widest text-muted">Aujourd'hui</p>
          
          {/* Opportunity Card */}
          <article className="glass-card p-4 rounded-lg space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-cyan-900/40 flex items-center justify-center text-accent font-display font-bold">O</div>
              <div className="flex-1 min-w-0">
                <p className="text-[13px] font-bold">KONEKT Opportunities</p>
                <p className="text-[11px] text-muted">Mission freelance · Digital</p>
              </div>
              <div className="pro-badge">PRO · 48H D'AVANCE</div>
            </div>
            <h3 className="font-display font-semibold text-lg leading-tight">Assistant(e) marketing digital — 3 mois</h3>
            <p className="text-[13px] text-muted leading-relaxed">
              Une startup partenaire cherche un membre KONEKT pour piloter ses réseaux sociaux. Rémunéré, télétravail possible.
            </p>
            <div className="flex flex-wrap gap-2">
              <span className="text-[11px] px-2 py-1 bg-surface border border-border rounded-full text-muted">Marketing</span>
              <span className="text-[11px] px-2 py-1 bg-surface border border-border rounded-full text-muted">Remote</span>
            </div>
            <div className="flex items-center gap-4 pt-2">
              <Button size="sm" className="bg-primary hover:bg-primary/90 text-primary-foreground font-bold px-6">Postuler</Button>
              <span className="font-mono text-[10px] text-gold uppercase">Clôture dans 2j 14h</span>
            </div>
          </article>

          {/* Academy Card */}
          <article className="glass-card p-4 rounded-lg space-y-4">
             <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-orange-900/40 flex items-center justify-center text-primary font-display font-bold">A</div>
              <div className="flex-1 min-w-0">
                <p className="text-[13px] font-bold">KONEKT Academy</p>
                <p className="text-[11px] text-muted">Atelier en direct</p>
              </div>
            </div>
            <div className="h-28 rounded-xl bg-gradient-to-br from-indigo-900 to-primary/40 flex items-end p-4">
               <span className="font-mono text-[10px] text-white/80">JEUDI 20H · EN DIRECT</span>
            </div>
            <h3 className="font-display font-semibold text-lg leading-tight">Structurer son pitch en 10 minutes</h3>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" className="flex-1 border-border text-xs font-semibold">M'inscrire</Button>
              <Button variant="outline" size="sm" className="flex-1 border-border text-xs font-semibold">Partager</Button>
            </div>
          </article>

          {/* Quote Card */}
          <article className="border-l-2 border-primary pl-4 py-2 space-y-2">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-surface flex items-center justify-center text-[10px] font-bold">FN</div>
              <p className="text-[11px] text-muted">Fatou N. · Cellule Yopougon</p>
            </div>
            <p className="font-display font-medium text-base italic leading-relaxed">
              « Grâce à KONEKT, j'ai rencontré la personne qui a codé la première version de mon app. »
            </p>
          </article>
        </section>
      </main>

      <BottomNav />
    </div>
  );
}

function RingItem({ initials, label, isLeader, isMuted }: any) {
  return (
    <div className="flex flex-col items-center gap-2 shrink-0 w-16">
      <div className={cn(
        "w-[56px] h-[56px] rounded-full p-[2px] transition-transform hover:scale-105 cursor-pointer",
        isLeader ? "bg-gradient-to-tr from-primary to-gold" : isMuted ? "bg-border" : "konekt-ring"
      )}>
        <div className="w-full h-full rounded-full bg-surface flex items-center justify-center border-[2.5px] border-background font-display font-bold text-base">
          {initials}
        </div>
      </div>
      <span className="text-[10px] text-muted text-center truncate w-full">{label}</span>
    </div>
  );
}

function KonektLogo() {
  return (
    <svg width="24" height="24" viewBox="0 0 34 34" fill="none">
      <circle cx="8" cy="8" r="3.4" fill="hsl(var(--accent))"/>
      <circle cx="8" cy="26" r="3.4" fill="hsl(var(--accent))"/>
      <circle cx="26" cy="17" r="3.6" fill="hsl(var(--primary))"/>
      <line x1="8" y1="8" x2="26" y2="17" stroke="hsl(var(--border))" strokeWidth="1.6"/>
      <line x1="8" y1="26" x2="26" y2="17" stroke="hsl(var(--border))" strokeWidth="1.6"/>
      <line x1="8" y1="8" x2="8" y2="26" stroke="hsl(var(--border))" strokeWidth="1.6"/>
    </svg>
  );
}
