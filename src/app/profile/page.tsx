
'use client';

import { AppSidebar } from "@/components/layout/AppSidebar";
import { BottomNav } from "@/components/layout/BottomNav";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ShieldCheck, Award, Settings, ChevronRight, CreditCard, Share2, Rocket, Plus, Zap, TrendingUp } from "lucide-react";

export default function ProfilePage() {
  return (
    <div className="flex flex-col min-h-screen pb-24 md:pb-0 bg-ink">
      <header className="px-5 py-6 border-b border-border/50 sticky top-0 bg-ink/80 backdrop-blur-md z-40 flex justify-between items-center">
        <h1 className="font-display font-bold text-xl">KONEKT ID</h1>
        <button className="w-9 h-9 flex items-center justify-center rounded-xl bg-surface-2 border border-border">
          <Settings className="w-4 h-4 text-muted-2" />
        </button>
      </header>

      <main className="flex-1 max-w-2xl mx-auto w-full p-5 space-y-10 py-10">
        
        {/* KONEKT ID Card */}
        <section className="flex flex-col items-center text-center">
          <div className="w-28 h-28 rounded-[2.5rem] p-1 bg-gradient-to-tr from-cyan via-orange to-gold mb-6 shadow-2xl shadow-orange/10">
            <div className="w-full h-full rounded-[2.3rem] bg-surface-3 flex items-center justify-center font-display font-bold text-4xl text-text border-4 border-ink">
              JK
            </div>
          </div>
          <h1 className="font-display font-bold text-2xl mb-1">Junior K.</h1>
          <p className="text-cyan font-bold text-sm mb-6 flex items-center gap-2">
            Leader de cellule · Cocody #032 <ShieldCheck className="w-4 h-4" />
          </p>
          <div className="flex gap-2 mb-8">
            <Badge className="bg-orange/10 text-orange border-orange/30 px-3 py-1 font-mono">PLUS</Badge>
            <Badge variant="outline" className="border-border text-muted-2 px-3 py-1 font-mono">ID: 8742-032</Badge>
          </div>
          <div className="flex gap-3 w-full max-w-[320px]">
            <Button className="flex-1 bg-surface-2 border border-border hover:bg-surface-3 gap-2 text-xs rounded-2xl h-11">
              <Share2 className="w-3 h-3" /> Partager
            </Button>
            <Button className="flex-1 bg-orange text-ink font-bold gap-2 text-xs rounded-2xl h-11">
              Modifier
            </Button>
          </div>
        </section>

        {/* KONEKT SCORE & Stats */}
        <section className="grid grid-cols-3 gap-4">
          <Card className="glass-card p-5 text-center rounded-[2rem] border-gold/20">
            <p className="font-display font-bold text-2xl text-gold">850</p>
            <p className="text-[9px] text-muted-2 uppercase font-mono mt-2 tracking-widest">Score</p>
          </Card>
          <Card className="glass-card p-5 text-center rounded-[2rem] border-cyan/20">
            <p className="font-display font-bold text-2xl text-cyan">92%</p>
            <p className="text-[9px] text-muted-2 uppercase font-mono mt-2 tracking-widest">Activité</p>
          </Card>
          <Card className="glass-card p-5 text-center rounded-[2rem] border-orange/20">
            <div className="flex items-center justify-center gap-1">
              <p className="font-display font-bold text-2xl text-orange">75</p>
              <span className="text-xs text-orange font-bold">%</span>
            </div>
            <p className="text-[9px] text-muted-2 uppercase font-mono mt-2 tracking-widest">Path</p>
          </Card>
        </section>

        {/* SKILLS & NEEDS */}
        <div className="space-y-8">
          <section className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-mono text-[10px] uppercase tracking-widest text-muted-2">Je sais faire (Skills)</h3>
              <button className="w-6 h-6 rounded-lg bg-surface-3 flex items-center justify-center text-muted hover:text-cyan"><Plus className="w-3 h-3" /></button>
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
              <h3 className="font-mono text-[10px] uppercase tracking-widest text-muted-2">Je recherche (Matchmaking)</h3>
              <button className="w-6 h-6 rounded-lg bg-surface-3 flex items-center justify-center text-muted hover:text-orange"><Plus className="w-3 h-3" /></button>
            </div>
            <div className="flex flex-wrap gap-2">
              <MatchBadge label="Associé Tech" color="border-orange/30 text-orange" />
              <MatchBadge label="Mentor Finance" color="border-gold/30 text-gold" />
              <MatchBadge label="Équipe Mobile" color="border-cyan/30 text-cyan" />
            </div>
          </section>
        </div>

        {/* Progression Path */}
        <section className="space-y-6">
          <h3 className="font-mono text-[10px] uppercase tracking-widest text-muted-2">Chemin de Leadership</h3>
          <div className="relative flex justify-between px-4">
            <div className="absolute top-[18px] left-8 right-8 h-[2px] bg-surface-3 z-0" />
            <PathStep label="Membre" status="done" />
            <PathStep label="Leader" status="active" />
            <PathStep label="Coord. Zone" status="locked" />
            <PathStep label="Régional" status="locked" />
            <PathStep label="National" status="locked" />
          </div>
        </section>

        {/* Menu Actions */}
        <section className="space-y-2 pt-6">
          <MenuItem icon={CreditCard} label="Mon adhésion — PLUS" meta="Renouvellement le 15 sept." />
          <MenuItem icon={TrendingUp} label="Transparence financière" meta="Rapport août disponible" />
          <MenuItem icon={Rocket} label="Soumettre un projet" meta="Project Lab" />
          <MenuItem icon={Award} label="Mes Certifications" meta="3 badges obtenus" />
        </section>
      </main>
      <BottomNav />
    </div>
  );
}

