
'use client';

import { AppSidebar } from "@/components/layout/AppSidebar";
import { BottomNav } from "@/components/layout/BottomNav";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { GraduationCap, Play, Lock, Clock, Star, Search, Filter } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { Input } from "@/components/ui/input";

export default function AcademyPage() {
  return (
    <div className="flex flex-col min-h-screen pb-24 md:pb-0 connected-nodes">
      <AppSidebar />
      <header className="px-5 py-6 border-b border-border/50 sticky top-0 bg-ink/80 backdrop-blur-md z-40 space-y-4">
        <h1 className="font-display font-bold text-xl">KONEKT Academy</h1>
        <div className="flex gap-2">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted" />
            <Input className="pl-10 h-11 rounded-xl bg-surface-2 border-border" placeholder="Rechercher une formation..." />
          </div>
          <Button variant="outline" className="h-11 w-11 p-0 rounded-xl border-border"><Filter className="w-4 h-4" /></Button>
        </div>
      </header>

      <main className="flex-1 max-w-2xl mx-auto w-full p-5 space-y-8">
        
        {/* Categories Scroller */}
        <div className="flex gap-2 overflow-x-auto no-scrollbar pb-2">
          {['Tous', 'Entrepreneuriat', 'Numérique', 'Finance', 'Leadership', 'Communication'].map(cat => (
            <button key={cat} className={`flex-shrink-0 px-4 py-2 rounded-xl text-xs font-bold border ${
              cat === 'Tous' ? 'bg-primary text-ink border-primary' : 'glass-card border-border text-muted'
            }`}>
              {cat}
            </button>
          ))}
        </div>

        {/* Resume Learning */}
        <section className="space-y-4">
          <p className="font-mono text-[10px] uppercase tracking-widest text-muted">Reprendre</p>
          <Card className="glass-card p-6 rounded-[2.5rem] border-orange/20 overflow-hidden relative group">
            <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:rotate-12 transition-transform">
              <GraduationCap className="w-20 h-20 text-orange" />
            </div>
            <div className="space-y-4 relative z-10">
              <div className="flex justify-between items-start">
                <Badge className="bg-orange/10 text-orange border-none">FINANCE PERSONNELLE</Badge>
                <div className="text-right">
                  <p className="text-[10px] text-muted">Module 3/6</p>
                  <p className="text-sm font-bold">48% complété</p>
                </div>
              </div>
              <h3 className="text-lg font-bold">Gérer ses revenus et épargner</h3>
              <Progress value={48} className="h-2 bg-surface-3" indicatorClassName="bg-orange" />
              <Button className="w-full h-12 rounded-2xl bg-orange text-ink font-bold gap-2">
                Continuer la leçon <Play className="w-4 h-4 fill-current" />
              </Button>
            </div>
          </Card>
        </section>

        {/* Catalog */}
        <section className="space-y-4">
          <p className="font-mono text-[10px] uppercase tracking-widest text-muted">Catalogue</p>
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
    <div className="glass-card p-5 rounded-[2rem] flex items-center justify-between border-border/50 hover:border-primary/30 transition-all">
      <div className="flex items-center gap-4">
        <div className="w-14 h-14 rounded-2xl bg-surface-3 flex items-center justify-center text-2xl border border-border">
          {icon}
        </div>
        <div>
          <h4 className="text-sm font-bold leading-tight">{title}</h4>
          <p className="text-[10px] text-muted mt-1">{meta}</p>
        </div>
      </div>
      <div className="text-right flex flex-col items-end gap-2">
        {locked ? (
          <div className="flex items-center gap-1 text-[10px] font-mono text-orange uppercase tracking-wider">
            <Lock className="w-3 h-3" /> {tier}
          </div>
        ) : (
          <Badge variant="outline" className={`text-[9px] font-mono ${tier === 'START' ? 'border-border text-muted' : tier === 'PLUS' ? 'border-accent text-accent' : 'border-primary text-primary'}`}>
            {tier}
          </Badge>
        )}
        <Button size="sm" variant="ghost" className="h-8 px-3 rounded-xl text-[10px] font-bold">VOIR</Button>
      </div>
    </div>
  );
}
