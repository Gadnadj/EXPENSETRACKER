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

            const canvas = createCanvas(size, size);
            const ctx = canvas.getContext('2d');

            // Dégradé de fond (violet très foncé, presque noir)
            const bgGradient = ctx.createLinearGradient(0, 0, size, size);
            bgGradient.addColorStop(0, '#2E1065'); // Violet ultra foncé
            bgGradient.addColorStop(1, '#4C1D95'); // Violet profond
            ctx.fillStyle = bgGradient;
            ctx.fillRect(0, 0, size, size);


            // Cercle "flou" pour effet de glassmorphism
            // ctx.beginPath();
            // ctx.arc(size / 2, size / 2, size * 0.4, 0, Math.PI * 2);
            // ctx.fillStyle = 'rgba(255, 255, 255, 0.15)';
            // ctx.filter = 'blur(15px)';
            // ctx.fill();
            // ctx.filter = 'none'; // Reset le filtre pour le reste des dessins

            // Ombre portée pour le texte
            ctx.shadowColor = 'rgba(0, 0, 0, 0.3)';
            ctx.shadowBlur = size * 0.1;
            ctx.shadowOffsetX = size * 0.05;
            ctx.shadowOffsetY = size * 0.05;

            // Style du texte ultra grand et moderne
            const fontSize = size * 0.6;
            ctx.font = `bold ${fontSize}px Inter, Arial, sans-serif`;
            ctx.fillStyle = '#FFFFFF';
            ctx.textBaseline = 'middle';
            ctx.textAlign = 'center';

            // Texte centré "ET"
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
