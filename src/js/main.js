import '../css/main.css';
import { renderContent } from './render.js';
import { initFaq } from './faq.js';
import { initPricing } from './pricing.js';
import { initSmoothScroll } from './smoothScroll.js';
import { initReveal } from './reveal.js';
import { captureUtms, track } from './tracking.js';

// Rede de segurança global: qualquer <img> que falhar (404, rede instável)
// fica escondida em vez de mostrar o ícone quebrado do navegador. As imagens
// renderizadas por render.js (pic/img-fade) já tratam isso individualmente;
// isto cobre a imagem do hero (HTML estático) e qualquer <img> futura.
// 'error' não faz bubble, por isso precisa de captura (terceiro argumento).
function initImageFallback() {
  document.addEventListener(
    'error',
    (e) => {
      const target = e.target;
      if (target instanceof HTMLImageElement) {
        target.style.display = 'none';
      }
    },
    true
  );
}

// Rastreia cliques nos CTAs que rolam para a oferta (hero, catálogo, etc.).
function initCtaTracking() {
  document.querySelectorAll('[data-cta]').forEach((el) => {
    el.addEventListener('click', () => {
      track(`click_cta_${el.getAttribute('data-cta')}`);
    });
  });
}

// Dispara view_offer quando a seção de planos entra na tela (uma vez).
function initOfferView() {
  const offer = document.getElementById('pricing');
  if (!offer || !('IntersectionObserver' in window)) return;
  const obs = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          track('view_offer');
          obs.disconnect();
        }
      });
    },
    // A seção de planos costuma ser mais alta que a tela; um threshold alto
    // nunca seria atingido. Dispara assim que a oferta entra no viewport.
    { threshold: 0, rootMargin: '0px 0px -20% 0px' }
  );
  obs.observe(offer);
}

// Mostra a barra de CTA fixa no mobile depois de sair do topo e a esconde
// quando a própria seção de preços está visível (para não cobrir os botões).
function initMobileCta() {
  const bar = document.querySelector('[data-mobile-cta]');
  if (!bar) return;
  const pricing = document.getElementById('pricing');

  const onScroll = () => {
    const scrolled = window.scrollY > window.innerHeight * 0.6;
    let overPricing = false;
    if (pricing) {
      const r = pricing.getBoundingClientRect();
      overPricing = r.top < window.innerHeight && r.bottom > 0;
    }
    bar.classList.toggle('translate-y-full', !scrolled || overPricing);
  };

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
}

document.addEventListener('DOMContentLoaded', () => {
  initImageFallback();
  captureUtms();
  renderContent();
  initFaq();
  initPricing();
  initSmoothScroll();
  initReveal();
  initCtaTracking();
  initOfferView();
  initMobileCta();
  track('view_landing_page');
});
