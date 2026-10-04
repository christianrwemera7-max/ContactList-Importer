
"use client";

import React, { useState, useEffect } from 'react';
import { documentService } from '@/services/documentService';
import { courseService } from '@/services/courseService';
import { Database } from '@/lib/supabase/types';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { 
  FileText, 
  Upload, 
  Download, 
  Trash2, 
  Loader2, 
  Plus, 
  File,
  Search,
  ExternalLink
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
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';

type Document = Database['public']['Tables']['documents']['Row'];
type Course = Database['public']['Tables']['courses']['Row'];

export default function DocumentsPage() {
  const [documents, setDocuments] = useState<Document[]>([]);
  const [courses, setCourses] = useState<Course[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isUploading, setIsUploading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCourse, setSelectedCourse] = useState<string>('none');
  const { toast } = useToast();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [docsData, coursesData] = await Promise.all([
        documentService.getDocuments(),
        courseService.getCourses()
      ]);
      setDocuments(docsData);
      setCourses(coursesData);
    } catch (error) {
      console.error('Erreur chargement:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Limite de taille (ex: 5MB)
    if (file.size > 5 * 1024 * 1024) {
      toast({ 
        variant: "destructive", 
        title: "Fichier trop volumineux", 
        description: "La taille maximale est de 5 Mo." 
      });
      return;
    }

    setIsUploading(true);
    try {
      const newDoc = await documentService.uploadDocument(file, selectedCourse);
      setDocuments([newDoc, ...documents]);
      toast({ title: "Document ajouté" });
    } catch (error: any) {
      toast({ variant: "destructive", title: "Erreur", description: error.message });
    } finally {
      setIsUploading(false);
      e.target.value = ''; // Reset input
    }
  };

  const handleDownload = async (doc: Document) => {
    try {
      const url = await documentService.getDownloadUrl(doc.file_path);
      window.open(url, '_blank');
    } catch (error: any) {
      toast({ variant: "destructive", title: "Erreur", description: error.message });
    }
  };

  const handleDelete = async (doc: Document) => {
    if (!confirm('Supprimer ce document ?')) return;
    try {
      await documentService.deleteDocument(doc.id, doc.file_path);
      setDocuments(documents.filter(d => d.id !== doc.id));
      toast({ title: "Document supprimé" });
    } catch (error: any) {
      toast({ variant: "destructive", title: "Erreur", description: error.message });
    }
  };

  const filteredDocs = documents.filter(doc => 
    doc.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const formatSize = (bytes: number | null) => {
    if (!bytes) return '0 B';
    const k = 1024;
    const sizes = ['B', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <div className="min-h-screen bg-muted/30">
      <AppSidebar />
      <main className="md:ml-72 pb-24 md:pb-8">
        <div className="max-w-5xl mx-auto p-4 md:p-8 space-y-8">
          <header className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h1 className="text-3xl font-display font-bold text-foreground">Mes Documents</h1>
              <p className="text-muted-foreground">Stockez vos cours, fiches et ressources PDF.</p>
            </div>
            
            <div className="flex items-center gap-3">
              <Select value={selectedCourse} onValueChange={setSelectedCourse}>
                <SelectTrigger className="w-[180px] rounded-xl bg-white">
                  <SelectValue placeholder="Choisir une matière" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="none">Toutes les matières</SelectItem>
                  {courses.map(c => (
                    <SelectItem key={c.id} value={c.id}>{c.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <div className="relative">
                <Input 
                  type="file" 
                  className="hidden" 
                  id="file-upload" 
                  onChange={handleFileUpload}
                  disabled={isUploading}
                />
                <Button asChild className="rounded-full gap-2 shadow-lg" disabled={isUploading}>
                  <label htmlFor="file-upload" className="cursor-pointer">
                    {isUploading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Upload className="w-4 h-4" />}
                    Ajouter
                  </label>
                </Button>
              </div>
            </div>
          </header>

          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input 
              placeholder="Rechercher un document..." 
              className="pl-9 rounded-xl bg-white border-none shadow-sm"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {isLoading ? (
              Array(6).fill(0).map((_, i) => (
                <div key={i} className="h-48 bg-muted animate-pulse rounded-2xl" />
              ))
            ) : filteredDocs.length === 0 ? (
              <Card className="col-span-full border-dashed py-16 text-center bg-muted/20">
                <CardContent className="space-y-3">
                  <FileText className="w-16 h-16 text-muted-foreground mx-auto opacity-20" />
                  <div className="space-y-1">
                    <p className="font-bold text-muted-foreground">Aucun document trouvé</p>
                    <p className="text-sm text-muted-foreground">Importez votre premier fichier pour commencer.</p>
                  </div>
                </CardContent>
              </Card>
            ) : (
              filteredDocs.map((doc) => {
                const course = courses.find(c => c.id === doc.course_id);
                return (
                  <Card key={doc.id} className="group hover:shadow-md transition-all border-border/50 overflow-hidden bg-white">
                    <div className="p-4 border-b border-border/50 flex items-center gap-3">
                      <div className="p-2 bg-primary/5 rounded-lg">
                        <FileText className="w-6 h-6 text-primary" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-bold text-sm truncate">{doc.name}</h3>
                        <p className="text-[10px] text-muted-foreground uppercase tracking-widest font-bold">
                          {formatSize(doc.file_size)} • {doc.file_type?.split('/')[1] || 'FILE'}
                        </p>
                      </div>
                    </div>
                    <CardContent className="p-4 space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] text-muted-foreground font-bold uppercase tracking-widest">
                          Ajouté le {format(new Date(doc.created_at), 'dd MMM yyyy', { locale: fr })}
                        </span>
                        {course && (
                          <div className="flex items-center gap-1.5 px-2 py-0.5 bg-muted rounded-full">
                            <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: course.color }} />
                            <span className="text-[9px] font-black uppercase tracking-tighter text-muted-foreground">{course.name}</span>
                          </div>
                        )}
                      </div>
                      <div className="grid grid-cols-2 gap-2">
                        <Button 
                          variant="secondary" 
                          size="sm" 
                          className="rounded-xl text-xs gap-2"
                          onClick={() => handleDownload(doc)}
                        >
                          <Download className="w-3.5 h-3.5" />
                          Ouvrir
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="rounded-xl text-xs gap-2 text-destructive hover:text-destructive hover:bg-destructive/10"
                          onClick={() => handleDelete(doc)}
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                          Supprimer
                        </Button>
                      </div>
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
