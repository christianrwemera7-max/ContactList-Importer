
"use client"

import { AppSidebar } from "@/components/layout/AppSidebar"
import { CompetitionProvider, useCompetition } from "@/lib/store"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Sparkles, Trophy, Goal, Award } from "lucide-react"
import { useState } from "react"
import { generatePlayerSummary } from "@/ai/flows/generate-player-summary"
import { toast } from "@/hooks/use-toast"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"

export default function PlayersPage() {
  const [selectedPlayer, setSelectedPlayer] = useState<any>(null)
  const [loadingAi, setLoadingAi] = useState(false)
  const [aiResult, setAiResult] = useState<any>(null)

  const handlePlayerAi = async (player: any, teamName: string) => {
    setLoadingAi(true)
    setSelectedPlayer(player)
    try {
      const result = await generatePlayerSummary({
        playerName: player.name,
        teamName: teamName,
        position: player.position,
        matchesPlayed: player.matchesPlayed,
        goals: player.goals,
        assists: player.assists,
        yellowCards: player.yellowCards,
        redCards: player.redCards,
        rating: player.rating,
        currentTournamentPhase: "Phase de poules",
        potentialPrize: player.goals > 5 ? "Meilleur Buteur" : "MVP du tournoi"
      })
      setAiResult(result)
    } catch (e) {
      toast({
        variant: 'destructive',
        title: "Erreur",
        description: "Impossible d'analyser le joueur."
      })
    } finally {
      setLoadingAi(false)
    }
  }

  return (
    <CompetitionProvider>
      <div className="flex min-h-screen">
        <AppSidebar />
        <main className="flex-1 md:ml-64 p-4 md:p-8">
          <div className="max-w-6xl mx-auto space-y-8">
            <header>
              <h1 className="text-4xl font-headline font-bold text-white tracking-tight">
                Top <span className="text-primary">Joueurs</span>
              </h1>
              <p className="text-muted-foreground mt-2">Statistiques individuelles et prix spéciaux en jeu.</p>
            </header>

            <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
              <div className="xl:col-span-2 space-y-4">
                <PlayerList onShowAi={handlePlayerAi} />
              </div>
              <div className="space-y-6">
                <Card className="bg-primary/10 glass border-primary/20">
                  <CardContent className="p-6">
                    <h3 className="text-xl font-headline font-bold text-white mb-4 flex items-center gap-2">
                      <Trophy className="w-5 h-5 text-accent" /> Prix Individuels
                    </h3>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center p-3 rounded-xl bg-white/5">
                        <span className="text-sm font-bold text-white">Meilleur Buteur</span>
                        <Badge className="bg-accent text-accent-foreground">80$</Badge>
                      </div>
                      <div className="flex justify-between items-center p-3 rounded-xl bg-white/5">
                        <span className="text-sm font-bold text-white">Meilleur Passeur</span>
                        <Badge className="bg-primary text-white">50$</Badge>
                      </div>
                      <div className="flex justify-between items-center p-3 rounded-xl bg-white/5">
                        <span className="text-sm font-bold text-white">MVP Tournoi</span>
                        <Badge className="bg-primary text-white">30$</Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </main>
      </div>

      <Dialog open={!!selectedPlayer} onOpenChange={(o) => { if(!o) setSelectedPlayer(null); setAiResult(null); }}>
        <DialogContent className="max-w-2xl bg-[#171D1A] border-white/5">
          <DialogHeader>
            <DialogTitle className="text-2xl font-headline font-bold flex items-center gap-3">
              <Avatar className="w-12 h-12">
                <AvatarFallback className="bg-primary/20 text-primary font-bold">
                  {selectedPlayer?.name.charAt(0)}
                </AvatarFallback>
              </Avatar>
              <div>
                <p>{selectedPlayer?.name}</p>
                <p className="text-xs text-muted-foreground font-normal">{selectedPlayer?.position}</p>
              </div>
            </DialogTitle>
          </DialogHeader>

          {loadingAi ? (
            <div className="py-12 flex flex-col items-center gap-4">
              <Sparkles className="w-12 h-12 text-primary animate-pulse" />
              <p className="text-sm text-muted-foreground">L'IA analyse les performances du joueur...</p>
            </div>
          ) : aiResult ? (
            <div className="space-y-6">
              <div className="p-4 rounded-2xl bg-primary/5 border border-primary/10">
                <h4 className="font-bold text-primary mb-2 flex items-center gap-2">
                  <Sparkles className="w-4 h-4" /> Analyse IA
                </h4>
                <p className="text-sm text-white leading-relaxed">{aiResult.summary}</p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 rounded-2xl bg-white/5">
                  <h4 className="text-[10px] uppercase font-bold text-muted-foreground mb-3">Points Forts</h4>
                  <ul className="space-y-2">
                    {aiResult.keyHighlights.map((h: string, i: number) => (
                      <li key={i} className="text-xs flex items-center gap-2">
                        <div className="w-1 h-1 rounded-full bg-primary" />
                        {h}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="p-4 rounded-2xl bg-white/5">
                  <h4 className="text-[10px] uppercase font-bold text-muted-foreground mb-3">Verdict Expert</h4>
                  <p className="text-xs italic text-muted-foreground">{aiResult.overallRatingComment}</p>
                </div>
              </div>
            </div>
          ) : null}
        </DialogContent>
      </Dialog>
    </CompetitionProvider>
  )
}

function PlayerList({ onShowAi }: { onShowAi: (p: any, t: string) => void }) {
  const { state } = useCompetition()

  return (
    <div className="space-y-4">
      {state.players.map((player) => {
        const team = state.teams.find(t => t.id === player.teamId)
        return (
          <Card key={player.id} className="bg-secondary/20 glass border-none overflow-hidden hover:bg-white/5 transition-colors group">
            <CardContent className="p-4 flex items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="text-2xl font-black text-muted-foreground/30 w-8">#1</div>
                <Avatar className="w-12 h-12 border-2 border-white/5">
                  <AvatarFallback className="bg-white/5 text-muted-foreground font-bold">
                    {player.name.charAt(0)}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h4 className="font-bold text-white">{player.name}</h4>
                  <p className="text-xs text-muted-foreground">{team?.teamName || 'Équipe'} • {player.position}</p>
                </div>
              </div>

              <div className="flex items-center gap-8">
                <div className="text-center">
                  <p className="text-[10px] text-muted-foreground uppercase">Buts</p>
                  <p className="text-lg font-black">{player.goals}</p>
                </div>
                <div className="text-center">
                  <p className="text-[10px] text-muted-foreground uppercase">Passes</p>
                  <p className="text-lg font-black">{player.assists}</p>
                </div>
                <div className="text-center hidden md:block">
                  <p className="text-[10px] text-muted-foreground uppercase">Note</p>
                  <p className="text-lg font-black text-primary">{player.rating}</p>
                </div>
                <div className="flex gap-2">
                  {player.badges.map(b => (
                    <Badge key={b} className="bg-primary/10 text-primary border-none text-[8px] font-black">{b}</Badge>
                  ))}
                </div>
                <Button 
                  size="sm" 
                  variant="secondary" 
                  className="bg-white/5 hover:bg-white/10"
                  onClick={() => onShowAi(player, team?.teamName || '')}
                >
                  <Sparkles className="w-4 h-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        )
      })}
    </div>
  )
}
