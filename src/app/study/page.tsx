"use client";

import React, { useState, useEffect } from 'react';
import { noteService } from '@/services/noteService';
import { courseService } from '@/services/courseService';
import { Database } from '@/lib/supabase/types';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { 
  Plus, 
  Search, 
  BookOpen, 
  Trash2, 
  Loader2, 
  MoreVertical, 
  ChevronLeft,
  Save,
  ArrowRight
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

type Note = Database['public']['Tables']['notes']['Row'];
type Course = Database['public']['Tables']['courses']['Row'];

export default function StudyPage() {
  const [notes, setNotes] = useState<Note[]>([]);
  const [courses, setCourses] = useState<Course[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedNote, setSelectedNote] = useState<Note | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [courseFilter, setCourseFilter] = useState<string>('all');
  const { toast } = useToast();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [notesData, coursesData] = await Promise.all([
        noteService.getNotes(),
        courseService.getCourses()
      ]);
      setNotes(notesData);
      setCourses(coursesData);
    } catch (error) {
      console.error('Erreur chargement:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCreateNote = async () => {
    try {
      const newNote = await noteService.createNote({
        title: 'Nouvelle note',
        content: '',
        course_id: courseFilter !== 'all' ? courseFilter : null
      });
      setNotes([newNote, ...notes]);
      setSelectedNote(newNote);
      setIsEditing(true);
      toast({ title: "Note créée" });
    } catch (error: any) {
      toast({ variant: "destructive", title: "Erreur", description: error.message });
    }
  };

  const handleSaveNote = async () => {
    if (!selectedNote) return;
    try {
      const updated = await noteService.updateNote(selectedNote.id, {
        title: selectedNote.title,
        content: selectedNote.content,
        course_id: selectedNote.course_id
      });
      setNotes(notes.map(n => n.id === updated.id ? updated : n));
      setIsEditing(false);
      toast({ title: "Note enregistrée" });
    } catch (error: any) {
      toast({ variant: "destructive", title: "Erreur", description: error.message });
    }
  };

  const handleDeleteNote = async (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (!confirm('Supprimer cette note ?')) return;
    try {
      await noteService.deleteNote(id);
      setNotes(notes.filter(n => n.id !== id));
      if (selectedNote?.id === id) setSelectedNote(null);
      toast({ title: "Note supprimée" });
    } catch (error: any) {
      toast({ variant: "destructive", title: "Erreur", description: error.message });
    }
  };

  const filteredNotes = notes.filter(note => {
    const matchesSearch = note.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         note.content?.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCourse = courseFilter === 'all' || note.course_id === courseFilter;
    return matchesSearch && matchesCourse;
  });

  return (
    <div className="min-h-screen bg-muted/30">
      <AppSidebar />
      <main className="md:ml-72 pb-24 md:pb-8 h-screen flex flex-col">
        <header className="p-4 md:p-6 bg-white border-b border-border flex items-center justify-between">
          <div className="flex items-center gap-4">
            {selectedNote && (
              <Button 
                variant="ghost" 
                size="icon" 
                className="md:hidden" 
                onClick={() => { setSelectedNote(null); setIsEditing(false); }}
              >
                <ChevronLeft className="w-5 h-5" />
              </Button>
            )}
            <h1 className="text-xl font-display font-bold">Espace d'étude</h1>
          </div>
          {!selectedNote && (
            <Button onClick={handleCreateNote} className="rounded-full gap-2">
              <Plus className="w-4 h-4" />
              <span className="hidden sm:inline">Nouvelle note</span>
            </Button>
          )}
          {selectedNote && isEditing && (
            <Button onClick={handleSaveNote} className="rounded-full gap-2 bg-primary">
              <Save className="w-4 h-4" />
              Enregistrer
            </Button>
          )}
        </header>

        <div className="flex-1 flex overflow-hidden">
          {/* Liste des notes */}
          <div className={cn(
            "w-full md:w-80 border-r border-border bg-white overflow-y-auto no-scrollbar",
            selectedNote ? "hidden md:block" : "block"
          )}>
            <div className="p-4 space-y-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input 
                  placeholder="Rechercher..." 
                  className="pl-9 rounded-xl"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <Select value={courseFilter} onValueChange={setCourseFilter}>
                <SelectTrigger className="rounded-xl">
                  <SelectValue placeholder="Toutes les matières" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Toutes les matières</SelectItem>
                  {courses.map(course => (
                    <SelectItem key={course.id} value={course.id}>{course.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="divide-y divide-border">
              {isLoading ? (
                Array(4).fill(0).map((_, i) => (
                  <div key={i} className="p-4 space-y-2 animate-pulse">
                    <div className="h-4 bg-muted rounded w-3/4" />
                    <div className="h-3 bg-muted rounded w-1/2" />
                  </div>
                ))
              ) : filteredNotes.length === 0 ? (
                <div className="p-12 text-center text-muted-foreground">
                  <p className="text-sm">Aucune note trouvée</p>
                </div>
              ) : (
                filteredNotes.map(note => (
                  <button
                    key={note.id}
                    onClick={() => { setSelectedNote(note); setIsEditing(false); }}
                    className={cn(
                      "w-full p-4 text-left transition-colors hover:bg-muted/50 group",
                      selectedNote?.id === note.id ? "bg-primary/5" : ""
                    )}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <h3 className="font-bold text-sm line-clamp-1">{note.title}</h3>
                      <Trash2 
                        className="w-3.5 h-3.5 text-muted-foreground opacity-0 group-hover:opacity-100 hover:text-destructive transition-all" 
                        onClick={(e) => handleDeleteNote(note.id, e)}
                      />
                    </div>
                    <p className="text-xs text-muted-foreground line-clamp-2 mt-1">
                      {note.content || 'Aucun contenu'}
                    </p>
                    <div className="flex items-center gap-2 mt-3">
                      <span className="text-[9px] font-bold uppercase tracking-widest text-muted-foreground/50">
                        {format(new Date(note.updated_at), 'dd MMM', { locale: fr })}
                      </span>
                      {note.course_id && (
                        <div 
                          className="w-1.5 h-1.5 rounded-full" 
                          style={{ backgroundColor: courses.find(c => c.id === note.course_id)?.color }} 
                        />
                      )}
                    </div>
                  </button>
                ))
              )}
            </div>
          </div>

          {/* Éditeur / Visualiseur */}
          <div className={cn(
            "flex-1 bg-white overflow-y-auto",
            !selectedNote ? "hidden md:flex items-center justify-center bg-muted/20" : "block"
          )}>
            {!selectedNote ? (
              <div className="text-center space-y-4 max-w-xs">
                <div className="w-16 h-16 bg-white rounded-3xl shadow-sm flex items-center justify-center mx-auto">
                  <BookOpen className="w-8 h-8 text-primary/20" />
                </div>
                <h3 className="text-lg font-display font-bold">Sélectionnez une note</h3>
                <p className="text-sm text-muted-foreground">
                  Choisissez une note dans la liste pour l'afficher ou en créer une nouvelle.
                </p>
              </div>
            ) : (
              <div className="max-w-3xl mx-auto p-6 md:p-12 space-y-8">
                <div className="space-y-4">
                  <Select 
                    value={selectedNote.course_id || 'none'} 
                    onValueChange={(val) => {
                      const course_id = val === 'none' ? null : val;
                      setSelectedNote({ ...selectedNote, course_id });
                      setIsEditing(true);
                    }}
                  >
                    <SelectTrigger className="w-fit h-7 text-[10px] font-bold uppercase tracking-widest bg-muted border-none rounded-full px-3">
                      <SelectValue placeholder="Matière" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="none">Aucune matière</SelectItem>
                      {courses.map(course => (
                        <SelectItem key={course.id} value={course.id}>{course.name}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  <Input 
                    value={selectedNote.title}
                    onChange={(e) => {
                      setSelectedNote({ ...selectedNote, title: e.target.value });
                      setIsEditing(true);
                    }}
                    className="text-4xl font-display font-black border-none px-0 focus-visible:ring-0 placeholder:opacity-20 h-auto"
                    placeholder="Titre de la note..."
                  />
                </div>

                <Textarea 
                  value={selectedNote.content || ''}
                  onChange={(e) => {
                    setSelectedNote({ ...selectedNote, content: e.target.value });
                    setIsEditing(true);
                  }}
                  className="min-h-[500px] text-lg leading-relaxed border-none px-0 focus-visible:ring-0 resize-none placeholder:opacity-20"
                  placeholder="Commencez à écrire vos révisions ici..."
                />
              </div>
            )}
          </div>
        </div>
      </main>
      <BottomNav />
    </div>
  );
}
