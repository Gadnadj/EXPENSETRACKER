import sharp from 'sharp';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const PUBLIC_DIR = join(__dirname, 'public');

// Créer une image de base avec un fond violet et le texte "ET"
async function generateIcons() {
  try {
    // Créer une image 512x512 avec un fond violet
    const baseImage = await sharp({
      create: {
        width: 512,
        height: 512,
        channels: 4,
        background: { r: 135, g: 92, b: 245, alpha: 1 }
      }
    }).png().toBuffer();

    // Sauvegarder l'image 512x512
    await sharp(baseImage)
      .toFile(join(PUBLIC_DIR, 'logo512.png'));

    // Créer l'image 192x192
    await sharp(baseImage)
      .resize(192, 192)
      .toFile(join(PUBLIC_DIR, 'logo192.png'));

    // Créer le favicon
    await sharp(baseImage)
      .resize(32, 32)
      .toFile(join(PUBLIC_DIR, 'favicon.ico'));

    console.log('Icons generated successfully!');
  } catch (error) {
    console.error('Error generating icons:', error);
  }
}

generateIcons(); 