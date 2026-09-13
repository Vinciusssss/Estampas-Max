import { withUtms, track } from './tracking.js';
import { productConfig } from './config.js';

const CHECKOUT_LINKS = {
  premium: productConfig.premiumPlan.checkoutUrl,
  upgradeFromBasic: productConfig.upgradeOffer.checkoutUrl,
  basicOnly: productConfig.basicPlan.checkoutUrl,
};

// Redireciona ao checkout preservando os UTMs e registrando begin_checkout.
function goToCheckout(url, plan) {
  const finalUrl = withUtms(url);
  track('begin_checkout', { plan });
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
  const modal = document.querySelector('[data-upsell-modal]');
  const acceptBtn = document.querySelector('[data-upsell-accept]');
  const declineBtn = document.querySelector('[data-upsell-decline]');
  const closeBtn = document.querySelector('[data-upsell-close]');

  document.querySelectorAll('[data-plan="basic"]').forEach((btn) => {
    if (!CHECKOUT_LINKS.basicOnly) {
      disableCheckoutButton(btn, 'Checkout em atualização');
      return;
    }
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      track('click_cta_starter', { plan: 'basic' });
      modal.classList.remove('hidden');
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
      goToCheckout(CHECKOUT_LINKS.premium, 'premium');
    });
  });

  if (!CHECKOUT_LINKS.upgradeFromBasic) {
    disableCheckoutButton(acceptBtn, 'Checkout em atualização');
  } else {
    acceptBtn?.addEventListener('click', () => {
      goToCheckout(CHECKOUT_LINKS.upgradeFromBasic, 'upgrade_from_basic');
    });
  }

  if (!CHECKOUT_LINKS.basicOnly) {
    disableCheckoutButton(declineBtn, 'Checkout em atualização');
  } else {
    declineBtn?.addEventListener('click', () => {
      goToCheckout(CHECKOUT_LINKS.basicOnly, 'basic_only');
    });
  }

  closeBtn?.addEventListener('click', () => {
    modal.classList.add('hidden');
  });
}
