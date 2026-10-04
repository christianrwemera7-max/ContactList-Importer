
"use client";

import React, { useState, useEffect } from 'react';
import { groupService } from '@/services/groupService';
import { Database } from '@/lib/supabase/types';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { 
  Users, 
  Search, 
  Plus, 
  ArrowRight, 
  Loader2, 
  MessageSquare,
  Globe,
  Lock
} from 'lucide-react';
import { AppSidebar } from '@/components/layout/AppSidebar';
import { BottomNav } from '@/components/layout/BottomNav';
import { useToast } from '@/hooks/use-toast';
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogFooter, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger 
} from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Link from 'next/link';

type Group = Database['public']['Tables']['groups']['Row'];

export default function CommunityPage() {
  const [allGroups, setAllGroups] = useState<Group[]>([]);
  const [userGroups, setUserGroups] = useState<Group[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [all, mine] = await Promise.all([
        groupService.getGroups(),
        groupService.getUserGroups()
      ]);
      setAllGroups(all);
      setUserGroups(mine);
    } catch (error) {
      console.error('Erreur chargement:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCreateGroup = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const name = formData.get('name') as string;
    const description = formData.get('description') as string;

    try {
      const newGroup = await groupService.createGroup(name, description);
      setAllGroups([newGroup, ...allGroups]);
      setUserGroups([newGroup, ...userGroups]);
      setIsDialogOpen(false);
      toast({ title: "Groupe créé !" });
    } catch (error: any) {
      toast({ variant: "destructive", title: "Erreur", description: error.message });
    }
  };

  const handleJoinGroup = async (groupId: string) => {
    try {
      await groupService.joinGroup(groupId);
      const group = allGroups.find(g => g.id === groupId);
      if (group) setUserGroups([...userGroups, group]);
      toast({ title: "Vous avez rejoint le groupe !" });
    } catch (error: any) {
      toast({ variant: "destructive", title: "Erreur", description: error.message });
    }
  };

  const filteredGroups = allGroups.filter(g => 
    g.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-muted/30">
      <AppSidebar />
      <main className="md:ml-72 pb-24 md:pb-8">
        <div className="max-w-5xl mx-auto p-4 md:p-8 space-y-8">
          <header className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h1 className="text-3xl font-display font-bold text-foreground">Communauté</h1>
              <p className="text-muted-foreground">Rejoignez des groupes d'étude et collaborez.</p>
            </div>
            
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button className="rounded-full gap-2 shadow-lg">
                  <Plus className="w-4 h-4" />
                  Créer un groupe
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Créer un groupe d'étude</DialogTitle>
                  <DialogDescription>Rassemblez des étudiants autour d'un sujet commun.</DialogDescription>
                </DialogHeader>
                <form onSubmit={handleCreateGroup} className="space-y-4 py-4">
                  <div className="space-y-2">
                    <label className="text-sm font-bold uppercase tracking-widest text-muted-foreground">Nom du groupe</label>
                    <Input name="name" placeholder="Ex: Master Droit 2024, Groupe de révision Bio..." required />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold uppercase tracking-widest text-muted-foreground">Description</label>
                    <Input name="description" placeholder="Quel est l'objectif de ce groupe ?" />
                  </div>
                  <DialogFooter>
                    <Button type="submit" className="w-full">Créer le groupe</Button>
                  </DialogFooter>
                </form>
              </DialogContent>
            </Dialog>
          </header>

          <Tabs defaultValue="all" className="space-y-6">
            <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
              <TabsList className="bg-white rounded-full p-1 shadow-sm h-12">
                <TabsTrigger value="all" className="rounded-full px-6">Tous les groupes</TabsTrigger>
                <TabsTrigger value="mine" className="rounded-full px-6">Mes groupes</TabsTrigger>
              </TabsList>
              
              <div className="relative w-full sm:w-64">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input 
                  placeholder="Rechercher..." 
                  className="pl-9 rounded-xl bg-white border-none shadow-sm"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>

            <TabsContent value="all" className="mt-0">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {isLoading ? (
                  Array(6).fill(0).map((_, i) => (
                    <div key={i} className="h-48 bg-muted animate-pulse rounded-2xl" />
                  ))
                ) : filteredGroups.length === 0 ? (
                  <div className="col-span-full py-20 text-center text-muted-foreground bg-white rounded-3xl border border-dashed">
                    <Globe className="w-12 h-12 mx-auto opacity-10 mb-4" />
                    <p>Aucun groupe trouvé.</p>
                  </div>
                ) : (
                  filteredGroups.map(group => {
                    const isMember = userGroups.some(mg => mg.id === group.id);
                    return (
                      <Card key={group.id} className="group hover:shadow-md transition-all border-border/50 bg-white overflow-hidden">
                        <div className="h-24 bg-gradient-to-br from-primary/10 to-primary/5 p-4 flex items-end">
                          <div className="w-12 h-12 rounded-2xl bg-white shadow-sm flex items-center justify-center">
                            <Users className="w-6 h-6 text-primary" />
                          </div>
                        </div>
                        <CardHeader className="p-4">
                          <CardTitle className="text-lg font-display truncate">{group.name}</CardTitle>
                          <CardDescription className="line-clamp-2 h-10">{group.description}</CardDescription>
                        </CardHeader>
                        <CardContent className="p-4 pt-0">
                          {isMember ? (
                            <Button asChild variant="secondary" className="w-full rounded-xl gap-2 font-bold uppercase tracking-widest text-xs">
                              <Link href={`/groups/${group.id}`}>
                                Voir le feed
                                <ArrowRight className="w-4 h-4" />
                              </Link>
                            </Button>
                          ) : (
                            <Button onClick={() => handleJoinGroup(group.id)} className="w-full rounded-xl gap-2 font-bold uppercase tracking-widest text-xs">
                              Rejoindre
                            </Button>
                          )}
                        </CardContent>
                      </Card>
                    );
                  })
                )}
              </div>
            </TabsContent>

            <TabsContent value="mine" className="mt-0">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {userGroups.length === 0 ? (
                  <div className="col-span-full py-20 text-center text-muted-foreground bg-white rounded-3xl border border-dashed">
                    <Users className="w-12 h-12 mx-auto opacity-10 mb-4" />
                    <p>Vous n'avez rejoint aucun groupe.</p>
                  </div>
                ) : (
                  userGroups.map(group => (
                    <Card key={group.id} className="group hover:shadow-md transition-all border-border/50 bg-white overflow-hidden">
                      <div className="h-24 bg-gradient-to-br from-primary/10 to-primary/5 p-4 flex items-end">
                        <div className="w-12 h-12 rounded-2xl bg-white shadow-sm flex items-center justify-center">
                          <Users className="w-6 h-6 text-primary" />
                        </div>
                      </div>
                      <CardHeader className="p-4">
                        <CardTitle className="text-lg font-display truncate">{group.name}</CardTitle>
                        <CardDescription className="line-clamp-2 h-10">{group.description}</CardDescription>
                      </CardHeader>
                      <CardContent className="p-4 pt-0">
                        <Button asChild variant="secondary" className="w-full rounded-xl gap-2 font-bold uppercase tracking-widest text-xs">
                          <Link href={`/groups/${group.id}`}>
                            Voir le feed
                            <ArrowRight className="w-4 h-4" />
                          </Link>
                        </Button>
                      </CardContent>
                    </Card>
                  ))
                )}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>
      <BottomNav />
    </div>
  );
}
