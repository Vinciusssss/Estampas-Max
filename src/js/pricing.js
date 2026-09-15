import { withUtms, track } from './tracking.js';
import { productConfig } from './config.js';

const CHECKOUT_LINKS = {
  basic: productConfig.basicPlan.checkoutUrl,
  premium: productConfig.premiumPlan.checkoutUrl,
};

// Dá tempo do Meta Pixel (e das outras integrações) realmente despacharem a
// requisição do evento de clique antes da navegação começar. window.location.href
// troca de documento no mesmo tick do clique; se o script do Pixel ainda
// estiver carregando (stub em fila) ou a rede estiver lenta, a troca de
// página pode abortar o beacon do evento no meio do caminho. 150ms é
// imperceptível para quem está clicando, mas sobra tempo de sobra pro
// navegador efetivamente enviar a requisição.
const REDIRECT_DELAY_MS = 150;

// Evita clique duplo mandando o usuário duas vezes pro checkout (ex.: toque
// duplo acidental no celular) enquanto a navegação já está em andamento.
let navigating = false;

// Redireciona ao checkout preservando os UTMs. begin_checkout aqui alimenta
// dataLayer/GA; não vai para o Meta Pixel (o GGCheckout já dispara o
// InitiateCheckout dele ao abrir — ver nota em tracking.js).
function goToCheckout(url, plan, value) {
  if (navigating) return;
  navigating = true;
  const finalUrl = withUtms(url);
  track('begin_checkout', { plan, value, currency: 'BRL' });
  setTimeout(() => {
    window.location.href = finalUrl;
  }, REDIRECT_DELAY_MS);
}

// Sem link de checkout configurado: desativa o botão em vez de redirecionar
// para um link errado ou quebrado.
function disableCheckoutButton(btn, label = 'Em breve') {
  if (!btn) return;
  btn.disabled = true;
  btn.setAttribute('aria-disabled', 'true');
  btn.classList.add('opacity-50', 'cursor-not-allowed', 'pointer-events-none');
  btn.textContent = label;
}

export function initPricing() {
  document.querySelectorAll('[data-plan="basic"]').forEach((btn) => {
    if (!CHECKOUT_LINKS.basic) {
      disableCheckoutButton(btn, 'Checkout em atualização');
      return;
    }
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      track('click_cta_basic', { plan: 'basic', value: productConfig.basicPlan.price, currency: 'BRL' });
      goToCheckout(CHECKOUT_LINKS.basic, 'basic', productConfig.basicPlan.price);
    });
  });

  document.querySelectorAll('[data-plan="premium"]').forEach((btn) => {
    if (!CHECKOUT_LINKS.premium) {
      disableCheckoutButton(btn, 'Checkout em atualização');
      return;
    }
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      track('click_cta_premium', { plan: 'premium', value: productConfig.premiumPlan.price, currency: 'BRL' });
      goToCheckout(CHECKOUT_LINKS.premium, 'premium', productConfig.premiumPlan.price);
    });
  });
}
