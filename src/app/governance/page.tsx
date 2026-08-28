
'use client';

import { AppSidebar } from "@/components/layout/AppSidebar";
import { BottomNav } from "@/components/layout/BottomNav";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { ShieldCheck, TrendingUp, PieChart, Info, ArrowUpRight, DollarSign, Users, History, Lock } from "lucide-react";

export default function GovernancePage() {
  return (
    <div className="flex flex-col min-h-screen pb-24 md:pb-0 connected-nodes">
      <AppSidebar />
      <header className="px-5 py-6 border-b border-border/50 sticky top-0 bg-ink/80 backdrop-blur-md z-40">
        <h1 className="font-display font-bold text-xl tracking-tight">Gouvernance & Finance</h1>
        <p className="text-[10px] font-mono text-muted uppercase tracking-widest mt-1">Transparence et confiance</p>
      </header>

      <main className="flex-1 max-w-2xl mx-auto w-full p-5 space-y-10 py-10">
        
        {/* National Overview */}
        <section className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="font-display font-bold text-lg">KONEKT NATIONAL</h2>
            <Badge className="bg-primary/10 text-primary border-primary/20 font-mono">RAPPORT AOÛT 2026</Badge>
          </div>

          <Card className="glass-card p-6 rounded-[2.5rem] border-primary/20 bg-gradient-to-br from-primary/5 to-transparent space-y-6">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-[10px] font-mono text-muted uppercase tracking-widest mb-1 font-bold">Total Adhésions</p>
                <p className="text-4xl font-display font-bold text-primary">87,420 $</p>
              </div>
              <div className="w-14 h-14 rounded-[1.5rem] bg-primary/10 flex items-center justify-center text-primary border border-primary/20">
                <DollarSign className="w-7 h-7" />
              </div>
            </div>
            
            <div className="space-y-4">
              <p className="text-[10px] font-mono text-muted uppercase tracking-widest font-bold">Répartition stratégique</p>
              <FinanceLine label="Services Membres (40%)" value="34,968 $" color="bg-cyan" percentage={40} />
              <FinanceLine label="Projets & Incubation (30%)" value="26,226 $" color="bg-orange" percentage={30} />
              <FinanceLine label="Technologie (20%)" value="17,484 $" color="bg-gold" percentage={20} />
              <FinanceLine label="Réserve (10%)" value="8,742 $" color="bg-primary" percentage={10} />
            </div>
          </Card>
        </section>

        {/* Audit Log (Rule #7 & #22) */}
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-mono text-[10px] uppercase tracking-widest text-muted font-bold">Journal d'Audit (Actions Critiques)</h3>
            <History className="w-4 h-4 text-muted" />
          </div>
          
          <div className="space-y-3">
            <AuditItem 
              actor="Admin National" 
              action="Publication Rapport Financier T3" 
              time="Aujourd'hui · 09:15"
              scope="National"
            />
            <AuditItem 
              actor="Coordinateur Zone #07" 
              action="Promotion : Leader Cellule #034" 
              time="Hier · 14:20"
              scope="Zone"
            />
            <AuditItem 
              actor="Système KONEKT" 
              action="Suspension membre (Défaut paiement)" 
              time="25 Août · 00:00"
              scope="Automatique"
            />
          </div>
        </section>

        {/* Security & Access (Rule #16) */}
        <section className="glass-card p-6 rounded-[2.5rem] border-gold/20 flex items-start gap-4">
          <div className="w-10 h-10 rounded-xl bg-gold/10 flex items-center justify-center text-gold flex-shrink-0">
            <Lock className="w-5 h-5" />
          </div>
          <div>
            <h4 className="text-sm font-bold text-gold mb-1">Multi-contrôle Financier</h4>
            <p className="text-[11px] text-muted leading-relaxed">
              Toute dépense > 500$ nécessite une triple validation : Demandeur → Validateur → Trésorerie. 
              Aucune personne seule ne peut modifier les flux financiers de l'organisation.
            </p>
          </div>
        </section>
      </main>
      <BottomNav />
    </div>
  );
}

function FinanceLine({ label, value, color, percentage }: any) {
  return (
    <div className="space-y-1.5">
      <div className="flex justify-between text-[11px] font-bold">
        <span className="text-text">{label}</span>
        <span className="text-primary font-mono">{value}</span>
      </div>
      <div className="h-1.5 w-full bg-surface-3 rounded-full overflow-hidden">
        <div className={`h-full ${color} transition-all duration-1000`} style={{ width: `${percentage}%` }} />
      </div>
    </div>
  );
}

function AuditItem({ actor, action, time, scope }: any) {
  return (
    <div className="p-4 glass-card rounded-2xl border-border/40 space-y-2">
      <div className="flex justify-between items-start">
        <span className="text-xs font-bold text-text">{action}</span>
        <Badge variant="outline" className="text-[8px] font-mono border-border text-muted uppercase">{scope}</Badge>
      </div>
      <div className="flex justify-between items-center text-[10px] text-muted-2">
        <span className="flex items-center gap-1"><Users className="w-3 h-3" /> {actor}</span>
        <span className="font-mono">{time}</span>
      </div>
    </div>
  );
}
