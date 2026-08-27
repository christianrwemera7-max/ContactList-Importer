
'use client';

import { AppSidebar } from "@/components/layout/AppSidebar";
import { BottomNav } from "@/components/layout/BottomNav";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { ShieldCheck, TrendingUp, PieChart, Info, ArrowUpRight, DollarSign, Users } from "lucide-react";

export default function GovernancePage() {
  return (
    <div className="flex flex-col min-h-screen pb-24 md:pb-0 connected-nodes">
      <AppSidebar />
      <header className="px-5 py-6 border-b border-border/50 sticky top-0 bg-ink/80 backdrop-blur-md z-40">
        <h1 className="font-display font-bold text-xl tracking-tight">Gouvernance & Finance</h1>
        <p className="text-[10px] font-mono text-muted uppercase tracking-widest mt-1">Transparence et confiance</p>
      </header>

      <main className="flex-1 max-w-2xl mx-auto w-full p-5 space-y-10 py-10">
        
        {/* National Overview (Direction View) */}
        <section className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="font-display font-bold text-lg">KONEKT NATIONAL</h2>
            <Badge className="bg-primary/10 text-primary border-primary/20">Rapport Août 2026</Badge>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <StatCard label="Membres" value="8,742" icon={Users} color="text-cyan" />
            <StatCard label="Activité" value="78%" icon={TrendingUp} color="text-orange" />
          </div>

          <Card className="glass-card p-6 rounded-[2.5rem] border-primary/20 bg-gradient-to-br from-primary/5 to-transparent space-y-6">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-[10px] font-mono text-muted uppercase tracking-widest mb-1">Total Adhésions</p>
                <p className="text-3xl font-display font-bold text-primary">87,420 $</p>
              </div>
              <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary">
                <DollarSign className="w-6 h-6" />
              </div>
            </div>
            
            <div className="space-y-3">
              <p className="text-[10px] font-mono text-muted uppercase tracking-widest">Répartition des dépenses</p>
              <FinanceLine label="Services Membres (40%)" value="34,968 $" color="bg-cyan" percentage={40} />
              <FinanceLine label="Projets & Incubation (30%)" value="26,226 $" color="bg-orange" percentage={30} />
              <FinanceLine label="Technologie (20%)" value="17,484 $" color="bg-gold" percentage={20} />
              <FinanceLine label="Réserve (10%)" value="8,742 $" color="bg-primary" percentage={10} />
            </div>
          </Card>
        </section>

        {/* Official Announcements */}
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-mono text-[10px] uppercase tracking-widest text-muted">Annonces Officielles</h3>
            <button className="text-[10px] font-bold text-cyan">VOIR ARCHIVES</button>
          </div>
          
          <div className="space-y-4">
            <AnnouncementItem 
              title="Audit financier T3 disponible" 
              date="Hier · National" 
              type="RAPPORT"
            />
            <AnnouncementItem 
              title="Nouvelle procédure de leadership" 
              date="20 Août · Programmes" 
              type="INFO"
            />
          </div>
        </section>

        {/* Governance Vision */}
        <div className="glass-card p-6 rounded-[2.5rem] border-border text-center space-y-4">
          <Info className="w-6 h-6 text-muted mx-auto" />
          <p className="text-sm text-muted italic leading-relaxed">
            « La confiance est notre actif le plus précieux. Chaque cotisation est un investissement dans le futur de notre génération. »
          </p>
        </div>
      </main>
      <BottomNav />
    </div>
  );
}

function StatCard({ label, value, icon: Icon, color }: any) {
  return (
    <div className="glass-card p-5 rounded-[2rem] space-y-3 border-border/50">
      <div className={`w-9 h-9 rounded-xl bg-surface-3 flex items-center justify-center ${color}`}>
        <Icon className="w-5 h-5" />
      </div>
      <div>
        <p className="text-xl font-display font-bold">{value}</p>
        <p className="text-[10px] text-muted uppercase font-mono">{label}</p>
      </div>
    </div>
  );
}

function FinanceLine({ label, value, color, percentage }: any) {
  return (
    <div className="space-y-1.5">
      <div className="flex justify-between text-[11px] font-bold">
        <span>{label}</span>
        <span>{value}</span>
      </div>
      <div className="h-1.5 w-full bg-surface-3 rounded-full overflow-hidden">
        <div className={`h-full ${color}`} style={{ width: `${percentage}%` }} />
      </div>
    </div>
  );
}

function AnnouncementItem({ title, date, type }: any) {
  return (
    <button className="w-full flex items-center justify-between p-5 glass-card rounded-2xl border-border/40 hover:border-cyan/30 transition-all text-left group">
      <div className="flex items-center gap-4">
        <div className="w-10 h-10 rounded-xl bg-surface-3 flex items-center justify-center text-muted group-hover:text-cyan transition-colors">
          <ShieldCheck className="w-5 h-5" />
        </div>
        <div>
          <span className="block text-sm font-bold">{title}</span>
          <span className="block text-[10px] text-muted font-medium">{date}</span>
        </div>
      </div>
      <Badge variant="outline" className="text-[9px] font-mono border-border text-muted group-hover:border-cyan group-hover:text-cyan">{type}</Badge>
    </button>
  );
}
