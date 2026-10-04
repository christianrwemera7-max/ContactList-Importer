
import { supabase } from '@/lib/supabase/client';
import { Database } from '@/lib/supabase/types';

type Quiz = Database['public']['Tables']['quizzes']['Row'];
type Question = Database['public']['Tables']['quiz_questions']['Row'];
type Result = Database['public']['Tables']['quiz_results']['Row'];

export const quizService = {
  /**
   * Récupère tous les quiz.
   */
  async getQuizzes(): Promise<Quiz[]> {
    const { data, error } = await supabase
      .from('quizzes')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (error) throw error;
    return data || [];
  },

  /**
   * Récupère les questions d'un quiz.
   */
  async getQuizQuestions(quizId: string): Promise<Question[]> {
    const { data, error } = await supabase
      .from('quiz_questions')
      .select('*')
      .eq('quiz_id', quizId)
      .order('created_at', { ascending: true });
    
    if (error) throw error;
    return data || [];
  },

  /**
   * Crée un nouveau quiz avec ses questions.
   */
  async createQuiz(quiz: { title: string; description: string; course_id: string | null }, questions: Omit<Database['public']['Tables']['quiz_questions']['Insert'], 'quiz_id'>[]): Promise<void> {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error('Non authentifié');

    const { data: newQuiz, error: quizError } = await supabase
      .from('quizzes')
      .insert({
        ...quiz,
        created_by: user.id
      })
      .select()
      .single();
    
    if (quizError) throw quizError;

    const questionsToInsert = questions.map(q => ({
      ...q,
      quiz_id: newQuiz.id
    }));

    const { error: questionsError } = await supabase
      .from('quiz_questions')
      .insert(questionsToInsert);
    
    if (questionsError) throw questionsError;
  },

  /**
   * Enregistre le résultat d'un quiz.
   */
  async saveResult(quizId: string, score: number, total: number): Promise<Result> {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error('Non authentifié');

    const { data, error } = await supabase
      .from('quiz_results')
      .insert({
        quiz_id: quizId,
        user_id: user.id,
        score,
        total_questions: total
      })
      .select()
      .single();
    
    if (error) throw error;
    return data;
  },

  /**
   * Récupère les meilleurs scores de l'utilisateur.
   */
  async getUserResults(): Promise<(Result & { quizzes: Quiz })[]> {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return [];

    const { data, error } = await supabase
      .from('quiz_results')
      .select('*, quizzes (*)')
      .eq('user_id', user.id)
      .order('completed_at', { ascending: false });
    
    if (error) throw error;
    return data || [];
  }
};
