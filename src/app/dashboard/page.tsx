
'use client';

import { Search, Bell, Zap, Trophy, TrendingUp, Users, ArrowRight, Rocket, GraduationCap, Heart } from 'lucide-react';
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
              <p className="text-[10px] text-muted-2 uppercase font-mono mb-1">KONEKT Score</p>
              <p className="font-display font-bold text-lg text-gold">850 pts</p>
            </div>
            <div className="text-center">
              <p className="text-[10px] text-muted-2 uppercase font-mono mb-1">Activité</p>
              <p className="font-display font-bold text-lg text-cyan">92%</p>
            </div>
            <div className="text-center">
              <p className="text-[10px] text-muted-2 uppercase font-mono mb-1">Progression</p>
              <p className="font-display font-bold text-lg text-orange">75%</p>
            </div>
          </div>
        </section>

        {/* KONEKT FLOW - Activation Tabs */}
        <section>
          <div className="flex gap-4 overflow-x-auto pb-4 no-scrollbar">
            <FlowTab icon={Users} label="Communauté" active color="text-cyan" />
            <FlowTab icon={Zap} label="Opportunités" color="text-orange" />
            <FlowTab icon={GraduationCap} label="Learning" color="text-gold" />
            <FlowTab icon={Rocket} label="Projects" color="text-primary" />
            <FlowTab icon={Heart} label="Impact" color="text-green-400" />
          </div>

          <div className="space-y-4">
            {/* Flow Items */}
            <FlowItem 
              type="opportunity" 
              title="Assistant Marketing Digital" 
              meta="KONEKT Opportunities · Mission freelance" 
              tag="PRO · 48H D'AVANCE"
              content="Une startup partenaire cherche un membre KONEKT pour piloter ses réseaux sociaux."
            />
            
            <FlowItem 
              type="community" 
              title="Atelier Cellule Cocody" 
              meta="Samedi 30 Août · 15:00" 
              tag="CONVOCATION"
              content="Rencontre mensuelle : 'Structurer son pitch'. Présence obligatoire pour les Leaders."
            />
          </div>
        </section>

        {/* Match Recommendations */}
        <section>
          <p className="font-mono text-[10px] uppercase tracking-widest text-muted-2 mb-4">KONEKT Match · Recommandations</p>
          <div className="flex gap-4 overflow-x-auto pb-2 no-scrollbar">
            <MatchCard initials="AK" name="Awa K." skill="Marketing" />
            <MatchCard initials="MT" name="Malick T." skill="Développeur" />
            <MatchCard initials="SD" name="Sarah D." skill="Finance" />
            <MatchCard initials="JK" name="Junior K." skill="Design" />
          </div>
        </section>
      </main>

      <BottomNav />
    </div>
  );
}

function FlowTab({ icon: Icon, label, active, color }: any) {
  return (
    <button className={`flex items-center gap-2 px-4 py-2 rounded-full border transition-all shrink-0 font-medium text-[13px] ${active ? `bg-surface-2 border-${color.split('-')[1]}/40 ${color}` : "border-border text-muted hover:border-border/80"}`}>
      <Icon className="w-4 h-4" />
      {label}
    </button>
  );
}

function FlowItem({ type, title, meta, tag, content }: any) {
  return (
    <article className={`glass-card p-5 rounded-[2rem] space-y-3 border-l-4 ${type === 'opportunity' ? 'border-orange' : 'border-cyan'}`}>
      <div className="flex items-center justify-between">
        <p className="text-[11px] text-muted font-medium">{meta}</p>
        <Badge variant="outline" className={`text-[9px] uppercase font-mono ${type === 'opportunity' ? 'text-orange border-orange/30' : 'text-cyan border-cyan/30'}`}>{tag}</Badge>
      </div>
      <h3 className="font-display font-semibold text-lg leading-tight">{title}</h3>
      <p className="text-[13px] text-muted leading-relaxed">{content}</p>
      <div className="pt-2">
        <Button size="sm" variant="ghost" className="text-xs h-8 px-4 hover:bg-surface-2">En savoir plus</Button>
      </div>
    </article>
  );
}

function MatchCard({ initials, name, skill }: any) {
  return (
    <div className="glass-card p-4 rounded-2xl min-w-[140px] text-center border-border/50 hover:border-cyan/30 transition-colors">
      <div className="w-12 h-12 rounded-full bg-surface-3 border border-border mx-auto mb-3 flex items-center justify-center font-display font-bold text-sm text-cyan">
        {initials}
      </div>
      <p className="text-[12px] font-bold truncate">{name}</p>
      <p className="text-[10px] text-muted mt-1">{skill}</p>
      <button className="mt-3 text-[10px] text-cyan font-bold hover:underline">Se connecter</button>
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
