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
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
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
  LayoutGrid,
  Sparkles,
  Search
} from 'lucide-react';
import Link from 'next/link';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import { cn } from '@/lib/utils';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

type Note = Database['public']['Tables']['notes']['Row'];
type Task = Database['public']['Tables']['tasks']['Row'];

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

  return (
    <div className="min-h-screen bg-[#F8F7FC]">
      <AppSidebar />
      <main className="md:ml-72 pb-24 md:pb-8">
        <div className="max-w-4xl mx-auto p-4 md:p-8 space-y-8">
          {/* Top Profile Bar */}
          <header className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Avatar className="w-12 h-12 border-2 border-white shadow-sm">
                <AvatarImage src={state.profile?.photo_url || ''} />
                <AvatarFallback className="bg-primary/10 text-primary font-bold">
                  {state.profile?.first_name?.[0]}
                </AvatarFallback>
              </Avatar>
              <div>
                <p className="text-xs text-muted-foreground font-medium">Bon retour,</p>
                <h1 className="text-lg font-display font-black leading-none">{state.profile?.first_name || 'Étudiant'}</h1>
              </div>
            </div>
            <Button variant="ghost" size="icon" className="rounded-full bg-white shadow-sm border border-border/50">
              <Search className="w-5 h-5 text-muted-foreground" />
            </Button>
          </header>

          {/* Main Hero Stats Card */}
          <Card className="neostud-stats-card p-8 relative">
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16 blur-2xl" />
            <div className="relative z-10 space-y-6">
              <div>
                <p className="text-white/60 text-xs font-black uppercase tracking-[0.2em] mb-2">Expérience Totale</p>
                <div className="text-6xl font-display font-black tracking-tight flex items-baseline gap-2">
                  {stats.totalXP.toLocaleString()} <span className="text-xl opacity-60">XP</span>
                </div>
              </div>
              
              <div className="flex items-center justify-between pt-4 border-t border-white/10">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-2xl bg-white/20 flex items-center justify-center">
                    <Trophy className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-[10px] font-black uppercase opacity-60 leading-none">Défis</p>
                    <p className="text-base font-black">{stats.completedChallenges}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-2xl bg-white/20 flex items-center justify-center">
                    <Timer className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-[10px] font-black uppercase opacity-60 leading-none">Focus</p>
                    <p className="text-base font-black">{Math.floor(stats.totalMinutes / 60)}h</p>
                  </div>
                </div>
                <Button size="sm" variant="secondary" className="rounded-2xl bg-white text-primary hover:bg-white/90">
                  Voir tout
                </Button>
              </div>
            </div>
          </Card>

          {/* Quick Categories/Actions */}
          <section className="space-y-4">
            <div className="flex items-center justify-between px-2">
              <h2 className="text-sm font-black uppercase tracking-widest text-foreground">Raccourcis</h2>
              <button className="text-xs font-bold text-primary">Tout voir</button>
            </div>
            <div className="grid grid-cols-4 gap-4">
              {[
                { name: 'Étude', icon: BookOpen, href: '/study', color: 'bg-blue-500' },
                { name: 'Sessions', icon: Timer, href: '/study-sessions', color: 'bg-orange' },
                { name: 'Academy', icon: Sparkles, href: '/academy', color: 'bg-primary' },
                { name: 'Social', icon: LayoutGrid, href: '/community', color: 'bg-pink-500' },
              ].map((item) => (
                <Link key={item.name} href={item.href} className="flex flex-col items-center gap-2">
                  <div className={cn("w-16 h-16 rounded-[24px] flex items-center justify-center text-white shadow-lg shadow-black/5", item.color)}>
                    <item.icon className="w-7 h-7" />
                  </div>
                  <span className="text-[11px] font-black uppercase tracking-tight text-muted-foreground">{item.name}</span>
                </Link>
              ))}
            </div>
          </section>

          {/* Recent Activity Section */}
          <section className="space-y-4 pb-8">
            <div className="flex items-center justify-between px-2">
              <h2 className="text-sm font-black uppercase tracking-widest text-foreground">Activités Récentes</h2>
            </div>
            <div className="space-y-3">
              {pendingTasks.map(task => (
                <Card key={task.id} className="neostud-card overflow-hidden group">
                  <CardContent className="p-4 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className={cn(
                        "w-12 h-12 rounded-2xl flex items-center justify-center",
                        task.priority === 'high' ? "bg-destructive/10 text-destructive" : "bg-primary/10 text-primary"
                      )}>
                        {task.status === 'completed' ? <CheckCircle2 className="w-6 h-6" /> : <Zap className="w-6 h-6" />}
                      </div>
                      <div>
                        <h3 className="text-sm font-black leading-tight">{task.title}</h3>
                        <p className="text-[11px] font-bold text-muted-foreground uppercase tracking-wider mt-0.5">
                          {task.due_date ? format(new Date(task.due_date), 'dd MMMM', { locale: fr }) : 'Pas de date'}
                        </p>
                      </div>
                    </div>
                    <div className="flex flex-col items-end">
                      <span className="text-sm font-black">{task.priority === 'high' ? '- 100XP' : 'N/A'}</span>
                      <span className="text-[10px] font-bold text-muted-foreground">Urgent</span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>
        </div>
      </main>
      <BottomNav />
    </div>
  );
}