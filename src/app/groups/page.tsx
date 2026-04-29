"use client"

import { AppSidebar } from "@/components/layout/AppSidebar"
import { CompetitionProvider, useCompetition } from "@/lib/store"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"

function GroupTable({ group }: { group: 'A' | 'B' | 'C' | 'D' }) {
  const { state } = useCompetition()
  const groupTeams = [...state.teams]
    .filter(t => t.group === group)
    .sort((a, b) => {
      if (b.points !== a.points) return b.points - a.points
      const diffA = a.goalsFor - a.goalsAgainst
      const diffB = b.goalsFor - b.goalsAgainst
      if (diffB !== diffA) return diffB - diffA
      return b.goalsFor - a.goalsFor
    })

  return (
    <Card className="bg-secondary/10 glass border-none overflow-hidden">
      <CardHeader className="bg-white/5 border-b border-white/5">
        <CardTitle className="text-lg font-headline flex items-center justify-between">
          Groupe {group}
          <Badge className="bg-primary/20 text-primary border-none">En cours</Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <Table>
          <TableHeader>
            <TableRow className="border-white/5 hover:bg-transparent">
              <TableHead className="w-8 text-center text-[10px] text-muted-foreground uppercase">#</TableHead>
              <TableHead className="text-[10px] text-muted-foreground uppercase">Équipe</TableHead>
              <TableHead className="text-center text-[10px] text-muted-foreground uppercase">MJ</TableHead>
              <TableHead className="text-center text-[10px] text-muted-foreground uppercase">V</TableHead>
              <TableHead className="text-center text-[10px] text-muted-foreground uppercase">N</TableHead>
              <TableHead className="text-center text-[10px] text-muted-foreground uppercase">D</TableHead>
              <TableHead className="text-center text-[10px] text-muted-foreground uppercase">Diff</TableHead>
              <TableHead className="text-center text-[10px] text-muted-foreground uppercase font-bold text-white">Pts</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {groupTeams.map((team, idx) => (
              <TableRow key={team.id} className="border-white/5 hover:bg-white/5 group transition-colors">
                <TableCell className="text-center">
                  <span className={cn(
                    "w-6 h-6 flex items-center justify-center rounded text-[10px] font-bold",
                    idx < 2 ? "bg-primary text-white" : "bg-white/5 text-muted-foreground"
                  )}>
                    {idx + 1}
                  </span>
                </TableCell>
                <TableCell>
                  <div>
                    <p className="font-bold text-sm text-white">{team.teamName}</p>
                    <p className="text-[10px] text-muted-foreground truncate max-w-[120px]">{team.schoolName}</p>
                  </div>
                </TableCell>
                <TableCell className="text-center text-sm">{team.played}</TableCell>
                <TableCell className="text-center text-sm text-primary font-medium">{team.won}</TableCell>
                <TableCell className="text-center text-sm">{team.drawn}</TableCell>
                <TableCell className="text-center text-sm text-destructive">{team.lost}</TableCell>
                <TableCell className="text-center text-sm font-medium">
                  {team.goalsFor - team.goalsAgainst > 0 ? `+${team.goalsFor - team.goalsAgainst}` : team.goalsFor - team.goalsAgainst}
                </TableCell>
                <TableCell className="text-center text-sm font-bold text-accent">{team.points}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}

import { cn } from "@/lib/utils"

export default function GroupsPage() {
  return (
    <CompetitionProvider>
      <div className="flex min-h-screen">
        <AppSidebar />
        <main className="flex-1 md:ml-64 p-4 md:p-8">
          <div className="max-w-6xl mx-auto space-y-8">
            <header>
              <h1 className="text-4xl font-headline font-bold text-white tracking-tight">
                Classement <span className="text-primary">Poules</span>
              </h1>
              <p className="text-muted-foreground mt-2">Suivez l'évolution des 4 groupes de la compétition.</p>
            </header>

            <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
              <GroupTable group="A" />
              <GroupTable group="B" />
              <GroupTable group="C" />
              <GroupTable group="D" />
            </div>
          </div>
        </main>
      </div>
    </CompetitionProvider>
  )
}
