import { supabase } from '@/lib/supabase/client';
import { userService } from './userService';

export const authService = {
  /**
   * Inscrit un utilisateur et initialise son profil dans Supabase.
   */
  async signUp(email: string, password: string, firstName: string, lastName: string) {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          first_name: firstName,
          last_name: lastName,
        }
      }
    });

    if (error) throw error;
    
    // Création immédiate du profil dans la table public.profiles
    if (data.user) {
      try {
        await userService.upsertProfile({
          id: data.user.id,
          first_name: firstName,
          last_name: lastName,
          email: email,
        });
      } catch (profileError: any) {
        console.warn('Erreur lors de la création du profil :', profileError.message);
      }
    }
    
    return data;
  },

  /**
   * Connecte l'utilisateur.
   */
  async signIn(email: string, password: string) {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) throw error;
    return data;
  },

  /**
   * Déconnecte l'utilisateur.
   */
  async signOut() {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
  },

  /**
   * Demande de réinitialisation de mot de passe.
   */
  async resetPassword(email: string) {
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${typeof window !== 'undefined' ? window.location.origin : ''}/login?type=recovery`,
    });
    if (error) throw error;
  }
};
