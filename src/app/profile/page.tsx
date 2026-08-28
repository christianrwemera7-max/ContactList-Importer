
'use client';

import { AppSidebar } from "@/components/layout/AppSidebar";
import { BottomNav } from "@/components/layout/BottomNav";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { 
  ShieldCheck, 
  Award, 
  Settings, 
  ChevronRight, 
  CreditCard, 
  Share2, 
  Rocket, 
  Plus, 
  TrendingUp,
  MapPin,
  Building
} from "lucide-react";
import { ROLES } from "@/lib/constants";

export default function ProfilePage() {
  // Mock User Role for UI demonstration
  const userRole = ROLES.LEADER;
  const userScope = "Cellule Cocody #032";

  return (
    <div className="flex flex-col min-h-screen pb-24 md:pb-0 bg-ink">
      <header className="px-5 py-6 border-b border-border/50 sticky top-0 bg-ink/80 backdrop-blur-md z-40 flex justify-between items-center">
        <h1 className="font-display font-bold text-xl tracking-tight">KONEKT ID</h1>
        <button className="w-9 h-9 flex items-center justify-center rounded-xl bg-surface-2 border border-border">
          <Settings className="w-4 h-4 text-muted-2" />
        </button>
      </header>

      <main className="flex-1 max-w-2xl mx-auto w-full p-5 space-y-10 py-10">
        
        {/* KONEKT ID Card - Professional View */}
        <section className="flex flex-col items-center text-center">
          <div className="w-28 h-28 rounded-[2.5rem] p-1 bg-gradient-to-tr from-cyan via-orange to-gold mb-6 shadow-2xl shadow-orange/10 relative">
            <div className="w-full h-full rounded-[2.3rem] bg-surface-3 flex items-center justify-center font-display font-bold text-4xl text-text border-4 border-ink">
              JK
            </div>
            <div className="absolute -bottom-2 -right-2 w-10 h-10 bg-gold rounded-2xl flex items-center justify-center border-4 border-ink text-ink shadow-lg">
              <ShieldCheck className="w-5 h-5" />
            </div>
          </div>
          
          <div className="space-y-1">
            <h1 className="font-display font-bold text-2xl">Junior K.</h1>
            <div className="flex items-center justify-center gap-2 text-cyan font-bold text-xs uppercase tracking-wider">
              <Building className="w-3.5 h-3.5" /> {userRole.replace('_', ' ')} · {userScope}
            </div>
          </div>

          <div className="flex gap-2 mt-6 mb-8">
            <Badge className="bg-orange/10 text-orange border-orange/30 px-3 py-1 font-mono text-[9px]">TIER : PLUS</Badge>
            <Badge variant="outline" className="border-border text-muted-2 px-3 py-1 font-mono text-[9px]">ID: 8742-032</Badge>
          </div>

          <div className="flex gap-3 w-full max-w-[320px]">
            <Button className="flex-1 bg-surface-2 border border-border hover:bg-surface-3 gap-2 text-xs rounded-2xl h-11 transition-all">
              <Share2 className="w-3.5 h-3.5" /> Partager ID
            </Button>
            <Button className="flex-1 bg-orange text-ink font-bold gap-2 text-xs rounded-2xl h-11 shadow-lg shadow-orange/20">
              Modifier Profil
            </Button>
          </div>
        </section>

        {/* KONEKT SCORE & Activity Index */}
        <section className="grid grid-cols-3 gap-4">
          <StatCard value="850" label="KONEKT SCORE" color="text-gold" />
          <StatCard value="92%" label="INDICE ACTIVITÉ" color="text-cyan" />
          <StatCard value="12" label="FORMATIONS" color="text-orange" />
        </section>

        {/* Path to Leadership - Rule #13 */}
        <section className="space-y-6">
          <h3 className="font-mono text-[10px] uppercase tracking-widest text-muted-2 font-bold">Mon Chemin de Leadership</h3>
          <div className="relative flex justify-between px-4">
            <div className="absolute top-[18px] left-8 right-8 h-[1px] bg-surface-3 z-0" />
            <PathStep label="Membre" status="done" />
            <PathStep label="Leader" status="active" />
            <PathStep label="Coord. Zone" status="locked" />
            <PathStep label="Régional" status="locked" />
            <PathStep label="National" status="locked" />
          </div>
        </section>

        {/* Professional Metadata */}
        <div className="space-y-8">
          <section className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-mono text-[10px] uppercase tracking-widest text-muted-2 font-bold">Mes Compétences (KONEKT Skills)</h3>
              <button className="w-7 h-7 rounded-xl bg-surface-2 flex items-center justify-center text-muted-2 hover:text-cyan border border-border"><Plus className="w-3.5 h-3.5" /></button>
            </div>
            <div className="flex flex-wrap gap-2">
              <SkillBadge label="Marketing Digital" />
              <SkillBadge label="Gestion de Projet" />
              <SkillBadge label="IA Prompting" />
              <SkillBadge label="Design UI/UX" />
            </div>
          </section>
        </div>

        {/* Account Settings */}
        <section className="space-y-2 pt-6">
          <p className="font-mono text-[10px] uppercase tracking-widest text-muted-2 font-bold mb-4">Paramètres du Compte</p>
          <MenuItem icon={CreditCard} label="Mon adhésion — PLUS" meta="Renouvellement le 15 sept." color="text-cyan" />
          <MenuItem icon={TrendingUp} label="Transparence financière" meta="Consulter les rapports T3" color="text-primary" href="/governance" />
          <MenuItem icon={Award} label="Mes Certifications" meta="4 badges actifs" color="text-gold" />
        </section>
      </main>
      <BottomNav />
    </div>
  );
}

