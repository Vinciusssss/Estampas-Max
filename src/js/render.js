import {
  galleryItems,
  galleryCategories,
  categories,
  benefits,
  problems,
  compatItems,
  resultsRow1,
  resultsRow2,
  resultsRow3,
  steps,
  comparisonBad,
  comparisonGood,
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
  return `<span class="absolute bottom-2 right-2 z-10 inline-flex items-center gap-1 bg-black/70 text-white text-[10px] font-mono uppercase tracking-wide px-2 py-1 rounded backdrop-blur-sm">${icon('search', 'w-3 h-3')}Ver</span>`;
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

function pic(file, alt, { aspect = 'aspect-square', extra = '', eager = false, fit = 'object-cover' } = {}) {
  const loading = eager ? 'eager' : 'lazy';
  return `
    <div class="img-wrap ${aspect} ${extra}">
      <img src="${imgSrc(file)}" alt="${alt}" loading="${loading}" decoding="async"
        class="img-fade absolute inset-0 w-full h-full ${fit}" />
    </div>
  `;
}

function renderBenefits() {
  const grid = document.getElementById('benefits-grid');
  if (!grid) return;
  benefits.forEach((item, i) => {
    grid.appendChild(
      el(`
        <div class="card p-4 sm:p-6 text-center reveal" style="transition-delay:${i * 80}ms">
          <p class="text-2xl sm:text-4xl font-display font-bold text-brand-400 heading-glow">${item.value}</p>
          <p class="mt-1 text-[11px] sm:text-sm uppercase tracking-wide text-gray-400">${item.label}</p>
        </div>
      `)
    );
  });
}

function renderProblems() {
  const grid = document.getElementById('problems-grid');
  problems.forEach((item, i) => {
    grid.appendChild(
      el(`
        <div class="card p-5 sm:p-6 reveal" style="transition-delay:${i * 80}ms">
          ${iconBadge('alert', 'sm')}
          <h3 class="font-display font-bold uppercase text-sm tracking-wide mt-4">${item.title}</h3>
          <p class="mt-2 text-sm text-gray-400">${item.text}</p>
        </div>
      `)
    );
  });
}

// Carrossel horizontal que rola sozinho (CSS animation), sem depender de
// gesto do usuário — pensado para telas pequenas, onde uma grid de várias
// imagens ficaria espremida ou exigiria scroll vertical enorme.
// entry pode ser uma string (nome do arquivo) ou { file, label, tag }.
function marqueeTrack(containerId, entries, options = {}) {
  const {
    altPrefix = '',
    cardWidth = 'w-40 sm:w-48',
    aspect = 'aspect-square',
    fit = 'object-cover',
    duration = 30,
    reverse = false,
    onCardClick = null,
  } = options;
  const track = document.getElementById(containerId);
  if (!track) return;
  track.classList.add(reverse ? 'marquee-track-reverse' : 'marquee-track', 'flex', 'w-max', 'gap-4');
  track.style.animationDuration = `${duration}s`;

  // isDuplicate = segunda cópia visual, só para o loop contínuo do CSS
  // marquee ficar sem costura. Ela some da árvore de acessibilidade
  // (aria-hidden) e do teclado (sem role/tabindex de makeClickable), mas
  // continua clicável no mouse/touch — sem isso, clicar na metade duplicada
  // (visualmente idêntica à primeira) não faria nada, um dead click novo.
  const renderSet = (isDuplicate) =>
    entries.forEach((entry) => {
      const file = typeof entry === 'string' ? entry : entry.file;
      const label = typeof entry === 'string' ? '' : entry.label;
      const tag = typeof entry === 'string' ? '' : entry.tag;
      const alt = (typeof entry === 'string' ? '' : entry.alt) || label || file;
      const card = el(`
          <div class="shrink-0 ${cardWidth} card overflow-hidden"${isDuplicate ? ' aria-hidden="true"' : ''}>
            <div class="relative">
              ${pic(file, `${altPrefix}${alt}`, { aspect, fit })}
              ${
                tag
                  ? `<span class="absolute top-2 left-2 z-10 bg-black/70 text-brand-300 text-[10px] font-mono uppercase tracking-wide px-2 py-1 rounded backdrop-blur-sm">${tag}</span>`
                  : ''
              }
              ${onCardClick ? previewBadge() : ''}
            </div>
            ${label ? `<p class="p-2 text-center text-xs font-medium text-gray-300">${label}</p>` : ''}
          </div>
        `);
      if (onCardClick) {
        if (isDuplicate) {
          card.classList.add('card-clickable');
          card.addEventListener('click', () => onCardClick(entry));
        } else {
          makeClickable(card, () => onCardClick(entry));
        }
      }
      track.appendChild(card);
    });
  // duplicate the set so the CSS marquee loops seamlessly
  renderSet(false);
  renderSet(true);
  bindImageFade(track);
}

// Painel "categorias em destaque": mostra a variedade real de temas do
// acervo com capas locais pesquisadas e otimizadas no próprio projeto.
//
// Não são filtros de verdade — a galeria abaixo só tem amostras reais da
// categoria Animes (as demais categorias não têm um recorte próprio de
// imagens ainda). Por isso os cards não têm aparência de botão/clicável
// (sem role, tabindex ou cursor de link): evita o dead click de um card
// "Heróis" que levaria pra uma galeria de Animes, sem de fato filtrar nada.
function renderCategories() {
  const grid = document.getElementById('categories-grid');
  if (!grid) return;
  categories.forEach((cat, i) => {
    const card = cat.image
      ? el(`
          <div class="card overflow-hidden reveal" style="transition-delay:${i * 70}ms">
            <div class="img-wrap aspect-[4/5]">
              <img src="${imgSrc(cat.image)}" alt="${cat.label}" loading="lazy" decoding="async"
                class="img-fade absolute inset-0 w-full h-full object-cover" />
              <div class="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent"></div>
              <div class="absolute inset-x-0 bottom-0 p-4">
                <div class="icon-badge w-10 h-10 mb-2">${icon(cat.icon, 'w-5 h-5')}</div>
                <h3 class="font-display font-bold text-white">${cat.label}</h3>
                <p class="text-xs text-gray-300 mt-0.5">${cat.blurb}</p>
              </div>
            </div>
          </div>
        `)
      : el(`
          <div class="card overflow-hidden reveal aspect-[4/5] flex flex-col items-center justify-center text-center p-6" style="transition-delay:${i * 70}ms">
            ${iconBadge(cat.icon)}
            <h3 class="font-display font-bold mt-4">${cat.label}</h3>
            <p class="text-xs text-gray-400 mt-1">${cat.blurb}</p>
          </div>
        `);
    grid.appendChild(card);
  });
  bindImageFade(grid);
}

function renderGalleryCategories() {
  const wrap = document.getElementById('gallery-categories');
  if (!wrap) return;
  galleryCategories.forEach((cat) => {
    wrap.appendChild(el(`<span class="card px-3 py-1.5 text-[11px] sm:text-xs font-mono uppercase tracking-wide text-brand-300">${cat}</span>`));
  });
}

// Toque num card de amostra abre a prévia em vez de não fazer nada (era a
// principal fonte de dead click observada no Clarity): mostra a arte maior
// e só depois oferece o CTA — sem pular direto pro checkout.
function renderGallery() {
  renderGalleryCategories();
  marqueeTrack(
    'gallery-grid',
    galleryItems.map((item) => ({ file: item.file, label: item.title, tag: item.tag })),
    {
      cardWidth: 'w-32 sm:w-40',
      duration: 40,
      onCardClick: (entry) =>
        openPreviewModal({
          image: imgSrc(entry.file),
          alt: entry.label,
          title: entry.label,
          tag: entry.tag,
          note: 'Essa é apenas uma das milhares de artes disponíveis no acervo.',
          ctaLabel: 'Quero acessar o acervo',
        }),
    }
  );
}

function renderCompat() {
  marqueeTrack(
    'compat-grid',
    compatItems.map((item) => ({ file: item.photo, alt: `${item.title} — ${item.text}` })),
    { cardWidth: 'w-64 sm:w-80', aspect: 'aspect-[3/2]', fit: 'object-contain', duration: 55 }
  );
  marqueeTrack('results-row-1', resultsRow1, { duration: 26 });
  marqueeTrack('results-row-2', resultsRow2, { duration: 26, reverse: true });
  marqueeTrack('results-row-3', resultsRow3, { duration: 26 });
}

function renderSteps() {
  const grid = document.getElementById('steps-grid');
  steps.forEach((step, i) => {
    grid.appendChild(
      el(`
        <div class="card p-6 text-center reveal" style="transition-delay:${i * 100}ms">
          <div class="mx-auto w-11 h-11 rounded-full bg-gradient-to-br from-brand-500 to-brand-700 text-white font-display font-bold flex items-center justify-center mb-4 shadow-[0_0_20px_-4px_rgba(248,113,113,0.7)]">
            ${step.n}
          </div>
          <h3 class="font-display font-bold uppercase text-sm tracking-wide">${step.title}</h3>
          <p class="mt-2 text-xs text-gray-400">${step.text}</p>
        </div>
      `)
    );
  });
}

function renderComparison() {
  const bad = document.getElementById('comparison-bad');
  comparisonBad.forEach((text) => {
    bad.appendChild(
      el(`<li class="flex gap-3 items-start"><span class="shrink-0 text-red-400 mt-0.5">${icon('x', 'w-4 h-4')}</span> ${text}</li>`)
    );
  });
  const good = document.getElementById('comparison-good');
  comparisonGood.forEach((text) => {
    good.appendChild(
      el(`<li class="flex gap-3 items-start"><span class="shrink-0 text-brand-400 mt-0.5">${icon('check', 'w-4 h-4')}</span> ${text}</li>`)
    );
  });
}

// Depoimentos: swipe manual no mobile (1 card dominante + uma fresta do
// próximo, para indicar que dá pra arrastar), grid normal a partir do sm.
function renderTestimonials() {
  const grid = document.getElementById('testimonials-grid');
  if (!grid) return;
  testimonials.forEach((item, i) => {
    grid.appendChild(
      el(`
        <div class="card overflow-hidden reveal shrink-0 w-[82%] snap-center sm:w-auto sm:shrink" style="transition-delay:${i * 90}ms">
          ${pic(item.file, item.alt, { aspect: 'aspect-[9/16]' })}
        </div>
      `)
    );
  });
  bindImageFade(grid);
}

// Cards de bônus (ex.: "Modelos de anúncios prontos") também geravam dead
// click: pareciam produto clicável mas não tinham nenhuma ação. A prévia já
// existente (imagem do próprio bônus, sem inventar nada) é mostrada em
// tamanho maior, com o texto real do bônus como legenda.
//
// Itens com `badge` (ex.: o pack de canecas) ganham destaque próprio: cartão
// em largura total, borda/selo na cor da marca no lugar do selo cinza padrão
// "Bônus 0X", e sem preço "De: R$X" (não há valor avulso confirmado para
// esse bônus — só o texto "incluso no Premium").
function renderBonuses() {
  const grid = document.getElementById('bonus-grid');
  if (!grid) return;
  bonuses.forEach((item, i) => {
    const tag = item.badge || `Bônus 0${i + 1}`;
    const highlight = Boolean(item.badge);
    const card = el(`
        <div class="card overflow-hidden flex flex-col reveal ${highlight ? 'sm:col-span-2 border-brand-500/40' : ''}" style="transition-delay:${i * 90}ms">
          <div class="relative">
            ${pic(item.file, item.title, highlight ? { aspect: 'aspect-[16/9]', fit: 'object-contain' } : {})}
            <span class="absolute top-2 left-2 z-10 text-[10px] font-mono uppercase px-2 py-1 rounded backdrop-blur-sm ${highlight ? 'bg-brand-500 text-white font-bold' : 'bg-black/70 text-gray-300'}">
              ${tag}
            </span>
            ${previewBadge()}
          </div>
          <div class="p-4 flex-1 flex flex-col">
            <h3 class="font-display font-bold text-sm">${item.title}</h3>
            <p class="mt-2 text-xs text-gray-400 flex-1">${item.text}</p>
            <div class="mt-3 flex items-center gap-2">
              ${item.price ? `<span class="text-gray-500 line-through text-xs">De: ${item.price}</span>` : ''}
              <span class="text-brand-400 font-display font-bold text-sm">${item.price ? 'GRÁTIS' : 'INCLUSO NO PREMIUM'}</span>
            </div>
          </div>
        </div>
      `);
    makeClickable(card, () =>
      openPreviewModal({
        image: imgSrc(item.file),
        alt: item.title,
        title: item.title,
        tag,
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
  faqs.forEach((item, i) => {
    const panelId = `faq-answer-${i}`;
    list.appendChild(
      el(`
        <div data-faq-item class="card overflow-hidden">
          <button data-faq-question class="w-full flex items-center justify-between gap-4 p-5 text-left font-medium focus-visible:outline focus-visible:outline-2 focus-visible:outline-brand-400 focus-visible:outline-offset-[-2px]" aria-expanded="false" aria-controls="${panelId}">
            <span>${item.q}</span>
            <span data-faq-icon class="shrink-0 text-brand-400 transition-transform duration-300" aria-hidden="true">${icon('plus', 'w-5 h-5')}</span>
          </button>
          <div id="${panelId}" data-faq-answer class="hidden px-5 pb-5 text-sm text-gray-400">${item.a}</div>
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
  renderCategories();
  renderBenefits();
  renderProblems();
  renderGallery();
  renderCompat();
  renderSteps();
  renderComparison();
  renderTestimonials();
  renderBonuses();
  renderFaq();
}
