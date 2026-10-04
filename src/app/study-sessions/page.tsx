
"use client";

import React, { useState, useEffect, useRef } from 'react';
import { studySessionService } from '@/services/studySessionService';
import { courseService } from '@/services/courseService';
import { Database } from '@/lib/supabase/types';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { 
  Play, 
  Square, 
  Clock, 
  History, 
  BookOpen, 
  Timer, 
  Trash2, 
  CheckCircle2,
  AlertCircle
} from 'lucide-react';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { AppSidebar } from '@/components/layout/AppSidebar';
import { BottomNav } from '@/components/layout/BottomNav';
import { useToast } from '@/hooks/use-toast';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import { cn } from '@/lib/utils';

type StudySession = Database['public']['Tables']['study_sessions']['Row'];
type Course = Database['public']['Tables']['courses']['Row'];

export default function StudySessionsPage() {
  const [sessions, setSessions] = useState<StudySession[]>([]);
  const [courses, setCourses] = useState<Course[]>([]);
  const [activeSession, setActiveSession] = useState<StudySession | null>(null);
  const [selectedCourse, setSelectedCourse] = useState<string>('none');
  const [elapsedTime, setElapsedTime] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    fetchData();
    // Nettoyage du timer au démontage
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);

  const fetchData = async () => {
    try {
      const [sessionsData, coursesData] = await Promise.all([
        studySessionService.getSessions(),
        courseService.getCourses()
      ]);
      setSessions(sessionsData);
      setCourses(coursesData);
      
      // Vérifier si une session est déjà en cours (sans end_time)
      const current = sessionsData.find(s => !s.end_time);
      if (current) {
        setActiveSession(current);
        startTimer(new Date(current.start_time).getTime());
      }
    } catch (error) {
      console.error('Erreur chargement:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const startTimer = (startTimeMs: number) => {
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setElapsedTime(Math.floor((Date.now() - startTimeMs) / 1000));
    }, 1000);
  };

  const handleStartSession = async () => {
    try {
      const newSession = await studySessionService.startSession(selectedCourse);
      setActiveSession(newSession);
      setElapsedTime(0);
      startTimer(Date.now());
      toast({ title: "Session démarrée", description: "Bonne révision !" });
    } catch (error: any) {
      toast({ variant: "destructive", title: "Erreur", description: error.message });
    }
  };

  const handleEndSession = async () => {
    if (!activeSession) return;
    try {
      const ended = await studySessionService.endSession(activeSession.id);
      setSessions([ended, ...sessions.filter(s => s.id !== activeSession.id)]);
      setActiveSession(null);
      if (timerRef.current) clearInterval(timerRef.current);
      setElapsedTime(0);
      toast({ title: "Session terminée", description: `Bravo ! Vous avez révisé pendant ${ended.duration_minutes} minutes.` });
    } catch (error: any) {
      toast({ variant: "destructive", title: "Erreur", description: error.message });
    }
  };

  const handleDeleteSession = async (id: string) => {
    if (!confirm('Supprimer cette session ?')) return;
    try {
      await studySessionService.deleteSession(id);
      setSessions(sessions.filter(s => s.id !== id));
      toast({ title: "Session supprimée" });
    } catch (error: any) {
      toast({ variant: "destructive", title: "Erreur", description: error.message });
    }
  };

  const formatTime = (seconds: number) => {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hrs > 0 ? hrs + ':' : ''}${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="min-h-screen bg-muted/30">
      <AppSidebar />
      <main className="md:ml-72 pb-24 md:pb-8">
        <div className="max-w-4xl mx-auto p-4 md:p-8 space-y-8">
          <header>
            <h1 className="text-3xl font-display font-bold text-foreground">Sessions de Révision</h1>
            <p className="text-muted-foreground">Mesurez votre temps de concentration par matière.</p>
          </header>

          {/* Minuteur / Session Active */}
          <Card className={cn(
            "overflow-hidden border-2 transition-all",
            activeSession ? "border-primary shadow-xl scale-[1.02]" : "border-border/50"
          )}>
            <CardHeader className="text-center pb-2">
              <CardTitle className="text-sm font-bold uppercase tracking-widest text-muted-foreground">
                {activeSession ? "Session en cours" : "Prêt à réviser ?"}
              </CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col items-center py-8 space-y-8">
              <div className="text-7xl md:text-8xl font-mono font-black tracking-tighter text-primary">
                {formatTime(elapsedTime)}
              </div>

              {!activeSession ? (
                <div className="w-full max-w-sm space-y-4">
                  <Select value={selectedCourse} onValueChange={setSelectedCourse}>
                    <SelectTrigger className="rounded-2xl h-12 bg-muted/50 border-none">
                      <SelectValue placeholder="Choisir une matière" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="none">Toutes les matières</SelectItem>
                      {courses.map(course => (
                        <SelectItem key={course.id} value={course.id}>{course.name}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <Button 
                    onClick={handleStartSession} 
                    className="w-full h-14 rounded-3xl text-lg font-bold gap-3 shadow-lg hover:shadow-primary/20"
                  >
                    <Play className="w-6 h-6 fill-current" />
                    Commencer
                  </Button>
                </div>
              ) : (
                <div className="w-full max-w-sm flex flex-col items-center space-y-4">
                  <div className="flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full">
                    <div 
                      className="w-3 h-3 rounded-full" 
                      style={{ backgroundColor: courses.find(c => c.id === activeSession.course_id)?.color || '#2563EB' }} 
                    />
                    <span className="text-sm font-bold text-primary">
                      {courses.find(c => c.id === activeSession.course_id)?.name || 'Matière générale'}
                    </span>
                  </div>
                  <Button 
                    onClick={handleEndSession} 
                    variant="destructive" 
                    className="w-full h-14 rounded-3xl text-lg font-bold gap-3 shadow-lg"
                  >
                    <Square className="w-6 h-6 fill-current" />
                    Terminer
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Historique */}
          <div className="space-y-4">
            <h2 className="text-xl font-display font-bold flex items-center gap-2">
              <History className="w-5 h-5 text-muted-foreground" />
              Historique récent
            </h2>
            
            <div className="grid gap-3">
              {isLoading ? (
                Array(3).fill(0).map((_, i) => (
                  <div key={i} className="h-20 bg-muted animate-pulse rounded-2xl" />
                ))
              ) : sessions.filter(s => s.end_time).length === 0 ? (
                <div className="py-12 text-center text-muted-foreground bg-white rounded-3xl border border-dashed">
                  <Timer className="w-12 h-12 mx-auto opacity-10 mb-4" />
                  <p className="text-sm">Aucune session enregistrée</p>
                </div>
              ) : (
                sessions.filter(s => s.end_time).map((session) => {
                  const course = courses.find(c => c.id === session.course_id);
                  return (
                    <Card key={session.id} className="group border-border/50 hover:shadow-md transition-all bg-white">
                      <CardContent className="p-4 flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 rounded-2xl bg-muted/50 flex items-center justify-center">
                            <Clock className="w-5 h-5 text-muted-foreground" />
                          </div>
                          <div>
                            <div className="flex items-center gap-2">
                              <h3 className="font-bold text-sm">
                                {session.duration_minutes} minutes de révision
                              </h3>
                              {course && (
                                <div className="flex items-center gap-1.5 px-2 py-0.5 bg-muted rounded-full">
                                  <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: course.color }} />
                                  <span className="text-[9px] font-black uppercase tracking-tighter text-muted-foreground">
                                    {course.name}
                                  </span>
                                </div>
                              )}
                            </div>
                            <p className="text-[10px] text-muted-foreground uppercase tracking-widest mt-1">
                              Le {format(new Date(session.start_time), 'dd MMMM yyyy à HH:mm', { locale: fr })}
                            </p>
                          </div>
                        </div>
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          className="opacity-0 group-hover:opacity-100 transition-opacity text-destructive"
                          onClick={() => handleDeleteSession(session.id)}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </CardContent>
                    </Card>
                  );
                })
              )}
            </div>
          </div>
        </div>
      </main>
      <BottomNav />
    </div>
  );
}
