
'use server';

import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
  cloudinary_url: process.env.CLOUDINARY_URL,
});

export async function uploadToCloudinary(base64Data: string, fileName: string) {
  try {
    const result = await cloudinary.uploader.upload(base64Data, {
      folder: 'neostud',
      public_id: fileName.split('.')[0],
      resource_type: 'auto',
    });
    return {
      url: result.secure_url,
      publicId: result.public_id,
      format: result.format,
      bytes: result.bytes,
    };
  } catch (error) {
    console.error('Cloudinary upload error:', error);
    throw new Error('Erreur lors de l\'envoi vers le stockage Cloudinary');
  }
}
