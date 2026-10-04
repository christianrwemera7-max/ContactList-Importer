
"use client";

import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { groupService } from '@/services/groupService';
import { Database } from '@/lib/supabase/types';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { 
  Users, 
  ArrowLeft, 
  Send, 
  Loader2, 
  MessageSquare,
  LogOut,
  MoreVertical
} from 'lucide-react';
import { AppSidebar } from '@/components/layout/AppSidebar';
import { BottomNav } from '@/components/layout/BottomNav';
import { useToast } from '@/hooks/use-toast';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import Link from 'next/link';

type GroupPost = Database['public']['Tables']['group_posts']['Row'] & { profiles: any };

export default function GroupDetailPage() {
  const { id } = useParams();
  const router = useRouter();
  const [posts, setPosts] = useState<GroupPost[]>([]);
  const [newPost, setNewPost] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    fetchPosts();
  }, [id]);

  const fetchPosts = async () => {
    try {
      const data = await groupService.getGroupPosts(id as string);
      setPosts(data);
    } catch (error) {
      console.error('Erreur:', error);
      toast({ variant: "destructive", title: "Accès refusé", description: "Rejoignez le groupe pour voir les messages." });
      router.push('/community');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmitPost = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPost.trim() || isSubmitting) return;

    setIsSubmitting(true);
    try {
      await groupService.createPost(id as string, newPost);
      setNewPost('');
      fetchPosts();
      toast({ title: "Message publié" });
    } catch (error: any) {
      toast({ variant: "destructive", title: "Erreur", description: error.message });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleLeave = async () => {
    if (!confirm("Quitter ce groupe ?")) return;
    try {
      await groupService.leaveGroup(id as string);
      router.push('/community');
      toast({ title: "Vous avez quitté le groupe." });
    } catch (error: any) {
      toast({ variant: "destructive", title: "Erreur", description: error.message });
    }
  };

  return (
    <div className="min-h-screen bg-muted/30">
      <AppSidebar />
      <main className="md:ml-72 pb-24 md:pb-8">
        <div className="max-w-3xl mx-auto p-4 md:p-8 space-y-6">
          <header className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button asChild variant="ghost" size="icon" className="rounded-full">
                <Link href="/community">
                  <ArrowLeft className="w-5 h-5" />
                </Link>
              </Button>
              <h1 className="text-2xl font-display font-bold">Fil du groupe</h1>
            </div>
            <Button variant="ghost" size="sm" className="text-destructive hover:text-destructive hover:bg-destructive/10 rounded-full gap-2" onClick={handleLeave}>
              <LogOut className="w-4 h-4" />
              <span className="hidden sm:inline">Quitter</span>
            </Button>
          </header>

          <Card className="border-border/50 shadow-sm bg-white overflow-hidden">
            <CardContent className="p-4">
              <form onSubmit={handleSubmitPost} className="space-y-3">
                <Textarea 
                  placeholder="Partagez quelque chose avec le groupe..." 
                  className="min-h-[100px] border-none bg-muted/30 focus-visible:ring-0 resize-none rounded-2xl"
                  value={newPost}
                  onChange={(e) => setNewPost(e.target.value)}
                />
                <div className="flex justify-end">
                  <Button type="submit" className="rounded-full gap-2 px-6" disabled={!newPost.trim() || isSubmitting}>
                    {isSubmitting ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
                    Publier
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>

          <div className="space-y-4">
            {isLoading ? (
              Array(3).fill(0).map((_, i) => (
                <div key={i} className="h-32 bg-muted animate-pulse rounded-2xl" />
              ))
            ) : posts.length === 0 ? (
              <div className="py-20 text-center text-muted-foreground bg-white rounded-3xl border border-dashed">
                <MessageSquare className="w-12 h-12 mx-auto opacity-10 mb-4" />
                <p>Aucun message pour le moment. Soyez le premier à publier !</p>
              </div>
            ) : (
              posts.map((post) => (
                <Card key={post.id} className="border-border/50 bg-white">
                  <CardHeader className="p-4 pb-2 flex flex-row items-center justify-between space-y-0">
                    <div className="flex items-center gap-3">
                      <Avatar className="w-8 h-8 border">
                        <AvatarImage src={post.profiles?.photo_url} />
                        <AvatarFallback className="bg-primary/10 text-primary text-[10px] font-bold">
                          {post.profiles?.first_name?.[0]}{post.profiles?.last_name?.[0]}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="text-sm font-bold">{post.profiles?.first_name} {post.profiles?.last_name}</p>
                        <p className="text-[10px] text-muted-foreground uppercase tracking-widest">
                          {format(new Date(post.created_at), 'dd MMM à HH:mm', { locale: fr })}
                        </p>
                      </div>
                    </div>
                    <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground">
                      <MoreVertical className="w-4 h-4" />
                    </Button>
                  </CardHeader>
                  <CardContent className="p-4 pt-0">
                    <p className="text-sm leading-relaxed whitespace-pre-wrap">{post.content}</p>
                  </CardContent>
                </Card>
              ))
            )}
          </div>
        </div>
      </main>
      <BottomNav />
    </div>
  );
}
