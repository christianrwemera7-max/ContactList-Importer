import { supabase } from '@/lib/supabase/client';
import { Database } from '@/lib/supabase/types';

type Profile = Database['public']['Tables']['profiles']['Row'];

export const userService = {
  /**
   * Récupère le profil complet d'un utilisateur.
   */
  async getProfile(userId: string): Promise<Profile | null> {
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', userId)
      .single();
    
    if (error) {
      if (error.code === 'PGRST116') return null; // Profil inexistant
      throw error;
    }
    return data;
  },

  /**
   * Met à jour les informations du profil.
   */
  async updateProfile(userId: string, updates: Partial<Profile>): Promise<Profile> {
    const { data, error } = await supabase
      .from('profiles')
      .update({ 
        ...updates, 
        updated_at: new Date().toISOString() 
      })
      .eq('id', userId)
      .select()
      .single();
    
    if (error) throw error;
    return data;
  },

  /**
   * Crée un profil initial (utilisé généralement après l'inscription).
   */
  async createProfile(profile: Database['public']['Tables']['profiles']['Insert']): Promise<Profile> {
    const { data, error } = await supabase
      .from('profiles')
      .upsert(profile)
      .select()
      .single();
    
    if (error) throw error;
    return data;
  }
};
