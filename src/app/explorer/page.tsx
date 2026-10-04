
"use client";

import React, { useState, useEffect } from 'react';
import { matchService } from '@/services/matchService';
import { Database } from '@/lib/supabase/types';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Input } from '@/components/ui/input';
import { 
  Users, 
  Search, 
  UserPlus, 
  CheckCircle2, 
  Loader2, 
  MapPin, 
  GraduationCap,
  MessageCircle,
  Sparkles,
  Heart
} from 'lucide-react';
import { AppSidebar } from '@/components/layout/AppSidebar';
import { BottomNav } from '@/components/layout/BottomNav';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';

type Profile = Database['public']['Tables']['profiles']['Row'];

export default function ExplorerPage() {
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [connections, setConnections] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [isActionLoading, setIsActionLoading] = useState<string | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [pData, cData] = await Promise.all([
        matchService.getSuggestedProfiles(),
        matchService.getUserConnections()
      ]);
      setProfiles(pData);
      setConnections(cData);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleMatch = async (profileId: string) => {
    setIsActionLoading(profileId);
    try {
      await matchService.sendMatchRequest(profileId);
      toast({ 
        title: "Demande envoyée !", 
        description: "Un signal a été envoyé à votre futur partenaire." 
      });
      fetchData(); // Rafraîchir pour voir le statut
    } catch (error: any) {
      toast({ variant: "destructive", title: "Erreur", description: "Vous avez déjà envoyé une demande à cette personne." });
    } finally {
      setIsActionLoading(null);
    }
  };

  const getStatus = (profileId: string) => {
    const conn = connections.find(c => c.sender_id === profileId || c.receiver_id === profileId);
    return conn ? conn.status : null;
  };

  const filteredProfiles = profiles.filter(p => 
    (p.first_name + ' ' + p.last_name).toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.university?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.faculty?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-muted/30">
      <AppSidebar />
      <main className="md:ml-72 pb-24 md:pb-8">
        <div className="max-w-5xl mx-auto p-4 md:p-8 space-y-8">
          <header className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-display font-bold text-foreground">Explorer</h1>
                <p className="text-muted-foreground">Trouvez des partenaires d'étude motivés.</p>
              </div>
              <div className="hidden sm:flex -space-x-3">
                {profiles.slice(0, 5).map((p, i) => (
                  <Avatar key={i} className="border-4 border-background w-10 h-10">
                    <AvatarImage src={p.photo_url || ''} />
                    <AvatarFallback className="bg-primary/10 text-[10px]">{p.first_name?.[0]}</AvatarFallback>
                  </Avatar>
                ))}
                <div className="w-10 h-10 rounded-full bg-primary/10 border-4 border-background flex items-center justify-center text-[10px] font-black text-primary">
                  +
                </div>
              </div>
            </div>

            <div className="relative max-w-2xl">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input 
                placeholder="Rechercher par nom, université ou faculté..." 
                className="pl-12 h-14 rounded-2xl bg-white border-none shadow-sm text-base focus-visible:ring-primary"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </header>

          <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {isLoading ? (
              Array(6).fill(0).map((_, i) => (
                <div key={i} className="h-80 bg-muted animate-pulse rounded-[2.5rem]" />
              ))
            ) : filteredProfiles.length === 0 ? (
              <div className="col-span-full py-20 text-center text-muted-foreground bg-white rounded-[2.5rem] border border-dashed">
                <Users className="w-12 h-12 mx-auto opacity-10 mb-4" />
                <p>Aucun étudiant trouvé pour cette recherche.</p>
              </div>
            ) : (
              filteredProfiles.map((profile) => {
                const status = getStatus(profile.id);
                const isPending = status === 'pending';
                const isAccepted = status === 'accepted';

                return (
                  <Card key={profile.id} className="group relative overflow-hidden border-none shadow-sm hover:shadow-xl transition-all duration-500 rounded-[2.5rem] bg-white">
                    <div className="h-24 bg-gradient-to-br from-primary/5 to-primary/10" />
                    
                    <CardContent className="p-6 -mt-12 flex flex-col items-center text-center">
                      <div className="relative mb-4">
                        <Avatar className="w-24 h-24 border-4 border-white shadow-lg">
                          <AvatarImage src={profile.photo_url || ''} />
                          <AvatarFallback className="text-2xl font-black bg-primary/5 text-primary">
                            {profile.first_name?.[0]}{profile.last_name?.[0]}
                          </AvatarFallback>
                        </Avatar>
                        <div className="absolute bottom-1 right-1 w-6 h-6 bg-green-500 border-4 border-white rounded-full" />
                      </div>

                      <div className="space-y-1">
                        <h3 className="text-xl font-display font-bold">
                          {profile.first_name} {profile.last_name}
                        </h3>
                        <div className="flex flex-col gap-1 text-sm text-muted-foreground font-medium">
                          <span className="flex items-center justify-center gap-1.5">
                            <MapPin className="w-3 h-3" />
                            {profile.university || 'Université non précisée'}
                          </span>
                          <span className="flex items-center justify-center gap-1.5">
                            <GraduationCap className="w-3 h-3" />
                            {profile.faculty || 'Domaine libre'} • {profile.study_level}
                          </span>
                        </div>
                      </div>

                      <div className="flex gap-2 mt-6">
                        <div className="px-3 py-1 bg-muted rounded-full text-[10px] font-black uppercase tracking-widest">Sérieux</div>
                        <div className="px-3 py-1 bg-primary/10 text-primary rounded-full text-[10px] font-black uppercase tracking-widest">Matinal</div>
                      </div>
                    </CardContent>

                    <CardFooter className="p-6 pt-0">
                      {isAccepted ? (
                        <Button className="w-full h-12 rounded-2xl gap-2 font-bold bg-green-500 hover:bg-green-600">
                          <MessageCircle className="w-4 h-4" />
                          Contacter
                        </Button>
                      ) : isPending ? (
                        <Button variant="secondary" className="w-full h-12 rounded-2xl gap-2 font-bold" disabled>
                          <Loader2 className="w-4 h-4 animate-spin" />
                          En attente...
                        </Button>
                      ) : (
                        <Button 
                          onClick={() => handleMatch(profile.id)}
                          className="w-full h-12 rounded-2xl gap-2 font-bold group"
                          disabled={isActionLoading === profile.id}
                        >
                          {isActionLoading === profile.id ? (
                            <Loader2 className="w-4 h-4 animate-spin" />
                          ) : (
                            <>
                              <Sparkles className="w-4 h-4 fill-current group-hover:scale-125 transition-transform" />
                              Match & Étude
                            </>
                          )}
                        </Button>
                      )}
                    </CardFooter>
                  </Card>
                );
              })
            )}
          </section>
        </div>
      </main>
      <BottomNav />
    </div>
  );
}
