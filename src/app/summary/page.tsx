"use client"

import { AppSidebar } from "@/components/layout/AppSidebar"
import { CompetitionProvider, useCompetition } from "@/lib/store"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Trophy, Printer, Download, Sparkles, Coins, Star, Shield, Goal, PartyPopper } from "lucide-react"
import { useEffect, useState } from "react"

function SummaryContent() {
  const { state, resetCompetition, finishTournament } = useCompetition()
  const [showConfetti, setShowConfetti] = useState(false)

  // Determine winners from state
  const getTeamById = (id: string) => state.teams.find(t => t.id === id)
  
  const finalMatch = state.matches.find(m => m.knockoutSlot === 'F')
  const champion = finalMatch?.played ? getTeamById(finalMatch.homeScore! > finalMatch.awayScore! ? finalMatch.homeTeamId : finalMatch.awayTeamId) : null
  const finalist = finalMatch?.played ? getTeamById(finalMatch.homeScore! > finalMatch.awayScore! ? finalMatch.awayTeamId : finalMatch.homeTeamId) : null
  
  const thirdMatch = state.matches.find(m => m.knockoutSlot === 'P')
  const thirdPlace = thirdMatch?.played ? getTeamById(thirdMatch.homeScore! > thirdMatch.awayScore! ? thirdMatch.homeTeamId : thirdMatch.awayTeamId) : null

  const topScorer = [...state.players].sort((a, b) => b.goals - a.goals)[0]
  const topPasser = [...state.players].sort((a, b) => b.assists - a.assists)[0]
  const bestDefense = [...state.teams].sort((a, b) => a.goalsAgainst - b.goalsAgainst)[0]
  const mvp = [...state.players].sort((a, b) => b.rating - a.rating)[0]

  const handleCelebrate = () => {
    setShowConfetti(true)
    setTimeout(() => setShowConfetti(false), 5000)
    finishTournament()
  }

  return (
    <div className="max-w-4xl mx-auto space-y-10">
      <header className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
        <div>
          <h1 className="text-5xl font-headline font-black text-white tracking-tighter">
            Bilan <span className="text-primary">Final</span>
          </h1>
          <p className="text-muted-foreground mt-2">Récapitulatif officiel de l'édition ONE CUP 2026.</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" className="rounded-2xl border-white/10 bg-white/5">
            <Printer className="w-4 h-4 mr-2" /> Imprimer
          </Button>
          <Button className="bg-primary hover:bg-primary/90 rounded-2xl">
            <Download className="w-4 h-4 mr-2" /> Rapport PDF
          </Button>
        </div>
      </header>

      <Card className="bg-secondary/10 glass border-2 border-primary/20 rounded-[2.5rem] overflow-hidden relative shadow-2xl shadow-primary/5">
        <div className="absolute top-0 right-0 p-12 opacity-5 pointer-events-none">
          <Trophy className="w-64 h-64 text-primary" />
        </div>
        
        <CardHeader className="text-center pt-16 pb-8 border-b border-white/5 bg-white/5">
          <Badge className="mx-auto mb-6 bg-accent text-accent-foreground px-6 py-1.5 text-xs font-black tracking-widest uppercase rounded-full prize-glow">
            Rapport de Cagnotte : 1,000$
          </Badge>
          <CardTitle className="text-5xl font-headline font-black text-white tracking-tighter">ONE CUP KINSHASA 2026</CardTitle>
          <p className="text-muted-foreground uppercase tracking-[0.3em] text-[10px] mt-4 font-black">République Démocratique du Congo</p>
        </CardHeader>

        <CardContent className="p-10 space-y-14">
          {/* Main Podium */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center relative">
            <PodiumItem 
              rank="CHAMPION" 
              amount="500$" 
              teamName={champion?.teamName || "À venir"} 
              color="text-accent" 
              icon={Trophy} 
              iconBg="bg-accent" 
              iconColor="text-accent-foreground"
            />
            <PodiumItem 
              rank="FINALISTE" 
              amount="200$" 
              teamName={finalist?.teamName || "À venir"} 
              color="text-slate-300" 
              icon={Star} 
              iconBg="bg-slate-300" 
              iconColor="text-slate-900"
            />
            <PodiumItem 
              rank="3ÈME PLACE" 
              amount="100$" 
              teamName={thirdPlace?.teamName || "À venir"} 
              color="text-orange-400" 
              icon={Coins} 
              iconBg="bg-orange-400" 
              iconColor="text-white"
            />
          </div>

          {/* Individual Awards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <AwardRow label="Meilleur Buteur (80$)" value={`${topScorer.name} (${topScorer.goals} buts)`} icon={Goal} />
            <AwardRow label="Meilleur Passeur (50$)" value={`${topPasser.name} (${topPasser.assists} passes)`} icon={Sparkles} />
            <AwardRow label="Meilleure Défense (40$)" value={`${bestDefense.teamName} (${bestDefense.goalsAgainst} encaissés)`} icon={Shield} />
            <AwardRow label="MVP du Tournoi (30$)" value={`${mvp.name} (Note ${mvp.rating})`} icon={PartyPopper} />
          </div>

          {/* Final Totals */}
          <div className="pt-10 border-t border-white/10 flex flex-col items-center">
            <div className="bg-primary/10 px-12 py-6 rounded-[2rem] border border-primary/30 text-center mb-8 shadow-inner">
              <p className="text-[10px] text-primary uppercase font-black tracking-widest mb-1">Total Distribué</p>
              <p className="text-6xl font-headline font-black text-white tracking-tighter">1,000 $</p>
            </div>
            <div className="flex flex-wrap justify-center gap-4">
              <Button onClick={handleCelebrate} className="rounded-full bg-accent hover:bg-accent/80 text-accent-foreground font-black px-8 py-6 h-auto text-lg shadow-lg shadow-accent/20">
                Fêter la Victoire 🎉
              </Button>
              <Button variant="ghost" onClick={resetCompetition} className="rounded-full text-muted-foreground hover:text-destructive hover:bg-destructive/10 px-8">
                Réinitialiser la Saison
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
      
      {showConfetti && (
        <div className="fixed inset-0 flex items-center justify-center pointer-events-none z-50">
          <p className="text-4xl font-black text-accent animate-bounce">FÉLICITATIONS ! 🏆</p>
        </div>
      )}
    </div>
  )
}

function PodiumItem({ rank, amount, teamName, color, icon: Icon, iconBg, iconColor }: any) {
  return (
    <div className="space-y-4 p-8 rounded-[2rem] bg-white/5 border border-white/5 relative group hover:bg-white/10 transition-all hover:scale-105">
      <div className={`absolute -top-5 left-1/2 -translate-x-1/2 w-12 h-12 ${iconBg} rounded-2xl flex items-center justify-center ${iconColor} shadow-xl group-hover:rotate-12 transition-transform`}>
        <Icon className="w-6 h-6" />
      </div>
      <p className="text-[10px] text-muted-foreground uppercase font-black tracking-[0.2em]">{rank} ({amount})</p>
      <p className={`text-3xl font-headline font-black ${color} tracking-tight`}>{teamName}</p>
    </div>
  )
}

function AwardRow({ label, value, icon: Icon }: any) {
  return (
    <div className="flex items-center gap-5 p-5 rounded-2xl bg-white/5 border border-white/5 hover:border-white/10 transition-colors">
      <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
        <Icon className="w-7 h-7" />
      </div>
      <div>
        <p className="text-[10px] text-muted-foreground uppercase font-black tracking-widest mb-1">{label}</p>
        <p className="font-bold text-white text-lg tracking-tight">{value}</p>
      </div>
    </div>
  )
}

export default function SummaryPage() {
  return (
    <CompetitionProvider>
      <div className="flex min-h-screen bg-[#0E1210]">
        <AppSidebar />
        <main className="flex-1 md:ml-64 p-6 md:p-12">
          <SummaryContent />
        </main>
      </div>
    </CompetitionProvider>
  )
}
