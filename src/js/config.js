// ============================================================================
// CONFIGURAÇÃO COMERCIAL CENTRAL — fonte única de preços, links e textos
// comerciais usados em toda a landing page (evita divergência entre seções).
//
// checkoutUrl vazio = checkout temporariamente desativado.
// ============================================================================

export const productConfig = {
  domain: 'https://estampasmax.vercel.app',
  brandName: 'Estampas Max',
  productName: 'Pack Anime Premium',
  category: 'Arquivos digitais para sublimação',

  basicPlan: {
    name: 'Plano Básico',
    price: 19.9,
    originalPrice: 49.9,
    description: 'Seleção inicial de artes de anime em alta resolução',
    checkoutUrl: 'https://ggcheckout.app/checkout/v5/69Kb1LZWvLKUF9mAbonM',
  },

  premiumPlan: {
    name: 'Plano Premium',
    price: 34.9,
    originalPrice: 297.0,
    description: 'Acervo completo de artes de anime, com bônus inclusos',
    checkoutUrl: 'https://ggcheckout.app/checkout/v5/en8qOP9zZTJ4Koni7Pro',
  },

  // Confirmado na página de checkout do Plano Premium ("mais de 10.000 artes
  // premium de anime prontas e editáveis"), a mesma descrição usada pelo
  // vendedor nos três links de pagamento.
  fileCount: '+10.000',
  fileFormats: 'Alta resolução (300 DPI), editáveis no Canva e no Photoshop',
  accessDuration: 'Acesso vitalício, sem mensalidade, após a confirmação do pagamento',
  guaranteeDays: 30,

  // Não há canal de suporte próprio configurado no projeto (e-mail, WhatsApp
  // etc.). Pendência registrada no relatório final.
  supportChannel: '',

  license: {
    commercialUse: 'Uso comercial permitido para os produtos físicos sublimados a partir das artes.',
    physicalProductsAllowed: true,
    digitalResaleAllowed: false,
  },

  // Frequência de atualização do acervo não confirmada — sem promessa de
  // prazo ou periodicidade até haver confirmação real.
  updates: {
    included: false,
  },
};
