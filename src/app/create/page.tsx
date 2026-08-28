
'use client';

import { AppSidebar } from "@/components/layout/AppSidebar";
import { BottomNav } from "@/components/layout/BottomNav";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { 
  Rocket, 
  Briefcase, 
  MessageSquare, 
  Calendar, 
  X, 
  ArrowRight,
  Sparkles
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function CreatePage() {
  const router = useRouter();

  return (
    <div className="flex flex-col min-h-screen pb-24 md:pb-0 bg-ink connected-nodes">
      <AppSidebar />
      
      <header className="px-5 py-6 flex items-center justify-between sticky top-0 bg-ink/80 backdrop-blur-md z-40 border-b border-border/50">
        <h1 className="font-display font-bold text-xl tracking-tight uppercase">Créer de la Valeur</h1>
        <Button variant="ghost" size="icon" onClick={() => router.back()} className="rounded-full">
          <X className="w-5 h-5" />
        </Button>
      </header>

      <main className="flex-1 max-w-2xl mx-auto w-full p-5 space-y-8 py-10">
        <div className="text-center space-y-2 mb-10">
          <p className="text-[10px] font-mono text-cyan uppercase tracking-[0.3em] font-black">Action KONEKT</p>
          <h2 className="text-3xl font-display font-bold">Que voulez-vous lancer aujourd'hui ?</h2>
        </div>

        <div className="grid gap-4">
          <CreateOption 
            icon={Rocket} 
            title="Nouveau Projet" 
            description="Soumettre une idée au Project Lab pour trouver des associés."
            color="primary"
            href="/opportunities?tab=projects"
          />
          <CreateOption 
            icon={Briefcase} 
            title="Opportunité" 
            description="Publier un job, un stage ou une mission pour le réseau."
            color="orange"
            href="/opportunities"
          />
          <CreateOption 
            icon={MessageSquare} 
            title="Annonce" 
            description="Partager une réussite ou une information avec votre cellule."
            color="cyan"
            href="/community"
          />
          <CreateOption 
            icon={Calendar} 
            title="Événement" 
            description="Organiser une rencontre ou un workshop (Leaders uniquement)."
            color="gold"
            href="/community"
          />
        </div>

        <Card className="glass-card p-6 rounded-[2.5rem] border-primary/20 mt-10 bg-gradient-to-br from-primary/5 to-transparent">
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary flex-shrink-0">
              <Sparkles className="w-5 h-5" />
            </div>
            <div className="space-y-2">
              <h4 className="text-sm font-bold">Besoin d'aide pour structurer ?</h4>
              <p className="text-[11px] text-muted leading-relaxed">
                Utilisez l'IA KONEKT pour affiner votre proposition de projet ou rédiger une annonce percutante.
              </p>
              <Button variant="link" className="text-primary p-0 h-auto text-[11px] font-black uppercase tracking-widest">
                Lancer l'assistant <ArrowRight className="w-3 h-3 ml-1" />
              </Button>
            </div>
          </div>
        </Card>
      </main>

      <BottomNav />
    </div>
  );
}

function CreateOption({ icon: Icon, title, description, color, href }: any) {
  return (
    <Link href={href}>
      <Card className={`glass-card p-6 rounded-[2rem] border-${color}/20 hover:border-${color}/40 transition-all group flex items-center gap-5`}>
        <div className={`w-14 h-14 rounded-2xl bg-${color}/10 flex items-center justify-center text-${color} group-hover:scale-110 transition-transform border border-${color}/20`}>
          <Icon className="w-7 h-7" />
        </div>
        <div className="flex-1 text-left">
          <h3 className="font-display font-bold text-base text-text">{title}</h3>
          <p className="text-[11px] text-muted leading-tight mt-1">{description}</p>
        </div>
        <ArrowRight className={`w-5 h-5 text-muted group-hover:text-${color} transition-colors`} />
      </Card>
    </Link>
  );
}
