import {
  galleryItems,
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

const img = (file) => `/images/${file}`;

function el(html) {
  const template = document.createElement('template');
  template.innerHTML = html.trim();
  return template.content.firstElementChild;
}

function renderGallery() {
  const grid = document.getElementById('gallery-grid');
  galleryItems.forEach((item) => {
    grid.appendChild(
      el(`
        <figure class="card overflow-hidden group">
          <div class="relative aspect-square overflow-hidden">
            <img src="${img(item.file)}" alt="${item.title}" loading="lazy"
              class="w-full h-full object-cover transition duration-300 group-hover:scale-105" />
            <span class="absolute top-2 left-2 bg-slate-950/80 text-gold-500 text-[10px] font-mono uppercase tracking-wide px-2 py-1 rounded">
              ${item.tag}
            </span>
          </div>
          <figcaption class="p-3 text-xs sm:text-sm font-medium text-gray-300">${item.title}</figcaption>
        </figure>
      `)
    );
  });
}

function renderCompat() {
  const grid = document.getElementById('compat-grid');
  compatItems.forEach((item) => {
    grid.appendChild(
      el(`
        <div class="card p-6 text-center">
          <div class="text-3xl mb-3">${item.icon}</div>
          <h3 class="font-display font-bold uppercase text-sm tracking-wide">${item.title}</h3>
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
            <img src="${img(file)}" alt="${altPrefix}${label}" class="w-full aspect-square object-cover block" />
            ${label ? `<p class="p-2 text-center text-xs font-medium text-gray-300">${label}</p>` : ''}
          </div>
        `)
      );
    });
  // duplicate the set so the CSS marquee loops seamlessly
  renderSet();
  renderSet();
}

function renderSteps() {
  const grid = document.getElementById('steps-grid');
  steps.forEach((step) => {
    grid.appendChild(
      el(`
        <div class="card p-6 text-center">
          <div class="mx-auto w-10 h-10 rounded-full bg-gold-500 text-slate-950 font-display font-bold flex items-center justify-center mb-4">
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
    bad.appendChild(el(`<li class="flex gap-2"><span class="text-red-500">✗</span> ${text}</li>`));
  });
  const good = document.getElementById('comparison-good');
  comparisonGood.forEach((text) => {
    good.appendChild(el(`<li class="flex gap-2"><span class="text-gold-500">✓</span> ${text}</li>`));
  });
}

function renderAudience() {
  const grid = document.getElementById('audience-grid');
  audience.forEach((item) => {
    grid.appendChild(
      el(`
        <div class="card p-6">
          <h3 class="font-display font-bold text-sm uppercase tracking-wide text-gold-500">${item.title}</h3>
          <p class="mt-2 text-sm text-gray-400">${item.text}</p>
        </div>
      `)
    );
  });
}

function renderDifferentials() {
  const grid = document.getElementById('differentials-grid');
  differentials.forEach((item) => {
    grid.appendChild(
      el(`
        <div class="card p-6 text-center">
          <div class="text-3xl mb-3">${item.icon}</div>
          <h3 class="font-display font-bold uppercase text-sm tracking-wide">${item.title}</h3>
          <p class="mt-2 text-xs text-gray-400">${item.text}</p>
        </div>
      `)
    );
  });
}

function renderTestimonials() {
  const grid = document.getElementById('testimonials-grid');
  testimonials.forEach((item) => {
    grid.appendChild(
      el(`
        <div class="card overflow-hidden">
          <img src="${img(item.file)}" alt="${item.alt}" class="w-full h-auto block" />
        </div>
      `)
    );
  });
}

function renderBonuses() {
  const grid = document.getElementById('bonus-grid');
  bonuses.forEach((item, i) => {
    grid.appendChild(
      el(`
        <div class="card overflow-hidden flex flex-col">
          <div class="relative">
            <img src="${img(item.file)}" alt="${item.title}" loading="lazy" class="w-full aspect-square object-cover" />
            <span class="absolute top-2 left-2 bg-slate-950/80 text-[10px] font-mono uppercase px-2 py-1 rounded text-gray-300">
              Bônus 0${i + 1}
            </span>
          </div>
          <div class="p-4 flex-1 flex flex-col">
            <h3 class="font-display font-bold text-sm">${item.title}</h3>
            <p class="mt-2 text-xs text-gray-400 flex-1">${item.text}</p>
            <div class="mt-3 flex items-center gap-2">
              <span class="text-gray-500 line-through text-xs">De: ${item.price}</span>
              <span class="text-gold-500 font-display font-bold text-sm">GRÁTIS</span>
            </div>
          </div>
        </div>
      `)
    );
  });
}

function renderFaq() {
  const list = document.getElementById('faq-list');
  faqs.forEach((item) => {
    list.appendChild(
      el(`
        <div data-faq-item class="card overflow-hidden">
          <button data-faq-question class="w-full flex items-center justify-between gap-4 p-5 text-left font-medium">
            <span>${item.q}</span>
            <span data-faq-icon class="shrink-0 text-gold-500 text-xl transition-transform">+</span>
          </button>
          <div data-faq-answer class="hidden px-5 pb-5 text-sm text-gray-400">${item.a}</div>
        </div>
      `)
    );
  });
}

export function renderContent() {
  renderGallery();
  renderCompat();
  marqueeTrack('marquee-samples', sampleStripFiles);
  marqueeTrack('marquee-results-1', resultsRow1);
  marqueeTrack('marquee-results-2', resultsRow2);
  marqueeTrack('marquee-results-3', resultsRow3);
  renderSteps();
  renderComparison();
  renderAudience();
  renderDifferentials();
  renderTestimonials();
  renderBonuses();
  renderFaq();
}
