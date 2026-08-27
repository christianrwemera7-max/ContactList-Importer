
'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { APP_NAME } from '@/lib/constants';
import { ArrowRight, Shield, Zap, Globe, Sparkles, Users, Rocket, GraduationCap } from 'lucide-react';

export default function LandingPage() {
  return (
    <div className="min-h-screen connected-nodes relative">
      {/* Hero Section */}
      <section className="relative pt-32 pb-24 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 relative z-10 text-center space-y-8">
          <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full glass-card text-primary text-xs font-bold uppercase tracking-widest animate-in fade-in slide-in-from-top-4 duration-700">
            <Sparkles className="w-4 h-4" />
            Une génération connectée pour demain
          </div>
          <h1 className="text-6xl md:text-8xl font-display font-bold tracking-tighter leading-none animate-in fade-in slide-in-from-bottom-4 duration-700 delay-200">
            Rejoindre <span className="text-primary">{APP_NAME}</span>
          </h1>
          <p className="text-xl text-muted max-w-2xl mx-auto leading-relaxed animate-in fade-in duration-1000 delay-500">
            L'écosystème numérique pour se connecter, apprendre, collaborer et entreprendre au cœur d'une communauté structurée.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-5 pt-8 animate-in fade-in slide-in-from-bottom-8 duration-700 delay-700">
            <Button asChild size="lg" className="h-16 px-10 rounded-[2rem] text-lg font-bold bg-primary hover:bg-primary/90 text-ink shadow-2xl shadow-primary/20">
              <Link href="/join">
                Rejoindre KONEKT <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
            </Button>
            <Button variant="outline" size="lg" className="h-16 px-10 rounded-[2rem] text-lg font-bold glass-card border-border hover:bg-surface-2 transition-all">
              Découvrir la vision
            </Button>
          </div>
        </div>
      </section>

      {/* Pillars Grid */}
      <section className="py-24 max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
          <PillarCard 
            icon={Users}
            title="Connexion"
            description="Appartenir à une cellule locale de 20 membres."
            color="text-accent"
          />
          <PillarCard 
            icon={GraduationCap}
            title="Éducation"
            description="Accéder à KONEKT Academy et aux mentors."
            color="text-gold"
          />
          <PillarCard 
            icon={Zap}
            title="Collaboration"
            description="Travailler ensemble sur des projets réels."
            color="text-orange"
          />
          <PillarCard 
            icon={Rocket}
            title="Opportunités"
            description="Jobs, stages et financements exclusifs."
            color="text-primary"
          />
          <PillarCard 
            icon={Shield}
            title="Valeur"
            description="Construire un actif et une réputation forte."
            color="text-cyan"
          />
        </div>
      </section>

      {/* Social Proof */}
      <section className="py-20 border-t border-border/50">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <Stat label="Membres" value="8,742" />
          <Stat label="Cellules" value="437" />
          <Stat label="Formations" value="125" />
          <Stat label="Projets" value="42" />
        </div>
      </section>
    </div>
  );
}

function PillarCard({ icon: Icon, title, description, color }: any) {
  return (
    <div className="glass-card p-8 rounded-[2.5rem] space-y-4 group">
      <div className={`w-12 h-12 rounded-2xl bg-surface-3 flex items-center justify-center ${color} border border-border group-hover:scale-110 transition-transform`}>
        <Icon className="w-6 h-6" />
      </div>
      <h3 className="text-lg font-display font-bold">{title}</h3>
      <p className="text-xs text-muted leading-relaxed">{description}</p>
    </div>
  );
}

function Stat({ label, value }: any) {
  return (
    <div className="space-y-1">
      <p className="text-3xl font-display font-bold text-primary">{value}</p>
      <p className="text-[10px] font-mono text-muted-2 uppercase tracking-widest">{label}</p>
    </div>
  );
}
