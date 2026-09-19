// ============================================================================
// CONTEÚDO DA LANDING PAGE — Biblioteca de estampas para ESTAMPAGEM
// (anime, heróis, games, séries, desenhos e mais — ver `categories` abaixo)
// ----------------------------------------------------------------------------
// Posicionamento: "Você já tem a impressora. Agora tenha as artes." — não é
// uma pasta de arquivos, é uma biblioteca organizada que acelera a produção
// de quem trabalha com estampagem.
//
// Preços, links e afirmações comerciais (quantidade de artes, garantia,
// licença) vêm de ./config.js, a fonte única de verdade. Não duplique
// esses valores aqui — importe de productConfig.
// ============================================================================

import { productConfig } from './config.js';

// Amostra da categoria Animes (imagens reais já existentes no projeto).
// As demais categorias do acervo aparecem em `categories`, mais abaixo.
// Sem tags de popularidade não comprovada ("Mais pedida" etc.) — só o tipo
// de produto/estilo da arte. Sem personagens repetidos com o mesmo título
// (a coleção original tinha Tanjiro, Naruto e Saitama duplicados).
export const galleryItems = [
  { file: 'Nf502h0H-Chat-GPT-Image-4-de-jul-de-2026-16-42-42.webp', title: 'Sukuna Oni Style', tag: 'Camiseta' },
  { file: 'wT7BRKBJ-Chat-GPT-Image-4-de-jul-de-2026-16-42-57.webp', title: 'Satoru Gojo', tag: 'Camiseta' },
  { file: 'gkn0L906-Chat-GPT-Image-4-de-jul-de-2026-16-43-00.webp', title: 'Ryomen Sukuna', tag: 'Camiseta' },
  { file: 'qMz76f76-Chat-GPT-Image-4-de-jul-de-2026-16-43-03.webp', title: 'Naruto Uzumaki', tag: 'Alta resolução' },
  { file: 'qMz76f7X-Chat-GPT-Image-4-de-jul-de-2026-16-43-06.webp', title: 'Tanjiro Kamado', tag: 'Streetwear' },
  { file: 'xTcdNrd3-Chat-GPT-Image-4-de-jul-de-2026-16-43-15.webp', title: 'Eren Yeager', tag: 'Streetwear' },
  { file: '9Frfw3f6-Chat-GPT-Image-4-de-jul-de-2026-16-43-25.webp', title: 'Monkey D. Luffy', tag: 'Camiseta' },
  { file: 'dtL0ZM0S-Chat-GPT-Image-4-de-jul-de-2026-16-43-43.webp', title: 'Subaru Natsuki', tag: 'Alta resolução' },
  { file: '5N6tQctr-Chat-GPT-Image-4-de-jul-de-2026-16-43-47.webp', title: 'Yujiro Hanma', tag: 'Streetwear' },
  { file: 'ncCL98LS-Chat-GPT-Image-4-de-jul-de-2026-16-43-50.webp', title: 'Escanor', tag: 'Camiseta' },
  { file: 'BQXvPWvg-Chat-GPT-Image-4-de-jul-de-2026-16-43-54.webp', title: 'Izuku Midoriya (Deku)', tag: 'Streetwear' },
  { file: 'Nf502h0x-Chat-GPT-Image-4-de-jul-de-2026-16-43-58.webp', title: 'Frieza', tag: 'Camiseta' },
  { file: 'kXB5Rr4r-Chat-GPT-Image-4-de-jul-de-2026-16-44-02.webp', title: 'Madara Uchiha', tag: 'Camiseta' },
  { file: 'm2tr1xDW-Chat-GPT-Image-4-de-jul-de-2026-16-44-09.webp', title: 'Sasuke Uchiha', tag: 'Streetwear' },
  { file: 'Fs8HjPdr-Chat-GPT-Image-4-de-jul-de-2026-16-45-42.webp', title: 'Luffy Sun God Red', tag: 'Alta resolução' },
  { file: '2yb9ZdXv-Chat-GPT-Image-4-de-jul-de-2026-16-42-49.webp', title: 'Saber Fate Stay', tag: 'Camiseta' },
  { file: 'ZnBsdPDw-Chat-GPT-Image-4-de-jul-de-2026-16-43-11.webp', title: 'Saitama', tag: 'Camiseta' },
  { file: '8cJX6d0g-Chat-GPT-Image-4-de-jul-de-2026-16-43-40.webp', title: 'Killua Zoldyck', tag: 'Camiseta' },
  { file: 'D09jdW9T-Chat-GPT-Image-4-de-jul-de-2026-16-45-47.webp', title: 'Itachi Crow Illusion', tag: 'Camiseta' },
];

// Categorias reais (derivadas das tags já usadas no acervo acima — nenhuma
// categoria inventada).
export const galleryCategories = [...new Set(galleryItems.map((item) => item.tag))];

