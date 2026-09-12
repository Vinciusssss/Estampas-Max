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

function pic(file, alt, { aspect = 'aspect-square', extra = '', eager = false } = {}) {
  const loading = eager ? 'eager' : 'lazy';
  return `
    <div class="img-wrap ${aspect} ${extra}">
      <img src="${imgSrc(file)}" alt="${alt}" loading="${loading}" decoding="async"
        class="img-fade absolute inset-0 w-full h-full object-cover" />
    </div>
  `;
}

function renderGallery() {
  const grid = document.getElementById('gallery-grid');
  galleryItems.forEach((item, i) => {
    grid.appendChild(
      el(`
        <figure class="card overflow-hidden group reveal" style="transition-delay:${(i % 8) * 60}ms">
          <div class="relative">
            ${pic(item.file, item.title, { extra: 'transition duration-300 group-hover:scale-105' })}
            <span class="absolute top-2 left-2 z-10 bg-black/70 text-brand-300 text-[10px] font-mono uppercase tracking-wide px-2 py-1 rounded backdrop-blur-sm">
              ${item.tag}
            </span>
          </div>
          <figcaption class="p-3 text-xs sm:text-sm font-medium text-gray-300">${item.title}</figcaption>
        </figure>
      `)
    );
  });
  bindImageFade(grid);
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

function renderCompat() {
  const grid = document.getElementById('compat-grid');
  compatItems.forEach((item, i) => {
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

function marqueeTrack(containerId, files, altPrefix = '') {
  const track = document.getElementById(containerId);
  const renderSet = () =>
    files.forEach((entry) => {
      const file = typeof entry === 'string' ? entry : entry.file;
      const label = typeof entry === 'string' ? '' : entry.label;
      track.appendChild(
        el(`
          <div class="shrink-0 w-40 sm:w-48 card overflow-hidden">
            ${pic(file, `${altPrefix}${label}`)}
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

function renderSteps() {
  const grid = document.getElementById('steps-grid');
  steps.forEach((step, i) => {
    grid.appendChild(
      el(`
        <div class="card p-6 text-center reveal" style="transition-delay:${i * 100}ms">
          <div class="mx-auto w-11 h-11 rounded-full bg-gradient-to-br from-brand-500 to-brand-700 text-white font-display font-bold flex items-center justify-center mb-4 shadow-[0_0_20px_-4px_rgba(168,85,247,0.7)]">
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
  const grid = document.getElementById('testimonials-grid');
  testimonials.forEach((item, i) => {
    grid.appendChild(
      el(`
        <div class="card overflow-hidden reveal" style="transition-delay:${i * 90}ms">
          ${pic(item.file, item.alt, { aspect: 'aspect-[9/16]' })}
        </div>
      `)
    );
  });
  bindImageFade(grid);
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
  const grid = document.getElementById('bonus-grid');
  bonuses.forEach((item, i) => {
    grid.appendChild(
      el(`
        <div class="card overflow-hidden flex flex-col reveal" style="transition-delay:${i * 90}ms">
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
  bindImageFade(grid);
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
  marqueeTrack('marquee-results-2', resultsRow2);
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