function StatCard({ value, label, color }: any) {
  return (
    <Card className="glass-card p-5 text-center rounded-[2rem] border-white/5 hover:border-white/10 transition-all">
      <p className={`font-display font-bold text-2xl ${color}`}>{value}</p>
      <p className="text-[9px] text-muted-2 uppercase font-mono mt-2 tracking-widest leading-none">{label}</p>
    </Card>
  );
}

function SkillBadge({ label }: { label: string }) {
  return (
    <span className="px-4 py-2 rounded-2xl bg-surface-2 border border-border text-[11px] font-bold text-muted-2 hover:border-cyan/50 hover:text-cyan transition-all cursor-default">
      {label}
    </span>
  );
}

function PathStep({ label, status }: { label: string, status: 'done' | 'active' | 'locked' }) {
  return (
    <div className="flex flex-col items-center gap-4 z-10 w-16">
      <div className={`
        w-9 h-9 rounded-full border-2 flex items-center justify-center transition-all duration-500
        ${status === 'done' ? 'bg-cyan border-cyan text-ink shadow-[0_0_15px_rgba(51,230,200,0.2)]' : status === 'active' ? 'bg-orange border-orange text-ink shadow-[0_0_20px_rgba(255,107,53,0.4)]' : 'bg-surface-3 border-border text-muted-2'}
      `}>
        {status === 'done' && <ShieldCheck className="w-5 h-5" />}
        {status === 'active' && <div className="w-2 h-2 rounded-full bg-ink animate-pulse" />}
      </div>
      <span className={`text-[8px] text-center font-black uppercase tracking-widest leading-tight ${status === 'locked' ? 'text-muted-2' : 'text-text'}`}>
        {label}
      </span>
    </div>
  );
}

function MenuItem({ icon: Icon, label, meta, color, href }: any) {
  const content = (
    <div className="w-full flex items-center justify-between p-5 glass-card rounded-2xl border-border/40 hover:border-cyan/30 transition-all group mb-2">
      <div className="flex items-center gap-4">
        <div className={`w-10 h-10 rounded-xl bg-surface-3 flex items-center justify-center text-muted-2 group-hover:${color} transition-colors`}>
          <Icon className="w-5 h-5" />
        </div>
        <div className="text-left">
          <span className="block text-sm font-bold text-text">{label}</span>
          <span className="block text-[10px] text-muted-2 font-medium">{meta}</span>
        </div>
      </div>
      <ChevronRight className="w-4 h-4 text-muted-2 group-hover:text-cyan group-hover:translate-x-1 transition-all" />
    </div>
  );

  if (href) {
    return <a href={href}>{content}</a>;
  }
  return <button className="w-full">{content}</button>;
}
