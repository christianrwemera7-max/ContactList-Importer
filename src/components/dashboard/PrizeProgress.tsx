
"use client"

import { Progress } from "@/components/ui/progress"
import { Card, CardContent } from "@/components/ui/card"
import { TrendingUp, Zap, Target } from "lucide-react"
import { useKonekt } from "@/lib/store"

/**
 * @fileOverview Refonte de l'indicateur de progression pour KONEKT.
 * Remplace l'indicateur de cagnotte sportive par un indicateur d'engagement.
 */

export function PrizeProgress() {
  const { state } = useKonekt();
  const score = state.currentUser?.score || 0;
  const target = 1000;
  const percentage = (score / target) * 100;

  return (
    <Card className="bg-secondary/30 glass border-none overflow-hidden group">
      <CardContent className="p-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 mb-8">
          <div className="flex items-center gap-5">
            <div className="p-4 bg-primary/20 rounded-3xl shadow-lg shadow-primary/10 border border-primary/20 group-hover:scale-105 transition-transform">
              <Zap className="w-8 h-8 text-primary" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground uppercase tracking-[0.2em] font-black">Engagement Global</p>
              <h2 className="text-5xl font-headline font-black text-white tracking-tighter">
                {score}<span className="text-primary text-2xl ml-1">pts</span>
              </h2>
            </div>
          </div>
          <div className="flex-1 w-full max-w-md">
            <div className="flex justify-between text-xs font-black mb-3 uppercase tracking-wider">
              <span className="text-muted-foreground">Vers : Contributeur</span>
              <span className="text-primary">{score} / {target}</span>
            </div>
            <Progress value={percentage} className="h-4 bg-white/10" indicatorClassName="bg-primary" />
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
          <MetricCard label="Academy" value="12" sub="Modules" color="text-orange" icon={Target} />
          <MetricCard label="Impact" value="+150" sub="Points" color="text-cyan" icon={TrendingUp} />
          <MetricCard label="Réseau" value="48" sub="Membres" color="text-gold" icon={Zap} />
        </div>
      </CardContent>
    </Card>
  )
}

function MetricCard({ label, value, sub, color, icon: Icon }: any) {
  return (
    <div className="p-4 rounded-2xl bg-white/5 border border-white/5 hover:border-white/10 transition-all group cursor-default">
      <div className="flex items-center justify-between mb-2">
        <p className="text-[10px] text-muted-foreground uppercase font-black tracking-widest">{label}</p>
        <Icon className={`w-3 h-3 ${color} opacity-50`} />
      </div>
      <p className={`text-2xl font-black ${color} group-hover:scale-110 transition-transform origin-left`}>{value}</p>
      <p className="text-[10px] text-muted-foreground mt-1">{sub}</p>
    </div>
  )
}
