
'use client';

import { Search, Bell, Zap, Trophy, Rocket, GraduationCap, Heart, Users, ArrowRight, Star, Briefcase } from 'lucide-react';
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
          <button className="w-9 h-9 flex items-center justify-center rounded-xl bg-surface-2 border border-border text-muted-2 relative">
            <Bell className="w-4 h-4" />
            <div className="absolute top-0 right-0 w-2.5 h-2.5 bg-orange rounded-full border-2 border-surface" />
          </button>
        </div>
      </header>

      <main className="px-5 space-y-8 max-w-2xl mx-auto w-full py-6">
        {/* Engagement Score (Rule #9 & #25) */}
        <section className="glass-card p-6 rounded-[2rem] border-cyan/20 bg-gradient-to-br from-cyan/5 to-transparent">
          <div className="flex items-center justify-between mb-4">
            <div className="space-y-1">
              <h2 className="font-display font-bold text-lg text-text">Christian Rwemera</h2>
              <Badge className="bg-cyan/10 text-cyan border-cyan/30 text-[9px] uppercase font-mono">MEMBRE PLUS</Badge>
            </div>
            <div className="text-right">
              <p className="text-[9px] font-mono text-muted uppercase font-bold">Engagement Score</p>
              <p className="text-2xl font-display font-bold text-gold">850 pts</p>
            </div>
          </div>
          
          <div className="space-y-4">
            <div className="flex justify-between text-[10px] font-bold">
              <span className="text-muted">Prochaine étape : <b className="text-text">LEADER</b></span>
              <span className="text-cyan">75%</span>
            </div>
            <Progress value={75} className="h-2 bg-surface-3" indicatorClassName="bg-cyan" />
          </div>
        </section>

        {/* Quick Actions */}
        <section className="grid grid-cols-2 gap-4">
          <ActionCard icon={Users} label="Ma Cellule" meta="18/20 membres" color="cyan" href="/community" />
          <ActionCard icon={Rocket} label="Project Lab" meta="2 projets créés" color="orange" href="/opportunities?tab=projects" />
        </section>

        {/* KONEKT FLOW - Priorité à la Valeur (Rule #18) */}
        <section className="space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="font-mono text-[10px] uppercase tracking-widest text-muted-2 font-bold">Flux d'Activation</h3>
            <div className="flex gap-2">
              <Badge variant="outline" className="text-[9px] border-cyan/30 text-cyan px-2">TOUT</Badge>
              <Badge variant="outline" className="text-[9px] border-border text-muted px-2">CELLULE</Badge>
            </div>
          </div>

          <div className="space-y-4">
            <FlowItem 
              type="opportunity" 
              title="Mission : Designer UI/UX" 
              meta="Partenaire Vérifié · 3 mois" 
              tag="PRO · ACCÈS ANTICIPÉ"
              content="Recherche d'un talent KONEKT pour la refonte d'une application mobile fintech. Rémunéré."
              color="orange"
              icon={Briefcase}
            />
            
            <FlowItem 
              type="learning" 
              title="Pitch & Soft Skills" 
              meta="Academy · Mentorat collectif" 
              tag="SÉANCE LIVE DEMAIN"
              content="Apprenez à présenter votre projet devant des investisseurs. Places limitées (PRO & PLUS)."
              color="gold"
              icon={GraduationCap}
            />

            <FlowItem 
              type="community" 
              title="Rencontre Cellule Cocody" 
              meta="Samedi 30 Août · 15:00" 
              tag="CONVOCATION"
              content="Point sur les projets du Lab et accueil de 2 nouveaux membres. Présence obligatoire."
              color="cyan"
              icon={Users}
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
    <div className={`glass-card p-5 rounded-[2rem] border-${color}/20 hover:border-${color}/40 transition-all cursor-pointer group`}>
      <div className={`w-11 h-11 rounded-2xl bg-${color}/10 flex items-center justify-center text-${color} mb-3 group-hover:scale-110 transition-transform border border-${color}/20`}>
        <Icon className="w-5 h-5" />
      </div>
      <p className="font-display font-bold text-sm text-text">{label}</p>
      <p className="text-[10px] text-muted-2 mt-1 font-mono uppercase">{meta}</p>
    </div>
  );
}

function FlowItem({ type, title, meta, tag, content, color, icon: Icon }: any) {
  return (
    <article className={`glass-card p-6 rounded-[2.5rem] space-y-4 border-l-4 border-${color}`}>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className={`w-9 h-9 rounded-xl bg-${color}/10 flex items-center justify-center text-${color}`}>
            <Icon className="w-4 h-4" />
          </div>
          <p className="text-[10px] text-muted-2 font-bold uppercase font-mono">{meta}</p>
        </div>
        <Badge className={`bg-${color}/10 text-${color} border-${color}/30 text-[8px] font-mono`}>{tag}</Badge>
      </div>
      <div className="space-y-2">
        <h3 className="font-display font-semibold text-lg leading-tight text-text">{title}</h3>
        <p className="text-[13px] text-muted leading-relaxed">{content}</p>
      </div>
      <div className="pt-2 border-t border-border/30">
        <Button size="sm" variant="ghost" className="text-xs h-9 px-0 hover:bg-transparent text-cyan font-bold gap-2 group">
          Passer à l'action <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
        </Button>
      </div>
    </article>
  );
}
