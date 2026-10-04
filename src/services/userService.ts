
import { supabase } from '@/lib/supabase/client';
import { Database } from '@/lib/supabase/types';
import { uploadToCloudinary } from '@/app/actions/cloudinary';

type Profile = Database['public']['Tables']['profiles']['Row'];

export const userService = {
  /**
   * Récupère le profil complet d'un utilisateur par son ID.
   */
  async getProfile(userId: string): Promise<Profile | null> {
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', userId)
      .single();
    
    if (error) {
      if (error.code === 'PGRST116') return null;
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
   * Upload une photo de profil vers Cloudinary et met à jour le profil.
   */
  async updateProfilePhoto(userId: string, file: File): Promise<string> {
    const base64Data = await new Promise<string>((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });

    const result = await uploadToCloudinary(base64Data, `profile_${userId}`, 'neostud/profiles');
    
    await this.updateProfile(userId, { photo_url: result.url });
    
    return result.url;
  },

  /**
   * Crée ou met à jour le profil initial.
   */
  async upsertProfile(profile: Database['public']['Tables']['profiles']['Insert']): Promise<Profile> {
    const { data, error } = await supabase
      .from('profiles')
      .upsert(profile)
      .select()
      .single();
    
    if (error) throw error;
    return data;
  }
};
