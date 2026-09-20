'use client';

import { useEffect } from 'react';
import { AppSidebar } from "@/components/layout/AppSidebar";
import { BottomNav } from "@/components/layout/BottomNav";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ShieldCheck, Award, Settings, ChevronRight, CreditCard, Share2, Building, Code, Briefcase, Zap, LogOut } from "lucide-react";
import { useKonekt } from "@/lib/store";
import { useRouter } from "next/navigation";

export default function ProfilePage() {
  const { state, logout } = useKonekt();
  const user = state.currentUser;
  const router = useRouter();

  useEffect(() => {
    if (!state.isLoading && !user) {
      router.push('/login');
    }
  }, [user, state.isLoading, router]);

  if (state.isLoading || !user) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-background">
        <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  const handleLogout = () => {
    logout();
    router.push('/');
  };

  return (
    <div className="flex flex-col min-h-screen pb-24 md:pb-0 bg-background connected-nodes">
      <AppSidebar />
      <header className="px-5 py-6 border-b border-border sticky top-0 bg-white/80 backdrop-blur-md z-40 flex justify-between items-center md:ml-72">
        <h1 className="font-display font-bold text-xl tracking-tighter uppercase text-foreground">Mon KONEKT ID</h1>
        <button className="w-10 h-10 flex items-center justify-center rounded-xl bg-muted border border-border group hover:border-primary/50 transition-colors">
          <Settings className="w-5 h-5 text-muted-foreground group-hover:text-primary" />
        </button>
      </header>

      <main className="flex-1 max-w-2xl mx-auto w-full p-5 space-y-10 py-8 md:ml-[calc(18rem+auto)]">
        {/* KONEKT ID Card */}
        <section className="flex flex-col items-center text-center">
          <div className="w-32 h-32 rounded-[3rem] p-[3px] bg-gradient-to-tr from-primary via-gold to-primary mb-6 shadow-xl relative group">
            <div className="w-full h-full rounded-[2.85rem] bg-white flex items-center justify-center font-display font-bold text-4xl text-primary border-4 border-white overflow-hidden">
              {user.prenom[0]}{user.nom[0]}
            </div>
            <div className="absolute -bottom-2 -right-2 w-11 h-11 bg-gold rounded-2xl flex items-center justify-center border-4 border-white text-ink shadow-lg group-hover:scale-110 transition-transform">
              <ShieldCheck className="w-6 h-6" />
            </div>
          </div>
          
          <div className="space-y-1">
            <h1 className="font-display font-bold text-4xl tracking-tighter text-foreground uppercase">{user.prenom} {user.nom}</h1>
            <div className="flex items-center justify-center gap-2 text-primary font-black text-[10px] uppercase tracking-[0.2em] font-mono">
              <Building className="w-3.5 h-3.5" /> MEMBRE {user.palier} · {user.celluleId}
            </div>
            <p className="text-muted-foreground text-sm mt-6 px-4 leading-relaxed max-w-sm mx-auto font-medium">
              Membre actif de la communauté KONEKT. Engagé dans la construction collective et l'accélération de potentiel.
            </p>
          </div>

          <div className="flex gap-3 mt-8 mb-10">
            <Badge className="bg-primary/5 text-primary border-primary/20 px-4 py-1.5 font-mono text-[10px] uppercase font-black tracking-widest">
              TIER: {user.palier}
            </Badge>
            <Badge variant="outline" className="border-border text-muted-foreground px-4 py-1.5 font-mono text-[10px] uppercase font-black tracking-widest">
              ID: {user.uid.slice(-8)}
            </Badge>
          </div>

          <div className="flex flex-col gap-3 w-full max-w-[340px]">
            <Button className="k-cta w-full h-14 text-xs">
               <Share2 className="w-4 h-4" /> Partager mon ID
            </Button>
          </div>
        </section>

        {/* Info Grid */}
        <section className="grid grid-cols-2 gap-4">
          <Card className="glass-card p-8 rounded-[2.5rem] text-center border-border shadow-sm">
             <p className="text-[9px] font-mono text-muted-foreground uppercase tracking-widest font-black mb-1">Cellule</p>
             <p className="text-xl font-display font-bold text-foreground uppercase">{user.celluleId}</p>
          </Card>
          <Card className="glass-card p-8 rounded-[2.5rem] text-center border-border shadow-sm">
             <p className="text-[9px] font-mono text-muted-foreground uppercase tracking-widest font-black mb-1">Zone</p>
             <p className="text-xl font-display font-bold text-foreground uppercase">{user.zone}</p>
          </Card>
        </section>

        {/* Profil Pro */}
        <section className="space-y-6">
          <h3 className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground font-black">Profil Professionnel</h3>
          <div className="glass-card p-8 rounded-[2.5rem] space-y-4 border-border shadow-sm bg-white">
            <div className="flex items-center gap-2 text-[10px] font-mono text-primary uppercase tracking-widest font-black">
              <Code className="w-3.5 h-3.5" /> Secteur d'activité
            </div>
            <span className="inline-block px-4 py-2 rounded-2xl bg-primary/5 border border-primary/10 text-[11px] font-bold text-primary uppercase tracking-widest">
              {user.secteur}
            </span>
          </div>
        </section>

        {/* Menu Items */}
        <section className="space-y-3 pt-4 pb-10">
          <MenuItem icon={CreditCard} label={`Abonnement ${user.palier}`} meta="Statut: Actif" color="text-primary" />
          <MenuItem icon={Award} label="Badges & Certificats" meta="Consulter mes réussites" color="text-gold" />
          <MenuItem icon={Briefcase} label="Mes Candidatures" meta="Historique des opportunités" color="text-primary" />
          
          <button 
            onClick={handleLogout}
            className="w-full flex items-center justify-between p-6 glass-card rounded-[2rem] border-red-100 hover:border-red-300 group transition-all"
          >
            <div className="flex items-center gap-5">
              <div className="w-11 h-11 rounded-2xl bg-red-50 flex items-center justify-center text-red-500 border border-red-100">
                <LogOut className="w-5 h-5" />
              </div>
              <div className="text-left">
                <span className="block text-sm font-bold text-red-600 uppercase tracking-tight">Déconnexion</span>
                <span className="block text-[10px] text-red-400 font-mono uppercase tracking-widest">Quitter l'espace sécurisé</span>
              </div>
            </div>
            <ChevronRight className="w-5 h-5 text-red-300" />
          </button>
        </section>
      </main>
      <BottomNav />
    </div>
  );
}

function MenuItem({ icon: Icon, label, meta, color }: any) {
  return (
    <div className="w-full flex items-center justify-between p-6 glass-card rounded-[2rem] border-border hover:border-primary/30 group cursor-pointer shadow-sm hover:shadow-md transition-all">
      <div className="flex items-center gap-5">
        <div className={`w-11 h-11 rounded-2xl bg-muted flex items-center justify-center text-muted-foreground group-hover:${color} border border-border/50 transition-colors`}>
          <Icon className="w-5 h-5" />
        </div>
        <div className="text-left">
          <span className="block text-sm font-bold text-foreground uppercase tracking-tight">{label}</span>
          <span className="block text-[10px] text-muted-foreground font-mono uppercase tracking-widest">{meta}</span>
        </div>
      </div>
      <ChevronRight className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
    </div>
  );
}