// SEÇÃO CATEGORIAS EM DESTAQUE — panorama dos temas do acervo completo (o
// site até aqui só mostrava amostras de anime, o que fazia o acervo parecer
// mais limitado do que é).
//
// Todas as categorias usam uma capa local em /public/images/categories para
// evitar cards vazios e manter o quadro funcional mesmo sem rede.
export const categories = [
  { id: 'anime', label: 'Animes', blurb: 'Os favoritos que mais vendem', icon: 'flame', image: 'categories/anime.webp' },
  { id: 'herois', label: 'Heróis', blurb: 'Universo dos super-heróis', icon: 'shield', image: 'categories/herois.webp' },
  { id: 'games', label: 'Games', blurb: 'Cultura gamer e nerd', icon: 'gamepad', image: 'categories/games.webp' },
  { id: 'series', label: 'Séries', blurb: 'Séries e filmes de sucesso', icon: 'film', image: 'categories/series.webp' },
  { id: 'desenhos', label: 'Desenhos', blurb: 'Desenhos e cartoons clássicos', icon: 'palette', image: 'categories/desenhos.webp' },
  { id: 'viloes', label: 'Vilões', blurb: 'Ícones do lado sombrio', icon: 'alert', image: 'categories/viloes.webp' },
  { id: 'variados', label: 'Temas Variados', blurb: 'Muito mais pra explorar', icon: 'infinity', image: 'categories/variados.webp' },
];

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
    title: 'Você procura em grupos e pastas diferentes',
    text: 'Cada busca vira uma caça em vários lugares, tempo que deveria estar na prensa.',
  },
  {
    title: 'O cliente pede um tema que você ainda não tem',
    text: 'Sem variedade pronta, o pedido esfria enquanto você procura ou espera uma arte nova.',
  },
  {
    title: 'Você encontra arquivos com qualidade inconsistente',
    text: 'Resolução fraca borra na hora de estampar e compromete o acabamento da peça.',
  },
  {
    title: 'Cada pedido começa praticamente do zero',
    text: 'Sem uma biblioteca pronta, toda produção nova exige buscar tudo de novo.',
  },
  {
    title: 'Sua produção fica limitada pela falta de variedade',
    text: 'Poucas opções prontas significam menos temas para oferecer e menos pedidos atendidos.',
  },
];

// SEÇÃO COMPATIBILIDADE / POSSIBILIDADES DE PRODUÇÃO — produtos que você pode
// produzir. Itens com "photo" usam a imagem enviada (já traz título e
// destaques desenhados nela) no lugar do card de ícone + texto.
export const compatItems = [
  { icon: 'shirt', title: 'Camisetas', text: 'Estampe camisetas e moletons com estampas de vários temas em alta resolução.', photo: 'compat-camisetas.webp' },
  { icon: 'mug', title: 'Canecas', text: 'Aplique as artes em canecas de cerâmica e mágicas para presente e revenda.', photo: 'compat-canecas.webp' },
  { icon: 'cup', title: 'Copos e squeezes', text: 'Personalize copos térmicos, long drinks e squeezes com estampagem total.', photo: 'compat-copos.webp' },
  { icon: 'tile', title: 'Azulejos e quadros', text: 'Estampe azulejos e placas decorativas para decoração e datas especiais.', photo: 'compat-azulejos.webp' },
  { icon: 'cap', title: 'Bonés', text: 'Leve os personagens para bonés e viseiras com acabamento profissional.', photo: 'compat-bones.webp' },
  { icon: 'bag', title: 'Ecobags e almofadas', text: 'Amplie o catálogo com ecobags, almofadas e itens de tecido estampável.', photo: 'compat-ecobags.webp' },
  { icon: 'mousepad', title: 'Mousepads', text: 'Produza mousepads geek, um item de alto giro e fácil de estampar.', photo: 'compat-mousepads.webp' },
  { icon: 'gift', title: 'Chaveiros e brindes', text: 'Chaveiros e brindes personalizados para datas comemorativas e pedidos sob medida.', photo: 'compat-chaveiros.webp' },
  { icon: 'palette', title: 'Compatível com seu editor', text: 'Arquivos que você abre no Photoshop e no Canva, pelo computador ou pelo celular.', photo: 'compat-editor.webp' },
];

// "Veja como fica" — fotos reais de peças estampadas prontas, mostradas
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
  { n: 3, title: 'Imprima e estampe', text: 'Leve a arte para sua produção e transforme em um produto físico pronto pra vender.' },
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

