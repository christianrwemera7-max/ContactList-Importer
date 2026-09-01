
'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  ArrowLeft, 
  Network, 
  Users, 
  Zap, 
  ShieldCheck, 
  Target, 
  Briefcase,
  Sparkles
} from 'lucide-react';

export default function VisionPage() {
  return (
    <div className="min-h-screen relative overflow-hidden bg-ink text-white selection:bg-primary/30">
      {/* Background avec Neuro-connections */}
      <div className="absolute inset-0 z-0">
        <Image 
          src="https://picsum.photos/seed/neuro3/1920/1080" 
          alt="Neuro Connections Vision" 
          fill 
          className="object-cover opacity-10 grayscale"
          priority
          data-ai-hint="neural network"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-ink via-ink/90 to-ink" />
      </div>

      <nav className="fixed top-0 w-full z-50 border-b border-white/5 bg-ink/60 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 group">
            <ArrowLeft className="w-5 h-5 text-muted-2 group-hover:text-primary transition-colors" />
            <span className="font-display font-bold text-lg tracking-tighter text-white">RETOUR</span>
          </Link>
          <div className="flex gap-4">
            <Button asChild variant="ghost" className="hidden sm:flex text-white hover:text-primary">
              <Link href="/governance">Transparence</Link>
            </Button>
            <Button asChild className="rounded-xl font-bold px-6 bg-primary text-white hover:bg-primary/90 shadow-lg shadow-primary/20">
              <Link href="/join">REJOINDRE</Link>
            </Button>
          </div>
        </div>
      </nav>

      <main className="relative z-10 pt-32 pb-20 px-6 max-w-4xl mx-auto space-y-32">
        {/* Hero Section */}
        <section className="text-center space-y-8">
          <div className="inline-flex items-center gap-2 px-6 py-2 rounded-full glass-card text-primary border-primary/20 text-[10px] font-black uppercase tracking-[0.4em]">
            <Zap className="w-3.5 h-3.5" /> Manifeste KONEKT ID
          </div>
          <h1 className="text-5xl md:text-8xl font-display font-bold tracking-tighter text-white leading-[0.9]">
            Une génération <span className="text-primary">connectée</span> <br />
            pour construire demain.
          </h1>
          <p className="text-xl md:text-2xl text-muted-2 max-w-2xl mx-auto leading-relaxed font-medium italic">
            "KONEKT n'est pas un simple réseau social. C'est une organisation économique et communautaire portée par sa propre génération."
          </p>
        </section>

        {/* Vision & Mission */}
        <section className="space-y-16">
          <div className="space-y-4 text-center">
            <h2 className="font-mono text-[10px] uppercase tracking-[0.4em] text-primary font-black">NOS PILIERS</h2>
            <h3 className="text-4xl font-display font-bold text-white">Fondations de la Valeur</h3>
          </div>

          <div className="grid gap-6">
            <VisionBlock icon={Network} title="Connexion" desc="Créer des relations utiles entre personnes, compétences et opportunités." color="text-primary" />
            <VisionBlock icon={Target} title="Éducation" desc="Accès aux connaissances pratiques : Entrepreneuriat, Numérique, Leadership." color="text-gold" />
            <VisionBlock icon={Users} title="Collaboration" desc="Construire ensemble plutôt que de travailler isolément." color="text-primary" />
            <VisionBlock icon={Briefcase} title="Opportunités" desc="Faire circuler emplois, missions et financements vérifiés." color="text-gold" />
            <VisionBlock icon={ShieldCheck} title="Création de Valeur" desc="Développer des activités économiques durables pour les membres." color="text-white" />
          </div>
        </section>

        {/* Le Modèle */}
        <section className="space-y-16">
          <div className="space-y-4">
            <h2 className="font-mono text-[10px] uppercase tracking-[0.4em] text-gold font-black">LE MODÈLE</h2>
            <h3 className="text-4xl font-display font-bold text-white">Niveaux de Contribution</h3>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <TierCard name="START" price="5$/mois" desc="Appartenir. Accès communauté et bibliothèque." color="border-white/10" />
            <TierCard name="PLUS" price="10$/mois" desc="S'impliquer. Formations spécialisées et mentorat." color="border-primary/40" />
            <TierCard name="PRO" price="20$/mois" desc="Accélérer. Accompagnement de projet et Lab PRO." color="border-gold/40" />
          </div>
        </section>
      </main>

      <footer className="border-t border-white/5 py-12 px-6 bg-ink text-center">
        <div className="max-w-4xl mx-auto flex flex-col items-center gap-6">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center font-display font-bold text-white shadow-lg">K</div>
            <span className="font-display font-bold text-white tracking-tighter">KONEKT ID</span>
          </div>
          <p className="text-[10px] font-mono text-muted-2 uppercase tracking-widest">
            Indépendant de Digital Event · Fondations 2026
          </p>
        </div>
      </footer>
    </div>
  );
}

function VisionBlock({ icon: Icon, title, desc, color }: any) {
  return (
    <div className="flex items-start gap-6 p-6 glass-card rounded-[2rem] border-white/5 group hover:border-primary/20 transition-all">
      <div className={`w-14 h-14 rounded-2xl bg-surface-3 flex items-center justify-center ${color} border border-white/5 group-hover:scale-110 transition-transform`}>
        <Icon className="w-6 h-6" />
      </div>
      <div className="space-y-1">
        <h4 className="text-lg font-bold text-white">{title}</h4>
        <p className="text-sm text-muted-2 leading-relaxed font-medium">{desc}</p>
      </div>
    </div>
  );
}

function TierCard({ name, price, desc, color }: any) {
  return (
    <div className={`glass-card p-8 rounded-[2.5rem] border ${color} space-y-4 hover:scale-105 transition-transform`}>
      <div className="space-y-1">
        <h4 className="text-xl font-display font-bold text-white">{name}</h4>
        <p className="text-primary font-mono text-sm font-bold">{price}</p>
      </div>
      <p className="text-[11px] text-muted-2 leading-relaxed font-medium">{desc}</p>
    </div>
  );
}
