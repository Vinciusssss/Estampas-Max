import {
  galleryItems,
  problems,
  stats,
  compatItems,
  sampleStripFiles,
  resultsRow1,
  resultsRow2,
  resultsRow3,
  steps,
  comparisonBad,
  comparisonGood,
  audience,
  differentials,
  testimonials,
  bonuses,
  faqs,
} from './content.js';
import { icon, iconBadge } from './icons.js';

const imgSrc = (file) => `/images/${file}`;

function el(html) {
  const template = document.createElement('template');
  template.innerHTML = html.trim();
  return template.content.firstElementChild;
}

function markLoaded(imgEl) {
  imgEl.classList.add('is-loaded');
  imgEl.parentElement?.classList.add('is-loaded');
}

function bindImageFade(root) {
  root.querySelectorAll('img.img-fade').forEach((imgEl) => {
    if (imgEl.complete && imgEl.naturalWidth > 0) {
      markLoaded(imgEl);
    } else {
      imgEl.addEventListener('load', () => markLoaded(imgEl), { once: true });
      imgEl.addEventListener('error', () => markLoaded(imgEl), { once: true });
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

function renderProblems() {
  const grid = document.getElementById('problems-grid');
  problems.forEach((item, i) => {
    grid.appendChild(
      el(`
        <div class="card p-6 reveal" style="transition-delay:${i * 90}ms">
          ${iconBadge('alert', 'sm')}
          <h3 class="font-display font-bold uppercase text-sm tracking-wide mt-4">${item.title}</h3>
          <p class="mt-2 text-sm text-gray-400">${item.text}</p>
        </div>
      `)
    );
  });
}

function renderStats() {
  const grid = document.getElementById('stats-grid');
  stats.forEach((item, i) => {
    grid.appendChild(
      el(`
        <div class="text-center reveal" style="transition-delay:${i * 120}ms">
          <p class="text-4xl sm:text-5xl font-display font-bold text-brand-400 heading-glow">${item.value}</p>
          <p class="mt-2 text-xs sm:text-sm uppercase tracking-wide text-gray-400">${item.label}</p>
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
  } = options;
  const track = document.getElementById(containerId);
  if (!track) return;
  track.classList.add(reverse ? 'marquee-track-reverse' : 'marquee-track', 'flex', 'w-max', 'gap-4');
  track.style.animationDuration = `${duration}s`;

  const renderSet = () =>
    entries.forEach((entry) => {
      const file = typeof entry === 'string' ? entry : entry.file;
      const label = typeof entry === 'string' ? '' : entry.label;
      const tag = typeof entry === 'string' ? '' : entry.tag;
      const alt = (typeof entry === 'string' ? '' : entry.alt) || label || file;
      track.appendChild(
        el(`
          <div class="shrink-0 ${cardWidth} card overflow-hidden">
            <div class="relative">
              ${pic(file, `${altPrefix}${alt}`, { aspect, fit })}
              ${
                tag
                  ? `<span class="absolute top-2 left-2 z-10 bg-black/70 text-brand-300 text-[10px] font-mono uppercase tracking-wide px-2 py-1 rounded backdrop-blur-sm">${tag}</span>`
                  : ''
              }
            </div>
            ${label ? `<p class="p-2 text-center text-xs font-medium text-gray-300">${label}</p>` : ''}
          </div>
        `)
      );
    });
  // duplicate the set so the CSS marquee loops seamlessly
  renderSet();
  renderSet();
  bindImageFade(track);
}

function renderGallery() {
  marqueeTrack(
    'gallery-grid',
    galleryItems.map((item) => ({ file: item.file, label: item.title, tag: item.tag })),
    { cardWidth: 'w-32 sm:w-40', duration: 40 }
  );
}

function renderCompat() {
  marqueeTrack(
    'compat-grid',
    compatItems.map((item) => ({ file: item.photo, alt: `${item.title} — ${item.text}` })),
    { cardWidth: 'w-64 sm:w-80', aspect: 'aspect-[3/2]', fit: 'object-contain', duration: 55 }
  );
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

function renderAudience() {
  const grid = document.getElementById('audience-grid');
  audience.forEach((item, i) => {
    grid.appendChild(
      el(`
        <div class="card p-6 reveal" style="transition-delay:${i * 70}ms">
          <h3 class="font-display font-bold text-sm uppercase tracking-wide text-brand-400">${item.title}</h3>
          <p class="mt-2 text-sm text-gray-400">${item.text}</p>
        </div>
      `)
    );
  });
}

function renderDifferentials() {
  const grid = document.getElementById('differentials-grid');
  differentials.forEach((item, i) => {
    grid.appendChild(
      el(`
        <div class="card p-6 text-center reveal" style="transition-delay:${i * 70}ms">
          <div class="mx-auto">${iconBadge(item.icon)}</div>
          <h3 class="font-display font-bold uppercase text-sm tracking-wide mt-4">${item.title}</h3>
          <p class="mt-2 text-xs text-gray-400">${item.text}</p>
        </div>
      `)
    );
  });
}

function renderTestimonials() {
  marqueeTrack(
    'testimonials-grid',
    testimonials.map((item) => ({ file: item.file, alt: item.alt })),
    { cardWidth: 'w-48 sm:w-56', aspect: 'aspect-[9/16]', duration: 45 }
  );
}

function renderBonusTotal() {
  const totalEl = document.getElementById('bonus-total');
  if (!totalEl) return;
  const total = bonuses.reduce((sum, item) => {
    const n = parseFloat(item.price.replace('R$', '').replace('.', '').replace(',', '.').trim());
    return sum + (Number.isNaN(n) ? 0 : n);
  }, 0);
  const formatted = total.toLocaleString('pt-BR', { minimumFractionDigits: 0 });
  totalEl.innerHTML = `Os bônus custam <span class="line-through text-gray-500 font-normal normal-case">R$ ${formatted}</span> — hoje grátis`;
}

function renderBonuses() {
  const track = document.getElementById('bonus-grid');
  if (!track) return;
  track.classList.add('marquee-track', 'flex', 'w-max', 'gap-4');
  track.style.animationDuration = '48s';

  const renderSet = () =>
    bonuses.forEach((item, i) => {
      track.appendChild(
        el(`
          <div class="shrink-0 w-64 sm:w-72 card overflow-hidden flex flex-col">
            <div class="relative">
              ${pic(item.file, item.title)}
              <span class="absolute top-2 left-2 z-10 bg-black/70 text-[10px] font-mono uppercase px-2 py-1 rounded text-gray-300 backdrop-blur-sm">
                Bônus 0${i + 1}
              </span>
            </div>
            <div class="p-4 flex-1 flex flex-col">
              <h3 class="font-display font-bold text-sm">${item.title}</h3>
              <p class="mt-2 text-xs text-gray-400 flex-1">${item.text}</p>
              <div class="mt-3 flex items-center gap-2">
                <span class="text-gray-500 line-through text-xs">De: ${item.price}</span>
                <span class="text-brand-400 font-display font-bold text-sm">GRÁTIS</span>
              </div>
            </div>
          </div>
        `)
      );
    });
  renderSet();
  renderSet();
  bindImageFade(track);
}

function renderFaq() {
  const list = document.getElementById('faq-list');
  faqs.forEach((item) => {
    list.appendChild(
      el(`
        <div data-faq-item class="card overflow-hidden">
          <button data-faq-question class="w-full flex items-center justify-between gap-4 p-5 text-left font-medium">
            <span>${item.q}</span>
            <span data-faq-icon class="shrink-0 text-brand-400 transition-transform duration-300">${icon('plus', 'w-5 h-5')}</span>
          </button>
          <div data-faq-answer class="hidden px-5 pb-5 text-sm text-gray-400">${item.a}</div>
        </div>
      `)
    );
  });
}

export function renderContent() {
  renderProblems();
  renderGallery();
  renderCompat();
  marqueeTrack('marquee-samples', sampleStripFiles);
  marqueeTrack('marquee-results-1', resultsRow1);
  marqueeTrack('marquee-results-2', resultsRow2, { reverse: true });
  marqueeTrack('marquee-results-3', resultsRow3);
  renderSteps();
  renderStats();
  renderComparison();
  renderAudience();
  renderDifferentials();
  renderTestimonials();
  renderBonuses();
  renderBonusTotal();
  renderFaq();
}
