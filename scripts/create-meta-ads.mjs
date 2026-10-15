import fs from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';

const root = process.cwd();
const generatedRoot = 'C:/Users/vinic/.codex/generated_images/01a0eae7-71b0-7d11-b24b-5c465571ef77';
const outDir = path.join(root, 'public', 'images', 'meta-ads');

await fs.mkdir(outDir, { recursive: true });

const assets = {
  product: path.join(root, 'public', 'images', 'mockupnovo-40k-bonus-1080.webp'),
  feedBg: path.join(generatedRoot, 'exec-96a9a2cf-7e7c-45ca-82dd-2c7e00f2aad6.png'),
  squareBg: path.join(generatedRoot, 'exec-96c7ae73-8c16-4a55-9bf0-eb859d7d26f8.png'),
  storyBg: path.join(generatedRoot, 'exec-e7182974-2c63-4d05-bf5d-ed7c9caefdc8.png'),
  studioHero: path.join(generatedRoot, 'exec-775f1a7c-53e3-4a30-b666-3c3254f6e144.png'),
};

const colors = {
  ink: '#141310',
  paper: '#FAF8F4',
  brand: '#A15243',
  brandLight: '#D3A39B',
  cyan: '#2D9DB8',
};

function esc(value) {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;');
}

function svg(width, height, body) {
  return Buffer.from(`<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">
  <defs>
    <linearGradient id="fadeTop" x1="0" x2="0" y1="0" y2="1">
      <stop offset="0" stop-color="#0C0B0A" stop-opacity="0.74"/>
      <stop offset="0.55" stop-color="#0C0B0A" stop-opacity="0.1"/>
      <stop offset="1" stop-color="#0C0B0A" stop-opacity="0.48"/>
    </linearGradient>
    <linearGradient id="fadeBottom" x1="0" x2="0" y1="0" y2="1">
      <stop offset="0" stop-color="#0C0B0A" stop-opacity="0"/>
      <stop offset="1" stop-color="#0C0B0A" stop-opacity="0.86"/>
    </linearGradient>
    <filter id="shadow" x="-30%" y="-30%" width="160%" height="160%">
      <feDropShadow dx="0" dy="8" stdDeviation="10" flood-color="#000000" flood-opacity="0.32"/>
    </filter>
  </defs>
  ${body}
</svg>`);
}

function text(x, y, value, size, fill = colors.paper, weight = 700, extra = '') {
  return `<text x="${x}" y="${y}" fill="${fill}" font-family="Bahnschrift, Arial, Helvetica, sans-serif" font-size="${size}px" font-weight="${weight}" ${extra}>${esc(value)}</text>`;
}

function multiline(x, y, lines, size, lineHeight, fill = colors.paper, weight = 700, extra = '') {
  return lines.map((line, index) => text(x, y + index * lineHeight, line, size, fill, weight, extra)).join('');
}

function pill(x, y, width, label, fill = '#0C0B0ACC', stroke = '#FFFFFF33', textFill = colors.paper, fontSize = 18) {
  return `<rect x="${x}" y="${y}" width="${width}" height="48" rx="24" fill="${fill}" stroke="${stroke}" stroke-width="1"/>` +
    text(x + 18, y + 31, label, fontSize, textFill, 700, 'letter-spacing="0.7"');
}

function button(x, y, width, label) {
  return `<rect x="${x}" y="${y}" width="${width}" height="68" rx="12" fill="${colors.brand}" filter="url(#shadow)"/>` +
    text(x + width / 2, y + 44, label, 22, '#FFFFFF', 700, 'text-anchor="middle" letter-spacing="0.8"');
}

async function background(file, width, height) {
  return sharp(file).resize(width, height, { fit: 'cover', position: 'centre' });
}

async function product(width) {
  return sharp(assets.product).resize(width, width, { fit: 'contain' });
}

