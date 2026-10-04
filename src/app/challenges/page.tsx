
"use client";

import React, { useState, useEffect } from 'react';
import { challengeService } from '@/services/challengeService';
import { Database } from '@/lib/supabase/types';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { 
  Trophy, 
  Target, 
  Zap, 
  CheckCircle2, 
  Loader2, 
  Flame, 
  Star,
  ArrowRight,
  Sparkles
} from 'lucide-react';
import { AppSidebar } from '@/components/layout/AppSidebar';
import { BottomNav } from '@/components/layout/BottomNav';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';
import { Progress } from '@/components/ui/progress';

type Challenge = Database['public']['Tables']['challenges']['Row'];
type Participation = Database['public']['Tables']['challenge_participants']['Row'];

export default function ChallengesPage() {
  const [challenges, setChallenges] = useState<Challenge[]>([]);
  const [participations, setParticipations] = useState<Participation[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isActionLoading, setIsActionLoading] = useState<string | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [cData, pData] = await Promise.all([
        challengeService.getChallenges(),
        challengeService.getUserParticipations()
      ]);
      setChallenges(cData);
      setParticipations(pData);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleJoin = async (id: string) => {
    setIsActionLoading(id);
    try {
      const newP = await challengeService.joinChallenge(id);
      setParticipations([...participations, newP]);
      toast({ title: "Défi rejoint !", description: "Bonne chance pour atteindre votre objectif." });
    } catch (error: any) {
      toast({ variant: "destructive", title: "Erreur", description: error.message });
    } finally {
      setIsActionLoading(null);
    }
  };

  const handleComplete = async (id: string) => {
    setIsActionLoading(id);
    try {
      const updatedP = await challengeService.completeChallenge(id);
      setParticipations(participations.map(p => p.challenge_id === id ? updatedP : p));
      toast({ 
        title: "Défi terminé ! 🏆", 
        description: `Bravo ! Vous avez gagné ${challenges.find(c => c.id === id)?.reward_points} points d'expérience.` 
      });
    } catch (error: any) {
      toast({ variant: "destructive", title: "Erreur", description: error.message });
    } finally {
      setIsActionLoading(null);
    }
  };

  const getStatus = (id: string) => {
    const p = participations.find(p => p.challenge_id === id);
    return p ? p.status : 'not_started';
  };

  const completedCount = participations.filter(p => p.status === 'completed').length;
  const totalXP = participations
    .filter(p => p.status === 'completed')
    .reduce((acc, p) => {
      const challenge = challenges.find(c => c.id === p.challenge_id);
      return acc + (challenge?.reward_points || 0);
    }, 0);

  return (
    <div className="min-h-screen bg-muted/30">
      <AppSidebar />
      <main className="md:ml-72 pb-24 md:pb-8">
        <div className="max-w-5xl mx-auto p-4 md:p-8 space-y-8">
          <header className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="space-y-1">
              <h1 className="text-3xl font-display font-bold text-foreground flex items-center gap-3">
                Défis Académiques
                <Sparkles className="w-6 h-6 text-orange" />
              </h1>
              <p className="text-muted-foreground">Repoussez vos limites et gagnez des récompenses.</p>
            </div>

            <div className="flex gap-4">
              <Card className="bg-white border-none shadow-sm px-6 py-3 rounded-2xl flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-orange/10 flex items-center justify-center">
                  <Flame className="w-5 h-5 text-orange" />
                </div>
                <div>
                  <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground leading-none">Total XP</p>
                  <p className="text-xl font-black text-foreground">{totalXP}</p>
                </div>
              </Card>
              <Card className="bg-white border-none shadow-sm px-6 py-3 rounded-2xl flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <Trophy className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground leading-none">Défis</p>
                  <p className="text-xl font-black text-foreground">{completedCount}</p>
                </div>
              </Card>
            </div>
          </header>

          <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {isLoading ? (
              Array(6).fill(0).map((_, i) => (
                <div key={i} className="h-64 bg-muted animate-pulse rounded-[2rem]" />
              ))
            ) : challenges.length === 0 ? (
              <div className="col-span-full py-20 text-center text-muted-foreground bg-white rounded-3xl border border-dashed">
                <Target className="w-12 h-12 mx-auto opacity-10 mb-4" />
                <p>Aucun défi disponible pour le moment.</p>
              </div>
            ) : (
              challenges.map((challenge) => {
                const status = getStatus(challenge.id);
                const isCompleted = status === 'completed';
                const isStarted = status === 'in_progress';

                return (
                  <Card key={challenge.id} className={cn(
                    "group relative overflow-hidden border-none shadow-sm transition-all duration-300 rounded-[2rem]",
                    isCompleted ? "bg-primary text-white" : "bg-white hover:shadow-xl hover:-translate-y-1"
                  )}>
                    <div className={cn(
                      "absolute top-0 right-0 w-32 h-32 -mr-16 -mt-16 rounded-full blur-3xl opacity-20 transition-colors",
                      isCompleted ? "bg-white" : "bg-primary"
                    )} />
                    
                    <CardHeader className="p-6 pb-2">
                      <div className="flex justify-between items-start mb-4">
                        <div className={cn(
                          "px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest",
                          isCompleted ? "bg-white/20" : "bg-muted"
                        )}>
                          {challenge.difficulty}
                        </div>
                        <div className={cn(
                          "flex items-center gap-1.5 font-black text-sm",
                          isCompleted ? "text-white" : "text-orange"
                        )}>
                          <Zap className="w-4 h-4 fill-current" />
                          +{challenge.reward_points} XP
                        </div>
                      </div>
                      <CardTitle className="text-xl font-display leading-tight">{challenge.title}</CardTitle>
                      <CardDescription className={cn(
                        "line-clamp-2 min-h-[3rem]",
                        isCompleted ? "text-white/80" : "text-muted-foreground"
                      )}>
                        {challenge.description}
                      </CardDescription>
                    </CardHeader>

                    <CardContent className="p-6 pt-0">
                      {isStarted && (
                        <div className="space-y-2 mt-4">
                          <div className="flex justify-between text-[10px] font-black uppercase">
                            <span className={isCompleted ? "text-white/60" : "text-muted-foreground"}>Progression</span>
                            <span>50%</span>
                          </div>
                          <Progress value={50} className={cn("h-1.5", isCompleted ? "bg-white/20" : "bg-muted")} indicatorClassName={isCompleted ? "bg-white" : "bg-primary"} />
                        </div>
                      )}
                    </CardContent>

                    <CardFooter className="p-6 pt-0">
                      {isCompleted ? (
                        <div className="w-full flex items-center justify-center gap-2 py-3 bg-white/10 rounded-2xl font-bold uppercase tracking-widest text-xs">
                          <CheckCircle2 className="w-4 h-4" />
                          Terminé
                        </div>
                      ) : isStarted ? (
                        <Button 
                          onClick={() => handleComplete(challenge.id)}
                          className="w-full rounded-2xl h-12 gap-2 font-bold group"
                          disabled={isActionLoading === challenge.id}
                        >
                          {isActionLoading === challenge.id ? <Loader2 className="w-4 h-4 animate-spin" /> : "Terminer"}
                          <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                        </Button>
                      ) : (
                        <Button 
                          variant="outline"
                          onClick={() => handleJoin(challenge.id)}
                          className="w-full rounded-2xl h-12 gap-2 font-bold border-2 hover:bg-primary hover:text-white hover:border-primary transition-all"
                          disabled={isActionLoading === challenge.id}
                        >
                          {isActionLoading === challenge.id ? <Loader2 className="w-4 h-4 animate-spin" /> : "Relever le défi"}
                        </Button>
                      )}
                    </CardFooter>
                  </Card>
                );
              })
            )}
          </section>
        </div>
      </main>
      <BottomNav />
    </div>
  );
}
