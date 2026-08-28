
'use client';

import { AppSidebar } from "@/components/layout/AppSidebar";
import { BottomNav } from "@/components/layout/BottomNav";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ShieldCheck, Award, Settings, ChevronRight, CreditCard, Share2, Rocket, Plus, TrendingUp, Building, Target, Code, Briefcase } from "lucide-react";

export default function ProfilePage() {
  const user = {
    name: "Christian Rwemera",
    profession: "Entrepreneur numérique",
    tier: "PLUS",
    role: "LEADER",
    cell: "Kinshasa Centre #014",
    score: 850,
    activityIndex: "92%",
    coursesCount: 12,
    skills: ["Marketing Digital", "Droit des Affaires", "IA Prompting", "Gestion Projet"],
    objectives: ["Associés", "Clients", "Mentorat"],
    badges: ["🏆 Actif", "📚 Apprenant", "🤝 Collaborateur"]
  };

  return (
    <div className="flex flex-col min-h-screen pb-24 md:pb-0 bg-ink">
      <header className="px-5 py-6 border-b border-border/50 sticky top-0 bg-ink/80 backdrop-blur-md z-40 flex justify-between items-center">
        <h1 className="font-display font-bold text-xl tracking-tight uppercase">KONEKT ID</h1>
        <button className="w-10 h-10 flex items-center justify-center rounded-xl bg-surface-2 border border-border group hover:border-cyan/50 transition-colors">
          <Settings className="w-5 h-5 text-muted-2 group-hover:text-cyan" />
        </button>
      </header>

      <main className="flex-1 max-w-2xl mx-auto w-full p-5 space-y-10 py-8">
        {/* KONEKT ID Card */}
        <section className="flex flex-col items-center text-center">
          <div className="w-32 h-32 rounded-[3rem] p-[3px] bg-gradient-to-tr from-cyan via-orange to-gold mb-6 shadow-2xl relative group">
            <div className="w-full h-full rounded-[2.85rem] bg-surface-3 flex items-center justify-center font-display font-bold text-4xl text-text border-4 border-ink overflow-hidden">
              CR
            </div>
            <div className="absolute -bottom-2 -right-2 w-11 h-11 bg-gold rounded-2xl flex items-center justify-center border-4 border-ink text-ink shadow-lg group-hover:scale-110 transition-transform">
              <ShieldCheck className="w-6 h-6" />
            </div>
          </div>
          
          <div className="space-y-1">
            <h1 className="font-display font-bold text-3xl tracking-tight">{user.name}</h1>
            <div className="flex items-center justify-center gap-2 text-cyan font-black text-[10px] uppercase tracking-[0.2em]">
              <Building className="w-3.5 h-3.5" /> {user.role} · {user.cell}
            </div>
            <p className="text-muted text-sm mt-2">{user.profession}</p>
          </div>

          <div className="flex gap-3 mt-8 mb-10">
            <Badge className="bg-orange/10 text-orange border-orange/30 px-4 py-1.5 font-mono text-[10px]">TIER: {user.tier}</Badge>
            <Badge variant="outline" className="border-border text-muted-2 px-4 py-1.5 font-mono text-[10px]">ID: 8742-014</Badge>
          </div>

          <div className="flex gap-3 w-full max-w-[340px]">
            <Button className="flex-1 bg-surface-2 border border-border hover:bg-surface-3 gap-2 text-xs rounded-2xl h-12 font-bold">
              <Share2 className="w-4 h-4" /> Partager ID
            </Button>
            <Button className="flex-1 bg-orange text-ink font-black gap-2 text-xs rounded-2xl h-12 uppercase tracking-wider">
              Modifier
            </Button>
          </div>
        </section>

        {/* Stats */}
        <section className="grid grid-cols-3 gap-4">
          <StatCard value={user.score} label="KONEKT SCORE" color="text-gold" />
          <StatCard value={user.activityIndex} label="ENGAGEMENT" color="text-cyan" />
          <StatCard value={user.coursesCount} label="APPRENTISSAGE" color="text-orange" />
        </section>

        {/* Skills Matrix */}
        <section className="space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-2 font-black">Mon Profil Professionnel</h3>
          </div>
          
          <div className="space-y-4">
            <div className="glass-card p-6 rounded-[2.5rem] space-y-4 border-white/5">
              <div className="flex items-center gap-2 text-[10px] font-mono text-cyan uppercase tracking-widest mb-2">
                <Code className="w-3.5 h-3.5" /> Compétences
              </div>
              <div className="flex flex-wrap gap-2">
                {user.skills.map(s => <SkillBadge key={s} label={s} />)}
              </div>
            </div>

            <div className="glass-card p-6 rounded-[2.5rem] space-y-4 border-white/5">
              <div className="flex items-center gap-2 text-[10px] font-mono text-orange uppercase tracking-widest mb-2">
                <Target className="w-3.5 h-3.5" /> Objectifs de recherche
              </div>
              <div className="flex flex-wrap gap-2">
                {user.objectives.map(o => (
                  <span key={o} className="px-4 py-2 rounded-2xl bg-orange/5 border border-orange/20 text-[11px] font-bold text-orange/80">
                    Recherche {o}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Leadership Path */}
        <section className="space-y-8">
          <h3 className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-2 font-black">Chemin de Leadership</h3>
          <div className="relative flex justify-between px-4">
            <div className="absolute top-[20px] left-8 right-8 h-[2px] bg-surface-3 z-0" />
            <PathStep label="Membre" status="done" />
            <PathStep label="Leader" status="active" />
            <PathStep label="Coordinateur" status="locked" />
            <PathStep label="Régional" status="locked" />
            <PathStep label="National" status="locked" />
          </div>
        </section>

        {/* Settings */}
        <section className="space-y-3 pt-4 pb-10">
          <MenuItem icon={CreditCard} label="Abonnement KONEKT PLUS" meta="Renouvellement le 15 sept. (10$)" color="text-cyan" />
          <MenuItem icon={Award} label="Mes Badges & Certificats" meta={`${user.badges.length} actifs`} color="text-gold" />
          <MenuItem icon={Briefcase} label="Mes Candidatures" meta="3 opportunités en cours" color="text-orange" />
        </section>
      </main>
      <BottomNav />
    </div>
  );
}

function StatCard({ value, label, color }: any) {
  return (
    <Card className="glass-card p-6 text-center rounded-[2.5rem] border-white/5 hover:border-cyan/20 group">
      <p className={`font-display font-bold text-2xl ${color} group-hover:scale-110 transition-transform`}>{value}</p>
      <p className="text-[9px] text-muted-2 uppercase font-mono mt-2 tracking-[0.1em] font-black">{label}</p>
    </Card>
  );
}

function SkillBadge({ label }: { label: string }) {
  return (
    <span className="px-4 py-2 rounded-2xl bg-surface-2 border border-border text-[11px] font-bold text-muted-2 hover:border-cyan/50 hover:text-cyan transition-all">
      {label}
    </span>
  );
}

function PathStep({ label, status }: { label: string, status: 'done' | 'active' | 'locked' }) {
  return (
    <div className="flex flex-col items-center gap-4 z-10 w-16">
      <div className={`
        w-10 h-10 rounded-full border-2 flex items-center justify-center transition-all duration-700
        ${status === 'done' ? 'bg-cyan border-cyan text-ink' : status === 'active' ? 'bg-orange border-orange text-ink scale-110' : 'bg-surface-3 border-border text-muted-2'}
      `}>
        {status === 'done' && <ShieldCheck className="w-5 h-5" />}
        {status === 'active' && <div className="w-2.5 h-2.5 rounded-full bg-ink animate-pulse" />}
      </div>
      <span className={`text-[8px] text-center font-black uppercase tracking-widest leading-tight ${status === 'locked' ? 'text-muted-2' : 'text-text'}`}>
        {label}
      </span>
    </div>
  );
}

function MenuItem({ icon: Icon, label, meta, color, href }: any) {
  return (
    <div className="w-full flex items-center justify-between p-5 glass-card rounded-[2rem] border-border/40 hover:border-cyan/30 group">
      <div className="flex items-center gap-5">
        <div className={`w-11 h-11 rounded-2xl bg-surface-3 flex items-center justify-center text-muted-2 group-hover:${color} border border-border/50`}>
          <Icon className="w-5 h-5" />
        </div>
        <div className="text-left">
          <span className="block text-sm font-bold text-text">{label}</span>
          <span className="block text-[10px] text-muted-2 font-mono uppercase">{meta}</span>
        </div>
      </div>
      <ChevronRight className="w-5 h-5 text-muted-2 group-hover:text-cyan" />
    </div>
  );
}