async function writeCreative({ name, width, height, bgFile, productWidth, productTop, productLeft, overlay }) {
  const bg = await background(bgFile, width, height);
  const base = await bg.png().toBuffer();
  const layers = [];
  if (productWidth) {
    const productImage = await product(productWidth);
    layers.push({ input: await productImage.png().toBuffer(), left: productLeft, top: productTop });
  }
  layers.push({ input: svg(width, height, overlay), left: 0, top: 0 });
  await sharp(base)
    .composite(layers)
    .png({ compressionLevel: 9 })
    .toFile(path.join(outDir, name));
}

await writeCreative({
  name: 'estampas-max-meta-feed-4x5.png',
  width: 1080,
  height: 1350,
  bgFile: assets.feedBg,
  productWidth: 820,
  productTop: 510,
  productLeft: 260,
  overlay: `
    <rect width="1080" height="1350" fill="url(#fadeTop)"/>
    <rect y="930" width="1080" height="420" fill="url(#fadeBottom)"/>
    <rect x="70" y="72" width="10" height="46" rx="5" fill="${colors.brand}"/>
    ${text(98, 99, 'ESTAMPAS MAX', 24, colors.paper, 700, 'letter-spacing="2.2"')}
    ${text(70, 151, 'BIBLIOTECA DIGITAL PARA ESTAMPAGEM', 17, colors.brandLight, 700, 'letter-spacing="1.8"')}
    ${text(70, 226, 'PARE DE PROCURAR', 56, colors.paper, 700, 'letter-spacing="-1.5"')}
    ${text(70, 292, 'ESTAMPAS.', 56, colors.paper, 700, 'letter-spacing="-1.5"')}
    ${text(70, 358, 'COMECE A PRODUZIR.', 43, colors.brandLight, 700, 'letter-spacing="-1.1"')}
    ${text(70, 412, 'Arquivos compatíveis com DTF, sublimação e outras técnicas de estampagem.', 20, colors.paper, 400)}
    <line x1="70" y1="474" x2="920" y2="474" stroke="#FFFFFF33" stroke-width="1"/>
    ${text(70, 523, '+40.000', 32, colors.paper, 700)}
    ${text(70, 548, 'ARTES', 14, colors.brandLight, 700, 'letter-spacing="1.4"')}
    <line x1="285" y1="495" x2="285" y2="560" stroke="#FFFFFF38" stroke-width="1"/>
    ${text(335, 523, '+20.000', 32, colors.paper, 700)}
    ${text(335, 548, 'BÔNUS PARA CANECAS', 14, colors.brandLight, 700, 'letter-spacing="1.1"')}
    <line x1="585" y1="495" x2="585" y2="560" stroke="#FFFFFF38" stroke-width="1"/>
    ${text(635, 523, '7', 32, colors.paper, 700)}
    ${text(635, 548, 'CATEGORIAS', 14, colors.brandLight, 700, 'letter-spacing="1.4"')}
    <rect x="70" y="1132" width="910" height="126" rx="18" fill="#0C0B0AEF" stroke="#FFFFFF26" stroke-width="1"/>
    ${text(100, 1207, 'ACESSO VITALÍCIO', 31, colors.brandLight, 700, 'letter-spacing="0.4"')}
    ${button(620, 1161, 318, 'CLIQUE EM SAIBA MAIS')}
  `,
});

