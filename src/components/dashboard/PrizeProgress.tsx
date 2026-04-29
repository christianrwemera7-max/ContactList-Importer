"use client"

import { Progress } from "@/components/ui/progress"
import { Card, CardContent } from "@/components/ui/card"
import { Trophy, Coins, CheckCircle2 } from "lucide-react"
import { useCompetition } from "@/lib/store"
import { PRIZE_POOL_TOTAL } from "@/lib/constants"

export function PrizeProgress() {
  const { state } = useCompetition()
  const distributed = state.distributedPrize;
  const percentage = (distributed / PRIZE_POOL_TOTAL) * 100;

  return (
    <Card className="bg-secondary/30 glass border-none overflow-hidden prize-glow">
      <CardContent className="p-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 mb-8">
          <div className="flex items-center gap-5">
            <div className="p-4 bg-accent rounded-3xl shadow-lg shadow-accent/20">
              <Coins className="w-8 h-8 text-accent-foreground" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground uppercase tracking-[0.2em] font-black">Cagnotte Totale</p>
              <h2 className="text-5xl font-headline font-black text-accent tracking-tighter">1,000$</h2>
            </div>
          </div>
          <div className="flex-1 w-full max-w-md">
            <div className="flex justify-between text-xs font-black mb-3 uppercase tracking-wider">
              <span className="text-muted-foreground">Distribué</span>
              <span className="text-accent">{distributed}$ / {PRIZE_POOL_TOTAL}$</span>
            </div>
            <Progress value={percentage} className="h-4 bg-white/10" />
          </div>
          <div className="text-center md:text-right">
             <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10">
                <CheckCircle2 className={`w-4 h-4 ${percentage === 100 ? 'text-primary' : 'text-muted-foreground'}`} />
                <span className="text-xs font-bold">{percentage === 100 ? 'Compétition Terminée' : 'Phase Actuelle: ' + state.currentPhase}</span>
             </div>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <PrizeCard label="Champion" amount="500$" sub="🏆 Trophée" color="text-accent" />
          <PrizeCard label="Finaliste" amount="200$" sub="🥈 Argent" color="text-slate-300" />
          <PrizeCard label="3ème Place" amount="100$" sub="🥉 Bronze" color="text-orange-400" />
          <PrizeCard label="Individuels" amount="200$" sub="✨ 5 Prix" color="text-primary" />
        </div>
      </CardContent>
    </Card>
  )
}

function PrizeCard({ label, amount, sub, color }: { label: string, amount: string, sub: string, color: string }) {
  return (
    <div className="p-4 rounded-2xl bg-white/5 border border-white/5 hover:bg-white/10 transition-all group">
      <p className="text-[10px] text-muted-foreground uppercase font-black tracking-widest mb-1">{label}</p>
      <p className={`text-2xl font-black ${color} group-hover:scale-110 transition-transform origin-left`}>{amount}</p>
      <p className="text-[10px] text-muted-foreground mt-1">{sub}</p>
    </div>
  )
}
