// HEADER/NAV — o scroll dos links (desktop e mobile) já é genérico via
// data-scroll-to/initSmoothScroll em main.js; este módulo só cuida do
// toggle do painel mobile (abre/fecha, fecha ao clicar num link).
export function initNav() {
  const toggle = document.querySelector('[data-nav-toggle]');
  const panel = document.getElementById('nav-mobile-panel');
  if (!toggle || !panel) return;

  function setOpen(open) {
    panel.classList.toggle('hidden', !open);
    toggle.setAttribute('aria-expanded', String(open));
  }

  toggle.addEventListener('click', () => {
    setOpen(panel.classList.contains('hidden'));
  });

  panel.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => setOpen(false));
  });
}
