
import { supabase } from '@/lib/supabase/client';
import { Database } from '@/lib/supabase/types';

type StudySession = Database['public']['Tables']['study_sessions']['Row'];

export const studySessionService = {
  /**
   * Récupère les sessions d'étude de l'utilisateur.
   */
  async getSessions(): Promise<StudySession[]> {
    const { data, error } = await supabase
      .from('study_sessions')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (error) throw error;
    return data || [];
  },

  /**
   * Démarre une nouvelle session d'étude.
   */
  async startSession(courseId?: string): Promise<StudySession> {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error('Utilisateur non connecté');

    const { data, error } = await supabase
      .from('study_sessions')
      .insert({
        user_id: user.id,
        course_id: courseId === 'none' ? null : courseId,
        start_time: new Date().toISOString(),
      })
      .select()
      .single();
    
    if (error) throw error;
    return data;
  },

  /**
   * Termine une session d'étude en cours.
   */
  async endSession(id: string, notes?: string): Promise<StudySession> {
    const endTime = new Date();
    
    // Récupérer la session pour calculer la durée
    const { data: session, error: getError } = await supabase
      .from('study_sessions')
      .select('start_time')
      .eq('id', id)
      .single();
    
    if (getError) throw getError;

    const startTime = new Date(session.start_time);
    const durationMinutes = Math.floor((endTime.getTime() - startTime.getTime()) / 60000);

    const { data, error } = await supabase
      .from('study_sessions')
      .update({
        end_time: endTime.toISOString(),
        duration_minutes: durationMinutes,
        notes: notes || null
      })
      .eq('id', id)
      .select()
      .single();
    
    if (error) throw error;
    return data;
  },

  /**
   * Supprime une session.
   */
  async deleteSession(id: string): Promise<void> {
    const { error } = await supabase
      .from('study_sessions')
      .delete()
      .eq('id', id);
    
    if (error) throw error;
  }
};
