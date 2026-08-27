
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { APP_NAME } from '@/lib/constants';
import { ArrowRight, Shield, Zap, Globe, Sparkles } from 'lucide-react';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-slate-50">
      {/* Hero Section */}
      <section className="relative pt-20 pb-32 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="text-center space-y-8 max-w-4xl mx-auto">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-bold animate-fade-in">
              <Sparkles className="w-4 h-4" />
              L'avenir se construit ensemble
            </div>
            <h1 className="text-6xl md:text-8xl font-black tracking-tighter text-slate-900 leading-none">
              Rejoignez le mouvement <span className="text-primary">{APP_NAME}</span>
            </h1>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed">
              Connectez-vous, apprenez, collaborez et entreprenez au sein d'une communauté structurée pour bâtir la valeur de demain.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Button asChild size="lg" className="h-14 px-8 rounded-full text-lg font-bold shadow-xl shadow-primary/25">
                <Link href="/dashboard">
                  Démarrer l'adhésion <ArrowRight className="ml-2 w-5 h-5" />
                </Link>
              </Button>
              <Button variant="outline" size="lg" className="h-14 px-8 rounded-full text-lg font-bold bg-white">
                Découvrir la vision
              </Button>
            </div>
          </div>
        </div>

        {/* Abstract Background Shapes */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full pointer-events-none opacity-20">
          <div className="absolute top-20 left-10 w-96 h-96 bg-primary rounded-full blur-[120px]" />
          <div className="absolute bottom-10 right-10 w-96 h-96 bg-indigo-500 rounded-full blur-[120px]" />
        </div>
      </section>

      {/* Pillars Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <FeatureCard 
              icon={Globe}
              title="Connexion"
              description="Appartenez à une cellule de 20 membres pour un accompagnement personnalisé et local."
            />
            <FeatureCard 
              icon={Zap}
              title="Apprentissage"
              description="Accédez à KONEKT Academy : des formations pratiques pour booster vos compétences."
            />
            <FeatureCard 
              icon={Shield}
              title="Confiance"
              description="Une gouvernance transparente et une finance partagée pour construire l'actif de demain."
            />
          </div>
        </div>
      </section>
    </div>
  );
}

function FeatureCard({ icon: Icon, title, description }: any) {
  return (
    <div className="p-8 rounded-[2rem] bg-slate-50 border border-slate-100 space-y-6 transition-all hover:scale-105 hover:shadow-2xl">
      <div className="w-16 h-16 bg-primary rounded-2xl flex items-center justify-center text-white shadow-lg">
        <Icon className="w-8 h-8" />
      </div>
      <h3 className="text-2xl font-bold text-slate-900">{title}</h3>
      <p className="text-slate-600 leading-relaxed">{description}</p>
    </div>
  );
}
