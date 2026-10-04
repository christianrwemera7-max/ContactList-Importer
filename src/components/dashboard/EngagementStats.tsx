
"use client"

import { Progress } from "@/components/ui/progress"
import { Card, CardContent } from "@/components/ui/card"
import { TrendingUp, Zap, Target, Users } from "lucide-react"
import { useApp } from "@/lib/store"

/**
 * @fileOverview Indicateur d'engagement central pour NEOSTUD.
 */

export function EngagementStats() {
  const { state } = useApp();
  // On utilise 0 par défaut si le score n'est pas encore implémenté ou nul
  const score = (state.profile as any)?.score || 0;
  const target = 1000;
  const percentage = Math.min((score / target) * 100, 100);

  return (
    <Card className="bg-white border-none shadow-sm overflow-hidden group">
      <CardContent className="p-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 mb-8">
          <div className="flex items-center gap-5">
            <div className="p-4 bg-primary/10 rounded-3xl border border-primary/20 group-hover:scale-105 transition-transform">
              <Zap className="w-8 h-8 text-primary" />
            </div>
            <div>
              <p className="text-[10px] text-muted-foreground uppercase tracking-widest font-black">Engagement Global</p>
              <h2 className="text-4xl font-display font-black text-foreground tracking-tighter">
                {score}<span className="text-primary text-xl ml-1">pts</span>
              </h2>
            </div>
          </div>
          <div className="flex-1 w-full max-w-md">
            <div className="flex justify-between text-[10px] font-black mb-2 uppercase tracking-wider">
              <span className="text-muted-foreground">Vers : Prochaine Étape</span>
              <span className="text-primary">{score} / {target}</span>
            </div>
            <Progress value={percentage} className="h-3 bg-muted" indicatorClassName="bg-primary" />
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <MetricCard label="Étude" value="LVL 1" sub="Niveau" color="text-orange" icon={Target} />
          <MetricCard label="Impact" value={`+${score}`} sub="Points" color="text-blue-500" icon={TrendingUp} />
          <MetricCard label="Réseau" value="--" sub="Membres" color="text-yellow-500" icon={Users} />
          <MetricCard label="Progression" value={`${percentage}%`} sub="Objectif" color="text-primary" icon={Zap} />
        </div>
      </CardContent>
    </Card>
  )
}

function MetricCard({ label, value, sub, color, icon: Icon }: any) {
  return (
    <div className="p-4 rounded-2xl bg-muted/50 border border-border/50 hover:border-primary/30 transition-all group cursor-default">
      <div className="flex items-center justify-between mb-2">
        <p className="text-[9px] text-muted-foreground uppercase font-black tracking-widest">{label}</p>
        <Icon className={`w-3 h-3 ${color} opacity-50`} />
      </div>
      <p className={`text-xl font-black ${color} group-hover:scale-110 transition-transform origin-left`}>{value}</p>
      <p className="text-[9px] text-muted-foreground mt-1">{sub}</p>
    </div>
  )
}
