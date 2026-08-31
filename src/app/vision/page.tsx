'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Network, Users, Zap, ShieldCheck, Rocket } from 'lucide-react';

export default function VisionPage() {
  return (
    <div className="min-h-screen relative overflow-hidden bg-background text-foreground selection:bg-primary/30">
      {/* Background with Neuro-connections */}
      <div className="absolute inset-0 z-0">
        <Image 
          src="https://picsum.photos/seed/neuro3/1920/1080" 
          alt="Neuro Connections Vision" 
          fill 
          className="object-cover opacity-10"
          priority
          data-ai-hint="neural network"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background via-background/90 to-background" />
      </div>

      <nav className="fixed top-0 w-full z-50 border-b border-white/5 bg-background/60 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 group">
            <ArrowLeft className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
            <span className="font-display font-bold text-xl tracking-tighter text-white">RETOUR</span>
          </Link>
          <Button asChild className="rounded-xl font-bold px-6 bg-primary text-primary-foreground hover:bg-primary/90">
            <Link href="/join">REJOINDRE</Link>
          </Button>
        </div>
      </nav>

      <main className="relative z-10 pt-32 pb-20 px-6 max-w-4xl mx-auto space-y-24">
        {/* Hero Section */}
        <section className="text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-6 py-2 rounded-full glass-card text-accent border-accent/20 text-[10px] font-black uppercase tracking-[0.4em]">
            <Zap className="w-3.5 h-3.5" /> Manifeste KONEKT
          </div>
          <h1 className="text-5xl md:text-7xl font-display font-bold tracking-tighter text-white leading-tight">
            L'Intelligence Collective <br />
            <span className="text-primary">Redéfinie.</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            KONEKT n'est pas une simple application. C'est un système nerveux entrepreneurial conçu pour amplifier chaque idée par la force du réseau.
          </p>
        </section>

        {/* Vision Blocks */}
        <div className="grid gap-12">
          <VisionBlock 
            icon={Network}
            title="Neuro-Connexions"
            description="Nous croyons que la valeur d'un entrepreneur est décuplée par ses connexions. Notre algorithme KONEKT MATCH tisse des liens invisibles mais puissants entre les compétences et les besoins."
            color="text-primary"
          />
          <VisionBlock 
            icon={Users}
            title="La Cellule de 20"
            description="L'unité fondamentale de KONEKT. 20 membres maximum par cellule pour garantir une proximité réelle, une confiance absolue et une réactivité sans précédent."
            color="text-accent"
          />
          <VisionBlock 
            icon={ShieldCheck}
            title="Transparence Radicale"
            description="Chaque dollar, chaque action, chaque projet est tracé. La gouvernance est partagée entre les leaders de cellule et la direction nationale via notre journal d'audit infalsifiable."
            color="text-white"
          />
        </div>

        {/* Final CTA */}
        <section className="glass-card p-12 rounded-[3rem] text-center space-y-8 border-primary/20 bg-gradient-to-br from-primary/5 to-transparent">
          <Rocket className="w-16 h-16 text-accent mx-auto" />
          <h2 className="text-3xl font-display font-bold text-white">Prêt à devenir un nœud de valeur ?</h2>
          <Button asChild size="lg" className="h-16 px-10 rounded-2xl text-lg font-bold bg-primary text-primary-foreground hover:bg-primary/90 shadow-2xl shadow-primary/20">
            <Link href="/join">CRÉER MON ID KONEKT</Link>
          </Button>
        </section>
      </main>
    </div>
  );
}

function VisionBlock({ icon: Icon, title, description, color }: any) {
  return (
    <div className="flex flex-col md:flex-row gap-8 items-start group">
      <div className={`w-16 h-16 rounded-2xl bg-surface-2 border border-white/5 flex items-center justify-center ${color} group-hover:scale-110 transition-transform`}>
        <Icon className="w-8 h-8" />
      </div>
      <div className="space-y-4">
        <h3 className="text-2xl font-display font-bold text-white">{title}</h3>
        <p className="text-muted-foreground leading-relaxed text-lg">
          {description}
        </p>
      </div>
    </div>
  );
}
