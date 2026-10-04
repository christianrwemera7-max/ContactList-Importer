"use client";

import React, { useState, useEffect } from 'react';
import { useProfile } from '@/hooks/useProfile';
import { courseService } from '@/services/courseService';
import { Database } from '@/lib/supabase/types';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { 
  Loader2, 
  User, 
  School, 
  BookOpen, 
  GraduationCap, 
  Plus, 
  MoreVertical, 
  Edit2, 
  Trash2,
  BookMarked
} from 'lucide-react';
import { AppSidebar } from '@/components/layout/AppSidebar';
import { BottomNav } from '@/components/layout/BottomNav';
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
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';
import { useToast } from '@/hooks/use-toast';

type Course = Database['public']['Tables']['courses']['Row'];

export default function ProfilePage() {
  const { profile, isUpdating, updateProfile } = useProfile();
  const [courses, setCourses] = useState<Course[]>([]);
  const [isLoadingCourses, setIsLoadingCourses] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingCourse, setEditingCourse] = useState<Course | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    try {
      const data = await courseService.getCourses();
      setCourses(data);
    } catch (error) {
      console.error('Erreur chargement matières:', error);
    } finally {
      setIsLoadingCourses(false);
    }
  };

  const handleProfileSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    
    await updateProfile({
      first_name: formData.get('first_name') as string,
      last_name: formData.get('last_name') as string,
      university: formData.get('university') as string,
      faculty: formData.get('faculty') as string,
      study_level: formData.get('study_level') as string,
    });
  };

  const handleCourseSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const name = formData.get('name') as string;
    const description = formData.get('description') as string;
    const color = formData.get('color') as string;

    try {
      if (editingCourse) {
        await courseService.updateCourse(editingCourse.id, { name, description, color });
        toast({ title: "Matière mise à jour" });
      } else {
        await courseService.createCourse({ name, description, color });
        toast({ title: "Matière ajoutée" });
      }
      setIsDialogOpen(false);
      setEditingCourse(null);
      fetchCourses();
    } catch (error: any) {
      toast({ variant: "destructive", title: "Erreur", description: error.message });
    }
  };

  const handleDeleteCourse = async (id: string) => {
    if (!confirm('Supprimer cette matière ?')) return;
    try {
      await courseService.deleteCourse(id);
      toast({ title: "Matière supprimée" });
      fetchCourses();
    } catch (error: any) {
      toast({ variant: "destructive", title: "Erreur", description: error.message });
    }
  };

  if (!profile) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-muted/30">
      <AppSidebar />
      <main className="md:ml-72 pb-24 md:pb-8">
        <div className="max-w-4xl mx-auto p-4 md:p-8 space-y-8">
          <header className="flex flex-col md:flex-row items-center gap-6">
            <Avatar className="w-24 h-24 border-4 border-white shadow-xl">
              <AvatarImage src={profile.photo_url || ''} />
              <AvatarFallback className="text-2xl font-bold bg-primary text-primary-foreground">
                {(profile.first_name?.[0] || '') + (profile.last_name?.[0] || '')}
              </AvatarFallback>
            </Avatar>
            <div className="text-center md:text-left space-y-1">
              <h1 className="text-3xl font-display font-bold text-foreground">
                {profile.first_name} {profile.last_name}
              </h1>
              <p className="text-muted-foreground">{profile.email}</p>
              <div className="flex flex-wrap justify-center md:justify-start gap-2 mt-2">
                {profile.university && (
                  <span className="px-3 py-1 bg-primary/10 text-primary text-xs font-bold rounded-full uppercase tracking-wider flex items-center gap-1.5">
                    <School className="w-3 h-3" />
                    {profile.university}
                  </span>
                )}
                {profile.study_level && (
                  <span className="px-3 py-1 bg-secondary text-secondary-foreground text-xs font-bold rounded-full uppercase tracking-wider flex items-center gap-1.5">
                    <GraduationCap className="w-3 h-3" />
                    {profile.study_level}
                  </span>
                )}
              </div>
            </div>
          </header>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="md:col-span-2 space-y-8">
              {/* Informations Personnelles */}
              <Card className="border-border/50 shadow-sm">
                <CardHeader>
                  <CardTitle className="text-xl font-display">Informations Personnelles</CardTitle>
                  <CardDescription>Gérez vos informations d'étudiant.</CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleProfileSubmit} className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="first_name">Prénom</Label>
                        <Input id="first_name" name="first_name" defaultValue={profile.first_name || ''} required />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="last_name">Nom</Label>
                        <Input id="last_name" name="last_name" defaultValue={profile.last_name || ''} required />
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="university">Université / École</Label>
                      <Input id="university" name="university" defaultValue={profile.university || ''} placeholder="Ex: Sorbonne Université" />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="faculty">Faculté / Domaine</Label>
                        <Input id="faculty" name="faculty" defaultValue={profile.faculty || ''} placeholder="Ex: Informatique" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="study_level">Niveau d'études</Label>
                        <Input id="study_level" name="study_level" defaultValue={profile.study_level || ''} placeholder="Ex: Master 2" />
                      </div>
                    </div>

                    <Button type="submit" className="w-full md:w-auto" disabled={isUpdating}>
                      {isUpdating && <Loader2 className="w-4 h-4 animate-spin mr-2" />}
                      Enregistrer les modifications
                    </Button>
                  </form>
                </CardContent>
              </Card>

              {/* Section Mes Matières */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-display font-bold">Mes matières</h2>
                  <Dialog open={isDialogOpen} onOpenChange={(open) => {
                    setIsDialogOpen(open);
                    if (!open) setEditingCourse(null);
                  }}>
                    <DialogTrigger asChild>
                      <Button size="sm" className="rounded-full gap-2">
                        <Plus className="w-4 h-4" />
                        Ajouter
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>{editingCourse ? 'Modifier la matière' : 'Ajouter une matière'}</DialogTitle>
                        <DialogDescription>
                          Organisez vos études en créant des matières dédiées.
                        </DialogDescription>
                      </DialogHeader>
                      <form onSubmit={handleCourseSubmit} className="space-y-4 py-4">
                        <div className="space-y-2">
                          <Label htmlFor="name">Nom de la matière</Label>
                          <Input id="name" name="name" defaultValue={editingCourse?.name || ''} placeholder="Ex: Mathématiques, Droit Civil..." required />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="description">Description (optionnel)</Label>
                          <Input id="description" name="description" defaultValue={editingCourse?.description || ''} placeholder="Ex: Semestre 1" />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="color">Couleur</Label>
                          <div className="flex gap-2">
                            <Input id="color" name="color" type="color" defaultValue={editingCourse?.color || '#2563EB'} className="w-12 h-10 p-1 rounded-md" />
                            <span className="text-xs text-muted-foreground flex items-center italic">Cette couleur sera utilisée pour identifier vos notes.</span>
                          </div>
                        </div>
                        <DialogFooter>
                          <Button type="submit" className="w-full">
                            {editingCourse ? 'Enregistrer' : 'Créer la matière'}
                          </Button>
                        </DialogFooter>
                      </form>
                    </DialogContent>
                  </Dialog>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {isLoadingCourses ? (
                    Array(2).fill(0).map((_, i) => (
                      <div key={i} className="h-32 bg-muted animate-pulse rounded-2xl" />
                    ))
                  ) : courses.length === 0 ? (
                    <Card className="col-span-full border-dashed py-12 text-center bg-muted/20">
                      <CardContent className="space-y-3">
                        <BookMarked className="w-12 h-12 text-muted-foreground mx-auto opacity-20" />
                        <div className="space-y-1">
                          <p className="font-bold text-muted-foreground">Aucune matière enregistrée</p>
                          <p className="text-xs text-muted-foreground">Commencez par ajouter votre premier cours.</p>
                        </div>
                      </CardContent>
                    </Card>
                  ) : (
                    courses.map((course) => (
                      <Card key={course.id} className="group hover:shadow-md transition-all border-border/50 relative overflow-hidden">
                        <div 
                          className="absolute top-0 left-0 w-1 h-full" 
                          style={{ backgroundColor: course.color }} 
                        />
                        <CardHeader className="p-4 flex flex-row items-start justify-between">
                          <div>
                            <CardTitle className="text-lg font-display">{course.name}</CardTitle>
                            <CardDescription className="line-clamp-1">{course.description || 'Pas de description'}</CardDescription>
                          </div>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon" className="h-8 w-8">
                                <MoreVertical className="w-4 h-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem onClick={() => {
                                setEditingCourse(course);
                                setIsDialogOpen(true);
                              }}>
                                <Edit2 className="w-4 h-4 mr-2" />
                                Modifier
                              </DropdownMenuItem>
                              <DropdownMenuItem onClick={() => handleDeleteCourse(course.id)} className="text-red-500">
                                <Trash2 className="w-4 h-4 mr-2" />
                                Supprimer
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </CardHeader>
                        <CardFooter className="p-4 pt-0">
                          <Button variant="secondary" size="sm" className="w-full rounded-xl text-xs font-bold uppercase tracking-widest">
                            Ouvrir
                          </Button>
                        </CardFooter>
                      </Card>
                    ))
                  )}
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <Card className="border-border/50 shadow-sm">
                <CardHeader>
                  <CardTitle className="text-lg font-display">Activité</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <StatItem 
                    label="Matières" 
                    value={courses.length.toString()} 
                    icon={BookOpen} 
                    color="text-blue-500" 
                  />
                  <StatItem 
                    label="Niveau" 
                    value="1" 
                    icon={User} 
                    color="text-orange" 
                  />
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
      <BottomNav />
    </div>
  );
}

function StatItem({ label, value, icon: Icon, color }: any) {
  return (
    <div className="flex items-center justify-between p-3 bg-muted/50 rounded-xl">
      <div className="flex items-center gap-3">
        <div className={`p-2 rounded-lg bg-white ${color}`}>
          <Icon className="w-4 h-4" />
        </div>
        <span className="text-sm font-medium">{label}</span>
      </div>
      <span className="font-bold">{value}</span>
    </div>
  );
}
