import { withUtms, track } from './tracking.js';
import { productConfig } from './config.js';

const CHECKOUT_LINKS = {
  basic: productConfig.basicPlan.checkoutUrl,
  premium: productConfig.premiumPlan.checkoutUrl,
};

// Evita clique duplo mandando o usuário duas vezes pro checkout (ex.: toque
// duplo acidental no celular) enquanto a navegação já está em andamento.
let navigating = false;

// Redireciona ao checkout preservando os UTMs. Dispara begin_checkout
// (Meta Pixel: InitiateCheckout) só aqui — ou seja, só num clique real de
// CTA que realmente leva ao checkout, nunca por só visualizar a página.
function goToCheckout(url, plan, value) {
  if (navigating) return;
  navigating = true;
  const finalUrl = withUtms(url);
  track('begin_checkout', { plan, value, currency: 'BRL' });
  window.location.href = finalUrl;
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
      track('click_cta_starter', { plan: 'basic' });
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
      track('click_cta_premium', { plan: 'premium' });
      goToCheckout(CHECKOUT_LINKS.premium, 'premium', productConfig.premiumPlan.price);
    });
  });
}
