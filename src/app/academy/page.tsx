'use client';

import { AppSidebar } from "@/components/layout/AppSidebar";
import { BottomNav } from "@/components/layout/BottomNav";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { GraduationCap, Play, Lock, Search, Filter } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { Input } from "@/components/ui/input";

export default function AcademyPage() {
  return (
    <div className="flex flex-col min-h-screen pb-24 md:pb-0 connected-nodes bg-ink">
      <AppSidebar />
      <header className="px-5 py-6 border-b border-border/50 sticky top-0 bg-ink/80 backdrop-blur-md z-40 space-y-4">
        <h1 className="font-display font-bold text-xl text-white">KONEKT Academy</h1>
        <div className="flex gap-2">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-2" />
            <Input className="pl-10 h-11 rounded-xl bg-surface-2 border-border text-white placeholder:text-muted-2" placeholder="Rechercher une formation..." />
          </div>
          <button className="h-11 w-11 flex items-center justify-center rounded-xl border border-border bg-surface-2 text-white"><Filter className="w-4 h-4" /></button>
        </div>
      </header>

      <main className="flex-1 max-w-2xl mx-auto w-full p-5 space-y-8">
        
        {/* Categories Scroller */}
        <div className="flex gap-2 overflow-x-auto no-scrollbar pb-2">
          {['Tous', 'Entrepreneuriat', 'Numérique', 'Finance', 'Leadership', 'Communication'].map(cat => (
            <button key={cat} className={`flex-shrink-0 px-4 py-2 rounded-xl text-xs font-bold border transition-colors ${
              cat === 'Tous' ? 'bg-primary text-white border-primary' : 'bg-surface-2 border-border text-muted-2 hover:text-white'
            }`}>
              {cat}
            </button>
          ))}
        </div>

        {/* Resume Learning */}
        <section className="space-y-4">
          <p className="font-mono text-[10px] uppercase tracking-widest text-muted-2 font-bold">Reprendre</p>
          <Card className="glass-card p-6 rounded-[2.5rem] border-primary/20 overflow-hidden relative group">
            <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:rotate-12 transition-transform">
              <GraduationCap className="w-20 h-20 text-primary" />
            </div>
            <div className="space-y-4 relative z-10">
              <div className="flex justify-between items-start">
                <Badge className="bg-primary/10 text-primary border-none text-[10px] font-bold">FINANCE PERSONNELLE</Badge>
                <div className="text-right">
                  <p className="text-[10px] text-muted-2 font-bold uppercase">Module 3/6</p>
                  <p className="text-sm font-bold text-white">48% complété</p>
                </div>
              </div>
              <h3 className="text-lg font-bold text-white">Gérer ses revenus et épargner</h3>
              <Progress value={48} className="h-2 bg-surface-3" indicatorClassName="bg-primary" />
              <Button className="w-full h-12 rounded-2xl bg-primary text-white font-bold gap-2">
                Continuer la leçon <Play className="w-4 h-4 fill-current" />
              </Button>
            </div>
          </Card>
        </section>

        {/* Catalog */}
        <section className="space-y-4">
          <p className="font-mono text-[10px] uppercase tracking-widest text-muted-2 font-bold">Catalogue</p>
          <div className="space-y-4">
            <CourseItem 
              title="Lancer son projet à 0$" 
              meta="8 leçons · Débutant" 
              tier="START" 
              icon="🚀"
            />
            <CourseItem 
              title="Lever ses premiers fonds" 
              meta="12 leçons · Intermédiaire" 
              tier="PRO" 
              locked
              icon="📊"
            />
            <CourseItem 
              title="Prendre la parole en public" 
              meta="6 leçons · Tous niveaux" 
              tier="PLUS" 
              icon="🎤"
            />
          </div>
        </section>
      </main>
      <BottomNav />
    </div>
  );
}

function CourseItem({ title, meta, tier, locked, icon }: any) {
  return (
    <div className="glass-card p-5 rounded-[2rem] flex items-center justify-between border-border hover:border-primary/30 transition-all cursor-pointer">
      <div className="flex items-center gap-4">
        <div className="w-14 h-14 rounded-2xl bg-surface-3 flex items-center justify-center text-2xl border border-border">
          {icon}
        </div>
        <div>
          <h4 className="text-sm font-bold leading-tight text-white">{title}</h4>
          <p className="text-[10px] text-muted-2 font-medium mt-1">{meta}</p>
        </div>
      </div>
      <div className="text-right flex flex-col items-end gap-2">
        {locked ? (
          <div className="flex items-center gap-1 text-[10px] font-mono text-gold uppercase tracking-wider font-bold">
            <Lock className="w-3 h-3" /> {tier}
          </div>
        ) : (
          <Badge variant="outline" className={`text-[9px] font-mono font-bold ${tier === 'START' ? 'border-border text-muted-2' : tier === 'PLUS' ? 'border-primary text-primary' : 'border-gold text-gold'}`}>
            {tier}
          </Badge>
        )}
        <button className="text-[10px] font-bold text-white uppercase tracking-widest hover:text-primary transition-colors">VOIR</button>
      </div>
    </div>
  );
}