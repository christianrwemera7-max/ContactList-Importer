
"use client";

import React, { useState, useEffect } from 'react';
import { useApp } from '@/lib/store';
import { noteService } from '@/services/noteService';
import { taskService } from '@/services/taskService';
import { studySessionService } from '@/services/studySessionService';
import { challengeService } from '@/services/challengeService';
import { Database } from '@/lib/supabase/types';
import { AppSidebar } from '@/components/layout/AppSidebar';
import { BottomNav } from '@/components/layout/BottomNav';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { 
  Zap, 
  Clock, 
  BookOpen, 
  CheckCircle2, 
  ArrowRight, 
  Plus, 
  Timer,
  Trophy,
  Flame,
  Calendar
} from 'lucide-react';
import Link from 'next/link';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import { cn } from '@/lib/utils';

type Note = Database['public']['Tables']['notes']['Row'];
type Task = Database['public']['Tables']['tasks']['Row'];
type Session = Database['public']['Tables']['study_sessions']['Row'];

export default function DashboardPage() {
  const { state } = useApp();
  const [recentNotes, setRecentNotes] = useState<Note[]>([]);
  const [pendingTasks, setPendingTasks] = useState<Task[]>([]);
  const [stats, setStats] = useState({
    totalMinutes: 0,
    completedChallenges: 0,
    totalXP: 0
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const [notes, tasks, sessions, participations, challenges] = await Promise.all([
        noteService.getNotes(),
        taskService.getTasks(),
        studySessionService.getSessions(),
        challengeService.getUserParticipations(),
        challengeService.getChallenges()
      ]);

      setRecentNotes(notes.slice(0, 3));
      setPendingTasks(tasks.filter(t => t.status === 'pending').slice(0, 4));
      
      const minutes = sessions.reduce((acc, s) => acc + (s.duration_minutes || 0), 0);
      const completedIds = participations.filter(p => p.status === 'completed').map(p => p.challenge_id);
      const xp = challenges
        .filter(c => completedIds.includes(c.id))
        .reduce((acc, c) => acc + (c.reward_points || 0), 0);

      setStats({
        totalMinutes: minutes,
        completedChallenges: completedIds.length,
        totalXP: xp
      });
    } catch (error) {
      console.error('Erreur dashboard:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const welcomeMessage = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Bon réveil";
    if (hour < 18) return "Bon après-midi";
    return "Bonne soirée";
  };

  return (
    <div className="min-h-screen bg-muted/30">
      <AppSidebar />
      <main className="md:ml-72 pb-24 md:pb-8">
        <div className="max-w-5xl mx-auto p-4 md:p-8 space-y-8">
          {/* Header de bienvenue */}
          <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h1 className="text-3xl font-display font-bold text-foreground">
                {welcomeMessage()}, {state.profile?.first_name || 'Étudiant'} !
              </h1>
              <p className="text-muted-foreground">Prêt pour une nouvelle session de réussite ?</p>
            </div>
            <div className="flex items-center gap-2">
              <Button asChild className="rounded-full shadow-lg gap-2">
                <Link href="/study-sessions">
                  <Timer className="w-4 h-4" />
                  Réviser maintenant
                </Link>
              </Button>
            </div>
          </header>

          {/* Statistiques d'engagement */}
          <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="bg-primary text-white border-none rounded-[2rem] overflow-hidden relative group">
              <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:scale-110 transition-transform">
                <Zap className="w-24 h-24" />
              </div>
              <CardContent className="p-8 space-y-4">
                <p className="text-xs font-black uppercase tracking-[0.2em] text-white/60">Total Expérience</p>
                <div className="text-5xl font-black tracking-tighter">
                  {stats.totalXP}<span className="text-lg ml-2 opacity-60 text-white">XP</span>
                </div>
                <div className="pt-2">
                  <div className="flex justify-between text-[10px] font-black uppercase mb-1.5">
                    <span>Niveau 1</span>
                    <span>{stats.totalXP} / 1000</span>
                  </div>
                  <Progress value={(stats.totalXP / 1000) * 100} className="h-1.5 bg-white/20" indicatorClassName="bg-white" />
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white border-none rounded-[2rem] shadow-sm">
              <CardContent className="p-8 flex flex-col justify-center h-full space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-2xl bg-orange/10 flex items-center justify-center">
                    <Flame className="w-5 h-5 text-orange" />
                  </div>
                  <p className="text-xs font-black uppercase tracking-widest text-muted-foreground">Temps d'étude</p>
                </div>
                <div className="text-4xl font-black text-foreground">
                  {Math.floor(stats.totalMinutes / 60)}h {stats.totalMinutes % 60}m
                </div>
                <p className="text-xs text-muted-foreground">Concentration accumulée</p>
              </CardContent>
            </Card>

            <Card className="bg-white border-none rounded-[2rem] shadow-sm">
              <CardContent className="p-8 flex flex-col justify-center h-full space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-2xl bg-primary/10 flex items-center justify-center">
                    <Trophy className="w-5 h-5 text-primary" />
                  </div>
                  <p className="text-xs font-black uppercase tracking-widest text-muted-foreground">Défis relevés</p>
                </div>
                <div className="text-4xl font-black text-foreground">
                  {stats.completedChallenges}
                </div>
                <p className="text-xs text-muted-foreground">Objectifs académiques validés</p>
              </CardContent>
            </Card>
          </section>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Tâches urgentes */}
            <section className="space-y-4">
              <div className="flex items-center justify-between px-2">
                <h2 className="text-xl font-display font-bold flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-primary" />
                  Priorités
                </h2>
                <Button asChild variant="ghost" size="sm" className="rounded-full text-xs font-bold uppercase tracking-widest gap-1">
                  <Link href="/tasks">
                    Voir tout
                    <ArrowRight className="w-3 h-3" />
                  </Link>
                </Button>
              </div>

              <div className="space-y-3">
                {isLoading ? (
                  Array(3).fill(0).map((_, i) => <div key={i} className="h-16 bg-white animate-pulse rounded-2xl" />)
                ) : pendingTasks.length === 0 ? (
                  <Card className="border-dashed py-8 text-center bg-white/50">
                    <p className="text-sm text-muted-foreground">Aucune tâche en attente ! 🎉</p>
                  </Card>
                ) : (
                  pendingTasks.map(task => (
                    <Card key={task.id} className="border-none shadow-sm group hover:shadow-md transition-all rounded-2xl overflow-hidden">
                      <CardContent className="p-4 flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <div className={cn(
                            "w-2 h-2 rounded-full",
                            task.priority === 'high' ? "bg-red-500 animate-pulse" : 
                            task.priority === 'medium' ? "bg-orange" : "bg-blue-500"
                          )} />
                          <div>
                            <h3 className="text-sm font-bold truncate max-w-[200px]">{task.title}</h3>
                            {task.due_date && (
                              <p className="text-[10px] text-muted-foreground uppercase font-medium mt-0.5">
                                Pour le {format(new Date(task.due_date), 'dd MMMM', { locale: fr })}
                              </p>
                            )}
                          </div>
                        </div>
                        <Button asChild variant="secondary" size="icon" className="rounded-xl opacity-0 group-hover:opacity-100 transition-opacity">
                          <Link href="/tasks">
                            <ArrowRight className="w-4 h-4" />
                          </Link>
                        </Button>
                      </CardContent>
                    </Card>
                  ))
                )}
              </div>
            </section>

            {/* Notes récentes */}
            <section className="space-y-4">
              <div className="flex items-center justify-between px-2">
                <h2 className="text-xl font-display font-bold flex items-center gap-2">
                  <BookOpen className="w-5 h-5 text-primary" />
                  Dernières notes
                </h2>
                <Button asChild variant="ghost" size="sm" className="rounded-full text-xs font-bold uppercase tracking-widest gap-1">
                  <Link href="/study">
                    Voir tout
                    <ArrowRight className="w-3 h-3" />
                  </Link>
                </Button>
              </div>

              <div className="grid gap-3">
                {isLoading ? (
                  Array(2).fill(0).map((_, i) => <div key={i} className="h-24 bg-white animate-pulse rounded-2xl" />)
                ) : recentNotes.length === 0 ? (
                  <Card className="border-dashed py-8 text-center bg-white/50">
                    <p className="text-sm text-muted-foreground">Commencez à rédiger vos cours.</p>
                  </Card>
                ) : (
                  recentNotes.map(note => (
                    <Card key={note.id} className="border-none shadow-sm hover:shadow-md transition-all rounded-2xl overflow-hidden">
                      <CardHeader className="p-4 pb-2">
                        <CardTitle className="text-sm font-bold truncate">{note.title}</CardTitle>
                      </CardHeader>
                      <CardContent className="p-4 pt-0">
                        <p className="text-xs text-muted-foreground line-clamp-2 mb-3">
                          {note.content || 'Aucun contenu rédigé.'}
                        </p>
                        <div className="flex items-center justify-between">
                          <span className="text-[10px] font-black uppercase tracking-widest text-muted-foreground/50">
                            Modifiée {format(new Date(note.updated_at), 'dd/MM')}
                          </span>
                          <Button asChild variant="link" size="sm" className="h-auto p-0 text-[10px] font-black uppercase tracking-widest">
                            <Link href="/study">Ouvrir</Link>
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))
                )}
              </div>
            </section>
          </div>

          {/* Section d'action rapide / Inspiration */}
          <section className="pt-4">
            <Card className="bg-gradient-to-br from-orange/10 to-orange/5 border-none rounded-[2rem]">
              <CardContent className="p-8 flex flex-col md:flex-row items-center justify-between gap-6">
                <div className="space-y-2 text-center md:text-left">
                  <h3 className="text-lg font-display font-bold">Un petit coup de pouce ?</h3>
                  <p className="text-sm text-muted-foreground max-w-md">
                    Rejoignez un groupe d'étude pour partager vos ressources et rester motivé avec d'autres étudiants.
                  </p>
                </div>
                <Button asChild className="rounded-full bg-orange hover:bg-orange/90 text-white shadow-lg px-8">
                  <Link href="/community">Explorer la communauté</Link>
                </Button>
              </CardContent>
            </Card>
          </section>
        </div>
      </main>
      <BottomNav />
    </div>
  );
}
