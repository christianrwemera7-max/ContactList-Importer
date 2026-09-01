'use client';

import { AppSidebar } from "@/components/layout/AppSidebar";
import { BottomNav } from "@/components/layout/BottomNav";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { 
  ShieldCheck, 
  History, 
  Lock, 
  DollarSign, 
  Users, 
  LayoutDashboard, 
  FileText,
  AlertTriangle
} from "lucide-react";
import { hasPermission } from "@/lib/permissions";
import { PERMISSIONS, ROLES } from "@/lib/constants";

// Mock user context - In real app, this comes from useUser()
const mockUser = {
  uid: "123",
  role: ROLES.NATIONAL as any,
  tier: "PRO" as any,
  status: "active",
  scopeId: "national-01"
};

export default function GovernancePage() {
  const canViewFinance = hasPermission(mockUser, PERMISSIONS.FINANCE_VIEW);
  const canViewAudit = hasPermission(mockUser, PERMISSIONS.AUDIT_VIEW);
  const isNational = mockUser.role === ROLES.NATIONAL;

  return (
    <div className="flex flex-col min-h-screen pb-24 md:pb-0 connected-nodes bg-ink">
      <AppSidebar />
      <header className="px-5 py-6 border-b border-border/50 sticky top-0 bg-ink/80 backdrop-blur-md z-40">
        <h1 className="font-display font-bold text-xl tracking-tight">Gouvernance & Transparence</h1>
        <p className="text-[10px] font-mono text-muted uppercase tracking-widest mt-1">
          {isNational ? "Console Direction Nationale" : "Espace de Transparence Membre"}
        </p>
      </header>

      <main className="flex-1 max-w-2xl mx-auto w-full p-5 space-y-10 py-10">
        
        {/* Financial Transparency - Rule #16 & #20 */}
        {canViewFinance && (
          <section className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="font-display font-bold text-lg">Statut Financier</h2>
              <Badge className="bg-primary/10 text-primary border-primary/20 font-mono text-[9px]">RAPPORTS T3 2026</Badge>
            </div>

            <Card className="glass-card p-6 rounded-[2.5rem] border-primary/20 bg-gradient-to-br from-primary/5 to-transparent space-y-6">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-[10px] font-mono text-muted-2 uppercase tracking-widest mb-1 font-bold">Total Cotisations</p>
                  <p className="text-4xl font-display font-bold text-primary">87,420 $</p>
                </div>
                <div className="w-14 h-14 rounded-[1.5rem] bg-primary/10 flex items-center justify-center text-primary border border-primary/20">
                  <DollarSign className="w-7 h-7" />
                </div>
              </div>
              
              <div className="space-y-4">
                <p className="text-[10px] font-mono text-muted-2 uppercase tracking-widest font-bold">Répartition Réelle</p>
                <FinanceLine label="Academy & Formations" value="34,968 $" color="bg-cyan" percentage={40} />
                <FinanceLine label="Projets & Incubation" value="26,226 $" color="bg-orange" percentage={30} />
                <FinanceLine label="Technologie & Plateforme" value="17,484 $" color="bg-gold" percentage={20} />
                <FinanceLine label="Réserve KONEKT" value="8,742 $" color="bg-primary" percentage={10} />
              </div>
            </Card>
          </section>
        )}

        {/* Audit Log - Rule #7 & #22 */}
        {canViewAudit && (
          <section className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-mono text-[10px] uppercase tracking-widest text-muted-2 font-bold">Journal d'Audit des Actions</h3>
              <History className="w-4 h-4 text-muted-2" />
            </div>
            
            <div className="space-y-3">
              <AuditItem 
                actor="Directeur Programme" 
                action="Approbation du projet 'AgroTech RDC'" 
                time="Il y a 2h"
                scope="National"
                type="project"
              />
              <AuditItem 
                actor="Admin Finance" 
                action="Déblocage budget Academy T4" 
                time="Ce matin · 09:15"
                scope="Finance"
                type="finance"
              />
              <AuditItem 
                actor="Coordinateur Zone #07" 
                action="Nomination Leader Cellule #032" 
                time="Hier · 14:20"
                scope="Zone"
                type="role"
              />
            </div>
          </section>
        )}

        {/* Governance Guidelines - Rule #16 & #21 */}
        <section className="glass-card p-6 rounded-[2.5rem] border-gold/20 flex items-start gap-4">
          <div className="w-10 h-10 rounded-xl bg-gold/10 flex items-center justify-center text-gold flex-shrink-0">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <div className="space-y-2">
            <h4 className="text-sm font-bold text-gold">Constitution Numérique</h4>
            <p className="text-[11px] text-muted leading-relaxed">
              Toute action de gouvernance dans KONEKT est régie par la règle de séparation des pouvoirs (RBAC+SCOPE). 
              Aucune personne seule ne peut modifier les flux financiers ou les structures organisationnelles.
            </p>
          </div>
        </section>

        {/* National Admin Tools - Rule #23 */}
        {isNational && (
          <section className="grid grid-cols-2 gap-4">
            <AdminActionCard icon={LayoutDashboard} label="Paramètres Système" count="TECH" />
            <AdminActionCard icon={FileText} label="Rapports Nationaux" count="DATA" />
          </section>
        )}
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
      <div className="h-1 w-full bg-surface-3 rounded-full overflow-hidden">
        <div className={`h-full ${color} transition-all duration-1000`} style={{ width: `${percentage}%` }} />
      </div>
    </div>
  );
}

function AuditItem({ actor, action, time, scope, type }: any) {
  return (
    <div className="p-4 glass-card rounded-2xl border-border/40 space-y-2 hover:border-cyan/30 transition-all cursor-default">
      <div className="flex justify-between items-start">
        <span className="text-xs font-bold text-text leading-tight">{action}</span>
        <Badge variant="outline" className="text-[8px] font-mono border-border text-muted-2 uppercase">{scope}</Badge>
      </div>
      <div className="flex justify-between items-center text-[10px] text-muted-2">
        <span className="flex items-center gap-1.5"><Users className="w-3 h-3" /> {actor}</span>
        <span className="font-mono">{time}</span>
      </div>
    </div>
  );
}

function AdminActionCard({ icon: Icon, label, count }: any) {
  return (
    <div className="glass-card p-5 rounded-[2rem] border-white/5 hover:border-cyan/30 transition-all cursor-pointer group">
      <div className="w-10 h-10 rounded-xl bg-surface-3 flex items-center justify-center text-muted-2 group-hover:text-cyan mb-3 transition-colors">
        <Icon className="w-5 h-5" />
      </div>
      <p className="font-display font-bold text-xs text-text">{label}</p>
      <p className="text-[9px] text-muted-2 font-mono mt-1 uppercase">{count} MODULE</p>
    </div>
  );
}