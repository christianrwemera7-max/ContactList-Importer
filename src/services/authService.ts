import { supabase } from '@/lib/supabase/client';

export const authService = {
  /**
   * Inscrit un nouvel utilisateur et prépare son profil.
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
    
    // Note: Le trigger SQL dans Supabase devrait idéalement gérer la création du profil,
    // mais nous gardons cette logique ici pour assurer la cohérence immédiate.
    if (data.user) {
      const { error: profileError } = await supabase.from('profiles').upsert({
        id: data.user.id,
        first_name: firstName,
        last_name: lastName,
        email: email,
        updated_at: new Date().toISOString(),
      });
      
      if (profileError) {
        console.warn('Profile creation failed or table does not exist yet:', profileError.message);
      }
    }
    
    return data;
  },

  /**
   * Connecte un utilisateur existant.
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
   * Déconnecte l'utilisateur actuel.
   */
  async signOut() {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
  },

  /**
   * Demande une réinitialisation de mot de passe.
   */
  async resetPassword(email: string) {
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${typeof window !== 'undefined' ? window.location.origin : ''}/login?type=recovery`,
    });
    if (error) throw error;
  },

  /**
   * Récupère l'utilisateur actuel.
   */
  async getCurrentUser() {
    const { data: { user } } = await supabase.auth.getUser();
    return user;
  },

  /**
   * Récupère la session actuelle.
   */
  async getSession() {
    const { data: { session } } = await supabase.auth.getSession();
    return session;
  }
};
