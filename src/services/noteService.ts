
import { supabase } from '@/lib/supabase/client';
import { Database } from '@/lib/supabase/types';

type Note = Database['public']['Tables']['notes']['Row'];

export const noteService = {
  async getNotes() {
    const { data, error } = await supabase
      .from('notes')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (error) throw error;
    return data as Note[];
  },

  async createNote(title: string, content: string, courseId?: string) {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error('Not authenticated');

    const { data, error } = await supabase
      .from('notes')
      .insert({
        user_id: user.id,
        title,
        content,
        course_id: courseId
      })
      .select()
      .single();
    
    if (error) throw error;
    return data as Note;
  },

  async deleteNote(id: string) {
    const { error } = await supabase
      .from('notes')
      .delete()
      .eq('id', id);
    
    if (error) throw error;
  }
};
