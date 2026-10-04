
import { supabase } from '@/lib/supabase/client';
import { Database } from '@/lib/supabase/types';

type Group = Database['public']['Tables']['groups']['Row'];
type GroupMember = Database['public']['Tables']['group_members']['Row'];
type GroupPost = Database['public']['Tables']['group_posts']['Row'];

export const groupService = {
  /**
   * Récupère tous les groupes disponibles.
   */
  async getGroups(): Promise<Group[]> {
    const { data, error } = await supabase
      .from('groups')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (error) throw error;
    return data || [];
  },

  /**
   * Récupère les groupes dont l'utilisateur est membre.
   */
  async getUserGroups(): Promise<Group[]> {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return [];

    const { data, error } = await supabase
      .from('group_members')
      .select('groups (*)')
      .eq('user_id', user.id);
    
    if (error) throw error;
    return data?.map(item => item.groups as unknown as Group) || [];
  },

  /**
   * Crée un nouveau groupe.
   */
  async createGroup(name: string, description: string): Promise<Group> {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error('Non authentifié');

    const { data: group, error: groupError } = await supabase
      .from('groups')
      .insert({
        name,
        description,
        created_by: user.id
      })
      .select()
      .single();
    
    if (groupError) throw groupError;

    // Ajouter le créateur comme admin
    const { error: memberError } = await supabase
      .from('group_members')
      .insert({
        group_id: group.id,
        user_id: user.id,
        role: 'admin'
      });

    if (memberError) throw memberError;

    return group;
  },

  /**
   * Rejoindre un groupe.
   */
  async joinGroup(groupId: string): Promise<void> {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error('Non authentifié');

    const { error } = await supabase
      .from('group_members')
      .insert({
        group_id: groupId,
        user_id: user.id,
        role: 'member'
      });
    
    if (error) throw error;
  },

  /**
   * Quitter un groupe.
   */
  async leaveGroup(groupId: string): Promise<void> {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error('Non authentifié');

    const { error } = await supabase
      .from('group_members')
      .delete()
      .eq('group_id', groupId)
      .eq('user_id', user.id);
    
    if (error) throw error;
  },

  /**
   * Récupère les posts d'un groupe.
   */
  async getGroupPosts(groupId: string): Promise<(GroupPost & { profiles: any })[]> {
    const { data, error } = await supabase
      .from('group_posts')
      .select('*, profiles (first_name, last_name, photo_url)')
      .eq('group_id', groupId)
      .order('created_at', { ascending: false });
    
    if (error) throw error;
    return data || [];
  },

  /**
   * Publier un message dans un groupe.
   */
  async createPost(groupId: string, content: string): Promise<GroupPost> {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error('Non authentifié');

    const { data, error } = await supabase
      .from('group_posts')
      .insert({
        group_id: groupId,
        user_id: user.id,
        content
      })
      .select()
      .single();
    
    if (error) throw error;
    return data;
  }
};
