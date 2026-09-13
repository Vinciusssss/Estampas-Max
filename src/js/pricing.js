import { withUtms, track } from './tracking.js';

const CHECKOUT_LINKS = {
  premium: 'https://pay.wiapy.com/tU279AEbWL2z',
  upgradeFromBasic: 'https://pay.wiapy.com/mkAYmprFwu5G',
  basicOnly: 'https://pay.wiapy.com/Me0y_mOob61',
};

// Redireciona ao checkout preservando os UTMs e registrando begin_checkout.
function goToCheckout(url, plan) {
  const finalUrl = withUtms(url);
  track('begin_checkout', { plan });
  window.location.href = finalUrl;
}

export function initPricing() {
  const modal = document.querySelector('[data-upsell-modal]');
  const acceptBtn = document.querySelector('[data-upsell-accept]');
  const declineBtn = document.querySelector('[data-upsell-decline]');
  const closeBtn = document.querySelector('[data-upsell-close]');

  document.querySelectorAll('[data-plan="basic"]').forEach((btn) => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      track('click_cta_starter', { plan: 'basic' });
      modal.classList.remove('hidden');
    });
  });

  document.querySelectorAll('[data-plan="premium"]').forEach((btn) => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      track('click_cta_premium', { plan: 'premium' });
      goToCheckout(CHECKOUT_LINKS.premium, 'premium');
    });
  });

  acceptBtn?.addEventListener('click', () => {
    goToCheckout(CHECKOUT_LINKS.upgradeFromBasic, 'upgrade_from_basic');
  });

  declineBtn?.addEventListener('click', () => {
    goToCheckout(CHECKOUT_LINKS.basicOnly, 'basic_only');
  });

  closeBtn?.addEventListener('click', () => {
    modal.classList.add('hidden');
  });
}
