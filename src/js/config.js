// ============================================================================
// CONFIGURAÇÃO COMERCIAL CENTRAL — fonte única de preços, links e textos
// comerciais usados em toda a landing page (evita divergência entre seções).
//
// checkoutUrl vazio = checkout temporariamente desativado.
//
// ATENÇÃO — fonte de verdade: em 2026-09-19 os dois checkouts mostravam
// "+10.000" (Premium) e "+5.000" (Básico), divergindo do que a landing
// divulgava ("+40.000"). Depois disso o vendedor confirmou "+40.000" (acervo
// principal do Premium) + "+20.000 de bônus" (pack de canecas) como os
// números corretos — inclusive gerou uma nova arte oficial do mockup já com
// esses dois números separados (public/images/mockupnovo-40k-bonus.webp).
// fileCount/premiumPlan.fileCount foram atualizados para bater com essa
// confirmação. PENDÊNCIA: antes de divulgar tráfego pago para essa página,
// confirme que os dois checkoutUrl abaixo também foram atualizados para
// "+40.000"/"+20.000" — o comprador não pode ver um número diferente na
// landing e no momento de pagar.
// ============================================================================

export const productConfig = {
  domain: 'https://estampasmax.vercel.app',
  brandName: 'Estampas Max',
  productName: 'Estampas MAX',
  category: 'Arquivos digitais para estampagem',

  basicPlan: {
    name: 'Plano Básico',
    price: 19.9,
    description: 'Seleção de estampas em alta resolução',
    checkoutUrl: 'https://ggcheckout.app/checkout/v5/69Kb1LZWvLKUF9mAbonM',
    // Visto no checkout em 2026-09-19: "Estampas MAX Essencial | +5.000
    // Estampas". Não confirmado se mudou desde então — reconferir se o
    // vendedor atualizar esse plano também.
    fileCount: '+5.000',
  },

  premiumPlan: {
    name: 'Plano Premium',
    price: 34.9,
    description: 'Acervo de estampas variadas, com bônus inclusos',
    checkoutUrl: 'https://ggcheckout.app/checkout/v5/en8qOP9zZTJ4Koni7Pro',
    // Confirmado pelo vendedor em 2026-09-19 (arte oficial do mockup já
    // atualizada com esse número) — reconferir se o checkout já bate.
    fileCount: '+40.000',
  },

  // Pack extra de estampas para canecas: bônus exclusivo do Premium,
  // ADICIONAL ao fileCount acima (não é a mesma coisa, não some os dois).
  bonusMugFileCount: '+20.000',

  // Alias do valor do Premium — é o plano em destaque na página (hero,
  // comparativo), por isso é ele que aparece nos textos "genéricos" que não
  // distinguem plano. Para o Básico, use productConfig.basicPlan.fileCount.
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
