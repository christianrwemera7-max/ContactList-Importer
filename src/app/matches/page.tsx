
"use client"

import { AppSidebar } from "@/components/layout/AppSidebar"
import { CompetitionProvider, useCompetition } from "@/lib/store"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useState } from "react"
import { CheckCircle2, PencilLine, Wand2, Search } from "lucide-react"
import { generateMatchRecap } from "@/ai/flows/generate-match-recap"
import { toast } from "@/hooks/use-toast"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

function MatchList({ type }: { type: 'group' | 'knockout' }) {
  const { state, updateMatch } = useCompetition()
  const [editingId, setEditingId] = useState<string | null>(null)
  const [scores, setScores] = useState({ home: '', away: '' })
  const [generatingAiId, setGeneratingAiId] = useState<string | null>(null)
  const [filterGroup, setFilterGroup] = useState<string>('all')

  const handleUpdate = (id: string) => {
    const home = parseInt(scores.home)
    const away = parseInt(scores.away)
    if (!isNaN(home) && !isNaN(away)) {
      updateMatch(id, home, away)
      setEditingId(null)
      setScores({ home: '', away: '' })
    }
  }

  const handleAiRecap = async (match: any) => {
    setGeneratingAiId(match.id)
    try {
      const homeTeam = state.teams.find(t => t.id === match.homeTeamId)
      const awayTeam = state.teams.find(t => t.id === match.awayTeamId)
      
      const result = await generateMatchRecap({
        homeTeamName: homeTeam?.teamName || '',
        awayTeamName: awayTeam?.teamName || '',
        homeTeamScore: match.homeScore || 0,
        awayTeamScore: match.awayScore || 0,
        matchPhase: match.phase,
        groupName: match.group ? `Groupe ${match.group}` : undefined,
      })

      toast({
        title: result.title,
        description: result.summary,
      })
    } catch (e) {
      toast({
        variant: 'destructive',
        title: "Erreur IA",
        description: "Impossible de générer le résumé du match.",
      })
    } finally {
      setGeneratingAiId(null)
    }
  }

  const matches = state.matches
    .filter(m => m.type === type)
    .filter(m => filterGroup === 'all' || m.group === filterGroup)

  return (
    <div className="space-y-6">
      {type === 'group' && (
        <div className="flex items-center gap-4 bg-secondary/20 p-4 rounded-2xl glass">
          <span className="text-xs font-bold text-muted-foreground uppercase">Filtrer:</span>
          <Select value={filterGroup} onValueChange={setFilterGroup}>
            <SelectTrigger className="w-[180px] bg-white/5 border-white/10">
              <SelectValue placeholder="Tous les groupes" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Tous les groupes</SelectItem>
              <SelectItem value="A">Groupe A</SelectItem>
              <SelectItem value="B">Groupe B</SelectItem>
              <SelectItem value="C">Groupe C</SelectItem>
              <SelectItem value="D">Groupe D</SelectItem>
            </SelectContent>
          </Select>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {matches.map((match) => {
          const homeTeam = state.teams.find(t => t.id === match.homeTeamId)
          const awayTeam = state.teams.find(t => t.id === match.awayTeamId)
          const isEditing = editingId === match.id

          return (
            <Card key={match.id} className="bg-secondary/20 glass border-none group overflow-hidden">
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-4">
                  <Badge variant="outline" className="text-[10px] border-white/10 text-muted-foreground">
                    {match.phase} {match.group ? `• Groupe ${match.group}` : ''}
                  </Badge>
                  {match.played && !isEditing && (
                    <Badge className="bg-primary/20 text-primary border-none text-[10px] font-black">
                      TERMINÉ
                    </Badge>
                  )}
                </div>

                <div className="flex items-center justify-between gap-4 py-4 px-2">
                  <div className="flex-1 flex flex-col items-center">
                    <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-primary font-black mb-2">
                      {homeTeam?.teamName.charAt(0)}
                    </div>
                    <p className="font-bold text-sm text-center line-clamp-1">{homeTeam?.teamName || 'À déterminer'}</p>
                  </div>

                  <div className="flex flex-col items-center gap-1">
                    {isEditing ? (
                      <div className="flex items-center gap-2">
                        <Input 
                          className="w-12 h-10 text-center text-lg font-bold bg-white/5 border-white/10 p-0" 
                          value={scores.home}
                          onChange={(e) => setScores(s => ({ ...s, home: e.target.value }))}
                          placeholder="0"
                        />
                        <span className="font-bold text-muted-foreground">:</span>
                        <Input 
                          className="w-12 h-10 text-center text-lg font-bold bg-white/5 border-white/10 p-0"
                          value={scores.away}
                          onChange={(e) => setScores(s => ({ ...s, away: e.target.value }))}
                          placeholder="0"
                        />
                      </div>
                    ) : (
                      <div className="bg-black/40 rounded-xl px-5 py-2 flex items-center gap-4">
                        <span className="text-2xl font-black text-white">{match.homeScore ?? '-'}</span>
                        <span className="text-xs font-bold text-muted-foreground">VS</span>
                        <span className="text-2xl font-black text-white">{match.awayScore ?? '-'}</span>
                      </div>
                    )}
                  </div>

                  <div className="flex-1 flex flex-col items-center">
                    <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-primary font-black mb-2">
                      {awayTeam?.teamName.charAt(0)}
                    </div>
                    <p className="font-bold text-sm text-center line-clamp-1">{awayTeam?.teamName || 'À déterminer'}</p>
                  </div>
                </div>

                <div className="flex items-center justify-between mt-4 pt-4 border-t border-white/5">
                  {isEditing ? (
                    <div className="flex gap-2 w-full">
                      <Button 
                        size="sm" 
                        className="flex-1 bg-primary hover:bg-primary/80" 
                        onClick={() => handleUpdate(match.id)}
                      >
                        <CheckCircle2 className="w-4 h-4 mr-2" /> Valider
                      </Button>
                      <Button size="sm" variant="ghost" onClick={() => setEditingId(null)} className="text-muted-foreground">Annuler</Button>
                    </div>
                  ) : (
                    <div className="flex gap-2 w-full">
                      <Button 
                        size="sm" 
                        variant="ghost" 
                        className="flex-1 text-muted-foreground hover:text-white hover:bg-white/5"
                        onClick={() => {
                          setEditingId(match.id)
                          setScores({ home: match.homeScore?.toString() || '', away: match.awayScore?.toString() || '' })
                        }}
                      >
                        <PencilLine className="w-4 h-4 mr-2" /> Modifier
                      </Button>
                      {match.played && (
                        <Button 
                          size="sm" 
                          variant="secondary" 
                          className="flex-1 bg-white/5 hover:bg-white/10"
                          onClick={() => handleAiRecap(match)}
                          disabled={generatingAiId === match.id}
                        >
                          <Wand2 className="w-4 h-4 mr-2" /> {generatingAiId === match.id ? 'IA...' : 'Recap IA'}
                        </Button>
                      )}
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>
    </div>
  )
}

export default function MatchesPage() {
  return (
    <CompetitionProvider>
      <div className="flex min-h-screen">
        <AppSidebar />
        <main className="flex-1 md:ml-64 p-4 md:p-8">
          <div className="max-w-6xl mx-auto space-y-8">
            <header className="flex justify-between items-end">
              <div>
                <h1 className="text-4xl font-headline font-bold text-white tracking-tight">
                  Gestion des <span className="text-primary">Matchs</span>
                </h1>
                <p className="text-muted-foreground mt-2">Saisie et modification des scores en temps réel.</p>
              </div>
            </header>

            <Tabs defaultValue="groups" className="w-full">
              <TabsList className="bg-secondary/30 p-1 rounded-2xl mb-8">
                <TabsTrigger value="groups" className="rounded-xl px-8">Phase de Poules</TabsTrigger>
                <TabsTrigger value="knockout" className="rounded-xl px-8">Phase Finale</TabsTrigger>
              </TabsList>
              
              <TabsContent value="groups">
                <MatchList type="group" />
              </TabsContent>
              
              <TabsContent value="knockout">
                <MatchList type="knockout" />
              </TabsContent>
            </Tabs>
          </div>
        </main>
      </div>
    </CompetitionProvider>
  )
}
