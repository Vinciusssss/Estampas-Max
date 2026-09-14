// ============================================================================
// CONTEÚDO DA LANDING PAGE — Biblioteca de artes de anime para SUBLIMAÇÃO
// ----------------------------------------------------------------------------
// Posicionamento: "Você já tem a impressora. Agora tenha as artes." — não é
// uma pasta de arquivos, é uma biblioteca organizada que acelera a produção
// de quem trabalha com sublimação.
//
// Preços, links e afirmações comerciais (quantidade de artes, garantia,
// licença) vêm de ./config.js, a fonte única de verdade. Não duplique
// esses valores aqui — importe de productConfig.
// ============================================================================

import { productConfig } from './config.js';

// Amostra do acervo (imagens reais já existentes no projeto — arte de anime).
export const galleryItems = [
  { file: 'Nf502h0H-Chat-GPT-Image-4-de-jul-de-2026-16-42-42.webp', title: 'Sukuna Oni Style', tag: 'Camiseta' },
  { file: 'wT7BRKBJ-Chat-GPT-Image-4-de-jul-de-2026-16-42-57.webp', title: 'Goku Saiyan Spirit', tag: 'Camiseta' },
  { file: 'gkn0L906-Chat-GPT-Image-4-de-jul-de-2026-16-43-00.webp', title: 'Zoro Master Swordsman', tag: 'Camiseta' },
  { file: 'qMz76f76-Chat-GPT-Image-4-de-jul-de-2026-16-43-03.webp', title: 'Gojo Limitless Eyes', tag: 'Alta resolução' },
  { file: 'qMz76f7X-Chat-GPT-Image-4-de-jul-de-2026-16-43-06.webp', title: 'Retro EVA Pilot', tag: 'Streetwear' },
  { file: 'xTcdNrd3-Chat-GPT-Image-4-de-jul-de-2026-16-43-15.webp', title: 'Luffy Gear 5 Joyboy', tag: 'Mais pedida' },
  { file: '9Frfw3f6-Chat-GPT-Image-4-de-jul-de-2026-16-43-25.webp', title: 'Shinobi Shadow Warrior', tag: 'Camiseta' },
  { file: 'sDv2GF2b-Chat-GPT-Image-4-de-jul-de-2026-16-43-31.webp', title: 'Dark Samurai Spirit', tag: 'Novo' },
  { file: 'dtL0ZM0S-Chat-GPT-Image-4-de-jul-de-2026-16-43-43.webp', title: 'Chainsaw Fiend Art', tag: 'Alta resolução' },
  { file: '5N6tQctr-Chat-GPT-Image-4-de-jul-de-2026-16-43-47.webp', title: 'Cyber Mecha Overlord', tag: 'Streetwear' },
  { file: 'ncCL98LS-Chat-GPT-Image-4-de-jul-de-2026-16-43-50.webp', title: 'Demon Slayer Premium', tag: 'Camiseta' },
  { file: 'BQXvPWvg-Chat-GPT-Image-4-de-jul-de-2026-16-43-54.webp', title: 'Tokyo Retro Vaporwave', tag: 'Streetwear' },
  { file: 'Nf502h0x-Chat-GPT-Image-4-de-jul-de-2026-16-43-58.webp', title: 'Hunter Gon Rage', tag: 'Camiseta' },
  { file: 'kXB5Rr4r-Chat-GPT-Image-4-de-jul-de-2026-16-44-02.webp', title: 'Attack on Titan Duo', tag: 'Camiseta' },
  { file: 'm2tr1xDW-Chat-GPT-Image-4-de-jul-de-2026-16-44-09.webp', title: 'Neon Streetwear Concept', tag: 'Streetwear' },
  { file: 'Fs8HjPdr-Chat-GPT-Image-4-de-jul-de-2026-16-45-42.webp', title: 'Luffy Sun God Red', tag: 'Mais pedida' },
  { file: '2yb9ZdXv-Chat-GPT-Image-4-de-jul-de-2026-16-42-49.webp', title: 'Saber Fate Stay', tag: 'Camiseta' },
  { file: 'ZnBsdPDw-Chat-GPT-Image-4-de-jul-de-2026-16-43-11.webp', title: 'Kaneki Tokyo Ghoul', tag: 'Camiseta' },
  { file: 'fytq97gH-Chat-GPT-Image-4-de-jul-de-2026-16-43-21.webp', title: 'Ichigo Bleach Hollow', tag: 'Camiseta' },
  { file: '1Xn7q0Y2-Chat-GPT-Image-4-de-jul-de-2026-16-43-35.webp', title: 'Naruto Sage Mode', tag: 'Mais pedida' },
  { file: '8cJX6d0g-Chat-GPT-Image-4-de-jul-de-2026-16-43-40.webp', title: 'Zenitsu Lightning', tag: 'Camiseta' },
  { file: 'D09jdW9T-Chat-GPT-Image-4-de-jul-de-2026-16-45-47.webp', title: 'Itachi Crow Illusion', tag: 'Camiseta' },
];

