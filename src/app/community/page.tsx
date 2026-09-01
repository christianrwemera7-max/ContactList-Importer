'use client';

import { AppSidebar } from "@/components/layout/AppSidebar";
import { BottomNav } from "@/components/layout/BottomNav";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Users, Calendar, TrendingUp, MessageSquare, UserCheck, ShieldCheck } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { useKonekt } from "@/lib/store";

export default function CommunityPage() {
  const { state } = useKonekt();
  const user = state.currentUser;
  const cell = state.currentCell;

  if (!user || !cell) return null;

  return (
    <div className="flex flex-col min-h-screen pb-24 md:pb-0 bg-background connected-nodes">
      <header className="px-5 py-6 border-b border-border sticky top-0 bg-white/80 backdrop-blur-md z-40">
        <h1 className="font-display font-bold text-xl uppercase tracking-tighter">Communauté</h1>
        <p className="text-[10px] font-mono text-muted-foreground uppercase tracking-widest">Ma Cellule & Réseau</p>
      </header>

      <main className="flex-1 max-w-2xl mx-auto w-full p-5 space-y-8">
        
        {/* Cell View */}
        <section className="space-y-4">
          <div className="flex items-start justify-between">
            <div>
              <h2 className="font-display font-bold text-3xl text-primary tracking-tighter uppercase">Cellule {cell.id}</h2>
              <p className="text-muted-foreground text-sm mt-1">{cell.zone} · ID Cellule {cell.id}</p>
            </div>
            <Badge className="bg-primary/10 text-primary border-primary/30 px-3 py-1 font-bold uppercase tracking-widest text-[9px]">ACTIVE</Badge>
          </div>

          <Card className="glass-card p-6 rounded-[2rem] grid grid-cols-2 gap-6 border-primary/10">
            <div>
              <p className="text-[10px] text-muted-foreground uppercase font-mono mb-2 font-bold tracking-widest">Activité Cellule</p>
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-display font-bold text-primary">88%</span>
                <TrendingUp className="w-4 h-4 text-primary" />
              </div>
            </div>
            <div className="text-right">
              <p className="text-[10px] text-muted-foreground uppercase font-mono mb-2 font-bold tracking-widest">Effectif</p>
              <p className="text-3xl font-display font-bold text-foreground">{cell.membres}/20</p>
            </div>
          </Card>
        </section>

        {/* Leader Role */}
        <section className="glass-card p-6 rounded-[2rem] border-gold/20 relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:scale-110 transition-transform">
            <ShieldCheck className="w-20 h-20 text-gold" />
          </div>
          <div className="flex items-center gap-4 mb-6">
            <div className="w-14 h-14 rounded-2xl bg-gold/10 flex items-center justify-center text-gold border border-gold/20 shadow-sm">
              <UserCheck className="w-6 h-6" />
            </div>
            <div>
              <p className="text-sm font-bold uppercase tracking-tight">Responsable de Cellule</p>
              <p className="text-[11px] text-muted-foreground font-mono uppercase tracking-widest">Gardien de la vision locale</p>
            </div>
          </div>
          <Button className="w-full bg-gold hover:bg-gold/90 text-ink font-bold gap-2 rounded-2xl h-12 uppercase tracking-widest text-xs">
            <MessageSquare className="w-4 h-4" /> Contacter le Leader
          </Button>
        </section>

        {/* Goals & Progress */}
        <section className="space-y-6">
          <h3 className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground font-black">Objectifs de la cellule</h3>
          <div className="space-y-6">
            <GoalItem label="Complétion des Profils" percentage={cell.membres * 5} current={cell.membres} target={20} color="bg-primary" />
            <GoalItem label="Formations Cellule" percentage={45} current={9} target={20} color="bg-gold" />
          </div>
        </section>

        {/* Next Meeting */}
        <section>
          <Card className="glass-card p-8 rounded-[2.5rem] border-l-4 border-primary">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                <Calendar className="w-5 h-5" />
              </div>
              <div>
                <p className="text-sm font-bold uppercase">Prochaine rencontre</p>
                <p className="text-[11px] text-muted-foreground font-mono">Samedi 30 Août · 15:00</p>
              </div>
            </div>
            <h3 className="font-display font-bold text-xl mb-3 uppercase tracking-tighter">Atelier : Structurer son pitch</h3>
            <p className="text-sm text-muted-foreground mb-6 leading-relaxed">
              La rencontre se tiendra à l'Espace KONEKT. Prévoir ses carnets de projets pour le lab.
            </p>
            <div className="flex gap-3">
              <Button className="k-cta flex-1 h-12">Confirmer</Button>
              <Button variant="outline" className="flex-1 rounded-2xl h-12 border-border text-[11px] font-bold uppercase tracking-widest">Détails</Button>
            </div>
          </Card>
        </section>

        {/* Members Grid */}
        <section className="pb-10">
          <div className="flex items-center justify-between mb-6">
            <h3 className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground font-black">Membres de la cellule</h3>
            <button className="text-[10px] text-primary font-bold uppercase tracking-widest hover:underline">Voir tous</button>
          </div>
          <div className="grid grid-cols-5 gap-4">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="flex flex-col items-center gap-2">
                <div className="w-14 h-14 rounded-full p-[2px] bg-gradient-to-tr from-primary to-gold shadow-sm">
                  <div className="w-full h-full rounded-full bg-white flex items-center justify-center font-display font-bold text-xs border-2 border-white">
                    {String.fromCharCode(65 + i)}
                  </div>
                </div>
                <span className="text-[9px] text-muted-foreground font-bold uppercase">Membre {i+1}</span>
              </div>
            ))}
          </div>
        </section>
      </main>
      <BottomNav />
    </div>
  );
}

function GoalItem({ label, percentage, current, target, color }: any) {
  return (
    <div className="space-y-2">
      <div className="flex justify-between text-[10px] font-bold uppercase tracking-widest">
        <span>{label}</span>
        <span className="text-muted-foreground font-mono">{current} / {target}</span>
      </div>
      <Progress value={percentage} className="h-2 bg-muted" indicatorClassName={color} />
    </div>
  );
}