await writeCreative({
  name: 'estampas-max-meta-square-1x1.png',
  width: 1080,
  height: 1080,
  bgFile: assets.squareBg,
  productWidth: 760,
  productTop: 285,
  productLeft: 320,
  overlay: `
    <rect width="1080" height="1080" fill="url(#fadeTop)"/>
    <rect y="770" width="1080" height="310" fill="url(#fadeBottom)"/>
    <rect x="68" y="56" width="8" height="34" rx="4" fill="${colors.brand}"/>
    ${text(92, 82, 'ESTAMPAS MAX', 21, colors.paper, 700, 'letter-spacing="2.0"')}
    ${text(68, 127, 'BIBLIOTECA DIGITAL PARA ESTAMPAGEM', 15, colors.brandLight, 700, 'letter-spacing="1.4"')}
    ${text(68, 205, 'SEU PRÓXIMO', 50, colors.paper, 700, 'letter-spacing="-1.3"')}
    ${text(68, 263, 'PEDIDO COMEÇA', 50, colors.paper, 700, 'letter-spacing="-1.3"')}
    ${text(68, 321, 'AQUI.', 50, colors.brandLight, 700, 'letter-spacing="-1.3"')}
    ${text(68, 366, '+40.000 ESTAMPAS', 25, colors.paper, 700)}
    ${text(68, 400, 'Compatíveis com DTF, sublimação e outras técnicas.', 16, colors.paper, 400)}
    <line x1="68" y1="446" x2="460" y2="446" stroke="#FFFFFF36" stroke-width="1"/>
    ${text(68, 492, '+20.000', 31, colors.brandLight, 700)}
    ${text(68, 518, 'BÔNUS PARA CANECAS', 14, colors.paper, 700, 'letter-spacing="1.0"')}
    <rect x="68" y="862" width="420" height="118" rx="16" fill="${colors.paper}" filter="url(#shadow)"/>
    ${text(94, 936, 'ACESSO VITALÍCIO', 30, colors.brand, 700, 'letter-spacing="0.3"')}
    ${button(648, 908, 360, 'CLIQUE EM SAIBA MAIS')}
  `,
});

await writeCreative({
  name: 'estampas-max-meta-story-9x16.png',
  width: 1080,
  height: 1920,
  bgFile: assets.storyBg,
  productWidth: 980,
  productTop: 620,
  productLeft: 50,
  overlay: `
    <rect width="1080" height="1920" fill="url(#fadeTop)"/>
    <rect y="1420" width="1080" height="500" fill="url(#fadeBottom)"/>
    <rect x="70" y="78" width="10" height="50" rx="5" fill="${colors.brand}"/>
    ${text(98, 112, 'ESTAMPAS MAX', 26, colors.paper, 700, 'letter-spacing="2.4"')}
    ${text(70, 183, 'BIBLIOTECA DIGITAL PARA ESTAMPAGEM', 16, colors.brandLight, 700, 'letter-spacing="1.6"')}
    ${text(70, 290, '+40.000', 76, colors.paper, 700, 'letter-spacing="-2"')}
    ${text(70, 368, 'ESTAMPAS', 76, colors.brandLight, 700, 'letter-spacing="-2"')}
    ${text(70, 440, 'PARA PRODUZIR E VENDER.', 42, colors.paper, 700, 'letter-spacing="-1.1"')}
    ${text(70, 510, 'Compatíveis com DTF, sublimação e outras', 19, colors.paper, 400)}
    ${text(70, 540, 'técnicas de estampagem.', 19, colors.paper, 400)}
    ${pill(70, 580, 372, '+20.000 EXTRAS PARA CANECAS', '#0C0B0AE6', '#FFFFFF38', colors.paper, 19)}
    <rect x="70" y="1500" width="940" height="288" rx="22" fill="#0C0B0AF0" stroke="#FFFFFF2B" stroke-width="1"/>
    ${text(104, 1625, 'ACESSO VITALÍCIO', 40, colors.brandLight, 700, 'letter-spacing="0.2"')}
    ${button(104, 1690, 480, 'CLIQUE EM SAIBA MAIS')}
    ${text(610, 1560, 'Canva + Photoshop', 21, colors.paper, 700)}
    ${text(610, 1600, 'DTF · Sublimação · Outras técnicas', 18, colors.paper, 700)}
    ${text(610, 1640, 'Acesso imediato', 21, colors.paper, 700)}
    ${text(610, 1680, 'Garantia de 30 dias', 21, colors.paper, 700)}
  `,
});

