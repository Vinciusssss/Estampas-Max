const CHECKOUT_LINKS = {
  premium: 'https://pay.wiapy.com/tU279AEbWL2z',
  upgradeFromBasic: 'https://pay.wiapy.com/mkAYmprFwu5G',
  basicOnly: 'https://pay.wiapy.com/Me0y_mOob61',
};

export function initPricing() {
  const modal = document.querySelector('[data-upsell-modal]');
  const acceptBtn = document.querySelector('[data-upsell-accept]');
  const declineBtn = document.querySelector('[data-upsell-decline]');
  const closeBtn = document.querySelector('[data-upsell-close]');

  document.querySelectorAll('[data-plan="basic"]').forEach((btn) => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      modal.classList.remove('hidden');
    });
  });

  document.querySelectorAll('[data-plan="premium"]').forEach((btn) => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      window.location.href = CHECKOUT_LINKS.premium;
    });
  });

  acceptBtn?.addEventListener('click', () => {
    window.location.href = CHECKOUT_LINKS.upgradeFromBasic;
  });

  declineBtn?.addEventListener('click', () => {
    window.location.href = CHECKOUT_LINKS.basicOnly;
  });

  closeBtn?.addEventListener('click', () => {
    modal.classList.add('hidden');
  });
}
