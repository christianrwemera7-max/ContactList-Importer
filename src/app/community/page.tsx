
'use client';

import { AppSidebar } from "@/components/layout/AppSidebar";
import { BottomNav } from "@/components/layout/BottomNav";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Users, Calendar, TrendingUp, MessageSquare, UserCheck, ShieldCheck } from "lucide-react";
import { Progress } from "@/components/ui/progress";

export default function CommunityPage() {
  return (
    <div className="flex flex-col min-h-screen pb-24 md:pb-0 bg-ink">
      <header className="px-5 py-6 border-b border-border/50 sticky top-0 bg-ink/80 backdrop-blur-md z-40">
        <h1 className="font-display font-bold text-xl">Communauté</h1>
        <p className="text-[10px] font-mono text-muted-2 uppercase tracking-widest">Ma Cellule & Réseau</p>
      </header>

      <main className="flex-1 max-w-2xl mx-auto w-full p-5 space-y-8">
        
        {/* Cell View */}
        <section className="space-y-4">
          <div className="flex items-start justify-between">
            <div>
              <h2 className="font-display font-bold text-2xl">Cocody #032</h2>
              <p className="text-muted text-sm mt-1">Zone Abidjan-Sud · Pôle Côte d'Ivoire</p>
            </div>
            <Badge className="bg-cyan/10 text-cyan border-cyan/30 px-3 py-1">ACTIVE</Badge>
          </div>

          <Card className="glass-card p-6 rounded-[2rem] grid grid-cols-2 gap-6 border-cyan/20">
            <div>
              <p className="text-[10px] text-muted-2 uppercase font-mono mb-2">Activité Hebdo</p>
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-display font-bold text-cyan">92%</span>
                <TrendingUp className="w-4 h-4 text-cyan" />
              </div>
            </div>
            <div className="text-right">
              <p className="text-[10px] text-muted-2 uppercase font-mono mb-2">Effectif</p>
              <p className="text-3xl font-display font-bold">18/20</p>
            </div>
          </Card>
        </section>

        {/* Leader Role */}
        <section className="glass-card p-6 rounded-[2rem] border-gold/20 relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:scale-110 transition-transform">
            <ShieldCheck className="w-20 h-20 text-gold" />
          </div>
          <div className="flex items-center gap-4 mb-6">
            <div className="w-14 h-14 rounded-2xl bg-gold/10 flex items-center justify-center text-gold border border-gold/20">
              <UserCheck className="w-6 h-6" />
            </div>
            <div>
              <p className="text-sm font-bold">Awa K. · Leader</p>
              <p className="text-[11px] text-muted">Gardienne de la vision locale</p>
            </div>
          </div>
          <Button className="w-full bg-gold hover:bg-gold/90 text-ink font-bold gap-2 rounded-2xl h-12">
            <MessageSquare className="w-4 h-4" /> Contacter le Leader
          </Button>
        </section>

        {/* Goals & Progress */}
        <section className="space-y-4">
          <h3 className="font-mono text-[10px] uppercase tracking-widest text-muted-2">Objectifs de la cellule</h3>
          <div className="space-y-4">
            <GoalItem label="Recrutement Membres" current={18} target={20} color="bg-cyan" />
            <GoalItem label="Formations Complétées" current={12} target={15} color="bg-orange" />
          </div>
        </section>

        {/* Next Meeting */}
        <section>
          <Card className="glass-card p-6 rounded-[2.5rem] border-l-4 border-cyan">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-10 h-10 rounded-xl bg-cyan/10 flex items-center justify-center text-cyan">
                <Calendar className="w-5 h-5" />
              </div>
              <div>
                <p className="text-sm font-bold">Prochaine rencontre</p>
                <p className="text-[11px] text-muted">Samedi 30 Août · 15:00</p>
              </div>
            </div>
            <h3 className="font-display font-semibold text-lg mb-2">Atelier : Structurer son pitch</h3>
            <p className="text-[13px] text-muted mb-6 leading-relaxed">
              La rencontre se tiendra à l'Espace KONEKT. Prévoir ses carnets de projets pour le lab.
            </p>
            <div className="flex gap-3">
              <Button className="bg-cyan text-ink font-bold flex-1 rounded-2xl h-11">Confirmer</Button>
              <Button variant="ghost" className="flex-1 rounded-2xl h-11 border border-border">Détails</Button>
            </div>
          </Card>
        </section>

        {/* Cell Ring Grid */}
        <section>
          <div className="flex items-center justify-between mb-6">
            <h3 className="font-mono text-[10px] uppercase tracking-widest text-muted-2">Membres de la cellule</h3>
            <button className="text-[10px] text-cyan font-bold uppercase tracking-wider">Voir tous</button>
          </div>
          <div className="grid grid-cols-5 gap-4">
            {['AK', 'MT', 'SD', 'JK', 'FN'].map(init => (
              <div key={init} className="flex flex-col items-center gap-2">
                <div className="w-14 h-14 rounded-full p-[2px] bg-gradient-to-tr from-cyan to-orange">
                  <div className="w-full h-full rounded-full bg-surface-3 flex items-center justify-center font-display font-bold text-xs border-2 border-ink">
                    {init}
                  </div>
                </div>
                <span className="text-[9px] text-muted-2 font-bold uppercase">{init}</span>
              </div>
            ))}
          </div>
        </section>
      </main>
      <BottomNav />
    </div>
  );
}

function GoalItem({ label, current, target, color }: any) {
  const percentage = (current / target) * 100;
  return (
    <div className="space-y-2">
      <div className="flex justify-between text-[11px]">
        <span className="font-bold">{label}</span>
        <span className="text-muted-2 font-mono">{current} / {target}</span>
      </div>
      <Progress value={percentage} className="h-2 bg-surface-3" indicatorClassName={color} />
    </div>
  );
}
