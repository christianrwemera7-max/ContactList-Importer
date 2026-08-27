
'use client';

import { Search, Bell, Zap, Trophy, Rocket, GraduationCap, Heart, Users, ArrowRight, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { BottomNav } from '@/components/layout/BottomNav';
import { Progress } from '@/components/ui/progress';

export default function Dashboard() {
  return (
    <div className="flex flex-col min-h-screen pb-24 md:pb-0 bg-ink">
      {/* Header Statutaire */}
      <header className="px-5 py-6 flex items-center justify-between sticky top-0 bg-ink/80 backdrop-blur-md z-40 border-b border-border/50">
        <div className="flex flex-col">
          <h1 className="font-display font-bold text-xl tracking-tight">KONEKT FLOW</h1>
          <p className="text-[10px] font-mono text-muted-2 uppercase tracking-widest">Membre actif · Zone Kinshasa</p>
        </div>
        <div className="flex gap-3">
          <button className="w-9 h-9 flex items-center justify-center rounded-xl bg-surface-2 border border-border text-muted-2">
            <Bell className="w-4 h-4" />
          </button>
        </div>
      </header>

      <main className="px-5 space-y-8 max-w-2xl mx-auto w-full py-6">
        {/* Activation Card */}
        <section className="glass-card p-6 rounded-[2rem] border-cyan/20 bg-gradient-to-br from-cyan/5 to-transparent">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-display font-bold text-lg">Bonjour Christian 👋</h2>
            <div className="text-right">
              <p className="text-[10px] font-mono text-muted-2 uppercase">KONEKT Score</p>
              <p className="text-xl font-display font-bold text-gold">850 pts</p>
            </div>
          </div>
          
          <div className="space-y-4">
            <p className="text-xs text-muted leading-relaxed">Ton prochain objectif : <b>Leader Expérimenté</b>. Continue ton activation !</p>
            <div className="space-y-2">
              <div className="flex justify-between text-[10px] font-bold">
                <span className="text-cyan">Progression niveau</span>
                <span>75%</span>
              </div>
              <Progress value={75} className="h-2 bg-surface-3" indicatorClassName="bg-cyan" />
            </div>
          </div>
        </section>

        {/* Quick Actions (ERP Logic) */}
        <section className="grid grid-cols-2 gap-4">
          <ActionCard icon={Users} label="Ma Cellule" meta="18/20 actifs" color="cyan" href="/community" />
          <ActionCard icon={Rocket} label="Project Lab" meta="2 projets en cours" color="primary" href="/projects" />
        </section>

        {/* Activation Feed */}
        <section className="space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="font-mono text-[10px] uppercase tracking-widest text-muted-2">Fil d'activation</h3>
            <button className="text-[10px] font-bold text-cyan">TOUT VOIR</button>
          </div>

          <div className="space-y-4">
            <FlowItem 
              type="opportunity" 
              title="Assistant Marketing Digital" 
              meta="Partenaire · Fintech locale" 
              tag="PRO · 48H D'AVANCE"
              content="Une startup partenaire cherche un membre KONEKT pour piloter ses réseaux sociaux. Rémunéré."
              color="orange"
            />
            
            <FlowItem 
              type="community" 
              title="Atelier Cellule Cocody" 
              meta="Samedi 30 Août · 15:00" 
              tag="CONVOCATION"
              content="Rencontre mensuelle : 'Structurer son pitch'. Présence obligatoire pour les Leaders."
              color="cyan"
            />

            <FlowItem 
              type="learning" 
              title="Finance Personnelle" 
              meta="KONEKT Academy" 
              tag="MODULE 3"
              content="Apprenez à gérer vos revenus et à constituer votre première réserve de précaution."
              color="gold"
            />
          </div>
        </section>
      </main>

      <BottomNav />
    </div>
  );
}

function ActionCard({ icon: Icon, label, meta, color, href }: any) {
  return (
    <div className={`glass-card p-5 rounded-[2rem] border-${color}/20 hover:border-${color}/40 transition-colors cursor-pointer group`}>
      <div className={`w-10 h-10 rounded-2xl bg-${color}/10 flex items-center justify-center text-${color} mb-3 group-hover:scale-110 transition-transform`}>
        <Icon className="w-5 h-5" />
      </div>
      <p className="font-display font-bold text-sm">{label}</p>
      <p className="text-[10px] text-muted-2 mt-1">{meta}</p>
    </div>
  );
}

function FlowItem({ type, title, meta, tag, content, color }: any) {
  return (
    <article className={`glass-card p-6 rounded-[2.5rem] space-y-3 border-l-4 border-${color}`}>
      <div className="flex items-center justify-between">
        <p className="text-[11px] text-muted-2 font-medium">{meta}</p>
        <Badge variant="outline" className={`text-[9px] uppercase font-mono text-${color} border-${color}/30`}>{tag}</Badge>
      </div>
      <h3 className="font-display font-semibold text-lg leading-tight">{title}</h3>
      <p className="text-[13px] text-muted leading-relaxed">{content}</p>
      <div className="pt-2">
        <Button size="sm" variant="ghost" className="text-xs h-9 px-4 hover:bg-surface-2 rounded-xl gap-2">
          S'activer <ArrowRight className="w-3 h-3" />
        </Button>
      </div>
    </article>
  );
}
