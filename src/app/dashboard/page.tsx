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
  Calendar,
  Sparkles
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
    if (hour < 12) return "Bonjour";
    if (hour < 18) return "Bon après-midi";
    return "Bonsoir";
  };

  return (
    <div className="min-h-screen bg-background">
      <AppSidebar />
      <main className="md:ml-72 pb-24 md:pb-8">
        <div className="max-w-6xl mx-auto p-6 md:p-12 space-y-10">
          {/* Header de bienvenue épuré */}
          <header className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-primary font-black text-xs uppercase tracking-[0.2em]">
                <Sparkles className="w-4 h-4 fill-current" />
                Tableau de bord
              </div>
              <h1 className="text-4xl font-display font-black tracking-tight text-foreground">
                {welcomeMessage()}, <span className="text-primary">{state.profile?.first_name || 'Étudiant'}</span>.
              </h1>
              <p className="text-muted-foreground font-medium text-lg">Prêt pour une nouvelle session de réussite ?</p>
            </div>
            <Button asChild variant="gradient" size="lg" className="rounded-2xl gap-2">
              <Link href="/study-sessions">
                <Timer className="w-5 h-5" />
                Lancer une session
              </Link>
            </Button>
          </header>

          {/* Statistiques Premium */}
          <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="bg-primary text-white border-none neostud-card overflow-hidden relative group">
              <div className="absolute -top-10 -right-10 w-40 h-40 bg-white/10 rounded-full blur-3xl group-hover:scale-150 transition-transform duration-700" />
              <CardContent className="p-8 space-y-6 relative z-10">
                <div className="w-12 h-12 rounded-2xl bg-white/20 flex items-center justify-center">
                  <Zap className="w-6 h-6 fill-current" />
                </div>
                <div>
                  <p className="text-xs font-black uppercase tracking-[0.2em] text-white/60 mb-1">Score Global</p>
                  <div className="text-5xl font-black tracking-tight flex items-baseline gap-1">
                    {stats.totalXP} <span className="text-lg opacity-60">XP</span>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-[10px] font-black uppercase">
                    <span>Niveau 1</span>
                    <span>{stats.totalXP} / 1000</span>
                  </div>
                  <Progress value={(stats.totalXP / 1000) * 100} className="h-1.5 bg-white/20" indicatorClassName="bg-white" />
                </div>
              </CardContent>
            </Card>

            <Card className="neostud-card">
              <CardContent className="p-8 flex flex-col justify-between h-full space-y-8">
                <div className="w-12 h-12 rounded-2xl bg-warning/10 flex items-center justify-center text-warning">
                  <Flame className="w-6 h-6 fill-current" />
                </div>
                <div>
                  <p className="text-xs font-black uppercase tracking-[0.2em] text-muted-foreground mb-1">Focus</p>
                  <div className="text-4xl font-black text-foreground tracking-tight">
                    {Math.floor(stats.totalMinutes / 60)}h {stats.totalMinutes % 60}m
                  </div>
                  <p className="text-sm font-medium text-muted-foreground mt-1">Temps d'étude cumulé</p>
                </div>
              </CardContent>
            </Card>

            <Card className="neostud-card">
              <CardContent className="p-8 flex flex-col justify-between h-full space-y-8">
                <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary">
                  <Trophy className="w-6 h-6 fill-current" />
                </div>
                <div>
                  <p className="text-xs font-black uppercase tracking-[0.2em] text-muted-foreground mb-1">Défis</p>
                  <div className="text-4xl font-black text-foreground tracking-tight">
                    {stats.completedChallenges}
                  </div>
                  <p className="text-sm font-medium text-muted-foreground mt-1">Objectifs validés</p>
                </div>
              </CardContent>
            </Card>
          </section>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            {/* Tâches Section épurée */}
            <section className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-display font-black flex items-center gap-3">
                  <div className="w-1 h-6 bg-primary rounded-full" />
                  Priorités
                </h2>
                <Button asChild variant="ghost" size="sm" className="text-xs font-black uppercase tracking-widest gap-2">
                  <Link href="/tasks">
                    Voir tout
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </Button>
              </div>

              <div className="space-y-4">
                {isLoading ? (
                  Array(3).fill(0).map((_, i) => <div key={i} className="h-16 bg-muted animate-pulse rounded-2xl" />)
                ) : pendingTasks.length === 0 ? (
                  <Card className="border-dashed py-12 text-center bg-muted/20">
                    <p className="text-sm font-bold text-muted-foreground/50">Tout est à jour ! 🎉</p>
                  </Card>
                ) : (
                  pendingTasks.map(task => (
                    <Card key={task.id} className="neostud-card group">
                      <CardContent className="p-5 flex items-center justify-between">
                        <div className="flex items-center gap-5">
                          <div className={cn(
                            "w-3 h-3 rounded-full",
                            task.priority === 'high' ? "bg-destructive animate-pulse" : 
                            task.priority === 'medium' ? "bg-warning" : "bg-blue-500"
                          )} />
                          <div>
                            <h3 className="text-[15px] font-black truncate max-w-[200px]">{task.title}</h3>
                            {task.due_date && (
                              <p className="text-[11px] text-muted-foreground font-bold uppercase tracking-widest mt-1">
                                Pour le {format(new Date(task.due_date), 'dd MMMM', { locale: fr })}
                              </p>
                            )}
                          </div>
                        </div>
                        <Button asChild variant="secondary" size="icon" className="rounded-xl opacity-0 group-hover:opacity-100 transition-all scale-75 group-hover:scale-100">
                          <Link href="/tasks">
                            <ArrowRight className="w-4 h-4 text-primary" />
                          </Link>
                        </Button>
                      </CardContent>
                    </Card>
                  ))
                )}
              </div>
            </section>

            {/* Notes Section épurée */}
            <section className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-display font-black flex items-center gap-3">
                  <div className="w-1 h-6 bg-primary rounded-full" />
                  Dernières notes
                </h2>
                <Button asChild variant="ghost" size="sm" className="text-xs font-black uppercase tracking-widest gap-2">
                  <Link href="/study">
                    Voir tout
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </Button>
              </div>

              <div className="grid gap-4">
                {isLoading ? (
                  Array(2).fill(0).map((_, i) => <div key={i} className="h-32 bg-muted animate-pulse rounded-2xl" />)
                ) : recentNotes.length === 0 ? (
                  <Card className="border-dashed py-12 text-center bg-muted/20">
                    <p className="text-sm font-bold text-muted-foreground/50">Aucune note pour le moment.</p>
                  </Card>
                ) : (
                  recentNotes.map(note => (
                    <Card key={note.id} className="neostud-card group overflow-hidden">
                      <CardHeader className="p-5 pb-3">
                        <CardTitle className="text-base font-black truncate">{note.title}</CardTitle>
                      </CardHeader>
                      <CardContent className="p-5 pt-0 space-y-4">
                        <p className="text-[13px] text-muted-foreground line-clamp-2 leading-relaxed">
                          {note.content || 'Aucun contenu rédigé.'}
                        </p>
                        <div className="flex items-center justify-between">
                          <span className="text-[10px] font-black uppercase tracking-widest text-muted-foreground/40">
                            Màj {format(new Date(note.updated_at), 'dd/MM')}
                          </span>
                          <Button asChild variant="link" size="sm" className="h-auto p-0 text-[11px] font-black uppercase tracking-widest text-primary">
                            <Link href="/study">Consulter</Link>
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))
                )}
              </div>
            </section>
          </div>
        </div>
      </main>
      <BottomNav />
    </div>
  );
}
