// ============================================================================
// RASTREAMENTO DE CONVERSÃO + PRESERVAÇÃO DE UTM
// ----------------------------------------------------------------------------
// Camada agnóstica: empurra eventos para window.dataLayer e, se existirem,
// para gtag() (GA4/Google Ads) e fbq() (Meta Pixel — carregado em index.html).
//
// Eventos padronizados (só valem pro dataLayer/gtag — ver nota sobre o Meta
// Pixel logo abaixo):
//   view_landing_page, view_offer, begin_checkout, click_cta_*, purchase
//
// META PIXEL — implementação simplificada de propósito (etapa de correção
// de uma regressão real): PageView e ViewContent são chamados DIRETO com
// window.fbq(...), fora deste dispatcher genérico — ver index.html (PageView,
// junto do fbq('init', ...)) e main.js (ViewContent, no IntersectionObserver
// da oferta). Chamar fbq('track', ...) através deste track() genérico, de
// dentro de um <script type="module"> carregado depois, fazia o evento cair
// numa fila interna do SDK que não é reproduzida de forma confiável — o
// Pixel inicializava (fbq('init', ...) funcionava) mas o evento em si nunca
// saía. Por isso NENHUM evento passa por aqui rumo ao fbq por enquanto:
// nem os dois de cima (já disparados direto), nem InitiateCheckout/Purchase
// (ficam com o GGCheckout) nem os cliques customizados (fora de escopo por
// ora). Reavaliar esta lista só depois de confirmar PageView/ViewContent
// estáveis no Gerenciador de Eventos da Meta.
// ============================================================================

const UTM_KEYS = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term'];
const STORAGE_KEY = 'ap_utms';

const FB_EXCLUDED_EVENTS = new Set([
  'view_landing_page',
  'view_offer',
  'begin_checkout',
  'click_cta_premium',
  'click_cta_basic',
]);

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
    // PageView e ViewContent NÃO passam por aqui (ver nota no topo do
    // arquivo) — isto só encaminha os demais cliques customizados que já
    // existiam (ex.: click_cta_hero, ao rolar até a oferta pelo hero).
    if (typeof window.fbq === 'function' && !FB_EXCLUDED_EVENTS.has(event)) {
      window.fbq('trackCustom', event, params);
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
