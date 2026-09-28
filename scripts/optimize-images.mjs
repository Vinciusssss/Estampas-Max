// ============================================================================
// OTIMIZAÇÃO DE IMAGENS — roda com `node scripts/optimize-images.mjs`.
//
// 1. convertLegacyRasters — uploads soltos em PNG/JPEG viram WebP (mantido do
//    script original). Ignora arquivos da SKIP_LIST (ex.: fonte bruta ainda
//    não usada no código).
//
// 2. buildCappedDerivatives — muitos uploads já chegam em WebP e por isso
//    nunca passavam pelo passo 1 (que só olha PNG/JPEG); ficavam maiores do
//    que o necessário para o layout atual (ex.: capas de categoria em
//    900×1125 exibidas a ~230px de largura). Para cada imagem maior do que o
//    necessário, gera um derivado NOVO (sufixo "-<largura>") e atualiza as
//    referências em src/js/content.js automaticamente — em vez de
//    sobrescrever o arquivo original no mesmo nome (neste ambiente Windows,
//    sobrescrever/apagar esses arquivos específicos falha de forma
//    persistente com EPERM/EBUSY; escrever um arquivo novo sempre funciona).
//    Isso também é mais seguro para cache: vercel.json usa cache curto
//    (não immutable) para /images/, mas gerar sempre um nome novo evita
//    qualquer risco de servir bytes antigos em cache para o mesmo caminho.
//    Os arquivos originais, já sem nenhuma referência no código depois da
//    atualização, são removidos em uma segunda passagem (best-effort).
//
// 3. buildHeroDerivatives — gera derivados responsivos do mockup do herói
//    (480/720/1080) para alimentar o srcset/sizes do <img> e o <link
//    rel="preload"> em index.html (arquivo master original preservado).
// ============================================================================

import sharp from 'sharp';
import { readdirSync, statSync, unlinkSync, readFileSync, writeFileSync, existsSync } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { galleryItems, categories, compatItems, testimonials, bonuses } from '../src/js/content.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const imagesDir = path.join(__dirname, '..', 'public', 'images');
const contentJsPath = path.join(__dirname, '..', 'src', 'js', 'content.js');

const kb = (bytes) => `${(bytes / 1024).toFixed(0)}KB`;

// ----------------------------------------------------------------------------
// 1) PNG/JPEG soltos -> WebP
// ----------------------------------------------------------------------------
const LEGACY_MAX_WIDTH = 720;
const LEGACY_QUALITY = 74;

// Arquivos que existem na pasta mas não são usados pelo código (fonte bruta
// mantida de propósito) — nunca processar automaticamente.
const SKIP_FILES = new Set(['mockupnovoatual.png']);

async function convertLegacyRasters() {
  const files = readdirSync(imagesDir).filter((f) => /\.(png|jpe?g)$/i.test(f) && !SKIP_FILES.has(f));
  if (files.length === 0) {
    console.log('[legacy] nenhum PNG/JPEG solto para converter.');
    return;
  }
  for (const file of files) {
    const inputPath = path.join(imagesDir, file);
    const outputName = file.replace(/\.(png|jpe?g)$/i, '.webp');
    const outputPath = path.join(imagesDir, outputName);
    const before = statSync(inputPath).size;
    try {
      await sharp(inputPath)
        .resize({ width: LEGACY_MAX_WIDTH, withoutEnlargement: true })
        .webp({ quality: LEGACY_QUALITY })
        .toFile(outputPath);
      const after = statSync(outputPath).size;
      unlinkSync(inputPath);
      console.log(`[legacy] ${file} -> ${outputName}  ${kb(before)} -> ${kb(after)}`);
    } catch (err) {
      console.error(`[legacy] FALHOU: ${file} (${err.message})`);
    }
  }
}

// ----------------------------------------------------------------------------
// 2) WebP maiores do que o necessário -> derivado novo + atualiza content.js
// ----------------------------------------------------------------------------
let contentJsSource = readFileSync(contentJsPath, 'utf8');
const oldFilesToRemove = [];

