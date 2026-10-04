
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

    // Conversion du fichier en base64 pour le passer à l'action serveur
    const reader = new FileReader();
    const base64Promise = new Promise<string>((resolve) => {
      reader.onload = () => resolve(reader.result as string);
      reader.readAsDataURL(file);
    });
    
    const base64Data = await base64Promise;
    
    // 1. Upload vers Cloudinary
    const cloudinaryResult = await uploadToCloudinary(base64Data, file.name);

    // 2. Enregistrement des métadonnées dans la table documents (Supabase)
    const { data, error: dbError } = await supabase
      .from('documents')
      .insert({
        user_id: user.id,
        course_id: courseId === 'none' ? null : courseId,
        name: file.name,
        file_path: cloudinaryResult.url, // On stocke l'URL directe de Cloudinary
        file_type: file.type,
        file_size: cloudinaryResult.bytes
      })
      .select()
      .single();

    if (dbError) {
      throw dbError;
    }

    return data;
  },

  /**
   * Pour Cloudinary, l'URL est déjà publique ou signée si besoin.
   */
  async getDownloadUrl(filePath: string): Promise<string> {
    return filePath;
  },

  /**
   * Supprime un document.
   */
  async deleteDocument(id: string, filePath: string): Promise<void> {
    // Note: Pour une suppression complète, il faudrait aussi supprimer sur Cloudinary via une action serveur.
    // Pour cet MVP, on supprime l'entrée en base de données.
    const { error: dbError } = await supabase
      .from('documents')
      .delete()
      .eq('id', id);
    
    if (dbError) throw dbError;
  }
};
