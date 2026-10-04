
import { supabase } from '@/lib/supabase/client';
import { Database } from '@/lib/supabase/types';

type Profile = Database['public']['Tables']['profiles']['Row'];
type Connection = Database['public']['Tables']['connections']['Row'];

export const matchService = {
  /**
   * Récupère les profils suggérés (excluant l'utilisateur actuel).
   */
  async getSuggestedProfiles(): Promise<Profile[]> {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return [];

    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .neq('id', user.id)
      .limit(20);
    
    if (error) throw error;
    return data || [];
  },

  /**
   * Envoie une demande de match.
   */
  async sendMatchRequest(receiverId: string): Promise<Connection> {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error('Non authentifié');

    const { data, error } = await supabase
      .from('connections')
      .insert({
        sender_id: user.id,
        receiver_id: receiverId,
        status: 'pending'
      })
      .select()
      .single();
    
    if (error) throw error;
    return data;
  },

  /**
   * Récupère les connexions de l'utilisateur.
   */
  async getUserConnections(): Promise<(Connection & { profiles: Profile })[]> {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return [];

    // On récupère les connexions où l'utilisateur est soit l'envoyeur, soit le receveur
    const { data, error } = await supabase
      .from('connections')
      .select('*, sender:profiles!connections_sender_id_fkey(*), receiver:profiles!connections_receiver_id_fkey(*)')
      .or(`sender_id.eq.${user.id},receiver_id.eq.${user.id}`);
    
    if (error) throw error;

    return data.map((conn: any) => {
      const otherProfile = conn.sender_id === user.id ? conn.receiver : conn.sender;
      return { ...conn, profiles: otherProfile };
    });
  }
};
