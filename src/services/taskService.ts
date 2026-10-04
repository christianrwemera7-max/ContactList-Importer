
import { supabase } from '@/lib/supabase/client';
import { Database } from '@/lib/supabase/types';

type Task = Database['public']['Tables']['tasks']['Row'];

export const taskService = {
  async getTasks() {
    const { data, error } = await supabase
      .from('tasks')
      .select('*')
      .order('due_date', { ascending: true });
    
    if (error) throw error;
    return data as Task[];
  },

  async createTask(title: string, dueDate?: string, priority: string = 'medium') {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error('Not authenticated');

    const { data, error } = await supabase
      .from('tasks')
      .insert({
        user_id: user.id,
        title,
        due_date: dueDate,
        priority,
        status: 'pending'
      })
      .select()
      .single();
    
    if (error) throw error;
    return data as Task;
  },

  async updateTaskStatus(id: string, status: string) {
    const { data, error } = await supabase
      .from('tasks')
      .update({ status })
      .eq('id', id)
      .select()
      .single();
    
    if (error) throw error;
    return data as Task;
  }
};
