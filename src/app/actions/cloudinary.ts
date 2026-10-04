
'use server';

import { v2 as cloudinary } from 'cloudinary';

// Configuration utilisant l'URL complète fournie par l'utilisateur
cloudinary.config({
  cloudinary_url: process.env.CLOUDINARY_URL,
});

export async function uploadToCloudinary(base64Data: string, fileName: string, folder: string = 'neostud') {
  try {
    const result = await cloudinary.uploader.upload(base64Data, {
      folder: folder,
      public_id: fileName.split('.')[0] + '_' + Date.now(),
      resource_type: 'auto',
    });
    
    return {
      url: result.secure_url,
      publicId: result.public_id,
      format: result.format,
      bytes: result.bytes,
    };
  } catch (error: any) {
    console.error('Cloudinary upload error:', error);
    throw new Error('Erreur lors de l\'envoi vers le stockage Cloudinary : ' + error.message);
  }
}
