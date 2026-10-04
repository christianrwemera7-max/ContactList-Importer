
import { supabase } from '@/lib/supabase/client';
import { Database } from '@/lib/supabase/types';

type Challenge = Database['public']['Tables']['challenges']['Row'];
type Participation = Database['public']['Tables']['challenge_participants']['Row'];

export const challengeService = {
  /**
   * Récupère tous les défis disponibles.
   */
  async getChallenges(): Promise<Challenge[]> {
    const { data, error } = await supabase
      .from('challenges')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (error) throw error;
    return data || [];
  },

  /**
   * Récupère les participations de l'utilisateur.
   */
  async getUserParticipations(): Promise<Participation[]> {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return [];

    const { data, error } = await supabase
      .from('challenge_participants')
      .select('*')
      .eq('user_id', user.id);
    
    if (error) throw error;
    return data || [];
  },

  /**
   * Rejoindre un défi.
   */
  async joinChallenge(challengeId: string): Promise<Participation> {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error('Non authentifié');

    const { data, error } = await supabase
      .from('challenge_participants')
      .insert({
        challenge_id: challengeId,
        user_id: user.id,
        status: 'in_progress'
      })
      .select()
      .single();
    
    if (error) throw error;
    return data;
  },

  /**
   * Marquer un défi comme terminé.
   */
  async completeChallenge(challengeId: string): Promise<Participation> {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error('Non authentifié');

    const { data, error } = await supabase
      .from('challenge_participants')
      .update({
        status: 'completed',
        completed_at: new Date().toISOString()
      })
      .eq('challenge_id', challengeId)
      .eq('user_id', user.id)
      .select()
      .single();
    
    if (error) throw error;
    return data;
  }
};
