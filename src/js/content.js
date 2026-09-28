// ============================================================================
// CONTEÚDO DA LANDING PAGE — Estampas MAX: biblioteca digital de estampas
// para estampagem, sublimação e produtos personalizados.
//
// Preços, links e afirmações comerciais (quantidade de artes, garantia,
// licença) vêm de ./config.js, a fonte única de verdade. Não duplique
// esses valores aqui — importe de productConfig.
// ============================================================================

import { productConfig } from './config.js';

// Amostra da categoria Animes (imagens reais já existentes no projeto).
// As demais categorias do acervo aparecem em `categories`, mais abaixo.
// Sem tags de popularidade não comprovada ("Mais pedida" etc.) — só o tipo
// de produto/estilo da arte. Sem personagens repetidos com o mesmo título.
export const galleryItems = [
  { file: 'Nf502h0H-Chat-GPT-Image-4-de-jul-de-2026-16-42-42.webp', title: 'Sukuna Oni Style', tag: 'Camiseta' },
  { file: 'wT7BRKBJ-Chat-GPT-Image-4-de-jul-de-2026-16-42-57.webp', title: 'Satoru Gojo', tag: 'Camiseta' },
  { file: 'gkn0L906-Chat-GPT-Image-4-de-jul-de-2026-16-43-00.webp', title: 'Ryomen Sukuna', tag: 'Camiseta' },
  { file: 'qMz76f76-Chat-GPT-Image-4-de-jul-de-2026-16-43-03.webp', title: 'Naruto Uzumaki', tag: 'Alta resolução' },
  { file: 'qMz76f7X-Chat-GPT-Image-4-de-jul-de-2026-16-43-06.webp', title: 'Tanjiro Kamado', tag: 'Streetwear' },
  { file: 'xTcdNrd3-Chat-GPT-Image-4-de-jul-de-2026-16-43-15.webp', title: 'Eren Yeager', tag: 'Streetwear' },
  { file: '9Frfw3f6-Chat-GPT-Image-4-de-jul-de-2026-16-43-25.webp', title: 'Monkey D. Luffy', tag: 'Camiseta' },
  { file: 'dtL0ZM0S-Chat-GPT-Image-4-de-jul-de-2026-16-43-43.webp', title: 'Subaru Natsuki', tag: 'Alta resolução' },
  { file: 'ncCL98LS-Chat-GPT-Image-4-de-jul-de-2026-16-43-50.webp', title: 'Escanor', tag: 'Camiseta' },
  { file: 'BQXvPWvg-Chat-GPT-Image-4-de-jul-de-2026-16-43-54.webp', title: 'Izuku Midoriya (Deku)', tag: 'Streetwear' },
  { file: 'kXB5Rr4r-Chat-GPT-Image-4-de-jul-de-2026-16-44-02.webp', title: 'Madara Uchiha', tag: 'Camiseta' },
  { file: 'D09jdW9T-Chat-GPT-Image-4-de-jul-de-2026-16-45-47.webp', title: 'Itachi Crow Illusion', tag: 'Camiseta' },
];

// Categorias reais do acervo (nenhuma inventada). Capas locais em
// /public/images/categories.
export const categories = [
  { id: 'anime', label: 'Animes', blurb: 'Os favoritos que mais vendem', icon: 'flame', image: 'categories/anime.webp' },
  { id: 'herois', label: 'Heróis', blurb: 'Universo dos super-heróis', icon: 'shield', image: 'categories/herois.webp' },
  { id: 'games', label: 'Games', blurb: 'Cultura gamer e nerd', icon: 'gamepad', image: 'categories/games.webp' },
  { id: 'series', label: 'Séries', blurb: 'Séries e filmes de sucesso', icon: 'film', image: 'categories/series.webp' },
  { id: 'desenhos', label: 'Desenhos', blurb: 'Desenhos e cartoons clássicos', icon: 'palette', image: 'categories/desenhos.webp' },
  { id: 'viloes', label: 'Vilões', blurb: 'Ícones do lado sombrio', icon: 'alert', image: 'categories/viloes.webp' },
  { id: 'variados', label: 'Temas Variados', blurb: 'Muito mais pra explorar', icon: 'infinity', image: 'categories/variados.webp' },
];

