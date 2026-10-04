
"use client";

import React, { useState, useEffect } from 'react';
import { quizService } from '@/services/quizService';
import { courseService } from '@/services/courseService';
import { Database } from '@/lib/supabase/types';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { 
  Trophy, 
  Play, 
  Plus, 
  CheckCircle2, 
  XCircle, 
  ArrowRight,
  BookOpen,
  Loader2,
  ChevronLeft
} from 'lucide-react';
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogFooter, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger 
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { AppSidebar } from '@/components/layout/AppSidebar';
import { BottomNav } from '@/components/layout/BottomNav';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';

type Quiz = Database['public']['Tables']['quizzes']['Row'];
type Question = Database['public']['Tables']['quiz_questions']['Row'];
type Course = Database['public']['Tables']['courses']['Row'];

export default function AcademyPage() {
  const [quizzes, setQuizzes] = useState<Quiz[]>([]);
  const [courses, setCourses] = useState<Course[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeQuiz, setActiveQuiz] = useState<Quiz | null>(null);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [isFinished, setIsFinished] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  
  const { toast } = useToast();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [qData, cData] = await Promise.all([
        quizService.getQuizzes(),
        courseService.getCourses()
      ]);
      setQuizzes(qData);
      setCourses(cData);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const startQuiz = async (quiz: Quiz) => {
    try {
      const qData = await quizService.getQuizQuestions(quiz.id);
      setQuestions(qData);
      setActiveQuiz(quiz);
      setCurrentQuestionIndex(0);
      setScore(0);
      setIsFinished(false);
    } catch (error: any) {
      toast({ variant: "destructive", title: "Erreur", description: "Impossible de charger les questions." });
    }
  };

  const handleAnswer = (index: number) => {
    if (index === questions[currentQuestionIndex].correct_option_index) {
      setScore(prev => prev + 1);
    }

    if (currentQuestionIndex + 1 < questions.length) {
      setCurrentQuestionIndex(prev => prev + 1);
    } else {
      finishQuiz();
    }
  };

  const finishQuiz = async () => {
    setIsFinished(true);
    if (activeQuiz) {
      try {
        await quizService.saveResult(activeQuiz.id, score + (questions[currentQuestionIndex].correct_option_index === score ? 1 : 0), questions.length);
      } catch (error) {
        console.error(error);
      }
    }
  };

  const handleCreateQuiz = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const title = formData.get('title') as string;
    const description = formData.get('description') as string;
    const course_id = formData.get('course_id') as string;

    // Pour l'exemple, on crée 1 question par défaut
    const dummyQuestions = [
      {
        question_text: "Quelle est la capitale de la France ?",
        options: ["Paris", "Lyon", "Marseille", "Bordeaux"],
        correct_option_index: 0
      }
    ];

    try {
      await quizService.createQuiz({ 
        title, 
        description, 
        course_id: course_id === 'none' ? null : course_id 
      }, dummyQuestions);
      setIsDialogOpen(false);
      fetchData();
      toast({ title: "Quiz créé !" });
    } catch (error: any) {
      toast({ variant: "destructive", title: "Erreur", description: error.message });
    }
  };

  if (activeQuiz && questions.length > 0 && !isFinished) {
    const currentQ = questions[currentQuestionIndex];
    return (
      <div className="min-h-screen bg-muted/30 flex items-center justify-center p-4">
        <Card className="w-full max-w-xl shadow-2xl border-none rounded-[2rem] overflow-hidden">
          <div className="h-2 bg-muted">
            <div 
              className="h-full bg-primary transition-all duration-500" 
              style={{ width: `${((currentQuestionIndex) / questions.length) * 100}%` }}
            />
          </div>
          <CardHeader className="p-8">
            <div className="flex justify-between items-center mb-4">
              <span className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground">
                Question {currentQuestionIndex + 1} / {questions.length}
              </span>
              <Button variant="ghost" size="sm" onClick={() => setActiveQuiz(null)} className="rounded-full">Quitter</Button>
            </div>
            <CardTitle className="text-2xl font-display font-bold leading-tight">{currentQ.question_text}</CardTitle>
          </CardHeader>
          <CardContent className="p-8 pt-0 grid gap-3">
            {(currentQ.options as string[]).map((option, i) => (
              <Button 
                key={i} 
                variant="outline" 
                className="h-16 justify-start px-6 text-left rounded-2xl border-2 hover:border-primary hover:bg-primary/5 transition-all text-base"
                onClick={() => handleAnswer(i)}
              >
                <span className="w-8 h-8 rounded-full bg-muted flex items-center justify-center mr-4 text-xs font-bold">{String.fromCharCode(65 + i)}</span>
                {option}
              </Button>
            ))}
          </CardContent>
        </Card>
      </div>
    );
  }

  if (isFinished) {
    return (
      <div className="min-h-screen bg-muted/30 flex items-center justify-center p-4">
        <Card className="w-full max-w-md shadow-2xl border-none rounded-[3rem] text-center p-8">
          <div className="w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
            <Trophy className="w-12 h-12 text-primary" />
          </div>
          <h2 className="text-3xl font-display font-black mb-2">Quiz Terminé !</h2>
          <p className="text-muted-foreground mb-8">Vous avez obtenu un score de :</p>
          <div className="text-6xl font-black text-primary mb-8 tracking-tighter">
            {score} <span className="text-2xl text-muted-foreground">/ {questions.length}</span>
          </div>
          <Button onClick={() => setActiveQuiz(null)} className="w-full h-14 rounded-2xl text-lg font-bold">Retour à l'Academy</Button>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-muted/30">
      <AppSidebar />
      <main className="md:ml-72 pb-24 md:pb-8">
        <div className="max-w-5xl mx-auto p-4 md:p-8 space-y-8">
          <header className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h1 className="text-3xl font-display font-bold text-foreground">Academy</h1>
              <p className="text-muted-foreground">Testez vos connaissances avec nos quiz interactifs.</p>
            </div>
            
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button className="rounded-full gap-2 shadow-lg">
                  <Plus className="w-4 h-4" />
                  Créer un Quiz
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Nouveau Quiz</DialogTitle>
                  <DialogDescription>Créez un questionnaire pour vous entraîner.</DialogDescription>
                </DialogHeader>
                <form onSubmit={handleCreateQuiz} className="space-y-4 py-4">
                  <div className="space-y-2">
                    <Label>Titre du Quiz</Label>
                    <Input name="title" placeholder="Ex: Révision Droit Constitutionnel" required />
                  </div>
                  <div className="space-y-2">
                    <Label>Description</Label>
                    <Input name="description" placeholder="De quoi parle ce quiz ?" />
                  </div>
                  <div className="space-y-2">
                    <Label>Matière</Label>
                    <Select name="course_id" defaultValue="none">
                      <SelectTrigger>
                        <SelectValue placeholder="Choisir une matière" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="none">Aucune</SelectItem>
                        {courses.map(c => (
                          <SelectItem key={c.id} value={c.id}>{c.name}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <DialogFooter>
                    <Button type="submit" className="w-full">Créer le quiz</Button>
                  </DialogFooter>
                </form>
              </DialogContent>
            </Dialog>
          </header>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {isLoading ? (
              Array(6).fill(0).map((_, i) => (
                <div key={i} className="h-48 bg-muted animate-pulse rounded-2xl" />
              ))
            ) : quizzes.length === 0 ? (
              <div className="col-span-full py-20 text-center text-muted-foreground bg-white rounded-3xl border border-dashed">
                <BookOpen className="w-12 h-12 mx-auto opacity-10 mb-4" />
                <p>Aucun quiz disponible pour le moment.</p>
              </div>
            ) : (
              quizzes.map((quiz) => {
                const course = courses.find(c => c.id === quiz.course_id);
                return (
                  <Card key={quiz.id} className="group hover:shadow-xl transition-all border-border/50 bg-white overflow-hidden rounded-[2rem]">
                    <div className="h-32 bg-gradient-to-br from-primary/10 to-primary/5 p-6 flex items-end relative">
                      <div className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/50 backdrop-blur-sm flex items-center justify-center">
                        <Trophy className="w-5 h-5 text-primary" />
                      </div>
                      {course && (
                        <div className="flex items-center gap-1.5 px-3 py-1 bg-white rounded-full shadow-sm">
                          <div className="w-2 h-2 rounded-full" style={{ backgroundColor: course.color }} />
                          <span className="text-[10px] font-black uppercase tracking-tighter text-muted-foreground">{course.name}</span>
                        </div>
                      )}
                    </div>
                    <CardHeader className="p-6">
                      <CardTitle className="text-xl font-display line-clamp-1">{quiz.title}</CardTitle>
                      <CardDescription className="line-clamp-2 min-h-[2.5rem]">{quiz.description}</CardDescription>
                    </CardHeader>
                    <CardContent className="p-6 pt-0">
                      <Button onClick={() => startQuiz(quiz)} className="w-full rounded-2xl h-12 gap-2 font-bold group-hover:bg-primary transition-colors">
                        Commencer
                        <Play className="w-4 h-4 fill-current" />
                      </Button>
                    </CardContent>
                  </Card>
                );
              })
            )}
          </div>
        </div>
      </main>
      <BottomNav />
    </div>
  );
}
