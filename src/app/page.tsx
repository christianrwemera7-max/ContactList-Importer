
'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { APP_NAME } from '@/lib/constants';
import { ArrowRight, Shield, Zap, Sparkles, Users, Rocket, GraduationCap, CheckCircle2 } from 'lucide-react';

export default function LandingPage() {
  return (
    <div className="min-h-screen connected-nodes relative overflow-x-hidden bg-ink">
      {/* Background Orbs */}
      <div className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] bg-orange/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-20%] right-[-10%] w-[60%] h-[60%] bg-blue-electric/10 rounded-full blur-[120px] pointer-events-none" />

      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 border-b border-white/5 bg-ink/80 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-orange flex items-center justify-center font-display font-bold text-ink text-xl">K</div>
            <span className="font-display font-bold text-xl tracking-tighter">KONEKT</span>
          </div>
          <div className="hidden md:flex items-center gap-8 text-sm font-bold text-muted uppercase tracking-widest">
            <Link href="#vision" className="hover:text-white transition-colors">Vision</Link>
            <Link href="#structure" className="hover:text-white transition-colors">Structure</Link>
            <Link href="#paliers" className="hover:text-white transition-colors">Paliers</Link>
          </div>
          <Button asChild className="rounded-2xl font-bold px-6 bg-orange text-ink hover:bg-orange/90">
            <Link href="/join">Rejoindre</Link>
          </Button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-40 pb-24 px-6">
        <div className="max-w-4xl mx-auto text-center space-y-10">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card text-orange text-[10px] font-black uppercase tracking-[0.3em] animate-in fade-in slide-in-from-top-4">
            <Sparkles className="w-3 h-3" /> Lancement Kinshasa 2026
          </div>
          <h1 className="text-6xl md:text-8xl font-display font-bold tracking-tighter leading-[0.9] text-white">
            Ne restez plus seul pour <span className="text-orange">entreprendre</span>.
          </h1>
          <p className="text-lg md:text-xl text-muted leading-relaxed max-w-2xl mx-auto font-medium">
            KONEKT est le premier réseau structuré qui transforme votre potentiel en impact réel grâce à une communauté de proximité, une formation continue et un accès aux opportunités.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4 pt-4">
            <Button asChild size="lg" className="h-16 px-10 rounded-[2rem] text-lg font-bold bg-orange text-ink hover:bg-orange/90 shadow-2xl shadow-orange/20">
              <Link href="/join">Démarrer mon ID KONEKT <ArrowRight className="ml-2 w-5 h-5" /></Link>
            </Button>
            <Button variant="outline" size="lg" className="h-16 px-10 rounded-[2rem] text-lg font-bold glass-card border-border hover:bg-white/5 transition-all text-white">
              Explorer le réseau
            </Button>
          </div>
        </div>
      </section>

      {/* The 3 Pillars */}
      <section id="vision" className="py-24 max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <VisionCard 
            icon={Users} 
            title="Cellules de Proximité" 
            description="Intégrez une équipe de 20 membres maximum. Avancez ensemble, partagez vos défis et bâtissez une confiance inébranlable."
            color="border-blue-electric/20"
            accent="text-blue-electric"
          />
          <VisionCard 
            icon={GraduationCap} 
            title="Academy de Valeur" 
            description="Apprenez les compétences réelles dont vous avez besoin : Finance, Marketing, Droit et Tech, adaptés au marché de Kinshasa."
            color="border-gold/20"
            accent="text-gold"
          />
          <VisionCard 
            icon={Rocket} 
            title="Project Lab" 
            description="Soumettez vos projets, trouvez des associés et accédez à des financements exclusifs réservés aux membres engagés."
            color="border-orange/20"
            accent="text-orange"
          />
        </div>
      </section>

      {/* Tier Explanation */}
      <section id="paliers" className="py-24 bg-surface/30 border-y border-white/5">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-16 items-center">
          <div className="space-y-8">
            <h2 className="text-4xl font-display font-bold text-white tracking-tight leading-tight">
              Un accès basé sur la valeur et l'engagement.
            </h2>
            <p className="text-muted text-lg leading-relaxed">
              Chez KONEKT, nous croyons que l'accès aux services doit être structuré. Votre palier d'adhésion définit vos outils, votre engagement définit votre leadership.
            </p>
            <div className="space-y-6">
              <FeatureItem title="START (5$)" desc="Accès aux cellules, aux événements et à l'Academy de base." />
              <FeatureItem title="PLUS (10$)" desc="Mentorat, formations avancées et accès prioritaire aux opportunités." />
              <FeatureItem title="PRO (20$)" desc="Incubation au Project Lab, recherche d'investisseurs et visibilité nationale." />
            </div>
          </div>
          <div className="relative">
            <div className="absolute inset-0 bg-orange/20 blur-[100px] rounded-full -z-10" />
            <div className="glass-card p-10 rounded-[3rem] border-orange/30 space-y-6">
              <div className="w-16 h-16 rounded-2xl bg-orange/10 flex items-center justify-center text-orange mb-6">
                <Shield className="w-8 h-8" />
              </div>
              <h3 className="text-2xl font-display font-bold text-white">Prêt à changer de dimension ?</h3>
              <p className="text-sm text-muted leading-relaxed">
                Rejoindre KONEKT, c'est choisir de ne plus être un individu isolé mais un membre actif d'une puissance collective.
              </p>
              <Button asChild className="w-full h-14 rounded-2xl bg-orange text-ink font-bold mt-4">
                <Link href="/join">Commencer l'adhésion</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-20 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-10">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded bg-orange flex items-center justify-center font-bold text-ink text-xs">K</div>
              <span className="font-display font-bold text-lg text-white">KONEKT</span>
            </div>
            <p className="text-[10px] text-muted-2 uppercase tracking-[0.2em]">© 2026 KONEKT — La Génération Connectée</p>
          </div>
          <div className="flex gap-8 text-[10px] font-mono text-muted-2 uppercase tracking-widest font-black">
            <Link href="#">Confidentialité</Link>
            <Link href="#">Conditions</Link>
            <Link href="#">Support</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}

function VisionCard({ icon: Icon, title, description, color, accent }: any) {
  return (
    <div className={`glass-card p-10 rounded-[3rem] border ${color} space-y-6 hover:translate-y-[-8px] transition-all duration-500`}>
      <div className={`w-14 h-14 rounded-2xl bg-surface-3 flex items-center justify-center ${accent} border border-border`}>
        <Icon className="w-7 h-7" />
      </div>
      <h3 className="text-xl font-display font-bold text-white">{title}</h3>
      <p className="text-sm text-muted leading-relaxed">{description}</p>
    </div>
  );
}

function FeatureItem({ title, desc }: any) {
  return (
    <div className="flex gap-4 items-start">
      <div className="mt-1 w-5 h-5 rounded-full bg-orange/10 flex items-center justify-center text-orange flex-shrink-0">
        <CheckCircle2 className="w-3.5 h-3.5" />
      </div>
      <div>
        <h4 className="text-white font-bold text-sm leading-none mb-1">{title}</h4>
        <p className="text-muted text-xs leading-relaxed">{desc}</p>
      </div>
    </div>
  );
}
