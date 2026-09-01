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
    <div className="min-h-screen relative overflow-hidden bg-background text-foreground selection:bg-primary/10">
      {/* Background avec Neuro-connections - Version Claire */}
      <div className="absolute inset-0 z-0">
        <Image 
          src="https://picsum.photos/seed/neuro-light/1920/1080" 
          alt="Neuro Connections Vision" 
          fill 
          className="object-cover opacity-5 grayscale brightness-110"
          priority
          data-ai-hint="neural network light"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-white/90 via-white/60 to-white" />
      </div>

      <nav className="fixed top-0 w-full z-50 border-b border-border bg-white/60 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 group">
            <ArrowLeft className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
            <span className="font-display font-bold text-lg tracking-tighter text-foreground">RETOUR</span>
          </Link>
          <div className="flex gap-4">
            <Button asChild variant="ghost" className="hidden sm:flex text-foreground hover:text-primary font-bold uppercase tracking-widest text-[11px]">
              <Link href="/governance">Transparence</Link>
            </Button>
            <Button asChild className="k-cta">
              <Link href="/join">REJOINDRE</Link>
            </Button>
          </div>
        </div>
      </nav>

      <main className="relative z-10 pt-32 pb-20 px-6 max-w-4xl mx-auto space-y-32">
        {/* Hero Section */}
        <section className="text-center space-y-8 animate-in fade-in slide-in-from-bottom-6 duration-1000">
          <div className="inline-flex items-center gap-2 px-6 py-2 rounded-full bg-primary/5 text-primary border border-primary/10 text-[10px] font-black uppercase tracking-[0.4em]">
            <Zap className="w-3.5 h-3.5" /> Manifeste KONEKT ID
          </div>
          <h1 className="text-5xl md:text-7xl font-display font-bold tracking-tighter text-foreground leading-tight uppercase">
            Une génération <span className="text-primary italic">connectée</span> <br />
            pour construire demain.
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto leading-relaxed font-medium italic">
            "KONEKT n'est pas un simple réseau social. C'est une organisation économique et communautaire portée par sa propre génération."
          </p>
        </section>

        {/* Vision & Mission */}
        <section className="space-y-16">
          <div className="space-y-4 text-center">
            <h2 className="font-mono text-[10px] uppercase tracking-[0.4em] text-primary font-black">NOS PILIERS</h2>
            <h3 className="text-4xl font-display font-bold text-foreground uppercase tracking-tight">Fondations de la Valeur</h3>
          </div>

          <div className="grid gap-6">
            <VisionBlock icon={Network} title="Connexion" desc="Créer des relations utiles entre les membres : personnes, compétences et opportunités." color="text-primary" />
            <VisionBlock icon={Target} title="Éducation" desc="Accès aux connaissances pratiques : entrepreneuriat, numérique, finance, leadership." color="text-gold" />
            <VisionBlock icon={Users} title="Collaboration" desc="Encourager les membres à construire ensemble plutôt qu'à travailler isolément." color="text-primary" />
            <VisionBlock icon={Briefcase} title="Opportunités" desc="Faire circuler emplois, missions, stages et partenariats vérifiés." color="text-gold" />
            <VisionBlock icon={ShieldCheck} title="Création de Valeur" desc="Développer des activités économiques durables pour l'organisation et ses membres." color="text-primary" />
          </div>
        </section>

        {/* Le Modèle */}
        <section className="space-y-16">
          <div className="space-y-4 text-center">
            <h2 className="font-mono text-[10px] uppercase tracking-[0.4em] text-gold font-black">LE MODÈLE</h2>
            <h3 className="text-4xl font-display font-bold text-foreground uppercase tracking-tight">Niveaux de Contribution</h3>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <TierCard name="START" price="5$/mois" desc="Appartenir. Accès à la communauté et aux formations générales." color="border-border" />
            <TierCard name="PLUS" price="10$/mois" desc="S'impliquer. Formations spécialisées, mentorat et networking renforcé." color="border-primary/20" />
            <TierCard name="PRO" price="20$/mois" desc="Accélérer. Accompagnement de projet et accès au KONEKT PRO LAB." color="border-gold/30" />
          </div>
        </section>

        <section className="text-center py-20 bg-primary/5 rounded-[3rem] border border-primary/10">
          <div className="max-w-2xl mx-auto space-y-8 px-8">
            <h3 className="text-3xl font-display font-bold text-foreground uppercase tracking-tighter leading-tight">
              Prêt à rejoindre <br /> l'écosystème ?
            </h3>
            <p className="text-muted-foreground text-sm font-medium">
              Nous ne promettons pas la richesse immédiate, mais un environnement structuré pour construire votre avenir collectivement.
            </p>
            <Button asChild className="k-cta h-14 px-10 text-xs">
              <Link href="/join">Démarrer maintenant</Link>
            </Button>
          </div>
        </section>
      </main>

      <footer className="border-t border-border py-20 px-6 bg-white text-center">
        <div className="max-w-4xl mx-auto flex flex-col items-center gap-6">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center font-display font-bold text-white shadow-lg shadow-primary/20 text-xl">K</div>
            <span className="font-display font-bold text-primary tracking-tighter">KONEKT ID</span>
          </div>
          <p className="text-[10px] font-mono text-muted-foreground uppercase tracking-[0.3em] font-black">
            INDÉPENDANT DE DIGITAL EVENT · FONDATIONS 2026
          </p>
        </div>
      </footer>
    </div>
  );
}

function VisionBlock({ icon: Icon, title, desc, color }: any) {
  return (
    <div className="flex items-start gap-6 p-8 glass-card rounded-[2.5rem] border-border group hover:border-primary/20 transition-all">
      <div className={`w-14 h-14 rounded-2xl bg-muted flex items-center justify-center ${color} border border-border group-hover:scale-110 transition-transform shadow-sm`}>
        <Icon className="w-6 h-6" />
      </div>
      <div className="space-y-1">
        <h4 className="text-lg font-bold text-foreground uppercase tracking-tight">{title}</h4>
        <p className="text-sm text-muted-foreground leading-relaxed font-medium">{desc}</p>
      </div>
    </div>
  );
}

function TierCard({ name, price, desc, color }: any) {
  return (
    <div className={`glass-card p-8 rounded-[2.5rem] border ${color} space-y-4 hover:scale-105 transition-transform bg-white`}>
      <div className="space-y-1">
        <h4 className="text-xl font-display font-bold text-foreground">{name}</h4>
        <p className="text-primary font-mono text-sm font-black">{price}</p>
      </div>
      <p className="text-[11px] text-muted-foreground leading-relaxed font-medium">{desc}</p>
    </div>
  );
}
