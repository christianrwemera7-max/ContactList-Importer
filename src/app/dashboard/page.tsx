
'use client';

import { Bell, Zap, Rocket, GraduationCap, ArrowRight, Briefcase, TrendingUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { BottomNav } from '@/components/layout/BottomNav';
import { EngagementStats } from '@/components/dashboard/EngagementStats';
import Link from 'next/link';
import { useKonekt } from '@/lib/store';

export default function Dashboard() {
  const { state } = useKonekt();
  const user = state.currentUser;

  if (!user) return null;

  return (
    <div className="flex flex-col min-h-screen pb-24 md:pb-0 bg-ink">
      <header className="px-5 py-6 flex items-center justify-between sticky top-0 bg-ink/80 backdrop-blur-md z-40 border-b border-border/50">
        <div className="flex flex-col">
          <h1 className="font-display font-bold text-xl tracking-tight uppercase">KONEKT FLOW</h1>
          <p className="text-[10px] font-mono text-muted-2 uppercase tracking-widest">Flux d'activation personnalisé</p>
        </div>
        <div className="flex gap-3">
          <button className="w-10 h-10 flex items-center justify-center rounded-xl bg-surface-2 border border-border text-muted-2 relative group hover:text-cyan transition-colors">
            <Bell className="w-5 h-5" />
            <div className="absolute top-0 right-0 w-2.5 h-2.5 bg-orange rounded-full border-2 border-ink" />
          </button>
          <Link href="/profile" className="w-10 h-10 rounded-xl bg-gradient-to-tr from-cyan to-orange p-[1.5px]">
            <div className="w-full h-full rounded-[10px] bg-surface-3 flex items-center justify-center font-display font-bold text-xs text-text">
              {user.name.split(' ').map(n => n[0]).join('')}
            </div>
          </Link>
        </div>
      </header>

      <main className="px-5 space-y-8 max-w-2xl mx-auto w-full py-6">
        
        {/* Central Engagement Stats */}
        <EngagementStats />

        {/* Quick Activation Pillars */}
        <section className="grid grid-cols-2 gap-4">
          <ActionCard 
            icon={Rocket} 
            label="Project Lab" 
            meta="3 besoins ouverts" 
            color="primary" 
            href="/opportunities?tab=projects" 
          />
          <ActionCard 
            icon={GraduationCap} 
            label="Academy" 
            meta="72% complété" 
            color="orange" 
            href="/academy" 
          />
        </section>

        {/* The Flow - Prioritizing Value */}
        <section className="space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="font-mono text-[10px] uppercase tracking-widest text-muted-2 font-bold flex items-center gap-2">
              <Zap className="w-3 h-3 text-gold" /> Flux de Valeur
            </h3>
            <div className="flex gap-2">
              <button className="text-[9px] font-bold text-cyan uppercase tracking-wider underline underline-offset-4">Tout</button>
              <button className="text-[9px] font-bold text-muted-2 uppercase tracking-wider">Cellule</button>
            </div>
          </div>

          <div className="space-y-4">
            <FlowItem 
              type="opportunity" 
              title="Mission : Consultant Marketing Digital" 
              meta="Partenaire Vérifié · 3 mois" 
              tag="PRO · ACCÈS ANTICIPÉ"
              content="Recherche d'un expert KONEKT pour piloter le lancement d'une nouvelle marque. Rémunéré."
              color="orange"
              icon={Briefcase}
              cta="Postuler"
            />
            
            <FlowItem 
              type="learning" 
              title="Workshop : Pitch & Finance" 
              meta="Academy · Mentorat Collectif" 
              tag="DEMAIN 18H"
              content="Apprenez à structurer votre présentation pour les investisseurs du Project Lab."
              color="gold"
              icon={GraduationCap}
              cta="S'inscrire"
            />

            <FlowItem 
              type="project" 
              title="Nouveau Projet : AgroTech RDC" 
              meta="Project Lab · Cellule Gombe" 
              tag="RECHERCHE ASSOCIÉS"
              content="Junior K. recherche 2 développeurs et 1 commercial pour rejoindre son équipe logistique."
              color="cyan"
              icon={Rocket}
              cta="Rejoindre"
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
    <Link href={href} className={`glass-card p-5 rounded-[2rem] border-${color}/20 hover:border-${color}/40 transition-all group flex flex-col justify-between h-full`}>
      <div className={`w-12 h-12 rounded-2xl bg-${color}/10 flex items-center justify-center text-${color} mb-4 group-hover:scale-110 transition-transform`}>
        <Icon className="w-6 h-6" />
      </div>
      <div>
        <p className="font-display font-bold text-sm text-text mb-1">{label}</p>
        <p className="text-[9px] text-muted-2 font-mono uppercase">{meta}</p>
      </div>
    </Link>
  );
}

function FlowItem({ title, meta, tag, content, color, icon: Icon, cta }: any) {
  return (
    <article className={`glass-card p-6 rounded-[2.5rem] space-y-4 border-l-4 border-${color} hover:translate-x-1 transition-transform cursor-pointer`}>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className={`w-10 h-10 rounded-xl bg-${color}/10 flex items-center justify-center text-${color} border border-${color}/20`}>
            <Icon className="w-5 h-5" />
          </div>
          <div>
            <p className="text-[10px] text-muted-2 font-bold uppercase font-mono leading-none mb-1">{meta}</p>
            <Badge className={`bg-${color}/10 text-${color} border-${color}/30 text-[8px] font-mono py-0 h-4`}>{tag}</Badge>
          </div>
        </div>
      </div>
      <div className="space-y-2">
        <h3 className="font-display font-semibold text-base leading-tight text-text">{title}</h3>
        <p className="text-[12px] text-muted leading-relaxed line-clamp-2">{content}</p>
      </div>
      <div className="pt-2 border-t border-border/30 flex justify-between items-center">
        <Button size="sm" variant="ghost" className={`text-[10px] h-8 px-0 hover:bg-transparent text-${color} font-black uppercase tracking-widest gap-2`}>
          {cta} <ArrowRight className="w-3.5 h-3.5" />
        </Button>
      </div>
    </article>
  );
}
