// Só marca introduções de <section> — nunca do <header> (hero). O hero
// precisa pintar imediatamente no HTML/CSS inicial, sem esperar JS: título,
// preço, CTA e mockup são o provável elemento de LCP, e um .reveal (opacity:0
// até o JS rodar) neles é exatamente o tipo de coisa que faz o Lighthouse não
// conseguir identificar nenhum elemento de LCP válido (NO_LCP).
function autoTagSectionIntros() {
  document.querySelectorAll('section > div:first-of-type').forEach((el) => {
    if (!el.classList.contains('reveal') && !el.id) {
      el.classList.add('reveal');
    }
  });
}

// IntersectionObserver em vez de listener de scroll: sem leitura de
// getBoundingClientRect() a cada frame, sem trabalho de layout no thread
// principal durante o scroll.
export function initReveal() {
  autoTagSectionIntros();
  const targets = Array.from(document.querySelectorAll('.reveal'));
  if (targets.length === 0) return;

  if (!('IntersectionObserver' in window)) {
    targets.forEach((el) => el.classList.add('is-visible'));
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0, rootMargin: '0px 0px -8% 0px' }
  );
  targets.forEach((el) => observer.observe(el));

  // Rede de segurança: garante que tudo apareça mesmo em cenários atípicos
  // (ex.: elemento fora do fluxo normal que o observer nunca dispara).
  setTimeout(() => {
    targets.forEach((el) => el.classList.add('is-visible'));
    observer.disconnect();
  }, 2500);
}
