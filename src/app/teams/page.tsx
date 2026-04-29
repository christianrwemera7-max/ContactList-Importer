
"use client"

import { AppSidebar } from "@/components/layout/AppSidebar"
import { CompetitionProvider, useCompetition } from "@/lib/store"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { MapPin, Trophy, Shield, Goal, Star } from "lucide-react"

export default function TeamsPage() {
  return (
    <CompetitionProvider>
      <div className="flex min-h-screen">
        <AppSidebar />
        <main className="flex-1 md:ml-64 p-4 md:p-8">
          <div className="max-w-6xl mx-auto space-y-8">
            <header>
              <h1 className="text-4xl font-headline font-bold text-white tracking-tight">
                Les <span className="text-primary">16 Écoles</span>
              </h1>
              <p className="text-muted-foreground mt-2">Découvrez les participants de l'édition Kinshasa 2026.</p>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              <TeamList />
            </div>
          </div>
        </main>
      </div>
    </CompetitionProvider>
  )
}

function TeamList() {
  const { state } = useCompetition()

  return (
    <>
      {state.teams.map((team) => (
        <Card key={team.id} className="bg-secondary/20 glass border-white/5 hover:bg-white/5 transition-all group">
          <CardHeader className="p-4 pb-0">
            <div className="flex items-start justify-between">
              <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center text-primary font-black text-xl">
                {team.teamName.charAt(0)}
              </div>
              <Badge variant="outline" className="text-[10px] uppercase font-bold border-white/10">
                Groupe {team.group}
              </Badge>
            </div>
            <CardTitle className="text-lg font-bold mt-4 line-clamp-1">{team.teamName}</CardTitle>
            <p className="text-[10px] text-muted-foreground uppercase tracking-widest">{team.schoolName}</p>
          </CardHeader>
          <CardContent className="p-4 space-y-4">
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <MapPin className="w-3 h-3" /> {team.neighborhood} • {team.stadium}
              </div>
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <Shield className="w-3 h-3" /> Couleurs: {team.colors}
              </div>
            </div>

            <div className="pt-4 border-t border-white/5 flex items-center justify-between">
              <div>
                <p className="text-[10px] text-muted-foreground uppercase">Points</p>
                <p className="text-xl font-black text-white">{team.points}</p>
              </div>
              <div className="text-right">
                <p className="text-[10px] text-muted-foreground uppercase">Gains Potentiels</p>
                <p className="text-xl font-black text-accent">500$</p>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </>
  )
}
