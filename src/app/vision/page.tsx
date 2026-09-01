'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Network, Users, Zap, ShieldCheck, Rocket, Target, Heart } from 'lucide-react';

export default function VisionPage() {
  return (
    <div className="min-h-screen relative overflow-hidden bg-ink text-text selection:bg-primary/30">
      {/* Background avec Neuro-connections */}
      <div className="absolute inset-0 z-0">
        <Image 
          src="https://picsum.photos/seed/neuro3/1920/1080" 
          alt="Neuro Connections Vision" 
          fill 
          className="object-cover opacity-10"
          priority
          data-ai-hint="neural network"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-ink via-ink/90 to-ink" />
      </div>

      <nav className="fixed top-0 w-full z-50 border-b border-white/5 bg-ink/60 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 group">
            <ArrowLeft className="w-5 h-5 text-muted group-hover:text-primary transition-colors" />
            <span className="font-display font-bold text-lg tracking-tighter text-text">RETOUR</span>
          </Link>
          <div className="flex gap-4">
            <Button asChild variant="ghost" className="hidden sm:flex text-text hover:text-primary">
              <Link href="/governance">Transparence</Link>
            </Button>
            <Button asChild className="rounded-xl font-bold px-6 bg-primary text-primary-foreground hover:bg-primary/90">
              <Link href="/join">REJOINDRE</Link>
            </Button>
          </div>
        </div>
      </nav>

      <main className="relative z-10 pt-32 pb-20 px-6 max-w-4xl mx-auto space-y-32">
        {/* Hero Section */}
        <section className="text-center space-y-8">
          <div className="inline-flex items-center gap-2 px-6 py-2 rounded-full glass-card text-accent border-accent/20 text-[10px] font-black uppercase tracking-[0.4em] animate-in fade-in slide-in-from-top-4 duration-1000">
            <Zap className="w-3.5 h-3.5" /> Manifeste KONEKT ID
          </div>
          <h1 className="text-5xl md:text-8xl font-display font-bold tracking-tighter text-text leading-[0.9] animate-in fade-in slide-in-from-bottom-6 duration-1000">
            Une génération <span className="text-primary">connectée</span> <br />
            pour construire demain.
          </h1>
          <p className="text-xl md:text-2xl text-muted max-w-2xl mx-auto leading-relaxed font-medium">
            Plus qu'un réseau, KONEKT est une organisation économique et communautaire portée par sa propre génération.
          </p>
        </section>

        {/* 1. Les Fondations */}
        <section className="space-y-16">
          <div className="space-y-4">
            <h2 className="font-mono text-[10px] uppercase tracking-[0.4em] text-accent font-black">01. Fondations</h2>
            <h3 className="text-4xl font-display font-bold text-text">Pourquoi KONEKT existe ?</h3>
          </div>
          
          <div className="grid md:grid-cols-2 gap-12">
            <div className="glass-card p-8 rounded-[2.5rem] border-white/5 space-y-4">
              <h4 className="text-xl font-bold text-primary">Le Constat</h4>
              <p className="text-muted leading-relaxed text-sm">
                La jeunesse possède des idées et de l'énergie, mais ces ressources restent isolées. Le problème n'est pas le manque de potentiel, mais le manque de connexion et de structuration.
              </p>
            </div>
            <div className="glass-card p-8 rounded-[2.5rem] border-accent/20 space-y-4">
              <h4 className="text-xl font-bold text-accent">La Réponse</h4>
              <p className="text-muted leading-relaxed text-sm">
                KONEKT construit une communauté organisée où les membres peuvent : <br/>
                <span className="text-text font-bold">Se connecter → Apprendre → Collaborer → Entreprendre.</span>
              </p>
            </div>
          </div>
        </section>

        {/* 2. Les Piliers */}
        <section className="space-y-16">
          <div className="space-y-4">
            <h2 className="font-mono text-[10px] uppercase tracking-[0.4em] text-primary font-black">02. Les 5 Piliers</h2>
            <h3 className="text-4xl font-display font-bold text-text">Nos valeurs non-négociables.</h3>
          </div>

          <div className="grid gap-6">
            <VisionBlock icon={Network} title="Connexion" desc="Créer des relations utiles : Personnes ↔ Compétences ↔ Opportunités." color="text-primary" />
            <VisionBlock icon={Target} title="Éducation" desc="Accès aux connaissances pratiques : Entrepreneuriat, Numérique, Finance, Leadership." color="text-accent" />
            <VisionBlock icon={Users} title="Collaboration" desc="Construire ensemble plutôt que de travailler isolément." color="text-primary" />
            <VisionBlock icon={Rocket} title="Opportunités" desc="Faire circuler : Emplois, Missions, Financements et Partenariats." color="text-accent" />
            <VisionBlock icon={ShieldCheck} title="Création de Valeur" desc="Développer des activités économiques durables pour les membres." color="text-text" />
          </div>
        </section>

        {/* 3. Le Modèle */}
        <section className="space-y-16">
          <div className="space-y-4">
            <h2 className="font-mono text-[10px] uppercase tracking-[0.4em] text-accent font-black">03. Organisation</h2>
            <h3 className="text-4xl font-display font-bold text-text">La Cellule de 20.</h3>
          </div>

          <div className="glass-card p-12 rounded-[3rem] border-primary/20 bg-gradient-to-br from-primary/5 to-transparent flex flex-col md:flex-row items-center gap-12">
            <div className="w-40 h-40 k-hex-clip bg-primary/20 border-2 border-primary flex items-center justify-center text-primary shrink-0">
              <Users className="w-20 h-20" />
            </div>
            <div className="space-y-6">
              <p className="text-lg text-muted leading-relaxed">
                KONEKT est décentralisé. Chaque membre appartient à une <span className="text-text font-bold">Cellule de 20 membres</span> animée par un Leader. C'est l'assurance d'être connu, accompagné et de pouvoir participer réellement.
              </p>
              <div className="flex flex-wrap gap-4">
                <Badge variant="outline" className="border-primary/30 text-primary">DÉCENTRALISATION</Badge>
                <Badge variant="outline" className="border-accent/30 text-accent">PROXIMITÉ</Badge>
                <Badge variant="outline" className="border-white/20 text-text">IMPACT</Badge>
              </div>
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="text-center space-y-12 py-20">
          <div className="space-y-4">
            <h2 className="text-4xl font-display font-bold text-text">La promesse de KONEKT</h2>
            <p className="text-xl text-muted italic">
              "KONEKT va créer l'environnement dans lequel tu peux accéder à davantage de connexions pour construire ton avenir."
            </p>
          </div>
          <Button asChild size="lg" className="h-20 px-12 rounded-[2.5rem] text-xl font-bold bg-primary text-primary-foreground hover:bg-primary/90 shadow-2xl shadow-primary/30 group transition-all">
            <Link href="/join" className="flex items-center">
              Créer mon ID KONEKT <ArrowLeft className="ml-3 w-6 h-6 rotate-180 group-hover:translate-x-1 transition-transform" />
            </Link>
          </Button>
        </section>
      </main>

      <footer className="border-t border-white/5 py-12 px-6">
        <div className="max-w-4xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center font-display font-bold text-primary-foreground">K</div>
            <span className="font-display font-bold text-text tracking-tighter">KONEKT ID</span>
          </div>
          <p className="text-[10px] font-mono text-muted uppercase tracking-widest text-center">
            Indépendant de Digital Event · Fondations 2026
          </p>
          <div className="flex gap-6">
            <Link href="/governance" className="text-[10px] font-bold text-muted hover:text-primary uppercase tracking-widest transition-colors">Gouvernance</Link>
            <Link href="/academy" className="text-[10px] font-bold text-muted hover:text-primary uppercase tracking-widest transition-colors">Academy</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}

function VisionBlock({ icon: Icon, title, desc, color }: any) {
  return (
    <div className="flex items-start gap-6 p-6 glass-card rounded-[2rem] border-white/5 group hover:border-primary/20 transition-all">
      <div className={`w-14 h-14 rounded-2xl bg-surface-2 flex items-center justify-center ${color} border border-white/5 group-hover:scale-110 transition-transform`}>
        <Icon className="w-6 h-6" />
      </div>
      <div className="space-y-1">
        <h4 className="text-lg font-bold text-text">{title}</h4>
        <p className="text-sm text-muted leading-relaxed">{desc}</p>
      </div>
    </div>
  );
}