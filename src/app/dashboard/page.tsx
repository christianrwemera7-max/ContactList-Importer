
'use client';

import { Bell, Zap, Rocket, GraduationCap, ArrowRight, Briefcase, TrendingUp, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { BottomNav } from '@/components/layout/BottomNav';
import { EngagementStats } from '@/components/dashboard/EngagementStats';
import Link from 'next/link';
import { useKonekt } from '@/lib/store';
import { AppSidebar } from '@/components/layout/AppSidebar';

export default function Dashboard() {
  const { state } = useKonekt();
  const user = state.currentUser;

  if (!user) return null;

  return (
    <div className="flex flex-col min-h-screen pb-24 md:pb-0 bg-ink connected-nodes">
      <AppSidebar />
      
      <header className="px-5 py-6 flex items-center justify-between sticky top-0 bg-ink/80 backdrop-blur-md z-40 border-b border-white/5">
        <div className="flex flex-col">
          <h1 className="font-display font-bold text-xl tracking-tight text-white">FLUX DE VALEUR</h1>
          <p className="text-[9px] font-mono text-muted uppercase tracking-[0.2em] font-black">Activation KONEKT ID · Kinshasa</p>
        </div>
        <div className="flex gap-3">
          <button className="w-10 h-10 flex items-center justify-center rounded-xl bg-surface border border-white/5 text-muted hover:text-orange transition-colors relative">
            <Bell className="w-5 h-5" />
            <div className="absolute top-2 right-2 w-2 h-2 bg-orange rounded-full border-2 border-ink" />
          </button>
          <Link href="/profile" className="w-10 h-10 rounded-xl bg-gradient-to-tr from-orange to-blue-electric p-[1.5px] hover:rotate-6 transition-transform">
            <div className="w-full h-full rounded-[10px] bg-surface flex items-center justify-center font-display font-bold text-xs text-white">
              {user.name.split(' ').map(n => n[0]).join('')}
            </div>
          </Link>
        </div>
      </header>

      <main className="md:ml-72 flex-1 px-5 space-y-8 max-w-2xl mx-auto w-full py-8">
        
        {/* Engagement Matrix */}
        <EngagementStats />

        {/* Quick Launchpad */}
        <section className="grid grid-cols-2 gap-4">
          <ActionCard 
            icon={Rocket} 
            label="Project Lab" 
            meta="3 besoins ouverts" 
            color="orange" 
            href="/opportunities?tab=projects" 
          />
          <ActionCard 
            icon={GraduationCap} 
            label="Academy" 
            meta="72% complété" 
            color="blue-electric" 
            href="/academy" 
          />
        </section>

        {/* AI Assistant Hook */}
        <div className="glass-card p-6 rounded-[2.5rem] border-orange/20 bg-gradient-to-br from-orange/5 to-transparent flex items-start gap-4">
          <div className="w-10 h-10 rounded-xl bg-orange/10 flex items-center justify-center text-orange flex-shrink-0">
            <Sparkles className="w-5 h-5" />
          </div>
          <div className="space-y-2">
            <h4 className="text-sm font-bold text-white">Prêt pour votre prochaine étape ?</h4>
            <p className="text-[11px] text-muted leading-relaxed">
              L'IA KONEKT a analysé votre profil. Vous devriez contacter <b>Sarah M.</b> de votre cellule pour votre projet AgroTech.
            </p>
            <button className="text-[10px] text-orange font-black uppercase tracking-widest hover:underline">Voir les recommandations</button>
          </div>
        </div>

        {/* The Flow Content */}
        <section className="space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted font-black flex items-center gap-2">
              <Zap className="w-3 h-3 text-orange" /> Flux Prioritaire
            </h3>
            <div className="flex gap-3">
              <button className="text-[10px] font-bold text-orange uppercase tracking-widest border-b-2 border-orange pb-1">Pour moi</button>
              <button className="text-[10px] font-bold text-muted uppercase tracking-widest pb-1">Cellule</button>
            </div>
          </div>

          <div className="space-y-4">
            <FlowItem 
              type="opportunity" 
              title="Mission : Consultant Stratégie" 
              meta="Fintech Hub · Gombe" 
              tag="PRO · 48H D'AVANCE"
              content="Recherche d'un expert pour le déploiement d'une solution de paiement mobile."
              color="orange"
              icon={Briefcase}
              cta="Postuler"
            />
            
            <FlowItem 
              type="project" 
              title="Projet : E-Logistique RDC" 
              meta="Project Lab · Cellule Limete" 
              tag="RECHERCHE ASSOCIÉS"
              content="Nous cherchons 1 CTO et 1 responsable logistique pour lancer la phase pilote."
              color="blue-electric"
              icon={Rocket}
              cta="Rejoindre"
            />

            <FlowItem 
              type="learning" 
              title="Workshop : Fiscalité PME" 
              meta="Academy · Expert DGI" 
              tag="MARDI 18H"
              content="Session exclusive sur la gestion des taxes pour les startups kimoises."
              color="gold"
              icon={GraduationCap}
              cta="S'inscrire"
            />
          </div>
        </section>
      </main>

      <BottomNav />
    </div>
  );
}

function ActionCard({ icon: Icon, label, meta, color, href }: any) {
  const colorClass = color === 'orange' ? 'text-orange bg-orange/10 border-orange/20' : 'text-blue-electric bg-blue-electric/10 border-blue-electric/20';
  
  return (
    <Link href={href} className={`glass-card p-5 rounded-[2rem] border hover:border-orange/40 transition-all group flex flex-col justify-between h-full bg-surface/50`}>
      <div className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform ${colorClass}`}>
        <Icon className="w-6 h-6" />
      </div>
      <div>
        <p className="font-display font-bold text-sm text-white mb-1">{label}</p>
        <p className="text-[9px] text-muted font-mono uppercase font-black">{meta}</p>
      </div>
    </Link>
  );
}

function FlowItem({ title, meta, tag, content, color, icon: Icon, cta }: any) {
  const borderColor = color === 'orange' ? 'border-orange' : color === 'blue-electric' ? 'border-blue-electric' : 'border-gold';
  const iconBg = color === 'orange' ? 'bg-orange/10 text-orange' : color === 'blue-electric' ? 'bg-blue-electric/10 text-blue-electric' : 'bg-gold/10 text-gold';

  return (
    <article className={`glass-card p-6 rounded-[2.5rem] space-y-4 border-l-4 ${borderColor} hover:translate-x-1 transition-all cursor-pointer bg-surface/40`}>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className={`w-10 h-10 rounded-xl flex items-center justify-center border border-white/5 ${iconBg}`}>
            <Icon className="w-5 h-5" />
          </div>
          <div>
            <p className="text-[9px] text-muted font-black uppercase font-mono tracking-widest">{meta}</p>
            <Badge className={`bg-white/5 text-white border-white/10 text-[8px] font-mono py-0 h-4 mt-1`}>{tag}</Badge>
          </div>
        </div>
      </div>
      <div className="space-y-2">
        <h3 className="font-display font-semibold text-base text-white tracking-tight leading-tight">{title}</h3>
        <p className="text-[11px] text-muted leading-relaxed line-clamp-2">{content}</p>
      </div>
      <div className="pt-2 border-t border-white/5 flex justify-between items-center">
        <Button size="sm" variant="ghost" className={`text-[10px] h-8 px-0 hover:bg-transparent text-white font-black uppercase tracking-[0.2em] gap-2`}>
          {cta} <ArrowRight className="w-3.5 h-3.5 text-orange" />
        </Button>
      </div>
    </article>
  );
}
