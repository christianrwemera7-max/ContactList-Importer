
'use client';

import { AppSidebar } from "@/components/layout/AppSidebar";
import { BottomNav } from "@/components/layout/BottomNav";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ShieldCheck, Award, Settings, ChevronRight, CreditCard, Share2, Building, Target, Code, Briefcase, Sparkles } from "lucide-react";
import { useKonekt } from "@/lib/store";
import { useState } from "react";
import { toast } from "@/hooks/use-toast";

export default function ProfilePage() {
  const { state } = useKonekt();
  const user = state.currentUser;
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  if (!user) return null;

  return (
    <div className="flex flex-col min-h-screen pb-24 md:pb-0 bg-ink connected-nodes">
      <header className="px-5 py-6 border-b border-border/50 sticky top-0 bg-ink/80 backdrop-blur-md z-40 flex justify-between items-center">
        <h1 className="font-display font-bold text-xl tracking-tight uppercase text-white">Mon KONEKT ID</h1>
        <button className="w-10 h-10 flex items-center justify-center rounded-xl bg-surface-2 border border-border group hover:border-primary/50 transition-colors">
          <Settings className="w-5 h-5 text-muted-foreground group-hover:text-primary" />
        </button>
      </header>

      <main className="flex-1 max-w-2xl mx-auto w-full p-5 space-y-10 py-8">
        {/* KONEKT ID Card */}
        <section className="flex flex-col items-center text-center">
          <div className="w-32 h-32 rounded-[3rem] p-[3px] bg-gradient-to-tr from-primary via-secondary to-primary mb-6 shadow-2xl relative group">
            <div className="w-full h-full rounded-[2.85rem] bg-card flex items-center justify-center font-display font-bold text-4xl text-white border-4 border-ink overflow-hidden">
              {user.prenom[0]}{user.nom[0]}
            </div>
            <div className="absolute -bottom-2 -right-2 w-11 h-11 bg-secondary rounded-2xl flex items-center justify-center border-4 border-ink text-black shadow-lg group-hover:scale-110 transition-transform">
              <ShieldCheck className="w-6 h-6" />
            </div>
          </div>
          
          <div className="space-y-1">
            <h1 className="font-display font-bold text-3xl tracking-tighter text-white uppercase">{user.prenom} {user.nom}</h1>
            <div className="flex items-center justify-center gap-2 text-primary font-black text-[10px] uppercase tracking-[0.2em]">
              <Building className="w-3.5 h-3.5" /> MEMBRE {user.palier} · {state.currentCell?.id}
            </div>
            <p className="text-muted-foreground text-sm mt-4 px-4 leading-relaxed">
              Membre actif du réseau entrepreneurial KONEKT. Engagé dans la construction collective et l'apprentissage.
            </p>
          </div>

          <div className="flex gap-3 mt-8 mb-10">
            <Badge className="bg-primary/10 text-primary border-primary/30 px-4 py-1.5 font-mono text-[10px] uppercase font-black tracking-widest">
              TIER: {user.palier}
            </Badge>
            <Badge variant="outline" className="border-border text-muted-foreground px-4 py-1.5 font-mono text-[10px] uppercase font-black tracking-widest">
              ID: {user.uid.slice(-8)}
            </Badge>
          </div>

          <div className="flex flex-col gap-3 w-full max-w-[340px]">
            <Button className="w-full bg-primary text-white font-black gap-2 text-xs rounded-2xl h-12 uppercase tracking-wider">
               <Share2 className="w-4 h-4" /> Partager mon ID
            </Button>
          </div>
        </section>

        {/* Info Grid */}
        <section className="grid grid-cols-2 gap-4">
          <Card className="glass-card p-6 rounded-[2.5rem] text-center">
             <p className="text-[9px] font-mono text-muted-foreground uppercase tracking-widest font-black mb-1">Cellule</p>
             <p className="text-lg font-bold text-white uppercase">{state.currentCell?.id || '—'}</p>
          </Card>
          <Card className="glass-card p-6 rounded-[2.5rem] text-center">
             <p className="text-[9px] font-mono text-muted-foreground uppercase tracking-widest font-black mb-1">Zone</p>
             <p className="text-lg font-bold text-white uppercase">{user.zone}</p>
          </Card>
        </section>

        {/* Secteur Matrix */}
        <section className="space-y-6">
          <h3 className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground font-black">Profil Professionnel</h3>
          <div className="glass-card p-6 rounded-[2.5rem] space-y-4 border-white/5">
            <div className="flex items-center gap-2 text-[10px] font-mono text-primary uppercase tracking-widest">
              <Code className="w-3.5 h-3.5" /> Secteur d'activité
            </div>
            <span className="inline-block px-4 py-2 rounded-2xl bg-primary/10 border border-primary/20 text-[11px] font-bold text-primary uppercase tracking-widest">
              {user.secteur}
            </span>
          </div>
        </section>

        {/* Menu Items */}
        <section className="space-y-3 pt-4 pb-10">
          <MenuItem icon={CreditCard} label={`Abonnement ${user.palier}`} meta="Statut: Actif" color="text-primary" />
          <MenuItem icon={Award} label="Badges & Certificats" meta="Consulter mes réussites" color="text-secondary" />
          <MenuItem icon={Briefcase} label="Mes Candidatures" meta="Historique des opportunités" color="text-primary" />
        </section>
      </main>
      <BottomNav />
    </div>
  );
}

function MenuItem({ icon: Icon, label, meta, color }: any) {
  return (
    <div className="w-full flex items-center justify-between p-5 glass-card rounded-[2rem] border-white/5 hover:border-primary/30 group cursor-pointer">
      <div className="flex items-center gap-5">
        <div className={`w-11 h-11 rounded-2xl bg-surface-3 flex items-center justify-center text-muted-foreground group-hover:${color} border border-border/50`}>
          <Icon className="w-5 h-5" />
        </div>
        <div className="text-left">
          <span className="block text-sm font-bold text-white uppercase tracking-tight">{label}</span>
          <span className="block text-[10px] text-muted-foreground font-mono uppercase tracking-widest">{meta}</span>
        </div>
      </div>
      <ChevronRight className="w-5 h-5 text-muted-foreground group-hover:text-primary" />
    </div>
  );
}
