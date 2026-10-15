import {
  galleryItems,
  categories,
  trustStrip,
  solution,
  compatItems,
  steps,
  testimonials,
  bonuses,
  faqs,
} from './content.js';
import { icon, iconBadge } from './icons.js';
import { initPreviewModal, openPreviewModal } from './previewModal.js';

const imgSrc = (file) => `/images/${file}`;

function el(html) {
  const template = document.createElement('template');
  template.innerHTML = html.trim();
  return template.content.firstElementChild;
}

// Selo discreto "Ver" (com ícone de lupa) usado nos cards que abrem a prévia
// em modal — mesmo visual dos badges de tag já existentes, só que no canto
// oposto, para não competir com eles.
function previewBadge() {
  return `<span class="absolute bottom-2 right-2 z-10 inline-flex items-center gap-1 bg-ink-950/75 text-white text-[10px] font-mono uppercase tracking-wide px-2 py-1 rounded backdrop-blur-sm">${icon('search', 'w-3 h-3')}Ver</span>`;
}

function makeClickable(cardEl, onActivate) {
  cardEl.classList.add('card-clickable');
  cardEl.setAttribute('role', 'button');
  cardEl.setAttribute('tabindex', '0');
  cardEl.setAttribute('aria-haspopup', 'dialog');
  cardEl.addEventListener('click', onActivate);
  cardEl.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      onActivate();
    }
  });
}

function markLoaded(imgEl) {
  imgEl.classList.add('is-loaded');
  imgEl.parentElement?.classList.add('is-loaded');
}

// Se a imagem falhar (rede instável, hiccup passageiro de CDN etc.), tenta
// carregar de novo (com um pouco de espera) antes de desistir — uma falha de
// rede transitória não deve esconder a imagem pra sempre. Só depois de
// esgotar as tentativas é que o <img> quebrado é escondido (o wrapper
// .img-wrap já reserva o espaço certo via aspect-ratio e mostra um fundo
// neutro no lugar, sem layout shift nem ícone feio de imagem quebrada).
const MAX_IMAGE_RETRIES = 2;
const IMAGE_RETRY_DELAY_MS = 700;

function handleImageError(imgEl) {
  imgEl.style.display = 'none';
  markLoaded(imgEl);
}

function attachImageHandlers(imgEl, attempt) {
  imgEl.addEventListener('load', () => markLoaded(imgEl), { once: true });
  imgEl.addEventListener(
    'error',
    () => {
      if (attempt >= MAX_IMAGE_RETRIES) {
        handleImageError(imgEl);
        return;
      }
      const nextAttempt = attempt + 1;
      const cleanSrc = imgEl.src.split('?')[0];
      setTimeout(() => {
        attachImageHandlers(imgEl, nextAttempt);
        imgEl.src = `${cleanSrc}?retry=${nextAttempt}`;
      }, IMAGE_RETRY_DELAY_MS * nextAttempt);
    },
    { once: true }
  );
}

function bindImageFade(root) {
  root.querySelectorAll('img.img-fade').forEach((imgEl) => {
    if (imgEl.complete && imgEl.naturalWidth > 0) {
      markLoaded(imgEl);
    } else if (imgEl.complete) {
      // complete=true com naturalWidth=0 é sinal de que já falhou (ex.:
      // cache negativo de um erro passageiro) antes do listener ser
      // anexado — tenta de novo em vez de já desistir.
      attachImageHandlers(imgEl, 0);
      const cleanSrc = imgEl.src.split('?')[0];
      imgEl.src = `${cleanSrc}?retry=1`;
    } else {
      attachImageHandlers(imgEl, 0);
    }
  });
}

function pic(file, alt, { aspect = 'aspect-square', extra = '', eager = false, fit = 'object-cover', srcset = '', sizes = '' } = {}) {
  const loading = eager ? 'eager' : 'lazy';
  const srcsetAttr = srcset ? `srcset="${srcset}" sizes="${sizes}"` : '';
  return `
    <div class="img-wrap ${aspect} ${extra}">
      <img src="${imgSrc(file)}" ${srcsetAttr} alt="${alt}" loading="${loading}" decoding="async"
        class="img-fade absolute inset-0 w-full h-full ${fit}" />
    </div>
  `;
}

// FAIXA DE CONFIANÇA — tira discreta de fatos, não cards chamativos.
function renderTrustStrip() {
  const wrap = document.getElementById('trust-strip');
  if (!wrap) return;
  trustStrip.forEach((item) => {
    wrap.appendChild(
      el(`
        <div class="flex flex-col sm:flex-row items-center justify-center gap-0.5 sm:gap-2 px-4 py-1 text-center">
          <span class="font-display font-bold text-ink-900 text-sm sm:text-base">${item.value}</span>
          <span class="text-[11px] sm:text-xs uppercase tracking-wide text-gray-600">${item.label}</span>
        </div>
      `)
    );
  });
}

