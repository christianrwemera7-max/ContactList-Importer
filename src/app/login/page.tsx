
"use client";

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useApp } from '@/lib/store';
import { authService } from '@/services/authService';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';

export default function LoginPage() {
  const [isLoading, setIsLoading] = useState(false);
  const { state } = useApp();
  const router = useRouter();
  const { toast } = useToast();

  useEffect(() => {
    if (state.user && !state.isLoading) {
      router.push('/dashboard');
    }
  }, [state.user, state.isLoading, router]);

  const handleSignIn = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    const formData = new FormData(e.currentTarget);
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;

    try {
      await authService.signIn(email, password);
      toast({ title: "Accès autorisé", description: "Bienvenue sur votre portail." });
      router.push('/dashboard');
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Échec d'authentification",
        description: error.message || "Vérifiez vos accès.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignUp = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    const formData = new FormData(e.currentTarget);
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;
    const firstName = formData.get('firstName') as string;
    const lastName = formData.get('lastName') as string;

    try {
      await authService.signUp(email, password, firstName, lastName);
      toast({
        title: "Compte créé",
        description: "Confirmez votre email pour finaliser l'accès.",
      });
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Échec de création",
        description: error.message || "Impossible de générer le profil.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F8F7FC] p-6">
      <Card className="w-full max-w-md shadow-2xl border-none bg-white rounded-[48px] overflow-hidden">
        <CardHeader className="text-center space-y-4 pt-12">
          <div className="flex justify-center mb-4">
            <span className="text-4xl font-display font-black text-primary lowercase tracking-tighter">neostud</span>
          </div>
          <CardTitle className="text-2xl font-display font-black tracking-tight text-foreground uppercase">Portail d'accès</CardTitle>
          <p className="text-[10px] font-black uppercase tracking-[0.3em] text-muted-foreground">Authentification requise</p>
        </CardHeader>
        <CardContent className="px-8 pb-12">
          <Tabs defaultValue="login" className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-10 bg-muted/30 p-1.5 rounded-[24px] h-14">
              <TabsTrigger value="login" className="rounded-[20px] font-black uppercase text-[10px] tracking-widest">Connexion</TabsTrigger>
              <TabsTrigger value="register" className="rounded-[20px] font-black uppercase text-[10px] tracking-widest">Inscription</TabsTrigger>
            </TabsList>
            
            <TabsContent value="login">
              <form onSubmit={handleSignIn} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-[10px] font-black uppercase tracking-widest ml-1">Email</Label>
                  <Input id="email" name="email" type="email" placeholder="nom@etudiant.fr" required className="h-14 rounded-2xl bg-muted/20 border-none px-6" />
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between items-center px-1">
                    <Label htmlFor="password" title="Mot de passe" className="text-[10px] font-black uppercase tracking-widest">Code</Label>
                    <button type="button" className="text-[9px] font-black uppercase text-primary tracking-widest">Oublié</button>
                  </div>
                  <Input id="password" name="password" type="password" required className="h-14 rounded-2xl bg-muted/20 border-none px-6" />
                </div>
                <Button type="submit" className="w-full h-16 rounded-3xl bg-primary text-white font-black uppercase tracking-[0.2em] text-xs mt-4" disabled={isLoading}>
                  {isLoading ? "Authentification..." : "Entrer"}
                </Button>
              </form>
            </TabsContent>
            
            <TabsContent value="register">
              <form onSubmit={handleSignUp} className="space-y-5">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="firstName" className="text-[10px] font-black uppercase tracking-widest ml-1">Prénom</Label>
                    <Input id="firstName" name="firstName" placeholder="Jean" required className="h-14 rounded-2xl bg-muted/20 border-none px-6" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName" className="text-[10px] font-black uppercase tracking-widest ml-1">Nom</Label>
                    <Input id="lastName" name="lastName" placeholder="Dupont" required className="h-14 rounded-2xl bg-muted/20 border-none px-6" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="reg-email" className="text-[10px] font-black uppercase tracking-widest ml-1">Email</Label>
                  <Input id="reg-email" name="email" type="email" placeholder="nom@etudiant.fr" required className="h-14 rounded-2xl bg-muted/20 border-none px-6" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="reg-password" title="Mot de passe" className="text-[10px] font-black uppercase tracking-widest ml-1">Code</Label>
                  <Input id="reg-password" name="password" type="password" required minLength={6} className="h-14 rounded-2xl bg-muted/20 border-none px-6" />
                </div>
                <Button type="submit" className="w-full h-16 rounded-3xl bg-primary text-white font-black uppercase tracking-[0.2em] text-xs mt-4" disabled={isLoading}>
                  {isLoading ? "Création..." : "Créer le profil"}
                </Button>
              </form>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}
