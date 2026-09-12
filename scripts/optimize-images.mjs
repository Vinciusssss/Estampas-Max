import sharp from 'sharp';
import { readdirSync, statSync, unlinkSync } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const imagesDir = path.join(__dirname, '..', 'public', 'images');

const MAX_WIDTH = 720;
const QUALITY = 74;

async function run() {
  const files = readdirSync(imagesDir).filter((f) => /\.(png|jpe?g)$/i.test(f));
  let totalBefore = 0;
  let totalAfter = 0;

  const failed = [];

  for (const file of files) {
    const inputPath = path.join(imagesDir, file);
    const outputName = file.replace(/\.(png|jpe?g)$/i, '.webp');
    const outputPath = path.join(imagesDir, outputName);

    const before = statSync(inputPath).size;

    try {
      await sharp(inputPath)
        .resize({ width: MAX_WIDTH, withoutEnlargement: true })
        .webp({ quality: QUALITY })
        .toFile(outputPath);

      const after = statSync(outputPath).size;
      totalBefore += before;
      totalAfter += after;
      unlinkSync(inputPath);
      console.log(`${file} -> ${outputName}  ${(before / 1024).toFixed(0)}KB -> ${(after / 1024).toFixed(0)}KB`);
    } catch (err) {
      failed.push(file);
      console.error(`FAILED: ${file} (${err.message})`);
    }
  }

  if (failed.length) {
    console.log('\nFailed files (left untouched):', failed.join(', '));
  }

  console.log('\nTotal before:', (totalBefore / 1024 / 1024).toFixed(2), 'MB');
  console.log('Total after: ', (totalAfter / 1024 / 1024).toFixed(2), 'MB');
}

run();
