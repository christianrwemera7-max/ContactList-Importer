
'use client';

import { AppSidebar } from "@/components/layout/AppSidebar";
import { BottomNav } from "@/components/layout/BottomNav";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Briefcase, Zap, Clock, MapPin, Search, PlusCircle, ArrowUpRight } from "lucide-react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";

export default function OpportunitiesPage() {
  return (
    <div className="flex flex-col min-h-screen pb-24 md:pb-0 connected-nodes">
      <AppSidebar />
      <header className="px-5 py-6 border-b border-border/50 sticky top-0 bg-ink/80 backdrop-blur-md z-40 space-y-4">
        <h1 className="font-display font-bold text-xl">Opportunités</h1>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted" />
          <Input className="pl-10 h-12 rounded-2xl bg-surface-2 border-border" placeholder="Chercher un job, une mission..." />
        </div>
      </header>

      <main className="flex-1 max-w-2xl mx-auto w-full p-5 space-y-8">
        <Tabs defaultValue="jobs" className="w-full">
          <TabsList className="w-full bg-surface-2 p-1 rounded-2xl mb-8">
            <TabsTrigger value="jobs" className="flex-1 rounded-xl data-[state=active]:bg-primary data-[state=active]:text-ink">Jobs / Stages</TabsTrigger>
            <TabsTrigger value="missions" className="flex-1 rounded-xl data-[state=active]:bg-primary data-[state=active]:text-ink">Missions</TabsTrigger>
            <TabsTrigger value="projects" className="flex-1 rounded-xl data-[state=active]:bg-primary data-[state=active]:text-ink">Project Lab</TabsTrigger>
          </TabsList>

          <TabsContent value="jobs" className="space-y-4">
            <OpportunityCard 
              title="Assistant Marketing Digital" 
              company="Fintech Partners" 
              type="STAGE" 
              location="Kinshasa / Remote"
              tag="PRO · 48H D'AVANCE"
              daysLeft={2}
              premium
            />
            <OpportunityCard 
              title="Développeur Front-end" 
              company="Design Studio" 
              type="CDI" 
              location="Abidjan"
              daysLeft={10}
            />
          </TabsContent>

          <TabsContent value="projects" className="space-y-8">
            <div className="glass-card p-8 rounded-[2.5rem] border-primary/30 bg-gradient-to-br from-primary/5 to-transparent text-center space-y-6">
              <div className="w-16 h-16 rounded-[2rem] bg-primary/10 flex items-center justify-center mx-auto text-primary">
                <PlusCircle className="w-8 h-8" />
              </div>
              <div className="space-y-2">
                <h2 className="text-2xl font-display font-bold">Lance ton projet</h2>
                <p className="text-muted text-sm max-w-[280px] mx-auto">
                  Besoin d'associés, de compétences ou d'un mentor ? Soumets ton idée au Project Lab.
                </p>
              </div>
              <Button size="lg" className="h-14 px-8 rounded-[2rem] bg-primary text-ink font-bold">
                Créer un projet
              </Button>
            </div>

            <div className="space-y-4">
              <p className="font-mono text-[10px] uppercase tracking-widest text-muted">Projets en cours</p>
              <ProjectCard 
                title="Wôrô App" 
                owner="Junior K." 
                category="Logistique"
                needs={['Dev Mobile', 'Commercial']}
                status="Prototype"
              />
            </div>
          </TabsContent>
        </Tabs>
      </main>
      <BottomNav />
    </div>
  );
}

function OpportunityCard({ title, company, type, location, tag, daysLeft, premium }: any) {
  return (
    <Card className={`glass-card p-6 rounded-[2.5rem] border-l-4 ${premium ? 'border-primary' : 'border-border'} space-y-4`}>
      <div className="flex justify-between items-start">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-surface-3 flex items-center justify-center text-muted border border-border">
            <Briefcase className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base font-bold leading-tight">{title}</h3>
            <p className="text-[11px] text-muted">{company}</p>
          </div>
        </div>
        {tag && <Badge className="bg-primary/10 text-primary border-primary/30 text-[9px] uppercase font-mono">{tag}</Badge>}
      </div>
      <div className="flex flex-wrap gap-4 text-[11px] text-muted-2">
        <div className="flex items-center gap-1.5"><MapPin className="w-3 h-3" /> {location}</div>
        <div className="flex items-center gap-1.5"><Clock className="w-3 h-3" /> Clôture dans {daysLeft}j</div>
      </div>
      <div className="pt-2 flex gap-3">
        <Button className="flex-1 h-11 rounded-2xl bg-surface-2 hover:bg-surface-3 border border-border font-bold">Postuler</Button>
        <Button variant="ghost" className="h-11 w-11 rounded-2xl border border-border p-0"><ArrowUpRight className="w-4 h-4" /></Button>
      </div>
    </Card>
  );
}

function ProjectCard({ title, owner, category, needs, status }: any) {
  return (
    <div className="glass-card p-6 rounded-[2.5rem] space-y-4 border-border/50">
      <div className="flex justify-between items-start">
        <div>
          <Badge className="bg-cyan/10 text-cyan border-none mb-2">{category}</Badge>
          <h3 className="text-lg font-bold">{title}</h3>
          <p className="text-[10px] text-muted">Porté par {owner}</p>
        </div>
        <Badge variant="outline" className="border-border text-muted uppercase text-[9px]">{status}</Badge>
      </div>
      <div className="space-y-2">
        <p className="text-[10px] font-mono text-muted-2 uppercase">Recherche :</p>
        <div className="flex flex-wrap gap-2">
          {needs.map((n: string) => (
            <span key={n} className="px-3 py-1.5 rounded-xl bg-surface-3 text-[10px] font-bold border border-border">
              + {n}
            </span>
          ))}
        </div>
      </div>
      <Button className="w-full h-11 rounded-2xl bg-cyan/10 text-cyan border border-cyan/20 font-bold">
        Rejoindre l'équipe
      </Button>
    </div>
  );
}
