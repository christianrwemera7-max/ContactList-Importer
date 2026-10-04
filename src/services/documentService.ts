
import { supabase } from '@/lib/supabase/client';
import { Database } from '@/lib/supabase/types';

type Document = Database['public']['Tables']['documents']['Row'];

export const documentService = {
  /**
   * Récupère tous les documents de l'utilisateur.
   */
  async getDocuments(): Promise<Document[]> {
    const { data, error } = await supabase
      .from('documents')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (error) throw error;
    return data || [];
  },

  /**
   * Télécharge un fichier et enregistre ses métadonnées.
   */
  async uploadDocument(file: File, courseId?: string): Promise<Document> {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error('Utilisateur non connecté');

    const fileExt = file.name.split('.').pop();
    const fileName = `${Math.random().toString(36).substring(2)}.${fileExt}`;
    const filePath = `${user.id}/${fileName}`;

    // 1. Upload du fichier dans Storage
    const { error: uploadError } = await supabase.storage
      .from('student-docs')
      .upload(filePath, file);

    if (uploadError) throw uploadError;

    // 2. Enregistrement des métadonnées dans la table documents
    const { data, error: dbError } = await supabase
      .from('documents')
      .insert({
        user_id: user.id,
        course_id: courseId === 'none' ? null : courseId,
        name: file.name,
        file_path: filePath,
        file_type: file.type,
        file_size: file.size
      })
      .select()
      .single();

    if (dbError) {
      // Nettoyage si l'insertion DB échoue
      await supabase.storage.from('student-docs').remove([filePath]);
      throw dbError;
    }

    return data;
  },

  /**
   * Récupère l'URL de téléchargement d'un document.
   */
  async getDownloadUrl(filePath: string): Promise<string> {
    const { data, error } = await supabase.storage
      .from('student-docs')
      .createSignedUrl(filePath, 60); // URL valide 60 secondes
    
    if (error) throw error;
    return data.signedUrl;
  },

  /**
   * Supprime un document (Storage + DB).
   */
  async deleteDocument(id: string, filePath: string): Promise<void> {
    // 1. Supprimer du Storage
    const { error: storageError } = await supabase.storage
      .from('student-docs')
      .remove([filePath]);
    
    if (storageError) throw storageError;

    // 2. Supprimer de la DB
    const { error: dbError } = await supabase
      .from('documents')
      .delete()
      .eq('id', id);
    
    if (dbError) throw dbError;
  }
};
