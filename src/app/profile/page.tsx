
'use client';

import { AppSidebar } from "@/components/layout/AppSidebar";
import { BottomNav } from "@/components/layout/BottomNav";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ShieldCheck, GraduationCap, Briefcase, Award, Settings, ChevronRight, CreditCard, Share2 } from "lucide-react";

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
            <Badge className="bg-orange/10 text-orange border-orange/30">MEMBRE PLUS</Badge>
            <Badge variant="outline" className="border-border text-muted-2">Kinshasa, RDC</Badge>
          </div>
          <div className="flex gap-3 w-full max-w-[280px]">
            <Button className="flex-1 bg-surface border border-border hover:bg-surface-2 gap-2 text-xs">
              <Share2 className="w-3 h-3" /> Partager
            </Button>
            <Button className="flex-1 bg-orange text-ink font-bold gap-2 text-xs">
              Modifier
            </Button>
          </div>
        </section>

        {/* Stats Row */}
        <section className="grid grid-cols-3 gap-3">
          <Card className="bg-surface-2 border-border p-4 text-center rounded-2xl">
            <p className="font-display font-bold text-xl">7</p>
            <p className="text-[9px] text-muted-2 uppercase font-mono mt-1">Formations</p>
          </Card>
          <Card className="bg-surface-2 border-border p-4 text-center rounded-2xl">
            <p className="font-display font-bold text-xl text-cyan">92%</p>
            <p className="text-[9px] text-muted-2 uppercase font-mono mt-1">Présence</p>
          </Card>
          <Card className="bg-surface-2 border-border p-4 text-center rounded-2xl">
            <p className="font-display font-bold text-xl text-orange">3</p>
            <p className="text-[9px] text-muted-2 uppercase font-mono mt-1">Invitations</p>
          </Card>
        </section>

        {/* Progression Path */}
        <section>
          <p className="font-mono text-[10px] uppercase tracking-widest text-muted-2 mb-6">École de Leadership</p>
          <div className="relative flex justify-between px-2">
            <div className="absolute top-4 left-0 right-0 h-[2px] bg-border z-0" />
            <PathStep label="Membre" status="done" />
            <PathStep label="Leader" status="active" />
            <PathStep label="Coord. Zone" status="locked" />
            <PathStep label="Régional" status="locked" />
            <PathStep label="National" status="locked" />
          </div>
        </section>

        {/* Badges & Identity */}
        <section className="space-y-4">
          <p className="font-mono text-[10px] uppercase tracking-widest text-muted-2">Badges de Confiance</p>
          <div className="flex flex-wrap gap-4">
            <BadgeItem icon={GraduationCap} label="Academy Starter" color="text-cyan" />
            <BadgeItem icon={ShieldCheck} label="Actif 6 mois" color="text-orange" />
            <BadgeItem icon={Award} label="KONEKT Contributor" color="text-gold" />
          </div>
        </section>

        {/* Menu Actions */}
        <section className="space-y-1">
          <MenuItem icon={CreditCard} label="Mon adhésion — PLUS" />
          <MenuItem icon={ShieldCheck} label="Transparence financière" />
          <MenuItem icon={Briefcase} label="Mes candidatures" />
          <MenuItem icon={Settings} label="Paramètres du compte" />
        </section>
      </main>
      <BottomNav />
    </div>
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

function BadgeItem({ icon: Icon, label, color }: any) {
  return (
    <div className="flex flex-col items-center gap-2 p-4 rounded-2xl bg-surface-2 border border-border w-[100px] text-center">
      <div className={`w-10 h-10 rounded-xl bg-surface-3 flex items-center justify-center ${color}`}>
        <Icon className="w-5 h-5" />
      </div>
      <span className="text-[9px] font-bold text-muted uppercase">{label}</span>
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
