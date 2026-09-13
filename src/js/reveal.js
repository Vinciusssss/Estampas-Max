function autoTagSectionIntros() {
  document.querySelectorAll('section > div:first-of-type, header > div:first-of-type').forEach((el) => {
    if (!el.classList.contains('reveal') && !el.id) {
      el.classList.add('reveal');
    }
  });
}

// Revela elementos por posição de scroll em vez de depender só do
// IntersectionObserver. Assim o conteúdo nunca fica preso invisível se o
// observer não disparar (ex.: em painéis de preview embutidos), continua
// funcionando sem JS de observer e ainda faz a animação de entrada.
export function initReveal() {
  autoTagSectionIntros();
  const targets = Array.from(document.querySelectorAll('.reveal'));
  if (targets.length === 0) return;

  let pending = targets;
  let ticking = false;

  const reveal = () => {
    ticking = false;
    const trigger = window.innerHeight * 0.92; // revela um pouco antes de entrar
    pending = pending.filter((el) => {
      const top = el.getBoundingClientRect().top;
      if (top < trigger) {
        el.classList.add('is-visible');
        return false; // já revelado, remove da lista
      }
      return true;
    });
    if (pending.length === 0) {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    }
  };

  const onScroll = () => {
    if (!ticking) {
      ticking = true;
      window.requestAnimationFrame(reveal);
    }
  };

  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', onScroll);
  reveal(); // primeira passada: revela o que já está na tela ao carregar

  // Rede de segurança: garante que tudo apareça mesmo em cenários atípicos.
  setTimeout(() => {
    pending.forEach((el) => el.classList.add('is-visible'));
  }, 2500);
}
