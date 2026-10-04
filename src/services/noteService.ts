import { supabase } from '@/lib/supabase/client';
import { Database } from '@/lib/supabase/types';

type Note = Database['public']['Tables']['notes']['Row'];
type NoteInsert = Database['public']['Tables']['notes']['Insert'];
type NoteUpdate = Database['public']['Tables']['notes']['Update'];

export const noteService = {
  /**
   * Récupère toutes les notes de l'utilisateur.
   */
  async getNotes(courseId?: string): Promise<Note[]> {
    let query = supabase
      .from('notes')
      .select('*')
      .order('updated_at', { ascending: false });
    
    if (courseId) {
      query = query.eq('course_id', courseId);
    }
    
    const { data, error } = await query;
    if (error) throw error;
    return data || [];
  },

  /**
   * Récupère une note par son ID.
   */
  async getNoteById(id: string): Promise<Note> {
    const { data, error } = await supabase
      .from('notes')
      .select('*')
      .eq('id', id)
      .single();
    
    if (error) throw error;
    return data;
  },

  /**
   * Crée une nouvelle note.
   */
  async createNote(note: Omit<NoteInsert, 'user_id'>): Promise<Note> {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error('Non authentifié');

    const { data, error } = await supabase
      .from('notes')
      .insert({
        ...note,
        user_id: user.id
      })
      .select()
      .single();
    
    if (error) throw error;
    return data;
  },

  /**
   * Met à jour une note.
   */
  async updateNote(id: string, updates: NoteUpdate): Promise<Note> {
    const { data, error } = await supabase
      .from('notes')
      .update({
        ...updates,
        updated_at: new Date().toISOString()
      })
      .eq('id', id)
      .select()
      .single();
    
    if (error) throw error;
    return data;
  },

  /**
   * Supprime une note.
   */
  async deleteNote(id: string): Promise<void> {
    const { error } = await supabase
      .from('notes')
      .delete()
      .eq('id', id);
    
    if (error) throw error;
  }
};