async function makeDerivative(relPath, maxWidth, quality, label) {
  const absPath = path.join(imagesDir, relPath);
  if (!existsSync(absPath)) {
    console.warn(`[cap] arquivo referenciado no código mas não encontrado: ${relPath}`);
    return;
  }
  const before = statSync(absPath).size;
  const meta = await sharp(absPath).metadata();
  if (!meta.width || meta.width <= maxWidth) {
    console.log(`[cap] ${label} já <= ${maxWidth}px (${meta.width}px, ${kb(before)}) — mantido`);
    return;
  }

  const ext = path.extname(relPath);
  const newRel = `${relPath.slice(0, -ext.length)}-${maxWidth}${ext}`;
  const newAbs = path.join(imagesDir, newRel);

  await sharp(absPath).resize({ width: maxWidth, withoutEnlargement: true }).webp({ quality }).toFile(newAbs);
  const after = statSync(newAbs).size;
  console.log(`[cap] ${label}  ${meta.width}px -> ${maxWidth}px  ${kb(before)} -> ${kb(after)}  (${relPath} -> ${newRel})`);

  if (contentJsSource.includes(`'${relPath}'`)) {
    contentJsSource = contentJsSource.split(`'${relPath}'`).join(`'${newRel}'`);
    oldFilesToRemove.push(absPath);
  } else {
    console.warn(`[cap] AVISO: '${relPath}' não encontrado em content.js como string literal — atualize a referência manualmente.`);
  }
}

const GALLERY_THUMB_WIDTH = 320;
const GALLERY_THUMB_QUALITY = 72;

// Gera o derivado pequeno do grid e adiciona `thumb: '...'` ao objeto do
// item em content.js (texto, logo após o campo `file:` do mesmo item) — sem
// isso teríamos que adivinhar o nome do thumb em tempo de execução a partir
// do nome do arquivo principal, que pode ou não já ter sido renomeado pelo
// passo anterior (makeDerivative só renomeia quem precisa).
async function buildGalleryThumbs() {
  for (const item of galleryItems) {
    // `item.file` é o valor ORIGINAL importado no topo do script; se
    // makeDerivative já trocou esse arquivo por um "-640" mais acima, a
    // referência vigente em content.js é essa nova — checa as duas
    // possibilidades em vez de adivinhar por regex.
    const ext = path.extname(item.file);
    const stem = item.file.slice(0, -ext.length);
    const currentRel = [item.file, `${stem}-640${ext}`].find((n) => contentJsSource.includes(`file: '${n}'`));
    if (!currentRel) {
      console.warn(`[thumb] não encontrei a referência atual de ${item.file} em content.js`);
      continue;
    }
    const absPath = path.join(imagesDir, currentRel);
    if (!existsSync(absPath)) {
      console.warn(`[thumb] arquivo não encontrado: ${currentRel}`);
      continue;
    }
    const currentExt = path.extname(currentRel);
    const thumbRel = `${currentRel.slice(0, -currentExt.length)}-thumb${currentExt}`;
    const thumbAbs = path.join(imagesDir, thumbRel);
    // fit: 'cover' recorta pro quadrado aqui no servidor — o grid já exibe
    // essas imagens em aspect-square via object-cover no CSS, então cortar
    // antes de gerar o arquivo economiza os bytes da altura extra que o
    // navegador ia cortar de qualquer forma.
    await sharp(absPath)
      .resize({ width: GALLERY_THUMB_WIDTH, height: GALLERY_THUMB_WIDTH, fit: 'cover', withoutEnlargement: true })
      .webp({ quality: GALLERY_THUMB_QUALITY })
      .toFile(thumbAbs);
    console.log(`[thumb] gallery/${currentRel} -> ${thumbRel}  ${kb(statSync(thumbAbs).size)}`);

    const fileFieldPattern = `file: '${currentRel}'`;
    if (contentJsSource.includes(fileFieldPattern) && !contentJsSource.includes(`thumb: '${thumbRel}'`)) {
      contentJsSource = contentJsSource.replace(fileFieldPattern, `${fileFieldPattern}, thumb: '${thumbRel}'`);
    }
  }
  writeFileSync(contentJsPath, contentJsSource);
}

const CATEGORY_THUMB_WIDTH = 240;
const CATEGORY_THUMB_QUALITY = 72;

