// ============================================================================
// RASTREAMENTO DE CONVERSÃO + PRESERVAÇÃO DE UTM
// ----------------------------------------------------------------------------
// Camada agnóstica: empurra eventos para window.dataLayer e, se existirem,
// para gtag() (GA4/Google Ads) e fbq() (Meta Pixel — carregado em index.html).
//
// Eventos padronizados (o nome interno à esquerda é o que os call sites usam;
// o mapeamento para os eventos oficiais do Meta Pixel acontece só aqui):
//   view_landing_page -> PageView        (main.js, uma vez ao carregar)
//   view_offer        -> ViewContent     (main.js, uma vez quando a oferta entra na tela)
//   begin_checkout    -> não vai para o Pixel (GGCheckout já dispara o
//                                          InitiateCheckout dele com o mesmo Pixel ID)
//   purchase          -> Purchase        (não é chamado por nenhum código desta landing page —
//                                          fica mapeado para quando houver confirmação real de
//                                          pagamento, ex.: página de obrigado após webhook)
//   click_cta_*       -> evento customizado (trackCustom), não é um evento padrão do Pixel
// ============================================================================

const UTM_KEYS = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term'];
const STORAGE_KEY = 'ap_utms';

// Nomes internos que já viraram um evento padrão do Meta Pixel — dispara uma
// única vez por carregamento de página, não importa quantas vezes o call
// site chame track() para esse mesmo nome (proteção extra além do controle
// que cada call site já faz — ex.: IntersectionObserver que se desconecta).
const FB_STANDARD_EVENTS = {
  view_landing_page: 'PageView',
  view_offer: 'ViewContent',
  purchase: 'Purchase',
};
const firedOnce = new Set();
const FIRE_ONCE_EVENTS = new Set(['view_landing_page', 'view_offer']);

// Lê os UTMs da URL na primeira visita e guarda para o resto da navegação.
export function captureUtms() {
  try {
    const params = new URLSearchParams(window.location.search);
    const found = {};
    UTM_KEYS.forEach((k) => {
      const v = params.get(k);
      if (v) found[k] = v;
    });
    if (Object.keys(found).length > 0) {
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify(found));
    }
  } catch (_) {
    /* sessionStorage indisponível (modo privado etc.) — segue sem UTM salvo */
  }
}

function storedUtms() {
  try {
    return JSON.parse(sessionStorage.getItem(STORAGE_KEY) || '{}');
  } catch (_) {
    return {};
  }
}

// Anexa os UTMs (da URL atual ou salvos) a um link de checkout, sem
// sobrescrever parâmetros que o link já tenha.
export function withUtms(rawUrl) {
  try {
    const url = new URL(rawUrl);
    const current = new URLSearchParams(window.location.search);
    const saved = storedUtms();
    UTM_KEYS.forEach((k) => {
      const value = current.get(k) || saved[k];
      if (value && !url.searchParams.has(k)) {
        url.searchParams.set(k, value);
      }
    });
    return url.toString();
  } catch (_) {
    return rawUrl;
  }
}

// Dispara um evento de conversão nas camadas disponíveis. Nunca deixa uma
// falha em gtag/fbq (bloqueado por ad-blocker, script ainda carregando,
// etc.) interromper o código que chamou track() — por isso cada integração
// externa roda no seu próprio try/catch.
export function track(event, params = {}) {
  const payload = { event, ...params };

  try {
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push(payload);
  } catch (_) {
    /* noop */
  }

  try {
    if (typeof window.gtag === 'function') {
      window.gtag('event', event, params);
    }
  } catch (_) {
    /* noop — não deixa o GA quebrar o restante do fluxo */
  }

  try {
    if (typeof window.fbq === 'function') {
      if (FIRE_ONCE_EVENTS.has(event)) {
        if (firedOnce.has(event)) return payload;
        firedOnce.add(event);
      }
      const fbEvent = FB_STANDARD_EVENTS[event];
      if (fbEvent) {
        window.fbq('track', fbEvent, params);
      } else {
        window.fbq('trackCustom', event, params);
      }
    }
  } catch (_) {
    /* noop — Pixel bloqueado, ainda carregando ou indisponível não pode
       quebrar a navegação real (ex.: o redirecionamento ao checkout) */
  }

  if (import.meta.env?.DEV) {
    // Ajuda a validar os eventos no console durante o desenvolvimento.
    // eslint-disable-next-line no-console
    console.debug('[track]', event, params);
  }

  return payload;
}
