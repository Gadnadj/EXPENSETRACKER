import sharp from 'sharp';
import { createCanvas } from 'canvas';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const PUBLIC_DIR = join(__dirname, '../public');

console.log('📁 Output directory:', PUBLIC_DIR);

// S'assurer que le dossier public existe
if (!fs.existsSync(PUBLIC_DIR)) {
    console.log('📂 Creating public directory...');
    fs.mkdirSync(PUBLIC_DIR, { recursive: true });
}

const sizes = [
    { size: 512, name: 'logo512.png' },
    { size: 192, name: 'logo192.png' },
    { size: 32, name: 'favicon.ico' }
];

async function generateIcons() {
    console.log('🎨 Starting icon generation...');

    try {
        for (const { size, name } of sizes) {
            console.log(`\n📏 Generating ${name} (${size}x${size})...`);

            // Créer un canvas pour chaque taille
            const canvas = createCanvas(size, size);
            const ctx = canvas.getContext('2d');

            // Fond violet (purple-800)
            ctx.fillStyle = '#5B21B6';
            ctx.beginPath();
            ctx.arc(size / 2, size / 2, size / 2, 0, Math.PI * 2);
            ctx.fill();

            // Ajouter un effet de brillance
            const gradient = ctx.createRadialGradient(
                size * 0.3, size * 0.3, size * 0.1,
                size * 0.5, size * 0.5, size * 0.7
            );
            gradient.addColorStop(0, 'rgba(255, 255, 255, 0.2)');
            gradient.addColorStop(1, 'rgba(255, 255, 255, 0)');
            ctx.fillStyle = gradient;
            ctx.fill();

            // Définir le style du texte (super grand : 75% de la taille)
            const fontSize = size * 0.55;
            ctx.font = `bold ${fontSize}px Inter, Arial, sans-serif`;
            ctx.fillStyle = '#FFFFFF';
            ctx.textBaseline = 'middle';
            ctx.textAlign = 'center';

            // Dessiner le texte centré
            ctx.fillText('E', size / 2, size / 2);

            // Convertir le canvas en buffer
            const buffer = canvas.toBuffer('image/png');

            // Générer l'image finale avec sharp
            const outputPath = join(PUBLIC_DIR, name);
            await sharp(buffer)
                .toFile(outputPath);

            console.log(`✅ ${name} generated at ${outputPath}`);
        }

        console.log('\n🎉 All icons generated successfully!');
    } catch (error) {
        console.error('\n❌ Error generating icons:', error);
        process.exit(1);
    }
}

generateIcons();
