export function initFaq() {
  const items = document.querySelectorAll('[data-faq-item]');

  items.forEach((item) => {
    const button = item.querySelector('[data-faq-question]');
    const panel = item.querySelector('[data-faq-answer]');
    const icon = item.querySelector('[data-faq-icon]');

    button.addEventListener('click', () => {
      const isOpen = !panel.classList.contains('hidden');

      items.forEach((other) => {
        other.querySelector('[data-faq-answer]').classList.add('hidden');
        other.querySelector('[data-faq-icon]').classList.remove('rotate-45');
        other.querySelector('[data-faq-question]').setAttribute('aria-expanded', 'false');
      });

      if (!isOpen) {
        panel.classList.remove('hidden');
        icon.classList.add('rotate-45');
        button.setAttribute('aria-expanded', 'true');
      }
    });
  });
}
