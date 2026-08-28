
'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { APP_NAME } from '@/lib/constants';
import { ArrowRight, Shield, Zap, Globe, Sparkles, Users, Rocket, GraduationCap } from 'lucide-react';

/**
 * @fileOverview Landing Page publique de KONEKT.
 * Véhicule la vision de la Génération Connectée.
 */

export default function LandingPage() {
  return (
    <div className="min-h-screen connected-nodes relative overflow-x-hidden">
      {/* Background elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none -z-10">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-primary/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-cyan/10 rounded-full blur-[120px]" />
      </div>

      {/* Hero Section */}
      <section className="relative pt-32 pb-24">
        <div className="max-w-7xl mx-auto px-6 relative z-10 text-center space-y-8">
          <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full glass-card text-primary text-xs font-bold uppercase tracking-widest animate-in fade-in slide-in-from-top-4 duration-700">
            <Sparkles className="w-4 h-4" />
            Une génération connectée pour construire demain
          </div>
          <h1 className="text-6xl md:text-8xl font-display font-bold tracking-tighter leading-none">
            Rejoindre <span className="text-primary">{APP_NAME}</span>
          </h1>
          <p className="text-xl text-muted max-w-2xl mx-auto leading-relaxed">
            L'écosystème numérique pour se connecter, apprendre, collaborer et entreprendre au cœur d'une communauté structurée.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-5 pt-8">
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
        <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
          <PillarCard icon={Users} title="Connexion" description="Se rencontrer et bâtir des relations solides." color="text-accent" />
          <PillarCard icon={GraduationCap} title="Éducation" description="Apprendre les compétences de demain." color="text-gold" />
          <PillarCard icon={Zap} title="Collaboration" description="Travailler ensemble sur des projets réels." color="text-orange" />
          <PillarCard icon={Rocket} title="Opportunités" description="Accéder au marché et aux financements." color="text-primary" />
          <PillarCard icon={Shield} title="Valeur" description="Construire des solutions à fort impact." color="text-cyan" />
        </div>
      </section>

      {/* Vision Statement */}
      <section className="py-24 max-w-5xl mx-auto px-6 text-center space-y-12 bg-surface-2/30 rounded-[3rem] border border-white/5 my-10">
        <h2 className="text-3xl font-display font-bold">Pourquoi KONEKT ?</h2>
        <p className="text-muted text-lg leading-relaxed italic max-w-3xl mx-auto">
          "Nous croyons qu'une génération connectée peut construire plus qu'une génération isolée. Chaque année passée dans KONEKT vous rend plus compétent, plus connecté et plus capable de créer de la valeur."
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-6">
          <div className="p-8 glass-card rounded-[2.5rem] space-y-4 border-accent/20">
            <h3 className="text-xl font-bold text-accent">Appartenance</h3>
            <p className="text-sm text-muted">Faites partie d'une cellule locale de 20 membres pour avancer ensemble.</p>
          </div>
          <div className="p-8 glass-card rounded-[2.5rem] space-y-4 border-primary/20">
            <h3 className="text-xl font-bold text-primary">Progression</h3>
            <p className="text-sm text-muted">Évoluez de Membre à Leader grâce à l'Academy et aux projets réels.</p>
          </div>
          <div className="p-8 glass-card rounded-[2.5rem] space-y-4 border-gold/20">
            <h3 className="text-xl font-bold text-gold">Opportunité</h3>
            <p className="text-sm text-muted">Accédez à des emplois, stages et financements exclusifs à notre réseau.</p>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-20 border-t border-border/50">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <Stat label="Membres" value="8,742" />
          <Stat label="Cellules" value="437" />
          <Stat label="Formations" value="125" />
          <Stat label="Projets" value="42" />
        </div>
      </section>
      
      <footer className="py-10 text-center text-[10px] font-mono text-muted-2 uppercase tracking-[0.2em] border-t border-border/30">
        © 2026 {APP_NAME} — La Génération Connectée
      </footer>
    </div>
  );
}

function PillarCard({ icon: Icon, title, description, color }: any) {
  return (
    <div className="glass-card p-8 rounded-[2.5rem] space-y-4 group hover:translate-y-[-4px] transition-all">
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
      <p className="text-4xl font-display font-bold text-primary tracking-tighter">{value}</p>
      <p className="text-[10px] font-mono text-muted-2 uppercase tracking-widest">{label}</p>
    </div>
  );
}
