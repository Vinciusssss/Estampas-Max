// CARROSSEL DE PRÉVIA — trilho com scroll-snap nativo (toque/swipe de
// graça no mobile); este módulo cuida do que o CSS/scroll-snap não resolve
// sozinho: marcar o slide em foco (.is-active, ver main.css), mover o
// trilho ao clicar nas setas, atualizar a barra de progresso, e avançar
// sozinho — looping contínuo, pausado só por interação direta do usuário.
const ACTIVE_CLASS = 'is-active';
const AUTOPLAY_INTERVAL_MS = 4500;
const TOUCH_RESUME_DELAY_MS = 1200;

// Reduced-motion só tira a ANIMAÇÃO de rolagem (vira corte instantâneo em
// vez de slide suave) — não desliga o giro automático em si. No Windows,
// desligar "Mostrar animações" em Acessibilidade liga essa flag no
// Chrome/Edge sem o usuário estar pedindo "parar o carrossel", só "sem
// efeito de slide" — desligar o autoplay inteiro nesse caso faria a seção
// parecer quebrada em vez de só mais direta.
function prefersReducedMotion() {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

export function initCarousel() {
  const track = document.getElementById('gallery-grid');
  if (!track) return;

  const slides = Array.from(track.querySelectorAll('[data-carousel-slide]'));
  if (slides.length === 0) return;

  // Engloba o trilho + as setas: toque ativo ou foco de teclado em qualquer
  // um dos dois pausa o autoplay (as setas ficam fora do trilho, mas
  // posicionadas por cima dele). De propósito SEM pausar no hover do mouse:
  // a zona ocupa quase a largura toda da seção, então o cursor só
  // "descansando" em cima dela (muito comum ao rolar a página) travaria o
  // giro pra sempre sem o usuário perceber por quê — foi exatamente isso
  // que fez o autoplay parecer quebrado numa versão anterior.
  const interactionZone = track.parentElement || track;

  const prevBtn = document.querySelector('[data-carousel-prev]');
  const nextBtn = document.querySelector('[data-carousel-next]');
  const progressBar = document.querySelector('[data-carousel-progress-bar]');
  const progressLabel = document.querySelector('[data-carousel-progress-label]');

  let currentIndex = 0;
  let isPaused = false;
  let touchResumeTimer = null;

  function setActive(index) {
    currentIndex = index;
    slides.forEach((slide, i) => slide.classList.toggle(ACTIVE_CLASS, i === index));
    if (progressBar) progressBar.style.width = `${((index + 1) / slides.length) * 100}%`;
    if (progressLabel) progressLabel.textContent = `${index + 1} / ${slides.length}`;
  }

  // Mantém o slide mais visível no trilho marcado como ativo, inclusive
  // quando o usuário arrasta/faz swipe (sem depender só dos botões/autoplay).
  const activeObserver = new IntersectionObserver(
    (entries) => {
      const mostVisible = entries
        .filter((entry) => entry.isIntersecting)
        .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
      if (!mostVisible) return;
      const index = slides.indexOf(mostVisible.target);
      if (index !== -1 && index !== currentIndex) setActive(index);
    },
    { root: track, threshold: [0.5, 0.75, 0.95] }
  );
  slides.forEach((slide) => activeObserver.observe(slide));

  function goTo(index) {
    const wrapped = (index + slides.length) % slides.length;
    // Ao dar a volta (último → primeiro, ou primeiro → último no "anterior")
    // pula direto em vez de rolar visivelmente por todos os slides de volta
    // — fica parecendo um loop de verdade, não um "rebobinar".
    const isWrap = wrapped !== index;
    slides[wrapped].scrollIntoView({
      behavior: isWrap || prefersReducedMotion() ? 'auto' : 'smooth',
      inline: 'center',
      block: 'nearest',
    });
  }

  // Autoplay começa assim que a página carrega — sem depender de observer de
  // visibilidade (um ponto a menos que pode falhar silenciosamente); se a
  // seção ainda não estiver na tela, o pior caso é só já estar num slide
  // diferente do primeiro quando o lead rolar até lá.
  setInterval(() => {
    if (isPaused || document.hidden) return;
    goTo(currentIndex + 1);
  }, AUTOPLAY_INTERVAL_MS);

  prevBtn?.addEventListener('click', () => goTo(currentIndex - 1));
  nextBtn?.addEventListener('click', () => goTo(currentIndex + 1));

  interactionZone.addEventListener('focusin', () => {
    isPaused = true;
  });
  interactionZone.addEventListener('focusout', () => {
    isPaused = false;
  });
  interactionZone.addEventListener(
    'touchstart',
    () => {
      isPaused = true;
      clearTimeout(touchResumeTimer);
    },
    { passive: true }
  );
  interactionZone.addEventListener(
    'touchend',
    () => {
      clearTimeout(touchResumeTimer);
      touchResumeTimer = setTimeout(() => {
        isPaused = false;
      }, TOUCH_RESUME_DELAY_MS);
    },
    { passive: true }
  );
}
