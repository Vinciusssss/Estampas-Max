// ============================================================================
// RASTREAMENTO DE CONVERSÃO + PRESERVAÇÃO DE UTM
// ----------------------------------------------------------------------------
// Camada agnóstica: empurra eventos para window.dataLayer e, se existirem,
// para gtag() (GA4/Google Ads) e fbq() (Meta Pixel). Assim, ao instalar GTM,
// Meta Pixel, GA4 ou UTMify depois, os eventos abaixo já estarão disparando —
// nenhum script externo é adicionado aqui (não havia rastreamento no projeto).
//
// Eventos padronizados:
//   view_landing_page | view_offer | click_cta_hero | click_cta_catalog
//   click_cta_premium | click_cta_starter | begin_checkout | purchase
// ============================================================================

const UTM_KEYS = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term'];
const STORAGE_KEY = 'ap_utms';

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

// Dispara um evento de conversão nas camadas disponíveis.
export function track(event, params = {}) {
  const payload = { event, ...params };
  try {
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push(payload);
  } catch (_) {
    /* noop */
  }
  if (typeof window.gtag === 'function') {
    window.gtag('event', event, params);
  }
  if (typeof window.fbq === 'function') {
    // Mapeia os eventos-chave para os nomes padrão do Meta Pixel.
    if (event === 'begin_checkout') window.fbq('track', 'InitiateCheckout', params);
    else if (event === 'purchase') window.fbq('track', 'Purchase', params);
    else if (event === 'view_offer') window.fbq('track', 'ViewContent', params);
    else window.fbq('trackCustom', event, params);
  }
  if (import.meta.env?.DEV) {
    // Ajuda a validar os eventos no console durante o desenvolvimento.
    // eslint-disable-next-line no-console
    console.debug('[track]', event, params);
  }
}