// Categorias reais (derivadas das tags já usadas no acervo acima — nenhuma
// categoria inventada).
export const galleryCategories = [...new Set(galleryItems.map((item) => item.tag))];

// SEÇÃO BENEFÍCIOS/NÚMEROS — logo após o hero, fatos confirmados (ver config.js).
export const benefits = [
  { value: productConfig.fileCount, label: 'Artes' },
  { value: '300 DPI', label: 'Alta resolução' },
  { value: '100%', label: 'Digital' },
  { value: 'Vitalício', label: 'Acesso' },
];

// SEÇÃO PROBLEMA/DOR — o equipamento não é o problema; é ficar sem arte.
export const problems = [
  {
    title: 'Você perde tempo procurando arte',
    text: 'Grupos, sites e pastas bagunçadas consomem o tempo que deveria estar na prensa.',
  },
  {
    title: 'O cliente pede um tema que você não tem',
    text: 'Sem variedade pronta, o pedido esfria enquanto você procura ou espera uma arte nova.',
  },
  {
    title: 'Arquivos espalhados e desorganizados',
    text: 'Cada compra avulsa vira mais uma pasta perdida no computador ou no celular.',
  },
  {
    title: 'Artes com qualidade baixa',
    text: 'Resolução fraca borra na hora de sublimar e compromete o acabamento da peça.',
  },
  {
    title: 'Cada pedido começa do zero',
    text: 'Sem uma biblioteca pronta, toda produção nova exige buscar tudo de novo.',
  },
];

// SEÇÃO COMPATIBILIDADE / POSSIBILIDADES DE PRODUÇÃO — produtos que você pode
// produzir. Itens com "photo" usam a imagem enviada (já traz título e
// destaques desenhados nela) no lugar do card de ícone + texto.
export const compatItems = [
  { icon: 'shirt', title: 'Camisetas', text: 'Estampe camisetas e moletons com artes de anime em alta resolução.', photo: 'compat-camisetas.webp' },
  { icon: 'mug', title: 'Canecas', text: 'Aplique as artes em canecas de cerâmica e mágicas para presente e revenda.', photo: 'compat-canecas.webp' },
  { icon: 'cup', title: 'Copos e squeezes', text: 'Personalize copos térmicos, long drinks e squeezes com sublimação total.', photo: 'compat-copos.webp' },
  { icon: 'tile', title: 'Azulejos e quadros', text: 'Sublime azulejos e placas decorativas para decoração e datas especiais.', photo: 'compat-azulejos.webp' },
  { icon: 'cap', title: 'Bonés', text: 'Leve os personagens para bonés e viseiras com acabamento profissional.', photo: 'compat-bones.webp' },
  { icon: 'bag', title: 'Ecobags e almofadas', text: 'Amplie o catálogo com ecobags, almofadas e itens de tecido sublimável.', photo: 'compat-ecobags.webp' },
  { icon: 'mousepad', title: 'Mousepads', text: 'Produza mousepads geek, um item de alto giro e fácil de sublimar.', photo: 'compat-mousepads.webp' },
  { icon: 'gift', title: 'Presentes e chaveiros', text: 'Chaveiros e brindes personalizados para datas comemorativas e pedidos sob medida.', photo: 'compat-chaveiros.webp' },
  { icon: 'palette', title: 'Compatível com seu editor', text: 'Arquivos que você abre no Photoshop e no Canva, pelo computador ou pelo celular.', photo: 'compat-editor.webp' },
];

// "Veja como fica" — fotos reais de peças sublimadas prontas, mostradas
// dentro da seção de Possibilidades de Produção (prova visual do resultado).
export const resultsRow1 = [
  'vgsccZRW-Captura-de-Tela-2026-07-04-a-s-02-31-46.webp',
  'pVwQ7BNs-Chat-GPT-Image-4-de-jul-de-2026-16-44-48.webp',
  'ZRr3zGzX-Chat-GPT-Image-4-de-jul-de-2026-17-15-56.webp',
];

export const resultsRow2 = [
  'mZv3qSfx-Chat-GPT-Image-4-de-jul-de-2026-16-44-53.webp',
  'Df9QDcVN-Chat-GPT-Image-4-de-jul-de-2026-16-45-20.webp',
  '7C1vQX5k-Chat-GPT-Image-5-de-jul-de-2026-17-39-36.webp',
];

export const resultsRow3 = [
  '2jsdJxpK-Chat-GPT-Image-4-de-jul-de-2026-16-45-29.webp',
  '7PF1cNvB-Chat-GPT-Image-4-de-jul-de-2026-16-45-39.webp',
  'd7RMSnhq-Chat-GPT-Image-5-de-jul-de-2026-17-39-06.webp',
];

