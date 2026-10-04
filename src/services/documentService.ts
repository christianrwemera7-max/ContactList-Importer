
import { supabase } from '@/lib/supabase/client';
import { Database } from '@/lib/supabase/types';
import { uploadToCloudinary } from '@/app/actions/cloudinary';

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
   * Télécharge un fichier vers Cloudinary et enregistre ses métadonnées dans Supabase.
   */
  async uploadDocument(file: File, courseId?: string): Promise<Document> {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error('Utilisateur non connecté');

    // Lecture du fichier en base64
    const base64Data = await new Promise<string>((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
    
    // 1. Upload direct vers Cloudinary via Server Action
    const cloudinaryResult = await uploadToCloudinary(base64Data, file.name, 'neostud/documents');

    // 2. Enregistrement des métadonnées dans la table documents (Supabase)
    const { data, error: dbError } = await supabase
      .from('documents')
      .insert({
        user_id: user.id,
        course_id: courseId === 'none' ? null : courseId,
        name: file.name,
        file_path: cloudinaryResult.url,
        file_type: file.type,
        file_size: cloudinaryResult.bytes
      })
      .select()
      .single();

    if (dbError) throw dbError;

    return data;
  },

  /**
   * L'URL stockée est déjà l'URL Cloudinary finale.
   */
  async getDownloadUrl(filePath: string): Promise<string> {
    return filePath;
  },

  /**
   * Supprime un document de la base.
   */
  async deleteDocument(id: string, filePath: string): Promise<void> {
    const { error: dbError } = await supabase
      .from('documents')
      .delete()
      .eq('id', id);
    
    if (dbError) throw dbError;
  }
};
