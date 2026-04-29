"use client"

import { AppSidebar } from "@/components/layout/AppSidebar"
import { CompetitionProvider } from "@/lib/store"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { DollarSign, Award, Trophy, User } from "lucide-react"

const prizeBreakdown = [
  { id: 1, name: 'Champion', amount: 500, description: 'Trophée + Médailles d\'or + Chèque', color: 'text-accent' },
  { id: 2, name: 'Finaliste', amount: 200, description: 'Médailles d\'argent', color: 'text-slate-300' },
  { id: 3, name: '3ème Place', amount: 100, description: 'Médailles de bronze', color: 'text-amber-700' },
  { id: 4, name: 'Meilleur Buteur', amount: 80, description: 'Trophée spécial', color: 'text-primary' },
  { id: 5, name: 'Meilleur Passeur', amount: 50, description: 'Trophée spécial', color: 'text-primary' },
  { id: 6, name: 'Meilleure Défense', amount: 40, description: 'Trophée fair-play', color: 'text-primary' },
  { id: 7, name: 'MVP du Tournoi', amount: 30, description: 'Trophée + Chèque', color: 'text-primary' },
]

export default function PrizesPage() {
  return (
    <CompetitionProvider>
      <div className="flex min-h-screen">
        <AppSidebar />
        <main className="flex-1 md:ml-64 p-4 md:p-8">
          <div className="max-w-6xl mx-auto space-y-8">
            <header>
              <h1 className="text-4xl font-headline font-bold text-white tracking-tight">
                Cagnotte <span className="text-accent">1000$</span>
              </h1>
              <p className="text-muted-foreground mt-2">Répartition détaillée des primes et récompenses du tournoi.</p>
            </header>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <Card className="lg:col-span-2 bg-secondary/10 glass border-none">
                <CardHeader>
                  <CardTitle className="text-xl flex items-center gap-2">
                    <Trophy className="w-5 h-5 text-accent" /> Structure des Prix
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow className="border-white/5 hover:bg-transparent">
                        <TableHead className="text-muted-foreground uppercase text-xs">Récompense</TableHead>
                        <TableHead className="text-muted-foreground uppercase text-xs">Détails</TableHead>
                        <TableHead className="text-muted-foreground uppercase text-xs text-right">Montant</TableHead>
                        <TableHead className="text-muted-foreground uppercase text-xs text-right">Statut</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {prizeBreakdown.map((prize) => (
                        <TableRow key={prize.id} className="border-white/5 hover:bg-white/5">
                          <TableCell className={`font-bold ${prize.color}`}>{prize.name}</TableCell>
                          <TableCell className="text-sm text-muted-foreground">{prize.description}</TableCell>
                          <TableCell className={`text-right font-bold ${prize.color}`}>{prize.amount}$</TableCell>
                          <TableCell className="text-right">
                            <Badge variant="outline" className="text-[10px] uppercase border-white/10 text-muted-foreground">
                              ⏳ En attente
                            </Badge>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>

              <div className="space-y-6">
                <Card className="bg-primary/10 glass border-primary/20">
                  <CardHeader>
                    <CardTitle className="text-sm uppercase tracking-wider text-primary">Récompense Spéciale</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center gap-4">
                      <div className="p-3 bg-primary rounded-2xl">
                        <Award className="w-8 h-8 text-white" />
                      </div>
                      <div>
                        <p className="text-xl font-headline font-bold">Équipe Fair-Play</p>
                        <p className="text-sm text-muted-foreground">Diplôme + Reconnaissance</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-secondary/20 glass border-white/5">
                  <CardHeader>
                    <CardTitle className="text-sm uppercase tracking-wider text-muted-foreground">Révélation</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center gap-4">
                      <div className="p-3 bg-white/10 rounded-2xl">
                        <User className="w-8 h-8 text-accent" />
                      </div>
                      <div>
                        <p className="text-xl font-headline font-bold">Plus Prometteur</p>
                        <p className="text-sm text-muted-foreground">Jeune talent (Diplôme)</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <div className="p-6 rounded-3xl bg-gradient-to-br from-accent/20 to-transparent border border-accent/20">
                  <h3 className="text-xl font-headline font-bold text-accent mb-2">Total Distribué</h3>
                  <div className="flex items-baseline gap-2">
                    <span className="text-5xl font-bold">1000</span>
                    <span className="text-2xl text-accent font-bold">$</span>
                  </div>
                  <p className="text-xs text-muted-foreground mt-4 leading-relaxed">
                    Les prix seront remis officiellement le 25 juillet 2026 lors de la cérémonie de clôture au Stade des Martyrs.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </CompetitionProvider>
  )
}
