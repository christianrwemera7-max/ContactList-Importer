
'use client';

import { useState } from 'react';
import { AppSidebar } from "@/components/layout/AppSidebar";
import { BottomNav } from "@/components/layout/BottomNav";
import { Badge } from "@/components/ui/badge";
import { HexFrame } from "@/components/ui/HexFrame";
import { Rocket, Wallet, Handshake, Wrench, Plus, ChevronRight } from "lucide-react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";

const PROJECTS = [
  {
    id: 1,
    author: "Moussa K.",
    initials: "MK",
    tier: "PLUS",
    name: "AgriLink RDC",
    secteur: "AgriTech",
    resume: "App de mise en relation producteurs ↔ acheteurs urbains, avec logistique mutualisée.",
    besoinType: "Financement",
    besoinDetail: "1500$ pour la flotte pilote (3 tricycles)",
    icon: Wallet,
    progress: 62,
  },
  {
    id: 2,
    author: "Aïcha B.",
    initials: "AB",
    tier: "START",
    name: "TissTiss Mode",
    secteur: "Artisanat",
    resume: "Ligne de prêt-à-porter en pagne, ancrée dans l'atelier familial, prête à se structurer.",
    besoinType: "Compétences",
    besoinDetail: "Mentorat gestion + accompagnement export",
    icon: Wrench,
    progress: 28,
  },
];

function OpportunitiesContent() {
  const searchParams = useSearchParams();
  const defaultTab = searchParams.get('tab') || 'projects';

  return (
    <div className="flex min-h-screen bg-ink">
      <AppSidebar />
      <main className="flex-1 md:ml-72 flex flex-col min-w-0">
        <header className="px-6 py-6 border-b border-line bg-ink/80 backdrop-blur-md sticky top-0 z-40">
          <h1 className="font-display font-bold text-2xl">Espace Projet Lab</h1>
          <p className="text-muted text-sm mt-1">Déposez votre projet et faites état de vos besoins.</p>
        </header>

        <div className="p-6 max-w-4xl mx-auto w-full pb-28 space-y-8">
          <div className="flex justify-between items-center">
            <h2 className="font-display font-bold text-lg">Projets en cours</h2>
            <button className="k-cta flex items-center gap-2">
              <Plus size={16} /> Déposer un projet
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {PROJECTS.map((p) => (
              <article key={p.id} className="bg-surface border border-line rounded-[2.5rem] p-6 space-y-6 hover:border-gold/30 transition-all">
                <div className="flex items-center gap-4">
                  <HexFrame size={40} color={p.tier === 'PRO' ? '#E8A83C' : '#35C29B'}>{p.initials}</HexFrame>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <strong className="text-sm font-bold">{p.author}</strong>
                      <Badge variant="outline" className="text-[8px] border-line text-muted uppercase tracking-tighter">{p.tier}</Badge>
                    </div>
                    <div className="text-[10px] text-teal font-bold uppercase tracking-widest mt-1">{p.secteur}</div>
                  </div>
                </div>

                <div className="space-y-2">
                  <h3 className="font-display font-bold text-xl">{p.name}</h3>
                  <p className="text-xs text-muted leading-relaxed line-clamp-3">{p.resume}</p>
                </div>

                <div className="bg-surface-2 border border-line rounded-2xl p-4 flex gap-4 items-start">
                  <div className="p-2 bg-teal-dim rounded-xl text-teal">
                    <p.icon size={20} />
                  </div>
                  <div>
                    <span className="text-[10px] font-bold text-teal uppercase tracking-widest">Besoin — {p.besoinType}</span>
                    <p className="text-xs text-text mt-1">{p.besoinDetail}</p>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex justify-between items-center text-[10px] font-bold text-muted uppercase tracking-widest">
                    <span>Progression du besoin</span>
                    <span className="text-gold">{p.progress}%</span>
                  </div>
                  <div className="h-2 w-full bg-line rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-gradient-to-r from-teal to-gold transition-all duration-1000" 
                      style={{ width: `${p.progress}%` }} 
                    />
                  </div>
                </div>

                <button className="w-full flex items-center justify-between p-4 bg-surface-2 border border-line rounded-2xl text-xs font-bold group hover:border-gold/50 transition-colors">
                  Voir le dossier complet <ChevronRight size={16} className="text-muted group-hover:text-gold transition-colors" />
                </button>
              </article>
            ))}
          </div>
        </div>
      </main>
      <BottomNav />
    </div>
  );
}

export default function OpportunitiesPage() {
  return (
    <Suspense fallback={<div className="p-10 text-center">Chargement...</div>}>
      <OpportunitiesContent />
    </Suspense>
  );
}
