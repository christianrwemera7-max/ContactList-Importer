"use client"

import { AppSidebar } from "@/components/layout/AppSidebar"
import { PrizeProgress } from "@/components/dashboard/PrizeProgress"
import { CompetitionProvider, useCompetition } from "@/lib/store"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Clock, MapPin, Calendar, TrendingUp, Trophy, ArrowRight, Star } from "lucide-react"
import { useState, useEffect } from "react"
import Link from "next/link"

function DashboardContent() {
  const { state } = useCompetition()
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, mins: 0, secs: 0 })

  useEffect(() => {
    const target = new Date("2026-07-15T09:00:00").getTime()
    const interval = setInterval(() => {
      const now = new Date().getTime()
      const diff = target - now
      if (diff > 0) {
        setTimeLeft({
          days: Math.floor(diff / (1000 * 60 * 60 * 24)),
          hours: Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          mins: Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)),
          secs: Math.floor((diff % (1000 * 60)) / 1000),
        })
      }
    }, 1000)
    return () => clearInterval(interval)
  }, [])

  const playedCount = state.matches.filter(m => m.played).length;
  const totalCount = state.matches.length;
  const progressPercentage = (playedCount / totalCount) * 100;

  return (
    <div className="max-w-6xl mx-auto space-y-10">
      {/* Hero Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8">
        <div className="space-y-4">
          <Badge variant="secondary" className="bg-primary/10 text-primary border-primary/20 px-3 py-1">
            <TrendingUp className="w-3 h-3 mr-2" /> Édition 2026 en RDC
          </Badge>
          <h1 className="text-5xl md:text-7xl font-headline font-black text-white tracking-tighter leading-none">
            ONE <span className="text-primary">CUP</span> <br />
            KINSHASA
          </h1>
          <p className="text-lg text-muted-foreground max-w-md leading-relaxed">
            La plus grande ligue interscolaire de la capitale. 16 écoles, 56 matchs, et une cagnotte historique de 1000$.
          </p>
          <div className="flex gap-4 pt-2">
            <Link href="/matches">
              <Badge className="bg-primary hover:bg-primary/90 text-white cursor-pointer px-6 py-2 text-sm font-bold rounded-xl">
                Voir les Matchs <ArrowRight className="w-4 h-4 ml-2" />
              </Badge>
            </Link>
          </div>
        </div>

        <div className="flex gap-4">
          <CountdownBox value={timeLeft.days} label="Jours" color="text-accent" />
          <CountdownBox value={timeLeft.hours} label="Heures" />
          <CountdownBox value={timeLeft.mins} label="Minutes" />
        </div>
      </div>

      {/* Prize Section */}
      <PrizeProgress />

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatsCard icon={MapPin} title="Lieu" value="Stade des Martyrs" sub="Gombe, Kinshasa" />
        <StatsCard icon={Calendar} title="Dates" value="15 - 25 Juillet" sub="2026" />
        <StatsCard icon={Trophy} title="Progression" value={`${playedCount} / ${totalCount}`} sub="Matchs joués" progress={progressPercentage} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        {/* Leading Teams */}
        <Card className="bg-secondary/10 glass border-white/5 rounded-3xl overflow-hidden">
          <CardHeader className="border-b border-white/5 bg-white/5">
            <CardTitle className="flex items-center gap-3 text-lg font-bold">
              <Star className="w-5 h-5 text-accent fill-accent" /> Favoris au Titre
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6 space-y-4">
            {state.teams.slice(0, 4).map((team, i) => (
              <div key={team.id} className="flex items-center justify-between p-4 rounded-2xl bg-white/5 hover:bg-white/10 transition-colors border border-transparent hover:border-white/10">
                <div className="flex items-center gap-4">
                  <span className="text-2xl font-black text-muted-foreground/30 font-headline italic">0{i+1}</span>
                  <div className="w-10 h-10 rounded-xl bg-primary/20 flex items-center justify-center text-primary font-black">
                    {team.teamName.charAt(0)}
                  </div>
                  <div>
                    <p className="font-bold text-white">{team.teamName}</p>
                    <p className="text-[10px] text-muted-foreground uppercase tracking-widest">{team.schoolName}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-black text-accent">500$ Potentiels</p>
                  <p className="text-[10px] text-muted-foreground uppercase font-bold">{team.points} Pts</p>
                </div>
              </div>
            ))}
            <Link href="/teams" className="block text-center text-xs font-bold text-muted-foreground hover:text-primary transition-colors pt-2">
              Voir toutes les équipes
            </Link>
          </CardContent>
        </Card>

        {/* Top Players */}
        <Card className="bg-secondary/10 glass border-white/5 rounded-3xl overflow-hidden">
          <CardHeader className="border-b border-white/5 bg-white/5">
            <CardTitle className="flex items-center gap-3 text-lg font-bold">
              ⚽ Leaders Statistiques
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6 space-y-4">
             {state.players.slice(0, 4).map((player, i) => (
              <div key={player.id} className="flex items-center justify-between p-4 rounded-2xl bg-white/5 hover:bg-white/10 transition-colors border border-transparent hover:border-white/10">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold">
                    {player.name.charAt(0)}
                  </div>
                  <div>
                    <p className="font-bold text-white">{player.name}</p>
                    <p className="text-[10px] text-muted-foreground uppercase tracking-widest">{player.position}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-xl font-black text-white">{player.goals}</p>
                  <p className="text-[10px] text-muted-foreground uppercase font-bold">Buts</p>
                </div>
              </div>
            ))}
            <Link href="/players" className="block text-center text-xs font-bold text-muted-foreground hover:text-primary transition-colors pt-2">
              Voir le classement des buteurs
            </Link>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

function CountdownBox({ value, label, color = "text-white" }: { value: number, label: string, color?: string }) {
  return (
    <div className="glass rounded-3xl p-6 text-center min-w-[120px] border-white/10">
      <p className={`text-4xl font-headline font-black ${color}`}>{value}</p>
      <p className="text-[10px] text-muted-foreground uppercase font-bold tracking-[0.2em] mt-1">{label}</p>
    </div>
  )
}

function StatsCard({ icon: Icon, title, value, sub, progress }: { icon: any, title: string, value: string, sub: string, progress?: number }) {
  return (
    <Card className="bg-secondary/20 glass border-none rounded-3xl">
      <CardHeader className="pb-2">
        <CardTitle className="text-[10px] font-black text-muted-foreground uppercase tracking-[0.2em] flex items-center gap-2">
          <Icon className="w-4 h-4 text-primary" /> {title}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-2xl font-headline font-black text-white tracking-tight">{value}</p>
        <p className="text-xs text-muted-foreground mb-4">{sub}</p>
        {progress !== undefined && (
          <div className="w-full bg-white/5 rounded-full h-1.5 overflow-hidden">
            <div className="bg-primary h-full rounded-full transition-all duration-1000" style={{ width: `${progress}%` }} />
          </div>
        )}
      </CardContent>
    </Card>
  )
}

export default function Dashboard() {
  return (
    <CompetitionProvider>
      <div className="flex min-h-screen bg-[#0E1210]">
        <AppSidebar />
        <main className="flex-1 md:ml-64 p-6 md:p-12">
          <DashboardContent />
        </main>
      </div>
    </CompetitionProvider>
  )
}
