
'use client';

import { Search, Bell, Zap, Trophy, TrendingUp, Users, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { BottomNav } from '@/components/layout/BottomNav';
import Link from 'next/link';

export default function Dashboard() {
  return (
    <div className="flex flex-col min-h-screen pb-24 md:pb-0">
      {/* App Header */}
      <header className="px-5 py-4 flex items-center justify-between sticky top-0 bg-background/50 backdrop-blur-md z-40 border-b border-border/50">
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
            <div className="absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full bg-orange border-2 border-surface" />
          </button>
        </div>
      </header>

      <main className="px-5 space-y-8 max-w-2xl mx-auto w-full py-6">
        {/* KONEKT ID Quick View */}
        <section className="glass-card p-6 rounded-[2rem] relative overflow-hidden group border-orange/20">
          <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:scale-110 transition-transform">
            <Trophy className="w-24 h-24 text-orange" />
          </div>
          <div className="relative z-10 flex items-start gap-4">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-orange to-gold flex items-center justify-center font-display font-bold text-2xl text-ink">
              JK
            </div>
            <div>
              <div className="flex items-center gap-2 mb-1">
                <h2 className="font-display font-bold text-xl">Junior K.</h2>
                <Badge className="bg-cyan/20 text-cyan border-cyan/30 text-[10px] uppercase font-mono">PLUS</Badge>
              </div>
              <p className="text-sm text-muted font-medium mb-3">Leader de cellule · Cocody #032</p>
              <div className="flex gap-2">
                <Badge variant="outline" className="text-[9px] border-border text-muted-2">Marketing</Badge>
                <Badge variant="outline" className="text-[9px] border-border text-muted-2">Digital</Badge>
              </div>
            </div>
          </div>
          
          <div className="mt-6 pt-6 border-t border-border/50 grid grid-cols-3 gap-4">
            <div className="text-center">
              <p className="text-[10px] text-muted-2 uppercase font-mono mb-1">Academy</p>
              <p className="font-display font-bold text-lg">75%</p>
            </div>
            <div className="text-center">
              <p className="text-[10px] text-muted-2 uppercase font-mono mb-1">Présence</p>
              <p className="font-display font-bold text-lg text-cyan">92%</p>
            </div>
            <div className="text-center">
              <p className="text-[10px] text-muted-2 uppercase font-mono mb-1">Rang</p>
              <p className="font-display font-bold text-lg text-orange">Leader</p>
            </div>
          </div>
        </section>

        {/* Activation Pathway */}
        <section>
          <p className="font-mono text-[10px] uppercase tracking-widest text-muted-2 mb-4">Activation & Progression</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Link href="/academy" className="glass-card p-4 rounded-2xl flex items-center gap-4 hover:border-cyan/50 transition-colors">
              <div className="w-10 h-10 rounded-xl bg-cyan/10 flex items-center justify-center text-cyan">
                <TrendingUp className="w-5 h-5" />
              </div>
              <div className="flex-1">
                <p className="text-[13px] font-bold">Apprendre</p>
                <p className="text-[11px] text-muted-2">Academy · 2 modules suggérés</p>
              </div>
              <ArrowRight className="w-4 h-4 text-muted-2" />
            </Link>
            <Link href="/opportunities" className="glass-card p-4 rounded-2xl flex items-center gap-4 hover:border-orange/50 transition-colors">
              <div className="w-10 h-10 rounded-xl bg-orange/10 flex items-center justify-center text-orange">
                <Zap className="w-5 h-5" />
              </div>
              <div className="flex-1">
                <p className="text-[13px] font-bold">Opportunités</p>
                <p className="text-[11px] text-muted-2">3 missions PRO en avance</p>
              </div>
              <ArrowRight className="w-4 h-4 text-muted-2" />
            </Link>
          </div>
        </section>

        {/* Cell Community */}
        <section>
          <div className="flex items-center justify-between mb-4">
            <p className="font-mono text-[10px] uppercase tracking-widest text-muted-2">Ma cellule · Cocody #032</p>
            <Link href="/cells" className="text-[10px] text-cyan uppercase font-bold hover:underline">Voir l'espace</Link>
          </div>
          <div className="flex gap-4 overflow-x-auto pb-2 no-scrollbar">
            <RingItem initials="AK" label="Awa · Leader" isLeader />
            <RingItem initials="MT" label="Malick" />
            <RingItem initials="SD" label="Sarah" />
            <RingItem initials="JK" label="Junior" />
            <RingItem initials="+14" label="Voir tous" isMuted />
          </div>
        </section>

        {/* Today's Priority */}
        <section className="space-y-4">
          <p className="font-mono text-[10px] uppercase tracking-widest text-muted-2">Priorité du jour</p>
          
          <article className="glass-card p-5 rounded-[2rem] space-y-4 border-l-4 border-orange">
             <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-orange/10 flex items-center justify-center text-orange">
                <Users className="w-5 h-5" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-[13px] font-bold">KONEKT Cellules</p>
                <p className="text-[11px] text-muted">Rencontre mensuelle</p>
              </div>
            </div>
            <h3 className="font-display font-semibold text-lg leading-tight">Atelier : Structurer son pitch en 10 minutes</h3>
            <p className="text-[13px] text-muted leading-relaxed">
              La rencontre de ce samedi se tiendra à l'Espace KONEKT Abidjan. N'oubliez pas vos carnets de projets.
            </p>
            <div className="flex items-center gap-4 pt-2">
              <Button size="sm" className="bg-orange hover:bg-orange/90 text-ink font-bold px-6">Confirmer ma présence</Button>
              <span className="font-mono text-[10px] text-gold uppercase">Dans 2 jours</span>
            </div>
          </article>
        </section>
      </main>

      <BottomNav />
    </div>
  );
}

function RingItem({ initials, label, isLeader, isMuted }: any) {
  return (
    <div className="flex flex-col items-center gap-2 shrink-0 w-16 group">
      <div className={`
        w-[56px] h-[56px] rounded-full p-[2px] transition-transform group-hover:scale-105 cursor-pointer
        ${isLeader ? "bg-gradient-to-tr from-orange to-gold" : isMuted ? "bg-border" : "konekt-ring"}
      `}>
        <div className="w-full h-full rounded-full bg-surface flex items-center justify-center border-[2.5px] border-background font-display font-bold text-base">
          {initials}
        </div>
      </div>
      <span className="text-[10px] text-muted text-center truncate w-full group-hover:text-text transition-colors">{label}</span>
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