// Mesma lógica do buildGalleryThumbs: `image` (480px) cobre a coluna maior
// da grid (lg, 4 colunas); `thumb` (240px) é o candidato pequeno pro
// srcset, para a grid de 2-3 colunas não pagar o preço do arquivo maior.
async function buildCategoryThumbs() {
  for (const cat of categories) {
    const ext = path.extname(cat.image);
    const stem = cat.image.slice(0, -ext.length);
    const currentRel = [cat.image, `${stem}-480${ext}`].find((n) => contentJsSource.includes(`image: '${n}'`));
    if (!currentRel) {
      console.warn(`[thumb] não encontrei a referência atual de ${cat.image} em content.js`);
      continue;
    }
    const absPath = path.join(imagesDir, currentRel);
    if (!existsSync(absPath)) {
      console.warn(`[thumb] arquivo não encontrado: ${currentRel}`);
      continue;
    }
    const currentExt = path.extname(currentRel);
    const thumbRel = `${currentRel.slice(0, -currentExt.length)}-thumb${currentExt}`;
    const thumbAbs = path.join(imagesDir, thumbRel);
    await sharp(absPath)
      .resize({ width: CATEGORY_THUMB_WIDTH, height: Math.round((CATEGORY_THUMB_WIDTH * 5) / 4), fit: 'cover', withoutEnlargement: true })
      .webp({ quality: CATEGORY_THUMB_QUALITY })
      .toFile(thumbAbs);
    console.log(`[thumb] ${currentRel} -> ${thumbRel}  ${kb(statSync(thumbAbs).size)}`);

    const fieldPattern = `image: '${currentRel}'`;
    if (contentJsSource.includes(fieldPattern) && !contentJsSource.includes(`thumb: '${thumbRel}'`)) {
      contentJsSource = contentJsSource.replace(fieldPattern, `${fieldPattern}, thumb: '${thumbRel}'`);
    }
  }
  writeFileSync(contentJsPath, contentJsSource);
}

async function buildCappedDerivatives() {
  // Categorias: grid de 2 a 4 colunas, exibidas a ~170-230px — sem preview
  // em modal, um único tamanho já cobre 1x/2x com folga.
  for (const cat of categories) {
    await makeDerivative(cat.image, 480, 75, cat.image);
  }
  await buildCategoryThumbs();
  // Galeria: grid pequeno (~110-155px conforme a largura da tela) MAS a
  // mesma imagem também abre maior no modal de prévia (até ~448px) — dois
  // contextos bem diferentes para o mesmo arquivo. `file` continua servindo
  // o modal (640px cobre com folga); `thumb`, um derivado extra e bem menor
  // (320px), é usado só no <img srcset> do grid (ver renderGallery em
  // render.js) para não entregar 640px onde só ~150px aparecem na tela.
  for (const item of galleryItems) {
    await makeDerivative(item.file, 640, 75, `gallery/${item.file}`);
  }
  await buildGalleryThumbs();

  // Aplicações: cards de produto com texto/mockup embutido, sem modal.
  for (const item of compatItems) {
    await makeDerivative(item.photo, 480, 75, `compat/${item.photo}`);
  }
  // Depoimentos: prints de conversa — qualidade um pouco mais alta para o
  // texto continuar legível.
  for (const item of testimonials) {
    await makeDerivative(item.file, 640, 80, `testimonial/${item.file}`);
  }
  // Bônus: mesma lógica da galeria (grid + modal).
  for (const item of bonuses) {
    await makeDerivative(item.file, 640, 78, `bonus/${item.file}`);
  }

  if (oldFilesToRemove.length > 0) {
    writeFileSync(contentJsPath, contentJsSource);
    console.log(`\n[cap] content.js atualizado com ${oldFilesToRemove.length} referência(s) nova(s).`);
    for (const absPath of oldFilesToRemove) {
      try {
        unlinkSync(absPath);
      } catch (err) {
        console.warn(`[cap] não consegui remover o original (deixei como arquivo órfão, inofensivo): ${absPath} (${err.message})`);
      }
    }
  }
}

// ----------------------------------------------------------------------------
// 3) Hero: derivados responsivos dedicados (arquivo master não é alterado)
// ----------------------------------------------------------------------------
const HERO_FILE = 'mockupnovo-40k-bonus.webp';
const HERO_SIZES = [
  { width: 480, quality: 78 },
  { width: 720, quality: 80 },
  { width: 1080, quality: 82 },
];

async function buildHeroDerivatives() {
  const srcPath = path.join(imagesDir, HERO_FILE);
  if (!existsSync(srcPath)) {
    console.warn(`[hero] arquivo master não encontrado: ${HERO_FILE}`);
    return;
  }
  const buffer = readFileSync(srcPath);
  for (const { width, quality } of HERO_SIZES) {
    const outName = HERO_FILE.replace(/\.webp$/i, `-${width}.webp`);
    const outPath = path.join(imagesDir, outName);
    await sharp(buffer).resize({ width, withoutEnlargement: true }).webp({ quality }).toFile(outPath);
    console.log(`[hero] ${outName}  ${kb(statSync(outPath).size)}`);
  }
}

async function run() {
  await convertLegacyRasters();
  await buildCappedDerivatives();
  await buildHeroDerivatives();
}

run();