await writeCreative({
  name: 'estampas-max-meta-feed-4x5-hook-2.png',
  width: 1080,
  height: 1350,
  bgFile: assets.squareBg,
  productWidth: 820,
  productTop: 540,
  productLeft: 250,
  overlay: `
    <rect width="1080" height="1350" fill="url(#fadeTop)"/>
    <rect y="930" width="1080" height="420" fill="url(#fadeBottom)"/>
    <rect x="70" y="72" width="10" height="46" rx="5" fill="${colors.brand}"/>
    ${text(98, 99, 'ESTAMPAS MAX', 24, colors.paper, 700, 'letter-spacing="2.2"')}
    ${text(70, 151, 'UM ACERVO PARA QUEM PRODUZ', 17, colors.brandLight, 700, 'letter-spacing="1.8"')}
    ${text(70, 235, 'SEU CLIENTE PEDE.', 57, colors.paper, 700, 'letter-spacing="-1.5"')}
    ${text(70, 302, 'VOCÊ JÁ TEM A ARTE.', 48, colors.brandLight, 700, 'letter-spacing="-1.2"')}
    ${text(70, 360, '+40.000 arquivos compatíveis com DTF,', 20, colors.paper, 400)}
    ${text(70, 391, 'sublimação e outras técnicas de estampagem.', 20, colors.paper, 400)}
    <line x1="70" y1="454" x2="930" y2="454" stroke="#FFFFFF33" stroke-width="1"/>
    ${text(70, 505, '+40.000', 32, colors.paper, 700)}
    ${text(70, 531, 'ARTES', 14, colors.brandLight, 700, 'letter-spacing="1.4"')}
    <line x1="285" y1="480" x2="285" y2="544" stroke="#FFFFFF38" stroke-width="1"/>
    ${text(335, 505, '+20.000', 32, colors.paper, 700)}
    ${text(335, 531, 'BÔNUS PARA CANECAS', 14, colors.brandLight, 700, 'letter-spacing="1.1"')}
    <rect x="70" y="1132" width="910" height="126" rx="18" fill="#0C0B0AEF" stroke="#FFFFFF26" stroke-width="1"/>
    ${text(100, 1207, 'ACESSO VITALÍCIO', 31, colors.brandLight, 700, 'letter-spacing="0.4"')}
    ${button(620, 1161, 318, 'CLIQUE EM SAIBA MAIS')}
  `,
});

await writeCreative({
  name: 'estampas-max-meta-feed-4x5-hero-oficina.png',
  width: 1080,
  height: 1350,
  bgFile: assets.studioHero,
  overlay: `
    <rect width="1080" height="1350" fill="#0C0B0A22"/>
    <rect x="52" y="50" width="532" height="720" rx="26" fill="#0C0B0AD9" stroke="#FFFFFF2B" stroke-width="1"/>
    <rect x="78" y="78" width="8" height="42" rx="4" fill="${colors.brand}"/>
    ${text(103, 107, 'ESTAMPAS MAX', 23, colors.paper, 700, 'letter-spacing="2.0"')}
    ${text(78, 164, 'BIBLIOTECA DIGITAL PARA ESTAMPAGEM', 15, colors.brandLight, 700, 'letter-spacing="1.4"')}
    <rect x="78" y="204" width="454" height="170" rx="18" fill="${colors.brand}"/>
    ${text(106, 286, '+40.000', 76, '#FFFFFF', 700, 'letter-spacing="-2.3"')}
    ${text(108, 337, 'ARQUIVOS', 38, '#FFFFFF', 700, 'letter-spacing="1.0"')}
    ${text(78, 433, 'Para DTF, sublimação e outras técnicas', 19, colors.paper, 400)}
    ${text(78, 463, 'de estampagem.', 19, colors.paper, 400)}
    <line x1="78" y1="508" x2="530" y2="508" stroke="#FFFFFF38" stroke-width="1"/>
    ${text(78, 559, '+20.000 BÔNUS PARA CANECAS', 22, colors.paper, 700)}
    ${text(78, 622, 'ACESSO VITALÍCIO', 29, colors.brandLight, 700, 'letter-spacing="0.4"')}
    ${button(78, 655, 394, 'CLIQUE EM SAIBA MAIS')}
  `,
});

console.log(`Criativos salvos em ${outDir}`);
