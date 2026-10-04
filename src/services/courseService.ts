import { supabase } from '@/lib/supabase/client';
import { Database } from '@/lib/supabase/types';

type Course = Database['public']['Tables']['courses']['Row'];
type CourseInsert = Database['public']['Tables']['courses']['Insert'];
type CourseUpdate = Database['public']['Tables']['courses']['Update'];

export const courseService = {
  /**
   * Récupère toutes les matières de l'utilisateur connecté.
   */
  async getCourses(): Promise<Course[]> {
    const { data, error } = await supabase
      .from('courses')
      .select('*')
      .order('name', { ascending: true });
    
    if (error) throw error;
    return data || [];
  },

  /**
   * Crée une nouvelle matière.
   */
  async createCourse(course: Omit<CourseInsert, 'user_id'>): Promise<Course> {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error('Utilisateur non connecté');

    const { data, error } = await supabase
      .from('courses')
      .insert({
        ...course,
        user_id: user.id
      })
      .select()
      .single();
    
    if (error) throw error;
    return data;
  },

  /**
   * Met à jour une matière existante.
   */
  async updateCourse(id: string, updates: CourseUpdate): Promise<Course> {
    const { data, error } = await supabase
      .from('courses')
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
   * Supprime une matière.
   */
  async deleteCourse(id: string): Promise<void> {
    const { error } = await supabase
      .from('courses')
      .delete()
      .eq('id', id);
    
    if (error) throw error;
  }
};
