
"use client"

import { Progress } from "@/components/ui/progress"
import { Card, CardContent } from "@/components/ui/card"
import { TrendingUp, Zap, Target, Users } from "lucide-react"
import { useKonekt } from "@/lib/store"

/**
 * @fileOverview Indicateur d'engagement central pour KONEKT.
 */

export function EngagementStats() {
  const { state } = useKonekt();
  const score = state.currentUser?.score || 0;
  const target = 1000;
  const percentage = (score / target) * 100;

  return (
    <Card className="glass-card border-cyan/20 overflow-hidden group">
      <CardContent className="p-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 mb-8">
          <div className="flex items-center gap-5">
            <div className="p-4 bg-cyan/10 rounded-3xl border border-cyan/20 group-hover:scale-105 transition-transform">
              <Zap className="w-8 h-8 text-cyan" />
            </div>
            <div>
              <p className="text-[10px] text-muted-2 uppercase tracking-widest font-black">Engagement Global</p>
              <h2 className="text-4xl font-display font-black text-text tracking-tighter">
                {score}<span className="text-cyan text-xl ml-1">pts</span>
              </h2>
            </div>
          </div>
          <div className="flex-1 w-full max-w-md">
            <div className="flex justify-between text-[10px] font-black mb-2 uppercase tracking-wider">
              <span className="text-muted-2">Vers : Contributeur</span>
              <span className="text-cyan">{score} / {target}</span>
            </div>
            <Progress value={percentage} className="h-3 bg-surface-3" indicatorClassName="bg-cyan" />
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <MetricCard label="Academy" value="12" sub="Modules" color="text-orange" icon={Target} />
          <MetricCard label="Impact" value="+150" sub="Points" color="text-cyan" icon={TrendingUp} />
          <MetricCard label="Réseau" value="48" sub="Membres" color="text-gold" icon={Users} />
          <MetricCard label="Projets" value="3" sub="Actifs" color="text-primary" icon={Zap} />
        </div>
      </CardContent>
    </Card>
  )
}

function MetricCard({ label, value, sub, color, icon: Icon }: any) {
  return (
    <div className="p-4 rounded-2xl bg-surface-2 border border-border/50 hover:border-cyan/30 transition-all group cursor-default">
      <div className="flex items-center justify-between mb-2">
        <p className="text-[9px] text-muted-2 uppercase font-black tracking-widest">{label}</p>
        <Icon className={`w-3 h-3 ${color} opacity-50`} />
      </div>
      <p className={`text-xl font-black ${color} group-hover:scale-110 transition-transform origin-left`}>{value}</p>
      <p className="text-[9px] text-muted-2 mt-1">{sub}</p>
    </div>
  )
}
