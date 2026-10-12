// TERMOS E PRIVACIDADE — escondidos por padrão no rodapé (link discreto,
// sem destaque visual). Só abrem com um clique explícito do lead, seja no
// próprio toggle, seja em qualquer link que aponte para #termos (ex.: a
// menção à garantia no FAQ).
export function initTerms() {
  const toggle = document.querySelector('[data-terms-toggle]');
  const panel = document.getElementById('termos-panel');
  const iconEl = document.querySelector('[data-terms-icon]');
  if (!toggle || !panel) return;

  function setOpen(open) {
    panel.classList.toggle('hidden', !open);
    toggle.setAttribute('aria-expanded', String(open));
    if (iconEl) iconEl.classList.toggle('rotate-45', open);
  }

  toggle.addEventListener('click', () => {
    setOpen(panel.classList.contains('hidden'));
  });

  document.querySelectorAll('a[data-scroll-to="termos"]').forEach((link) => {
    link.addEventListener('click', () => setOpen(true));
  });
}