// SEÇÃO BÔNUS ("Bônus Premium Incluídos") — cada bônus como uma ferramenta
// real que ajuda o comprador. Itens, textos e valores de referência já
// usados no material do projeto. Ordem: os 3 bônus em destaque primeiro
// (os 2 guias + o pack de canecas, este último sem preço de referência
// "avulso" por não haver um valor confirmado para ele), depois os demais.
//
// O pack de canecas (productConfig.bonusMugFileCount, +20.000) é ADICIONAL
// ao acervo principal do Premium (productConfig.premiumPlan.fileCount,
// +40.000) — confirmado pelo vendedor em 2026-09-19, inclusive numa arte
// oficial do mockup que já mostra os dois números separados. Nunca some os
// dois como se fossem um total único.
//
// "Guia Start" (nome que aparece na arte do hero) É o mesmo item que "Venda
// sem Estoque" — mesmo bônus, não conte como dois bônus separados.
export const bonuses = [
  { file: 'HkNYhbxF-Chat-GPT-Image-9-de-jul-de-2026-00-00-22-(3).webp', title: 'Guia Completo de Estampagem do Zero', price: 'R$ 57,00', text: 'Passo a passo do zero para sublimação: equipamentos, materiais, preparação da arte, impressão, tempo, temperatura, pressão, aplicação e os erros mais comuns.' },
  { file: 't4cqMFTL-Chat-GPT-Image-9-de-jul-de-2026-00-00-22-(2).webp', title: 'Guia Start — Venda sem Estoque', price: 'R$ 47,00', text: 'Estratégias para divulgar os produtos usando mockups e produzir somente após a venda.' },
  { file: 'zDswMkm2-Chat-GPT-Image-4-de-jul-de-2026-16-45-32.webp', title: `Pack com ${productConfig.bonusMugFileCount} Estampas para Canecas`, badge: `${productConfig.bonusMugFileCount} Artes para Canecas`, text: `${productConfig.bonusMugFileCount} estampas prontas para personalizar canecas, copos e outros produtos, organizadas por temas e preparadas para facilitar sua produção.` },
  { file: 'L8W9bjXc-Chat-GPT-Image-9-de-jul-de-2026-00-00-22-(1).webp', title: 'Mockups prontos', price: 'R$ 67,00', text: 'Modelos profissionais de camisetas e canecas para você aplicar a arte e divulgar antes mesmo de produzir.' },
  { file: '52r4R8yc-Chat-GPT-Image-9-de-jul-de-2026-00-00-23-(4).webp', title: 'Modelos de anúncios prontos', price: 'R$ 97,00', text: 'Combo de artes prontas para posts e anúncios, para divulgar seus produtos e vender mais.' },
];

// SEÇÃO FAQ — perguntas priorizadas para quem trabalha com estampagem.
export const faqs = [
  {
    q: 'Quantas estampas recebo em cada plano?',
    a: `O Plano Básico tem ${productConfig.basicPlan.fileCount} estampas. O Plano Premium tem ${productConfig.premiumPlan.fileCount} estampas, mais o pack extra de canecas e os demais bônus.`,
  },
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
    q: 'Por quanto tempo tenho acesso?',
    a: 'O acesso é vitalício, sem data para expirar e sem mensalidade, após a confirmação do pagamento.',
  },
  {
    q: 'O que está incluído no Premium?',
    a: `O acervo de ${productConfig.premiumPlan.fileCount} estampas, o pack extra de estampas para canecas, os guias (Estampagem do Zero e Guia Start), os mockups e modelos de anúncios prontos, e a Área de Membros Estampas Max.`,
  },
  {
    q: 'O que é a Área de Membros Estampas Max?',
    a: 'É a área organizada por categorias (Início, Categorias, Mais Baixados e Favoritos) onde você acessa, organiza e baixa todo o acervo de estampas e os bônus do plano Premium, tudo em um só lugar.',
  },
  {
    q: 'Posso editar as artes?',
    a: 'Sim. Você pode ajustar cores, tamanho e detalhes antes de imprimir e estampar.',
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
    a: 'Sim, todo o acervo é fornecido em 300 DPI, pronto para estampagem.',
  },
  {
    q: 'Posso usar as artes em produtos físicos?',
    a: 'Sim. As artes servem para camisetas, canecas, copos, squeezes, azulejos, bonés, ecobags, almofadas, mousepads, chaveiros e outros produtos personalizáveis.',
  },
  {
    q: 'Como funciona a garantia?',
    a: `Você tem ${productConfig.guaranteeDays} dias para acessar a biblioteca e verificar o material. Se não fizer sentido para você, é só solicitar o reembolso dentro do prazo — veja como em <a href="#termos" class="text-brand-400 underline">Termos da oferta</a>.`,
  },
  {
    q: 'Posso revender os arquivos digitais?',
    a: 'Não. A licença é para produzir e vender as peças físicas que você estampar, e não para revender ou redistribuir os arquivos digitais.',
  },
  {
    q: 'O que acontece se eu perder meu acesso?',
    a: 'Guarde o e-mail de confirmação da compra — ele é o seu comprovante e traz o link de acesso à biblioteca. Recomendamos salvá-lo em um lugar seguro logo após a compra.',
  },
];