// SEÇÃO COMO FUNCIONA — 3 passos, da escolha à peça pronta.
export const steps = [
  { n: 1, title: 'Escolha a arte', text: 'Encontre rapidamente o estilo ou tema que quer produzir na biblioteca organizada.' },
  { n: 2, title: 'Personalize se quiser', text: 'Use o Canva ou o Photoshop para ajustar cores, tamanho e detalhes.' },
  { n: 3, title: 'Imprima e sublime', text: 'Leve a arte para sua produção e transforme em um produto físico pronto pra vender.' },
];

// SEÇÃO COMPARATIVO — procurar arte pela internet vs. ter o Estampas Max.
export const comparisonBad = [
  'Arquivos espalhados em vários lugares',
  'Qualidade variável, sem padrão',
  'Tempo perdido procurando a cada pedido',
  'Poucas opções prontas',
  'Cada pedido começa do zero',
  'Pastas desorganizadas',
];

export const comparisonGood = [
  'Biblioteca organizada por tema e estilo',
  'Alta resolução (300 DPI) em todo o acervo',
  'Você encontra a arte certa em segundos',
  `${productConfig.fileCount} opções prontas para usar`,
  'Artes prontas, sem começar do zero',
  'Tudo em um só lugar, sempre à mão',
];

// SEÇÃO PROVA SOCIAL — prints de clientes já existentes no projeto e já em
// uso na página em produção.
export const testimonials = [
  { file: 'testimonial-1.webp', alt: 'Print de conversa de cliente sobre os anúncios feitos com as artes' },
  { file: 'testimonial-2.webp', alt: 'Print de conversa de cliente sobre vendas de canecas com as artes' },
  { file: 'testimonial-3.webp', alt: 'Print de conversa de cliente sobre camiseta feita com as artes' },
  { file: 'testimonial-4.webp', alt: 'Print de conversa de cliente sobre pedidos feitos com as artes' },
];

// SEÇÃO BÔNUS — cada bônus como uma ferramenta real que ajuda o comprador.
// Itens, textos e valores de referência já usados no material do projeto.
export const bonuses = [
  { file: 'L8W9bjXc-Chat-GPT-Image-9-de-jul-de-2026-00-00-22-(1).webp', title: 'Mockups prontos', price: 'R$ 67,00', text: 'Modelos profissionais de camisetas e canecas para você aplicar a arte e divulgar antes mesmo de produzir.' },
  { file: '52r4R8yc-Chat-GPT-Image-9-de-jul-de-2026-00-00-23-(4).webp', title: 'Modelos de anúncios prontos', price: 'R$ 97,00', text: 'Combo de artes prontas para posts e anúncios, para divulgar seus produtos e vender mais.' },
  { file: 't4cqMFTL-Chat-GPT-Image-9-de-jul-de-2026-00-00-22-(2).webp', title: 'Guia de venda sem estoque', price: 'R$ 47,00', text: 'Passo a passo para vender pelo mockup e só sublimar a peça depois que o cliente comprar.' },
  { file: 'HkNYhbxF-Chat-GPT-Image-9-de-jul-de-2026-00-00-22-(3).webp', title: 'Manual da sublimação', price: 'R$ 57,00', text: 'Guia com os cuidados de tempo, temperatura e pressão para um acabamento profissional.' },
];

// SEÇÃO FAQ — perguntas priorizadas para quem trabalha com sublimação.
export const faqs = [
  {
    q: 'Como recebo as artes?',
    a: 'Logo após a confirmação do pagamento, você recebe o acesso para download por e-mail.',
  },
  {
    q: 'O acesso é imediato?',
    a: 'Sim. O acesso é liberado assim que o pagamento é confirmado.',
  },
  {
    q: 'Preciso pagar mensalidade?',
    a: 'Não. É um pagamento único, com acesso vitalício à biblioteca.',
  },
  {
    q: 'Posso editar as artes?',
    a: 'Sim. Você pode ajustar cores, tamanho e detalhes antes de imprimir e sublimar.',
  },
  {
    q: 'Funciona no Canva?',
    a: 'Sim, os arquivos são compatíveis com o Canva, pelo computador ou pelo celular.',
  },
  {
    q: 'Funciona no Photoshop?',
    a: 'Sim, os arquivos também abrem normalmente no Photoshop.',
  },
  {
    q: 'As artes estão em alta resolução?',
    a: 'Sim, todo o acervo é fornecido em 300 DPI, pronto para sublimação.',
  },
  {
    q: 'Posso utilizar em diferentes produtos?',
    a: 'Sim. As artes servem para camisetas, canecas, copos, squeezes, azulejos, bonés, ecobags, almofadas, mousepads, chaveiros e outros produtos sublimáveis.',
  },
  {
    q: 'Como funciona a garantia?',
    a: `Você tem ${productConfig.guaranteeDays} dias para acessar a biblioteca e verificar o material. Se não fizer sentido para você, é só solicitar o reembolso dentro do prazo — veja como em <a href="#termos" class="text-brand-400 underline">Termos da oferta</a>.`,
  },
  {
    q: 'Posso revender os arquivos digitais?',
    a: 'Não. A licença é para produzir e vender as peças físicas que você sublimar, e não para revender ou redistribuir os arquivos digitais.',
  },
];
