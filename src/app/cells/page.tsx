
'use client';

import { AppSidebar } from "@/components/layout/AppSidebar";
import { BottomNav } from "@/components/layout/BottomNav";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Users, Calendar, TrendingUp, MessageSquare, ArrowRight, UserCheck } from "lucide-react";
import { Progress } from "@/components/ui/progress";

export default function CellsPage() {
  return (
    <div className="flex flex-col min-h-screen pb-24 md:pb-0">
      <AppSidebar />
      <main className="flex-1 md:ml-64 p-5 max-w-2xl mx-auto w-full py-10 space-y-8">
        
        {/* Cell Header - Mini-Organization View */}
        <section className="space-y-4">
          <div className="flex items-start justify-between">
            <div>
              <h1 className="font-display font-bold text-3xl">Cocody #032</h1>
              <p className="text-muted text-sm mt-1">Zone Abidjan-Sud · Pôle Côte d'Ivoire</p>
            </div>
            <Badge className="bg-cyan/10 text-cyan border-cyan/30 px-3 py-1">CELLULE ACTIVE</Badge>
          </div>

          <Card className="bg-surface-2 border-border p-6 rounded-[2rem] grid grid-cols-2 gap-6">
            <div>
              <p className="text-[10px] text-muted-2 uppercase font-mono mb-2">Santé de la cellule</p>
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-display font-bold text-cyan">92%</span>
                <TrendingUp className="w-4 h-4 text-cyan" />
              </div>
              <p className="text-[10px] text-muted mt-1">Indice de présence & engagement</p>
            </div>
            <div className="text-right">
              <p className="text-[10px] text-muted-2 uppercase font-mono mb-2">Effectif</p>
              <p className="text-3xl font-display font-bold">18/20</p>
              <p className="text-[10px] text-muted mt-1">Membres actifs</p>
            </div>
          </Card>
        </section>

        {/* Leader Space */}
        <section className="glass-card p-5 rounded-[2rem] border-gold/20 relative overflow-hidden">
          <div className="absolute top-0 right-0 p-6 opacity-5">
            <UserCheck className="w-16 h-16 text-gold" />
          </div>
          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-12 rounded-2xl bg-gold/10 flex items-center justify-center text-gold">
              <UserCheck className="w-6 h-6" />
            </div>
            <div>
              <p className="text-sm font-bold">Awa K. · Leader</p>
              <p className="text-[11px] text-muted">Responsable de l'activation</p>
            </div>
          </div>
          <Button className="w-full bg-gold hover:bg-gold/90 text-ink font-bold gap-2 rounded-xl">
            <MessageSquare className="w-4 h-4" /> Contacter le Leader
          </Button>
        </section>

        {/* Goals & Progress */}
        <section className="space-y-4">
          <p className="font-mono text-[10px] uppercase tracking-widest text-muted-2">Objectifs de la cellule</p>
          <div className="space-y-3">
            <GoalItem label="Recrutement Membres" current={18} target={20} color="bg-cyan" />
            <GoalItem label="Formations Complétées" current={12} target={15} color="bg-orange" />
            <GoalItem label="Projets Lancés" current={3} target={5} color="bg-gold" />
          </div>
        </section>

        {/* Next Meeting */}
        <section>
          <Card className="bg-surface-2 border-border p-6 rounded-[2rem] border-l-4 border-cyan">
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
            <p className="text-[13px] text-muted mb-4 leading-relaxed">
              La rencontre se tiendra à l'Espace KONEKT. Prévoir ses carnets de projets pour le lab.
            </p>
            <div className="flex gap-3">
              <Button size="sm" className="bg-cyan text-ink font-bold flex-1 rounded-xl">Confirmer</Button>
              <Button size="sm" variant="ghost" className="flex-1 rounded-xl border border-border">Détails</Button>
            </div>
          </Card>
        </section>

        {/* Members List */}
        <section>
          <div className="flex items-center justify-between mb-4">
            <p className="font-mono text-[10px] uppercase tracking-widest text-muted-2">Membres de la cellule</p>
            <button className="text-[10px] text-cyan uppercase font-bold">Voir tous</button>
          </div>
          <div className="grid grid-cols-6 gap-3">
            {[1,2,3,4,5,6].map(i => (
              <div key={i} className="aspect-square rounded-xl bg-surface-3 border border-border flex items-center justify-center font-display font-bold text-xs">
                M{i}
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
        <span className="font-medium">{label}</span>
        <span className="text-muted">{current} / {target}</span>
      </div>
      <Progress value={percentage} className="h-1.5 bg-surface-3" indicatorClassName={color} />
    </div>
  );
}
