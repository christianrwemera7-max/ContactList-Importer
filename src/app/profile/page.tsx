"use client";

import React from 'react';
import { useProfile } from '@/hooks/useProfile';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Loader2, User, School, BookOpen, GraduationCap } from 'lucide-react';
import { AppSidebar } from '@/components/layout/AppSidebar';
import { BottomNav } from '@/components/layout/BottomNav';

export default function ProfilePage() {
  const { profile, isUpdating, updateProfile } = useProfile();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
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
                {profile.first_name?.[0]}{profile.last_name?.[0]}
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
            <div className="md:col-span-2 space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-xl font-display">Informations Personnelles</CardTitle>
                  <CardDescription>Mettez à jour vos informations de profil étudiant.</CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-4">
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
                        <Input id="faculty" name="faculty" defaultValue={profile.faculty || ''} placeholder="Ex: Médecine" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="study_level">Niveau d'études</Label>
                        <Input id="study_level" name="study_level" defaultValue={profile.study_level || ''} placeholder="Ex: Master 1" />
                      </div>
                    </div>
                    <Button type="submit" className="w-full md:w-auto" disabled={isUpdating}>
                      {isUpdating && <Loader2 className="w-4 h-4 animate-spin mr-2" />}
                      Sauvegarder les modifications
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>

            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg font-display">Statistiques</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <StatItem label="Cours suivis" value="0" icon={BookOpen} color="text-blue-500" />
                  <StatItem label="Défis remportés" value="0" icon={User} color="text-orange" />
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
