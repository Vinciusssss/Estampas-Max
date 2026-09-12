import '../css/main.css';
import { renderContent } from './render.js';
import { initFaq } from './faq.js';
import { initPricing } from './pricing.js';
import { initSmoothScroll } from './smoothScroll.js';

document.addEventListener('DOMContentLoaded', () => {
  renderContent();
  initFaq();
  initPricing();
  initSmoothScroll();
});