// FAIXA DE CONFIANÇA — 4 fatos, sem virar cards chamativos (ver render.js).
export const trustStrip = [
  { value: productConfig.premiumPlan.fileCount, label: 'estampas' },
  { value: '300 DPI', label: 'alta resolução' },
  { value: 'Canva e Photoshop', label: 'compatível com' },
  { value: 'Pagamento único', label: 'sem mensalidade' },
];

// SEÇÃO "MAIS TEMPO PRODUZINDO. MENOS TEMPO PROCURANDO." — substitui as
// antigas seções separadas de problema, "o que muda" e comparativo por uma
// única seção objetiva com 3 benefícios.
export const solution = [
  {
    icon: 'search',
    title: 'Encontre artes organizadas por tema',
    text: 'Categorias e temas claros — sem vasculhar grupos, pastas ou pendrives para achar a estampa certa.',
  },
  {
    icon: 'infinity',
    title: 'Responda pedidos com mais variedade',
    text: `${productConfig.premiumPlan.fileCount} estampas e um pack extra para canecas cobrem praticamente qualquer tema que o cliente pedir.`,
  },
  {
    icon: 'palette',
    title: 'Personalize e produza sem começar do zero',
    text: 'Arquivos editáveis no Canva e no Photoshop, prontos para ajustar e ir direto para a impressão.',
  },
];

// SEÇÃO APLICAÇÕES — produtos que você pode produzir com as artes da
// biblioteca. Itens com "photo" usam a imagem enviada (já traz título e
// destaques desenhados nela) no lugar do card de ícone + texto.
export const compatItems = [
  { icon: 'shirt', title: 'Camisetas', text: 'Estampe camisetas e moletons com estampas de vários temas em alta resolução.', photo: 'compat-camisetas.webp' },
  { icon: 'mug', title: 'Canecas', text: 'Aplique as artes em canecas de cerâmica e mágicas para presente e revenda.', photo: 'compat-canecas.webp' },
  { icon: 'cup', title: 'Copos e squeezes', text: 'Personalize copos térmicos, long drinks e squeezes com estampagem total.', photo: 'compat-copos.webp' },
  { icon: 'cap', title: 'Bonés', text: 'Leve os personagens para bonés e viseiras com acabamento profissional.', photo: 'compat-bones.webp' },
  { icon: 'bag', title: 'Ecobags e almofadas', text: 'Amplie o catálogo com ecobags, almofadas e itens de tecido estampável.', photo: 'compat-ecobags.webp' },
  { icon: 'mousepad', title: 'Mousepads', text: 'Produza mousepads geek, um item de alto giro e fácil de estampar.', photo: 'compat-mousepads.webp' },
];

