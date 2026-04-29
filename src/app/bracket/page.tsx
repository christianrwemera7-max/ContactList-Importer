
"use client"

import { AppSidebar } from "@/components/layout/AppSidebar"
import { CompetitionProvider, useCompetition } from "@/lib/store"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { DollarSign, Trophy } from "lucide-react"
import { Button } from "@/components/ui/button"

function BracketMatch({ slot, title, prize }: { slot: string, title: string, prize: string }) {
  const { state } = useCompetition()
  const match = state.matches.find(m => m.knockoutSlot === slot)
  const homeTeam = state.teams.find(t => t.id === match?.homeTeamId)
  const awayTeam = state.teams.find(t => t.id === match?.awayTeamId)

  return (
    <div className="w-full max-w-[280px] space-y-2 relative">
      <div className="flex items-center justify-between px-2">
        <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">{title}</span>
        <Badge variant="outline" className="text-[10px] border-primary/20 text-primary bg-primary/5">
          {prize}
        </Badge>
      </div>
      <Card className="bg-secondary/20 glass border-white/5 overflow-hidden">
        <CardContent className="p-0">
          <div className="flex flex-col">
            <div className={`p-3 flex items-center justify-between border-b border-white/5 ${match?.played && (match.homeScore || 0) > (match.awayScore || 0) ? 'bg-primary/10' : ''}`}>
              <div className="flex items-center gap-2">
                <div className="w-1 h-1 rounded-full bg-primary" />
                <span className={`text-sm font-bold truncate ${!homeTeam ? 'text-muted-foreground italic' : 'text-white'}`}>
                  {homeTeam?.teamName || 'À déterminer'}
                </span>
              </div>
              <span className="text-lg font-black">{match?.homeScore ?? '-'}</span>
            </div>
            <div className={`p-3 flex items-center justify-between ${match?.played && (match.awayScore || 0) > (match.homeScore || 0) ? 'bg-primary/10' : ''}`}>
              <div className="flex items-center gap-2">
                <div className="w-1 h-1 rounded-full bg-primary" />
                <span className={`text-sm font-bold truncate ${!awayTeam ? 'text-muted-foreground italic' : 'text-white'}`}>
                  {awayTeam?.teamName || 'À déterminer'}
                </span>
              </div>
              <span className="text-lg font-black">{match?.awayScore ?? '-'}</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default function BracketPage() {
  return (
    <CompetitionProvider>
      <div className="flex min-h-screen">
        <AppSidebar />
        <main className="flex-1 md:ml-64 p-4 md:p-8">
          <div className="max-w-6xl mx-auto space-y-12">
            <header className="flex justify-between items-end">
              <div>
                <h1 className="text-4xl font-headline font-bold text-white tracking-tight">
                  Phase <span className="text-primary">Finale</span>
                </h1>
                <p className="text-muted-foreground mt-2">Arbre d'élimination directe avec enjeux de la cagnotte.</p>
              </div>
              <KnockoutAction />
            </header>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 items-center min-h-[600px]">
              {/* Quarts */}
              <div className="space-y-12">
                <BracketMatch slot="Q1" title="Quart 1" prize="500$ en jeu" />
                <BracketMatch slot="Q2" title="Quart 2" prize="500$ en jeu" />
                <BracketMatch slot="Q3" title="Quart 3" prize="500$ en jeu" />
                <BracketMatch slot="Q4" title="Quart 4" prize="500$ en jeu" />
              </div>

              {/* Demis */}
              <div className="space-y-24">
                <BracketMatch slot="S1" title="Demi 1" prize="200$ sécurisés" />
                <BracketMatch slot="S2" title="Demi 2" prize="200$ sécurisés" />
              </div>

              {/* Finale & 3rd Place */}
              <div className="space-y-12">
                <div className="p-6 rounded-3xl bg-gradient-to-br from-accent/20 to-transparent border border-accent/20">
                  <BracketMatch slot="F" title="Grande Finale" prize="500$ Gagnant" />
                </div>
                <div className="p-6 rounded-3xl bg-white/5 border border-white/5">
                  <BracketMatch slot="P" title="Petite Finale" prize="100$ Gagnant" />
                </div>
              </div>

              {/* Champion Spot */}
              <div className="flex flex-col items-center justify-center space-y-4">
                <div className="w-32 h-32 rounded-full bg-accent/20 flex items-center justify-center border-4 border-accent prize-glow animate-pulse">
                  <Trophy className="w-16 h-16 text-accent" />
                </div>
                <div className="text-center">
                  <p className="text-accent font-black text-xl">CHAMPION</p>
                  <p className="text-3xl font-headline font-black">500$</p>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </CompetitionProvider>
  )
}

function KnockoutAction() {
  const { state, advanceToKnockout } = useCompetition()
  const isKnockoutVisible = state.matches.some(m => m.type === 'knockout')
  const allGroupsPlayed = state.matches.filter(m => m.type === 'group').every(m => m.played)

  if (isKnockoutVisible) return null
  
  return (
    <Button 
      disabled={!allGroupsPlayed} 
      onClick={advanceToKnockout}
      className="bg-primary hover:bg-primary/90 text-white font-bold px-8"
    >
      Générer la Phase Finale
    </Button>
  )
}
