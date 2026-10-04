"use client";

import { useApp } from '@/lib/store';
import { userService } from '@/services/userService';
import { Database } from '@/lib/supabase/types';
import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';

type Profile = Database['public']['Tables']['profiles']['Row'];

/**
 * Hook pour gérer le profil utilisateur connecté.
 */
export function useProfile() {
  const { state, setProfile } = useApp();
  const [isUpdating, setIsUpdating] = useState(false);
  const { toast } = useToast();

  const updateProfile = async (updates: Partial<Profile>) => {
    if (!state.user) return;
    
    setIsUpdating(true);
    try {
      const updatedProfile = await userService.updateProfile(state.user.id, updates);
      setProfile(updatedProfile);
      toast({
        title: "Profil mis à jour",
        description: "Vos modifications ont été enregistrées avec succès.",
      });
      return updatedProfile;
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Erreur",
        description: error.message || "Impossible de mettre à jour le profil.",
      });
      throw error;
    } finally {
      setIsUpdating(false);
    }
  };

  return {
    profile: state.profile,
    isLoading: state.isLoading,
    isUpdating,
    updateProfile,
    refreshProfile: async () => {
      if (state.user) {
        const p = await userService.getProfile(state.user.id);
        setProfile(p);
      }
    }
  };
}
