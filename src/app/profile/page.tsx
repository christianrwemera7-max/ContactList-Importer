
'use client';

import { AppSidebar } from "@/components/layout/AppSidebar";
import { BottomNav } from "@/components/layout/BottomNav";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ShieldCheck, GraduationCap, Briefcase, Award, Settings, ChevronRight, CreditCard, Share2, Rocket, Plus } from "lucide-react";

export default function ProfilePage() {
  return (
    <div className="flex flex-col min-h-screen pb-24 md:pb-0">
      <AppSidebar />
      <main className="flex-1 md:ml-64 p-5 max-w-2xl mx-auto w-full py-10 space-y-10">
        
        {/* Profile Header / KONEKT ID */}
        <section className="flex flex-col items-center text-center">
          <div className="w-24 h-24 rounded-[2rem] bg-gradient-to-tr from-surface-3 to-surface border-2 border-orange flex items-center justify-center font-display font-bold text-4xl text-text mb-4 shadow-2xl shadow-orange/20">
            JK
          </div>
          <h1 className="font-display font-bold text-2xl mb-1">Junior K.</h1>
          <p className="text-cyan font-bold text-sm mb-4">Leader de cellule · Cocody #032</p>
          <div className="flex gap-2 mb-6">
            <Badge className="bg-orange/10 text-orange border-orange/30">KONEKT PLUS</Badge>
            <Badge variant="outline" className="border-border text-muted-2">Kinshasa, RDC</Badge>
          </div>
          <div className="flex gap-3 w-full max-w-[280px]">
            <Button className="flex-1 bg-surface border border-border hover:bg-surface-2 gap-2 text-xs rounded-xl">
              <Share2 className="w-3 h-3" /> Partager
            </Button>
            <Button className="flex-1 bg-orange text-ink font-bold gap-2 text-xs rounded-xl">
              Modifier
            </Button>
          </div>
        </section>

        {/* KONEKT SCORE & Stats */}
        <section className="grid grid-cols-3 gap-3">
          <Card className="bg-surface-2 border-border p-4 text-center rounded-2xl relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-1 opacity-10"><Award className="w-4 h-4 text-gold" /></div>
            <p className="font-display font-bold text-xl text-gold">850</p>
            <p className="text-[9px] text-muted-2 uppercase font-mono mt-1">KONEKT Score</p>
          </Card>
          <Card className="bg-surface-2 border-border p-4 text-center rounded-2xl">
            <p className="font-display font-bold text-xl text-cyan">92%</p>
            <p className="text-[9px] text-muted-2 uppercase font-mono mt-1">Activité</p>
          </Card>
          <Card className="bg-surface-2 border-border p-4 text-center rounded-2xl">
            <p className="font-display font-bold text-xl text-orange">75%</p>
            <p className="text-[9px] text-muted-2 uppercase font-mono mt-1">Formation</p>
          </Card>
        </section>

        {/* KONEKT SKILLS */}
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <p className="font-mono text-[10px] uppercase tracking-widest text-muted-2">Je sais faire (Skills)</p>
            <button className="w-5 h-5 rounded-md bg-surface-3 flex items-center justify-center text-muted hover:text-cyan"><Plus className="w-3 h-3" /></button>
          </div>
          <div className="flex flex-wrap gap-2">
            <SkillBadge label="Marketing Digital" />
            <SkillBadge label="Gestion de Projet" />
            <SkillBadge label="IA & Prompting" />
            <SkillBadge label="Design UI" />
          </div>
        </section>

        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <p className="font-mono text-[10px] uppercase tracking-widest text-muted-2">Je recherche (Matchmaking)</p>
            <button className="w-5 h-5 rounded-md bg-surface-3 flex items-center justify-center text-muted hover:text-orange"><Plus className="w-3 h-3" /></button>
          </div>
          <div className="flex flex-wrap gap-2">
            <MatchBadge label="Associé Tech" color="border-orange/30 text-orange" />
            <MatchBadge label="Mentor Finance" color="border-gold/30 text-gold" />
            <MatchBadge label="Équipe Mobile" color="border-cyan/30 text-cyan" />
          </div>
        </section>

        {/* Progression Path */}
        <section>
          <p className="font-mono text-[10px] uppercase tracking-widest text-muted-2 mb-6">Chemin de Leadership</p>
          <div className="relative flex justify-between px-2">
            <div className="absolute top-4 left-0 right-0 h-[2px] bg-border z-0" />
            <PathStep label="Membre" status="done" />
            <PathStep label="Leader" status="active" />
            <PathStep label="Coord. Zone" status="locked" />
            <PathStep label="Régional" status="locked" />
            <PathStep label="National" status="locked" />
          </div>
        </section>

        {/* Active Projects (Project Lab) */}
        <section className="space-y-4">
          <p className="font-mono text-[10px] uppercase tracking-widest text-muted-2">KONEKT Projects (Project Lab)</p>
          <Card className="bg-surface-2 border-border p-4 rounded-2xl border-l-4 border-primary group hover:border-primary/60 transition-colors">
            <div className="flex justify-between items-start mb-2">
              <h3 className="font-display font-bold text-sm">Wôrô · Livraison Étudiante</h3>
              <Badge className="bg-primary/10 text-primary border-none text-[8px] uppercase">Prototype</Badge>
            </div>
            <p className="text-[11px] text-muted mb-3">Plateforme de livraison de repas locaux entre campus.</p>
            <div className="flex gap-2">
              <Badge variant="outline" className="text-[9px] border-border text-muted-2">2 Contrib.</Badge>
              <Badge variant="outline" className="text-[9px] border-border text-muted-2 text-cyan">Recherche Dev</Badge>
            </div>
          </Card>
        </section>

        {/* Menu Actions */}
        <section className="space-y-1">
          <MenuItem icon={CreditCard} label="Mon adhésion — PLUS" />
          <MenuItem icon={ShieldCheck} label="Transparence financière" />
          <MenuItem icon={Briefcase} label="Mes candidatures" />
          <MenuItem icon={Rocket} label="Soumettre un projet" />
          <MenuItem icon={Settings} label="Paramètres" />
        </section>
      </main>
      <BottomNav />
    </div>
  );
}

