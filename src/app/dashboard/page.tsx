'use client';

import { Search, Bell, Zap, Trophy, Rocket, GraduationCap, Heart, Users, ArrowRight, Star, Briefcase, PlusCircle, TrendingUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { BottomNav } from '@/components/layout/BottomNav';
import { Progress } from '@/components/ui/progress';
import Link from 'next/link';

export default function Dashboard() {
  return (
    <div className="flex flex-col min-h-screen pb-24 md:pb-0 bg-ink">
      {/* Header Statutaire */}
      <header className="px-5 py-6 flex items-center justify-between sticky top-0 bg-ink/80 backdrop-blur-md z-40 border-b border-border/50">
        <div className="flex flex-col">
          <h1 className="font-display font-bold text-xl tracking-tight">KONEKT FLOW</h1>
          <p className="text-[10px] font-mono text-muted-2 uppercase tracking-widest">Membre actif · Kinshasa Centre</p>
        </div>
        <div className="flex gap-3">
          <button className="w-10 h-10 flex items-center justify-center rounded-xl bg-surface-2 border border-border text-muted-2 relative group hover:text-cyan transition-colors">
            <Bell className="w-5 h-5" />
            <div className="absolute top-0 right-0 w-2.5 h-2.5 bg-orange rounded-full border-2 border-ink" />
          </button>
          <Link href="/profile" className="w-10 h-10 rounded-xl bg-gradient-to-tr from-cyan to-orange p-[1.5px]">
            <div className="w-full h-full rounded-[10px] bg-surface-3 flex items-center justify-center font-display font-bold text-xs text-text">JK</div>
          </Link>
        </div>
      </header>

      <main className="px-5 space-y-8 max-w-2xl mx-auto w-full py-6">
        {/* Engagement & Activation (Règle n°12.12) */}
        <section className="glass-card p-6 rounded-[2.5rem] border-cyan/20 bg-gradient-to-br from-cyan/5 to-transparent relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:scale-110 transition-transform">
            <TrendingUp className="w-24 h-24 text-cyan" />
          </div>
          <div className="flex items-center justify-between mb-6">
            <div className="space-y-1">
              <h2 className="font-display font-bold text-lg text-text">Christian Rwemera</h2>
              <div className="flex gap-2">
                <Badge className="bg-cyan/10 text-cyan border-cyan/30 text-[9px] uppercase font-mono">TIER: PLUS</Badge>
                <Badge className="bg-gold/10 text-gold border-gold/30 text-[9px] uppercase font-mono">LEADER</Badge>
              </div>
            </div>
            <div className="text-right">
              <p className="text-[9px] font-mono text-muted-2 uppercase font-bold tracking-widest">KONEKT Score</p>
              <p className="text-3xl font-display font-bold text-gold">850</p>
            </div>
          </div>
          
          <div className="space-y-4">
            <div className="flex justify-between text-[10px] font-bold">
              <span className="text-muted-2 uppercase tracking-wider">Objectif Activation</span>
              <span className="text-cyan">75%</span>
            </div>
            <Progress value={75} className="h-2 bg-surface-3" indicatorClassName="bg-cyan shadow-[0_0_10px_rgba(51,230,200,0.3)]" />
            <p className="text-[10px] text-muted leading-relaxed">
              Plus que <b className="text-text">150 pts</b> pour débloquer le badge <b className="text-gold uppercase font-mono">Expert</b>.
            </p>
          </div>
        </section>

        {/* Quick Actions - L'accès rapide aux piliers */}
        <section className="grid grid-cols-2 gap-4">
          <ActionCard 
            icon={Users} 
            label="Ma Cellule" 
            meta="Prochaine rencontre : Sam. 15h" 
            color="cyan" 
            href="/community" 
          />
          <ActionCard 
            icon={GraduationCap} 
            label="Academy" 
            meta="72% de progression" 
            color="orange" 
            href="/academy" 
          />
        </section>

        {/* KONEKT FLOW - Priorité à la Valeur (Règle n°11.18) */}
        <section className="space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="font-mono text-[10px] uppercase tracking-widest text-muted-2 font-bold flex items-center gap-2">
              <Zap className="w-3 h-3 text-gold" /> Flux d'Activation
            </h3>
            <div className="flex gap-2">
              <button className="text-[9px] font-bold text-cyan uppercase tracking-wider underline underline-offset-4">Tout</button>
              <button className="text-[9px] font-bold text-muted-2 uppercase tracking-wider">Cellule</button>
            </div>
          </div>

          <div className="space-y-4">
            {/* Opportunity Item */}
            <FlowItem 
              type="opportunity" 
              title="Mission : Consultant Marketing Digital" 
              meta="Partenaire Vérifié · Projet 3 mois" 
              tag="PRO · ACCÈS ANTICIPÉ"
              content="Recherche d'un expert KONEKT pour piloter le lancement d'une nouvelle marque agro-alimentaire. Rémunéré."
              color="orange"
              icon={Briefcase}
              cta="Voir l'offre"
            />
            
            {/* Learning Item */}
            <FlowItem 
              type="learning" 
              title="Workshop : Pitch & Finance" 
              meta="Academy · Mentorat Collectif" 
              tag="DEMAIN 18H"
              content="Apprenez à structurer votre présentation pour les investisseurs du Project Lab. (Réservé PLUS & PRO)"
              color="gold"
              icon={GraduationCap}
              cta="M'inscrire"
            />

            {/* Project Item */}
            <FlowItem 
              type="project" 
              title="Nouveau Projet : AgroTech RDC" 
              meta="Project Lab · Cellule Gombe" 
              tag="RECHERCHE ASSOCIÉS"
              content="Junior K. vient de soumettre son idée. Il recherche 2 développeurs et 1 commercial pour rejoindre l'équipe."
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
    <Link href={href} className={`glass-card p-5 rounded-[2rem] border-${color}/20 hover:border-${color}/40 transition-all cursor-pointer group flex flex-col justify-between h-full`}>
      <div className={`w-12 h-12 rounded-2xl bg-${color}/10 flex items-center justify-center text-${color} mb-4 group-hover:scale-110 transition-transform border border-${color}/20`}>
        <Icon className="w-6 h-6" />
      </div>
      <div>
        <p className="font-display font-bold text-sm text-text mb-1">{label}</p>
        <p className="text-[9px] text-muted-2 font-mono uppercase leading-tight">{meta}</p>
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
        <Button size="sm" variant="ghost" className={`text-[10px] h-8 px-0 hover:bg-transparent text-${color} font-black uppercase tracking-widest gap-2 group`}>
          {cta} <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
        </Button>
      </div>
    </article>
  );
}