// SEÇÃO "MAIS TEMPO PRODUZINDO. MENOS TEMPO PROCURANDO." — 3 benefícios
// objetivos, ícone discreto + texto curto (substitui as antigas seções de
// problema, "o que muda" e comparativo).
function renderSolution() {
  const grid = document.getElementById('solution-grid');
  if (!grid) return;
  solution.forEach((item, i) => {
    grid.appendChild(
      el(`
        <div class="card p-6 reveal" style="transition-delay:${i * 80}ms">
          ${iconBadge(item.icon, 'sm')}
          <h3 class="font-display font-bold text-base mt-4">${item.title}</h3>
          <p class="mt-2 text-sm text-gray-600">${item.text}</p>
        </div>
      `)
    );
  });
}

// Painel de categorias — composição tipográfica, sem imagens (ver
// content.js). A galeria abaixo mostra uma amostra real de Animes; enquanto
// não houver recortes próprios para as outras categorias, os chips permanecem
// informativos e sem aparência de botão para não prometer um filtro que ainda
// não existe.
function renderCategories() {
  const grid = document.getElementById('categories-grid');
  if (!grid) return;
  categories.forEach((cat, i) => {
    const stateClasses = cat.active
      ? 'border-brand-400 bg-brand-500/10 text-brand-200'
      : 'border-white/15 text-gray-300';
    grid.appendChild(
      el(`
        <div
          class="reveal select-none rounded-full sm:rounded-xl border ${stateClasses} transition duration-200 px-4 py-2 sm:px-4 sm:py-3.5 flex items-center sm:items-start gap-2 sm:gap-2.5"
          style="transition-delay:${i * 50}ms"
        >
          ${icon(cat.icon, 'w-4 h-4 sm:w-5 sm:h-5 shrink-0')}
          <div>
            <p class="font-display font-semibold text-sm">${cat.label}</p>
            <p class="hidden sm:block text-[11px] opacity-70 mt-0.5">${cat.blurb}</p>
          </div>
        </div>
      `)
    );
  });
}

// Prévia da biblioteca — carrossel real (scroll-snap + src/js/carousel.js):
// um slide central maior, vizinhos espiando nas bordas no desktop, um por
// vez no celular. Clicar numa arte abre a prévia em modal em vez de não
// fazer nada (dead click observado no Clarity): mostra a arte maior e só
// depois oferece o CTA. [data-carousel-slide]/.carousel-slide são o que o
// carousel.js observa para saber qual slide está em foco.
function renderGallery() {
  const grid = document.getElementById('gallery-grid');
  if (!grid) return;
  galleryItems.forEach((item, i) => {
    const slide = el(`
        <div data-carousel-slide class="carousel-slide ${i === 0 ? 'is-active' : ''} shrink-0 snap-center w-[78%] sm:w-[48%] lg:w-[32%]">
          <div class="relative rounded-xl overflow-hidden reveal" style="transition-delay:${i * 40}ms">
            ${pic(item.thumb, item.title, {
              aspect: 'aspect-square',
              srcset: `${imgSrc(item.thumb)} 320w, ${imgSrc(item.file)} 640w`,
              sizes: '(min-width: 1024px) 320px, (min-width: 640px) 300px, 260px',
            })}
            <span class="absolute top-2 left-2 z-10 bg-ink-950/70 text-brand-300 text-[10px] font-mono uppercase tracking-wide px-2 py-1 rounded backdrop-blur-sm">${item.tag}</span>
            ${previewBadge()}
          </div>
        </div>
      `);
    makeClickable(slide.firstElementChild, () =>
      openPreviewModal({
        image: imgSrc(item.file),
        alt: item.title,
        title: item.title,
        tag: item.tag,
        note: 'Essa é apenas uma das milhares de artes disponíveis no acervo.',
        ctaLabel: 'Quero acessar o acervo',
      })
    );
    grid.appendChild(slide);
  });
  bindImageFade(grid);
}

// Aplicações: grid estático editorial, vitrine de produtos (sem carrossel
// automático) — proporção e altura de card consistentes entre os itens.
function renderCompat() {
  const grid = document.getElementById('compat-grid');
  if (!grid) return;
  compatItems.forEach((item, i) => {
    grid.appendChild(
      el(`
        <div class="card overflow-hidden reveal flex flex-col hover:-translate-y-0.5" style="transition-delay:${i * 50}ms">
          ${pic(item.photo, `${item.title} — ${item.text}`, { aspect: 'aspect-[4/3]', fit: 'object-contain', extra: 'bg-white' })}
          <div class="p-4 flex-1">
            <h3 class="font-display font-bold text-sm">${item.title}</h3>
            <p class="mt-1.5 text-xs text-gray-600 line-clamp-2">${item.text}</p>
          </div>
        </div>
      `)
    );
  });
  bindImageFade(grid);
}

function renderSteps() {
  const grid = document.getElementById('steps-grid');
  if (!grid) return;
  steps.forEach((step, i) => {
    grid.appendChild(
      el(`
        <div class="text-center reveal" style="transition-delay:${i * 90}ms">
          <div class="mx-auto w-10 h-10 rounded-full bg-brand-500 text-white font-display font-bold flex items-center justify-center mb-3">
            ${step.n}
          </div>
          <h3 class="font-display font-bold text-sm">${step.title}</h3>
          <p class="mt-2 text-sm text-gray-600">${step.text}</p>
        </div>
      `)
    );
  });
}

