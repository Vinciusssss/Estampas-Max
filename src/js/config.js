// ============================================================================
// CONFIGURAÇÃO COMERCIAL CENTRAL — fonte única de preços, links e textos
// comerciais usados em toda a landing page (evita divergência entre seções).
//
// checkoutUrl vazio = checkout temporariamente desativado.
// ============================================================================

export const productConfig = {
  domain: 'https://estampasmax.vercel.app',
  brandName: 'Estampas Max',
  productName: 'Acervo Premium de Estampas',
  category: 'Arquivos digitais para estampagem',

  basicPlan: {
    name: 'Plano Básico',
    price: 19.9,
    originalPrice: 49.9,
    description: 'Seleção inicial de estampas em alta resolução',
    checkoutUrl: 'https://ggcheckout.app/checkout/v5/69Kb1LZWvLKUF9mAbonM',
  },

  premiumPlan: {
    name: 'Plano Premium',
    price: 34.9,
    originalPrice: 297.0,
    description: 'Acervo completo de estampas variadas, com bônus inclusos',
    checkoutUrl: 'https://ggcheckout.app/checkout/v5/en8qOP9zZTJ4Koni7Pro',
  },

  // Quantidade informada pelo vendedor. Se a página de checkout do Plano
  // Premium também citar esse número, atualize lá também para não haver
  // divergência entre o que a landing page promete e o que o cliente vê na
  // hora de pagar.
  fileCount: '+40.000',
  fileFormats: 'Alta resolução (300 DPI), editáveis no Canva e no Photoshop',
  accessDuration: 'Acesso vitalício, sem mensalidade, após a confirmação do pagamento',
  guaranteeDays: 30,

  license: {
    commercialUse: 'Uso comercial permitido para os produtos físicos estampados a partir das artes.',
    physicalProductsAllowed: true,
    digitalResaleAllowed: false,
  },

  // Frequência de atualização do acervo não confirmada — sem promessa de
  // prazo ou periodicidade até haver confirmação real.
  updates: {
    included: false,
  },
};