function SkillBadge({ label }: { label: string }) {
  return (
    <span className="px-3 py-1.5 rounded-xl bg-surface-2 border border-border text-[11px] font-medium text-muted-2 hover:border-cyan/40 hover:text-cyan transition-colors cursor-default">
      {label}
    </span>
  );
}

function MatchBadge({ label, color }: { label: string, color: string }) {
  return (
    <span className={`px-3 py-1.5 rounded-xl bg-surface-2 border ${color} text-[11px] font-bold hover:bg-surface-3 transition-colors cursor-default`}>
      {label}
    </span>
  );
}

function PathStep({ label, status }: { label: string, status: 'done' | 'active' | 'locked' }) {
  return (
    <div className="flex flex-col items-center gap-3 z-10 w-16">
      <div className={`
        w-8 h-8 rounded-full border-2 flex items-center justify-center transition-all
        ${status === 'done' ? 'bg-cyan border-cyan text-ink' : status === 'active' ? 'bg-orange border-orange text-ink shadow-[0_0_15px_rgba(255,107,53,0.4)]' : 'bg-surface-3 border-border text-muted-2'}
      `}>
        {status === 'done' && <ShieldCheck className="w-4 h-4" />}
        {status === 'active' && <div className="w-2 h-2 rounded-full bg-ink animate-pulse" />}
      </div>
      <span className={`text-[9px] text-center font-bold uppercase tracking-tighter ${status === 'locked' ? 'text-muted-2' : 'text-text'}`}>
        {label}
      </span>
    </div>
  );
}

function MenuItem({ icon: Icon, label }: any) {
  return (
    <button className="w-full flex items-center justify-between p-4 hover:bg-surface-2 transition-colors border-b border-border/50 group">
      <div className="flex items-center gap-4">
        <Icon className="w-5 h-5 text-muted-2 group-hover:text-text transition-colors" />
        <span className="text-sm font-medium text-text">{label}</span>
      </div>
      <ChevronRight className="w-4 h-4 text-muted-2" />
    </button>
  );
}