// Depoimentos: mais espaço, menos elementos decorativos — swipe manual no
// mobile (1 card dominante + uma fresta do próximo, para indicar que dá pra
// arrastar), grid normal a partir do sm.
function renderTestimonials() {
  const grid = document.getElementById('testimonials-grid');
  if (!grid) return;
  testimonials.forEach((item, i) => {
    grid.appendChild(
      el(`
        <div class="relative rounded-xl overflow-hidden reveal shrink-0 w-[82%] snap-center sm:w-auto sm:shrink border border-ink-900/10" style="transition-delay:${i * 80}ms">
          ${pic(item.file, item.alt, { aspect: 'aspect-[9/16]' })}
          <span class="absolute top-2 left-2 z-10 bg-ink-950/70 text-brand-300 text-[10px] font-mono uppercase tracking-wide px-2 py-1 rounded backdrop-blur-sm">${item.caption}</span>
        </div>
      `)
    );
  });
  bindImageFade(grid);
}

// Bônus: cabeçalho da seção (ver index.html) já avisa "incluso no Premium"
// uma vez, mas o briefing pede o destaque também em cada card — mantido
// curto (selo mono) pra não virar repetição cansativa. Os 4 primeiros levam
// um selo numerado (1-4, ordem fixada em content.js); o pack de canecas
// fecha a grade maior e separado, com o selo "+20.000 extras" que já
// existia e texto próprio (é um bônus ADICIONAL, não um dos 4 numerados).
function renderBonuses() {
  const grid = document.getElementById('bonus-grid');
  if (!grid) return;
  bonuses.forEach((item, i) => {
    const highlight = Boolean(item.badge);
    const card = el(`
        <div class="card overflow-hidden flex flex-col reveal ${highlight ? 'sm:col-span-2' : ''}" style="transition-delay:${i * 80}ms">
          <div class="relative bg-white ${highlight ? '' : 'p-6 sm:p-0'}">
            ${pic(item.file, item.title, highlight ? { aspect: 'aspect-[16/9]', fit: 'object-contain', extra: 'bg-white' } : {})}
            ${item.number ? `<span class="absolute top-2 left-2 z-10 w-6 h-6 rounded-full bg-ink-900 text-white text-xs font-display font-bold flex items-center justify-center">${item.number}</span>` : ''}
            ${item.badge ? `<span class="absolute top-2 left-2 z-10 bg-brand-500 text-white text-[10px] font-mono uppercase font-bold px-2 py-1 rounded">${item.badge}</span>` : ''}
            ${previewBadge()}
          </div>
          <div class="p-4 flex-1">
            <h3 class="font-display font-bold text-sm">${item.title}</h3>
            <p class="mt-2 text-xs text-gray-600">${item.text}</p>
            <span class="inline-block mt-2 text-[10px] font-mono uppercase tracking-wide text-brand-600">${highlight ? 'Bônus adicional do Pacote Premium' : 'Incluso no Pacote Premium'}</span>
          </div>
        </div>
      `);
    makeClickable(card, () =>
      openPreviewModal({
        image: imgSrc(item.file),
        alt: item.title,
        title: item.title,
        tag: item.badge || 'Bônus Premium',
        note: item.text,
        ctaLabel: 'Quero ter acesso',
      })
    );
    grid.appendChild(card);
  });
  bindImageFade(grid);
}

function renderFaq() {
  const list = document.getElementById('faq-list');
  if (!list) return;
  faqs.forEach((item, i) => {
    const panelId = `faq-answer-${i}`;
    list.appendChild(
      el(`
        <div data-faq-item class="card overflow-hidden">
          <button data-faq-question class="w-full flex items-center justify-between gap-4 p-5 text-left font-medium focus-visible:outline focus-visible:outline-2 focus-visible:outline-brand-500 focus-visible:outline-offset-[-2px]" aria-expanded="false" aria-controls="${panelId}">
            <span>${item.q}</span>
            <span data-faq-icon class="shrink-0 text-brand-600 transition-transform duration-300" aria-hidden="true">${icon('plus', 'w-5 h-5')}</span>
          </button>
          <div id="${panelId}" data-faq-answer class="hidden px-5 pb-5 text-sm text-gray-600">${item.a}</div>
        </div>
      `)
    );
  });
}

export function renderContent() {
  // Precisa existir antes de renderGallery/renderBonuses (que abrem o modal)
  // e antes de initSmoothScroll/initCtaTracking em main.js, que procuram
  // [data-scroll-to]/[data-cta] no DOM — o CTA do modal usa os dois.
  initPreviewModal();
  renderTrustStrip();
  renderSolution();
  renderCategories();
  renderGallery();
  renderCompat();
  renderSteps();
  renderTestimonials();
  renderBonuses();
  renderFaq();
}
