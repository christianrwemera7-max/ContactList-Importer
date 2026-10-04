
"use client";

import React, { useState, useEffect } from 'react';
import { taskService } from '@/services/taskService';
import { courseService } from '@/services/courseService';
import { Database } from '@/lib/supabase/types';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle, 
  CardDescription,
  CardFooter
} from '@/components/ui/card';
import { 
  Plus, 
  CheckCircle2, 
  Circle, 
  Calendar as CalendarIcon, 
  Trash2, 
  Loader2,
  Clock,
  Filter,
  MoreVertical
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
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';
import { AppSidebar } from '@/components/layout/AppSidebar';
import { BottomNav } from '@/components/layout/BottomNav';
import { useToast } from '@/hooks/use-toast';
import { format, isPast, isToday } from 'date-fns';
import { fr } from 'date-fns/locale';
import { cn } from '@/lib/utils';

type Task = Database['public']['Tables']['tasks']['Row'];
type Course = Database['public']['Tables']['courses']['Row'];

export default function TasksPage() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [courses, setCourses] = useState<Course[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [filter, setFilter] = useState<'all' | 'pending' | 'completed'>('pending');
  const { toast } = useToast();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [tasksData, coursesData] = await Promise.all([
        taskService.getTasks(),
        courseService.getCourses()
      ]);
      setTasks(tasksData);
      setCourses(coursesData);
    } catch (error) {
      console.error('Erreur chargement:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCreateTask = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const title = formData.get('title') as string;
    const course_id = formData.get('course_id') as string;
    const due_date = formData.get('due_date') as string;
    const priority = formData.get('priority') as 'low' | 'medium' | 'high';

    try {
      const newTask = await taskService.createTask({
        title,
        course_id: course_id === 'none' ? null : course_id,
        due_date: due_date || null,
        priority: priority || 'medium',
        status: 'pending'
      });
      setTasks([...tasks, newTask]);
      setIsDialogOpen(false);
      toast({ title: "Tâche ajoutée" });
    } catch (error: any) {
      toast({ variant: "destructive", title: "Erreur", description: error.message });
    }
  };

  const toggleTaskStatus = async (task: Task) => {
    const newStatus = task.status === 'completed' ? 'pending' : 'completed';
    try {
      const updated = await taskService.updateTask(task.id, { status: newStatus });
      setTasks(tasks.map(t => t.id === updated.id ? updated : t));
    } catch (error: any) {
      toast({ variant: "destructive", title: "Erreur", description: error.message });
    }
  };

  const handleDeleteTask = async (id: string) => {
    try {
      await taskService.deleteTask(id);
      setTasks(tasks.filter(t => t.id !== id));
      toast({ title: "Tâche supprimée" });
    } catch (error: any) {
      toast({ variant: "destructive", title: "Erreur", description: error.message });
    }
  };

  const filteredTasks = tasks.filter(t => {
    if (filter === 'all') return true;
    return t.status === filter;
  });

  return (
    <div className="min-h-screen bg-muted/30">
      <AppSidebar />
      <main className="md:ml-72 pb-24 md:pb-8">
        <div className="max-w-4xl mx-auto p-4 md:p-8 space-y-8">
          <header className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h1 className="text-3xl font-display font-bold text-foreground">Planning & Tâches</h1>
              <p className="text-muted-foreground">Gérez votre emploi du temps et vos priorités.</p>
            </div>
            
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button className="rounded-full gap-2 shadow-lg">
                  <Plus className="w-4 h-4" />
                  Nouvelle tâche
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Créer une tâche</DialogTitle>
                  <DialogDescription>Ajoutez un nouvel objectif à votre planning.</DialogDescription>
                </DialogHeader>
                <form onSubmit={handleCreateTask} className="space-y-4 py-4">
                  <div className="space-y-2">
                    <Label htmlFor="title">Titre de la tâche</Label>
                    <Input id="title" name="title" placeholder="Ex: Réviser le chapitre 2" required />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="course_id">Matière</Label>
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
                    <div className="space-y-2">
                      <Label htmlFor="priority">Priorité</Label>
                      <Select name="priority" defaultValue="medium">
                        <SelectTrigger>
                          <SelectValue placeholder="Priorité" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="low">Basse</SelectItem>
                          <SelectItem value="medium">Moyenne</SelectItem>
                          <SelectItem value="high">Haute</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="due_date">Échéance</Label>
                    <Input id="due_date" name="due_date" type="datetime-local" />
                  </div>
                  <DialogFooter>
                    <Button type="submit" className="w-full">Créer la tâche</Button>
                  </DialogFooter>
                </form>
              </DialogContent>
            </Dialog>
          </header>

          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-2">
            <Button 
              variant={filter === 'pending' ? 'default' : 'outline'} 
              size="sm" 
              className="rounded-full px-4"
              onClick={() => setFilter('pending')}
            >
              À faire
            </Button>
            <Button 
              variant={filter === 'completed' ? 'default' : 'outline'} 
              size="sm" 
              className="rounded-full px-4"
              onClick={() => setFilter('completed')}
            >
              Terminées
            </Button>
            <Button 
              variant={filter === 'all' ? 'default' : 'outline'} 
              size="sm" 
              className="rounded-full px-4"
              onClick={() => setFilter('all')}
            >
              Toutes
            </Button>
          </div>

          <div className="space-y-3">
            {isLoading ? (
              Array(3).fill(0).map((_, i) => (
                <div key={i} className="h-20 bg-muted animate-pulse rounded-2xl" />
              ))
            ) : filteredTasks.length === 0 ? (
              <Card className="border-dashed py-12 text-center bg-muted/20">
                <CardContent className="space-y-3">
                  <CheckSquare className="w-12 h-12 text-muted-foreground mx-auto opacity-20" />
                  <p className="font-bold text-muted-foreground">Aucune tâche pour le moment</p>
                </CardContent>
              </Card>
            ) : (
              filteredTasks.map((task) => {
                const course = courses.find(c => c.id === task.course_id);
                const isOverdue = task.due_date && isPast(new Date(task.due_date)) && task.status === 'pending';
                
                return (
                  <Card 
                    key={task.id} 
                    className={cn(
                      "group hover:shadow-sm transition-all border-border/50",
                      task.status === 'completed' ? "opacity-60" : ""
                    )}
                  >
                    <CardContent className="p-4 flex items-center gap-4">
                      <button 
                        onClick={() => toggleTaskStatus(task)}
                        className="flex-shrink-0 transition-transform active:scale-90"
                      >
                        {task.status === 'completed' ? (
                          <CheckCircle2 className="w-6 h-6 text-primary" />
                        ) : (
                          <Circle className="w-6 h-6 text-muted-foreground group-hover:text-primary transition-colors" />
                        )}
                      </button>
                      
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <h3 className={cn(
                            "font-bold text-sm truncate",
                            task.status === 'completed' ? "line-through text-muted-foreground" : ""
                          )}>
                            {task.title}
                          </h3>
                          {task.priority === 'high' && (
                            <span className="flex-shrink-0 w-2 h-2 rounded-full bg-destructive animate-pulse" />
                          )}
                        </div>
                        
                        <div className="flex flex-wrap items-center gap-x-4 gap-y-1 mt-1">
                          {course && (
                            <span className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
                              <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: course.color }} />
                              {course.name}
                            </span>
                          )}
                          
                          {task.due_date && (
                            <span className={cn(
                              "flex items-center gap-1 text-[10px] font-bold uppercase tracking-widest",
                              isOverdue ? "text-destructive" : "text-muted-foreground"
                            )}>
                              <Clock className="w-3 h-3" />
                              {format(new Date(task.due_date), 'dd MMM HH:mm', { locale: fr })}
                            </span>
                          )}
                        </div>
                      </div>

                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity">
                            <MoreVertical className="w-4 h-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={() => handleDeleteTask(task.id)} className="text-destructive">
                            <Trash2 className="w-4 h-4 mr-2" />
                            Supprimer
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
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
