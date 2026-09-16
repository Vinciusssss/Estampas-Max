// ============================================================================
// PRÉVIA EM MODAL/BOTTOM SHEET — usada pelos cards exploráveis (amostras do
// acervo e bônus). Responde à curiosidade do clique ("dead click" observado
// no Clarity) sem levar direto ao checkout: mostra a arte/bônus em tamanho
// maior e só then oferece o CTA, que reaproveita o mesmo fluxo de scroll até
// #pricing já usado pelos outros CTAs da página (initSmoothScroll,
// initCtaTracking em main.js) — por isso este módulo precisa ser inicializado
// antes deles, para que o botão já exista no DOM quando eles procurarem por
// [data-scroll-to] e [data-cta].
// ============================================================================

import { icon } from './icons.js';

let modalEl;
let backdropEl;
let imageEl;
let titleEl;
let tagEl;
let noteEl;
let ctaEl;
let closeBtn;

let isOpen = false;
let lastFocused = null;
let savedScrollY = 0;
let hideTimer = null;

function buildModal() {
  const wrap = document.createElement('div');
  wrap.innerHTML = `
    <div id="preview-modal" class="preview-modal hidden fixed inset-0 z-50" role="dialog" aria-modal="true" aria-labelledby="preview-modal-title">
      <div class="preview-modal-backdrop absolute inset-0 bg-black/80 backdrop-blur-sm"></div>
      <div class="absolute inset-x-0 bottom-0 sm:inset-0 sm:flex sm:items-center sm:justify-center sm:px-4">
        <div class="preview-modal-card relative w-full sm:max-w-md mx-auto bg-ink-950 border border-brand-500/30 rounded-t-2xl sm:rounded-2xl shadow-2xl max-h-[88vh] overflow-y-auto">
          <button type="button" id="preview-modal-close" aria-label="Fechar" class="absolute top-3 right-3 z-10 w-9 h-9 rounded-full bg-black/60 border border-white/10 flex items-center justify-center text-white/80 hover:text-white transition">
            ${icon('x', 'w-4 h-4')}
          </button>
          <div class="img-wrap aspect-square">
            <img id="preview-modal-image" alt="" class="absolute inset-0 w-full h-full object-cover" />
          </div>
          <div class="p-5 sm:p-6">
            <span id="preview-modal-tag" class="hidden inline-block text-[10px] font-mono uppercase tracking-wide text-brand-300 bg-brand-500/10 border border-brand-500/30 px-2 py-1 rounded"></span>
            <h3 id="preview-modal-title" class="mt-2 font-display font-bold text-lg text-white"></h3>
            <p id="preview-modal-note" class="mt-2 text-sm text-gray-400"></p>
            <a id="preview-modal-cta" href="#pricing" data-scroll-to="pricing" data-cta="preview_modal" class="cta-button w-full mt-5"></a>
          </div>
        </div>
      </div>
    </div>
  `;
  document.body.appendChild(wrap.firstElementChild);
}

// Trava o scroll de fundo travando o body em position:fixed (mais confiável
// que só overflow:hidden no iOS Safari, que ainda deixa o conteúdo por trás
// "arrastar" em alguns casos) e restaura a posição exata ao destravar.
function lockScroll() {
  savedScrollY = window.scrollY || window.pageYOffset || 0;
  const body = document.body.style;
  body.position = 'fixed';
  body.top = `-${savedScrollY}px`;
  body.left = '0';
  body.right = '0';
  body.width = '100%';
}

function unlockScroll() {
  const body = document.body.style;
  body.position = '';
  body.top = '';
  body.left = '';
  body.right = '';
  body.width = '';
  window.scrollTo(0, savedScrollY);
}

export function initPreviewModal() {
  if (modalEl) return;
  buildModal();
  modalEl = document.getElementById('preview-modal');
  backdropEl = modalEl.querySelector('.preview-modal-backdrop');
  imageEl = document.getElementById('preview-modal-image');
  titleEl = document.getElementById('preview-modal-title');
  tagEl = document.getElementById('preview-modal-tag');
  noteEl = document.getElementById('preview-modal-note');
  ctaEl = document.getElementById('preview-modal-cta');
  closeBtn = document.getElementById('preview-modal-close');

  closeBtn.addEventListener('click', () => closePreviewModal());
  backdropEl.addEventListener('click', () => closePreviewModal());
  // Fecha ao clicar no CTA (o próprio scroll até #pricing e o tracking do
  // clique são cuidados por initSmoothScroll/initCtaTracking em main.js,
  // que também escutam este mesmo elemento). keepHistoryEntry evita chamar
  // history.back() aqui: popar o estado nesse instante faria o navegador
  // restaurar a posição de scroll antiga por cima do scrollIntoView suave
  // até #pricing que o clique está prestes a disparar.
  ctaEl.addEventListener('click', () => closePreviewModal({ keepHistoryEntry: true }));

  document.addEventListener('keydown', (e) => {
    if (isOpen && e.key === 'Escape') closePreviewModal();
  });

  // Botão/gesto "voltar" do navegador fecha o modal em vez de sair da
  // página — ver openPreviewModal() sobre o history.pushState correspondente.
  window.addEventListener('popstate', () => {
    if (isOpen) closePreviewModal({ fromPopstate: true });
  });
}

export function openPreviewModal({ image, alt, title, tag, note, ctaLabel }) {
  if (!modalEl) return;

  imageEl.src = image;
  imageEl.alt = alt || title || '';
  titleEl.textContent = title || '';
  if (tag) {
    tagEl.textContent = tag;
    tagEl.classList.remove('hidden');
  } else {
    tagEl.classList.add('hidden');
  }
  noteEl.textContent = note || '';
  ctaEl.textContent = ctaLabel || 'Quero ter acesso';

  lastFocused = document.activeElement;
  clearTimeout(hideTimer);
  modalEl.classList.remove('hidden');
  lockScroll();

  if (!isOpen) {
    history.pushState({ previewModal: true }, '');
  }
  isOpen = true;

  requestAnimationFrame(() => modalEl.classList.add('is-open'));
  closeBtn.focus();
}

export function closePreviewModal({ fromPopstate = false, keepHistoryEntry = false } = {}) {
  if (!isOpen) return;
  isOpen = false;

  modalEl.classList.remove('is-open');
  unlockScroll();
  hideTimer = setTimeout(() => modalEl.classList.add('hidden'), 220);

  if (!fromPopstate && !keepHistoryEntry && history.state?.previewModal) {
    history.back();
  }
  if (lastFocused instanceof HTMLElement) {
    lastFocused.focus();
  }
}
