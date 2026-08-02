import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
  cloud_name: 'gnzvwapu',
  api_key: '192945443937864',
  api_secret: 'm8uApSRpvX4RZWwGKyWgJGN9gjw',
});

export default cloudinary;

/**
 * Upload an image from a URL (e.g., Webflow CDN) to Cloudinary
 * Returns the secure Cloudinary URL
 */
export async function uploadFromUrl(url: string, folder: string = 'unistation'): Promise<string> {
  if (!url) return '';
  // If already a Cloudinary URL, return as-is
  if (url.includes('cloudinary.com')) return url;
  
  try {
    const result = await cloudinary.uploader.upload(url, {
      folder,
      transformation: [{ quality: 'auto', fetch_format: 'auto' }],
    });
    return result.secure_url;
  } catch (error) {
    console.error('Cloudinary upload failed:', error);
    // Return original URL as fallback
    return url;
  }
}

/**
 * Upload a base64 or file buffer to Cloudinary
 */
export async function uploadImage(file: string | Buffer, folder: string = 'unistation'): Promise<string> {
  try {
    const result = await cloudinary.uploader.upload(typeof file === 'string' ? file : `data:image/png;base64,${file.toString('base64')}`, {
      folder,
      transformation: [{ quality: 'auto', fetch_format: 'auto' }],
    });
    return result.secure_url;
  } catch (error) {
    console.error('Cloudinary upload failed:', error);
    return '';
  }
}

/**
 * Delete an image from Cloudinary by its public ID
 */
export async function deleteImage(publicId: string): Promise<void> {
  try {
    await cloudinary.uploader.destroy(publicId);
  } catch (error) {
    console.error('Cloudinary delete failed:', error);
  }
}

/**
 * Get the public ID from a Cloudinary URL
 */
export function getPublicId(url: string): string {
 if (!url || !url.includes('cloudinary.com')) return '';
  const match = url.match(/\/upload\/(?:v\d+\/)?(.+?)(?:\.\w+)?$/);
  return match ? match[1] : '';
}