// SEÇÃO COMO FUNCIONA — 3 passos, da escolha à peça pronta.
export const steps = [
  { n: 1, title: 'Escolha a arte', text: 'Encontre rapidamente o estilo ou tema que quer produzir na biblioteca organizada.' },
  { n: 2, title: 'Edite no Canva ou Photoshop', text: 'Ajuste cores, tamanho e detalhes antes de imprimir, se quiser personalizar.' },
  { n: 3, title: 'Imprima e estampe', text: 'Leve a arte para sua produção e transforme em um produto físico pronto pra vender.' },
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
//
// O pack de canecas (productConfig.bonusMugFileCount, +20.000) é ADICIONAL
// ao acervo principal do Premium (productConfig.premiumPlan.fileCount,
// +40.000) — nunca some os dois como se fossem um total único.
//
// "Guia Start" (nome que aparece na arte do hero) É o mesmo item que "Venda
// sem Estoque" — mesmo bônus, não conte como dois bônus separados.
export const bonuses = [
  { file: 'HkNYhbxF-Chat-GPT-Image-9-de-jul-de-2026-00-00-22-(3).webp', title: 'Guia Completo de Estampagem do Zero', price: 'R$ 57,00', text: 'Passo a passo do zero para sublimação: equipamentos, materiais, preparação da arte, impressão, tempo, temperatura, pressão, aplicação e os erros mais comuns.' },
  { file: 't4cqMFTL-Chat-GPT-Image-9-de-jul-de-2026-00-00-22-(2).webp', title: 'Guia Start — Venda sem Estoque', price: 'R$ 47,00', text: 'Estratégias para divulgar os produtos usando mockups e produzir somente após a venda.' },
  { file: 'zDswMkm2-Chat-GPT-Image-4-de-jul-de-2026-16-45-32.webp', title: `Pack com ${productConfig.bonusMugFileCount} Estampas para Canecas`, badge: `${productConfig.bonusMugFileCount} extras`, text: `${productConfig.bonusMugFileCount} estampas prontas para personalizar canecas, copos e outros produtos, organizadas por temas e preparadas para facilitar sua produção.` },
  { file: 'L8W9bjXc-Chat-GPT-Image-9-de-jul-de-2026-00-00-22-(1).webp', title: 'Mockups prontos', price: 'R$ 67,00', text: 'Modelos profissionais de camisetas e canecas para você aplicar a arte e divulgar antes mesmo de produzir.' },
  { file: '52r4R8yc-Chat-GPT-Image-9-de-jul-de-2026-00-00-23-(4).webp', title: 'Modelos de anúncios prontos', price: 'R$ 97,00', text: 'Combo de artes prontas para posts e anúncios, para divulgar seus produtos e vender mais.' },
];

// SEÇÃO FAQ — consolidada em 8 grupos temáticos (quantidade, acesso,
// pagamento, compatibilidade, uso comercial, garantia, conteúdo do
// Premium, revenda), sem perguntas redundantes.
export const faqs = [
  {
    q: 'Quantas estampas recebo em cada plano?',
    a: `O Plano Básico tem ${productConfig.basicPlan.fileCount} estampas. O Plano Premium tem ${productConfig.premiumPlan.fileCount} estampas, mais o pack extra de ${productConfig.bonusMugFileCount} para canecas e os demais bônus.`,
  },
  {
    q: 'Como e quando recebo o acesso?',
    a: 'O acesso é liberado assim que o pagamento é confirmado: você recebe o link de download por e-mail. Guarde essa confirmação — ela é o seu comprovante de acesso.',
  },
  {
    q: 'Preciso pagar mensalidade? Por quanto tempo tenho acesso?',
    a: 'Não há mensalidade. É um pagamento único, com acesso vitalício à biblioteca.',
  },
  {
    q: 'Os arquivos são compatíveis com o que eu já uso?',
    a: 'Sim. Todo o acervo é entregue em alta resolução (300 DPI) e os arquivos são compatíveis com o Canva e com o Photoshop, no computador ou no celular, prontos para ajustar antes de imprimir.',
  },
  {
    q: 'Posso usar as artes em produtos físicos e vender?',
    a: 'Sim. O uso comercial é permitido para os produtos físicos que você estampar — camisetas, canecas, copos, squeezes, azulejos, bonés, ecobags, almofadas, mousepads, chaveiros e outros produtos personalizáveis.',
  },
  {
    q: 'Como funciona a garantia?',
    a: `Você tem ${productConfig.guaranteeDays} dias para acessar a biblioteca e verificar o material. Se não fizer sentido para você, é só solicitar o reembolso dentro do prazo — veja como em <a href="#termos" data-scroll-to="termos" class="text-brand-600 underline">Termos da oferta</a>.`,
  },
  {
    q: 'O que está incluído no Premium?',
    a: `O acervo de ${productConfig.premiumPlan.fileCount} estampas, o pack extra de ${productConfig.bonusMugFileCount} para canecas, os guias (Estampagem do Zero e Guia Start), os mockups e modelos de anúncios prontos, e a Área de Membros Estampas Max — a área organizada por categorias (Início, Categorias, Mais Baixados e Favoritos) onde você acessa e baixa tudo isso em um só lugar.`,
  },
  {
    q: 'Posso revender os arquivos digitais?',
    a: 'Não. A licença é para produzir e vender as peças físicas que você estampar, e não para revender ou redistribuir os arquivos digitais.',
  },
];