function SkillBadge({ label }: { label: string }) {
  return (
    <span className="px-4 py-2 rounded-2xl bg-surface-2 border border-border text-[11px] font-bold text-muted hover:border-cyan/50 hover:text-cyan transition-all cursor-default">
      {label}
    </span>
  );
}

function MatchBadge({ label, color }: { label: string, color: string }) {
  return (
    <span className={`px-4 py-2 rounded-2xl bg-surface-2 border ${color} text-[11px] font-black hover:bg-surface-3 transition-all cursor-default`}>
      {label}
    </span>
  );
}

function PathStep({ label, status }: { label: string, status: 'done' | 'active' | 'locked' }) {
  return (
    <div className="flex flex-col items-center gap-4 z-10 w-16">
      <div className={`
        w-9 h-9 rounded-full border-2 flex items-center justify-center transition-all duration-500
        ${status === 'done' ? 'bg-cyan border-cyan text-ink' : status === 'active' ? 'bg-orange border-orange text-ink shadow-[0_0_20px_rgba(255,107,53,0.4)]' : 'bg-surface-3 border-border text-muted-2'}
      `}>
        {status === 'done' && <ShieldCheck className="w-5 h-5" />}
        {status === 'active' && <div className="w-2.5 h-2.5 rounded-full bg-ink animate-pulse" />}
      </div>
      <span className={`text-[8px] text-center font-black uppercase tracking-widest ${status === 'locked' ? 'text-muted-2' : 'text-text'}`}>
        {label}
      </span>
    </div>
  );
}

function MenuItem({ icon: Icon, label, meta }: any) {
  return (
    <button className="w-full flex items-center justify-between p-5 glass-card rounded-2xl border-border/40 hover:border-cyan/30 transition-all group mb-2">
      <div className="flex items-center gap-4">
        <div className="w-10 h-10 rounded-xl bg-surface-3 flex items-center justify-center text-muted-2 group-hover:text-cyan transition-colors">
          <Icon className="w-5 h-5" />
        </div>
        <div className="text-left">
          <span className="block text-sm font-bold text-text">{label}</span>
          <span className="block text-[10px] text-muted-2 font-medium">{meta}</span>
        </div>
      </div>
      <ChevronRight className="w-4 h-4 text-muted-2 group-hover:text-cyan group-hover:translate-x-1 transition-all" />
    </button>
  );
}
